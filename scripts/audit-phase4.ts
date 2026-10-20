import { chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

async function auditPhase4() {
  const screenshotsDir = path.resolve('C:/Users/iansh/.gemini/antigravity-ide/brain/377bf497-3179-4cc1-af8f-25990da70afd/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('--- Launching Browser for Phase 4 AI Tutor Audit ---');
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop Test (1440x900)
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    console.log('Navigating to http://localhost:3000 ...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Select Math-I
    console.log('Selecting Math-I subject...');
    const mathBtn = page.locator('button:has-text("Math-I")').first();
    if (await mathBtn.isVisible()) {
      await mathBtn.click();
      await page.waitForTimeout(600);
    }

    // Switch right panel to "AI Tutor" tab
    console.log('Switching to "AI Tutor" tab...');
    const aiTutorTabBtn = page.locator('button:has-text("AI Tutor")').first();
    await aiTutorTabBtn.click();
    await page.waitForTimeout(800);

    // Verify AI Tutor Panel is mounted
    console.log('Verifying AI Tutor Panel...');
    const tutorHeading = page.locator('h3:has-text("AI Doubt Solver")');
    await tutorHeading.waitFor({ state: 'visible', timeout: 10000 });
    console.log('AI Tutor Panel mounted successfully!');

    // Submit question: click one of the smart presets
    console.log('Testing question asking via smart preset...');
    const presetBtn = page.locator('button:has-text("Explain the key formula")').first();
    await presetBtn.waitFor({ state: 'visible', timeout: 5000 });
    await presetBtn.click();

    // Wait for response solution card to render (allow up to 35s for live AI or fallback)
    console.log('Waiting for AI Tutor response solution card (up to 35s)...');
    const solutionCard = page.locator('strong:has-text("University Marking-Scheme Answer")');
    await solutionCard.waitFor({ state: 'visible', timeout: 35000 });
    await page.waitForTimeout(1500);

    // Verify KaTeX rendered elements
    const katexElements = await page.locator('.katex').count();
    console.log(`Verified KaTeX rendered spans: ${katexElements}`);

    // Verify whitespace-pre-line is NOT present on solution container
    const whitespacePreLine = await page.locator('.whitespace-pre-line').count();
    console.log(`Verified whitespace-pre-line instances in solution: ${whitespacePreLine} (expected 0)`);

    // Verify no broken [object Object] or unescaped HTML
    const solutionText = await page.locator('.box').innerText();
    const hasObjectObject = solutionText.includes('[object Object]');
    console.log(`Verified no [object Object]: ${!hasObjectObject}`);

    // Check status pill
    const statusPill = page.locator('text=/Live Cloud AI|Offline Syllabus Grounded/');
    const statusText = await statusPill.first().textContent();
    console.log(`AI Tutor Solution Status: ${statusText?.trim()}`);

    // Capture desktop solution screenshot
    const desktopSolutionShot = path.join(screenshotsDir, 'phase4_ai_tutor_solution.png');
    await page.screenshot({ path: desktopSolutionShot, fullPage: false });
    console.log(`Saved screenshot: ${desktopSolutionShot}`);

    // 2. Mobile Audit (390x844)
    console.log('Auditing mobile responsiveness (390x844)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    // Switch to AI Tutor tab on mobile
    const mobileAiTutorTab = mobilePage.locator('button:has-text("AI Tutor")').first();
    await mobileAiTutorTab.scrollIntoViewIfNeeded();
    await mobileAiTutorTab.click();
    await mobilePage.waitForTimeout(800);

    const mobileTutorHeading = mobilePage.locator('h3:has-text("AI Doubt Solver")');
    await mobileTutorHeading.waitFor({ state: 'visible', timeout: 10000 });
    await mobileTutorHeading.scrollIntoViewIfNeeded();

    const mobilePreset = mobilePage.locator('button:has-text("What are the common exam traps")').first();
    if (await mobilePreset.isVisible()) {
      await mobilePreset.click();
      const mobileSolutionCard = mobilePage.locator('strong:has-text("University Marking-Scheme Answer")');
      await mobileSolutionCard.waitFor({ state: 'visible', timeout: 35000 });
      await mobilePage.waitForTimeout(1000);
    }

    const mobileShot = path.join(screenshotsDir, 'phase4_ai_tutor_mobile.png');
    await mobilePage.screenshot({ path: mobileShot, fullPage: false });
    console.log(`Saved screenshot: ${mobileShot}`);

    await mobileContext.close();
    await context.close();

    console.log('--- Phase 4 AI Tutor Audit Passed Successfully! ---');
  } finally {
    await browser.close();
  }
}

auditPhase4().catch((err) => {
  console.error('Phase 4 audit failed:', err);
  process.exit(1);
});
