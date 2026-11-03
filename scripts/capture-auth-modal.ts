import { chromium } from '@playwright/test';
import * as path from 'path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click Tools
  const toolsBtn = page.locator('button:has-text("Tools")').first();
  await toolsBtn.click();
  await page.waitForTimeout(300);

  // Click Supabase Cloud Sync
  const syncBtn = page.locator('button:has-text("Supabase Cloud Sync")').first();
  await syncBtn.click();
  await page.waitForTimeout(600);

  const outPath = path.resolve('C:/Users/iansh/.gemini/antigravity/brain/377bf497-3179-4cc1-af8f-25990da70afd/supabase_cloud_sync_modal.png');
  await page.screenshot({ path: outPath });
  console.log('Saved screenshot:', outPath);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

