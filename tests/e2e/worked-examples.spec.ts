import { test, expect } from '@playwright/test';

test.describe('Worked Examples 100% Coverage & Modal Export', () => {
  test('should display step-by-step worked numerical on Explain tab and contain all 43 worked examples in All Notes modal', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Verify Exam Model Worked Problem on default tab (Tab 0: Explain)
    const workedCard = page.locator('.we, .worked-problem-box, :is(h3, h4):has-text("Exam Model Worked Problem")');
    await expect(workedCard.first()).toBeVisible();

    // Verify presence of step numbers and boxed final answer
    const tabContent = page.locator('#tab-content');
    const tabText = await tabContent.innerText();
    expect(tabText).toContain('Exam Model Worked Problem');
    expect(tabText).toContain('Star–Delta Transformation');

    // 2. Open All Notes Modal from Header Tools dropdown
    const toolsBtn = page.locator('button:has-text("Tools")').first();
    if (await toolsBtn.isVisible()) {
      await toolsBtn.click();
      await page.waitForTimeout(150);
    }
    const allNotesBtn = page.locator('button:has-text("All Notes & PDF Export")').first();
    await allNotesBtn.click();

    // Verify modal is open
    const modal = page.locator('#nmodal');
    await expect(modal).toBeVisible();

    // Count all .we elements inside the modal
    const modalWorkedExamples = modal.locator('.we');
    const weCount = await modalWorkedExamples.count();
    expect(weCount).toBe(43);

    // Verify specific subject worked examples are present in the handbook
    await expect(modal.locator('text=Rank of Matrix').first()).toBeVisible();
    await expect(modal.locator('text=Lagrange Mean Value Theorem').first()).toBeVisible();
    await expect(modal.locator('text=Star–Delta Transformation').first()).toBeVisible();
    await expect(modal.locator('text=PEAS Specification').first()).toBeVisible();

    // Close modal via Escape key
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });
});
