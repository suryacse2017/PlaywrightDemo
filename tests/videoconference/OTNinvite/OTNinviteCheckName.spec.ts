import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteCheckName");

test.describe('Check errors for guest name', () => { 
  //const locatorErrGuest='.form-group:nth-child(1) .help-block:nth-child(1)' ;
  const errorGuest = "Enter a guest name";
  const errorEmail="Enter a valid email";
  const locatorCloseMsg=".close.ng-scope";
  const errorEmailTop="x Error - Enter a valid email address."
  const error1="x Error - All mandatory fields must be completed\n" +
  "Invalid entry. You must enter at least 2 characters for a Guest Name.\n" +
  "Enter a valid email address."
  const locatorGuestName="//input[@name='guestName']" ;
  const locatorGuestEmail="//input[@name='guestEmail']";
  
  let cur_page: Page; 
  test.beforeAll(async ({ page }) => { cur_page = page });

test('login', async ({ page }) => {

  await cur_page.goto('/',{waitUntil:'domcontentloaded'});
  await cur_page.getByText('OTN Credentials').click();
  await cur_page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await cur_page.getByPlaceholder('Password').click();
  await cur_page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await cur_page.getByRole('button', { name: 'Sign In' }).click();
  //Navigate to videoconference
  await cur_page.getByRole('link', { name: 'Videoconference' }).click();
  });
  test('Check Guest name errors', async () => {
  //Open Create Event modal
  await cur_page.getByText('Create event').click();

  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await expect(cur_page.getByText(errorGuest)).toBeVisible();
  await expect(cur_page.getByText('Enter a valid email', { exact: true })).toBeVisible();
  //await expect(cur_page.getByText(error1)).toBeVisible(); // check all message 
  await expect(cur_page.getByText('× Error - All mandatory fields must be completedInvalid entry. You must enter at')).toBeVisible();
  await cur_page.locator(locatorCloseMsg).nth(0).click();
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill('M');
  await cur_page.getByPlaceholder('Guest email').click();
  await expect(cur_page.getByText('Use at least 2 characters')).toBeVisible();
  await cur_page.getByPlaceholder('Guest name').fill('Mo');
  await cur_page.getByPlaceholder('Guest email').click();
  await expect(cur_page.getByText('Use at least 2 characters')).not.toBeVisible();
  await cur_page.getByRole('button', { name: 'Add' }).click();//only guest name
  await expect(cur_page.getByText('Enter a valid email', { exact: true })).toBeVisible();
  await cur_page.getByPlaceholder('Guest email').fill('test@test.ca');
  await cur_page.locator(locatorGuestName).clear();
  await cur_page.getByRole('button', { name: 'Add' }).click(); //only email
  await expect(cur_page.getByText('Enter a guest name')).toBeVisible();
  await expect(cur_page.getByText('Enter a valid email',{ exact: true })).not.toBeVisible();
  await cur_page.locator(locatorCloseMsg).nth(0).click();
  await cur_page.getByPlaceholder('Guest name').fill('Mo');
  await cur_page.getByPlaceholder('Guest email').click();
  await expect(cur_page.getByText('Enter a guest name')).not.toBeVisible();
  await expect(cur_page.getByText('Enter a valid email',{ exact: true })).not.toBeVisible();
  //close modal on main page
  await cur_page.getByText('x', { exact: true }).click();

  
  });
  // Test logout
test('logout', async () => {
  await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await cur_page.close();
  })

  });
  