import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('redirects root to /pt', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/pt/);
  });

  test('Portuguese home page loads', async ({ page }) => {
    await page.goto('/pt');
    await expect(page).toHaveTitle(/Isabella Nunes/);
  });

  test('English home page loads', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Isabella Nunes/);
  });

  test('navigates to blog listing', async ({ page }) => {
    await page.goto('/pt/blog');
    await expect(page).toHaveURL('/pt/blog');
    await expect(page).toHaveTitle(/Isabella Nunes/);
  });

  test('navigates to projects listing', async ({ page }) => {
    await page.goto('/pt/projects');
    await expect(page).toHaveURL('/pt/projects');
    await expect(page).toHaveTitle(/Isabella Nunes/);
  });

  test('sidebar contains navigation links', async ({ page }) => {
    await page.goto('/pt');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('breadcrumb is visible on blog post page', async ({ page }) => {
    await page.goto('/pt/blog');
    // Click first post if available
    const firstCard = page.locator('a[href*="/pt/blog/"]').first();
    const count = await firstCard.count();
    if (count > 0) {
      await firstCard.click();
      const breadcrumb = page.locator('ol[itemtype*="BreadcrumbList"]');
      await expect(breadcrumb).toBeVisible();
    }
  });
});
