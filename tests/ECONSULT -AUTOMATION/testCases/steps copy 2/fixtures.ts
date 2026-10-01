import { test as base } from 'playwright-bdd';
import { HomePage } from '../../pageObjects/HomePage';

type MyFixtures = {
    homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});