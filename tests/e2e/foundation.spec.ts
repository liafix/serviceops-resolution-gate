import { expect, test } from '@playwright/test';

test('foundation shell identifies itself and its safety boundary', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'ServiceOps Resolution Gate' })).toBeVisible();
  await expect(page.getByText('P0_FOUNDATION_ONLY')).toBeVisible();
  await expect(page.getByText(/Independent synthetic candidate demonstrator/)).toBeVisible();
});
