import { expect, test } from '@playwright/test';

test('keeps the event program layout stable', async ({ page }) => {
  await page.goto(process.env.BASE_PATH || '/');
  await expect(page.getByRole('article')).toHaveCount(3);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await expect(page).toHaveScreenshot('devday-program.png', { animations: 'disabled' });
});
