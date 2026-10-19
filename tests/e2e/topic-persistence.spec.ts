import { test, expect } from '@playwright/test';

test.describe('Topic Persistence', () => {
  test('should tick a topic, persist across debounce, and remain ticked after reload', async ({
    page,
  }) => {
    await page.goto('/');

    // Switch to Topics tab
    const topicsTabBtn = page.locator('button:has-text("Topics")').first();
    await topicsTabBtn.click();

    // Locate the first topic label and checkbox
    const firstLabel = page.locator('label.tk').first();
    const firstCheckbox = firstLabel.locator('input[type="checkbox"]');

    const wasChecked = await firstCheckbox.isChecked();

    // Toggle the topic by clicking the label (handles custom-styled opacity: 0 checkbox)
    await firstLabel.click();
    await expect(firstCheckbox).toBeChecked({ checked: !wasChecked });

    // Wait for the 500ms debounce persistence effect to finish saving to IndexedDB / localStorage
    await page.waitForTimeout(800);

    // Reload the page
    await page.reload();

    // Switch back to Topics tab after reload
    await page.locator('button:has-text("Topics")').first().click();

    // Verify the checkbox maintained its persisted state
    const reloadedCheckbox = page.locator('label.tk input[type="checkbox"]').first();
    await expect(reloadedCheckbox).toBeChecked({ checked: !wasChecked });

    // Restore to initial state
    await page.locator('label.tk').first().click();
    await page.waitForTimeout(800);
  });
});
