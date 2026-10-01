import { test as base } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage';

type TestFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

export { expect };
