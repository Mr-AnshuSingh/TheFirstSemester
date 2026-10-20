import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'C:/Users/iansh/.gemini/antigravity-ide/brain/377bf497-3179-4cc1-af8f-25990da70afd/screenshots';

async function runPhase2Audit() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const baseURL = 'http://localhost:3000';

  console.log('Capturing Phase 2 typography verification screenshots...');

  // 1. Desktop 1920x1080 - BEEE Unit 1 Overview
  {
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    await page.waitForTimeout(1000);
    const p = path.join(SCREENSHOTS_DIR, 'phase2_beee_unit1_1920x1080.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase2_beee_unit1_1920x1080.png`);
    await context.close();
  }

  // 2. Desktop 1280x720 - BEEE Unit 2 Live Step
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    const unit2Btn = page.locator('#units button.un').nth(1);
    if (await unit2Btn.count()) {
      await unit2Btn.click({ force: true });
    }
    await page.waitForTimeout(1000);
    const p = path.join(SCREENSHOTS_DIR, 'phase2_beee_unit2_live_1280x720.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase2_beee_unit2_live_1280x720.png`);
    await context.close();
  }

  // 3. Desktop 1440x900 - Unit Quiz & Explanations Tab
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    const quizTab = page.locator('#tabbar button').filter({ hasText: 'Quiz' });
    if (await quizTab.count()) {
      await quizTab.first().click({ force: true });
      await page.waitForTimeout(800);
      // Answer first question to reveal explanation
      const firstOpt = page.locator('button:has-text("A.")').first();
      if (await firstOpt.count()) {
        await firstOpt.click({ force: true });
        await page.waitForTimeout(500);
      }
    }
    const p = path.join(SCREENSHOTS_DIR, 'phase2_unit_quiz_1440x900.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase2_unit_quiz_1440x900.png`);
    await context.close();
  }

  // 4. Desktop 1440x900 - Formula Sheet Modal
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    const formulaBtn = page.locator('button:has-text("Formulas")');
    if (await formulaBtn.count()) {
      await formulaBtn.first().click({ force: true });
      await page.waitForTimeout(800);
    }
    const p = path.join(SCREENSHOTS_DIR, 'phase2_formula_sheet_1440x900.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase2_formula_sheet_1440x900.png`);
    await context.close();
  }

  // 5. Mobile 390x844 - Responsive Mobile View
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    await page.waitForTimeout(1000);
    const p = path.join(SCREENSHOTS_DIR, 'phase2_mobile_390x844.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase2_mobile_390x844.png`);
    await context.close();
  }

  await browser.close();
  console.log('Phase 2 screenshot verification completed successfully!');
}

runPhase2Audit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
