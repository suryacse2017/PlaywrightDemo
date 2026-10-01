import { test, expect, Page } from '@playwright/test';
import { setReport } from '../../helper/functions';

test('temp', async ({ page }) => {
    setReport("Test", "temp1")
    await page.goto('https://www.google.com/');
});  

//Will use this naming for both tests
test('temp2', async ({ page }) => {
    setReport("Test","temp2")
    await page.goto('https://www.google.com/');
}); 
