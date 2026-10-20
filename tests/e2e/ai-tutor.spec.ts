import { test, expect } from '@playwright/test';

test.describe('AI Tutor Safe KaTeX Rendering & Resilience', () => {
  test('should ask a doubt and render KaTeX display and inline math without unparsed artifacts', async ({
    page,
  }) => {
    // Intercept tutor API
    await page.route('**/api/tutor', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          answer:
            '### Gauss Elimination Method\n\nTo solve the linear system:\n$$\\begin{bmatrix} 2 & 1 \\\\ 5 & 7 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 17 \\end{bmatrix}$$\n\nUsing elementary row transformations $R_2 \\to R_2 - 2.5 R_1$, we obtain $y = 1$ and back-substitute to find $x = 2$.\n\n$$\\boxed{x = 2,\\; y = 1}$$',
          sources: ['LNJPIT Mathematics-I Unit 1: Matrices & Linear Algebra'],
          model: 'gemini-1.5-flash',
          cached: false,
        }),
      });
    });

    await page.goto('/');

    // Switch to AI Tutor tab (Tab 5)
    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    // Fill doubt input and submit
    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await expect(input).toBeVisible();
    await input.fill('Explain Gauss elimination step by step');

    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();

    // Verify response card appears
    const solutionCard = page.locator('.katex');
    await expect(solutionCard.first()).toBeVisible();

    // Verify display math element
    const displayMath = page.locator('.katex-display');
    await expect(displayMath.first()).toBeVisible();

    // Verify no raw unparsed $$ artifacts in answer text
    const answerContainer = page.locator('#tab-content');
    const text = await answerContainer.innerText();
    expect(text).not.toContain('$$\\begin{bmatrix}');
    expect(text).not.toContain('\\boxed{');
  });

  test('should handle HTTP 429 rate limit gracefully with warning banner and offline fallback answer', async ({
    page,
  }) => {
    // Intercept with 429 Rate Limit
    await page.route('**/api/tutor', async (route) => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Rate limit exceeded: 15 questions per minute. Please pause for a moment.',
        }),
      });
    });

    await page.goto('/');

    // Switch to AI Tutor tab
    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await input.fill('What is KVL?');

    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();

    // Verify rate limit banner appears
    const rateLimitBanner = page.locator('text=Rate limit exceeded');
    await expect(rateLimitBanner.first()).toBeVisible();

    // Verify offline answer and badge are rendered immediately
    const answerHeading = page.locator('text=Academic Syllabus Solution');
    await expect(answerHeading.first()).toBeVisible();

    const offlineBadge = page.locator('text=Offline Syllabus Grounded');
    await expect(offlineBadge.first()).toBeVisible();
  });

  test('should handle network disconnect gracefully with offline fallback solution', async ({ page }) => {
    // Simulate network error / abort
    await page.route('**/api/tutor', async (route) => {
      await route.abort('failed');
    });

    await page.goto('/');

    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await input.fill('State Thevenin theorem');

    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();

    // Verify offline notice and syllabus answer appear
    const offlineNotice = page.locator('text=Network connection issue');
    await expect(offlineNotice.first()).toBeVisible();

    const answerHeading = page.locator('text=Academic Syllabus Solution');
    await expect(answerHeading.first()).toBeVisible();

    const offlineBadge = page.locator('text=Offline Syllabus Grounded');
    await expect(offlineBadge.first()).toBeVisible();
  });
});
