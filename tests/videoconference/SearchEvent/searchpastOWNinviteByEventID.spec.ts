import {test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","searchByID");
const eventID='272809034';
const date='2024-06-04'
const startTimeHours='11'
const startTimeMinutes='35'
const endTimeHours='11'
const endTimeMinutes='37'
const consultant1=process.env.consultant1!
const admin=process.env.admin!
const eventIdLinkLocator='#selected-event-details > div.event-detail-print.page-break-fix > div:nth-child(3) > div.col-md-7.col-xs-6.event-id-field.ng-scope > form > input.eventSubmitLink'
const phone=process.env.audio
test('Search past own invite by eventID and check details', async ({page}) => { 
  test.setTimeout(60000);
  
    await page.goto('/');
    await page.getByText('OTN Credentials').click();
    await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Videoconference' }).click();
    await page.getByPlaceholder('Search by Event ID').click();
    await page.getByPlaceholder('Search by Event ID').fill(eventID);
    await page.getByPlaceholder('Search by Event ID').press('Enter');
    await page.getByText('Create event').click();
    await page.getByTestId('cancel()').click();
    await page.getByTestId('openHostSiteEventModel()').click();
    await page.getByTestId('cancel()').click();
  
  //check event's eventID on the result list
    await expect(page.getByText('Event ID: '+eventID)).toBeVisible;
  //check event's details
  await expect(page.getByText('Event Detail')).toBeVisible;
  await expect(page.getByTestId('confirmCancelOTNinvite(selectedEvent)')).toHaveText('Cancel Event');
  await expect(page.locator('#buttons').getByTestId('open($event)')).toHaveText('Copy Event');
  await expect(page.locator('#event-icon')).toBeVisible();
  await expect(page.locator('#event-icon-label')).toHaveText('Clinical event');
  await expect(page.getByText(date)).toBeVisible();
  
  await expect(page.getByText(startTimeHours+':'+startTimeMinutes+'–'+endTimeHours+':'+endTimeMinutes)).toBeVisible();
  //edit icon for time presend and acctionable
  //event title
  await expect(page.getByText('Clinical Event', { exact: true })).toBeVisible()
  //TAC
  await expect(page.getByText('Cardiology')).toBeVisible();
  //Event ID label
  await expect(page.getByText('Event ID:', { exact: true }).first()).toBeVisible();
  await expect(page.locator(eventIdLinkLocator)).toHaveAttribute('value', eventID);
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
 // await expect(page.getByRole('cell', { name: phone})).toBeVisible();
  await expect(page.getByText('Event ID:', { exact: true }).nth(1)).toBeVisible();
  await expect(page.getByText('Audio Guest PIN:')).toBeVisible();
  //patient's details
  await expect(page.getByRole('heading', { name: 'Patient Details' })).toBeVisible();
  await expect(page.getByText('Number of patients:')).toBeVisible();
  await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
 
 await expect(page.getByTestId('showPatientLetter(selectedEvent.requestId)')).toBeVisible();
 /*
  //check Patient no is editable
  await page.getByTestId('DetailsController.editNumPatients()').click();
  await page.getByTestId('DetailsController.cancelEditNumPatients()').click();
  */
  //botton details
  await expect(page.getByRole('heading', { name: 'Event Details' })).toBeVisible();
  await expect(page.getByText('Appointment Requirements:').first()).toBeVisible();
  await expect(page.getByText('Scheduled By:')).toBeVisible();
  await expect(page.getByText('Last Edited By:')).toBeVisible();
  await expect(page.getByText('Last Edited:')).toBeVisible();
  await expect(page.getByText('Not provided')).toBeVisible();

  
  //navigate to Ncompass
   const ncompassID='Clinic Event #'+eventID
    const page1Promise = page.waitForEvent('popup');
    await page.locator('#selected-event-details div').filter({ hasText: 'Cancel Event Copy Event CLINICAL Clinical event 2024-06-04, 11:35 – 11:37' }).locator('input[type="submit"]').click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('cell', { name: ncompassID })).toBeVisible();
    await page1.close();
  
   // logout
  await page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await page.close();

 });
 

