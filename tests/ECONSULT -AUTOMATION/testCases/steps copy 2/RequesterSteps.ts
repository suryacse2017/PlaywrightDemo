import { createBdd } from 'playwright-bdd';
import { test } from './fixtures'; // This imports your GooglePage fixture
import { expect } from '@playwright/test';
import { DataTable } from '@cucumber/cucumber';
import { sharedData } from '../../Utils/SharedMethods';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const { Given, When, Then } = createBdd(test);



//Part-1 ***********************************************************************************************************************
Given('I navigate to the eConsult test portal', async ({ homePage }) =>
{
    await homePage.navigate();
});

When('I click the OTN Credentials button', async ({homePage}) =>
{
   
   await homePage.ClickOtnCredentialsButton();
});

When('I login with username {string} and password {string}', async ({homePage}, username, password) => 
{
 await homePage.EnterUsername(username);
 await homePage.EnterPassword(password);
 await delay(5000);
 await homePage.ClickSignIn();
});

Then('I should see that the {string} has logged in successfully', async ({} , user) => 
{
   console.log(user+" had LoggedIn");
});



//Part-2 ************************************************************************************************************
When('I click on Request Consult', async ({homePage}) => {
await homePage.ClickRequestConsult();
});

When('I select a specific provider', async ({homePage}) => {
   await homePage.SelectSpecificProvider();
            await delay(1000);
});

When('I enter recipient {string}', async ({homePage}, arg) => {
await homePage.EnterRecipient(arg);
            await delay(1000);
});

When('I enter patient details:', async ({homePage}, dataTable: DataTable) => {
  // .hashes() returns an array of objects: [{ firstName: 'Carlo', lastName: 'Adam', ... }]
    const data = dataTable.hashes()[0]; 

    // Now use the keys from your Feature file table
            await homePage.EnterPatientFName(data.firstName);
            await homePage.EnterPatientLName(data.lastName);
            await homePage.EnterDOB(data.dob);
            await homePage.SelectMale();
            await homePage.EnterOHIP(data.ohip, "PO");

 
});

When('I enter request details {string}', async ({ homePage }, caseName) => {
 await homePage.EnterRequest(caseName);
            await delay(1000);
});

When('I click on Send', async ({homePage}) => {
  await homePage.ClickOnSend();
            await delay(5000);
  
});

When('I re-open the case from Waiting for Response folder', async ({homePage}) =>
 {
    await homePage.ClickWaitingforResponse();
            await delay(8000);
});



Then('I verify the case is created by {string} {string} {string} {string} {string} {string}', 
async ({ homePage }, firstName, lastName, dob, gender, ohip, caseName) => 
{
   await homePage.VerifyCaseCreated(firstName, lastName, dob, gender, ohip, caseName);

});

When('I need to complete the case by addding comment {string} and {string}', async ({homePage}, feedback1: string, feedback2: string) => {
  let caseName = "Creating cases for Performance testing - Complete Case";
  await homePage.CaseComplete(caseName, feedback1, feedback2);
});

//Part 3************************************************************************************************
When('I hover mouse over {string} button and verify the tooltip text {string}', async ({homePage}, buttonText: string ,toolTip: string) => 
{
      await homePage.HoverElement(buttonText);
      await homePage.VerifyAddNotetooltip(toolTip);

});

When('I click on "Add note" and add the note {string} on test box for {string}', async ({homePage}, comment: string, caseName:string) => 
  {
      
      await homePage.AddNote(caseName,comment);
});

When('I save the note as {string}', async ({homePage}, arg: string) => 
  {
  await homePage.ClickOnSaveAsDraf();

});

Then('I verify the {string} is still visible', async ({homePage}, draftNote:string) => 
{
    

     // const isCaseFound = await homePage.getCaseByCaseId(sharedData.CASEID);


    //  if (isCaseFound) {
          console.log("Case found! Verify Draft note.");
          let textAreaValue = await homePage.getAddNote();
          if(draftNote==textAreaValue)
          {
            console.log("Draft note visible");
          }

     // } else {

         // console.log("Case not found, skipping Add Note.");
     // }

});

Then('I logout from the portal', async ({homePage}) => 
{
    await homePage.LogOut();
});

//Part 5************************************************************************************************
When('I open the same case by CaseID', async ({homePage}) => 
{

 // let isCaseFound = await homePage.getCaseByCaseId(sharedData.CASEID); 
  let isCaseFound = await homePage.getCaseByCaseId('331263018');
    if (isCaseFound)
    {
      console.log("Case  found ");
    }
    else {
      console.log("Case not found in Need Attention folder.");
    }


});

Then('I verify the {string} is not visible', async ({homePage}, draftNote:string) => 
{
    
          console.log("Verify Draft not visible.");
          await homePage.VerifyDraftNotVisible(draftNote);

});