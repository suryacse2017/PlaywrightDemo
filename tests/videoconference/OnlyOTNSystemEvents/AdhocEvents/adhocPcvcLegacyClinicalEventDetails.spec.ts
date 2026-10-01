import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../../helper/functions';
import { Day ,Time} from '../../../../helper/functions';

loadEnv('video_staging');
setReport("eVisitReports","adhocPcvcLegacyClinicalEventDetails");
const tooltipPartipants = "Your event can contain a combination of OTNhub room-based or personal (PCVC) systems, guests, and non-OTN systems.\n" +
"Guest via Email: Send an OTNinvite email to a patient or guest to attend from their own device.\n" +
"OTN System: Connect with an OTNhub personal (PCVC) or room-based system.\n" +
"Non-OTN System: Connect with a standards-based system by sending them a dialing alias via email.";
const tooltipCreate = "Schedule or connect any combination of Guest (via OTNinvite), OTN member, Room-based system, or non-OTN system.";
const tooltipBook = "Request a virtual care appointment at a PAN site for your patient. Request nursing support or use of peripheral devices.";
const locGuestNo=".participants-count";
const locatorinvDisclaimer=".invite-disclaimer";
const invDisclaimer="OTNinvite is applicable in select situations. For more info click here."
const locatorelDisclaimer=".eligibility-disclaimer";
const elDisclaimer="Please take a moment to consider Patient Eligibility.";
const hostSysSearch=process.env.partialPcvcName1!
const participantSysSearch=process.env.partialLegSysName2!
const hostSys=process.env.myFullPcvcName1!
const participantSys=process.env.legSysName2!
const consultant1=process.env.legalConsultant1!
const consultantSystem=process.env.pcvcName1;
const partSys=process.env.legSysName2!;
const locatorCloseMsg=".close.ng-scope";
const scheduleText1="Are you sure you want to schedule this event?";
const locatorTime='//*[@id="ng-app"]/div[16]/div/div/div[1]/table/tbody/tr[1]/td[2]';
const locatorConsultant="tr:nth-child(2) > .ng-binding:nth-child(2)";
const locatorConsultantSys="tr:nth-child(3) > .ng-binding:nth-child(2)";
const locatorPartSys="tbody > .ng-scope > .ng-binding:nth-child(2)";
const dateDetLocator='#selected-event-details > div.event-detail-print.page-break-fix > div.col-md-12.detail-heading-wrapper > div:nth-child(5) > div > span > div > span:nth-child(1)'
const timeDetLocator='#selected-event-details > div.event-detail-print.page-break-fix > div.col-md-12.detail-heading-wrapper > div:nth-child(5) > div > span > div > span:nth-child(2)'
const editTimeLocator='#selected-event-details > div.event-detail-print.page-break-fix > div.col-md-12.detail-heading-wrapper > div:nth-child(5) > div > span > div > span:nth-child(3)'
const eventIdLinkLocator='#selected-event-details > div.event-detail-print.page-break-fix > div:nth-child(3) > div.col-md-7.col-xs-6.event-id-field.ng-scope > form > input.eventSubmitLink'
const phone=process.env.audio
//const locatorAdmin=".admin-contact";
const admin=process.env.admin! ;
const regex=new RegExp('[0-9]{9}', 'm');
let date=new Day();

test('adhoc  clinical with 1 pcvc and 1 legacy', async ({page}) => {
  test.setTimeout(180000);
  await page.goto('/');
  await page.getByText('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  //Navigate to videoconference
  await page.getByRole('link', { name: 'Videoconference' }).click();
 
  //Check Create event tooltip
  await page.getByText('Create event').hover();
  let tooltipName = await page.getByText('Create event').getAttribute('popover');
  console.log(tooltipName);
  tooltipName===tooltipCreate;
  //
  //Open Create Event modal
  await page.getByText('Create event').click();
  await expect(page.getByRole('heading',{name:'Connect'})).toHaveText('Connect');
  //check tooltip
  tooltipName = await page.locator('.inline-tooltip').getAttribute("title")
  await page.locator('.inline-tooltip').hover();
  console.log(tooltipName);
  tooltipName===tooltipPartipants;
  //Check content
  //Check guest no
  let guestCount='0';
  let textGuestNo = "you have added "+guestCount+" / 60 systems";
  await expect(page.locator(locGuestNo)).toHaveText(textGuestNo);
  //check defaults
  await expect(page.locator(locatorinvDisclaimer)).toHaveText(invDisclaimer);
  await expect(page.locator(locatorelDisclaimer)).toHaveText(elDisclaimer);
  await expect(page.getByRole('button', { name: 'Call Now' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Schedule' })).toBeDisabled();
  await expect(page.getByText('Opt out of PCVC time conflicts')).toHaveText('Opt out of PCVC time conflicts');
  await expect(page.getByLabel('Opt out of PCVC time conflicts')).not.toBeChecked();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();

 
  //check specifics for clinical event
  await page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  //await expect(page.locator(locatorInLineText)).toContainText(inLineTextClinical);
 //check participating systems options  
  await expect(page.getByText('Participating System(s)')).toHaveText('Participating System(s)');    
  await expect(page.locator('form[name="participantForm"]').getByRole('combobox')).toBeEnabled();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
  //specifics for OTN systems
  await page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await expect(page.getByPlaceholder('Search for people or room systems')).toBeEditable();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
 //choose 2 pcvc systems
  await page.getByPlaceholder('Search for people or room systems').click();
  await page.getByPlaceholder('Search for people or room systems').fill(hostSysSearch);
  await page.getByRole('option', { name: hostSys }).locator('a').click();
  await page.getByRole('dialog').getByRole('button').first().click();
  await page.getByPlaceholder('Search for people or room systems').click();
  await page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch);
  await page.getByRole('option', { name: participantSys }).locator('a').click();
  let startTime=new Time();
  let endTime=new Time(1);
  await page.getByRole('button', { name: 'Call Now' }).click();
  await page.waitForTimeout(60000);
  await page.getByTestId('endCall()').click();
  await expect(page.getByText('1 guest connected')).toBeVisible();
  await page.waitForTimeout(10000);
  await page.reload();

  await page.waitForTimeout(1000);
 // await expect(page.getByText('1 guest connected')).not.toBeVisible();

//Check event's details on the page
await page.getByText('Call with '+ partSys).first().click();
let val = await page.getByText('Call with '+partSys).first().textContent()
console.log('Text'+ val);
let eventid=val?.match(regex);
console.log ('Event ID:'+ eventid);
const eventid1=String(eventid);
await page.getByText(participantSys+' Event ID: '+eventid).click()
//await page.locator('#printable div').filter({ hasText: startTime.hours+':'+startTime.minutes+'–'+endTime.hours+':'+endTime.minutes+' Clinical Event (1 patient) Call with '+participantSys+' Event ID: '+eventid}).first().click();
//check details page
await expect(page.getByText('Event Detail')).toBeVisible;
await expect(page.getByTestId('confirmCancelOTNinvite(selectedEvent)')).toHaveText('Cancel Event');
await expect(page.locator('#buttons').getByTestId('open($event)')).toHaveText('Copy Event');
await expect(page.locator('#event-icon')).toBeVisible();
await expect(page.locator('#event-icon-label')).toHaveText('Clinical event');
await expect(page.getByText(date.caformatDate)).toBeVisible();
console.log(date.caformatDate)
await expect(page.getByText(startTime.hours+':'+startTime.minutes+'–'+endTime.hours+':'+endTime.minutes)).toBeVisible();
//edit icon for time presend and acctionable
await page.getByTestId('DetailsController.editEventTime()').click();
//cancel edit time
await page.getByTestId('DetailsController.cancelEditEventTime()').click();
await expect(page.locator('#event-icon')).toBeVisible();
//event title
await expect(page.getByText('Clinical Event', { exact: true })).toBeVisible()
//TAC
await expect(page.getByText('Cardiology')).toBeVisible();
//Event ID label
await expect(page.getByText('Event ID:', { exact: true }).first()).toBeVisible();
await expect(page.locator(eventIdLinkLocator)).toHaveAttribute('value', eventid1);
//Event status
await expect(page.getByText('Event Status:', { exact: true }).first()).toBeVisible();
await expect(page.getByText('Scheduled', { exact: true })).toBeVisible();
//event consultant- legal name
await expect(page.getByText('Consultant:')).toBeVisible();
await expect(page.getByText(consultant1).first()).toBeVisible()
//admin contact
await expect(page.getByText('Administrative contact:')).toBeVisible();
await expect(page.getByText(admin)).toBeVisible();
//participant systems
await expect(page.getByRole('heading', { name: 'Participating Systems' })).toBeVisible();
await expect(page.getByText('2 systems')).toBeVisible();
//audio connection methods
await expect(page.getByRole('heading', { name: 'Audio Connection Methods' })).toBeVisible();
await expect(page.getByText('Audio Phone No:')).toBeVisible();
//await expect(page.getByRole('cell', { name: phone})).toBeVisible();
await expect(page.getByText('Event ID:', { exact: true }).nth(1)).toBeVisible();
await expect(page.getByText('Audio Guest PIN:')).toBeVisible();
//patient's details
await expect(page.getByRole('heading', { name: 'Patient Details' })).toBeVisible();
await expect(page.getByText('Number of patients:')).toBeVisible();
await expect(page.getByText('1', { exact: true })).toBeVisible();
//check Ppatient no is editable

await page.getByTestId('DetailsController.editNumPatients()').click();
await page.getByTestId('DetailsController.cancelEditNumPatients()').click();
//botton details
await expect(page.getByRole('heading', { name: 'Event Details' })).toBeVisible();
await expect(page.getByText('Appointment Requirements:')).toBeVisible();
await expect(page.getByText('Scheduled By:')).toBeVisible();
await expect(page.getByText('Last Edited By:')).toBeVisible();
await expect(page.getByText('Last Edited:')).toBeVisible();
await expect(page.getByText('Not provided')).toBeVisible();
await expect(page.getByText('Dr. Consultant Playwright').nth(4)).toBeVisible();
await page.getByText('cplaywright20240429').click();

//Cancel event 
const cancelledMsg= "      ×      Success - The event has been cancelled                     ";
const statusMessage = page.locator('#messageContainer');
   
    await page.locator('a').filter({ hasText: 'Cancel Event' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(statusMessage).toBeVisible()
    await page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
    await expect(statusMessage).toHaveText(cancelledMsg);
    await expect(statusMessage).toBeHidden() 
    
  //logout
  await page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await page.close();

  });
