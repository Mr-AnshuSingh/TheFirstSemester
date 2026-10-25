import { chromium } from 'playwright';
import path from 'path';

async function main() {
  const artifactDir = 'C:/Users/iansh/.gemini/antigravity-ide/brain/377bf497-3179-4cc1-af8f-25990da70afd';
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1920x1080 - BEEE Unit 1 with KaTeX formulas and clear typography
  {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('http://localhost:3000/?subject=beee&unit=1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const dest = path.join(artifactDir, 'phase2_typography_desktop_beee.png');
    await page.screenshot({ path: dest, fullPage: false });
    console.log('Saved:', dest);
    await page.close();
  }

  // 2. Laptop 1440x900 - Physics Unit 1 (Wave Optics & Lasers) with KaTeX math
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/?subject=phy&unit=1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const dest = path.join(artifactDir, 'phase2_typography_laptop_physics.png');
    await page.screenshot({ path: dest, fullPage: false });
    console.log('Saved:', dest);
    await page.close();
  }

  // 3. Mobile 390x844 - Math-I Unit 1 (Calculus & Matrices) clean wrapped math
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    });
    await page.goto('http://localhost:3000/?subject=math&unit=1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const dest = path.join(artifactDir, 'phase2_typography_mobile_math.png');
    await page.screenshot({ path: dest, fullPage: false });
    console.log('Saved:', dest);
    await page.close();
  }

  // 4. Laptop 1440x900 - Worked Problem Exam Model Box with KaTeX
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/?subject=math&unit=1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    // Scroll down to the worked numerical box
    const workedBox = page.locator('text=Exam Model Worked Problem').first();
    if (await workedBox.count()) {
      await workedBox.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }
    const dest = path.join(artifactDir, 'phase2_typography_worked_example.png');
    await page.screenshot({ path: dest, fullPage: false });
    console.log('Saved:', dest);
    await page.close();
  }

  await browser.close();
  console.log('Phase 2 screenshots captured successfully.');
}

main().catch(console.error);
