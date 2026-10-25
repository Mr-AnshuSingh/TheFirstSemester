import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'C:/Users/iansh/.gemini/antigravity-ide/brain/377bf497-3179-4cc1-af8f-25990da70afd/screenshots';

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x720', width: 1280, height: 720 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
];

async function runSwitchReproduction() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const baseURL = 'http://localhost:3000';

  console.log('====================================================');
  console.log('2D/3D SWITCH BUG REPRODUCTION & STABILITY AUDIT');
  console.log('====================================================');

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.width < 500 ? 2 : 1,
    });
    const page = await context.newPage();

    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    // (1) Go to step 3, change slider, rotate and zoom, toggle to 2D and back
    console.log(`  (1) Step 3 + camera interaction + toggle roundtrip`);
    await page.goto(`${baseURL}/?subject=beee&unit=2`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Click step 3
    const step3Dot = page.locator('#cap button:has-text("3"), .dots button:nth-child(3)');
    if (await step3Dot.count()) await step3Dot.first().click({ force: true });
    await page.waitForTimeout(300);

    // Rotate / drag canvas
    const canvas = page.locator('#cv');
    if (await canvas.count()) {
      const box = await canvas.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2 - 30);
        await page.mouse.up();
      }
    }
    await page.waitForTimeout(300);

    // Toggle to 2D
    const btn2D = page.locator('#tools button:has-text("2D")');
    if (await btn2D.count()) await btn2D.click({ force: true });
    await page.waitForTimeout(400);

    // Toggle back to 3D
    const btn3D = page.locator('#tools button:has-text("3D")');
    if (await btn3D.count()) await btn3D.click({ force: true });
    await page.waitForTimeout(400);

    const shot1 = path.join(SCREENSHOTS_DIR, `switch_scen1_${vp.name}.png`);
    await page.screenshot({ path: shot1 });
    console.log(`      Screenshot: switch_scen1_${vp.name}.png`);

    // (2) Toggle 30 times quickly
    console.log(`  (2) Toggle 30 times quickly`);
    for (let i = 0; i < 30; i++) {
      if (i % 2 === 0) {
        if (await btn2D.count()) await btn2D.click({ force: true });
      } else {
        if (await btn3D.count()) await btn3D.click({ force: true });
      }
      await page.waitForTimeout(35);
    }
    // Return to 3D
    if (await btn3D.count()) await btn3D.click({ force: true });
    await page.waitForTimeout(400);
    const shot2 = path.join(SCREENSHOTS_DIR, `switch_scen2_30x_${vp.name}.png`);
    await page.screenshot({ path: shot2 });
    console.log(`      Screenshot: switch_scen2_30x_${vp.name}.png`);

    // (3) Resize / rotate viewport while in 2D, then back to 3D
    console.log(`  (3) Resize in 2D then back to 3D`);
    if (await btn2D.count()) await btn2D.click({ force: true });
    await page.waitForTimeout(300);
    // Change viewport size slightly
    await page.setViewportSize({ width: vp.width - 40, height: vp.height - 40 });
    await page.waitForTimeout(300);
    // Back to 3D
    if (await btn3D.count()) await btn3D.click({ force: true });
    await page.waitForTimeout(400);
    // Restore viewport size
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(300);
    const shot3 = path.join(SCREENSHOTS_DIR, `switch_scen3_resize_${vp.name}.png`);
    await page.screenshot({ path: shot3 });
    console.log(`      Screenshot: switch_scen3_resize_${vp.name}.png`);

    // (4) Switch unit and subject while in 2D
    console.log(`  (4) Switch unit & subject while in 2D`);
    if (await btn2D.count()) await btn2D.click({ force: true });
    await page.waitForTimeout(300);
    // Click Math subject
    const mathChip = page.locator('#subs button').filter({ hasText: 'Math' });
    if (await mathChip.count()) await mathChip.first().click({ force: true });
    await page.waitForTimeout(400);
    // Click Unit 2
    const unit2Btn = page.locator('#units button.un').nth(1);
    if (await unit2Btn.count()) await unit2Btn.click({ force: true });
    await page.waitForTimeout(400);
    const shot4 = path.join(SCREENSHOTS_DIR, `switch_scen4_unit_change_${vp.name}.png`);
    await page.screenshot({ path: shot4 });
    console.log(`      Screenshot: switch_scen4_unit_change_${vp.name}.png`);

    // (5) Toggle in bottom-sheet layout (relevant for mobile 390x844 and tablet 768x1024)
    console.log(`  (5) Toggle in bottom-sheet layout`);
    if (await btn3D.count()) await btn3D.click({ force: true });
    await page.waitForTimeout(300);
    if (await btn2D.count()) await btn2D.click({ force: true });
    await page.waitForTimeout(300);
    const shot5 = path.join(SCREENSHOTS_DIR, `switch_scen5_bottomsheet_${vp.name}.png`);
    await page.screenshot({ path: shot5 });
    console.log(`      Screenshot: switch_scen5_bottomsheet_${vp.name}.png`);

    // (6) Open a unit with no 2D diagrams and toggle
    console.log(`  (6) Open PPS Lab (which has 2D diagrams or check empty state handling) and toggle`);
    await page.goto(`${baseURL}/?subject=pps&unit=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    if (await btn2D.count()) await btn2D.click({ force: true });
    await page.waitForTimeout(400);
    const shot6 = path.join(SCREENSHOTS_DIR, `switch_scen6_pps_toggle_${vp.name}.png`);
    await page.screenshot({ path: shot6 });
    console.log(`      Screenshot: switch_scen6_pps_toggle_${vp.name}.png`);

    console.log(`  Console Errors logged: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log(`  Errors:`, consoleErrors);
    }

    await context.close();
  }

  await browser.close();
  console.log('\n2D/3D switch reproduction completed successfully.');
}

runSwitchReproduction().catch((e) => {
  console.error('Fatal in runSwitchReproduction:', e);
  process.exit(1);
});
