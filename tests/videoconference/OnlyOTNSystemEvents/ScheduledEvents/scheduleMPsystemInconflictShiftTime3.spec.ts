import { test, expect } from '@playwright/test';
import { setReport, loadEnv, Time } from '../../../../helper/functions';
import { Day } from '../../../../helper/functions';
//Try to create MP clinical event in conflict with a non-clinical event same time interval
loadEnv('video_staging');
setReport("eVisitReports","ScheduleMPsystemInconflict");
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
const partSys2=process.env.legSysName2!


//const locatorAdmin=".admin-contact";
const admin=process.env.admin! ;
//regular expression for eventID
const regex=new RegExp('[0-9]{9}', 'm');

test('Schedule MP systems in conflict Shift time 2nd', async ({page}) => {
  //2nd event start after 1st and ends before 1st
  test.setTimeout(120000);
  await page.goto('/',{waitUntil:'domcontentloaded'});
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

 
  //check specifics for leaning  event
  await page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Learning event');
  await expect(page.locator(locatorInLineText)).toContainText(inLineTextLearning);
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
  await page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch1);
  await page.getByRole('option', { name: participantSys1 }).locator('a').click();
  await page.getByPlaceholder('Search for people or room systems').click();
  await page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch2);
  await page.getByRole('option', { name: participantSys2 }).locator('a').click();
  await page.getByRole('button', { name: 'Schedule' }).click();
  //schedule event
  let date=new Day(3);
  let startTime=new Time(3);
  let endTime=new Time(12);
  await page.getByPlaceholder('YYYY-MM-DD').click();
  await page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill(startTime.hours);
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill(startTime.minutes);
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill(endTime.hours);
  await page.getByRole('textbox').nth(5).click();
  await page.getByRole('textbox').nth(5).fill(endTime.minutes);
  await page.locator('#call-container-schedule').getByText('Schedule').click();

 //check schedule pop up
 await expect(page.getByRole('heading', { name: 'Schedule Event', exact: true })).toHaveText('Schedule Event');
  await expect(page.getByRole('cell', { name: 'Time:' })).toHaveText('Time:');
  await expect(page.getByRole('cell', { name: 'Speaker:' })).toHaveText('Speaker:');
  await expect(page.getByRole('cell', { name: 'Host system:' })).toHaveText('Host system:');
  await expect(page.getByRole('cell', { name: 'Participating System(s):' })).toHaveText('Participating System(s):');
  await expect(page.getByRole('cell', { name: 'Administrative contact:' })).toHaveText('Administrative contact:');
  await expect(page.getByText(scheduleText1)).toHaveText(scheduleText1);
  let time=date.monthName+' '+date.day+', '+date.year+', '+startTime.hours+':' +startTime.minutes +' - '+ endTime.hours+':'+endTime.minutes;
  await expect(page.locator(locatorTime)).toHaveText(time);
  await expect(page.locator(locatorConsultant)).toHaveText(consultant);
  await expect(page.locator(locatorConsultantSys)).toHaveText(consultantSystem);
  await expect(page.getByRole('cell', { name: partSys1 })).toHaveText(partSys1);
  await expect(page.getByRole('cell', { name: partSys2 })).toHaveText(partSys2);
  await expect(page.getByText(admin)).toHaveText(admin);
 //Final schedule
 await page.getByRole('button', { name: 'Schedule' }).click();
//Check event's details on the page
await page.getByText('Scheduled with multiple participants').first().click();
let val = await page.getByText('Scheduled with multiple participants').first().textContent()
let eventid=val?.match(regex);
let eventid1=String(eventid);
console.log ('Event ID:'+ eventid);
//create MP clinical event in conflict with the first event; event cannot be scheduled
//refresh to go back to calendar

//Open Create Event modal
await page.getByText('Create event').click();
await expect(page.getByText('Connect',{exact:true})).toHaveText('Connect');
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
await page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch1);
await page.getByRole('option', { name: participantSys1 }).locator('a').click();
await page.getByPlaceholder('Search for people or room systems').click();
await page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch2);
await page.getByRole('option', { name: participantSys2 }).locator('a').click();
await page.getByRole('button', { name: 'Schedule' }).click();
//schedule 2nd event
await page.getByPlaceholder('YYYY-MM-DD').click();
await page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
startTime=new Time(5);
endTime=new Time(8);
await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill(startTime.hours);
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill(startTime.minutes);
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill(endTime.hours);
  await page.getByRole('textbox').nth(5).click();
  await page.getByRole('textbox').nth(5).fill(endTime.minutes);
await page.locator('#call-container-schedule').getByText('Schedule').click();
await page.getByRole('button', { name: 'Schedule' }).click();
await expect(page.getByText(conflictMsg).locator('visible=true')).toContainText(conflictMsg);
 await page.locator(locatorCloseMsg).nth(0).click();
 //close modal on main page
 await page.getByText('x', { exact: true }).click();
 await page.getByText('Scheduled with multiple participants Event ID: '+eventid1).click();
//

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
