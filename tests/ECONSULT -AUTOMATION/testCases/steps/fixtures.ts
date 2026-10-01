import { test as base } from 'playwright-bdd';
import { LoginPage } from '../../pageObjects/LoginPage';
import { RequestPage } from '../../pageObjects/RequestPage';
import { HomePage } from '../../pageObjects/HomePage';

type MyFixtures = {
    loginPage: LoginPage;
    requestPage: RequestPage;
    homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
     requestPage: async ({ page }, use) => {
        await use(new RequestPage(page));
    },
     homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});