import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
//import { Day ,Time} from '../../../../helper/functions';

loadEnv('evrvideo_test');
test.setTimeout(130000); 
 const participantSys = process.env.legSysName2!;
// const admin=process.env.admin! ;
// const regex=new RegExp('[0-9]{9}', 'm');
// let date=new Day();

test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByText('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  //Check Create event tooltip and navigate to create event page
  await page.getByRole('button', { name: 'Create event' }).click();
  await page.locator('.MuiTypography-root > .MuiButtonBase-root').click();
  
  //Create event type;
  await page.getByText('Clinical event').click();
  await page.getByRole('option', { name: 'Clinical event' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  //Scheduled toggle 
  await page.getByRole('button', { name: 'Schedule', exact: true }).click();
  //await page.getByRole('button', { name: 'Schedule' }).click();
  //Select Time
  // await page.getByLabel('Start Time').click();
  // await page.locator('div').filter({ hasText: /^Start Time$/ }).getByRole('button').click();
  // await page.getByLabel('Start Time').click();
  // await page.locator('div').filter({ hasText: /^Start Time$/ }).getByRole('button').click();
  // await page.locator('div').filter({ hasText: /^Start Time$/ }).getByRole('button').click();
  // await page.getByLabel('Start Time').click();
  // await page.locator('div').filter({ hasText: /^Start Time$/ }).getByRole('button').click();
  // await page.getByLabel('Start Time').dblclick();
  // await page.getByLabel('Start Time').click();
  // await page.getByLabel('Start Time').click();
  // await page.getByLabel('Start Time').click();
  
  await page.getByLabel('Start Time').click();
  await page.locator('div').filter({ hasText: /^Start Time$/ }).getByRole('button').click();
  await page.getByLabel('Start Time').fill('16:00');
  await page.getByLabel('Start Time').click();
  await page.getByLabel('End Time').click();
   await page.locator('div').filter({ hasText: /^End Time$/ }).getByRole('button').click();
  await page.getByLabel('End Time').fill('16:15');
  
  await page.getByText('OTN Member or System').click();
  await page.getByRole('option', { name: 'OTN Member or System' }).click();
  await page.getByPlaceholder('Search for people or room systems').click();
  await page.getByPlaceholder('Search for people or room systems').fill(participantSys);
  await page.getByRole('option', { name: participantSys  }).click();
  await page.getByRole('button', { name: 'Schedule Event' }).click();
  // Event Details Page
  await page.getByText('success - Event scheduled successfully').click();
  
  await page.getByRole('list').getByText('294850838').click();
  await page.locator('.MuiGrid-root > .MuiPaper-root').first().click();
  await page.getByRole('heading', { name: 'Clinicalevent' }).click();
  await page.getByText('l', { exact: true }).nth(2).click();
  await page.getByText('2025-01-24, 16:00 PM – 16:15 PM').click();
  await page.getByRole('heading', { name: 'Event ID' }).click();
  await page.locator('div').filter({ hasText: /^Event ID294850838$/ }).getByRole('paragraph').click();
  await page.getByRole('heading', { name: 'Status' }).click();
  await page.locator('span').filter({ hasText: 'Scheduled' }).first().click();
  await page.getByRole('heading', { name: 'Consultant' }).click();
  await page.locator('div').filter({ hasText: /^ConsultantDr\. Beer pref Singh pref$/ }).getByRole('paragraph').click();
  await page.getByRole('heading', { name: 'Administrative contact' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^Start Event$/ }).nth(3).click();
  const page1 = await page1Promise;
  await page1.locator('[data-testid="button-request-permissions"]').click();
  await page1.locator('[data-testid="button-leave"]').click();
  await page.getByLabel('More options').click();
  await page.getByRole('menuitem', { name: 'Sign Out' }).click();
});