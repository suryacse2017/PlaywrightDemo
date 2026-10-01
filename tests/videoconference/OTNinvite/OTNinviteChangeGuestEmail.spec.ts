import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteChangeGuestEmail");
test.describe('Change guest email and consent', () => { 
  const successMsg = "    ×      Success - The changes have been saved and email sent to participant."
  const successMsg1="    ×      Success - The changes have been saved."
  const cancelledMsg= "      ×      Success - The event has been cancelled                     "
  test.setTimeout(80000);
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
  await cur_page.getByPlaceholder('Guest name').fill('Monica Badila');
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill('teste@test.ca.ca');
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(process.env.partialPcvcName1!);
  await cur_page.getByRole('option', { name: process.env.myFullPcvcName1! }).locator('a').click();
  await cur_page.getByRole('dialog').getByRole('button').first().click();
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
})

test('Change guest email', async () => {

  const statusMessage = cur_page.locator('#messageContainer');

  await cur_page.getByText('Scheduled with Monica Badila via email').first().click();
  await cur_page.getByRole('row', { name: 'Guest via email (OTNinvite) Monica Badila teste@test.ca.ca (Consent PHI signed)' }).locator('span').nth(3).click();
  //await page.locator('input[name="email"]').click();
  await cur_page.locator('input[name="email"]').fill('mtest@test.ca');
  await cur_page.getByLabel('Consent to include personal health information in an OTNinvite email').uncheck();
  await cur_page.getByRole('button', { name: 'Save' }).click();
  await expect(statusMessage).toBeVisible()
  await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
  await expect(statusMessage).toHaveText(successMsg);
  await expect(statusMessage).toBeHidden()
  
})


test('Change guest consent', async () => {

  const statusMessage = cur_page.locator('#messageContainer');

  await cur_page.getByText('Scheduled with Monica Badila via email').first().click();
  await cur_page.getByRole('row', { name: 'Guest via email (OTNinvite) Monica Badila mtest@test.ca' }).locator('span').nth(2).click();
  await cur_page.getByLabel('Consent to include personal health information in an OTNinvite email').check();
  await cur_page.getByRole('button', { name: 'Confirm' }).click();
  await cur_page.getByRole('button', { name: 'Save' }).click();
  await expect(statusMessage).toBeVisible()
  await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
  await expect(statusMessage).toHaveText(successMsg);
  await expect(statusMessage).toBeHidden()
  await cur_page.getByRole('row', { name: 'Guest via email (OTNinvite) Monica Badila mtest@test.ca (Consent PHI signed)' }).locator('span').nth(3).click();
  await cur_page.getByRole('button', { name: 'Cancel' }).click();

  })

  test('Cancel test event', async () => {
  
    const statusMessage = cur_page.locator('#messageContainer');
    await cur_page.reload(); //refresh page to get the event updated
    await cur_page.getByText('Scheduled with Monica Badila via email').first().click();
    await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
    await cur_page.getByText('Are you sure you want to cancel this event?');
    //await page.getByText('Are you sure you want to cancel this event?');
    //await page.getByText('When you click "Yes" a cancellation message will be emailed to Monica at mtest@t').click();
    await cur_page.getByRole('button', { name: 'Yes' }).click();
    await expect(statusMessage).toBeVisible()
    await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
    await expect(statusMessage).toHaveText(cancelledMsg);
    await expect(statusMessage).toBeHidden() 
   })
test('logout', async () => {
    await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
    await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
    })
  
  test('wait on page for logout', async () => {
      test.setTimeout(60000);
      //delay(20s);
      await cur_page.waitForTimeout(20000);
    })
     test.afterAll(async () => {
  
      await cur_page.close();
  
    });
  
})

