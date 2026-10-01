import { test as base, chromium, Browser, BrowserContext, Page ,expect} from '@playwright/test';

// Define custom fixtures
type MyFixtures = {
  browser: Browser;
  context: BrowserContext;
  homePage: Page;
};

let browserInstance: Browser; // ✅ only one browser
let contextInstance: BrowserContext;

// Extend Playwright's base test with those fixtures
const test = base.extend<MyFixtures>({
  browser: async ({}, use) => {
    if(!browserInstance)
    {

     browserInstance  = await chromium.launch({ headless: false, channel: 'chrome' });
    }
    await use(browserInstance );
    //await browser.close();
    
  },

  context: async ({ browser }, use) => {
    //const context = await browser.newContext({ viewport: null}); //maximize window
    if(!contextInstance)
    {
         contextInstance = await browser.newContext({viewport: { width: 1920, height: 1080 }});
    }
    await use(contextInstance);
   // await context.close();
  },

  

  homePage: async ({ context }, use) => {
    const page = await context.newPage();
   // await page.goto('https://otnhub.ca'); // prod env
    await page.goto('https://stg-otnhubca-otnhubca.kinsta.cloud/'); // dev env
    await use(page);
  }
});

export { test ,expect,chromium};
