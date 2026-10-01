import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteCallTitleSpecialChars");
test.describe('ONTinvite with Special Characters title', () => { 

 const eventTitle="Clinical soup with title '=te\\!@#$%^&*()+_{}[]|?,.stest'";
 const name="Special Characters"
 const email="mbadilamtest@otn.ca"
 const createText3="When you click \"Create\" the videoconference invite will be emailed to "+name+" at "+email+" and the event will start.";
 const createText4="The email invitation will also be sent to your administrative contact if you have identified one in your videoconference settings."
 const locatorCreate1=".otn-modal > .ng-binding:nth-child(1)";
 const locatorCreate2=".otn-modal > .ng-binding:nth-child(2)";
 const locatorCreate3=".otn-modal > .ng-binding:nth-child(3)";
 const locatorCreate4=".otn-modal > .ng-binding:nth-child(4)";
 const createText1="Create Event";
 const createText2="Are you sure you want to create this event?"
 const locatorInLineText=".white.inline-text";
 const inLineTextLearning="titled Learning event"
 test.setTimeout(100000);
  let cur_page: Page; 
  test.beforeAll(async ({ page }) => { cur_page = page}) ;
   

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

test('Create clinical OTNinvite with special characters', async () => {
 
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
test('Start clinical call', async () => {
  
  await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
  await expect (cur_page.locator(locatorCreate1)).toHaveText(createText1); //check the texts on pop up
  await expect (cur_page.locator(locatorCreate2)).toHaveText(createText2);
  await expect (cur_page.locator(locatorCreate3)).toHaveText(createText3);
  await cur_page.getByRole('button', { name: 'Create' }).click(); // create and connect OTNinvite
 //delay(40 s);
 await cur_page.waitForTimeout(20000);
 await cur_page.getByTitle('End Call').click(); //disconnect the call
 //cancel clinical event
 const statusMessage = cur_page.locator('#messageContainer');
const cancelledMsg= "      ×      Success - The event has been cancelled                     ";
await cur_page.reload(); //reload the page to update the event
await cur_page.getByText("Scheduled with Special Characters via email").first().click();   
await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
await cur_page.getByRole('button', { name: 'Yes' }).click();
await expect(statusMessage).toBeVisible()
await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
await expect(statusMessage).toHaveText(cancelledMsg);
await expect(statusMessage).toBeHidden()
 
  })
  test('Create non clinical OTNinvite with  special characters', async () => {
 
    await cur_page.getByText('Create event').click();
    await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
    await cur_page.getByPlaceholder('Guest name').click();
    await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Learning event');
    await cur_page.getByPlaceholder('Guest name').click();
    await cur_page.getByPlaceholder('Guest name').fill(name);
    await cur_page.getByPlaceholder('Guest email').click();
    await cur_page.getByPlaceholder('Guest email').fill(email);
    await cur_page.getByRole('button', { name: 'Add' }).click();
  
  
    await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
    await cur_page.getByPlaceholder('Search for people or room systems').click();
    await cur_page.getByPlaceholder('Search for people or room systems').fill(process.env.partialPcvcName1!);
  await cur_page.getByRole('option', { name: process.env.myFullPcvcName1! }).locator('a').click();
    await cur_page.getByRole('dialog').getByRole('button').first().click();
    await cur_page.locator(locatorInLineText).click();
    await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle);
    await cur_page.getByPlaceholder('Enter a 6-digit host PIN...').click();//click away
})
  
  //connect/disconnect call for OTNinvite
  test('Non clinical call', async () => {
    test.setTimeout(40000);
    await cur_page.getByRole('button', { name: 'Call Now' }).click(); //call to create and connect OTNinvite
    await expect (cur_page.locator(locatorCreate1)).toHaveText(createText1); //check the texts on pop up
    await expect (cur_page.locator(locatorCreate2)).toHaveText(createText2);
    await expect (cur_page.locator(locatorCreate3)).toHaveText(createText3);
    await expect (cur_page.locator(locatorCreate4)).toHaveText(createText4);
    await cur_page.getByRole('button', { name: 'Create' }).click(); // create and connect OTNinvite
   //delay(40 s);
   await cur_page.waitForTimeout(3000);
   await cur_page.getByTitle('End Call').click(); //disconnect the call
   await cur_page.waitForTimeout(10000);  
   //cancel clinical event
 const statusMessage = cur_page.locator('#messageContainer');
 const cancelledMsg= "      ×      Success - The event has been cancelled                   "; 
 await cur_page.reload(); // refresh the page to get the event updated
 await cur_page.getByText("Scheduled with Special Characters via email").first().click();   
 await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
 await cur_page.getByRole('button', { name: 'Yes' }).click();
 await expect(statusMessage).toBeVisible()
 await expect(statusMessage).toHaveText(cancelledMsg);
 await cur_page.waitForTimeout(1000); 
 await expect(statusMessage).toBeHidden()
    }) 
test('logout', async () => {
    await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
    await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
    })
  
  test('Wait on page for logout', async () => {
     
      //delay(20s);
      await cur_page.waitForTimeout(3000);
    })
     test.afterAll(async () => {
  
      await cur_page.close();
    });

})

