import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../../helper/functions';
loadEnv('evrvideo_test');
test.setTimeout(130000); 

test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByText('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  //logout
  await page.getByLabel('More options').click();
  await page.waitForTimeout(5000);
  await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  await page.locator('.otn-logo').click();
  await page.close();
});