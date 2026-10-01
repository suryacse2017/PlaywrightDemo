import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteCheckPIN");

test.describe('Check OTNinvite PIN', () => { 
  const locatorErrMsg1='#guestlink > div:nth-child(2) > fieldset > div.pcvc-host-pin > p' ;
  const errorMsg1 = "Host PIN must be 6 digits.";
  const locatorErrMsg2='#guestlink > div:nth-child(2) > fieldset > div.pcvc-guest-pin > span > div > p:nth-child(1)';
  const errorMsg2="Guest PIN must be 6 digits.";
  const errorMsg3="Guest and host PIN cannot be the same."
  const locatorGuestPINMsg=".pin-description";
  const guestPINMsg="Guest PIN will not be emailed. Participant(s) must be informed separately.";
  const locatorCloseMsg=".close.ng-scope";
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
  
  })
  test('Check OTNinvite PIN', async () => {
  //Open Create Event modal
  await cur_page.getByText('Create event').click();

  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill('Monica');
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill('mteste@test.ca');
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await cur_page.locator('#hostPin').clear();
  await cur_page.getByPlaceholder('Enter a 6-digit host PIN...').fill('22');
  await cur_page.getByPlaceholder('Guest name').click(); //click away to get the error message<input popover-placement="right" popover="click to modify PIN" popover-trigger="mouseenter" popover-append-to-body="true" type="text" id="hostPin" autocomplete="new-password" name="hostPin" ng-model="connectToForm.hostPin" placeholder="Enter a 6-digit host PIN..." size="40" ng-minlength="6" maxlength="6" ng-pattern="/^[0-9]{6,}$/" ng-required="true" ng-blur="inputNotification($event,'blur')" ng-focus="inputNotification($event,'focus')" class="ng-valid-pattern ng-valid-minlength ng-valid-maxlength ng-dirty ng-valid-parse ng-invalid ng-invalid-required ng-touched pcvc-guest-link-blur" required="required" style>
  await expect(cur_page.getByText(errorMsg1)).toBeVisible();
  await cur_page.locator('#hostPin').fill('wttwyw');
  await expect(cur_page.getByText(errorMsg1)).toBeVisible();
  await cur_page.locator('#hostPin').fill('111111');
  await expect(cur_page.getByText(errorMsg1)).not.toBeVisible();
  await cur_page.getByText('Add a Guest PIN to increase privacy and security.').click();
  await expect(cur_page.locator(locatorGuestPINMsg)).toHaveText(guestPINMsg);
  await cur_page.locator('#guestPin').clear();
  await cur_page.getByPlaceholder('Enter a 6-digit guest PIN...').fill('3333');
  await cur_page.getByPlaceholder('Guest name').click(); //click away to get the error message
  await expect(cur_page.getByText(errorMsg2)).toBeVisible();
  await cur_page.locator('#guestPin').click();
  await cur_page.locator('#guestPin').fill('wwwww');
  await cur_page.getByPlaceholder('Guest name').click(); //click away to get the error message
  await expect(cur_page.getByText(errorMsg2)).toBeVisible();
  await cur_page.locator('#guestPin').fill('wwwwww'); //guest same not numeric...error appears only whe the event is finalized
  await expect(cur_page.getByText(errorMsg2)).not.toBeVisible(); //error
  
  //add 2nd system to call
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(process.env.partialPcvcName1!);
  await cur_page.getByRole('option', { name: process.env.myFullPcvcName1! }).locator('a').click();
  await cur_page.getByRole('dialog').getByRole('button').first().click();
  await cur_page.getByRole('button', { name: 'Call Now' }).click(); // call to get the error message
  //check error message for  non- numeric PIN
  await expect(cur_page.getByText('× Error - All mandatory fields must be completed - Guest PIN must be 6 digits')).toBeVisible();
  await expect(cur_page.getByText(errorMsg2)).not.toBeVisible(); //error
  //same host and guest PIN
  await cur_page.locator('#guestPin').fill('111111'); //guest same as host...error appears only whe the event is finalized
  await cur_page.getByRole('button', { name: 'Call Now' }).click(); // call to get the error message
  //check error message for  non- numeric PIN
  await expect(cur_page.getByText(errorMsg3)).toBeVisible(); //error
  await expect(cur_page.getByText('× Error - All mandatory fields must be completed - Guest and host PIN cannot be the same')).toBeVisible();
  await cur_page.locator('#guestPin').click();
  await cur_page.locator('#guestPin').fill('333456');
  await expect(cur_page.getByText(errorMsg3)).toBeVisible(); //error
  await cur_page.locator(locatorCloseMsg).nth(0).click();
  await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to clear the error messages
  await cur_page.getByRole('button', { name: 'Cancel' }).click();
  await expect(cur_page.getByText(errorMsg3)).not.toBeVisible(); //error cleared
  await cur_page.getByText('x', { exact: true }).click();
  });
   // Test logout
test('logout', async () => {
  await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await cur_page.close();
  })
  });
  