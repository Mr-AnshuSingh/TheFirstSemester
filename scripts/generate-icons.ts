import { chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

async function generateIcons() {
  const iconSvgPath = path.resolve(__dirname, '../public/icons/icon.svg');
  const svgContent = fs.readFileSync(iconSvgPath, 'utf-8');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Create an HTML wrapper around the SVG
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; width: 100vw; height: 100vh; overflow: hidden; }
          svg { width: 100%; height: 100%; display: block; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `;

  await page.setContent(html);

  // 1. Generate 512x512 icon
  await page.setViewportSize({ width: 512, height: 512 });
  const icon512Path = path.resolve(__dirname, '../public/icons/icon-512.png');
  await page.screenshot({ path: icon512Path, omitBackground: false });
  console.log('Generated icon-512.png');

  // 2. Generate 192x192 icon
  await page.setViewportSize({ width: 192, height: 192 });
  const icon192Path = path.resolve(__dirname, '../public/icons/icon-192.png');
  await page.screenshot({ path: icon192Path, omitBackground: false });
  console.log('Generated icon-192.png');

  // 3. Generate 512x512 maskable icon (with safe padding)
  const maskableHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: #f4f1ea; display: flex; align-items: center; justify-content: center; width: 512px; height: 512px; }
          .container { width: 420px; height: 420px; }
          svg { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div class="container">
          ${svgContent}
        </div>
      </body>
    </html>
  `;
  await page.setContent(maskableHtml);
  await page.setViewportSize({ width: 512, height: 512 });
  const maskablePath = path.resolve(__dirname, '../public/icons/icon-maskable-512.png');
  await page.screenshot({ path: maskablePath });
  console.log('Generated icon-maskable-512.png');

  await browser.close();
  console.log('All PWA icons generated successfully!');
}

generateIcons().catch((err) => {
  console.error('Failed to generate PWA icons:', err);
  process.exit(1);
});
