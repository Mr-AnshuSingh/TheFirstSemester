import { chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

async function auditPhase5() {
  const screenshotsDir = path.resolve('C:/Users/iansh/.gemini/antigravity-ide/brain/377bf497-3179-4cc1-af8f-25990da70afd/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('--- Launching Browser for Phase 5 Content Audit ---');
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop Test (1440x900)
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    console.log('Navigating to http://localhost:3000 ...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Switch to AI subject
    console.log('Switching to AI subject...');
    const aiBtn = page.locator('button:has-text("AI")').first();
    await aiBtn.click();
    await page.waitForTimeout(600);

    // Click Unit 2 (Problem Solving by Search)
    console.log('Selecting Unit 2: Problem Solving by Search...');
    const unit2Btn = page.locator('button:has-text("Problem Solving by Search")').first();
    if (await unit2Btn.isVisible()) {
      await unit2Btn.click();
      await page.waitForTimeout(600);
    }

    // Ensure Explain tab is active
    const explainTab = page.locator('button:text-is("Explain")').first();
    await explainTab.click();
    await page.waitForTimeout(400);

    // Locate "Exam Model Worked Problem"
    console.log('Locating Exam Model Worked Problem card...');
    const workedHeader = page.locator('h4:has-text("Exam Model Worked Problem")');
    await workedHeader.waitFor({ state: 'visible', timeout: 10000 });
    await workedHeader.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const workedContent = await page.locator('.box:has(h4:has-text("Exam Model Worked Problem"))').innerText();
    console.log('AI Unit 2 Worked Problem Content Preview:\n', workedContent.slice(0, 220) + '...');

    const shotAIWorked = path.join(screenshotsDir, 'phase5_worked_example_ai_search.png');
    await page.screenshot({ path: shotAIWorked });
    console.log(`Saved screenshot: ${shotAIWorked}`);

    // Switch to UHV (previously had 0 worked problems)
    console.log('Switching to UHV subject...');
    const uhvBtn = page.locator('button:has-text("UHV")').first();
    await uhvBtn.click();
    await page.waitForTimeout(600);

    const uhvWorkedHeader = page.locator('h4:has-text("Exam Model Worked Problem")');
    await uhvWorkedHeader.waitFor({ state: 'visible', timeout: 10000 });
    await uhvWorkedHeader.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const uhvShot = path.join(screenshotsDir, 'phase5_worked_example_uhv.png');
    await page.screenshot({ path: uhvShot });
    console.log(`Saved screenshot: ${uhvShot}`);

    // Test All Notes Modal
    console.log('Opening All Notes Handbook Modal...');
    const toolsBtn = page.locator('button:has-text("Tools")').first();
    await toolsBtn.click();
    await page.waitForTimeout(300);

    const allNotesBtn = page.locator('button:has-text("All Notes & PDF Export")').first();
    await allNotesBtn.click();
    await page.waitForTimeout(800);

    // Verify modal is open and count .we elements
    const modalHeader = page.locator('#nmodal h2:has-text("All notes")');
    await modalHeader.waitFor({ state: 'visible', timeout: 5000 });

    const workedCountInModal = await page.locator('.we').count();
    console.log(`Verified Worked Examples count in Handbook Modal: ${workedCountInModal} of 43 expected`);

    const modalShot = path.join(screenshotsDir, 'phase5_worked_examples_notes_modal.png');
    await page.screenshot({ path: modalShot });
    console.log(`Saved screenshot: ${modalShot}`);

    // Close modal via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // 2. Mobile Audit (390x844)
    console.log('Auditing mobile responsiveness (390x844)...');
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    // Switch to Physics
    const mobPhy = mobilePage.locator('button:has-text("Physics")').first();
    await mobPhy.click();
    await mobilePage.waitForTimeout(500);

    // Scroll to worked problem on mobile
    const mobWorkedHeader = mobilePage.locator('h4:has-text("Exam Model Worked Problem")');
    await mobWorkedHeader.waitFor({ state: 'visible', timeout: 10000 });
    await mobWorkedHeader.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(600);

    const mobShot = path.join(screenshotsDir, 'phase5_worked_examples_mobile.png');
    await mobilePage.screenshot({ path: mobShot });
    console.log(`Saved screenshot: ${mobShot}`);

    await mobileContext.close();
    await context.close();
    console.log('--- Phase 5 Audit Completed Successfully! ---');
  } finally {
    await browser.close();
  }
}

auditPhase5().catch((err) => {
  console.error('Phase 5 audit failed:', err);
  process.exit(1);
});
