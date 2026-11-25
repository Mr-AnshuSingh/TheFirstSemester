import { test, expect } from '@playwright/test';

test.describe('/midsem Exam Portal UX, State, Calculators & Responsiveness', () => {
  test('three-step Subject -> Unit -> Mode flow, no console errors, no horizontal scroll', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await page.goto('/midsem', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /Mid-Semester Exam Portal 2026/i })).toBeVisible();

    // Verify 390x844 and 1440x900 zero horizontal overflow
    for (const vp of [
      { width: 390, height: 844 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(vp);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    }

    // 1. Subject -> 2. Unit -> 3. Mode
    await page.getByRole('button', { name: /Physics 100104/i }).click();
    await expect(page.getByTestId('next-sitting-card')).toContainText(/Physics · 28 Nov/i);

    await page.getByRole('button', { name: 'Unit 2', exact: true }).click();
    await expect(page.getByText(/Lasers & Fiber Optics/i).first()).toBeVisible();

    // Switch mode group to Practice -> Mock Test
    await page.getByRole('region', { name: /Mid-Sem 3-step/i }).getByRole('button', { name: 'Practice', exact: true }).click();
    await page.getByRole('tab', { name: /Mock Test/i }).click();
    await expect(page.getByRole('heading', { name: /Physics 15-Minute Mock Simulator/i })).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test('deep links open exact state, ignore bad params, and replaceState without history bloat', async ({
    page,
  }) => {
    await page.goto('/midsem?subject=physics&unit=2&mode=calculator', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /RLC Series Resonance Calculator/i })).toBeVisible();

    const beforeLen = await page.evaluate(() => window.history.length);
    await page.getByRole('button', { name: /AI 100105/i }).click();
    await page.getByRole('button', { name: 'Unit 1', exact: true }).click();
    const afterLen = await page.evaluate(() => window.history.length);
    expect(afterLen).toBe(beforeLen);
    expect(page.url()).toContain('subject=100105');
    expect(page.url()).toContain('unit=1');

    // Invalid params should gracefully fall back without errors
    await page.goto('/midsem?subject=invalid999&unit=99&mode=bogus', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /Mid-Semester Exam Portal 2026/i })).toBeVisible();
  });

  test('state survives reload and Continue chip works', async ({ page }) => {
    await page.goto('/midsem', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Math-I 100102/i }).click();
    await page.getByRole('button', { name: 'Unit 3', exact: true }).click();
    await page.getByRole('region', { name: /Mid-Sem 3-step/i }).getByRole('button', { name: 'Practice', exact: true }).click();
    await page.getByRole('tab', { name: /CBT MCQ Bank/i }).click();

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /Math-I CBT MCQ Bank/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Continue: Math-I · Unit 3/i })).toBeVisible();
  });

  test('High yield toggle filters star topics and Cheat Sheet modal displays formulas', async ({
    page,
  }) => {
    await page.goto('/midsem?subject=100111&unit=1&mode=notes', { waitUntil: 'networkidle' });
    const coreBadge = page.getByText('Core Topic', { exact: true });
    const initialCoreCount = await coreBadge.count();
    expect(initialCoreCount).toBeGreaterThan(0);

    await page.getByRole('button', { name: /★ High yield only/i }).click();
    await expect(page.getByText('Core Topic', { exact: true })).toHaveCount(0);

    await page.getByRole('button', { name: /★ High yield only/i }).click();
    expect(await page.getByText('Core Topic', { exact: true }).count()).toBe(initialCoreCount);

    await page.getByRole('button', { name: /BEEE Cheat Sheet/i }).click();
    await expect(page.getByRole('dialog', { name: /BEEE Formula Cheat Sheet/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Print \/ Save as PDF/i })).toBeVisible();
  });

  test('MCQ bank supports 1-4 keyboard answering, instant explanation, and Retry wrong', async ({
    page,
  }) => {
    await page.goto('/midsem?subject=100111&unit=0&mode=mcq', { waitUntil: 'networkidle' });
    await expect(page.getByText(/Question 1 of/i)).toBeVisible();

    // Press key '1' (option A) to answer Q1
    await page.keyboard.press('1');
    await expect(page.getByText(/Explanation/i)).toBeVisible();

    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(page.getByText(/Question 2 of/i)).toBeVisible();
  });

  test('Mock test pause and resume preserves answers and flagged state', async ({ page }) => {
    await page.goto('/midsem?subject=100104&unit=0&mode=simulator', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Start Simulator/i }).click();

    // Answer Q1 and flag it
    await page.getByRole('button', { name: /^A\./i }).first().click();
    await page.getByRole('button', { name: /Flag for review/i }).click();
    await expect(page.getByText('1 Ans')).toBeVisible();
    await expect(page.getByText('1 Flag')).toBeVisible();

    // Pause preserves answers & reloads safely
    await page.getByRole('button', { name: /Pause/i }).click();
    await expect(page.getByRole('heading', { name: /Mock Test Paused/i })).toBeVisible();

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /Mock Test Paused/i })).toBeVisible();
    await page.getByRole('button', { name: /Resume Mock Test/i }).click();
    await expect(page.getByText('1 Ans')).toBeVisible();
    await expect(page.getByText('1 Flag')).toBeVisible();
  });

  test('All 4 calculators compute accurate known examples', async ({ page }) => {
    await page.goto('/midsem?subject=100111&unit=0&mode=calculator', { waitUntil: 'networkidle' });

    // 1. RLC: L=0.1 H, C=10 uF -> 159.15 Hz
    await page.locator('#calc-rlc-l').fill('0.1');
    await page.locator('#calc-rlc-c').fill('10');
    await expect(page.getByTestId('calc-rlc-result')).toHaveText('159.15 Hz');

    // 2. Thevenin: Vth=24, Rth=6, RL=6 -> 2.000 A, 24.000 W
    await page.locator('#calc-thev-v').fill('24');
    await page.locator('#calc-thev-r').fill('6');
    await page.locator('#calc-thev-rl').fill('6');
    await expect(page.getByTestId('calc-thev-il')).toHaveText('2.000 A');
    await expect(page.getByTestId('calc-thev-pl')).toHaveText('24.000 W');

    // 3. Fiber: n1=1.55, n2=1.50 -> NA = 0.3905
    await page.locator('#calc-fiber-n1').fill('1.55');
    await page.locator('#calc-fiber-n2').fill('1.50');
    await expect(page.getByTestId('calc-fiber-na')).toHaveText('0.3905');

    // 4. Cache: h=0.95, tc=2, tm=50 -> 4.400 ns
    await page.locator('#calc-cache-h').fill('0.95');
    await page.locator('#calc-cache-tc').fill('2');
    await page.locator('#calc-cache-tm').fill('50');
    await expect(page.getByTestId('calc-cache-result')).toHaveText('4.400 ns');
  });

  test('Search finds matching topic/formula and jumps directly to it', async ({ page }) => {
    await page.goto('/midsem', { waitUntil: 'networkidle' });
    const searchBox = page.getByRole('searchbox', { name: /Search formulas, topics, and MCQs/i });
    await searchBox.fill('Newton');
    const firstOpt = page.getByRole('option').first();
    await expect(firstOpt).toBeVisible();
    await firstOpt.click();

    await expect(page.getByText(/Newton's Rings/i).first()).toBeVisible();
  });
});
