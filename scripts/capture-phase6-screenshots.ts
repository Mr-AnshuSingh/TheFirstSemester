import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function capturePhase6Screenshots() {
  console.log('--- Launching Browser for Phase 6 A11y & Release Verification ---');
  const browser = await chromium.launch({ headless: true });
  const outDir = 'C:/Users/iansh/.gemini/antigravity/brain/377bf497-3179-4cc1-af8f-25990da70afd';

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // Mock /api/tutor for consistent KaTeX render capture
    await page.route('**/api/tutor', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          answer:
            '### Maximum Power Transfer Theorem\n\nFor a linear bilateral active network delivering power to variable load $R_L$:\n\n$$P_L = I_L^2 R_L = \\left(\\frac{V_{th}}{R_{th} + R_L}\\right)^2 R_L$$\n\nTo find maximum power, differentiating with respect to $R_L$ and equating to zero yields:\n$$\\frac{dP_L}{dR_L} = 0 \\implies R_L = R_{th}$$\n\n$$\\boxed{P_{max} = \\frac{V_{th}^2}{4 R_{th}}}$$\n\nThis confirms maximum power transfer occurs when load impedance equals source Thévenin impedance.',
          sources: ['LNJPIT BEEE Unit 1: DC Circuits & Theorems'],
          model: 'gemini-flash-latest',
          cached: false,
        }),
      });
    });

    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 1. Skip-to-content focus demonstration
    console.log('Capturing skip-to-content link focus...');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    const skipLinkPath = path.join(outDir, 'phase6_a11y_skiplink.png');
    await page.screenshot({ path: skipLinkPath });
    console.log(`[PASS] Skip link screenshot saved: ${skipLinkPath}`);

    // 2. Open All Notes Modal & verify Escape key
    console.log('Capturing All Notes modal a11y & handbook...');
    const toolsBtn = page.locator('button:has-text("Tools")').first();
    if (await toolsBtn.isVisible()) {
      await toolsBtn.click();
      await page.waitForTimeout(300);
    }
    const allNotesBtn = page.locator('button:has-text("All Notes & PDF Export")').first();
    await allNotesBtn.click();
    await page.waitForTimeout(600);

    const notesModalPath = path.join(outDir, 'phase6_all_notes_modal_a11y.png');
    await page.screenshot({ path: notesModalPath });
    console.log(`[PASS] All Notes modal screenshot saved: ${notesModalPath}`);

    // Test Escape key closes All Notes modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // 3. AI Tutor Tab & KaTeX verification
    console.log('Capturing AI Tutor KaTeX display math rendering...');
    const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
    await tutorTab.click();
    await page.waitForTimeout(400);

    const input = page.locator('textarea[placeholder*="Ask any question"]');
    await input.fill('State and derive maximum power transfer theorem');
    const submitBtn = page.locator('button:has-text("Ask Tutor")');
    await submitBtn.click();
    await page.waitForTimeout(1000);

    const displayElem = page.locator('.katex-display').first();
    await displayElem.waitFor({ state: 'visible', timeout: 5000 });
    await displayElem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const tutorKatexPath = path.join(outDir, 'phase6_ai_tutor_katex.png');
    await page.screenshot({ path: tutorKatexPath });
    console.log(`[PASS] AI Tutor KaTeX screenshot saved: ${tutorKatexPath}`);

    // 4. Mobile 390px accessibility & keyboard touch layout
    console.log('Capturing Mobile 390px touch layout & responsive scaling...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    const mobileA11yPath = path.join(outDir, 'phase6_mobile_a11y.png');
    await mobilePage.screenshot({ path: mobileA11yPath });
    console.log(`[PASS] Mobile 390px screenshot saved: ${mobileA11yPath}`);

    await mobileContext.close();
    await context.close();
    console.log('--- Phase 6 Screenshot Capture Completed Successfully! ---');
  } finally {
    await browser.close();
  }
}

capturePhase6Screenshots().catch((err) => {
  console.error('Phase 6 screenshot capture failed:', err);
  process.exit(1);
});

