import { test, expect, Page } from '@playwright/test';
import {Day} from '../../helper/functions'


test('example3', async ({ page }) => {
  // await page.waitForTimeout(5000);
  await page.goto('/');
  await page.getByPlaceholder('Search for health service providers/groups or programs/sites/community services by any keyword…').click();
  const date = new Day()
  await page.getByPlaceholder('Search for health service providers/groups or programs/sites/community services by any keyword…').fill(date.monthName);
  await page.waitForTimeout(5000);
  await page.close();
});

test.describe('1 page multiple tests', () => {
  let cur_page: Page;

  test.beforeAll(async ({ page }) => {
      cur_page = page
      await cur_page.goto('/')
  });

  test('Videoconfrence Part', async () => {
      await cur_page.getByRole('link', { name: 'Videoconference' }).click();
      await cur_page.getByRole('row', { name: 'APRIL 2023' }).locator('span').nth(3).click();
      await cur_page.getByRole('row', { name: 'MAY 2023' }).locator('span').nth(3).click();
      await cur_page.getByRole('row', { name: 'JUNE 2023' }).locator('span').nth(3).click();
      await cur_page.getByText('2', { exact: true }).click();
      await cur_page.getByText('3', { exact: true }).click();
      await cur_page.getByText('4', { exact: true }).click();
      await cur_page.getByText('5', { exact: true }).click();
      await cur_page.getByText('6', { exact: true }).click();
      await cur_page.getByText('6', { exact: true }).click();
      await cur_page.getByText('7', { exact: true }).click();
      await cur_page.getByText('8', { exact: true }).click();
      await cur_page.getByText('9', { exact: true }).click();
      await cur_page.getByText('10').click();
      await cur_page.getByText('11').click();
      await cur_page.getByText('12').click();
      await cur_page.getByText('13').click();
      await cur_page.getByText('14').click();
      await cur_page.getByText('15').click();
      await cur_page.getByText('16').click();
      await cur_page.getByText('17').click();
      await cur_page.getByText('18').click();   
      await cur_page.waitForTimeout(1000);      
  });

  test('eConsult Part', async () => {
      await cur_page.getByRole('link', { name: 'eConsult' }).click();
      await cur_page.getByRole('link', { name: 'Waiting for More Info' }).click();
      await cur_page.getByRole('link', { name: 'Consult Provided' }).click();
      await cur_page.getByRole('link', { name: 'Consult Returned' }).click();
      await cur_page.getByRole('list').filter({ hasText: 'All Requests Needs Attention Waiting for Response Completed Cancelled Drafts' }).getByRole('link', { name: 'Needs Attention' }).click();
      await cur_page.getByRole('listitem').filter({ hasText: 'Waiting for Response' }).click();
      await cur_page.getByText('Dr. test test | Dr. Ksenia EMR_S etyetryrt New case submitted Case ID: 251958184').click();
      await cur_page.getByText('Dr. test test | Dr. Ksenia EMR_S fweferwfewr New case submitted Case ID: 2519581').click();
      await cur_page.getByText('Dr. test test | Dr. Ksenia EMR_S ertweqweqrwerq New case submitted Case ID: 2519').click();
      await cur_page.getByText('Dr. test test | Dr. Ksenia EMR_S sdafdsafsadf New case submitted Case ID: 251955').click();
      await cur_page.getByText('Dr. test test | Dr. Ksenia EMR_S ewrwefafsdfsd New case submitted Case ID: 25195').click();
      await cur_page.getByRole('link', { name: 'Completed' }).click();
      await cur_page.getByText('Dr. test test | Dr. Ksenia EMR_S qweqweqweq Case completed Case ID: 251949851 Su').click();
      await cur_page.getByText('565436534').click();
      await cur_page.getByText('Dr. test test | Dr. Ksenia EMR_S 543645645364536435 Case completed Case ID: 2519').click();
      await cur_page.getByRole('link', { name: 'Cancelled' }).click();
      await cur_page.getByRole('link', { name: 'Drafts' }).click();
      await cur_page.waitForTimeout(1000);
  });

  test.afterAll(async () => {
    await cur_page.close();
  });
  
});