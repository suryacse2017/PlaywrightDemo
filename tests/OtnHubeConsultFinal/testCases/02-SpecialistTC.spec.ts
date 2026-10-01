import { test,Page, BrowserContext } from '@playwright/test';
import { HomePage } from "../pageObjects/HomePageLocators";


//OtnHub.eConsult application create an digital consult- test  env - only one browser for all TC  - chrome,firefox,safari - Checkpoint & Netscope  ON
function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
test.describe.serial('eConsult work flow', () =>
{
  let homePage: Page;
let context: BrowserContext;

  let otnHubPage: HomePage;

     test.beforeAll(async ({ browser }) => {
         
          const context = await browser.newContext({
                viewport: null, // window maximize
              });
         homePage = await context.newPage();
         await homePage.goto('https://econsult.testotn.ca');
     
         otnHubPage = new HomePage(homePage);
       });
     
       test.afterAll(async () => {
         await homePage.close();
       });

            test('TC1_Login as Specialist ', async () =>
            {
                  await otnHubPage.ClickOtnCredentialsButton(); 
                  //await homePage.pause();
                  await otnHubPage.EnterUsername("lily23@test.ca"); 
                  await otnHubPage.EnterPassword("test123!"); 
                  await delay(5000);
                  await otnHubPage.ClickSignIn(); 
                  console.log("Specialist had LoggedIn");
                 // await homePage.pause();

            });
            
            test('TC2_Provide Consult', async () =>
            {
                  test.setTimeout(2000000);
                  let comment="Providing Consult for this case";
                  let time="16 - 20 minutes";

                  //await homePage.pause();
                    await otnHubPage.ClickNeedsAttention();
                    await delay(5000);
                    await otnHubPage.ProvideConsult(comment,time);
            });
            test('TC3_Request More Information', async () =>
            {
                  test.setTimeout(2000000);
                  let comment="Request more information for this case";
                  let time="16 - 20 minutes";

                //  await homePage.pause();
                    await otnHubPage.ClickNeedsAttention();
                    await delay(8000);
                    await otnHubPage.RequestMoreInfo(comment,time);
                    



            });
            test('TC4_Add Note after request more information', async () =>
            {
                 
                  let comment="Adding notes after request more information";
                  let caseName="Creating cases for Performance testing - Add Note after Request More Information";
                  let time="16 - 20 minutes";
                //  await homePage.pause();
                    await otnHubPage.ClickWaitingforMorInfo();
                   
                    await delay(8000);
                    await otnHubPage.AddNote2(caseName,comment,time);
            });
             
            /*
            test('TC2_Request More Info', async ({ homePage }) =>
            {
                  test.setTimeout(200000);
                  //327792164
                  //let caseId=  await otnHubPage.getCaseID();
                 // let caseId='327792164';
                  //console.log("caseId:",caseId);
                  let comment="Requesting more information for the case";
                  let time="16 - 20 minutes";
                  // 1 - 5
                  // 11 - 15
                  // 16 - 20
                  // 21 - 25
                  // 26 - 60

                  await homePage.pause();
                  await otnHubPage.ClickNeedsAttention();
                  await delay(5000);
                  //let caseFound:boolean=await otnHubPage.getCaseByCaseId(caseId);
                  // console.log("caseFound:",caseFound);
                  // await otnHubPage.ProvideConsult(comment);
                   await otnHubPage.RequestMoreInfo(comment);
                   await otnHubPage.ClickOnSend();
                   await otnHubPage.SelectTimeSpend(time);
               
  

            });*/


          
});






