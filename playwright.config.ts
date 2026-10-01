import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const demo1Dir = defineBddConfig({
  paths: ['tests/Demo1/features/login.feature'],
  steps: [
    'tests/Demo1/stepDefenitions/*.ts',
    'tests/Demo1/fixtures/*.ts'
  ],
});

export default defineConfig({
 // testDir: './.features-gen',
 //eConsultDir,
  // reporter: [
  //   ['html', { open: 'never' }], // <-- REPORT CONFIG HERE
  // ],
  reporter: [
  ['html', { open: 'never' }],
  ['json', { outputFile: 'test-results.json' }],
],
  timeout: 400*10000,
  expect: { timeout: 40000 },
  fullyParallel: false,
  workers: 1, // serial execution

  use: {
   // headless: false,
    viewport: null, // window maximize

    launchOptions: {
      args: ['--start-maximized'], // window maximize 
  },
  screenshot: 'only-on-failure',
    trace: 'on-first-retry',
   // video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    actionTimeout: 5 * 1000,
},
  

  projects: [
    
   {
        name: 'Demo1-Chrome',
        testDir: demo1Dir,
        use: {
            browserName: 'chromium',
            channel: 'chrome',
           headless: process.env.GITHUB_ACTIONS === 'true',
        },
    },

  ],
});
