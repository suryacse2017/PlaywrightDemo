import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('evrvideo_test');
test.setTimeout(130000); 

test('login', async ({ page }) => {
  await page.goto('/');
  await page.getByText('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Ontario Health logo').click();
  await page.getByRole('button', { name: 'Day', exact: true }).click();
  await page.getByRole('heading', { name: '' }).click();
  await page.getByRole('button', { name: 'Week' }).click();
  await page.getByRole('heading', { name: ' ' }).click();
  await page.getByRole('button', { name: 'Month' }).click();
  await page.getByRole('heading', { name: '' }).click();
  await page.getByLabel('Ontario Health logo').click();
  // Create event button
  await page.getByRole('button', { name: 'Create event' }).click();
 
    
  //  await page.getByText('New Event').click();
     //Breadcrum to go back on calender 
  await page.getByRole('button', { name: 'Back to Calendar' }).click();
  await page.getByLabel('Ontario Health logo').click();
  // await page.waitForTimeout(10000); 
  //logout
  await page.getByLabel('More options').click();
  await page.getByRole('menuitem', { name: 'Sign Out' }).click();
   await page.close();

});