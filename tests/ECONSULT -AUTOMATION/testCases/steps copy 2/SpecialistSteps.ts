import { createBdd } from 'playwright-bdd';
import { test } from './fixtures'; // This imports your GooglePage fixture
import { expect } from '@playwright/test';
import { DataTable } from '@cucumber/cucumber';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const { Given, When, Then } = createBdd(test);


//********************************************************************************************************************************************************

When('I click on Needs Attention', async ({homePage}) => {
  await homePage.ClickNeedsAttention();
    await delay(5000);
});

When('I provide consultaion with comment {string} and {string} time spend for this case', async ({homePage}, comment: string, time: string) => {
   await homePage.ProvideConsult(comment, time);
 
});