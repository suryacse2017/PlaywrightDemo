import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteOnlyGuests");
test.describe('ONTinvite with only guests', () => { 
  const eventTitle="OTNinvite with only guests";
  const name1="Monica Badila"
  const email1="mbadila@otn.ca"
  const name=process.env.partialPcvcName2!;
  const email="test@test.ca"
  const consultant=process.env.fullPcvcName2!;
  const errorEmail="Email already used";
  const locatorCloseMsg=".close.ng-scope";
  const errorEmailTop="× Error - Email already used. Please enter a different email.";
  let scheduleEvent='Scheduled between '+name+' and Monica Badila via email'
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

test('Create OTNinvite with only guests', async () => {
 
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
   // 1st guest is consultant
  await cur_page.getByTestId('ParticipantsController.toggleNonOtnSystemHost(guest.email)').click();
  //second guest
  await cur_page.getByPlaceholder('Guest name').fill(name1);
  await cur_page.getByPlaceholder('Guest email').fill(email1);
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await expect(cur_page.getByText(errorEmailTop)).not.toBeVisible();
  await expect(cur_page.getByText(errorEmail, { exact: true })).not.toBeVisible();
  //select consultant
  await cur_page.getByPlaceholder('Search for consultant').click();
  await cur_page.getByPlaceholder('Search for consultant').fill(name);
  await cur_page.getByRole('option', { name: name }).locator('a').click();
   //Schedule
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
  await cur_page.getByText(scheduleEvent).click();
  await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
  await cur_page.getByRole('button', { name: 'Yes' }).click();
  
})

     test.afterAll(async () => {
  
      await cur_page.close();

    });

})

