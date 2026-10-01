import { test, expect, Page } from '@playwright/test';
import { Day } from '../../../helper/functions';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteClinicalScheduleConflictLegacy");

test.describe('Check OTNinvite with legacy host schedule conflict', () => { 
  const hostLegacySys=process.env.legSysName2!;
  const hostLegacySysFull=process.env.fullLegSysName2!;
  const errConsultant='Select a consultant';
  const errConsultantTop='× Error - Please select a consultant  - All mandatory fields must be completed';
  const errMsgTop='× Error - The date must be the current date or a future date with the format yyyy-MM-dd.';
  const errMsgTop1= '× Error - The start time must be in the future.\n  - The end time must be later than the start time.' 
  const errMsgTop2='× Error - The end time must be later than the start time.';
  const locatorCloseMsg=".close.ng-scope";
  const locatorMsg="#messageContainer";
  const scheduleText1="Are you sure you want to schedule this event?";
  const scheduleText2="The event will be sent to any participants invited by email.";
  const scheduleText3="If you want to give the attendees additional notice about the event, a patient handout which includes the host's administrative contact is available in the event details. (The handout will not be sent to the patients automatically).";
  const scheduleText4="View the patient handout in a new window";
  const locatorTime='//*[@id="ng-app"]/div[16]/div/div/div[1]/table/tbody/tr[1]/td[2]';
  const locatorConsultant="tr:nth-child(2) > .ng-binding:nth-child(2)";
  const user=process.env.user!;
  const consultant=process.env.selfConsultant1!;
  const consultant1=process.env.consultant1!;
  const locatorConsultantSys="tr:nth-child(3) > .ng-binding:nth-child(2)";
  const consultantSystem=process.env.legSysName2!;
  const locatorPartSys="tbody > .ng-scope > .ng-binding:nth-child(2)";
  const partSys=process.env.legSysName2!;
  //const locatorAdmin=".admin-contact";
  const admin=process.env.admin!
  const admin1=process.env.admin1!
  let errorMsgTop3= "×      Error - The system "+hostLegacySys+" and consultant "+ consultant1 +" have a conflicting event at the selected time. Please pick another time or modify your participant system list. ";
  let errorMsgTop4="× Error - The system "+hostLegacySys+" has a conflicting event at the selected time. Please pick another time or modify your participant system list."
  let scheduledEvent="Scheduled between "+hostLegacySys+" and Monica via email"
  test.setTimeout(100000);
  let cur_page: Page; 
  test.beforeAll(async ({ page }) => { cur_page = page });

test('login', async ({ page }) => {

  await cur_page.goto('/',{waitUntil:'domcontentloaded'});
  await cur_page.getByText('OTN Credentials').click();
  await cur_page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await cur_page.getByPlaceholder('Password').click();
  await cur_page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await cur_page.getByRole('button', { name: 'Sign In' }).click();
  //Navigate to videoconference
  await cur_page.getByRole('link', { name: 'Videoconference' }).click();
  
  })
  test('Schedule first OTNinvite  clinical with legacy', async () => {
  //Open Create Event modal
  await cur_page.getByText('Create event').click();
  //add legacy host system
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(hostLegacySys);
  await cur_page.getByRole('option', { name: hostLegacySysFull}).locator('a').click(); //select system
  await cur_page.getByTestId('ParticipantsController.toggleOtnSystemHost(system)').click();
  await cur_page.getByRole('dialog').getByRole('button').first().click(); //set as cosnsultant
  //cosultant field and label appear
  await expect(cur_page.getByText('Consultant', { exact: true })).toHaveText('Consultant'); //consultant label
  await expect(cur_page.getByPlaceholder('Search for consultant')).toBeVisible();
  //add guest
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill('Monica');
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill('mteste@test.ca');
  await cur_page.getByRole('button', { name: 'Add' }).click();
 // try to schedule modal 
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
// consultant missing error
  await expect(cur_page.getByText(errConsultant,{exact:true})).toBeVisible();
  await expect(cur_page.getByText(errConsultantTop).locator('visible=true')).toContainText(errConsultantTop);
  await cur_page.locator(locatorCloseMsg).nth(0).click();
// fill in the consultant
  await cur_page.getByPlaceholder('Search for consultant').click();
  await cur_page.getByPlaceholder('Search for consultant').fill(consultant);
  await cur_page.getByRole('option', { name: consultant }).locator('a').click();
  //advance with schedule modal
  await cur_page.getByTestId('doSchedule()').click();
  
  let date=new Day(1);
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.getByRole('textbox').nth(2).fill('1');
  await cur_page.getByRole('textbox').nth(3).fill('15');
  await cur_page.getByRole('textbox').nth(4).fill('1');
  await cur_page.getByRole('textbox').nth(5).fill('30');
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  await expect(cur_page.getByRole('heading', { name: 'Schedule Event', exact: true })).toHaveText('Schedule Event');
  await expect(cur_page.getByRole('cell', { name: 'Time:' })).toHaveText('Time:');
  await expect(cur_page.getByRole('cell', { name: 'Consultant:' })).toHaveText('Consultant:');
  await expect(cur_page.getByRole('cell', { name: 'Consultant system:' })).toHaveText('Consultant system:');
  await expect(cur_page.getByRole('cell', { name: 'Participating System(s):' })).toHaveText('Participating System(s):');
  await expect(cur_page.getByRole('cell', { name: 'Administrative contact:' })).toHaveText('Administrative contact:');
  await expect(cur_page.getByText(scheduleText1)).toHaveText(scheduleText1);
  await expect(cur_page.getByText(scheduleText2)).toHaveText(scheduleText2);
  await expect(cur_page.getByText(scheduleText3)).toHaveText(scheduleText3);
  await expect(cur_page.getByText(scheduleText4)).toHaveText(scheduleText4);
  let time=date.monthName+' '+date.day+', '+date.year+', '+'01:15 - 01:30';
  await expect(cur_page.locator(locatorTime)).toHaveText(time);
  await expect(cur_page.locator(locatorConsultant)).toHaveText(consultant);
  await expect(cur_page.locator(locatorConsultantSys)).toHaveText(consultantSystem);
 // await expect(cur_page.locator(locatorPartSys)).toHaveText(partSys);
 await expect(cur_page.getByText(admin)).toHaveText(admin);
 await cur_page.getByText('Update').click();
 await cur_page.locator('input[name="name"]').fill(process.env.adminName!);
 await cur_page.getByRole('button', { name: 'Save' }).click();
 await cur_page.getByRole('button', { name: 'Schedule' }).click(); 
// check if event has been scheduled
await cur_page.getByText(scheduledEvent).click();
 
})

test('Schedule 2sd OTNinvite clinical in conflict ', async () => {
  
   //Open Create Event modal
  await cur_page.getByText('Create event').click();
  //legacy system is already added as a host because Jane Miller is delegate  User should be delegate of the legacy system in this test.
  //await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  //await cur_page.getByPlaceholder('Search for people or room systems').click();
  //await cur_page.getByPlaceholder('Search for people or room systems').fill(hostLegacySys);
  //await cur_page.getByRole('option', { name: hostLegacySysFull}).locator('a').click(); //select system
  //await cur_page.getByTestId('ParticipantsController.toggleOtnSystemHost(system)').click();
 
 
  //consultant field and label appear
  await expect(cur_page.getByText('Consultant', { exact: true })).toHaveText('Consultant'); //consultant label
  await expect(cur_page.getByPlaceholder('Search for consultant')).toBeVisible();
  //add guest
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill('Monica');
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill('mteste@test.ca');
  await cur_page.getByRole('button', { name: 'Add' }).click();
 
// fill in the consultant
  await cur_page.getByPlaceholder('Search for consultant').click();
  await cur_page.getByPlaceholder('Search for consultant').fill(consultant);
  await cur_page.getByRole('option', { name: consultant }).locator('a').click()
  //advance with schedule modal
  await cur_page.getByTestId('doSchedule()').click();

  let date=new Day(1);
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.getByRole('textbox').nth(2).fill('1');
  await cur_page.getByRole('textbox').nth(3).fill('25');
  await cur_page.getByRole('textbox').nth(4).fill('1');
  await cur_page.getByRole('textbox').nth(5).fill('35');
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  await expect(cur_page.getByRole('heading', { name: 'Schedule Event', exact: true })).toHaveText('Schedule Event');
  await expect(cur_page.getByRole('cell', { name: 'Time:' })).toHaveText('Time:');
  await expect(cur_page.getByRole('cell', { name: 'Consultant:' })).toHaveText('Consultant:');
  await expect(cur_page.getByRole('cell', { name: 'Consultant system:' })).toHaveText('Consultant system:');
  await expect(cur_page.getByRole('cell', { name: 'Participating System(s):' })).toHaveText('Participating System(s):');
  await expect(cur_page.getByRole('cell', { name: 'Administrative contact:' })).toHaveText('Administrative contact:');
  await expect(cur_page.getByText(scheduleText1)).toHaveText(scheduleText1);
  await expect(cur_page.getByText(scheduleText2)).toHaveText(scheduleText2);
  await expect(cur_page.getByText(scheduleText3)).toHaveText(scheduleText3);
  await expect(cur_page.getByText(scheduleText4)).toHaveText(scheduleText4);
   
  let time=date.monthName+' '+date.day+', '+date.year+', '+'01:25 - 01:35';
   console.log(time);
  await expect(cur_page.locator(locatorTime)).toHaveText(time);
  await expect(cur_page.locator(locatorConsultant)).toHaveText(consultant);
  await expect(cur_page.locator(locatorConsultantSys)).toHaveText(consultantSystem);
  //await expect(cur_page.locator(locatorPartSys)).toHaveText(partSys);
  await expect(cur_page.getByRole('cell', {name:admin})).toHaveText(admin1);
  await cur_page.getByRole('button', { name: 'Schedule' }).click();

 await expect(cur_page.getByText(errorMsgTop3)).toBeVisible;
 await cur_page.locator(locatorCloseMsg).nth(0).click();
 await cur_page.getByText('Back', { exact: true }).click();
 await cur_page.getByText('Opt out of PCVC time conflicts').click();
 await cur_page.getByRole('button', { name: 'Schedule' }).click();
 await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
 await cur_page.getByRole('textbox').nth(2).fill('1');
 await cur_page.getByRole('textbox').nth(3).fill('0');
 await cur_page.getByRole('textbox').nth(4).fill('1');
 await cur_page.getByRole('textbox').nth(5).fill('30');
 await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
 await cur_page.getByRole('button', { name: 'Schedule' }).click();
 await expect(cur_page.getByText(errorMsgTop3)).toBeVisible;
 await cur_page.locator(locatorCloseMsg).nth(0).click();
 await cur_page.getByTestId('cancel()').click();
 await cur_page.locator('#delegatorSelect').selectOption(user);

});

//Cancel event 
test('Cancel event', async () => {
  const statusMessage = cur_page.locator('#messageContainer');
  const cancelledMsg= "      ×      Success - The event has been cancelled                     ";
  await cur_page.reload();
  await cur_page.getByText(scheduledEvent).first().click();   
  await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
  await cur_page.getByRole('button', { name: 'Yes' }).click();
  await expect(statusMessage).toBeVisible()
  await cur_page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
  await expect(statusMessage).toHaveText(cancelledMsg);
  await expect(statusMessage).toBeHidden() 
  
    })
   // Test logout
test('logout', async () => {
  await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await cur_page.close();
})

})