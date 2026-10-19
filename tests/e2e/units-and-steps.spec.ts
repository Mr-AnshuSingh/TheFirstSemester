import { test, expect } from '@playwright/test';

test.describe('Units and 3D Steps Exploration', () => {
  test('should load all subjects and cycle 3D scene steps', async ({ page }) => {
    await page.goto('/');

    // 1. Verify header and brand
    await expect(page.locator('#brand')).toContainText('Semester I, unit by unit');

    // 2. Verify subject chips exist and are clickable
    const subjectChips = page.locator('#subs button.chip');
    await expect(subjectChips).toHaveCount(8);

    // Click Physics (index 1)
    await subjectChips.nth(1).click();
    await expect(subjectChips.nth(1)).toHaveClass(/on/);

    // Verify units in sidebar for Physics
    const unitButtons = page.locator('#units button.un');
    const unitCount = await unitButtons.count();
    expect(unitCount).toBeGreaterThanOrEqual(4);

    // Click Unit 2 in Physics
    await unitButtons.nth(1).click();
    await expect(unitButtons.nth(1)).toHaveClass(/on/);

    // 3. Test 3D Canvas / Step Stepper controls
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Find step navigation buttons (prev / next)
    const nextStepBtn = page.locator('button[title*="Next step"], button:has-text("Next step"), button:has-text("→")').first();
    if (await nextStepBtn.isVisible()) {
      await nextStepBtn.click();
      // Wait for step transition
      await page.waitForTimeout(300);
      await expect(canvas).toBeVisible();
    }
  });
});
