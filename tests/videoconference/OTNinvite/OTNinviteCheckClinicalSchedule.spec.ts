import { test, expect, Page } from '@playwright/test';
import {Day} from '../../../helper/functions';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteCheckClinicalSchedule");

test.describe('Check OTNinvite schedule modal', () => { 
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
  const locatorConsultantSys="tr:nth-child(3) > .ng-binding:nth-child(2)";
  const consultantSystem=process.env.pcvcName1!;
  const locatorPartSys="tbody > .ng-scope > .ng-binding:nth-child(2)";
  const partSys="Monica (mteste@test.ca)";
  //const locatorAdmin=".admin-contact";
  const admin=process.env.admin! ;
  const locatorCancel='//*[@id="ng-app"]/div[16]/div/div/div[2]/button[2]';

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
  test('Check OTNinivte schedule modal for clinical', async () => {
  //Open Create Event modal
  await cur_page.getByText('Create event').click();
  //add pcvc host system
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await cur_page.getByPlaceholder('Search for people or room systems').click();
  await cur_page.getByPlaceholder('Search for people or room systems').fill(process.env.partialPcvcName1!);
  await cur_page.getByRole('option', { name: process.env.myFullPcvcName1! }).locator('a').click(); //select system
  await cur_page.getByRole('dialog').getByRole('button').first().click(); //set as cosnsultant
  //add guest
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Clinical event');
  await cur_page.getByPlaceholder('Guest name').click();
  await cur_page.getByPlaceholder('Guest name').fill('Monica');
  await cur_page.getByPlaceholder('Guest email').click();
  await cur_page.getByPlaceholder('Guest email').fill('mteste@test.ca');
  await cur_page.getByRole('button', { name: 'Add' }).click();
 //schedule modal
  let date = new Day(-1)
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  expect(cur_page.getByText(errMsgTop)).toBeVisible;
  await cur_page.locator(locatorCloseMsg).nth(0).click();

  
  date=new Day();
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.getByRole('textbox').nth(2).fill('0');
  await cur_page.getByRole('textbox').nth(3).fill('0');
  await cur_page.getByRole('textbox').nth(4).fill('0');
  await cur_page.getByRole('textbox').nth(5).fill('0');
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  expect(cur_page.getByText(errMsgTop1)).toBeVisible;
  await cur_page.locator(locatorCloseMsg).nth(0).click();
  date=new Day(1);
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  expect(cur_page.getByText(errMsgTop2)).toBeVisible;
  await cur_page.locator(locatorCloseMsg).nth(0).click();
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
   
  let time=date.monthName+' '+date.day+', '+date.year+', '+'00:00 - 00:15';
   console.log(time);
  await expect(cur_page.locator(locatorTime)).toHaveText(time);

  await expect(cur_page.locator(locatorConsultant)).toHaveText(consultant);
  await expect(cur_page.locator(locatorConsultantSys)).toHaveText(consultantSystem);
 // await expect(cur_page.locator(locatorPartSys)).toHaveText(partSys);
 await expect(cur_page.getByText(admin)).toHaveText(admin);
 await cur_page.getByText('Update').click();
 await cur_page.locator('input[name="name"]').fill(process.env.adminName!);
 await cur_page.getByRole('button', { name: 'Save' }).click();
 await cur_page.locator(locatorCancel).click();
 await cur_page.getByTestId('cancel()').click();
})

   // Test logout
test('logout', async () => {
  await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await cur_page.close();
  })

  });
  