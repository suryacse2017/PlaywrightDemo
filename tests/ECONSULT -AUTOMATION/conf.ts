import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const eConsultDir = defineBddConfig({
  // Path starts from the root folder where your config file is
  //paths: ['tests/ECONSULT -AUTOMATION/features/*.feature'],     // to run all the feature files
  //paths: ['tests/ECONSULT -AUTOMATION/features/0{1,2}_*.feature'], // to run specific feature files
  paths: ['tests/ECONSULT -AUTOMATION/features/01_Requester.feature'], // to run single feature file
  steps: [
    'tests/ECONSULT -AUTOMATION/testCases/steps/fixtures.ts', 
    'tests/ECONSULT -AUTOMATION/testCases/steps/*.ts'
  ],
});

const eConsultDir2 = defineBddConfig({
  // Path starts from the root folder where your config file is
  //paths: ['tests/ECONSULT -AUTOMATION/features/*.feature'],     // to run all the feature files
  //paths: ['tests/ECONSULT -AUTOMATION/features/0{1,2}_*.feature'], // to run specific feature files
  paths: ['tests/ECONSULT -AUTOMATION/features/01_Requester.feature'], // to run single feature file
  steps: [
    'tests/ECONSULT -AUTOMATION/testCases/steps/fixtures.ts', 
    'tests/ECONSULT -AUTOMATION/testCases/steps/*.ts'
  ],
});


export default defineConfig({
 // testDir: './.features-gen',
 //eConsultDir,
  reporter: [
    ['html', { open: 'never' }], // <-- REPORT CONFIG HERE
  ],
  timeout: 400*10000,
  expect: { timeout: 10000 },
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
      name: 'eConsult-Chrome',
      testDir: eConsultDir,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        permissions: ['camera', 'microphone'], // optional
      },
    },
    {
      name: 'eConsult-Firefox',
      testDir: eConsultDir,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        permissions: ['camera', 'microphone'], // optional
      },
    },
    {
      name: 'eConsult2-Chrome',
      testDir: eConsultDir2,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        permissions: ['camera', 'microphone'], // optional
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
