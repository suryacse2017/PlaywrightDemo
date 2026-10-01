import { createBdd } from 'playwright-bdd';
import { test } from './fixtures'; // This imports your GooglePage fixture
import { expect } from '@playwright/test';
import { DataTable } from '@cucumber/cucumber';
import { sharedData } from '../../Utils/SharedMethods';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
  
}

const { Given, When, Then } = createBdd(test);

//*************************************************************************************************************** */
Given('I navigate to the eConsult test portal', async ({ loginPage }) =>
{
    await loginPage.navigate();
});

When('I click the OTN Credentials button', async ({loginPage}) =>
{
   
   await loginPage.ClickOtnCredentialsButton();
});

When('I click on {string} button', async ({loginPage,page}, buttonName) => 
  {
     await loginPage.SelectButton(buttonName);
     await page.waitForTimeout(25000);

});
When('I click on {string} tab', async ({loginPage}, buttonName) => 
  {
   await loginPage.ClickOnTab(buttonName);
});

When('I login with username {string} and password {string}', async ({loginPage}, username, password) => 
{
 await loginPage.EnterUsername(username);
 await loginPage.EnterPassword(password);
 await loginPage.ClickSignIn();
});

Then('I enter {string}', async ({homePage}, text: string) => 
{
     await homePage.EnterText(text);
});


Then('I should see that the {string} has logged in successfully', async ({} , user) => 
{
   console.log(user+" had LoggedIn");
});

When('I select a specific provider', async ({requestPage}) => {
   await requestPage.SelectSpecificProvider();
});

When('I enter recipient {string}', async ({requestPage}, arg1) => 
{
await requestPage.FillAndSelect(arg1);
        
});

When('I enter patient details:', async ({requestPage}, dataTable: DataTable) => 
{
    const data = dataTable.hashes()[0]; 

  
            await requestPage.EnterPatientFName(data.firstName);
            await requestPage.EnterPatientLName(data.lastName);
            await requestPage.EnterDOB(data.dob);
            await requestPage.SelectMale();
            await requestPage.EnterOHIP(data.ohip, "PO");

});

When('I enter request details {string}', async ({ requestPage }, caseName) => 
{
 await requestPage.EnterRequest(caseName);
            
});

When('I open the case from {string} folder', async ({requestPage,page}, folderName: string) =>
 {
    
    if(folderName === "Waiting for Response")
      {
        await requestPage.ClickWaitingforResponse();
           
            await page.waitForTimeout(5000);
      }
      else if(folderName === "Needs Attention")
      {
        await requestPage.ClickNeedsAttention();
            
            await page.waitForTimeout(5000);
      }
});

Then('I verify case for {string} created by {string} {string} {string} {string} {string} {string}', async ({requestPage}, caseType: string, firstName: string, lastName: string, dob: string, gender: string, ohip: string, caseName: string) => 
{
   await requestPage.VerifyCaseCreated(caseType,firstName, lastName, dob, gender, ohip, caseName);
});
Then('I verify {string} {string} {string} options are present', async ({requestPage}, arg1: string, arg2: string, arg3: string) => 
{
   await requestPage.VerifyOptions(arg1,arg2,arg3);
   console.log("Verified "+arg1+","+arg2+","+arg3+" optios are present");

});
Then('I verify {string} {string} options are present', async ({requestPage}, arg1: string, arg2: string) => 
{
   await requestPage.VerifyOptions(arg1,arg2);
   console.log("Verified "+arg1+","+arg2+" optios are present");

});

When('I hover mouse over {string} button and verify the tooltip text {string}', async ({requestPage}, buttonText: string ,toolTip: string) => 
{
      await requestPage.HoverElement(buttonText);
      await requestPage.VerifyAddNotetooltip(toolTip);
      console.log("Verified toolTip :", toolTip);
});

When('I added the note {string} for {string}', async ({requestPage}, comment: string, caseName: string) => 
{
     await requestPage.AddNote(comment,caseName);
});

When('I add an attachment file {string}', async ({requestPage,page}, fileName: string) => 
{
    await requestPage.AddAttachment(fileName);
    await page.waitForTimeout(25000); 
    console.log("Added an attachment");
});
When('Click on {string} button', async ({requestPage,page}, arg: string) => 
  {
        if(arg === "Save as Draft")
        {
        await requestPage.ClickOnSaveAsDraf();
        }
        else if(arg === "Send")
        {
          await requestPage.ClickOnSend();
        } 
        await page.waitForTimeout(3000);

});

Then('I verify the {string} is still visible', async ({requestPage}, noteType:string) => 
{
    

          console.log("Verify Draft note is visible.");
          let textAreaValue = await requestPage.getAddNote();
          if(noteType==textAreaValue)
          {
            console.log("Verified "+noteType+" is visible");
          }


});

When('I open the same case by CaseID for {string}', async ({requestPage,page},caseType:string) => 
{
    //await page.waitForTimeout(25000); 
    let isCaseFound = await requestPage.getCaseDetails(sharedData.CASEID,caseType); 
    //let isCaseFound = await requestPage.getCaseDetails('332621251',arg); 

      if (isCaseFound)
      {
        //console.log("Case  found ");
        expect(isCaseFound).toBe(true);
      }
      else {
        console.log("Case not found.");
      }
});

When('I click on same case by CaseID', async ({requestPage}) => 
{



    await requestPage.ClickOnCase(sharedData.CASEID); 
    
});

Then('I verify the {string} is not visible', async ({requestPage}, noteType:string) => 
{
    
          
          await requestPage.VerifyDraftNotVisible(noteType);
          console.log("Verified "+noteType+" is not visible.");

});

When('Verify the case is on top of case list', async ({homePage}) => 
{
    let isCaseFound = await homePage.getCaseDetailsFromList(sharedData.CASEID); 
   // let isCaseFound = await homePage.getCaseDetailsFromList('332623247');
      if (isCaseFound)
      {
       // console.log("Case  found ");
        if(sharedData.CASEIndex === 0)
        {
          console.log("Verified case is on top of the list");
        }
      }
      else {
        console.log("Case not found");
      }

});

Then('I assign the case to {string}', async ({requestPage,page},arg:string) => 
{
    await requestPage.SelectDropdown(arg);
     await page.waitForTimeout(2000);
});

When ('Verify {string} is present', async ({homePage}, arg: string) => 
{
     //console.log( "group name  "+arg + " and "+sharedData.CASEProgramName.trim());
     arg=arg.trim();
    if(arg === sharedData.CASEUserName)
    {
      expect(arg, "Referrer name is present for specific case").toBe(sharedData.CASEUserName);
      console.log("Verified Referrer name is present :",sharedData.CASEUserName);
    }
    else if(arg === sharedData.CASECreatedDateTime)
    {
      expect(arg, "Submitted date is present for specific case").toBe(sharedData.CASECreatedDateTime);
      console.log("Verified Submitted date is present :", sharedData.CASECreatedDateTime);
    }
    else if(arg === sharedData.CASEComment)
    {
      expect(arg, "Comment is present for specific case").toBe(sharedData.CASEComment);
      console.log("Verified Comment is present :", sharedData.CASEComment);
    } 
    else if(arg.trim() === sharedData.CASEProgramName.trim())
    {    
      expect(arg, "Program name is present for specific case").toBe(sharedData.CASEProgramName);
      console.log("Verified Program name is present :", sharedData.CASEProgramName);
    }
    else
    {    console.log( arg + " is not present");
    }

});

When('Verify {string} is present for specific case', async ({}, arg: string) => 
{
    //console.log("arg is ---------", arg,sharedData.CASEProgramName);
     //console.log("arg is ---------", arg,sharedData.CASECreatedDateTime);
    if(arg === sharedData.CASEUserName)
    {
      
      expect(arg, "Referrer name is present for specific case").toBe(sharedData.CASEUserName);
      console.log("Verified Referrer name is present for specific case :", sharedData.CASEUserName);
    }
    else if(arg === sharedData.CASEComment)
    {    
      
      expect(arg, "Comment 'added note' is present for specific case").toBe(sharedData.CASEComment);
      console.log("Verified Comment 'added note' is present for specific case :", sharedData.CASEComment);
    }
    else if(arg === sharedData.CASECreatedDateTime)
    {
      
      expect(arg, "Submitted date is present for specific case").toBe(sharedData.CASECreatedDateTime);
      console.log("Verified Submitted date is present for specific case :", sharedData.CASECreatedDateTime);
    }
    else if(arg === "date and time")
    {
      console.log("Verified date and time is present for specific case :", sharedData.CASECreatedDateTime);
      //expect(arg, "date and time is present for specific case").toBe(sharedData.CASECreatedDateTime);
    }
    else if(arg === sharedData.CASEFileName)
    {
     
      expect(arg, "File name is present for specific case").toBe(sharedData.CASEFileName);
      console.log("Verified File name is present for specific case :", sharedData.CASEFileName);
    }  
    else
    {    console.log( arg + " is not present for specific case");
    } 

});

Then('I click on {string} text', async ({homePage,page}, spanName: string) => 
{
   await homePage.SelectText(spanName);
   await page.waitForTimeout(5000);
});

Then('I search caseID', async ({loginPage}) => 
{
     //await loginPage.EnterUsername(username);
    // await this.sharedMethods.EnterTextBoxValue(elm, user);
});

Then('I logout from the portal', async ({loginPage,page}) => 
{
    await loginPage.LogOut();
    await page.waitForTimeout(2000);

});
