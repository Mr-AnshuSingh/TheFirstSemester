import { chromium } from '@playwright/test';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/iansh/.gemini/antigravity-ide/brain/377bf497-3179-4cc1-af8f-25990da70afd';

async function capturePhase3Screenshots() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 3D View (1280x720) - BEEE Unit 2
  console.log('Capturing Desktop 3D view...');
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('http://localhost:3000/?subject=beee&unit=2', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'phase3_3d_engine_desktop.png'),
    fullPage: false,
  });

  // 2. Desktop 2D Diagram View (1280x720) - Click 2D button
  console.log('Capturing Desktop 2D diagram view...');
  const btn2D = desktopPage.locator('#tools button:has-text("2D")');
  if (await btn2D.count()) {
    await btn2D.first().click();
    await desktopPage.waitForTimeout(600);
  }
  await desktopPage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'phase3_2d_diagram_desktop.png'),
    fullPage: false,
  });

  // 3. Desktop Switch Roundtrip back to 3D
  console.log('Capturing Desktop 3D switch roundtrip...');
  const btn3D = desktopPage.locator('#tools button:has-text("3D")');
  if (await btn3D.count()) {
    await btn3D.first().click();
    await desktopPage.waitForTimeout(600);
  }
  await desktopPage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'phase3_view_switch_roundtrip.png'),
    fullPage: false,
  });
  await desktopCtx.close();

  // 4. Mobile 3D View (390x844) - Math Unit 2 Step 2
  console.log('Capturing Mobile 3D view...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:3000/?subject=math&unit=2', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'phase3_3d_engine_mobile.png'),
    fullPage: false,
  });
  await mobileCtx.close();

  await browser.close();
  console.log('All Phase 3 verification screenshots captured successfully!');
}

capturePhase3Screenshots().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
