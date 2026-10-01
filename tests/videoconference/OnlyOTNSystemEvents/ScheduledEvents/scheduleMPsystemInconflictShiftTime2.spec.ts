import { test, expect, Page } from '@playwright/test';
import { setReport, loadEnv, Time } from '../../../../helper/functions';
import { Day } from '../../../../helper/functions';
//Try to create MP clinical event in conflict with a non-clinical event with start time after the 1st event's start time and end time after 1st event's edn time.
loadEnv('video_staging');
test.setTimeout(120000);
test.setTimeout(120000);
setReport("eVisitReports","ScheduleMPsystemInconflict");
//regular expression for eventID
const regex=new RegExp('[0-9]{9}', 'm');

//data for all tests
let date=new Day(2); 
let startTime=new Time(3);
let endTime=new Time(10);
const tooltipPartipants = "Your event can contain a combination of OTNhub room-based or personal (PCVC) systems, guests, and non-OTN systems.\n" +
"Guest via Email: Send an OTNinvite email to a patient or guest to attend from their own device.\n" +
"OTN System: Connect with an OTNhub personal (PCVC) or room-based system.\n" +
"Non-OTN System: Connect with a standards-based system by sending them a dialing alias via email."; 
const conflictMsg='× Error - The systems '+ process.env.TSMsystemName!+', '+ process.env.partialLegSystemName1!+', '+process.env.legSysName2!;
const tooltipCreate = "Schedule or connect any combination of Guest (via OTNinvite), OTN member, Room-based system, or non-OTN system.";
const tooltipBook = "Request a virtual care appointment at a PAN site for your patient. Request nursing support or use of peripheral devices.";
const locGuestNo=".participants-count";
const locatorinvDisclaimer=".invite-disclaimer";
const invDisclaimer="OTNinvite is applicable in select situations. For more info click here."
const locatorelDisclaimer=".eligibility-disclaimer";
const elDisclaimer="Please take a moment to consider Patient Eligibility.";
const locatorInLineText=".white.inline-text";
const inLineTextLearning="titled Learning event"
const hostSysSearch=process.env.partialPcvcName1!
const participantSysSearch1=process.env.legSysName1!
const participantSysSearch2=process.env.legSysName2!
const hostSys=process.env.myFullPcvcName1!
const participantSys1=process.env.legSysName1!
const participantSys2=process.env.legSysName2!
const locatorCloseMsg=".close.ng-scope";
const scheduleText1="Are you sure you want to schedule this event?";
const locatorTime='//*[@id="ng-app"]/div[16]/div/div/div[1]/table/tbody/tr[1]/td[2]';
const locatorConsultant="tr:nth-child(2) > .ng-binding:nth-child(2)";
const consultant=process.env.selfConsultant1!;
const locatorConsultantSys="tr:nth-child(3) > .ng-binding:nth-child(2)";
const consultantSystem=process.env.pcvcName1!;
const locatorPartSys="tbody > .ng-scope > .ng-binding:nth-child(2)";
const partSys1=process.env.legSysName1!;
const partSys2=process.env.legSysName2!;
const admin=process.env.admin!;
const learningTitle='Learning event for conflict'+startTime.hours;
const clinicalTitle='Clinical event for conflict'+startTime.hours;

test.describe('Schedule MP systems in conflict Shift time 2nd', async () => {
  //2nd event start after 1st and ends after 1st
let cur_page: Page; 
test.beforeAll(async ({ page }) => {
  cur_page = page 
})
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
test('Create Learning Event PCVC host and 2 legacy', async () => {
  //Check Create event tooltip
  await cur_page.getByText('Create event').hover();
  let tooltipName = await cur_page.getByText('Create event').getAttribute('popover');
  console.log(tooltipName);
  tooltipName===tooltipCreate;
  //
  //Open Create Event modal
  await cur_page.getByText('Create event').click();
  await expect(cur_page.getByRole('heading',{name:'Connect'})).toHaveText('Connect');
  //check tooltip
  tooltipName = await cur_page.locator('.inline-tooltip').getAttribute("title")
  await cur_page.locator('.inline-tooltip').hover();
  console.log(tooltipName);
  tooltipName===tooltipPartipants;
  //Check content
  //Check guest no
  let guestCount='0';
  let textGuestNo = "you have added "+guestCount+" / 60 systems";
  await expect(cur_page.locator(locGuestNo)).toHaveText(textGuestNo);
  //check defaults
  await expect(cur_page.locator(locatorinvDisclaimer)).toHaveText(invDisclaimer);
  await expect(cur_page.locator(locatorelDisclaimer)).toHaveText(elDisclaimer);
  await expect(cur_page.getByRole('button', { name: 'Call Now' })).toBeDisabled();
  await expect(cur_page.getByRole('button', { name: 'Schedule' })).toBeDisabled();
  await expect(cur_page.getByText('Opt out of PCVC time conflicts')).toHaveText('Opt out of PCVC time conflicts');
  await expect(cur_page.getByLabel('Opt out of PCVC time conflicts')).not.toBeChecked();
  await expect(cur_page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();

 
  //check specifics for leaning  event
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Learning event');
  await expect(cur_page.locator(locatorInLineText)).toContainText(inLineTextLearning);
  // change the title
  
  await cur_page.getByTestId('inline.edit()').click();
  await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(learningTitle);
 //check participating systems options  
  await expect(cur_page.getByText('Participating System(s)')).toHaveText('Participating System(s)');    
  await expect(cur_page.locator('form[name="participantForm"]').getByRole('combobox')).toBeEnabled();
  await expect(cur_page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
  //specifics for OTN systems
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await expect(cur_page.getByPlaceholder('Search for people or room systems')).toBeEditable();
  await expect(cur_page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
 //choose 2 pcvc systems
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(hostSysSearch);
  await cur_page.getByRole('option', { name: hostSys }).locator('a').click();
  await cur_page.getByRole('dialog').getByRole('button').first().click();
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch1);
  await cur_page.getByRole('option', { name: participantSys1 }).locator('a').click();
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch2);
  await cur_page.getByRole('option', { name: participantSys2 }).locator('a').click();
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
  //schedule event

  await cur_page.getByPlaceholder('YYYY-MM-DD').click();
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.getByRole('textbox').nth(2).click();
  await cur_page.getByRole('textbox').nth(2).fill(startTime.hours);
  await cur_page.getByRole('textbox').nth(3).click();
  await cur_page.getByRole('textbox').nth(3).fill(startTime.minutes);
  await cur_page.getByRole('textbox').nth(4).click();
  await cur_page.getByRole('textbox').nth(4).fill(endTime.hours);
  await cur_page.getByRole('textbox').nth(5).click();
  await cur_page.getByRole('textbox').nth(5).fill(endTime.minutes);
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();

 //check schedule pop up
 await expect(cur_page.getByRole('heading', { name: 'Schedule Event', exact: true })).toHaveText('Schedule Event');
  await expect(cur_page.getByRole('cell', { name: 'Time:' })).toHaveText('Time:');
  await expect(cur_page.getByRole('cell', { name: 'Speaker:' })).toHaveText('Speaker:');
  await expect(cur_page.getByRole('cell', { name: 'Host system:' })).toHaveText('Host system:');
  await expect(cur_page.getByRole('cell', { name: 'Participating System(s):' })).toHaveText('Participating System(s):');
  await expect(cur_page.getByRole('cell', { name: 'Administrative contact:' })).toHaveText('Administrative contact:');
  await expect(cur_page.getByText(scheduleText1)).toHaveText(scheduleText1);
  let time=date.monthName+' '+date.day+', '+date.year+', '+startTime.hours+':' +startTime.minutes +' - '+ endTime.hours+':'+endTime.minutes;
  await expect(cur_page.locator(locatorTime)).toHaveText(time);
  await expect(cur_page.locator(locatorConsultant)).toHaveText(consultant);
  await expect(cur_page.locator(locatorConsultantSys)).toHaveText(consultantSystem);
  await expect(cur_page.getByRole('cell', { name: partSys1 })).toHaveText(partSys1);
  await expect(cur_page.getByRole('cell', { name: partSys2 })).toHaveText(partSys2);
  await expect(cur_page.getByText(admin)).toHaveText(admin);
 //Final schedule
 await cur_page.getByRole('button', { name: 'Schedule' }).click();
//Check event's details on the page
await cur_page.getByText('Scheduled with multiple participants').first().click();
let val = await cur_page.getByText('Scheduled with multiple participants').first().textContent()
let eventid=val?.match(regex);
let eventid1=String(eventid);
console.log ('Event ID:'+ eventid);
})
test('Create Clinical Event PCVC host and 2 legacy', async () => {
//create MP clinical event in conflict with the first event; event cannot be scheduled

//Open Create Event modal
await cur_page.getByText('Create event').click();
await expect(cur_page.getByText('Connect',{exact:true})).toHaveText('Connect');
//check specifics for clinical event
await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
// change the title
await cur_page.locator('#detailContainer').getByText('Clinical event').click();
await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(clinicalTitle);
//check participating systems options  
await expect(cur_page.getByText('Participating System(s)')).toHaveText('Participating System(s)');    
await expect(cur_page.locator('form[name="participantForm"]').getByRole('combobox')).toBeEnabled();
await expect(cur_page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
//specifics for OTN systems
await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
await expect(cur_page.getByPlaceholder('Search for people or room systems')).toBeEditable();
await expect(cur_page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
//choose 2 pcvc systems
await cur_page.getByPlaceholder('Search for people or room systems').click();
await cur_page.getByPlaceholder('Search for people or room systems').fill(hostSysSearch);
await cur_page.getByRole('option', { name: hostSys }).locator('a').click();
await cur_page.getByRole('dialog').getByRole('button').first().click();
await cur_page.getByPlaceholder('Search for people or room systems').click();
await cur_page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch1);
await cur_page.getByRole('option', { name: participantSys1 }).locator('a').click();
await cur_page.getByPlaceholder('Search for people or room systems').click();
await cur_page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch2);
await cur_page.getByRole('option', { name: participantSys2 }).locator('a').click();
await cur_page.getByRole('button', { name: 'Schedule' }).click();
//schedule 2nd event
await cur_page.getByPlaceholder('YYYY-MM-DD').click();
await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
startTime=new Time(5);
endTime=new Time(12);
await cur_page.getByRole('textbox').nth(2).click();
await cur_page.getByRole('textbox').nth(2).fill(startTime.hours);
await cur_page.getByRole('textbox').nth(3).click();
await cur_page.getByRole('textbox').nth(3).fill(startTime.minutes);
await cur_page.getByRole('textbox').nth(4).click();
await cur_page.getByRole('textbox').nth(4).fill(endTime.hours);
await cur_page.getByRole('textbox').nth(5).click();
await cur_page.getByRole('textbox').nth(5).fill(endTime.minutes);
await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
await cur_page.getByRole('button', { name: 'Schedule' }).click();
await expect(cur_page.getByText(conflictMsg).locator('visible=true')).toContainText(conflictMsg);
 await cur_page.locator(locatorCloseMsg).nth(0).click();
 //close modal on main page
 await cur_page.getByText('x', { exact: true }).click();
 
})

test('Cancel  events', async () => {

//Cancel events
const cancelledMsg= "      ×      Success - The event has been cancelled                     ";
const statusMessage = cur_page.locator('#messageContainer');
   //cancel the 1st event
   console.log(learningTitle);
    await cur_page.getByText('Scheduled with multiple participants').click();
    await cur_page.waitForTimeout(1000);
    await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
    await cur_page.getByRole('button', { name: 'Yes' }).click();
    await expect(statusMessage).toBeVisible()
    await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
    await expect(statusMessage).toHaveText(cancelledMsg);
    await expect(statusMessage).toBeHidden() 
    await cur_page.waitForTimeout(3000);
    /*
   // cancell 2nd event -necessary only when bug present
   console.log(clinicalTitle);
    await cur_page.getByText(clinicalTitle).click();
    await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
    await cur_page.getByRole('button', { name: 'Yes' }).click();
    await expect(statusMessage).toBeVisible()
    await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
    await expect(statusMessage).toHaveText(cancelledMsg);
    await expect(statusMessage).toBeHidden() 
    await cur_page.waitForTimeout(3000); 
    */
})
test('logout', async () => {
  //logout
  await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await cur_page.close();
})
});
