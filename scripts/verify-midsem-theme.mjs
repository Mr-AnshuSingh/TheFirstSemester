import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/iansh/.gemini/antigravity/brain/377bf497-3179-4cc1-af8f-25990da70afd';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/midsem...');
  await page.goto('http://localhost:3000/midsem', { waitUntil: 'networkidle' });

  // 1. Notes Tab (Default)
  console.log('Capturing Notes Tab in Notebook Theme...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_notes.png'),
    fullPage: false,
  });

  // 2. Numericals Tab
  console.log('Switching to Solved Numericals...');
  await page.click('button:has-text("Solved Numericals")');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_numericals.png'),
    fullPage: false,
  });

  // 3. CBT MCQs Tab
  console.log('Switching to CBT MCQs...');
  await page.click('button:has-text("CBT MCQs")');
  await page.waitForTimeout(500);
  // Click first option to verify green/red feedback style
  const firstOption = page.locator('button:has-text("A.")').first();
  if (await firstOption.isVisible()) {
    await firstOption.click();
    await page.waitForTimeout(300);
  }
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_mcq.png'),
    fullPage: false,
  });

  // 4. Guess Questions Tab
  console.log('Switching to Guess Questions...');
  await page.click('button:has-text("Guess Questions")');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_guess.png'),
    fullPage: false,
  });

  // 5. BEU Solved Papers Tab
  console.log('Switching to BEU Solved Papers...');
  await page.click('button:has-text("BEU Solved Papers")');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_papers.png'),
    fullPage: false,
  });

  // 6. Mock Exam Simulator Tab
  console.log('Switching to Mock Exam Simulator...');
  await page.click('button:has-text("Mock Exam")');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_simulator.png'),
    fullPage: false,
  });

  // 7. Score Predictor Tab
  console.log('Switching to Score Predictor...');
  await page.click('button:has-text("Score Predictor")');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_predictor.png'),
    fullPage: false,
  });

  // 8. Calculators Tab
  console.log('Switching to Calculators...');
  await page.click('button:has-text("Calculators")');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_calculator.png'),
    fullPage: false,
  });

  // 9. Parchment Theme Toggle
  console.log('Testing Parchment Theme...');
  await page.click('button:has-text("parchment")');
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_parchment_theme.png'),
    fullPage: false,
  });

  // 10. Blueprint Theme Toggle
  console.log('Testing Blueprint Theme...');
  await page.click('button:has-text("blueprint")');
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_blueprint_theme.png'),
    fullPage: false,
  });

  // 11. Switch back to notebook theme and check Mobile 390px
  console.log('Testing Mobile 390px Viewport in Notebook Theme...');
  await page.click('button:has-text("notebook")');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);

  // Check horizontal overflow
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`Mobile 390px horizontal scroll detected: ${hasHorizontalScroll}`);

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_midsem_notebook_mobile_390px.png'),
    fullPage: false,
  });

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
