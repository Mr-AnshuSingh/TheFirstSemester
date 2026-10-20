import { test, expect } from '@playwright/test';

test.describe('Backup Export and Import Roundtrip', () => {
  test('should open backup modal, validate diagnostics, test malformed rejection and valid import', async ({
    page,
  }) => {
    await page.goto('/');

    // Open Backup modal from header tools dropdown
    const toolsBtn = page.locator('button:has-text("Tools")').first();
    if (await toolsBtn.isVisible()) {
      await toolsBtn.click();
      await page.waitForTimeout(200);
    }
    const backupBtn = page.locator('button:has-text("Backup")').first();
    await backupBtn.click();

    // Verify modal heading
    await expect(page.locator('#backup-modal-title')).toContainText('Study Data & Persistence Hub');

    // Verify diagnostics
    await expect(page.locator('text=IndexedDB Primary')).toBeVisible();
    await expect(page.locator('text=100% Local-First Offline Mode')).toBeVisible();

    // Verify export buttons
    await expect(page.locator('button:has-text("Download Backup (.json)")')).toBeVisible();
    await expect(page.locator('button:has-text("Copy JSON")')).toBeVisible();

    // Test malformed JSON import validation
    const jsonTextarea = page.locator('textarea[placeholder*="Paste your JSON backup payload here"]');
    await jsonTextarea.fill('{"invalid": json...');

    // Verify error notification appears
    await expect(page.getByText('Invalid JSON syntax:')).toBeVisible();

    // Test valid JSON import
    const validPackage = {
      app: 'LNJPIT Semester I 3D Study Platform',
      exportVersion: 1,
      exportedAt: new Date().toISOString(),
      state: {
        version: 2,
        done: { 'math:0:0': 1 },
        confidence: { 'math:0:0': 2 },
        customNotes: { 'math:0': 'Restored test note' },
        lab: 'G1',
        exam: '2026-11-20',
      },
    };

    await jsonTextarea.fill(JSON.stringify(validPackage, null, 2));

    // Verify success banner with preview appears
    await expect(page.getByText('Valid backup detected:')).toBeVisible();

    // Click Apply Import button
    const applyBtn = page.locator('button:has-text("Apply Import")');
    await expect(applyBtn).toBeVisible();
    await applyBtn.click();

    // Verify restoration confirmation
    await expect(page.getByText('Backup successfully restored')).toBeVisible();
  });
});
