import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* 並列でテストを実行 */
  fullyParallel: true,
  /* CI環境でのみテストが失敗したときのリトライを無効化 */
  forbidOnly: !!process.env.CI,
  /* CI環境でのリトライ設定 */
  retries: process.env.CI ? 2 : 0,
  /* CI環境では並列実行数を制限 */
  workers: process.env.CI ? 1 : undefined,
  /* レポーターの設定 */
  reporter: "html",
  /* すべてのプロジェクトで共有される設定 */
  use: {
    /* ベースURL */
    baseURL: "http://localhost:3000",
    /* テスト失敗時にトレースを収集 */
    trace: "on-first-retry",
  },

  /* プロジェクト設定 */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* モバイルビューポートでのテスト */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* ブランドブラウザーでのテスト */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* 開発サーバーの設定 */
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
