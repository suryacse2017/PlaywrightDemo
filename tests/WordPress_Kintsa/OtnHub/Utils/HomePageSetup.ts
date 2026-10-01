import { test as base, chromium, Browser, BrowserContext, Page ,expect} from '@playwright/test';

// Define custom fixtures
type MyFixtures = {
  browser: Browser;
  context: BrowserContext;
  homePage: Page;
};


// Extend Playwright's base test with those fixtures
const test = base.extend<MyFixtures>({
  browser: async ({}, use) => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    await use(browser);
    //await browser.close();
  },

  context: async ({ browser }, use) => {
    //const context = await browser.newContext({ viewport: null}); //maximize window
        const context = await browser.newContext({viewport: { width: 1920, height: 1080 }});
    await use(context);
   // await context.close();
  },

  

  homePage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto('https://signup.stagingotn.ca/org-signup/');
   // await page.goto('https://otnhub.ca');
    await use(page);
  }
});

export { test ,expect,chromium};
