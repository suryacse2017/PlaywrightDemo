import {defineConfig } from '@playwright/test';
import path from 'path';

//to select different environment
const ENV = process.env.ENV || 'dev';

const environments = {
  dev: { baseURL: 'https://api2.awsdevotn.ca' },
  test: { baseURL: 'https://api.awstestotn.ca' },
  staging: { baseURL: 'https://api.awsstagingotn.ca' },
  sandbox: { baseURL: 'https://api-sandbox.awsstagingotn.ca' }
  
};

// testDir: './tests/PhsdAPI_Phase1/SearchLocation/',
//testDir: './tests/WordPress_Kintsa/OtnHub',
// require('dotenv').config({path: './env/.env.configVar'});
export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');
export default defineConfig({
  //testDir: './tests',
  //testDir: './tests/WordPress_Kintsa/OtnHub',
  testDir: './tests/OtnHubMoreBrowser',
  testMatch: '*.spec.ts', 
  workers :1, // working serially , if it >1 work as parallel
  timeout: 200 * 1000,
        // expect: 
        // {
        //   timeout: 5000
        // },
  reporter: [['html', {outputFolder: 'playwright-reports/folder'}],
    ['list'], 
    ['./helper/reporter.ts']
  ],
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Run tests in files in parallel */
  fullyParallel: false,
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: './helper/global-teardown.ts',
  use: {
    testIdAttribute: 'ng-click',
    //baseURL: process.env.BASEURL,
    baseURL: environments[ENV]?.baseURL || process.env.BASEURL,
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.TOKEN || ''}` // Example of passing auth token
    },
    // run traces on the first retry of a failed test
    trace: 'on-first-retry',
     // Grant video permissions
   //  permissions: ['camera','microphone'],
    headless: false,
    screenshot: 'only-on-failure',
    //trace: 'on',
    ignoreHTTPSErrors: true,   // SSL certification
    video: 'retain-on-failure',
    actionTimeout: 5 * 1000,


  },
  projects: 
  [
    // {
    //   name: 'sequential-tests',
    //   testMatch: [
    //     'testCases/OrgSignUpOneAccountTC.spec.ts',
    //     'testCases/OrgSignUpMoreAccountTC.spec.ts'
    //   ],
    // },
    //   {
    //     name :"api",
    //     use: {
          
    //       headless: true,
    //       screenshot: 'only-on-failure',
    //       trace: 'retain-on-failure',
    //       ignoreHTTPSErrors : true,//SSL certificattion
    //       video :'retain-on-failure',
          
    //     }

    
    //   },
    
    {
        name :'safari',
        use: {
          browserName: 'webkit',
        }
      },
        {
        name :'firefox',
        use: {
          browserName: 'firefox',
        }
      },
      {
        name :"chrome",
        use: {
          browserName: 'chromium',
          channel:'chrome',
          permissions: ['camera','microphone'],
 
        }
      },
     // this matches all tests ending with .setup.ts
    // {
    //   name: 'setup',
    //   testMatch: '**/*.setup.ts',
    // },
    // // File to run tests with setup
    // {
    //   name: 'tests w/ login',
    //   testMatch: '**/*.tests.ts',
    //   dependencies: ['setup'],
    //   use: {
    //     storageState: STORAGE_STATE,
    //   },
    // },
    // file to run tests without setup
    // {
    //   name: 'tests w/o login',
    //   testMatch: '**/*.spec.ts',
    // },
  ]
});
