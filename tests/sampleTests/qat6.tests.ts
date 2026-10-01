import { test, expect, Page } from '@playwright/test';
import { setReport } from '../../helper/functions';
const prefix = './helper/files/'
const files = [
    {displayName: 'Ctest1-sunny', fileName: "sunny.png"},
    {displayName: 'Ctest2-snowy', fileName: "snowy.png"},
    {displayName: 'Ctest3-rainy', fileName: "rainy.png"},
    {displayName: 'Ctest4-pdf1', fileName: "testpdf1.pdf"},
    {displayName: 'Ctest5-pdf2', fileName: "testpdf2.pdf"},
    {displayName: 'Ctest6-123', fileName: "123.txt"},
    {displayName: 'Ctest7-abc', fileName: "abc.txt"},
]

test('QAT-6', async ({ page }) => {
    setReport("QAT-6","test")
    test.setTimeout(75000)
    await page.goto('/');
    const statusMessage = page.locator('#messageContainer')

    // await page.getByPlaceholder('Enter specialist or group name…').click();
    // await page.getByPlaceholder('Enter specialist or group name…').fill('valli staging');
    // await page.getByRole('button', { name: 'Search specialists' }).click();
    // await page.getByRole('link', { name: 'Dr. Valli Staging', exact: true }).click();

    await page.getByPlaceholder('Enter site name or site #...').click()
    await page.getByPlaceholder('Enter site name or site #...').fill('headwaters')
    await page.getByRole('button', { name: 'Search telemedicine sites' }).click()
    await page.getByRole('link', { name: 'Headwaters Health Care Centre', exact: true }).click()
    
    for (const file of files){
        await page.getByTestId('addNewProtocol()').click();
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.locator('#uploadBtn').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(prefix+file.fileName);
        await page.getByPlaceholder('Example: Lab form').click();
        await page.getByPlaceholder('Example: Lab form').fill(file.displayName);
        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await expect(statusMessage).toBeVisible()
        await page.waitForTimeout(1000);        //DO NOT REMOVE: the status message changes for some reason, this waits for that to happen
        await statusMessage.getByText('×').click()
        await expect(statusMessage).toBeHidden()
    }
    await page.close()
}); 