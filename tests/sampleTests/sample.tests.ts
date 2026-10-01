import { test, expect } from '@playwright/test';
import {Day} from '../../helper/functions'

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('example1', async ({ page }) => {
  // await page.waitForTimeout(5000);
  await page.getByRole('listitem', { name: 'Favourites' }).getByRole('link').click();
  await page.locator('a').filter({ hasText: 'I hope you have a great day' }).click();
  await page.locator('a').filter({ hasText: 'I hope you have a great day' }).click();
  await page.locator('#navTabs').getByRole('img').click();
  await page.getByRole('link', { name: 'Directory' }).click();
  await page.getByRole('link', { name: 'Videoconference' }).click();
  await page.getByRole('link', { name: 'eConsult' }).click();
  await page.goto('https://econsult.devotn.ca/#/cases/filter2//');
  await page.goto('https://econsult.devotn.ca/#/cases/filter2/CONSULTANT/NEEDSACTION');
  await page.getByRole('link', { name: 'Waiting for More Info' }).click();
  await page.getByRole('link', { name: 'Consult Provided' }).click();
  await page.getByRole('link', { name: 'Consult Returned' }).click();
  await page.locator('a').filter({ hasText: 'Schedule' }).click();
  // await page.waitForTimeout(5000);
  await page.close();
});

test('example2', async ({ page }) => {
  // await page.waitForTimeout(5000);
  await page.getByPlaceholder('Search for health service providers/groups or programs/sites/community services by any keyword…').click();
  await page.getByPlaceholder('Search for health service providers/groups or programs/sites/community services by any keyword…').fill('SickKids Hospital');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Hospital for Sick Children (The)' }).click();
  await page.getByRole('link', { name: 'www.sickkids.ca' }).click();
  await page.goto('https://www.sickkids.ca/en/about/about-sickkids/');
  // await page.waitForTimeout(5000);
  await page.close();
});
