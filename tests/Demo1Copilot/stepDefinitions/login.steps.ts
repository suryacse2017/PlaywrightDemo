import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { submitLogin } from '../Utils/sharedMethods';
import { test } from '../fixtures/testFixture';

const { Given, When, Then } = createBdd(test);

Given('I am on the practice test login page', async ({ loginPage }) => {
  await loginPage.navigateToLoginPage();
});

When(
  'I log in with username {string} and password {string}',
  async ({ loginPage }, username: string, password: string) => {
    await submitLogin(loginPage, username, password);
  },
);

Then('the URL should contain {string}', async ({ loginPage }, urlPart: string) => {
  expect(loginPage.getCurrentUrl()).toContain(urlPart);
});

Then(
  'I should see the {string} heading or message',
  async ({ loginPage }, message: string) => {
    await expect(loginPage.successHeading).toHaveText(message);
  },
);

Then(
  'the {string} button should be visible',
  async ({ loginPage }, buttonName: string) => {
    await expect(loginPage.logoutButton).toHaveAccessibleName(buttonName);
    await expect(loginPage.logoutButton).toBeVisible();
  },
);

Then(
  'I should see the error message {string}',
  async ({ loginPage }, message: string) => {
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(message);
  },
);

Then('I should not be logged in', async ({ loginPage }) => {
  expect(loginPage.getCurrentUrl()).not.toContain('/logged-in-successfully/');
  await expect(loginPage.successHeading).toBeHidden();
  await expect(loginPage.logoutButton).toBeHidden();
});
