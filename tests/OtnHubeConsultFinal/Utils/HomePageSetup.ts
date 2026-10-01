// import { test as base, Browser, BrowserContext, Page } from '@playwright/test';

// type HomePageFixture = {
//   homePage: Page;
// };

// let browser: Browser;
// let context: BrowserContext;
// let page: Page;

// const test = base.extend<HomePageFixture>({
//   homePage: async ({ browser }, use) => {
//     context = await browser.newContext({
//       viewport: { width: 1920, height: 1080 }
//     });
//     page = await context.newPage();
//     await page.goto('https://econsult.testotn.ca');

//     await use(page);

//     // await page.close();
//     // await context.close();
//   },
// });

// export { test };
