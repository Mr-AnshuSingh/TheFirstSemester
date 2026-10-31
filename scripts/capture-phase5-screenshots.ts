import { chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

async function capturePhase5Screenshots() {
  const screenshotsDir = path.resolve('C:/Users/iansh/.gemini/antigravity/brain/377bf497-3179-4cc1-af8f-25990da70afd');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('--- Launching Browser for Phase 5 Verification Screenshots ---');
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    console.log('Navigating to http://localhost:3000 ...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 1. Topic Persistence Check
    console.log('Capturing Topic Persistence check...');
    const topicsTabBtn = page.locator('button:has-text("Topics")').first();
    await topicsTabBtn.click();
    await page.waitForTimeout(500);

    // Click the first topic checkbox
    const firstLabel = page.locator('label.tk').first();
    await firstLabel.click();
    await page.waitForTimeout(800); // Allow 500ms debounce save

    // Reload page to verify persistence
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.locator('button:has-text("Topics")').first().click();
    await page.waitForTimeout(500);

    const shotTopic = path.join(screenshotsDir, 'phase5_topic_persistence.png');
    await page.screenshot({ path: shotTopic });
    console.log(`Saved screenshot: ${shotTopic}`);

    // 2. Backup & Persistence Hub Modal with Diagnostics
    console.log('Capturing Backup & Persistence Hub modal...');
    const toolsBtn = page.locator('button:has-text("Tools")').first();
    if (await toolsBtn.isVisible()) {
      await toolsBtn.click();
      await page.waitForTimeout(300);
    }
    const backupBtn = page.locator('button:has-text("Backup")').first();
    await backupBtn.click();
    await page.waitForTimeout(600);

    // Test inserting valid JSON backup into textarea to showcase validation banner
    const validPackage = {
      app: 'LNJPIT Semester I Study App (Mathematics & Computing)',
      schemaVersion: 2,
      exportedAt: new Date().toISOString(),
      totalTopicsCleared: 5,
      payload: {
        version: 2,
        done: { 'math:0:0': 1, 'math:0:1': 1, 'math:0:2': 1, 'math:1:0': 1, 'phy:0:0': 1 },
        confidence: { 'math:0:0': 2, 'math:0:1': 2 },
        weakSpots: {},
        exam: '2026-11-20',
        lab: 'G1',
        at: [0, 0],
        tab: 0,
        customNotes: { 'math:0': 'Reviewed Cayley-Hamilton and rank calculations thoroughly.' },
        flashcards: {},
        unitViews: {},
        batterySaver: false,
        lastMode: '3d',
      },
    };

    const jsonTextarea = page.locator('textarea[placeholder*="Paste your JSON backup payload here"]');
    await jsonTextarea.fill(JSON.stringify(validPackage, null, 2));
    await page.waitForTimeout(500);

    const shotBackupModal = path.join(screenshotsDir, 'phase5_backup_restore_modal.png');
    await page.screenshot({ path: shotBackupModal });
    console.log(`Saved screenshot: ${shotBackupModal}`);

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // 3. Command Palette / Offline Persistence Hub Search
    console.log('Capturing Offline Hub & Command Palette...');
    // Open command palette with Ctrl+K
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(500);

    const shotCmdPalette = path.join(screenshotsDir, 'phase5_offline_pwa_readiness.png');
    await page.screenshot({ path: shotCmdPalette });
    console.log(`Saved screenshot: ${shotCmdPalette}`);

    // Close palette
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // 4. Worked Numerical Example KaTeX Verification (Default Subject / Explain Tab)
    console.log('Capturing Worked Example with full KaTeX formatting...');
    const explainTab = page.locator('button:text-is("Explain")').first();
    await explainTab.click();
    await page.waitForTimeout(400);

    const workedCard = page.locator('.we, .worked-problem-box, :is(h3, h4):has-text("Exam Model Worked Problem")').first();
    if (await workedCard.isVisible()) {
      await workedCard.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      const shotWorked = path.join(screenshotsDir, 'phase5_worked_example.png');
      await workedCard.screenshot({ path: shotWorked });
      console.log(`Saved screenshot: ${shotWorked}`);
    }

    console.log('--- Phase 5 Screenshot Capture Completed Successfully! ---');
  } finally {
    await browser.close();
  }
}

capturePhase5Screenshots().catch((err) => {
  console.error('Phase 5 screenshot capture failed:', err);
  process.exit(1);
});

