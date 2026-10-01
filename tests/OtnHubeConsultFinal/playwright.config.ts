import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/OtnHubeConsult',
  reporter: [
    ['html', { open: 'never' }], // <-- REPORT CONFIG HERE
  ],
  timeout: 400*10000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  workers: 1, // serial execution

  use: {
    headless: false,

    viewport: null, // window maximize

    launchOptions: {
      args: ['--start-maximized'], // window maximize 
  },
  screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    actionTimeout: 5 * 1000,
},
  

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        permissions: ['camera', 'microphone'], // optional
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        viewport: null,
      },
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit', // WebKit engine
        viewport: null,
      },
    },
  ],
});
