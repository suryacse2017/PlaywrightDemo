import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv, Day, Time} from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteCallTitleFrenchDetails");
test.describe('ONTinvite call with French title', () => { 

 const eventTitle="Clinique Médicale D'Urgence De L'Outaouais-Château ";
 const name="François L'Homme-Rivière"
 const email="mbadila@otn.ca"
 const createText3="When you click \"Create\" the videoconference invite will be emailed to "+name+" at "+email+" and the event will start.";
 const locatorCreate1=".otn-modal > .ng-binding:nth-child(1)";
 const locatorCreate2=".otn-modal > .ng-binding:nth-child(2)";
 const locatorCreate3=".otn-modal > .ng-binding:nth-child(3)";
 const createText1="Create Event";
 const createText2="Are you sure you want to create this event?";
 const hostSysSearch=process.env.partialPcvcName1!
 const hostSys=process.env.myFullPcvcName1!
 const consultant1=process.env.legalConsultant1!
 const consultantSystem=process.env.pcvcName1!;
 const admin=process.env.admin! ;
 const partSys="François L'Homme-Rivière";
 const eventIdLinkLocator='#selected-event-details > div.event-detail-print.page-break-fix > div:nth-child(3) > div.col-md-7.col-xs-6.event-id-field.ng-scope > form > input.eventSubmitLink'
 const userCN=process.env.userCN!
 const regex=new RegExp('[0-9]{9}', 'm');
 test.setTimeout(150000);
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
test('start/disconnect call', async () => {
  let date=new Day();
  let startTime=new Time();
  let endTime=new Time(1);
  await cur_page.getByTestId('placeMultipointCall()').click();; //call to create and connect OTNinvite  
  await expect (cur_page.locator(locatorCreate1)).toHaveText(createText1); //check the texts on pop up
  await expect (cur_page.locator(locatorCreate2)).toHaveText(createText2);
  await expect (cur_page.locator(locatorCreate3)).toHaveText(createText3);
  await cur_page.getByRole('button', { name: 'Create' }).click(); // create and connect OTNinvite
 
 //delay(50 s);
  await cur_page.waitForTimeout(50000);
  await cur_page.getByTestId('endCall()').click(); //disconnect the call
  
  await cur_page.waitForTimeout(3000);
  
  

  //Check event's details on the page- bug scheduled instead of call
  await cur_page.reload();
  await cur_page.waitForTimeout(10000);
await cur_page.getByText('Scheduled with '+ partSys ).first().click();
let val = await cur_page.getByText('Scheduled with '+partSys).first().textContent()
console.log('Text'+ val);
let eventid=val?.match(regex);
console.log ('Event ID:'+ eventid);
const eventid1=String(eventid);
await cur_page.getByText(partSys+' via email'+' Event ID: '+eventid).click()
//await page.locator('#printable div').filter({ hasText: startTime.hours+':'+startTime.minutes+'–'+endTime.hours+':'+endTime.minutes+' Clinical Event (1 patient) Call with '+participantSys+' Event ID: '+eventid}).first().click();
//check details page
await expect(cur_page.getByText('Event Detail')).toBeVisible;
await expect(cur_page.getByTestId('confirmCancelOTNinvite(selectedEvent)')).toHaveText('Cancel Event');
await expect(cur_page.locator('#buttons').getByTestId('open($event)')).toHaveText('Copy Event');
await expect(cur_page.locator('#event-icon')).toBeVisible();
await expect(cur_page.locator('#event-icon-label')).toHaveText('Clinical event');
await expect(cur_page.getByText(date.caformatDate)).toBeVisible();
console.log(startTime.hours+':'+startTime.minutes+' – '+endTime.hours+':'+endTime.minutes);
await expect(cur_page.getByText(startTime.hours+':'+startTime.minutes+' – '+endTime.hours+':'+endTime.minutes)).toBeVisible();
//edit icon for time presend and acctionable
await cur_page.getByTestId('DetailsController.editEventTime()').click();
//cancel edit time
await cur_page.getByTestId('DetailsController.cancelEditEventTime()').click();
await expect(cur_page.locator('#event-icon')).toBeVisible();
//event title
await expect(cur_page.getByText("Clinique Médicale D'Urgence De L'Outaouais-Château", { exact: true })).toBeVisible()
//TAC
await expect(cur_page.getByText('Cardiology')).toBeVisible();
//Event ID label
await expect(cur_page.getByText('Event ID:', { exact: true }).first()).toBeVisible();
await expect(cur_page.locator(eventIdLinkLocator)).toHaveAttribute('value', eventid1);
//Event status
await expect(cur_page.getByText('Event Status:', { exact: true }).first()).toBeVisible();
await expect(cur_page.getByText('Scheduled', { exact: true })).toBeVisible();
//event consultant- legal name
await expect(cur_page.getByText('Consultant:')).toBeVisible();
await expect(cur_page.getByText(consultant1).first()).toBeVisible()
//admin contact
await expect(cur_page.getByText('Administrative contact:')).toBeVisible();
await expect(cur_page.getByText(admin)).toBeVisible();
await expect(cur_page.getByRole('heading', { name: 'Participating Systems' })).toBeVisible();
await expect(cur_page.getByText('2 systems')).toBeVisible();
//patient's details
await expect(cur_page.getByRole('heading', { name: 'Patient Details' })).toBeVisible();
await expect(cur_page.getByText('Number of patients:')).toBeVisible();
await expect(cur_page.getByText('1', { exact: true })).toBeVisible();
await expect(cur_page.getByTestId('showPatientLetter(selectedEvent.requestId)')).toContainText('eVisit Patient Handout');
//check Patient number is editable
await cur_page.getByTestId('DetailsController.editNumPatients()').click();
await cur_page.getByTestId('DetailsController.cancelEditNumPatients()').click();
//Video Connection links
await expect(cur_page.getByRole('heading', { name: 'Video Connection Methods' })).toBeVisible();
await expect(cur_page.getByText('Host URL:')).toBeVisible();
console.log('https://guest.stagingotn.ca/#/guest/?eventId='+eventid1+'&role=host');
await expect(cur_page.locator('#evetURL > a' ).first()).toContainText('https://guest.stagingotn.ca/#/guest/?eventId='+eventid1+'&role=host');
await expect(cur_page.getByText('Host PIN:', { exact: true })).toBeVisible();
// host PIN await page.getByText('209601').click();
await expect(cur_page.getByText('Guest URL:')).toBeVisible();
await expect(cur_page.getByRole('link', { name: 'https://guest.stagingotn.ca/#/guest/?eventId='+eventid1+'&role=guest' })).toBeVisible();
//audio connection methods
await expect(cur_page.getByRole('heading', { name: 'Audio Connection Methods' })).toBeVisible();
await expect(cur_page.getByText('Audio Phone No:')).toBeVisible();
await expect(cur_page.getByRole('cell', { name: '(888) 346-6784' })).toBeVisible();
await expect(cur_page.getByText('Event ID:', { exact: true }).nth(1)).toBeVisible();
await expect(cur_page.getByText('Audio Guest PIN:')).toBeVisible();
//botton details
await expect(cur_page.getByRole('heading', { name: 'Event Details' })).toBeVisible();
await expect(cur_page.getByText('Appointment Requirements:')).toBeVisible();
await expect(cur_page.getByText('Scheduled By:')).toBeVisible();
await expect(cur_page.getByText('Last Edited By:')).toBeVisible();
await expect(cur_page.getByText('Last Edited:')).toBeVisible();
await expect(cur_page.getByText('Not provided')).toBeVisible();
await expect(cur_page.getByText(userCN)).toBeVisible();

 //Cancel event 
 
const statusMessage = cur_page.locator('#messageContainer');
const cancelledMsg= "      ×      Success - The event has been cancelled                     ";
await cur_page.reload();
await cur_page.getByText("Scheduled with François L'Homme-Rivière via email").first().click();   
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
     
      //delay(20s);
      await cur_page.waitForTimeout(3000);
    })
     test.afterAll(async () => {
  
      await cur_page.close();
  
    });
    
})

