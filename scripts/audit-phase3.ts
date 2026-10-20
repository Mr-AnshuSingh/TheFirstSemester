import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'C:/Users/iansh/.gemini/antigravity-ide/brain/377bf497-3179-4cc1-af8f-25990da70afd/screenshots';

async function runPhase3Audit() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const baseURL = 'http://localhost:3000';

  console.log('Capturing Phase 3 layout and AC scene verification screenshots...');

  // Helper to select BEEE Unit 2 (AC Circuits: beee:1)
  const selectBeeeAcCircuits = async (page: any) => {
    const beeeChip = page.locator('#subs button:has-text("BEEE")').first();
    if (await beeeChip.count()) {
      await beeeChip.click({ force: true });
      await page.waitForTimeout(400);
    }
    const unit2Btn = page.locator('#units button.un').nth(1);
    if (await unit2Btn.count()) {
      await unit2Btn.click({ force: true });
      await page.waitForTimeout(400);
    }
  };

  // 1. Desktop 1920x1080 - BEEE Unit 2 Step 4 (Power Triangle)
  {
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });

    // Measure Header height
    const headerBox = await page.locator('#hd').boundingBox();
    console.log(`[MEASUREMENT] Header height at 1920x1080: ${headerBox?.height}px (Target < 112px)`);

    await selectBeeeAcCircuits(page);

    // Navigate to Step 4 (Index 3: Power triangle and power factor)
    const step4Btn = page.locator('#cap .dots button').nth(3);
    if (await step4Btn.count()) {
      await step4Btn.click({ force: true });
      await page.waitForTimeout(1000);
    }

    const p = path.join(SCREENSHOTS_DIR, 'phase3_desktop_1920x1080_ac_power_triangle.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase3_desktop_1920x1080_ac_power_triangle.png`);
    await context.close();
  }

  // 2. Desktop 1440x900 - BEEE Unit 2 Step 6 (Live Parameter Lab)
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });

    await selectBeeeAcCircuits(page);

    // Navigate to Step 6 (Index 5: Live Lab)
    const step6Btn = page.locator('#cap .dots button').nth(5);
    if (await step6Btn.count()) {
      await step6Btn.click({ force: true });
      await page.waitForTimeout(1000);
    }

    // Measure bounding boxes to verify ZERO COLLISION between sliders dock and step dots
    const dockBox = await page.locator('#live-dock').boundingBox();
    const dotsBox = await page.locator('#cap .dots').boundingBox();
    console.log(`[ZERO-COLLISION VERIFICATION]`);
    console.log(`  Live Dock bounding box: y=${dockBox?.y}, h=${dockBox?.height}, bottom=${(dockBox?.y || 0) + (dockBox?.height || 0)}`);
    console.log(`  Step Dots bounding box: y=${dotsBox?.y}, h=${dotsBox?.height}`);
    const verticalGap = (dotsBox?.y || 0) - ((dockBox?.y || 0) + (dockBox?.height || 0));
    console.log(`  Vertical separation gap: ${verticalGap}px (Gap >= 0 confirms ZERO overlap)`);

    const p = path.join(SCREENSHOTS_DIR, 'phase3_laptop_1440x900_ac_live_lab.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase3_laptop_1440x900_ac_live_lab.png`);
    await context.close();
  }

  // 3. Desktop 1280x720 - Center Stage 2D Exam Sketchbook Toggle
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage', { timeout: 10000 });

    await selectBeeeAcCircuits(page);

    // Click 2D toggle in stage tools
    const toggle2D = page.locator('#tools button:has-text("2D")').first();
    if (await toggle2D.count()) {
      await toggle2D.click({ force: true });
      await page.waitForTimeout(800);
    }

    const p = path.join(SCREENSHOTS_DIR, 'phase3_desktop_1280x720_stage_2d_sketchbook.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase3_desktop_1280x720_stage_2d_sketchbook.png`);
    await context.close();
  }

  // 4. Tablet Landscape 1024x768 - 3-Column Layout without horizontal overflow
  {
    const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    await page.waitForTimeout(800);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    console.log(`[RESPONSIVE 1024x768] scrollWidth=${overflow.scrollWidth}px, innerWidth=${overflow.innerWidth}px (Overflow: ${overflow.scrollWidth > overflow.innerWidth ? 'YES' : 'NO'})`);

    const p = path.join(SCREENSHOTS_DIR, 'phase3_tablet_1024x768_zero_collision.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase3_tablet_1024x768_zero_collision.png`);
    await context.close();
  }

  // 5. Tablet Portrait 768x1024
  {
    const context = await browser.newContext({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    await page.waitForTimeout(800);

    const p = path.join(SCREENSHOTS_DIR, 'phase3_tablet_portrait_768x1024.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase3_tablet_portrait_768x1024.png`);
    await context.close();
  }

  // 6. Mobile Phone 390x844
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    await page.waitForTimeout(800);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    console.log(`[RESPONSIVE 390x844] scrollWidth=${overflow.scrollWidth}px, innerWidth=${overflow.innerWidth}px (Overflow: ${overflow.scrollWidth > overflow.innerWidth ? 'YES' : 'NO'})`);

    const p = path.join(SCREENSHOTS_DIR, 'phase3_mobile_390x844.png');
    await page.screenshot({ path: p });
    console.log(`Saved: phase3_mobile_390x844.png`);
    await context.close();
  }

  await browser.close();
  console.log('Phase 3 audit complete! All screenshots captured.');
}

runPhase3Audit().catch((err) => {
  console.error('Phase 3 audit failed:', err);
  process.exit(1);
});
