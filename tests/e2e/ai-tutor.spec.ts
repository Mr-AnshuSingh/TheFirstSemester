import { test, expect } from '@playwright/test';

test.describe('AI Tutor Safe KaTeX Rendering & Resilience', () => {
  test('should ask a doubt and render KaTeX display and inline math without unparsed artifacts', async ({
    page,
  }) => {
    await page.route('**/api/tutor', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          answer:
            '### Gauss Elimination Method\n\nTo solve the linear system:\n$$\\begin{bmatrix} 2 & 1 \\\\ 5 & 7 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 17 \\end{bmatrix}$$\n\nUsing elementary row transformations $R_2 \\to R_2 - 2.5 R_1$, we obtain $y = 1$ and back-substitute to find $x = 2$.\n\n$$\\boxed{x = 2,\\; y = 1}$$',
          isLiveAi: true,
          contextUsed: {
            subjectName: 'Mathematics - I',
            subjectCode: '100102',
            unitNumber: 1,
            unitTitle: 'Matrices & Linear Algebra',
          },
        }),
      });
    });

    await page.goto('/?subject=math&unit=1');

    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await expect(input).toBeVisible();
    await input.fill('Explain Gauss elimination step by step');

    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();

    const solutionCard = page.locator('.katex');
    await expect(solutionCard.first()).toBeVisible();

    const displayMath = page.locator('.katex-display');
    await expect(displayMath.first()).toBeVisible();

    const answerContainer = page.locator('#tab-content');
    const text = await answerContainer.innerText();
    expect(text).not.toContain('$$\\begin{bmatrix}');
    expect(text).not.toContain('\\boxed{');
  });

  test('should display accurate context chip text for 3 units and switch units via change-unit menu', async ({
    page,
  }) => {
    // 1. Math Unit 1
    await page.goto('/?subject=math&unit=1');
    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const chip = page.locator('span:has-text("Context:")');
    await expect(chip).toBeVisible();
    await expect(chip).toContainText('Mathematics');
    await expect(chip).toContainText('Unit 1:');

    // 2. Change unit via Change-unit dropdown menu to Unit 2
    const changeUnitBtn = page.locator('button[aria-label="Change syllabus unit"]');
    await expect(changeUnitBtn).toBeVisible();
    await changeUnitBtn.click();

    const menu = page.locator('div[role="menu"]');
    await expect(menu).toBeVisible();
    const unit2MenuItem = menu.locator('button:has-text("Unit 2:")');
    await expect(unit2MenuItem).toBeVisible();
    await unit2MenuItem.click();

    // Verify context chip updated to Unit 2
    await expect(chip).toContainText('Unit 2:');

    // 3. Navigate to Physics Unit 3
    await page.goto('/?subject=phy&unit=3');
    await tutorTab.click();
    await expect(chip).toContainText('Physics');
    await expect(chip).toContainText('Unit 3:');
  });

  test('should block double submit while request is in flight', async ({ page }) => {
    let requestCount = 0;
    await page.route('**/api/tutor', async (route) => {
      requestCount++;
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          answer: '### Answer in one line\nFirst request response.\n### Step by step\nDone.\n### Formula used\nNone\n### Common slip\nNone\n### How to write it for full marks\nDone',
          isLiveAi: true,
        }),
      });
    });

    await page.goto('/?subject=pps&unit=1');
    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await input.fill('What is recursion?');

    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();

    // While in flight, the Ask Tutor button should not trigger duplicate requests
    // (a Stop button is shown or the button is disabled)
    const stopBtn = page.locator('button[title*="Stop generating"]').first();
    await expect(stopBtn).toBeVisible();

    // Try pressing Enter in textarea during generation
    await input.press('Enter');
    await page.waitForTimeout(300);

    // Wait for request to finish
    await expect(stopBtn).toBeHidden({ timeout: 5000 });
    expect(requestCount).toBe(1);
  });

  test('should not show stale response after switching units while request is pending', async ({ page }) => {
    await page.route('**/api/tutor', async (route) => {
      // Delay response by 1200ms
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          answer: '### Answer in one line\nDelayed answer for Unit 1.\n### Step by step\n1. Unit 1 step\n### Formula used\n$U_1$\n### Common slip\nNone\n### How to write it for full marks\nUnit 1 full marks',
          isLiveAi: true,
        }),
      });
    });

    await page.goto('/?subject=beee&unit=1');
    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await input.fill('Explain Ohm law for Unit 1');

    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();

    // While pending, switch to Unit 2 via change-unit menu
    const changeUnitBtn = page.locator('button[aria-label="Change syllabus unit"]');
    await changeUnitBtn.click();
    const unit2Option = page.locator('div[role="menu"] button:has-text("Unit 2:")');
    await unit2Option.click();

    // Wait for the delayed response to complete
    await page.waitForTimeout(1600);

    // Verify Unit 2's message stream does NOT display the response from Unit 1
    const unit2Content = page.locator('#tab-content');
    const unit2Text = await unit2Content.innerText();
    expect(unit2Text).not.toContain('Delayed answer for Unit 1.');
  });

  test('should display offline answer with 5 sections and up to 4 unit diagrams when offline', async ({
    page,
  }) => {
    // Abort API route to force client offline fallback
    await page.route('**/api/tutor', async (route) => {
      await route.abort('failed');
    });

    await page.goto('/?subject=math&unit=1');
    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await input.fill('How to find eigenvalues?');

    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();

    // Verify offline badge
    const offlineBadge = page.locator('text=Offline Syllabus Grounded');
    await expect(offlineBadge.first()).toBeVisible();

    // Verify all 5 structured sections are rendered
    const answerContainer = page.locator('#tab-content');
    const answerText = await answerContainer.innerText();
    expect(answerText).toContain('Answer in one line');
    expect(answerText).toContain('Step by step');
    expect(answerText).toContain('Formula used');
    expect(answerText).toContain('Common slip');
    expect(answerText).toContain('How to write it for full marks');

    // Verify unit diagrams section is visible
    const diagramsTitle = page.locator('text=From this unit\'s notes');
    await expect(diagramsTitle.first()).toBeVisible();

    // Verify at least one diagram thumbnail SVG is displayed
    const diagramThumbs = page.locator('.aspect-video svg');
    await expect(diagramThumbs.first()).toBeVisible();
  });

  test('should jump to Notes tab when "Open in Notes" is clicked', async ({ page }) => {
    await page.route('**/api/tutor', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          answer: '### Answer in one line\nQuick solution.\n### Step by step\nStep 1.\n### Formula used\nFormula.\n### Common slip\nSlip.\n### How to write it for full marks\nMarks.',
          isLiveAi: true,
        }),
      });
    });

    await page.goto('/?subject=phy&unit=1');
    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await input.fill('What is simple harmonic motion?');

    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();

    // Wait for response and click "Open in Notes"
    const openInNotesBtn = page.locator('button:has-text("Open in Notes")');
    await expect(openInNotesBtn.first()).toBeVisible();
    await openInNotesBtn.first().click();

    // Verify active tab switched to Notes (Tab index 1)
    const notesTab = page.locator('#tabs button:has-text("Notes")');
    await expect(notesTab).toHaveClass(/on/);

    // Verify Notes tab content is displayed
    const notesHeader = page.locator('h3:has-text("Exam Revision Notes")');
    await expect(notesHeader.first()).toBeVisible();
  });

  test('should render 390px mobile layout without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/?subject=math&unit=1');

    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await expect(input).toBeVisible();

    // Check document width
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
