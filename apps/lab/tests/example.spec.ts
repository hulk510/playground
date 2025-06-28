import { expect, test } from '@playwright/test';

test('ホームページが正しく表示される', async ({ page }) => {
  await page.goto('/');

  // ページのタイトルを確認
  await expect(page).toHaveTitle('Create Next App');

  // Next.jsロゴが表示されることを確認
  const nextLogo = page.locator('img[alt="Next.js logo"]');
  await expect(nextLogo).toBeVisible();
});

test('基本的なナビゲーションが動作する', async ({ page }) => {
  await page.goto('/');

  // "Read our docs"リンクが存在することを確認
  const docsLink = page.getByRole('link', { name: /read our docs/i });
  await expect(docsLink).toBeVisible();

  // "Deploy now"リンクが存在することを確認
  const deployLink = page.getByRole('link', { name: /deploy now/i });
  await expect(deployLink).toBeVisible();
});

test('ページのメインコンテンツが表示される', async ({ page }) => {
  await page.goto('/');

  // メインの説明テキストが表示されることを確認
  await expect(page.getByText('Get started by editing')).toBeVisible();
  await expect(page.getByText('src/app/page.tsx')).toBeVisible();
});
