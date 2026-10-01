import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteChangeGuestName");
test.describe('Change guest name in OTNinvite', () => { 
  const name='Monica Changename';
  const successMsg = "    ×      Success - The changes have been saved and email sent to participant."
  const successMsg1="    ×      Success - The changes have been saved."
  const cancelledMsg= "      ×      Success - The event has been cancelled                     "
  let eventName='Scheduled with '+name+' via email'; 
  let guestRecord='Guest via email (OTNinvite) '+ name+' mtest@test.ca (Consent PHI signed)';
  let cur_page: Page; 
  test.setTimeout(60000);
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
  await cur_page.getByPlaceholder('Guest email').fill('mtest@test.ca');
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(process.env.partialPcvcName1!);
  await cur_page.getByRole('option', { name: process.env.myFullPcvcName1! }).locator('a').click();
  await cur_page.getByRole('dialog').getByRole('button').first().click();
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
  await cur_page.locator('td:nth-child(3) > .btn').first().click();
  await cur_page.locator('.end-time-wrapper > tbody > tr > td:nth-child(3) > .btn').first().click();
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
})
test('Change guest name', async () => {

  const statusMessage = cur_page.locator('#messageContainer');

  await cur_page.getByText(eventName).first().click();
  await cur_page.getByRole('row', { name: guestRecord }).locator('span').nth(3).click();
  await cur_page.locator('input[name="name"]').click();
  await cur_page.locator('input[name="name"]').fill('Monica');  
  await cur_page.getByRole('button', { name: 'Save' }).click();
  await expect(statusMessage).toBeVisible()
  await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
  await expect(statusMessage).toHaveText(successMsg1);
  await expect(statusMessage).toBeHidden()
})

test('Cancel test event', async () => {
  
 const statusMessage = cur_page.locator('#messageContainer');

 await cur_page.getByText(eventName).first().click();
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

