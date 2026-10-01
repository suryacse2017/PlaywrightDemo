import { test} from "../Utils/HomePageSetup";
import { OrgSignUpPage } from "../pageObjects/OrgSignUpPage";
import { PrimaryContactPage } from "../pageObjects/PrimaryContactPage";


let homePage: any;
let orgSignUpPage: OrgSignUpPage;
let primaryContactPage: PrimaryContactPage;
function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}


test.describe.serial('Org SignUp and Details Flow', () => {

  test.beforeAll(async ({homePage,context}) => {
 
    orgSignUpPage = new OrgSignUpPage(homePage, context);
    primaryContactPage = new PrimaryContactPage(homePage); 
  });

  test('TC1_OrgSignUp page1 Enter Org_Name', async () => 
  {
    await delay(1000);
    await orgSignUpPage.EnterOrganizationNameDropDown('Cancer');
    await orgSignUpPage.ClickOnConfirm();
    await orgSignUpPage.ClickOnNext(1);
  });

  test('TC2_Continue to Personal Details', async () => 
  {
    await primaryContactPage.page.pause();
    await primaryContactPage.EnterFirstName("Sichu");

  });

});
/*





let otnHub:any;
//let appPage:any;
//let appContext:any;
function delay(ms: number) 
{
      return new Promise(resolve => setTimeout(resolve, ms));
}
test('TC1_OrgSignUp page1 Enter Org_Name', async ({ context, homePage }) => 
{
           
            //appPage=homePage;
            //appContext=context;
            const otnHub = new OrgSignUpPage(homePage, context);
             //await appPage.pause();
            //test.setTimeout(20000);

            // await otnHub.EnterOrganizationName(appPage, "Cancer Care Ontario");
            // await otnHub.ClickOnCancel(appPage);
            // await otnHub.EnterOrganizationName2(appPage, "Cancer Care Ontario");
            // await otnHub.ClickOnConfirm(appPage);
            // await otnHub.EnterOrganizationName2(appPage, "Cancer Care Ontario");
            // await otnHub.ClosePopUpWindow(appPage);
            // //await delay(3000);
            // await otnHub.ClickOnAppCancel(appPage);
            // await otnHub.ClickOnNo(appPage);
                                           //      await otnHub.ClickOnAppCancel(appPage);
                                          //      await otnHub.ClickOnYes(appPage);

            await otnHub.EnterOrganizationNameDropDown(homePage, "Cancer");
            await otnHub.ClickOnConfirm(homePage);
            await otnHub.ClickOnNext(homePage,1);
            
            //await appPage.pause();


});


// test('TC2_OrgSignUp page2 -Enter Primary Contact ', async () => 
// {
//       otnHub = new PrimaryContactPage(appPage, appContext);
//       await otnHub.EnterFirstName(appPage, "Sichu");
//       //      await otnHub.EnterLastName(appPage, "Kasdet");
//       //      await otnHub.EnterMiddleInitial(appPage, "P");
//       //      await otnHub.EnterPreferedFirstName(appPage, "Sichu");
//       //      await otnHub.EnterPreferedLastName(appPage, "Kichu");
//       //      await otnHub.EnterJobTitle(appPage, "ProductController");
//       //      await otnHub.EnterEmail(appPage, "sichu@adadaf.com");
//       //      await otnHub.EnterPhone(appPage, "1234567");
//       //      await otnHub.EnterExt(appPage, "123");
//       //      await otnHub.EnterFax(appPage, "45678990");



// });


*/

