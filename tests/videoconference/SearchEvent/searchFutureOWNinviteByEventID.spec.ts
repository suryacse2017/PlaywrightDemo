import {test, expect, Page } from '@playwright/test';
import { Day } from '../../../helper/functions';
import { setReport, loadEnv } from '../../../helper/functions';

const startTimeHours='1'
const startTimeMinutes='00'
const endTimeHours='1'
const endTimeMinutes='15'
const consultant1=process.env.consultant1!
const admin=process.env.admin!
const eventIdLinkLocator='#selected-event-details > div.event-detail-print.page-break-fix > div:nth-child(3) > div.col-md-7.col-xs-6.event-id-field.ng-scope > form > input.eventSubmitLink'
const phone=process.env.audio
const locatorConsultantSys="tr:nth-child(3) > .ng-binding:nth-child(2)";  
  const name='User Pcvc';
  const scheduleText1="Are you sure you want to schedule this event?";
  const scheduleText2="The event will be sent to any participants invited by email.";
  const scheduleText3="If you want to give the attendees additional notice about the event, a patient handout which includes the host's administrative contact is available in the event details. (The handout will not be sent to the patients automatically).";
  const scheduleText4="View the patient handout in a new window";
  const locatorTime='//*[@id="ng-app"]/div[16]/div/div/div[1]/table/tbody/tr[1]/td[2]';
  const locatorConsultant="tr:nth-child(2) > .ng-binding:nth-child(2)";
  const locatorPartSys=" tbody > tr:nth-child(4) > td.participant-consent.ng-scope.participant-row-odd > div.ng-binding";
  const consultant=process.env.selfConsultant1!;
  const consultantSystem=process.env.partialPcvcName1!;
  let partSys=name+" (mteste@test.ca)";
  let partSys1=name+" via email"
  const consultantSys=process.env.pcvcName1! ;
  const hostSys=process.env.TSMsystemName! ;
  const fullConsultantSys=process.env.myFullPcvcName1! ;
  const adminName=process.env.adminName!;
  const regex=new RegExp('[0-9]{9}', 'm');
  loadEnv('video_staging');
  setReport("eVisitReports","searchByID");
 
test.describe('Search future own invite by eventID and check details', () => { 
  
  var val;
  var eventTime;
  let cur_page: Page; 
  test.beforeAll(async ({ page }) => { cur_page = page });

  test('login', async ({page}) => {
    
    await cur_page.goto('/');
    await cur_page.getByText('OTN Credentials').click();
    await cur_page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
    await cur_page.getByPlaceholder('Password').click();
    await cur_page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
    await cur_page.getByRole('button', { name: 'Sign In' }).click();
    //Navigate to videoconference
    await cur_page.getByRole('link', { name: 'Videoconference' }).click();
  })

  
  test('Schedule future OTNinvite  clinical', async () => {
    test.setTimeout(60000);
    //Open Create Event modal
    await cur_page.getByText('Create event').click();
    //add pcvc host system
    await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
    await cur_page.getByPlaceholder('Search for people or room systems').click();
    await cur_page.getByPlaceholder('Search for people or room systems').fill( consultantSystem);
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
  
    let date=new Day(6);
    await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
    await cur_page.getByRole('textbox').nth(2).fill(startTimeHours);
    await cur_page.getByRole('textbox').nth(3).fill(startTimeMinutes);
    await cur_page.getByRole('textbox').nth(4).fill(endTimeHours);
    await cur_page.getByRole('textbox').nth(5).fill(endTimeMinutes);
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
    let eventTime=date.year+'-'+date.month+'-'+date.day+', '+'01:00 - 01:15';
     console.log(time);
    await expect(cur_page.locator(locatorTime)).toHaveText(time);
    await expect(cur_page.locator(locatorConsultant)).toHaveText(consultant);
    await expect(cur_page.locator(locatorConsultantSys)).toHaveText(consultantSys);
    
    await expect(cur_page.locator(locatorPartSys)).toHaveText(partSys);
    await expect(cur_page.getByText(admin)).toHaveText(admin);
    await cur_page.getByText('Update').click();
    await cur_page.locator('input[name="name"]').fill(adminName);
    await cur_page.getByRole('button', { name: 'Save' }).click();
    await cur_page.getByRole('button', { name: 'Schedule' }).click(); 
    await cur_page.getByText('Scheduled with '+ partSys1).first().click();
    let val = await cur_page.getByText('Scheduled with '+ partSys1).first().textContent()
    let eventid=val?.match(regex);
    console.log ('Event ID:'+ eventid);
    
  })

  
  test('Search event by eventID and check details', async () => { 
    test.setTimeout(60000);
    
    await cur_page.getByPlaceholder('Search by Event ID').click();
    await cur_page.getByPlaceholder('Search by Event ID').fill(eventID);
    await cur_page.getByPlaceholder('Search by Event ID').press('Enter');
    await cur_page.getByText('Create event').click();
    await cur_page.getByTestId('cancel()').click();
    await cur_page.getByTestId('openHostSiteEventModel()').click();
    await cur_page.getByTestId('cancel()').click();
  
  //check event's eventID on the result list
    await expect(cur_page.getByText('Event ID: '+eventID)).toBeVisible;
  //check event's details
  await expect(cur_page.getByText('Event Detail')).toBeVisible;
  await expect(cur_page.getByTestId('confirmCancelOTNinvite(selectedEvent)')).toHaveText('Cancel Event');
  await expect(cur_page.locator('#buttons').getByTestId('open($event)')).toHaveText('Copy Event');
  await expect(cur_page.locator('#event-icon')).toBeVisible();
  await expect(cur_page.locator('#event-icon-label')).toHaveText('Clinical event');
  await expect(cur_page.getByText(eventTime)).toBeVisible();
  
  await expect(cur_page.getByText(startTimeHours+':'+startTimeMinutes+'–'+endTimeHours+':'+endTimeMinutes)).toBeVisible();
  //edit icon for time presend and acctionable
  //event title
  await expect(cur_page.getByText('Clinical Event', { exact: true })).toBeVisible()
  //TAC
  await expect(cur_page.getByText('Cardiology')).toBeVisible();
  //Event ID label
  await expect(cur_page.getByText('Event ID:', { exact: true }).first()).toBeVisible();
  await expect(cur_page.locator(eventIdLinkLocator)).toHaveAttribute('value', eventID);
  //Event status
  await expect(cur_page.getByText('Event Status:', { exact: true }).first()).toBeVisible();
  await expect(cur_page.getByText('Scheduled', { exact: true })).toBeVisible();
  //event consultant- legal name
  await expect(cur_page.getByText('Consultant:')).toBeVisible();
  await expect(cur_page.getByText(consultant1).first()).toBeVisible()
  //admin contact
  await expect(cur_page.getByText('Administrative contact:')).toBeVisible();
  await expect(cur_page.getByText(admin)).toBeVisible();
  //participant systems
  await expect(cur_page.getByRole('heading', { name: 'Participating Systems' })).toBeVisible();
  await expect(cur_page.getByText('2 systems')).toBeVisible();
  //audio connection methods
  await expect(cur_page.getByRole('heading', { name: 'Audio Connection Methods' })).toBeVisible();
  await expect(cur_page.getByText('Audio Phone No:')).toBeVisible();
  await expect(cur_page.getByRole('cell', { name: phone})).toBeVisible();
  await expect(cur_page.getByText('Event ID:', { exact: true }).nth(1)).toBeVisible();
  await expect(cur_page.getByText('Audio Guest PIN:')).toBeVisible();
  //patient's details
  await expect(cur_page.getByRole('heading', { name: 'Patient Details' })).toBeVisible();
  await expect(cur_page.getByText('Number of patients:')).toBeVisible();
  await expect(cur_page.getByText('8', { exact: true }).first()).toBeVisible();
 
 await expect(cur_page.getByTestId('showPatientLetter(selectedEvent.requestId)')).toBeVisible();
 
  //check Patient no is editable
  await cur_page.getByTestId('DetailsController.editNumPatients()').click();
  await cur_page.getByTestId('DetailsController.cancelEditNumPatients()').click();

  //botton details
  await expect(cur_page.getByRole('heading', { name: 'Event Details' })).toBeVisible();
  await expect(cur_page.getByText('Appointment Requirements:').first()).toBeVisible();
  await expect(cur_page.getByText('Scheduled By:')).toBeVisible();
  await expect(cur_page.getByText('Last Edited By:')).toBeVisible();
  await expect(cur_page.getByText('Last Edited:')).toBeVisible();
  await expect(cur_page.getByText('Not provided')).toBeVisible();

  
  //navigate to Ncompass
   const ncompassID='Clinic Event #'+eventID
    const page1Promise = cur_page.waitForEvent('popup');
    await cur_page.locator('#selected-event-details div').filter({ hasText: 'Cancel Event Copy Event CLINICAL Clinical event 2024-01-10, 10:00 – 10:15' }).locator('input[type="submit"]').click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('cell', { name: ncompassID })).toBeVisible();
    await page1.close();
  
   // logout
  await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await cur_page.close();

 });
 
})

