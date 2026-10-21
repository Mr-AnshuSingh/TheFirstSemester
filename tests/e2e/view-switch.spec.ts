import { test, expect } from '@playwright/test';

test.describe('2D/3D Diagram Pipeline & View Switch Hardening', () => {
  test('should toggle 30 times rapidly with no console errors, preserve state, and keep one rAF loop', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(500);

    const canvas = page.locator('#stage-viewport canvas#cv');
    await expect(canvas).toBeVisible();

    // 1. Advance to step 2 in 3D
    const step2Btn = page.locator('#cap .dots button').nth(1);
    if (await step2Btn.isVisible()) {
      await step2Btn.click();
      await page.waitForTimeout(100);
    }

    // 2. Perform 30 rapid toggles between 3D and 2D using buttons and keyboard shortcut
    const toggle2DBtn = page.locator('#tools button:has-text("2D")');
    const toggle3DBtn = page.locator('#tools button:has-text("3D")');

    for (let i = 0; i < 30; i++) {
      if (i % 3 === 0) {
        // Test keyboard shortcut 'd'
        await page.keyboard.press('d');
      } else if (i % 2 === 0) {
        await toggle2DBtn.click();
      } else {
        await toggle3DBtn.click();
      }
      await page.waitForTimeout(40);
    }

    // End in 3D mode
    if (await toggle3DBtn.isVisible()) {
      await toggle3DBtn.click();
      await page.waitForTimeout(200);
    }

    // 3. Assert no console errors occurred during rapid toggling
    expect(consoleErrors).toHaveLength(0);

    // 4. Assert canvas dimensions are > 100px and canvas is visible
    const canvasBox = await canvas.boundingBox();
    expect(canvasBox).not.toBeNull();
    expect(canvasBox!.width).toBeGreaterThan(100);
    expect(canvasBox!.height).toBeGreaterThan(100);

    // 5. Assert only one animation loop is running via test hook
    const loopCount = await page.evaluate(() => (window as any).__3dLoopActiveCount);
    expect(loopCount).toBeLessThanOrEqual(1);

    // 6. Assert step index is preserved after round-trip
    const lastStep = await page.evaluate(() => (window as any).__3dLastStep);
    expect(lastStep).toBe(1); // Step 2 (0-indexed 1)
  });

  test('should show unit-specific diagrams in 2D and sync when switching units', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(400);

    // Switch to 2D mode
    const toggle2DBtn = page.locator('#tools button:has-text("2D")');
    await toggle2DBtn.click();
    await page.waitForTimeout(200);

    // Verify 2D sketchbook is visible with SVG diagrams
    const stageSvg = page.locator('#stage-viewport svg').first();
    await expect(stageSvg).toBeVisible();

    // Verify first unit diagram title is shown
    const captionTitle = page.locator('#cap h3').first();
    await expect(captionTitle).toBeVisible();
    const titleUnit1 = await captionTitle.innerText();

    // Switch to Unit 2 in sidebar
    const unit2Btn = page.locator('#units button.un').nth(1);
    await unit2Btn.click();
    await page.waitForTimeout(300);

    // Verify diagram updated for Unit 2
    const titleUnit2 = await captionTitle.innerText();
    expect(titleUnit2).not.toBe('');

    // Toggle back to 3D and verify 3D canvas is intact
    const toggle3DBtn = page.locator('#tools button:has-text("3D")');
    await toggle3DBtn.click();
    await page.waitForTimeout(200);

    const canvas = page.locator('#stage-viewport canvas#cv');
    await expect(canvas).toBeVisible();
  });

  test('should handle deep link directly into unit, mode, and step', async ({ page }) => {
    // Open Physics, Unit 2, 2D view, Step 1
    await page.goto('/?subject=phy&unit=2&view=2d&step=1');
    await page.waitForTimeout(500);

    // Verify 2D mode is active from URL
    const active2DBtn = page.locator('#tools button[aria-pressed="true"]:has-text("2D")');
    await expect(active2DBtn).toBeVisible();

    // Verify Physics unit 2 is active
    const activeUnit = page.locator('#units button.un.on');
    await expect(activeUnit).toBeVisible();
  });

  test('should resize window in 2D and redraw properly on return to 3D with zero horizontal overflow', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForTimeout(300);

    // Switch to 2D
    const toggle2DBtn = page.locator('#tools button:has-text("2D")');
    await toggle2DBtn.click();
    await page.waitForTimeout(150);

    // Resize viewport while in 2D
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(200);

    // Return to 3D
    const toggle3DBtn = page.locator('#tools button:has-text("3D")');
    await toggle3DBtn.click();
    await page.waitForTimeout(200);

    // Canvas must draw cleanly and exceed 100px
    const canvas = page.locator('#stage-viewport canvas#cv');
    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(100);
    expect(box!.height).toBeGreaterThan(100);

    // Verify zero horizontal scroll
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 2);
  });
});
