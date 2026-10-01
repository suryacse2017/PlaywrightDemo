import { test,Page, BrowserContext } from '@playwright/test';
import { HomePage } from "../pageObjects/HomePageLocators";
import { SharedMethods} from "../Utils/SharedMethods";

//gitHub
//passed all TC -3 spec 3 browser , each spec working multiple  TC, no homepagesetup 

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
            // await otnHubPage.pageClose();


      });
      test('TC2_Create Case - Case Assigned', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Case Assigned";  // need to check and change the number before run
            let patientFName = "Carlo";
            let patientLName = "Adam";

          //  await homePage.pause();
                  await otnHubPage.ClickRequestConsult();
                  await otnHubPage.SelectSpecificProvider(); 
                  await delay(1000);
                  await otnHubPage.EnterRecipient("Performance"); 
                  await delay(1000);
                  await otnHubPage.EnterPatientFName(patientFName); 
                  await otnHubPage.EnterPatientLName(patientLName); 
                  await otnHubPage.EnterDOB("1982-04-12"); 
                  await otnHubPage.SelectMale(); 
                  await otnHubPage.EnterOHIP("1234567897","PO"); 
                 // await homePage.pause();
                  await otnHubPage.EnterRequest(request); 
                  await delay(1000);
                  await otnHubPage.ClickOnSend();
            await delay(10000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      });
      test('TC3_Create Case - Provide consult', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Provide consult";  // need to check and change the number before run
            let patientFName = "Paul";
            let patientLName = "Colt";

            //await homePage.pause();
             //await otnHubPage.clickOneConsult(); 
                  await otnHubPage.ClickRequestConsult();
                  await otnHubPage.SelectSpecificProvider(); 
                  await delay(1000);
                  await otnHubPage.EnterRecipient("Performance"); 
                  await delay(1000);
                  await otnHubPage.EnterPatientFName(patientFName); 
                  await otnHubPage.EnterPatientLName(patientLName); 
                  await otnHubPage.EnterDOB("1982-04-12"); 
                  await otnHubPage.SelectMale(); 
                  await otnHubPage.EnterOHIP("1234567897","PO"); 
                 // await homePage.pause();
                  await otnHubPage.EnterRequest(request); 
                  await delay(1000);
                  await otnHubPage.ClickOnSend();
            await delay(10000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      });
      test('TC4_Create Case - Complete Case', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Complete Case";  // need to check and change the number before run
            let patientFName = "Colton";
            let patientLName = "Carlo";

           // await homePage.pause();
            await otnHubPage.ClickRequestConsult();
            await otnHubPage.SelectSpecificProvider();
            await delay(1000);
            await otnHubPage.EnterRecipient("Performance");
            await delay(1000);
            await otnHubPage.EnterPatientFName(patientFName);
            await otnHubPage.EnterPatientLName(patientLName);
            await otnHubPage.EnterDOB("1982-04-12");
            await otnHubPage.SelectMale();
            await otnHubPage.EnterOHIP("1234567897", "PO");
            //await homePage.pause();
            await otnHubPage.EnterRequest(request);
            await delay(1000);
            await otnHubPage.ClickOnSend();
            await delay(5000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      });
      test('TC5_Create case - Request Clarifications', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Request Clarifications";  // need to check and change the number before run
            let patientFName = "Robert";
            let patientLName = "Camli";

          //  await homePage.pause();
            //  //await otnHubPage.clickOneConsult(); 
            await otnHubPage.ClickRequestConsult();
            await otnHubPage.SelectSpecificProvider();
            await delay(1000);
            await otnHubPage.EnterRecipient("Performance");
            await delay(1000);
            await otnHubPage.EnterPatientFName(patientFName);
            await otnHubPage.EnterPatientLName(patientLName);
            await otnHubPage.EnterDOB("1982-04-12");
            await otnHubPage.SelectMale();
            await otnHubPage.EnterOHIP("1234567897", "PO");
            //await homePage.pause();
            await otnHubPage.EnterRequest(request);
            await delay(1000);
            await otnHubPage.ClickOnSend();
            await delay(10000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      });
      test('TC6_Create case - Add note after  Request Clafication', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Add note after  Request Clarification";  // need to check and change the number before run
            let patientFName = "Aby";
            let patientLName = "Nancy";

           // await homePage.pause();
            //  //await otnHubPage.clickOneConsult(); 
            await otnHubPage.ClickRequestConsult();
            await otnHubPage.SelectSpecificProvider();
            await delay(1000);
            await otnHubPage.EnterRecipient("Performance");
            await delay(1000);
            await otnHubPage.EnterPatientFName(patientFName);
            await otnHubPage.EnterPatientLName(patientLName);
            await otnHubPage.EnterDOB("1982-04-12");
            await otnHubPage.SelectMale();
            await otnHubPage.EnterOHIP("1234567897", "PO");
            //await homePage.pause();
            await otnHubPage.EnterRequest(request);
            await delay(1000);
            await otnHubPage.ClickOnSend();
            await delay(10000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      });
      test('TC7_Create case - Request More Information', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Request More Information";  // need to check and change the number before run
            let patientFName = "Mathew";
            let patientLName = "Irin";

           // await homePage.pause();
            //  //await otnHubPage.clickOneConsult(); 
            await otnHubPage.ClickRequestConsult();
            await otnHubPage.SelectSpecificProvider();
            await delay(1000);
            await otnHubPage.EnterRecipient("Performance");
            await delay(1000);
            await otnHubPage.EnterPatientFName(patientFName);
            await otnHubPage.EnterPatientLName(patientLName);
            await otnHubPage.EnterDOB("1982-04-12");
            await otnHubPage.SelectMale();
            await otnHubPage.EnterOHIP("1234567897", "PO");
            //await homePage.pause();
            await otnHubPage.EnterRequest(request);
            await delay(1000);
            await otnHubPage.ClickOnSend();
            await delay(5000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      });
      test('TC8_Create case - Add Note after Request More Information', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Add Note after Request More Information";  // need to check and change the number before run
            let patientFName = "Mathew";
            let patientLName = "Riya";

           // await homePage.pause();
            await otnHubPage.ClickRequestConsult();
            await otnHubPage.SelectSpecificProvider();
            await delay(1000);
            await otnHubPage.EnterRecipient("Performance");
            await delay(1000);
            await otnHubPage.EnterPatientFName(patientFName);
            await otnHubPage.EnterPatientLName(patientLName);
            await otnHubPage.EnterDOB("1982-04-12");
            await otnHubPage.SelectMale();
            await otnHubPage.EnterOHIP("1234567897", "PO");
          //  await homePage.pause();
            await otnHubPage.EnterRequest(request);
            await delay(1000);
            await otnHubPage.ClickOnSend();
            await delay(10000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      });
      test('TC9_Create case - Provide More Information', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Provide More Information";  // need to check and change the number before run
            let patientFName = "Mathew";
            let patientLName = "Riya";

            //await homePage.pause();
            //  //await otnHubPage.clickOneConsult(); 
            await otnHubPage.ClickRequestConsult();
            await otnHubPage.SelectSpecificProvider();
            await delay(1000);
            await otnHubPage.EnterRecipient("Performance");
            await delay(1000);
            await otnHubPage.EnterPatientFName(patientFName);
            await otnHubPage.EnterPatientLName(patientLName);
            await otnHubPage.EnterDOB("1982-04-12");
            await otnHubPage.SelectMale();
            await otnHubPage.EnterOHIP("1234567897", "PO");
           // await homePage.pause();
            await otnHubPage.EnterRequest(request);
            await delay(1000);
            await otnHubPage.ClickOnSend();
            await delay(10000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      });
      test('TC10_Create case - Cancel', async () => {
            test.setTimeout(200000);
            let request = "Creating cases for Performance testing - Cancel";  // need to check and change the number before run
            let patientFName = "Cadro";
            let patientLName = "Colt";

          //  await homePage.pause();
            //  //await otnHubPage.clickOneConsult(); 
            await otnHubPage.ClickRequestConsult();
            await otnHubPage.SelectSpecificProvider();
            await delay(1000);
            await otnHubPage.EnterRecipient("Performance");
            await delay(1000);
            await otnHubPage.EnterPatientFName(patientFName);
            await otnHubPage.EnterPatientLName(patientLName);
            await otnHubPage.EnterDOB("1982-04-12");
            await otnHubPage.SelectMale();
            await otnHubPage.EnterOHIP("1234567897", "PO");
            //await homePage.pause();
            await otnHubPage.EnterRequest(request);
            await delay(1000);
            await otnHubPage.ClickOnSend();
            await delay(10000);
            await otnHubPage.ClickWaitingforResponse();
            await delay(5000);
            await otnHubPage.VerifyCaseCreated(request, patientFName, patientLName);


      }); 

});






