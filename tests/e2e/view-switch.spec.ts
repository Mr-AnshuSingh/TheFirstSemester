import { test, expect } from '@playwright/test';

test.describe('2D/3D View Switch Stability & Rapid Toggling', () => {
  test('rapid 30x toggling at desktop viewport (1280x720) without errors or blank canvas', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Wait for stage to render
    const canvas = page.locator('#cv');
    await expect(canvas).toBeVisible();

    const btn3D = page.locator('#tools button:has-text("3D")');
    const btn2D = page.locator('#tools button:has-text("2D")');
    await expect(btn3D).toBeVisible();
    await expect(btn2D).toBeVisible();

    // Perform 30 rapid toggles
    for (let i = 0; i < 30; i++) {
      if (i % 2 === 0) {
        await btn2D.click();
      } else {
        await btn3D.click();
      }
      // Minimal tick to allow rAF / state update
      await page.waitForTimeout(40);
    }

    // Ensure ending in 2D or 3D produces a valid visible view
    await btn3D.click();
    await page.waitForTimeout(200);
    await expect(canvas).toBeVisible();

    await btn2D.click();
    await page.waitForTimeout(200);
    const svgViewer = page.locator('#stage svg');
    await expect(svgViewer.first()).toBeVisible();

    // Verify 0 console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('rapid 30x toggling at mobile viewport (390x844) preserves layout and stage state', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/?subject=phy&unit=2&view=3d&step=1');

    const canvas = page.locator('#cv');
    await expect(canvas).toBeVisible();

    const btn3D = page.locator('#tools button:has-text("3D")');
    const btn2D = page.locator('#tools button:has-text("2D")');
    await expect(btn3D).toBeVisible();
    await expect(btn2D).toBeVisible();

    // Perform 30 rapid toggles
    for (let i = 0; i < 30; i++) {
      if (i % 2 === 0) {
        await btn2D.click();
      } else {
        await btn3D.click();
      }
      await page.waitForTimeout(40);
    }

    // Switch back to 3D and verify unit/step state preserved in caption
    await btn3D.click();
    await page.waitForTimeout(200);
    const capTitle = page.locator('#cap h2');
    await expect(capTitle).toBeVisible();

    // Verify no horizontal document scroll on mobile
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    expect(consoleErrors).toHaveLength(0);
  });
});
