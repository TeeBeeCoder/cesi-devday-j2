import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('checks accessibility after filtering the program', async ({ page }) => {
  await page.goto(process.env.BASE_PATH || '/');
  await page.getByRole('searchbox', { name: 'Rechercher un atelier' }).fill('react');
  await expect(page.getByRole('article')).toHaveCount(1);

  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations).toEqual([]);
});
