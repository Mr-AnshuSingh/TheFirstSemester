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
    const tabs = ['Explain', '2D Diagrams', 'Notes', 'Topics', 'Quiz', 'Exam', 'AI Tutor'];

    for (const tab of tabs) {
      const tabBtn = page.locator('#tabs button').filter({ hasText: tab }).first();
      if (await tabBtn.isVisible()) {
        await tabBtn.click();
        await page.waitForTimeout(300);
        await assertNoHorizontalOverflow(tab);
      }
    }

    // 3. Verify diagrams in 2D Diagrams tab scale within 390px
    await page.locator('#tabs button').filter({ hasText: '2D Diagrams' }).first().click();
    await page.waitForTimeout(300);

    const svgs = page.locator('#tab-content svg');
    const svgCount = await svgs.count();
    if (svgCount > 0) {
      for (let i = 0; i < Math.min(svgCount, 3); i++) {
        const box = await svgs.nth(i).boundingBox();
        if (box) {
          expect(box.width).toBeLessThanOrEqual(390);
        }
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
