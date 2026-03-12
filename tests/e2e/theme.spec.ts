import { test, expect } from '@playwright/test';

test.describe('Theme', () => {
  test('page starts in light theme', async ({ page }) => {
    await page.goto('/pt');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('clicking theme toggle switches to dark mode', async ({ page }) => {
    await page.goto('/pt');
    const toggleButton = page.getByRole('button', { name: /dark mode/i });
    await toggleButton.click();
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('theme persists across navigation', async ({ page }) => {
    await page.goto('/pt');
    const toggleButton = page.getByRole('button', { name: /dark mode/i });
    await toggleButton.click();
    await page.goto('/pt/blog');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('toggling twice returns to light mode', async ({ page }) => {
    await page.goto('/pt');
    const toggleButton = page.getByRole('button', { name: /dark mode/i });
    await toggleButton.click();
    const lightButton = page.getByRole('button', { name: /light mode/i });
    await lightButton.click();
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
  });
});
