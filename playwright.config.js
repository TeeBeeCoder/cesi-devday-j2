import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:4187', trace: 'retain-on-failure' },
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }, { name: 'mobile', use: { viewport: { width: 390, height: 844 } } }],
  webServer: { command: 'npm run preview -- --port 4187 --strictPort', url: `http://127.0.0.1:4187${process.env.BASE_PATH || '/'}`, reuseExistingServer: false },
});
