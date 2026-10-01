import {test, expect, Page} from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
test.describe('Check all valid email templates', () => { 
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteInvalidEmail");


  const errorGuest = "Enter a guest name";
  const errorEmail="Enter a valid email";
  const locatorCloseMsg=".close.ng-scope";
  const error1="x Error - All mandatory fields must be completed\n" +
  "Invalid entry. You must enter at least 2 characters for a Guest Name.\n" +
  "Enter a valid email address."
  const locatorGuestName="//input[@name='guestName']" ;
  const locatorGuestEmail="//input[@name='guestEmail']";
  const errorEmailTop="x Error - Enter a valid email address."
  const invalidEmail =
  [
    {name: "e0", email:""},
    {name:"e1", email:"m"},
    {name:"e2", email:"mtester2001"},
    {name:"e3", email:"mtester2001@"},
    {name:"e4", email:"A@b@c@example.com"},
    {name:"e5", email: "m@.g.ca"},
    {name:"e6", email:"-m@-gmail.ca"},
    {name:"e7", email:"abc@-mail.com"},
    {name:"e8", email:"mtester@#2gmail.com"},
    {name:"e9", email:"mtester@!2gmail.com"},
    {name:"e10", email:"mtester@$2gmail.com"},
    {name:"e11", email:"mtester@%2gmail.com"},
    {name:"e12", email:"mtester@&2gmail.com"},
    {name:"e13", email:"mtester@+2gmail.com"},
    {name:"e14", email:".abc@mail.com"},
    {name:"e15", email:"mtester@|2gmail.com"},
    {name:"e16", email:"mtester@>2gmail.com"},
    {name:"e17", email:"mtester@<2gmail.com"},
    {name:"e18", email:"mtester@=tgmail.com"},
    {name:"e19", email:"mtester@/2gmail.com"},
    {name:"e20", email:"mtester@?2gmail.com"},
    {name:"e21", email:"mtester@{}2gmail.com"},
    {name:"e22", email:"mtester[@]2gmail.com"},
    {name:"e23", email:"mtester@()2gmail.com"}, 
    {name:"e24", email: "m@.gm.g.ca"},
    {name:"e25", email: "abc..def@mail.com"},
    {name:"e26", email: "A@b@c@example.com"},
    {name:"e27",email:"i_like_underscore@but_its_not_allowed_in_this_part.example.com"},
    {name:"e28", email:"this\ still\"not\\allowed@example.com"},
    {name:"e29", email:"a\"b(c)d,e:f;g<h>i[j\k]l@example.com"},
    {name:"e30", email:"monica.badila@mylongnamedomainmylongnamedomainmylongnamedomainmylongnamedomain.com"} //domain label>63 characters
  ]

 invalidEmail.forEach(data => {
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
  //await expect(page.getByText(errorEmailTop)).toBeVisible();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `test-results/${data.name}.png`});
  await expect(page.getByText('Enter a valid email', { exact: true })).toBeVisible();
  await page.locator(locatorCloseMsg).nth(0).click();
  
 });

  
 })
// Test logout
test('out', async ({page}) => {
 
  await page.close();
})
})

