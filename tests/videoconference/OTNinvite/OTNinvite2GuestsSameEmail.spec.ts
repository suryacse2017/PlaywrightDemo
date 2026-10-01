import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
test.describe('ONTinvite 2 guests cannot have same email', () => { 
  setReport("eVisitReports","OTNinvite2GuestsSameEmail")
  const eventTitle="2 guests cannot have same email";
  const name="Monica Badila"
  const email="mbadila@otn.ca"
  const email1="test@test.ca"
  const errorEmail="Email already used";
  const locatorCloseMsg=".close.ng-scope";
  const errorEmailTop="× Error - Email already used. Please enter a different email.";
  let cur_page: Page; 
  test.beforeAll(async ({ page }) => { cur_page = page });

  test('login', async () => {

  await cur_page.goto('/',{waitUntil:'domcontentloaded'});
  await cur_page.getByText('OTN Credentials').click();
  await cur_page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await cur_page.getByPlaceholder('Password').click();
  await cur_page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await cur_page.getByRole('button', { name: 'Sign In' }).click();
  //Navigate to videoconference
  await cur_page.getByRole('link', { name: 'Videoconference' }).click();
  })

test('Create OTNinvite', async () => {
 
  await cur_page.getByText('Create event').click();
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  await cur_page.getByLabel('Consent to include personal health information in an OTNinvite email').check();
  await cur_page.getByRole('button', { name: 'Confirm' }).click();
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill(name);
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill(email);
  await cur_page.getByRole('button', { name: 'Add' }).click();
  // second guest with the same name(possible) and same email (error)
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill(name);
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill(email);
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await expect(cur_page.getByText(errorEmailTop)).toBeVisible() ;
  await expect(cur_page.getByText(errorEmail, { exact: true })).toBeVisible();
  await cur_page.locator(locatorCloseMsg).nth(0).click();
  await cur_page.getByPlaceholder('Guest email').fill(email1);
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await expect(cur_page.getByText(errorEmailTop)).not.toBeVisible();
  await expect(cur_page.getByText(errorEmail, { exact: true })).not.toBeVisible();

})

     test.afterAll(async () => {
  
      await cur_page.close();
  
    });

})

