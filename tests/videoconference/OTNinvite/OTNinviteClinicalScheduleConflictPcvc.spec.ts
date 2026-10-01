import { test, expect, Page } from '@playwright/test';
import { Day } from '../../../helper/functions';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteClinicalScheduleConflictPcvc");

test.describe('Check OTNinvite schedule conflict', () => { 
  const locatorConsultantSys="tr:nth-child(3) > .ng-binding:nth-child(2)";  
  const name='First Pcvc';
  const name1='Second Pcvc';
  const errMsgTop='× Error - The date must be the current date or a future date with the format yyyy-MM-dd.';
  const errMsgTop1= '× Error - The start time must be in the future.\n  - The end time must be later than the start time.' 
  const errMsgTop2='× Error - The end time must be later than the start time.';
  const locatorCloseMsg=".close.ng-scope";
  const scheduleText1="Are you sure you want to schedule this event?";
  const scheduleText2="The event will be sent to any participants invited by email.";
  const scheduleText3="If you want to give the attendees additional notice about the event, a patient handout which includes the host's administrative contact is available in the event details. (The handout will not be sent to the patients automatically).";
  const scheduleText4="View the patient handout in a new window";
  const locatorTime='//*[@id="ng-app"]/div[16]/div/div/div[1]/table/tbody/tr[1]/td[2]';
  const locatorConsultant="tr:nth-child(2) > .ng-binding:nth-child(2)";
  const consultant=process.env.selfConsultant1!;
  const consultant1=process.env.consultant1!;  
  const consultantSystem=process.env.pcvcName1!;
  const locatorPartSys="tbody > .ng-scope > .ng-binding:nth-child(2)";
  let partSys=name+" (mteste@test.ca)";
  const consultantSys=process.env.pcvcName1! ;
  const hostSys=process.env.TSMsystemName! ;
  const fullConsultantSys=process.env.myFullPcvcName1! ;
  const adminName=process.env.adminName!;
  //const locatorAdmin=".admin-contact";
  const admin=process.env.admin!;
  let errorMsgTop3= "×      Error - The system "+hostSys+" and consultant "+consultant1+" have a conflicting event at the selected time. Please pick another time or modify your participant system list. ";
  let scheduledEvent= "Scheduled with "+name+" via email";
  let scheduledEvent1="Scheduled with "+name1+" via email";
  test.setTimeout(80000);
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
  test('Schedule first OTNinvite  clinical', async () => {
  //Open Create Event modal
  await cur_page.getByText('Create event').click();
  //add pcvc host system
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(consultantSys);
  await cur_page.getByRole('option', { name: fullConsultantSys }).locator('a').click(); //select system
  await cur_page.getByRole('dialog').getByRole('button').first().click(); //set as consultant
  //add guest
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill(name);
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill('mteste@test.ca');
  await cur_page.getByRole('button', { name: 'Add' }).click();
 //schedule modal
  await cur_page.getByRole('button', { name: 'Schedule' }).click();

  let date=new Day(1);
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.getByRole('textbox').nth(2).fill('1');
  await cur_page.getByRole('textbox').nth(3).fill('0');
  await cur_page.getByRole('textbox').nth(4).fill('1');
  await cur_page.getByRole('textbox').nth(5).fill('15');
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
  let time=date.monthName+' '+date.day+', '+date.year+', '+'01:00 - 01:15';
   console.log(time);
  await expect(cur_page.locator(locatorTime)).toHaveText(time);
  await expect(cur_page.locator(locatorConsultant)).toHaveText(consultant);
  await expect(cur_page.locator(locatorConsultantSys)).toHaveText(consultantSystem);

 // await expect(cur_page.locator(locatorPartSys)).toHaveText(partSys);
 await expect(cur_page.getByText(admin)).toHaveText(admin);
 await cur_page.getByText('Update').click();
 await cur_page.locator('input[name="name"]').fill(adminName);
 await cur_page.getByRole('button', { name: 'Save' }).click();
 await cur_page.getByRole('button', { name: 'Schedule' }).click(); 

})

test('Schedule 2nd OTNinvite clinical in conflict ', async () => {
  
  //Open Create Event modal
  await cur_page.getByText('Create event').click();
  //add pcvc host system
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(consultantSys);
  await cur_page.getByRole('option', { name: fullConsultantSys }).locator('a').click(); //select system
  await cur_page.getByRole('dialog').getByRole('button').first().click(); //set as cosnsultant
  //add guest
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill(name1);
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill('mbadila@otn.ca');
  await cur_page.getByRole('button', { name: 'Add' }).click();
 //schedule modal
  await cur_page.getByRole('button', { name: 'Schedule' }).click();

  let date=new Day(1);
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.getByRole('textbox').nth(2).fill('1');
  await cur_page.getByRole('textbox').nth(3).fill('0');
  await cur_page.getByRole('textbox').nth(4).fill('1');
  await cur_page.getByRole('textbox').nth(5).fill('15');
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
   
  let time=date.monthName+' '+date.day+', '+date.year+', '+'01:00 - 01:15';
   console.log(time);
  await expect(cur_page.locator(locatorTime)).toHaveText(time);
  await expect(cur_page.locator(locatorConsultant)).toHaveText(consultant);
  await expect(cur_page.locator(locatorConsultantSys)).toHaveText(consultantSystem);
  //await expect(cur_page.locator(locatorPartSys)).toHaveText(partSys);
  await expect(cur_page.getByText(admin)).toHaveText(admin);
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
 await expect(cur_page.getByText(errorMsgTop3)).toBeVisible ;
 await cur_page.locator(locatorCloseMsg).nth(0).click();
 console.log(errorMsgTop3);
 await cur_page.getByText('Back', { exact: true }).click();
 await cur_page.getByText('Opt out of PCVC time conflicts').click();
 await cur_page.getByRole('button', { name: 'Schedule' }).click();
 await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
 await cur_page.getByRole('textbox').nth(2).fill('1');
 await cur_page.getByRole('textbox').nth(3).fill('0');
 await cur_page.getByRole('textbox').nth(4).fill('1');
 await cur_page.getByRole('textbox').nth(5).fill('15');
 await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
 await cur_page.getByRole('button', { name: 'Schedule' }).click();

});
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
  //Cancel event 
test('Cancel second event', async () => {
  const statusMessage = cur_page.locator('#messageContainer');
  const cancelledMsg= "      ×      Success - The event has been cancelled                     ";
  await cur_page.getByText(scheduledEvent1).first().click();   
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