import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';
import { loadEnv } from '../helper/functions';
//<<<<<<< Updated upstream
//import { loadEnv } from '../helper/functions';
loadEnv('Env_Staging');
//import { setLogin } from '../helper/functions';
//>>>>>>> Stashed changes
setup('do login', async ({ page }) => {
  await page.goto('/');
  await page.getByText('OTN Credentials').click()
  await page.getByPlaceholder('OTN Credentials').click();
  await page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!)
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.context().storageState({ path: STORAGE_STATE });
  //await page.close()
});
