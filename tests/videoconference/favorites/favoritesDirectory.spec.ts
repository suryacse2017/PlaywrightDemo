import {test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","favoriteSysOnDirectory");

test('Favorites on directory', async ({page}) => { 
  test.setTimeout(60000);
  const removeMsg= "      ×      Success - Your Favourite has been Removed.";
  const addMsg= "      ×      Success - An entry was successfully created in your favourites                     ";
  //test uses Dr Ed Brown OTN that is the first entry on Favorites with pcvc and econsult groups
    await page.goto('/',{waituntil:('domcontentloaded')});
    await page.getByText('OTN Credentials').click();
    await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Directory' }).first().click();

    //Open Favorites
    await page.getByRole('listitem', { name: 'Favourites' }).getByTestId('select()').click();
    //create event
    await page.locator('#navTabs').getByText('Create event').click();
    await page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
    await page.getByPlaceholder('Search for people or room systems').click();
    await page.getByTestId('cancel()').click();
    //start case using the general button
    await page.getByRole('link', { name: 'Request Consult' }).click();
    await page.locator('#econsult-panel').getByRole('link', { name: 'Request Consult' }).click();
    await page.locator('#view-case').click();
    await page.getByRole('link', { name: 'Directory' }).click();
    //start case for dr. Ed Brown await page.getByText('Dr. Ed Brown OTN ProfileRenameRemove').click();
    await page.locator('a').filter({ hasText: 'Dr. Ed Brown OTN' }).click();
    await page.getByRole('cell', { name: 'Request Consult Connect' }).getByRole('link', { name: 'Request Consult' }).click();
   await page.getByRole('link', { name: 'Directory' }).click();
    //remove favorites entry
    const statusMessage = page.locator('#messageContainer');
    await page.locator('a').filter({ hasText: 'Dr. Ed Brown OTN' }).click();
    await page.getByTestId ("$event.stopPropagation();listItem.showSecondary=!listItem.showSecondary;").first().click();
    await page.getByText('Remove').first().click();
    await page.getByTestId('deleteFavourite(favourite)').click();
    await expect(statusMessage).toBeVisible()
    await page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
    await expect(statusMessage).toHaveText(removeMsg);
    await expect(statusMessage).toBeHidden() 
       
    //add back the Favorites entry
   
    await page.getByText('Create event').click();
    await page.getByPlaceholder('Search for people or room systems').click();
    await page.getByPlaceholder('Search for people or room systems').fill('Ed Brow');
    await page.getByTestId('selectMatch($index)').locator('a').click();
    await page.getByTestId('ParticipantsController.toggleSystemFavourite(system)').click();
    await expect(statusMessage).toBeVisible()
    await page.waitForTimeout(3000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
    await expect(statusMessage).toHaveText(addMsg);
    await expect(statusMessage).toBeHidden() 
    await page.locator('#ng-app').press('Control+c');
    await page.getByTestId('cancel()').click(); 

   // logout
  await page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  await page.close();
 });
 



