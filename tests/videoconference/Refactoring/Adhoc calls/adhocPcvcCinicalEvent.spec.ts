import { test, expect } from '@playwright/test';
import { setReport, loadEnv } from '../../../../helper/functions';
loadEnv('evrvideo_staging');
test.setTimeout(130000); 
const participantSys = process.env.legSysName2!;


test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByText('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  //Check Create event tooltip and navigate to create event page
  await page.getByRole('button', { name: 'Create event' }).click();
  await page.locator('.MuiTypography-root > .MuiButtonBase-root').click();
  
  //Create event type;
  await page.getByText('Clinical event').click();
  await page.getByRole('option', { name: 'Clinical event' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

   //Switch to Call now for adhoc
  await page.getByRole('button', { name: 'Call Now', exact: false });
  await page.getByRole('button', { name: 'Call Now' }).click();

  //Select type of event
  await expect(page.getByText('Participating System(s)')).toHaveText('Participating System(s)');    
  await page.getByText('Guest via email (OTNinvite)').click();
  await page.getByRole('option', { name: 'OTN Member or System' }).click();
  await page.getByPlaceholder('Search for people or room systems').click();

  //Select the participant
  await page.getByPlaceholder('Search for people or room systems').fill(participantSys);
  await page.getByRole('option', { name: participantSys  }).click();
  
  //Place call 
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^Call Now$/ }).getByRole('button').click();
  const page1 = await page1Promise;
  
  //Wait for the call to connect and remain connected
  await page1.waitForTimeout(30000);
  await page1.locator('[data-testid="video-meeting"]').click();
  await page1.locator('[data-testid="button-leave"]').click();

  //Close call page
  await page1.waitForTimeout(5000);
  await page1.goto('https://guest.stagingotn.ca/#/postcall');
  await page1.close();
  
  //logout
  await page.getByLabel('More options').click();
  await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  await page.waitForTimeout(10000);
  await page.locator('.otn-logo').click();
  await page.close();
 
});
