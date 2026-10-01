import {test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
test.describe('Check all valid email templates', () => { 
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteValidEmail");

 
  const errorGuest = "Enter a guest name";
  const errorEmail="Enter a valid email";
  const locatorCloseMsg=".close.ng-scope";
  const error1="x Error - All mandatory fields must be completed\n" +
  "Invalid entry. You must enter at least 2 characters for a Guest Name.\n" +
  "Enter a valid email address."
  const locatorGuestName="//input[@name='guestName']" ;
  const locatorGuestEmail="//input[@name='guestEmail']";
  const errorEmailTop="x Error - Enter a valid email address."
  const locatorParticipant1 =".ng-scope:nth-child(1) > .participant-controls .btn-icon-remove";
  const validEmail =
  [
    {name: "v0", email:"m@ga.ca"},
    {name:"v1", email:"mmonica.badila@gasn.care"},
    {name:"v2", email:"monica.badila.luminita.test@gadomain.care.internet"},
    {name:"v3", email:"monica_badila@gasn.care"},
    {name:"v4", email:"other.email-with-hyphen@and.subdomains.example.com"},
    {name:"v5", email: "m@ab.ag.ca"},
    {name:"v6", email:"fully-qualified-domain@example.com"},
    {name:"v7", email:"disposable.style.email.with+symbol@example.com"},
    {name:"v8", email:"monica.badila@mylongnamedomain.mylongdomain.com"},
    {name:"v9", email:"monica.badila@mylongnamedomainmylongnamedomain.ca"}
    
  ]

 validEmail.forEach(data => {
  test(`test errors ${data.name}`, async ({ page }) => { 
  await page.goto('/',{waitUntil:'domcontentloaded'});
    await page.getByText('OTN Credentials').click();
    await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();
    //Navigate to videoconference
    await page.getByRole('link', { name: 'Videoconference' }).click();
  await page.getByText('Create event').click();
  await page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await page.getByPlaceholder('Guest name').fill('mo');
  await page.getByPlaceholder('Guest email').fill(data.email);
  await page.getByRole('button', { name: 'Add' }).click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `test-results/${data.name}.png`});
  await expect(page.getByText('Enter a valid email', { exact: true })).not.toBeVisible();
  await page.locator(locatorParticipant1).click();
 
 })

 })
 // Test logout
 test('out', async ({page}) => {
 
  await page.close();
})
})
