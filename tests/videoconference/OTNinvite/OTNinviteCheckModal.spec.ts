import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteCheckModal");

const tooltipPartipants = "Your event can contain a combination of OTNhub room-based or personal (PCVC) systems, guests, and non-OTN systems.\n" +
"Guest via Email: Send an OTNinvite email to a patient or guest to attend from their own device.\n" +
"OTN System: Connect with an OTNhub personal (PCVC) or room-based system.\n" +
"Non-OTN System: Connect with a standards-based system by sending them a dialing alias via email.";
const tooltipCreate = "Schedule or connect any combination of Guest (via OTNinvite), OTN member, Room-based system, or non-OTN system.";
const tooltipBook = "Request a virtual care appointment at a PAN site for your patient. Request nursing support or use of peripheral devices.";
const tooltipPIN = 'click to modify PIN';
const locGuestNo=".participants-count";
const locatorinvDisclaimer=".invite-disclaimer";
const invDisclaimer="OTNinvite is applicable in select situations. For more info click here."
const locatorelDisclaimer=".eligibility-disclaimer";
const elDisclaimer="Please take a moment to consider Patient Eligibility.";
const locatorText2='//*[@id="detailContainer"]/div[2]/span[2]/text()[1]';
const text2="to discuss";
const locatorText1='//*[@id="detailContainer"]/div[2]/text()';
const text1="titled";
const locatorText3='//*[@id="detailContainer"]/div[2]/span[2]/text()[2]';
const text3="patient";
const locatorText4='//*[@id="detailContainer"]/div[2]/span[2]/text()[3]';
const text4=" who ";
const locatorText5='//*[@id="detailContainer"]/div[2]/span[2]/span[2]';
const text5='is';
const inLineTextClinical="titled.*Clinical Event\\n.*to discuss.*1.*who is present";
const locatorInLineText=".white.inline-text";
const inLineTextMeeting="titled Meeting";
const inLineTextLearning="titled Learning event";
const locatorParticipant2 =".ng-scope:nth-child(2) > .participant-controls .btn-icon-remove";
test('Check Create Event - OTNinvite', async ({ page }) => {
  test.setTimeout(60000);
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
 //check participating systems options  
 
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
  await page.getByPlaceholder('Guest name').fill('Monica Badila');
  await page.getByPlaceholder('Guest email').click();
  await page.getByPlaceholder('Guest email').fill('mbadila@otn.ca');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).toBeVisible();
  await expect(page.getByPlaceholder('Enter a 6-digit host PIN...')).toBeVisible();

  // check guest no again
  guestCount='1';
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
  await page.locator('#hostPin').fill('111111');
  //guest PIN
  await expect(page.locator('#guestPin')).not.toBeVisible();
  await expect(page.getByText('Add a Guest PIN to increase privacy and security.')).not.toBeChecked();
  await page.getByText('Add a Guest PIN to increase privacy and security.').click();
  await expect(page.getByText('Add a Guest PIN to increase privacy and security.')).toBeChecked();
  await expect(page.getByPlaceholder('Enter a 6-digit guest PIN...')).toBeVisible();
  await page.getByPlaceholder('Enter a 6-digit guest PIN...').hover();
  tooltipName = await page.getByPlaceholder('Enter a 6-digit guest PIN...').getAttribute('popover');
  console.log(tooltipName);
  tooltipName===tooltipPIN;
  await page.getByPlaceholder('Enter a 6-digit guest PIN...').clear();
  await page.getByPlaceholder('Enter a 6-digit guest PIN...').click();
  await page.getByPlaceholder('Enter a 6-digit guest PIN...').fill('222222');
  await expect(page.getByRole('button', { name: 'Call Now' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Schedule' })).toBeDisabled();
  await page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
  await page.getByPlaceholder('Search for people or room systems').click();
  await page.getByPlaceholder('Search for people or room systems').fill(process.env.partialPcvcName1!);
  await page.getByRole('option', { name: process.env.myFullPcvcName1! }).locator('a').click();
  await page.getByRole('dialog').getByRole('button').first().click();
  await expect(page.getByRole('button', { name: 'Call Now' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Schedule' })).toBeEnabled();
  //check guest no again
  guestCount='2';
  textGuestNo = "you have added "+guestCount+" / 60 systems";
  console.log(textGuestNo);
  await expect(page.locator(locGuestNo)).toHaveText(textGuestNo);
  //remove guest
  await page.locator(locatorParticipant2).click();
  await expect(page.getByRole('button', { name: 'Call Now' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Schedule' })).toBeDisabled();
  //check guest no again
  guestCount='1';
  textGuestNo = "you have added "+guestCount+" / 60 systems";
  console.log(textGuestNo);
  await expect(page.locator(locGuestNo)).toHaveText(textGuestNo);

//check Learning OTNinvite 
  await page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Learning event');
  await expect(page.locator(locatorInLineText)).toContainText(inLineTextLearning);
  //fill guest 
  await page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await page.getByPlaceholder('Guest name').click();
  await page.getByPlaceholder('Guest name').fill('Monica Badila');
  await page.getByPlaceholder('Guest email').click();
  await page.getByPlaceholder('Guest email').fill('mbadila@otn.ca');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByLabel('Host PIN is used if host joins via email link. Do not share with guests')).toBeVisible();
  await expect(page.getByPlaceholder('Enter a 6-digit host PIN...')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Call Now' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Schedule' })).toBeEnabled();
  //check guest no again
  guestCount='2';
  textGuestNo = "you have added "+guestCount+" / 60 systems";
  console.log(textGuestNo);
  await expect(page.locator(locGuestNo)).toHaveText(textGuestNo);
   
  //check specifics for meeting event
   await page.getByRole('combobox', { name: 'Event Type:' }).selectOption('string:Meeting');
   await expect(page.locator(locatorInLineText)).toContainText(inLineTextMeeting);
   await page.screenshot({ path: 'test-results/otninviteMeeting.png' });
//close modal on main page
  await page.getByText('x', { exact: true }).click();

//logout
   await page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
   await page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
   await page.close();

  });

