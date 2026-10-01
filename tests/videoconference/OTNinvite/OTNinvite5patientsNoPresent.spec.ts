import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinvite5patientsNoPresent");

test.describe('ONTinvite with 5 patients no present', () => { 
 const eventTitle='ONTinvite with 5 patients no present';
 const locatorText51='//*[@id="detailContainer"]/div[2]/span[2]/span[2]';
 const locatorText52='//*[@id="detailContainer"]/div[2]/span[2]/span[3]';
 const text5='is';
 const text51='s'
 const text52='are';
 const name="Five Patients"
 const email="mbadila@otn.ca"
 const text="When you click \"Create\" the videoconference invite will be emailed to "+name+" at "+email+" and the event will start.";
  let cur_page: Page; 
  test.setTimeout(90000);
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
  //check the text for one patient is correct 
  await expect(cur_page.locator(locatorText51)).toContainText(text5);
  await cur_page.getByTestId("inline.edit()").nth(1).click();
  await cur_page.locator('#detailContainer').getByRole('textbox').fill('5');
//check if the text for 5 patient changed correctly
  await expect(cur_page.locator(locatorText51)).toContainText(text51);
  await expect(cur_page.locator(locatorText52)).toContainText(text52);
  await cur_page.locator('span').filter({ hasText: /^present$/ }).click();
  await cur_page.getByText('not present').click();
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(process.env.partialPcvcName1!);
  await cur_page.getByRole('option', { name: process.env.myFullPcvcName1! }).locator('a').click();
  await cur_page.getByRole('dialog').getByRole('button').first().click();
  await cur_page.getByText('Clinical Event', { exact: true }).click();
  await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle);
  await cur_page.getByPlaceholder('Enter a 6-digit host PIN...').click();//click away

})

//connect/disconnect call for OTNinvite
test('Start call', async () => {
  await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
  await cur_page.getByRole('button', { name: 'Create' }).click();
  //delay(40000);
 await cur_page.waitForTimeout(40000);
 await cur_page.getByTitle('End Call').click();
  })
//Cancel event 
test('Cancel event', async () => {
  //regular expression for eventID
const regex=new RegExp('[0-9]{9}', 'm');
//messages
const statusMessage = cur_page.locator('#messageContainer');
const cancelledMsg= "      ×      Success - The event has been cancelled                     ";
let eventName="Scheduled with "+name+" via email" ;
await cur_page.reload();
await cur_page.getByText(eventName).first().click();   // open the details page
//get the eventId 
let val = await cur_page.getByText(eventName).first().textContent()
let eventid=val?.match(regex);
console.log ('Event ID:'+ eventid);
await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
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
      await cur_page.waitForTimeout(10000);
    })
     test.afterAll(async () => {
  
      await cur_page.close();
    });
})

