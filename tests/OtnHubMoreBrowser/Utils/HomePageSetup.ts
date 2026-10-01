import { test as base,BrowserContext, Page ,expect} from '@playwright/test';

// Define custom fixtures
type MyFixtures = {

  context: BrowserContext;
  homePage: Page;
};


// // Extend Playwright's base test with those fixtures
 const test = base.extend<MyFixtures>(
  {
        //  browser: async ({ browserName }, use) => {
        //     let browser;
        //     if (browserName === 'chromium') {
        //       browser = await chromium.launch({ headless: false, channel: 'chrome' });
        //     } else if (browserName === 'firefox') {
        //       browser = await firefox.launch({ headless: false });
        //     } else if (browserName === 'webkit') {
        //       browser = await webkit.launch({ headless: false });
        //     }
        //     await use(browser);
        //     //await browser.close();
        //   },

        context: async ({ browser }, use) => {
          //const context = await browser.newContext({ viewport: null}); //maximize window
              const context = await browser.newContext({viewport: { width: 1920, height: 1080 }});
          await use(context);
          await context.close();
  },

  

  homePage: async ({ context }, use) => 
  {
        const page = await context.newPage();
        await page.goto('https://otnhub.ca');
      //await page.goto('https://stg-otnhubca-otnhubca.kinsta.cloud');
        await use(page);
  }
});

export { test ,expect};
