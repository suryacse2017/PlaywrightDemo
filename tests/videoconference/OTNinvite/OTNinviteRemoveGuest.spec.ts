import {test, expect, Page} from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteRemoveGuest");

test.describe('Create OTNinvite with max no of guests', () => { 
  const locatorCloseMsg=".close.ng-scope";
  const locatorGuestName="//input[@name='guestName']" ;
  const locatorGuestEmail="//input[@name='guestEmail']";
  const locGuestNo=".participants-count";
  const searchName=process.env.partialPcvcName1! ;
  const mySystem=process.env.myFullPcvcName1! ;
  const scheduledEvent='Scheduled with Bonny via email';
  const validEmail =
  [
    {name: "Victor", email:"vtest@test.ca"},
    { name: "Ana", email: "a@test.ca"},
    { name: "Bonny", email: "b@test.ca"},
    { name: "Conny", email: "c@test.ca"},
   
    
  ]
  let cur_page: Page; 
  let guestCount=0;
  let textGuestNo = "you have added "+guestCount.toString()+" / 60 systems";
  test.beforeAll(async ({ page }) => { cur_page = page });
  test.setTimeout(60000);
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
  test('Start OTNinvite creation and add pcvc', async () => {
    //Open Create Event modal
    await cur_page.getByText('Create event').click();
    await expect(cur_page.locator(locGuestNo)).toHaveText(textGuestNo);// the no of participants is '0'
    await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
    await cur_page.getByPlaceholder('Search for people or room systems').click();
    await cur_page.getByPlaceholder('Search for people or room systems').fill(searchName);
    await cur_page.getByRole('option', { name: mySystem }).locator('a').click();
    await cur_page.getByRole('dialog').getByRole('button').first().click();
    guestCount++;
    textGuestNo = "you have added "+guestCount.toString()+" / 60 systems";
    console.log(textGuestNo);
    await expect(cur_page.locator(locGuestNo)).toHaveText(textGuestNo);// the no of participants is '1'
  })
 
 validEmail.forEach(data => {
  test(`Add guest ${data.name}`, async () => { 
 
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').fill(data.name);
  await cur_page.getByPlaceholder('Guest email').fill(data.email);
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await expect(cur_page.getByText('Enter a valid email', { exact: true })).not.toBeVisible();
  // participants no. shows correctly 
 guestCount++;
  textGuestNo = "you have added "+guestCount+" / 60 systems";
  console.log(textGuestNo);
  await expect(cur_page.locator(locGuestNo)).toHaveText(textGuestNo);// the no of participants is wright
 });
 })
 
 test(`Remove guests`, async () => {
  //remove 2nd guest( 3rd participant)  
  let locatorParticipantRemove=".ng-scope:nth-child(3) > .participant-controls .btn-icon-remove"  
  await cur_page.locator(locatorParticipantRemove).click();
  //remove last guest
  locatorParticipantRemove=".ng-scope:nth-child(4) > .participant-controls .btn-icon-remove" 
  await cur_page.locator(locatorParticipantRemove).click();
  //remove first guest
  locatorParticipantRemove=".ng-scope:nth-child(2) > .participant-controls .btn-icon-remove" 
  await cur_page.locator(locatorParticipantRemove).click();
 })

 //connect/disconnect call for OTNinvite
 test('Connect call', async () => {
  await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
  await cur_page.getByRole('button', { name: 'Create' }).click();
  //delay(40000);
   await cur_page.waitForTimeout(40000);
  await cur_page.getByTitle('End Call').click();
  await cur_page.waitForTimeout(5000);  
    })
  //Cancel event 
test('Cancel first event', async () => {
  const statusMessage = cur_page.locator('#messageContainer');
  const cancelledMsg= "      ×      Success - The event has been cancelled                     ";
  await cur_page.getByText(scheduledEvent).first().click();   
  await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
  await cur_page.getByRole('button', { name: 'Yes' }).click();
  await expect(statusMessage).toBeVisible()
  await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
  await expect(statusMessage).toHaveText(cancelledMsg);
  await expect(statusMessage).toBeHidden() 
  
    })

 test('logout', async() => {

    await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
    await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
    await cur_page.close();
 
   });
 })
