import { test, expect } from '@playwright/test';
import { setReport, loadEnv, Day } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteClinicalGuestConnectPINLink");

const tooltipPartipants = "Your event can contain a combination of OTNhub room-based or personal (PCVC) systems, guests, and non-OTN systems.\n" +
"Guest via Email: Send an OTNinvite email to a patient or guest to attend from their own device.\n" +
"OTN System: Connect with an OTNhub personal (PCVC) or room-based system.\n" +
"Non-OTN System: Connect with a standards-based system by sending them a dialing alias via email.";

const tooltipPIN = 'click to modify PIN';
const locGuestNo=".participants-count";
const text2="to discuss";
const text1="titled";
const text3="patient";
const text4=" who ";
const locatorText5='//*[@id="detailContainer"]/div[2]/span[2]/span[2]';
const text5='is';
const locatorInLineText=".white.inline-text";
const locatorParticipant2 =".ng-scope:nth-child(2) > .participant-controls .btn-icon-remove";
const hostPIN='111111';
const guestPIN='222222';
const consultantSys=process.env.pcvcName1! ;
const fullConsultantSys=process.env.myFullPcvcName1! ;
const scheduleText1="Are you sure you want to schedule this event?";
const scheduleText2="The event will be sent to any participants invited by email.";
const scheduleText3="If you want to give the attendees additional notice about the event, a patient handout which includes the host's administrative contact is available in the event details. (The handout will not be sent to the patients automatically).";
const scheduleText4="View the patient handout in a new window";
const locatorTime='//*[@id="ng-app"]/div[16]/div/div/div[1]/table/tbody/tr[1]/td[2]';
const locatorConsultant="tr:nth-child(2) > .ng-binding:nth-child(2)";
const locatorConsultantSys="tr:nth-child(3) > .ng-binding:nth-child(2)";
const consultant=process.env.selfConsultant1!;
const consultantSystem=process.env.pcvcName1!;
const cancelledMsg= "      ×      Success - The event has been cancelled                     "
const name='Guest Webapp3';
const locatorDisconnect='#pex-dialog-disconnect-action > button';
let eventName='Scheduled with '+name+' via email'; 
test('OTNinviteClinicalGuestConnectLink', async ({ page }) => {
  test.setTimeout(100000);
  await page.goto('/',{waitUntil:'domcontentloaded'});
    await page.getByText('OTN Credentials').click();
    await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();
    //Navigate to videoconference
    await page.getByRole('link', { name: 'Videoconference' }).click();
  //Open Create Event modal
  await page.getByText('Create event').click();
  await expect(page.getByRole('heading',{name:'Connect'})).toHaveText('Connect');
  let tooltipName = await page.locator('.inline-tooltip').getAttribute("title");
  await page.locator('.inline-tooltip').hover();
  console.log(tooltipName);
  tooltipName===tooltipPartipants;
  //Check guest no
  let guestCount='0';
  let textGuestNo = "you have added "+guestCount+" / 60 systems";
  console.log(textGuestNo);
  await expect(page.locator(locGuestNo)).toHaveText(textGuestNo);
  //check specifics for clinical event
  await page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  await expect(page.locator(locatorInLineText)).toContainText(text1);
  await expect(page.locator(locatorInLineText)).toContainText(text2);
  await expect(page.locator(locatorInLineText)).toContainText(text3);
  await expect(page.locator(locatorInLineText)).toContainText(text4);
  await expect(page.locator(locatorText5)).toContainText(text5);
 //participating systems options  
 
  //specifics for OTNinvite
  await page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await expect(page.getByPlaceholder('Guest name')).toBeEditable();
  await expect(page.getByPlaceholder('Guest email')).toBeEditable();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).not.toBeVisible();
 //PHI Consent 
 await expect(page.getByLabel('Consent to include personal health information in an OTNinvite email')).not.toBeChecked();
  await page.getByLabel('Consent to include personal health information in an OTNinvite email').check();
  await page.getByRole('button', { name: 'Confirm' }).click();
  //fill in guest name and email
  await page.getByPlaceholder('Guest name').click();
  await page.getByPlaceholder('Guest name').fill(name);
  await page.getByPlaceholder('Guest email').click();
  await page.getByPlaceholder('Guest email').fill('mbadila@otn.ca');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).toBeVisible();
  await expect(page.getByPlaceholder('Enter a 6-digit host PIN...')).toBeVisible();
//add pcvc host system
await page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
await page.getByPlaceholder('Search for people or room systems').click();
await page.getByPlaceholder('Search for people or room systems').fill(consultantSys);
await page.getByRole('option', { name: fullConsultantSys }).locator('a').click(); //select system
await page.getByRole('dialog').getByRole('button').first().click(); //set as consultant

  // check guest no again
  guestCount='2';
  textGuestNo = "you have added "+guestCount+" / 60 systems";
  console.log(textGuestNo);
  await expect(page.locator(locGuestNo)).toHaveText(textGuestNo);
  //host PIN
  await page.locator('#hostPin').hover();
  tooltipName = await page.locator('#hostPin').getAttribute('popover');
  console.log(tooltipName);
  tooltipName===tooltipPIN;
  await page.locator('#hostPin').clear();
  await page.locator('#hostPin').click();
  await page.locator('#hostPin').fill(hostPIN);
  //guest PIN
  await expect(page.locator('#guestPin')).not.toBeVisible();
  await expect(page.getByText('Add a Guest PIN to increase privacy and security.')).not.toBeChecked();
  await page.getByText('Add a Guest PIN to increase privacy and security.').click();
  await expect(page.getByText('Add a Guest PIN to increase privacy and security.')).toBeChecked();
  await expect(page.getByPlaceholder('Enter a 6-digit guest PIN...')).toBeVisible();
  await page.getByPlaceholder('Enter a 6-digit guest PIN...').hover();
  tooltipName = await page.getByPlaceholder('Enter a 6-digit guest PIN...').getAttribute('popover');
  tooltipName===tooltipPIN;
  await page.getByPlaceholder('Enter a 6-digit guest PIN...').clear();
  await page.getByPlaceholder('Enter a 6-digit guest PIN...').click();
  await page.getByPlaceholder('Enter a 6-digit guest PIN...').fill(guestPIN);
  await expect(page.getByRole('button', { name: 'Call Now' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Schedule' })).toBeEnabled();
  //check guest no
  guestCount='2';
  textGuestNo = "you have added "+guestCount+" / 60 systems";
  console.log(textGuestNo);
  await expect(page.locator(locGuestNo)).toHaveText(textGuestNo);
  //schedule event
  await page.getByRole('button', { name: 'Schedule' }).click();

  let date=new Day();
  await page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await page.getByRole('textbox').nth(2).fill('22');
  await page.getByRole('textbox').nth(3).fill('0');
  await page.getByRole('textbox').nth(4).fill('22');
  await page.getByRole('textbox').nth(5).fill('15');
  await page.locator('#call-container-schedule').getByText('Schedule').click();
  await expect(page.getByRole('heading', { name: 'Schedule Event', exact: true })).toHaveText('Schedule Event');
  await expect(page.getByRole('cell', { name: 'Time:' })).toHaveText('Time:');
  await expect(page.getByRole('cell', { name: 'Consultant:' })).toHaveText('Consultant:');
  await expect(page.getByRole('cell', { name: 'Consultant system:' })).toHaveText('Consultant system:');
  await expect(page.getByRole('cell', { name: 'Participating System(s):' })).toHaveText('Participating System(s):');
  await expect(page.getByRole('cell', { name: 'Administrative contact:' })).toHaveText('Administrative contact:');
  await expect(page.getByText(scheduleText1)).toHaveText(scheduleText1);
  await expect(page.getByText(scheduleText2)).toHaveText(scheduleText2);
  await expect(page.getByText(scheduleText3)).toHaveText(scheduleText3);
  await expect(page.getByText(scheduleText4)).toHaveText(scheduleText4);
   
  let time=date.monthName+' '+date.day+', '+date.year+', '+'22:00 - 22:15';
   console.log(time);
  await expect(page.locator(locatorTime)).toHaveText(time);
  await expect(page.locator(locatorConsultant)).toHaveText(consultant);
  await expect(page.locator(locatorConsultantSys)).toHaveText(consultantSystem);
  await page.getByRole('button', { name: 'Schedule' }).click(); 
  //open the details page for event
  await page.getByText(eventName).first().click();
const page1Promise = page.waitForEvent('popup');
  await page.locator( '#evetURL > a').nth(1).click();
  const page1 = await page1Promise;

await page1.getByPlaceholder("e.g. 'David'").fill(name);
await page1.getByRole('button', { name: 'Next' }).click();
await page1.locator('[data-testid="button-join-meeting"]').click();
await page1.locator('[data-testid="input-pin"]').click();
await page1.locator('label').nth(1).click();
await page1.locator('[data-testid="input-pin"]').click();
await page1.locator('[data-testid="input-pin"]').fill(guestPIN);
await page1.locator('[data-testid="button-set-pin"]').click();
await page1.locator('[data-testid="button-meeting-audioinput"]').click();
await page1.locator('[data-testid="button-meeting-videoinput"]').click();
await page1.locator('[data-testid="button-meeting-videoinput-muted"]').click();
await page1.locator('[data-testid="button-meeting-audioinput-muted"]').click();
await page.waitForTimeout(10000);
await page1.locator('[data-testid="button-leave"]').click();
await page1.getByText('5 star').click();
await page1.getByTestId('sendRating();').click();
await page1.close();
//cancel event
 const statusMessage = page.locator('#messageContainer');
 await page.getByText(eventName).first().click();
 await page.locator('a').filter({ hasText: 'Cancel Event' }).click();
 await page.getByText('Are you sure you want to cancel this event?');
 //await page.getByText('Are you sure you want to cancel this event?');
 //await page.getByText('When you click "Yes" a cancellation message will be emailed to Monica at mtest@t').click();
 await page.getByRole('button', { name: 'Yes' }).click();
 await expect(statusMessage).toBeVisible()
 await page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
 await expect(statusMessage).toHaveText(cancelledMsg);
 await expect(statusMessage).toBeHidden() ;

//logout
   await page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
   await page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
   await page.close();
  });

