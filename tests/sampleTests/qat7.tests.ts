import { test, expect, Page } from '@playwright/test';
import { setReport, setLogin } from '../../helper/functions';

setLogin('klew@otn.ca','test123!')

const groupName = 'valli group'
const groupNumbers : number[] = []

test('QAT-7', async ({ page }) => {
    setReport("Test","QAT-&")
    await page.goto('/');
    await page.getByRole('listitem', { name: 'User Panel' }).getByTestId('select()').click();
    const statusMessage = page.locator('#messageContainer')
    //------------------------------------------------------------
    // This section is for grabbing all the group names
    //--------------------------------------------------------------
    const publishedLocator = page.locator('#navTabs > div > div.tab-pane.ng-scope.active > div.cd-primary-nav.ng-scope.is-visible > div > div > div > ul:nth-child(2) > li.ng-scope > div > div:nth-child(1) > div')
    const draftsLocator = page.locator('#navTabs > div > div.tab-pane.ng-scope.active > div.cd-primary-nav.ng-scope.is-visible > div > div > div > ul:nth-child(2) > li.ng-scope > div > div:nth-child(2) > div')
    let publishedGroupList = (await publishedLocator.innerText()).split('\n')
    let draftGroupList = (await draftsLocator.innerText()).split('\n')

    for (const group of publishedGroupList.concat(draftGroupList)){
        if (group.includes(groupName)){
            groupNumbers.push(+group.slice(-1))
            console.log("group number:",group.slice(-1))
        }
    }
    const max = Math.max(...groupNumbers)
    const nextGroup = groupName + " " + (max+1)
    console.log("Max", max, "Next Group:", nextGroup)
    //------------------------------------------------------------
    // This section is creating the group with the "nextGroup" name
    //------------------------------------------------------------
    await page.getByRole('link', { name: 'Create Group' }).click();
    await page.getByPlaceholder('Enter name...').click();
    await page.getByPlaceholder('Enter name...').fill(nextGroup);
    await page.getByPlaceholder('Enter name...').press('Tab');
    await page.getByPlaceholder('Enter organization name...').fill('Org Placeholder');
    await page.getByPlaceholder('Enter organization name...').press('Tab');
    await page.getByPlaceholder('Enter one line summary...').fill('Highlight Placeholder');
    await page.getByPlaceholder('Enter one line summary...').press('Tab');
    await page.getByPlaceholder('Enter description...').fill('Disc placeholder');
    await page.locator('#frenchIndicatorNo').check();
    await page.getByPlaceholder('Search for eConsult specialists...').click();
    await page.getByPlaceholder('Search for eConsult specialists...').fill('dr vall');
    await page.getByText('Dr Valli Staging, Cancer Care Ontario').click();
    await page.getByRole('combobox').selectOption('Assigner');
    await page.getByPlaceholder('Search for eConsult users...').click();
    await page.getByPlaceholder('Search for eConsult users...').fill('Valli');
    await page.getByTestId('selectMatch($index)').getByText('Dr Valli Staging, Cancer Care Ontario').click();
    await page.getByPlaceholder('Search for OTNhub users...').click();
    await page.getByPlaceholder('Search for OTNhub users...').fill('dr vall');
    await page.getByText('Dr Valli Staging, Cancer Care Ontario', { exact: true }).click();
    await page.getByPlaceholder('Search for OTNhub users...').fill('valli');
    await page.getByTestId('selectMatch($index)').getByText('Dr Valli Staging, Cancer Care Ontario').click();
    await page.getByTestId('openPublishDlg()').click();
    await page.getByTestId('close($event)').getByRole('button', { name: 'Publish' }).click(); 

    //------------------------------------------------------------
    // This section waits for the status message
    //------------------------------------------------------------
    await expect(statusMessage).toBeVisible()
    await page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
    await statusMessage.getByText('×').click()
    await expect(statusMessage).toBeHidden()
    await page.close()
    
}); 