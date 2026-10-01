import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../../helper/functions';
import { Day } from '../../../../helper/functions';

loadEnv('video_staging');
setReport("eVisitReports","scheduleP2P2LegacysClinicalEvent");
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
const hostSysSearch=process.env.legSysName1!
const participantSysSearch=process.env.partialLegSysName2!
const hostSys=process.env.legSysName1!
const participantSys=process.env.legSysName2!
const errMsgTop='× Error - The date must be the current date or a future date with the format yyyy-MM-dd.';
const errMsgTop1= '× Error - The start time must be in the future.\n  - The end time must be later than the start time.' 
const errMsgTop2='× Error - The end time must be later than the start time.';
const locatorCloseMsg=".close.ng-scope";
const scheduleText1="Are you sure you want to schedule this event?";
const locatorTime='//*[@id="ng-app"]/div[16]/div/div/div[1]/table/tbody/tr[1]/td[2]';
const locatorConsultant="tr:nth-child(2) > .ng-binding:nth-child(2)";
const selfConsultant=process.env.selfConsultant1!
const consultant=process.env.pcvcName1!;
const partConsultant=process.env.partialPcvcName1!;
const locatorConsultantSys="tr:nth-child(3) > .ng-binding:nth-child(2)";
const consultantSystem=process.env.legSysName1!;
const locatorPartSys="tbody > .ng-scope > .ng-binding:nth-child(2)";
const partSys=process.env.legSysName2!;
const admin=process.env.admin1! ;

const regex=new RegExp('[0-9]{9}', 'm');

test('Schedule clinical event with 1 pcvc and 1 legacy', async ({page}) => {
  test.setTimeout(80000);
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

 
  //check specifics for clinical event
  await page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  
 //check participating systems options  
  await expect(page.getByText('Participating System(s)')).toHaveText('Participating System(s)');    
  await expect(page.locator('form[name="participantForm"]').getByRole('combobox')).toBeEnabled();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
  //specifics for OTN systems
  await page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await expect(page.getByPlaceholder('Search for people or room systems')).toBeEditable();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
 //choose 2 legacy systems
  await page.getByPlaceholder('Search for people or room systems').click();
  await page.getByPlaceholder('Search for people or room systems').fill(hostSysSearch);
  await page.getByRole('option', { name: hostSys }).locator('a').click();
  await page.getByPlaceholder('Search for people or room systems').click();
  await page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch);
  await page.getByRole('option', { name: participantSys }).locator('a').click();
  await page.getByTestId('ParticipantsController.toggleOtnSystemHost(system)').first().click();
  await page.getByPlaceholder('Search for consultant').click();
  await page.getByPlaceholder('Search for consultant').fill(partConsultant);
  await page.getByTestId('selectMatch($index)').locator('a').first().click();
  await page.waitForTimeout(1000);  
  await page.getByRole('button', { name: 'Schedule' }).click();
  //schedule event
  let date=new Day();
  await page.getByPlaceholder('YYYY-MM-DD').click();
  await page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('18');
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('0');
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('18');
  await page.getByRole('textbox').nth(5).click();
  await page.getByRole('textbox').nth(5).fill('10');
  await page.locator('#call-container-schedule').getByText('Schedule').click();
 //check schedule pop up
 await expect(page.getByRole('heading', { name: 'Schedule Event', exact: true })).toHaveText('Schedule Event');
  await expect(page.getByRole('cell', { name: 'Time:' })).toHaveText('Time:');
  await expect(page.getByRole('cell', { name: 'Consultant:' })).toHaveText('Consultant:');
  await expect(page.getByRole('cell', { name: 'Consultant system:' })).toHaveText('Consultant system:');
  await expect(page.getByRole('cell', { name: 'Participating System(s):' })).toHaveText('Participating System(s):');
  await expect(page.getByRole('cell', { name: 'Administrative contact:' })).toHaveText('Administrative contact:');
  await expect(page.getByText(scheduleText1)).toHaveText(scheduleText1);
  let time=date.monthName+' '+date.day+', '+date.year+', '+'18:00 - 18:10';
  await expect(page.locator(locatorTime)).toHaveText(time);
  await expect(page.locator(locatorConsultant)).toHaveText(selfConsultant);
  await expect(page.locator(locatorConsultantSys)).toHaveText(consultantSystem);
  await expect(page.locator(locatorPartSys)).toHaveText(partSys);
  await expect(page.getByText(admin)).toHaveText(admin);
 //Final schedule
 await page.getByRole('button', { name: 'Schedule' }).click();
//Check event's details on the page
await page.getByText('Scheduled between '+consultantSystem+' and '+ partSys).first().click();
let val = await page.getByText('Scheduled between '+consultantSystem+' and '+ partSys).first().textContent()
console.log('Text'+ val);
let eventid=val?.match(regex);
console.log ('Event ID:'+ eventid);
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
