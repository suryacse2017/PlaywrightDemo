import { test,Page, BrowserContext } from '@playwright/test';
import { HomePage } from "../pageObjects/HomePageLocators";
import { SharedMethods} from "../Utils/SharedMethods";

//Run this one
//success run -2 spec 2 browser , each spec working multiple  TC, no homepagesetup

//
function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
test.describe.serial('eConsult work flow', () =>
{
   let homePage: Page;
        let context: BrowserContext;
  
        let otnHubPage: HomePage;

         test.beforeAll(async ({ browser }) => 
            {
               const context = await browser.newContext({
                viewport: null, // window maximize
              });
              homePage = await context.newPage();
              await homePage.goto('https://econsult.testotn.ca');
      
              otnHubPage = new HomePage(homePage);
            });
      
            test.afterAll(async () => 
            {
              await homePage.close();
            });
//Requester Logged in and create cases for each type 
      test('TC1_Login as Requester', async () => {
            await otnHubPage.ClickOtnCredentialsButton();
            await otnHubPage.EnterUsername("surya@test.ca");
            await otnHubPage.EnterPassword("test123!");
            await delay(5000);
            await otnHubPage.ClickSignIn();
            console.log("Requester had LoggedIn");
           // await homePage.pause();


      });

           
            test('TC2_Request Clarification', async () =>
            {
                  test.setTimeout(200000);
                  //327792164
                  //let caseId=  await otnHubPage.getCaseID();
                  // let caseId='327792164';
                  //console.log("caseId:",caseId);
                  let caseName="Creating cases for Performance testing - Request Clarifications";
                  let comment="Requesting clarification for the case";
                //  await homePage.pause();
                  await otnHubPage.ClickNeedsAttention();
                  await delay(5000);
                  //let caseFound:boolean=await otnHubPage.getCaseByCaseId(caseId);
                  // console.log("caseFound:",caseFound);
                        await otnHubPage.RequestClarification(caseName,comment);
                        await delay(8000);
                        
                       
                        
                  
      

            });
            test('TC3_Add note after  Request Clarification', async () =>
            {
                  test.setTimeout(200000);
                   let caseName="Creating cases for Performance testing - Add note after  Request Clarification";
                   let comment="Adding note after request clarification";
                 // await homePage.pause();
                   await otnHubPage.ClickNeedsAttention();
                   await otnHubPage.RequestClarification(caseName,comment);
                  // await otnHubPage.ClickOnSend();
                   await delay(15000);
                  await otnHubPage.ClickWaitingforResponse();
                  await delay(5000);
                  await otnHubPage.AddNote(caseName,comment);
                  await delay(8000);
                  
                  
                  
                        
            });
            test('TC4_Provide More Information', async () =>
            {
                  test.setTimeout(200000);
                  let caseName="Creating cases for Performance testing - Provide More Information";
                  let comment="More info:Previous diabetic patient";
                 // await homePage.pause();
                  await otnHubPage.ClickNeedsAttention();
                  await delay(5000);
                  //let caseFound:boolean=await otnHubPage.getCaseByCaseId(caseId);
                  // console.log("caseFound:",caseFound);
                        await otnHubPage.ProvideMoreInfo(caseName,comment);
                       // await delay(5000);
                        
                        
            });
            test('TC5_Cancel the case', async () =>
            {
                  test.setTimeout(200000);
                  //327792164
                  //let caseId=  await otnHubPage.getCaseID();
                  // let caseId='327792164';
                  //console.log("caseId:",caseId);
                  let caseName="Creating cases for Performance testing - Cancel";
                  let comment="Not a Valid case";
                //  await homePage.pause();
                  await otnHubPage.ClickNeedsAttention();
                  await delay(5000);
                  //let caseFound:boolean=await otnHubPage.getCaseByCaseId(caseId);
                  // console.log("caseFound:",caseFound);
                        await otnHubPage.CancelCase(caseName,comment);
                       // await delay(5000);
                        
                        

                        
                  
      

            });
             test('TC6_Complete the case', async () =>
            {
                  test.setTimeout(200000);
                  //327792164
                  //let caseId=  await otnHubPage.getCaseID();
                  // let caseId='327792164';
                  //console.log("caseId:",caseId);
                  let caseName="Creating cases for Performance testing - Complete Case";
                  let feedback1="Given the prescription and Consultation completed";
                  let feedback2="Result added";
                  let time="16 - 20 minutes";

                 // await homePage.pause();
                  await otnHubPage.ClickNeedsAttention();
                  await delay(5000);
                  //let caseFound:boolean=await otnHubPage.getCaseByCaseId(caseId);
                  // console.log("caseFound:",caseFound);
                        await otnHubPage.CaseComplete(caseName,feedback1,feedback2);
                      //  await delay(5000);
                        

            });
     
          
});






