import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');

const user=process.env.user!;
const hostLegacySys=process.env.legSysName2! ;

test('Select the calendar for a legacy system', async ({page}) => {
  setReport("eVisitReports","SelectDelegateCalendar")
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await page.getByText('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  //Navigate to videoconference
  await page.getByRole('link', { name: 'Videoconference' }).click();
  await page.locator('#delegatorSelect').selectOption(hostLegacySys);


  //logout
  await page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await page.close();

  });

