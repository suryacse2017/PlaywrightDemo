import {test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","ZZNcompass");


test.skip('Ncompass', async ({page}) => { 
  await page.goto('/',{waitUntil:'domcontentloaded'});
    await page.getByText('OTN Credentials').click();
    await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('a').filter({ hasText: 'Schedule' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByTestId('subMenuItem.active=true;').click();
    const page1 = await page1Promise;
   await page1.getByRole('cell', { name: 'TSM Quick Search... Patient Name: Consultant Name: Request/Event ID: Submit Create New Request/Event', exact: true }).getByRole('link').nth(3).click();
   const page2Promise = page1.waitForEvent('popup');
   await page1.getByRole('row', { name: 'Requestor * Search View', exact: true }).getByRole('link', { name: 'Search' }).click();
   const page2 = await page2Promise;
   await page2.locator('input[name="nameLast"]').click();
   await page2.locator('input[name="nameLast"]').fill('Miller-McMillan');
   await page2.getByRole('button', { name: 'Search' }).click();
   await page2.getByRole('link', { name: 'Miller-McMillan, Jane Dr.' }).click();
   const page3Promise = page1.waitForEvent('popup');
   await page1.getByRole('row', { name: 'Consultant * Search View', exact: true }).getByRole('link', { name: 'Search' }).click();
   const page3 = await page3Promise;
   await page3.getByRole('button', { name: 'Search' }).click();
   await page3.getByRole('link', { name: 'Team-GI, Multidisciplinary' }).click();
   await page1.locator('#requestDescription').click();
   await page1.locator('#requestDescription').fill('Test');
   const page4Promise = page1.waitForEvent('popup');
   await page1.getByRole('cell', { name: 'Search', exact: true }).getByRole('link', { name: 'Search' }).click();
   const page4 = await page4Promise;
   await page4.getByRole('link', { name: 'Oncology - Surgical Oncology' }).click();
   await page1.locator('#priorityCd').first().check();
   await page1.getByRole('row', { name: 'Purpose *', exact: true }).getByRole('cell').filter({ hasText: 'Discharge Planning Family Visit Multidisciplinary Without Patient Multidisciplin' }).click();
   await page1.getByRole('img', { name: 'Click here to look up the date' }).click();
   await page1.getByRole('link', { name: '31' }).click();
   await page1.locator('#eventStartTime').click();
   await page1.locator('#eventStartTime').fill('0700');
   await page1.getByRole('cell', { name: 'Duration of Clinic *', exact: true }).click();
   await page1.locator('#requestDuration').click();
   await page1.locator('#requestDuration').fill('105');
   const page5Promise = page1.waitForEvent('popup');
   await page1.locator('#searchStudio').click();
   const page5 = await page5Promise;
   await page5.getByRole('button', { name: 'Search' }).click();
   await page5.getByRole('link', { name: 'TOR_OTN_9999_LAB_07' }).click();
   const page6Promise = page1.waitForEvent('popup');
   await page1.locator('#searchStudio0').click();
   const page6 = await page6Promise;
   await page6.getByRole('button', { name: 'Search' }).click();
   await page6.getByRole('link', { name: 'Jane_MillerMcMillan_BUG' }).click();
   await page1.getByRole('link', { name: 'Add' }).click();
   const page7Promise = page1.waitForEvent('popup');
   await page1.locator('#searchStudio1').click();
   const page7 = await page7Promise;
   await page7.getByRole('button', { name: 'Search' }).click();
   await page1.getByRole('link', { name: 'Add' }).click();
   const page8Promise = page1.waitForEvent('popup');
   await page1.locator('#searchStudio2').click();
   const page8 = await page8Promise;
   await page8.getByRole('button', { name: 'Search' }).click();
   await page1.getByRole('button', { name: 'Schedule' }).click();
   await page1.locator('#patientAgeGroup').nth(1).check();
   await page1.locator('#patientAgeGroup').nth(1).check();
   await page1.locator('select[name="request\\.purposeCd"]').selectOption('MULTIWITHOUTPATIENT');
   await page1.locator('#hostConfModeCd').selectOption('SEVEN_ONE_LAYOUT');
   await page1.goto('https://schedule.stagingotn.ca/tsm/request/pclinic/header/schedule.do');
   await page1.goto('https://schedule.stagingotn.ca/tsm/request/pclinic/view/save.do');
   const page9Promise = page1.waitForEvent('popup');
   await page1.getByRole('link', { name: 'The system schedule conflicts with Request ID# 263495290' }).click();
   const page9 = await page9Promise;
   await page1.goto('https://schedule.stagingotn.ca/tsm/request/pclinic/header/get.do?request.requestId=263495880');
   await page1.locator('#eventStartTime').fill('0600');
   

  /*  
    // logout
  await page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
 
 */ 
 });
 

