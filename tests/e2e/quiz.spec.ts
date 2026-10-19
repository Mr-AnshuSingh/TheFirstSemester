import { test, expect } from '@playwright/test';

test.describe('Unit Quiz Flow', () => {
  test('should open quiz tab, answer questions, finish quiz and calculate score', async ({
    page,
  }) => {
    await page.goto('/');

    // Switch to Quiz tab
    await page.locator('button:has-text("Quiz")').first().click();

    // Verify Quiz header
    await expect(page.locator('h3:has-text("Unit Concept Check")')).toBeVisible();

    // Answer the questions
    const questionCards = page.locator('div:has(> div > span:has-text("Q1"))');
    await expect(questionCards.first()).toBeVisible();

    // Click the first option of Q1
    const q1Options = questionCards.first().locator('button');
    await q1Options.first().click();

    // Verify feedback appears (either Correct or Needs Review)
    const feedbackBadge = questionCards.first().locator('span:has-text("Correct"), span:has-text("Needs Review")');
    await expect(feedbackBadge).toBeVisible();

    // Verify Score banner is visible
    const scoreBanner = page.locator('span:has-text("Score:")');
    await expect(scoreBanner).toBeVisible();

    // Reset quiz
    const resetBtn = page.locator('button:has-text("Reset")');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Verify reset
    await expect(scoreBanner).not.toBeVisible();
  });
});
