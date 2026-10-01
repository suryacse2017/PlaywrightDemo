import { test, expect } from "../Utils/HomePageSetup";
import { HomePage } from "../pageObjects/HomePageLocators";



function delay(ms: number) 
{
      return new Promise(resolve => setTimeout(resolve, ms));
}
test('TC1_Home page functionality testing-Part1_TC1', async ({ context, homePage }) => 
{

      const otnHub = new HomePage(homePage, context);

      const newCredentialPage = await otnHub.clickOtnCredentialsButton();
      await otnHub.assertEmailFieldVisible(newCredentialPage);
      await homePage.bringToFront();

      const oneIdPage = await otnHub.clickOneIdButton();
      await otnHub.assertSelectAccountTextVisible(oneIdPage);
      await homePage.bringToFront();

      // await homePage.waitForTimeout(5000);

});

test('TC2_Home page functionality testing-Part1_TC2', async ({ context, homePage }) => 
{
      test.setTimeout(80000);
      const otnHub = new HomePage(homePage, context);

      await otnHub.clickNotSureLink();
      await homePage.mouse.click(0, 0);

      await otnHub.clickSignUpOTN();
      await otnHub.assertsignUpOtnTextVisible();
      //await homePage.pause();
      console.log('Current URL1:', homePage.url());
      await otnHub.clickOtnCAlink(homePage);
      console.log('Current URL2:', homePage.url());
      await otnHub.assertOtnCaTextVisible(homePage);
      await homePage.goBack();
      console.log('Current URL:3', homePage.url());
      await otnHub.clickSignUpLink();

});

test.skip('TC3_Home page functionality testing-Part2_TC1', async ({ context, homePage }) => 
{
      test.setTimeout(200000);
      //await homePage.pause();  
      const otnHub = new HomePage(homePage, context);
      await otnHub.asserteConsultTextVisible(homePage);
      await otnHub.clickCarosels(homePage);
});

test('TC4_Home page functionality testing-Part2_TC2', async ({ context, homePage }) => 
{

     // await homePage.pause();
     test.setTimeout(2000000);
      const otnHub = new HomePage(homePage, context);

      const newSupportResourcesPage = await otnHub.clickSupportResources(homePage);
      await otnHub.assertnewSupportResourcesPageURL(newSupportResourcesPage);
      await homePage.bringToFront();
      const newTrainingCentrePage = await otnHub.clickTrainingCentre(homePage); 
      await otnHub.assertnewTrainingCentrePageURL(newTrainingCentrePage); 
      await homePage.bringToFront();
      const newResourceLibraryPage = await otnHub.clickResourceLibrary(homePage); 
      await otnHub.assertnewResourceLibraryPageURL(newResourceLibraryPage); 
      await homePage.bringToFront();
});

test('TC5_Home page functionality testing-Part3_TC1_ClickAndReset', async ({ context, homePage }) =>
 {
      //await homePage.pause();
      const otnHub = new HomePage(homePage, context);

      await otnHub.clickRole(homePage, "Physician");
      await otnHub.assertClassActive(homePage, "Physician",0);
      await otnHub.clickRole(homePage, "Physician");
      await otnHub.assertClassNonActive(homePage, "Physician");

      await otnHub.clickRole(homePage, "Nurse");
      await otnHub.assertClassActive(homePage, "Nurse",0);
      await otnHub.clickRole(homePage, "Nurse");
      await otnHub.assertClassNonActive(homePage, "Nurse");

      await otnHub.clickRole(homePage, "Administrator");
      await otnHub.assertClassActive(homePage, "Administrator",0);
      await otnHub.clickRole(homePage, "Administrator");
      await otnHub.assertClassNonActive(homePage, "Administrator");

      await otnHub.clickRole(homePage, "Contact");
      await otnHub.assertClassActive(homePage, "Contact",0);
      await otnHub.clickRole(homePage, "Contact");
      await otnHub.assertClassNonActive(homePage, "Contact");

});

test('TC6_Select the Role-Part3_TC2_Physician', async ({ context, homePage }) => 
{
            //await homePage.pause();
             test.setTimeout(2000000);
            const otnHub = new HomePage(homePage, context);

            await otnHub.ScrollToElement(homePage, "OTNhub Membership");
            await otnHub.clickRole(homePage, "Physician");

            await otnHub.clickRole(homePage, "Physician2");
            await otnHub.assertClassActive(homePage, "Physician2",0);
            await otnHub.clickRole(homePage, "Physician2");
            await otnHub.clickRole(homePage, "Physician2");

            await otnHub.clickWorkAtOrg(homePage,0);
            await otnHub.assertClassActive(homePage, "Iwork",0);
            await otnHub.clickWorkAtOrg(homePage,0);
            await otnHub.clickWorkAtOrg(homePage,0);

            await otnHub.clickAlreadyMember(homePage,0);
            await otnHub.assertClassActive(homePage, "Physician3",0);
            await otnHub.clickAlreadyMember(homePage,0);
            await otnHub.clickAlreadyMember(homePage,0);

            await otnHub.clickAlredyOTNHub(homePage,0);
            await otnHub.assertClassActive(homePage, "Physician4",0);
            await otnHub.clickAlredyOTNHub(homePage,0);
            await otnHub.clickAlredyOTNHub(homePage,0);

            await otnHub.clickHCOSignUp(homePage,0);
            await homePage.bringToFront();

            await otnHub.clickAlredyOTNHub(homePage,0);
            await otnHub.clickDontOTNHub(homePage,0);
            await otnHub.clickHaveOneID(homePage,0);
            await otnHub.ExpressSignUp(homePage, 0);
            await homePage.bringToFront();

            await otnHub.clickHaveOneID(homePage,0);
            await otnHub.clickDontHaveOneID(homePage,0);
            await otnHub.GetOneIDCPSO(homePage, 0);
            await homePage.bringToFront();
            await otnHub.ExpressSignUp(homePage, 1);
            await homePage.bringToFront();

            await otnHub.clickAlreadyMember(homePage,0);
            await otnHub.clickNotMember(homePage,0);
            await otnHub.clickHCOSignUp(homePage,1);
            await homePage.bringToFront();


            await otnHub.clickWorkAtOrg(homePage,0);
            await otnHub.clickIndepenedentPractioner(homePage,0);
            await otnHub.clickHaveOneID(homePage,1);
            await otnHub.PrivatePractiseSignUp(homePage, 0);
            await homePage.bringToFront();

            await otnHub.clickHaveOneID(homePage,1);
            await otnHub.clickDontHaveOneID(homePage,1);
            await otnHub.PrivatePractiseSignUp(homePage, 1);
            await homePage.bringToFront();
            await otnHub.GetOneIDCPSO(homePage, 1);
            await homePage.bringToFront();
// await homePage.waitForTimeout(1000);
            await otnHub.clickRole(homePage, "Physician2");
            await otnHub.clickMedicalFellow(homePage,0);
            await otnHub.clickAlreadyMember(homePage,1);
            await otnHub.clickAlredyOTNHub(homePage,1);
            await otnHub.clickHCOSignUp(homePage,2);
            await homePage.bringToFront();

            await otnHub.clickAlredyOTNHub(homePage,1); 
            await otnHub.clickDontOTNHub(homePage,1); 
            await otnHub.clickHaveOneID(homePage,2); 
            await otnHub.ExpressSignUp(homePage, 2); 
            await homePage.bringToFront(); 

            await otnHub.clickHaveOneID(homePage,2);
            await otnHub.clickDontHaveOneID(homePage,2);
            await otnHub.ExpressSignUp(homePage, 3);
            await homePage.bringToFront();

            await otnHub.clickAlreadyMember(homePage,1);
            await otnHub.clickNotMember(homePage,1);
            await otnHub.clickHCOSignUp(homePage,3);
            await homePage.bringToFront();


});


test('TC7_Home page functionality testing-Part3_TC3_Nurse', async ({ context, homePage }) => 
{
          //  await homePage.pause();
            const otnHub = new HomePage(homePage, context);

            await otnHub.ScrollToElement(homePage, "OTNhub Membership");
            await otnHub.clickRole(homePage, "Nurse");
            await otnHub.clickWorkAtOrg(homePage,1);
            await otnHub.clickAlreadyMember(homePage,2);
            await otnHub.clickAlredyOTNHub(homePage,2);
            await otnHub.clickHCOSignUp(homePage,4);
            await homePage.bringToFront();


            await otnHub.clickAlredyOTNHub(homePage,2);
            await otnHub.clickNotOTNHub(homePage,2);
            await otnHub.clickHaveOneID(homePage,3);
            await otnHub.ExpressSignUp(homePage, 4);
            await homePage.bringToFront();

            await otnHub.clickHaveOneID(homePage,3);
            await otnHub.clickDontHaveOneID(homePage,3);
            await otnHub.ExpressSignUp(homePage, 5);
            await homePage.bringToFront();


            await otnHub.clickAlreadyMember(homePage,2);
            await otnHub.clickNotMember(homePage,2);
            await otnHub.clickHCOSignUp(homePage,5);

            await otnHub.clickWorkAtOrg(homePage,1);
            await otnHub.clickIndepenedentPractioner(homePage,1);
            await otnHub.PrivatePractiseSignUp(homePage, 2);
            await homePage.bringToFront();


});

test('TC8_Home page functionality testing-Part3_TC4_Staff', async ({ context, homePage }) => 
{
           // await homePage.pause();
            const otnHub = new HomePage(homePage, context);

            await otnHub.ScrollToElement(homePage, "OTNhub Membership");
            await otnHub.clickRole(homePage, "Administrator");
            await otnHub.clickAlreadyMember(homePage,3);
            await otnHub.clickAlredyOTNHub(homePage,3);
            await otnHub.clickHCOSignUp(homePage,6);
            await homePage.bringToFront();


            await otnHub.clickAlredyOTNHub(homePage,3);
            await otnHub.clickNotOTNHub(homePage,3);
            await otnHub.clickHaveOneID(homePage,4);
            await otnHub.ExpressSignUp(homePage, 6);
            await homePage.bringToFront();

            await otnHub.clickHaveOneID(homePage,4);
            await otnHub.clickDontHaveOneID(homePage,4);
            await otnHub.ExpressSignUp(homePage, 7);
            await homePage.bringToFront();


            await otnHub.clickAlreadyMember(homePage,3);
            await otnHub.clickNotMember(homePage,3);
            await otnHub.clickHCOSignUp(homePage,7);


});

test('TC9_Home page functionality testing-Part3_TC5_Contact', async ({ context, homePage }) => 
{
            //await homePage.pause();
            const otnHub = new HomePage(homePage, context);

            await otnHub.ScrollToElement(homePage, "OTNhub Membership");
            await otnHub.clickRole(homePage, "Contact");
            await otnHub.clickHCOSignUp(homePage,8);
            await homePage.bringToFront();
});

test('TC10_Home page functionality testing-Part4_TC1', async ({ context, homePage }) => 
{
           // await homePage.pause();
            const otnHub = new HomePage(homePage, context);

            await otnHub.ScrollToElement(homePage, "FrequentlyAskedQuestions");
            await otnHub.clickORGSignUp(homePage);
            await homePage.bringToFront();
            await otnHub.PrivatePractiseSignUp(homePage,3);
            await homePage.bringToFront();
            await otnHub.ClickExpressSignUp(homePage);
            await homePage.bringToFront();

});

test('TC11_Home page functionality testing-Part5_TC1', async ({ context, homePage }) => 
{
           // await homePage.pause();
           test.setTimeout(2000000);
            const otnHub = new HomePage(homePage, context);

            await otnHub.ScrollToElement(homePage, "FrequentlyAskedQuestions");
            let num:number;
            for(num=0;num<=6;num++)
            {
                  await otnHub.ClickFAQ(homePage,num);
            }
            


});













