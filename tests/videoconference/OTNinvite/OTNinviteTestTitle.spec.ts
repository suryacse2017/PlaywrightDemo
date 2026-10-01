import {test, expect, Page} from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteTestTitle");

test.describe('Create OTNinvite with title', () => { 
  const locatorCloseMsg=".close.ng-scope";
  const locatorGuestName="//input[@name='guestName']" ;
  const locatorGuestEmail="//input[@name='guestEmail']";
  const locGuestNo=".participants-count";
  const locatorInLineText=".white.inline-text";
  const inLineTextClinical="titled.*Clinical Event";
  const inLineTextMeeting="titled Meeting";
  const inLineTextLearning="titled Learning event";
  const locatorTitle="//input[@name='inlineEdit']";
  const eventTitle1="Clinical soup with title '=te\\!@#$%^&*()+_{}[]|?,.stest'";
  const eventTitle='Clinical soup with title “Shift Rounds in the ghost hospital from Brambury belonging to Dracula county in ghosty Transilvania"';
  const searchName=process.env.partialPcvcName1! ;
  const mySystem=process.env.myFullPcvcName1! ;
  const validEmail =
  [
    {name: "Victor", email:"vtest@test.ca"},
    { name: "Ana", email: "a@test.ca"},
    { name: "Bonny", email: "b@test.ca"},
    { name: "Conny", email: "c@test.ca"},
   
    
  ]
  let cur_page: Page; 
  test.beforeAll(async ({ page }) => { cur_page = page });
  let guestCount=0;
  let textGuestNo = "you have added "+guestCount.toString()+" / 60 systems";
  
  test.setTimeout(80000);
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
  test('Change title to clinical', async() => {
    //await expect(cur_page.locator(locatorInLineText)).toContainText(inLineTextClinical);
    await cur_page.getByText('Clinical Event', { exact: true }).click();
    await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle);
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
 
 //connect/disconnect call for OTNinvite
 test('Check start call', async () => {
 await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
 await cur_page.getByRole('button', { name: 'Cancel' }).click();
 })

 test('Change title to learning', async() => {
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Learning event');
  await expect(cur_page.locator(locatorInLineText)).toContainText(inLineTextLearning);
  await cur_page.getByTestId('inline.edit()').click();

  await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle);
  await cur_page.getByPlaceholder('Enter a 6-digit host PIN...').click();//click away
  //connect/disconnect call for OTNinvite
  await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite

  await cur_page.getByRole('button', { name: 'Cancel' }).click();

  })
  
  test('Change title to meeting', async() => {
    await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Meeting');
    await expect(cur_page.locator(locatorInLineText)).toContainText(inLineTextMeeting);
    await cur_page.getByTestId('inline.edit()').click();
    await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle);
    await cur_page.getByPlaceholder('Enter a 6-digit host PIN...').click();//click away
    //connect/disconnect call for OTNinvite
    await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
    await cur_page.getByRole('button', { name: 'Cancel' }).click();
    })
    test('Change again title to learning', async() => {
      await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Learning event');
      await expect(cur_page.locator(locatorInLineText)).toContainText(inLineTextLearning);
        await cur_page.getByTestId('inline.edit()').click();
      await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle1);
      await cur_page.getByPlaceholder('Enter a 6-digit host PIN...').click();//click away
      //connect/disconnect call for OTNinvite
      await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
      await cur_page.getByRole('button', { name: 'Cancel' }).click();
    
      })   
      test('Change again title to meeting', async() => {
        await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Meeting');
        await expect(cur_page.locator(locatorInLineText)).toContainText(inLineTextMeeting);
        await cur_page.getByTestId('inline.edit()').click();
        await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle1);
        await cur_page.getByPlaceholder('Enter a 6-digit host PIN...').click();//click away
        //connect/disconnect call for OTNinvite
        await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
        await cur_page.getByRole('button', { name: 'Cancel' }).click();
        })
        test('Change again title to clinical and connect event', async() => {
          test.setTimeout(45000);
          await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
          //await expect(cur_page.locator(locatorInLineText)).toContainText(inLineTextClinical);
          await cur_page.locator('#detailContainer').getByText('Clinical event').click();
          await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle1);
          await cur_page.getByPlaceholder('Enter a 6-digit host PIN...').click();//click away
          //connect/disconnect call for OTNinvite
          await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
          await cur_page.getByRole('button', { name: 'Create' }).click();
          //delay(40000);          
          await cur_page.waitForTimeout(40000);
          //end call
          await cur_page.getByTitle('End Call').click();
          await cur_page.waitForTimeout(3000);
          //regular expression for eventID
          const regex=new RegExp('[0-9]{9}', 'm');
          // grab the event ID
          await cur_page.getByText('Scheduled with multiple participants').first().click();
          let val = await cur_page.getByText('Scheduled with multiple participants').first().textContent()
          let eventid=val?.match(regex);
          let eventid1=String(eventid);
          console.log ('Event ID:'+ eventid);
        })
           // cancel event
          test('Cancel event', async () => {
            const statusMessage = cur_page.locator('#messageContainer');
          const cancelledMsg= "      ×      Success - The event has been cancelled                   "; 
          await cur_page.getByText('Scheduled with multiple participants').click();   
          await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).first().click();
          await cur_page.getByRole('button', { name: 'Yes' }).click();
          await cur_page.waitForTimeout(1000);
          await expect(statusMessage).toBeVisible()
          await expect(statusMessage).toHaveText(cancelledMsg);
          await cur_page.waitForTimeout(3000);
          await expect(statusMessage).toBeHidden()
          await cur_page.waitForTimeout(3000);
          })
 test('logout', async() => {

    await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
    await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
    await cur_page.close();
 })

  
   test.afterAll(async () => {
  
    await cur_page.close();

  });

 })
