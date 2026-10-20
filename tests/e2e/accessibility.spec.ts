import { test, expect } from '@playwright/test';

test.describe('Accessibility (a11y) & Modal Keyboard Navigation', () => {
  test('skip-to-content link, focus navigation, and Escape key modal closing', async ({ page }) => {
    await page.goto('/');

    // 1. Skip-to-content link
    const skipLink = page.locator('a:has-text("Skip to study content")');
    await expect(skipLink).toBeAttached();

    // 2. Tab role list & ARIA attributes
    const tabs = page.locator('#tabs [role="tab"]');
    const tabCount = await tabs.count();
    expect(tabCount).toBe(6); // Explain, Notes, Topics, Quiz, Exam, AI Tutor

    // Initial active tab should have aria-selected="true"
    const firstTab = tabs.nth(0);
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');

    // Click second tab (Notes)
    const secondTab = tabs.nth(1);
    await secondTab.click();
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    await expect(firstTab).toHaveAttribute('aria-selected', 'false');

    // 3. Open All Notes Modal from Header Tools
    const toolsBtn = page.locator('button:has-text("Tools")').first();
    if (await toolsBtn.isVisible()) {
      await toolsBtn.click();
      await page.waitForTimeout(150);
    }
    const allNotesBtn = page.locator('button:has-text("All Notes & PDF Export")').first();
    await allNotesBtn.click();

    // Verify modal is open with dialog role and aria-modal
    const notesModal = page.locator('#nmodal');
    await expect(notesModal).toBeVisible();
    await expect(notesModal).toHaveAttribute('role', 'dialog');
    await expect(notesModal).toHaveAttribute('aria-modal', 'true');

    // Press Escape key -> modal must close immediately
    await page.keyboard.press('Escape');
    await expect(notesModal).toBeHidden();

    // 4. Open Exam Plan Modal from Header
    const planBtn = page.locator('button:has-text("Exam Plan"), button:has-text("Plan")').first();
    await planBtn.click();

    const planModal = page.locator('#modal[aria-label="Exam plan"]');
    await expect(planModal).toBeVisible();
    await expect(planModal).toHaveAttribute('role', 'dialog');
    await expect(planModal).toHaveAttribute('aria-modal', 'true');

    // Press Escape key -> modal must close
    await page.keyboard.press('Escape');
    await expect(planModal).toBeHidden();

    // 5. Open Backup Hub Modal
    if (await toolsBtn.isVisible()) {
      await toolsBtn.click();
      await page.waitForTimeout(150);
    }
    const backupBtn = page.locator('button:has-text("Backup")').first();
    await backupBtn.click();

    const backupModal = page.locator('div[aria-labelledby="backup-modal-title"]');
    await expect(backupModal).toBeVisible();
    await expect(backupModal).toHaveAttribute('role', 'dialog');
    await expect(backupModal).toHaveAttribute('aria-modal', 'true');

    // Press Escape key -> modal must close
    await page.keyboard.press('Escape');
    await expect(backupModal).toBeHidden();
  });
});
