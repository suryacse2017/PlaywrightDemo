import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../../helper/functions';
import { Day } from '../../../../helper/functions';

loadEnv('video_staging');
setReport("eVisitReports","adhocpcvcOffClinicalEvent");
const tooltipPartipants = "Your event can contain a combination of OTNhub room-based or personal (PCVC) systems, guests, and non-OTN systems.\n" +
"Guest via Email: Send an OTNinvite email to a patient or guest to attend from their own device.\n" +
"OTN System: Connect with an OTNhub personal (PCVC) or room-based system.\n" +
"Non-OTN System: Connect with a standards-based system by sending them a dialing alias via email.";
const tooltipCreate = "Schedule or connect any combination of Guest (via OTNinvite), OTN member, Room-based system, or non-OTN system.";
const locGuestNo=".participants-count";
const locatorinvDisclaimer=".invite-disclaimer";
const invDisclaimer="OTNinvite is applicable in select situations. For more info click here."
const locatorelDisclaimer=".eligibility-disclaimer";
const elDisclaimer="Please take a moment to consider Patient Eligibility.";
const hostSysSearch=process.env.partialPcvcName1!
const participantSysSearch=process.env.partialPcvcName2!
const hostSys=process.env.myFullPcvcName1!
const participantSys=process.env.fullPcvcName2!
const locatorCloseMsg=".close.ng-scope";
const errorTop="× Error - The user or system you are trying to call is currently unavailable. - "


test('adhoc clinical event with pcvc off line', async ({page}) => {
  test.setTimeout(80000);
  await page.goto('/');
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
  await page.getByPlaceholder('Search for people or room systems').fill(participantSysSearch);
  await page.getByRole('option', { name: participantSys }).locator('a').click();
  await page.getByRole('button', { name: 'Call Now' }).click();
  await expect(page.getByText(errorTop)).toBeVisible();
  await page.locator(locatorCloseMsg).nth(0).click();
  //close modal on main page
  await page.getByText('x', { exact: true }).click();

 
  //logout
  await page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await page.close();

  });
