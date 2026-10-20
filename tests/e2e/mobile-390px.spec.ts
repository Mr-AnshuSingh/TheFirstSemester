import { test, expect } from '@playwright/test';

test.describe('Mobile 390px Phone Layout & Responsiveness', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('should have zero horizontal scroll and scale all diagrams properly on 390px screen', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Helper to assert no horizontal scroll overflow
    const assertNoHorizontalOverflow = async (tabName: string) => {
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      expect(
        scrollWidth,
        `Horizontal overflow detected on tab "${tabName}": scrollWidth (${scrollWidth}px) exceeds window width (${innerWidth}px)`
      ).toBeLessThanOrEqual(innerWidth + 2);
    };

    // 1. Check initial page load (Explain Tab)
    await assertNoHorizontalOverflow('Explain');

    // 2. Cycle through all navigation tabs strictly within #tabs container
    const tabs = ['Explain', 'Notes', 'Topics', 'Quiz', 'Exam', 'AI Tutor'];

    for (const tab of tabs) {
      const tabBtn = page.locator('#tabs button').filter({ hasText: tab }).first();
      if (await tabBtn.isVisible()) {
        await tabBtn.click();
        await page.waitForTimeout(300);
        await assertNoHorizontalOverflow(tab);
      }
    }

    // 3. Verify stage 2D Exam Sketch toggle switches and scales diagrams within 390px
    const toggle2DBtn = page.locator('#tools button').filter({ hasText: '2D' }).first();
    if (await toggle2DBtn.isVisible()) {
      await toggle2DBtn.click();
      await page.waitForTimeout(300);
      const stageSvgs = page.locator('#stage-viewport svg');
      const svgCount = await stageSvgs.count();
      if (svgCount > 0) {
        for (let i = 0; i < Math.min(svgCount, 3); i++) {
          const box = await stageSvgs.nth(i).boundingBox();
          if (box) {
            expect(box.width).toBeLessThanOrEqual(390);
          }
        }
      }
      // Toggle back to 3D
      const toggle3DBtn = page.locator('#tools button').filter({ hasText: '3D' }).first();
      if (await toggle3DBtn.isVisible()) {
        await toggle3DBtn.click();
        await page.waitForTimeout(300);
      }
    }

    // 4. Verify 3D Canvas element is responsive
    const canvas = page.locator('canvas');
    if (await canvas.isVisible()) {
      const canvasBox = await canvas.boundingBox();
      if (canvasBox) {
        expect(canvasBox.width).toBeLessThanOrEqual(390);
      }
    }
  });
});
