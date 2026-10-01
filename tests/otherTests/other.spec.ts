import { test, expect, Page } from '@playwright/test';
import { loadVariable, saveVariable } from '../../helper/functions';

// test.beforeEach(async ({ page }) => {
//   await page.goto('/');
// });

test('example1', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('spacex starship launch');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');
    await page.getByRole('link', { name: 'Starship SpaceX https://www.spacex.com › vehicles › starship' }).click();
    await page.waitForTimeout(2000)
    await page.locator('#gallery-next-s').click();
    await page.waitForTimeout(2000)
    await page.locator('#gallery-next-s').click();
    await page.waitForTimeout(2000)
    await page.locator('#gallery-next-s').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'SHOP', exact: true }).click();
    const page1 = await page1Promise;
    await page1.getByRole('link', { name: 'Men\'s View products', exact: true }).click();
    await page1.getByRole('listitem').filter({ hasText: 'Men\'s Dragon T-Shirt $30.00Gray Black' }).locator('a').first().click();
    await page.waitForTimeout(2000)
    await page1.getByRole('button', { name: 'Expand Size options' }).click();
    await page1.getByRole('button', { name: 'Size 2X' }).click();
    await page1.locator('.QuantitySelector > span:nth-child(3)').click();
    await page1.getByRole('link', { name: 'More information' }).click();
    await page1.getByRole('button', { name: 'Size Chart' }).click();
    await page.close();
    await page1.close();
});

test.describe('1 page multiple tests', () => {
  let cur_page: Page;
  test.beforeAll(async ({ page }) => {
      cur_page = page
  });

  test('test 1', async () => {
      await cur_page.goto('https://www.google.com/')
      // await cur_page.waitForTimeout(1000);
  });

  test('test 2', async () => {
      await cur_page.goto('https://www.spacex.com');
      // await cur_page.waitForTimeout(1000);
  });

  test.afterAll(async () => {
    await cur_page.close();
  });

});

test('test load varaible', ()=>{
  //Save a variables
  saveVariable('variable 1', 'this is a variable')
  saveVariable('variable 2', 'this is also a variable')
  //load variables
  let var1 = loadVariable('variable 1')
  let var2 = loadVariable('variable 2')
  console.log(var1)
  console.log(var2)
  //update variable
  saveVariable('variable 1', 'updated variable')
  var1 = loadVariable('variable 1')
  console.log(var1)
})
