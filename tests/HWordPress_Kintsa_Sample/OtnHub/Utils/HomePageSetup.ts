import { test as base, chromium, Browser, BrowserContext, Page ,expect} from '@playwright/test';


type MyFixtures = {
  browser: Browser;
  context: BrowserContext;
  homePage: Page;
};

const test = base.extend<MyFixtures>({
  browser: async ({}, use) => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    await use(browser);
  },

  context: async ({ browser }, use) => {
    const context = await browser.newContext({ viewport: null}); 
    await use(context);
  },

  homePage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto('https://signup.stagingotn.ca/org-signup/');
    await use(page);
  }
});

export { test ,expect,chromium};
