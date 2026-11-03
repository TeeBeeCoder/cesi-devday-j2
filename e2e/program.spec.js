import { expect, test } from '@playwright/test';

test('shows the built event page and three workshops', async ({ page }) => {
  await page.goto(process.env.BASE_PATH || '/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Une journée pour créer, tester et publier.');
  await expect(page.getByRole('article')).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
test('finds a workshop by topic and clears the search', async ({ page }) => {
  await page.goto(process.env.BASE_PATH || '/');
  await page.getByRole('searchbox', { name: 'Rechercher un atelier' }).fill('react');
  await expect(page.getByRole('article')).toHaveCount(1);
  await expect(page.getByRole('article')).toContainText('Créer une interface avec l’IA');
  await page.getByRole('button', { name: 'Effacer la recherche' }).click();
  await expect(page.getByRole('article')).toHaveCount(3);
});
test('uses the availability filter from the keyboard', async ({ page }) => {
  await page.goto(process.env.BASE_PATH || '/');
  await page.getByRole('searchbox').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('checkbox')).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('article')).toHaveCount(2);
  await expect(page.getByRole('article').filter({ hasText: 'Tester avant de livrer' })).toHaveCount(0);
});
test('keeps HTML-shaped search text inert', async ({ page }) => {
  await page.goto(process.env.BASE_PATH || '/');
  await page.getByRole('searchbox').fill('<strong>React</strong>');
  await expect(page.getByRole('status')).toContainText('<strong>React</strong>');
  await expect(page.getByRole('status').locator('strong')).toHaveCount(0);
});
