import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const demo1Dir = defineBddConfig({
  paths: ['tests/Demo1/features/**/*.feature'],
  steps: [
    'tests/Demo1/stepDefenitions/*.ts',
    'tests/Demo1/fixtures/*.ts',
  ],
  outputDir: '.features-gen/demo1',
});

const demo1CopilotDir = defineBddConfig({
  paths: ['tests/Demo1Copilot/features/**/*.feature'],
  steps: [
    'tests/Demo1Copilot/stepDefinitions/*.ts',
    'tests/Demo1Copilot/fixtures/*.ts',
  ],
  outputDir: '.features-gen/demo1copilot',
});

export default defineConfig({
  testDir: demo1Dir,
 //eConsultDir,
  // reporter: [
  //   ['html', { open: 'never' }], // <-- REPORT CONFIG HERE
  // ],
  reporter: [
  ['html', { open: 'never' }],
  ['json', { outputFile: 'test-results.json' }],
],
  timeout: 120000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  workers: 1, // serial execution

  use: {
    //headless: false,
    viewport: null, // window maximize

    launchOptions: {
      args: ['--start-maximized'], // window maximize 
  },
  screenshot: 'only-on-failure',
    trace: 'on-first-retry',
   // video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    actionTimeout: 5000,
},
  

  projects: [
    {
      name: 'Demo1-Chrome',
      testDir: demo1Dir,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
      },
    },
    {
      name: 'Demo1Copilot-Chrome',
      testDir: demo1CopilotDir,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
      },
    },
  ],
});
