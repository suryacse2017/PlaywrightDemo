import { test } from "../Utils/HomePageSetup";
import { OrgSignUpPage } from "../pageObjects/OrgSignUpPage";
import { PrimaryContactPage } from "../pageObjects/PrimaryContactPage";
import { AddAccountsPage } from "../pageObjects/AddAccountsPage";
import { SubmissionPage } from "../pageObjects/SubmisionPage";



let orgSignUpPage: OrgSignUpPage;
let primaryContactPage: PrimaryContactPage;
let addAccountsPage: AddAccountsPage;
let submissionPage: SubmissionPage;


function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Use serial to ensure test2 runs after test1.Test suite1
test.describe.serial('Org SignUp and Details Flow', () => {

    test.beforeAll(async ({ homePage, context }) => {
        orgSignUpPage = new OrgSignUpPage(homePage, context);
        primaryContactPage = new PrimaryContactPage(homePage);
        addAccountsPage = new AddAccountsPage(homePage);
        submissionPage = new SubmissionPage(homePage);
    });

    test('TC1_OrgSignUp page1 Enter Org_Name', async () => {
        await delay(1000);
        test.setTimeout(100000);
        // await orgSignUpPage.page.pause();

        // await orgSignUpPage.ClickOnHere();
        // await orgSignUpPage.ClickOnHereNo();
        // await orgSignUpPage.ClickOnHere();
        // await orgSignUpPage.ClickOnHereYes();


        // await orgSignUpPage.EnterOrganizationName("Cancer Care Ontario");
        // await delay(1000);
        // await orgSignUpPage.ClickOnCancel();
        // await orgSignUpPage.EnterOrganizationName2("Cancer Care Ontario");
        // await orgSignUpPage.ClickOnConfirm();
        // await orgSignUpPage.EnterOrganizationName2("Cancer Care Ontario");
        // await orgSignUpPage.ClosePopUpWindow();

        // await orgSignUpPage.ClickOnAppCancel();
        // await orgSignUpPage.ClickOnNo();
        //   await orgSignUpPage.ClickOnAppCancel();
        //    await orgSignUpPage.ClickOnYes();


        await orgSignUpPage.EnterOrganizationNameDropDown('Cancer');
        await orgSignUpPage.ClickOnConfirm();
        await orgSignUpPage.ClickOnNext(1);
    });

    test('TC2_Continue to Enter Primary Contact', async () => {

        await primaryContactPage.VerifyprimaryContactPage();
        //     await primaryContactPage.ClickOnBack();
        //     await orgSignUpPage.EnterOrganizationNameDropDown('Cancer');
        //     await orgSignUpPage.ClickOnConfirm();
        //     await orgSignUpPage.ClickOnNext(1)
        await primaryContactPage.EnterFirstName("Sichu");
        await primaryContactPage.EnterLastName("Kasdet");
        // await primaryContactPage.EnterMiddleInitial("P");
        // await primaryContactPage.EnterPreferedFirstName("Sichu");
        // await primaryContactPage.EnterPreferedLastName("Kichu");
        await primaryContactPage.EnterJobTitle("ProductController");
        await primaryContactPage.EnterEmail("sichu@adadaf.com");
        await primaryContactPage.EnterPhone("1234567896");
        await primaryContactPage.EnterExt("123");
        // await primaryContactPage.EnterFax("1234567556");

        await primaryContactPage.ClickOnNext();
    });
/*
test('TC3_Continue to Add one Accounts ', async () =>
   {
      
      await addAccountsPage.page.pause();

        
    //Nurse - reg nurse [0512426]-np[123445]
        await addAccountsPage.SelectProfession('Nurse',0);
        await addAccountsPage.VerifyNurseList(0);
        await addAccountsPage.SelectNurseCategory('Registered Nurse (RN)',0);
        await addAccountsPage.EnterRegisterNumber("0512426",0);
        await addAccountsPage.ValidateRegisterNumber(0);
        await addAccountsPage.SelectClinicalSpeciality("Audiology",0);
        await addAccountsPage.EnterEmail("test1@test.com",0);
        await addAccountsPage.EnterPhone("1234567896",0);
        await addAccountsPage.EnterExt("123",0);
        // await addAccountsPage.SelectOneIdNo();
        // await addAccountsPage.ClickMoreInfo();
        // await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(0);
        await addAccountsPage.EnterOneIDUsername(0);


    // //MedicalStudent
    //     await addAccountsPage.SelectProfession('Medical Student',0);
    //     await addAccountsPage.EnterLegalFname("christy",0);
    //     await addAccountsPage.EnterLegalLname("John",0);
    //     await addAccountsPage.EnterInitial("H",0);
    //     await addAccountsPage.EnterUniversity("christy",0);
    //     await addAccountsPage.SelectClinicalSpeciality("Nephrology",0);
    //     await addAccountsPage.EnterEmail("test1@test.com",0);
    //     await addAccountsPage.EnterPhone("1234567896",0);
    //     await addAccountsPage.EnterExt("123",0);
    //     // await addAccountsPage.SelectOneIdNo(0);
    //     // await addAccountsPage.ClickMoreInfo(0);
    //     // await addAccountsPage.bringToFront();
    //    // await addAccountsPage.page.pause();
    //     await addAccountsPage.SelectOneIdYes(0);
    //     await addAccountsPage.EnterOneIDUsername(0);


//  //Midwife -2100
        await addAccountsPage.SelectProfession('Midwife',0);
        await addAccountsPage.EnterRegisterNumber("2100",0);
        await addAccountsPage.ValidateRegisterNumber(0);
        await delay(4000)
        await addAccountsPage.EnterOHIPNumber(757575,0);
        await addAccountsPage.EnterEmail("test1@test.com",0);
        await addAccountsPage.EnterPhone("1234567896",0);
        await addAccountsPage.EnterExt("123",0);
        // await addAccountsPage.SelectOneIdNo(0);
        // await addAccountsPage.ClickMoreInfo(0);
        // await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(0);
         await delay(4000);
        await addAccountsPage.EnterOneIDUsername(0);

//  //Telemedicine coordinator-clinical  
//         await addAccountsPage.SelectProfession('Telemedicine Coordinator: Clinical',0);
//         await addAccountsPage.EnterLegalFname("christy",0);
//         await addAccountsPage.EnterLegalLname("John",0);
//         await addAccountsPage.EnterInitial("H",0);
//         await addAccountsPage.EnterEmail("test1@test.com",0);
//         await addAccountsPage.EnterPhone("1234567896",0);
//         await addAccountsPage.EnterExt("123",0);
//         // await addAccountsPage.SelectOneIdNo(0);
//         // await addAccountsPage.ClickMoreInfo(0);
//         // await addAccountsPage.bringToFront();
//         await addAccountsPage.SelectOneIdYes(0);
//         await addAccountsPage.EnterOneIDUsername(0);



    }); */
    
test('TC3_Continue to Add one Accounts 1', async () =>
{
    test.setTimeout(100000);
       // await addAccountsPage.VerifyaddAccountsPage();
       // await addAccountsPage.VerifyProfessionList(0);
        //await addAccountsPage.page.pause();

       
    //Physician
        // await addAccountsPage.SelectProfession('Physician',0);
        // await addAccountsPage.EnterRegisterNumber("55084",0);
        // await addAccountsPage.ValidateRegisterNumber(0);
        // await addAccountsPage.SelectClinicalSpeciality("Anatomical Pathology",0);
        // await addAccountsPage.EnterOHIPNumber(757575,0);
        // await addAccountsPage.EnterEmail("test1@test.com",0);
        // await addAccountsPage.EnterPhone("1234567896",0);
        // await addAccountsPage.EnterExt("123",0);
        // // await addAccountsPage.SelectOneIdNo(0);
        // // await addAccountsPage.ClickMoreInfo(0);
        // // await addAccountsPage.bringToFront();
        // await addAccountsPage.SelectOneIdYes(0);
        // await addAccountsPage.EnterOneIDUsername(0);
        // await addAccountsPage.SelectOneIdNo(0);
        // await addAccountsPage.ClickMoreInfo(0);
        // await addAccountsPage.bringToFront();
        

    //Midwife -2100
        // await addAccountsPage.SelectProfession('Midwife',0);
        // await addAccountsPage.EnterRegisterNumber("2100",0);
        // await addAccountsPage.ValidateRegisterNumber(0);
        // await delay(4000)
        // await addAccountsPage.EnterOHIPNumber(757575,0);
        // await addAccountsPage.EnterEmail("test1@test.com",0);
        // await addAccountsPage.EnterPhone("1234567896",0);
        // await addAccountsPage.EnterExt("123",0);
        // // await addAccountsPage.SelectOneIdNo(0);
        // // await addAccountsPage.ClickMoreInfo(0);
        // // await addAccountsPage.bringToFront();
        // await addAccountsPage.SelectOneIdYes(0);
        //  await delay(4000);
        // await addAccountsPage.EnterOneIDUsername(0);   
        
        
    //Nurse - reg nurse [0512426]-np[123445]
    // await addAccountsPage.page.pause();
    //     await addAccountsPage.SelectProfession('Nurse',0);
    //     await addAccountsPage.VerifyNurseList(0);
    //     await addAccountsPage.SelectNurseCategory('Registered Nurse (RN)',0);
    //     await addAccountsPage.EnterRegisterNumber("0512426",0);
    //     await addAccountsPage.ValidateRegisterNumber(0);
    //     await addAccountsPage.SelectClinicalSpeciality("Audiology",0);
    //    // await delay(4000)
    //     await addAccountsPage.EnterEmail("test1@test.com",0);
    //     await addAccountsPage.EnterPhone("1234567896",0);
    //     await addAccountsPage.EnterExt("123",0);
    //     await addAccountsPage.SelectOneIdNo(0);
    //     await addAccountsPage.ClickMoreInfo(0);
    //     await addAccountsPage.bringToFront();
    //     await addAccountsPage.SelectOneIdYes(0);
    //     await addAccountsPage.EnterOneIDUsername(0);
    //     await addAccountsPage.SelectNurseCategory('Nurse Practitioner (NP)',0);
    //     await addAccountsPage.EnterRegisterNumber("123445",0);
    //     await addAccountsPage.EnterLegalFname("test",0);
    //     await addAccountsPage.EnterLegalLname("testt",0);
    //     await addAccountsPage.SelectClinicalSpeciality("Chipodiatry",0);
    //     await addAccountsPage.EnterOHIPNumber(45667,0);
    //     await addAccountsPage.EnterEmail("test1@test.com",0);
    //     await addAccountsPage.EnterPhone("1234567896",0);
    //     await addAccountsPage.SelectOneIdYes(0);
    //     await addAccountsPage.EnterOneIDUsername(0);
    //     await addAccountsPage.SelectOneIdNo(0);
    //     await addAccountsPage.ClickMoreInfo(0);
    //     await addAccountsPage.bringToFront();


    // //MedicalStudent
        // await addAccountsPage.SelectProfession('Medical Student',0);
        // await addAccountsPage.EnterLegalFname("christy",0);
        // await addAccountsPage.EnterLegalLname("John",0);
        // await addAccountsPage.EnterInitial("H",0);
        // await addAccountsPage.EnterUniversity("TDUniversity",0);
        // await addAccountsPage.SelectClinicalSpeciality("Nephrology",0);
        // await addAccountsPage.EnterEmail("test1@test.com",0);
        // await addAccountsPage.EnterPhone("1234567896",0);
        // await addAccountsPage.EnterExt("123",0);
        // // await addAccountsPage.SelectOneIdNo(0);
        // // await addAccountsPage.ClickMoreInfo(0);
        // // await addAccountsPage.bringToFront();
        // await addAccountsPage.SelectOneIdYes(0);
        // await addAccountsPage.EnterOneIDUsername(0);
        // await addAccountsPage.SelectOneIdNo(0);
        // await addAccountsPage.ClickMoreInfo(0);
        // await addAccountsPage.bringToFront();



    // //Telemedicine coordinator-clinical  
        await addAccountsPage.SelectProfession('Telemedicine Coordinator: Clinical',0);
        await addAccountsPage.EnterLegalFname("christy",0);
        await addAccountsPage.EnterLegalLname("John",0);
        await addAccountsPage.EnterInitial("H",0);
        await addAccountsPage.EnterEmail("test1@test.com",0);
        await addAccountsPage.EnterPhone("1234567896",0);
        await addAccountsPage.EnterExt("123",0);
        // await addAccountsPage.SelectOneIdNo(0);
        // await addAccountsPage.ClickMoreInfo(0);
        // await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(0);
        await addAccountsPage.EnterOneIDUsername(0);
        await addAccountsPage.SelectOneIdNo(0);
        await addAccountsPage.ClickMoreInfo(0);
        await addAccountsPage.bringToFront();


        // await addAccountsPage.ClickOnPrimaryContact();
        // await addAccountsPage.ClickOnAddAccounts();
        // await addAccountsPage.ClickOnAddOTnHubAccount();
        // await addAccountsPage.CloseAddOTnHubAccount();
         //await delay(2000);
        //await addAccountsPage.page.pause();
       // await primaryContactPage.ClickOnBack();
      //  await delay(2000);
      //  await primaryContactPage.ClickOnNext();
        await primaryContactPage.ClickOnNext();
        await delay(3000);

    });
/*
test('TC4_Continue to Add More Accounts 1', async () =>
{
        
      //  await addAccountsPage.page.pause();
     //   await addAccountsPage.VerifyaddAccountsPage();
      //  await addAccountsPage.VerifyProfessionList(0);
       

        
        //Physician
        await addAccountsPage.SelectProfession('Physician',0);
        await addAccountsPage.EnterRegisterNumber("55084",0); //660999
        await addAccountsPage.ValidateRegisterNumber(0);
        await addAccountsPage.SelectClinicalSpeciality("Cardiology",0);
        await addAccountsPage.EnterOHIPNumber(757575,0);
        await addAccountsPage.EnterEmail("test1@test.com",0);
        await addAccountsPage.EnterPhone("1234567896",0);
        await addAccountsPage.EnterExt("123",0);
        await addAccountsPage.SelectOneIdNo(0);
        await addAccountsPage.ClickMoreInfo(0);
        await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(0);
        await addAccountsPage.EnterOneIDUsername(0);
        

        await addAccountsPage.ClickOnAddOTnHubAccount();
        

     //Nurse - reg nurse [0512426]-np[123445]
        await addAccountsPage.SelectProfession('Nurse',1);
        await addAccountsPage.VerifyNurseList(1);
        await addAccountsPage.SelectNurseCategory('Registered Nurse (RN)',1);
        await addAccountsPage.EnterRegisterNumber("0512426",1);
        await addAccountsPage.ValidateRegisterNumber(1);
        await addAccountsPage.SelectClinicalSpeciality("Audiology",1);
        await addAccountsPage.EnterEmail("test1@test.com",1);
        await addAccountsPage.EnterPhone("1234567896",1);
        await addAccountsPage.EnterExt("123",1);
        await addAccountsPage.SelectOneIdNo(1);
        await addAccountsPage.ClickMoreInfo(1);
        await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(1);
        await addAccountsPage.EnterOneIDUsername(1);
        await addAccountsPage.SelectNurseCategory('Nurse Practitioner (NP)',1);
        await addAccountsPage.EnterRegisterNumber("123445",1);
        await addAccountsPage.EnterLegalFname("testFname",1);
        await addAccountsPage.EnterLegalLname("testLname",1);
        await addAccountsPage.SelectClinicalSpeciality("Audiology",1);
        await addAccountsPage.EnterOHIPNumber(45667,1);
        await addAccountsPage.EnterEmail("test1@test.com",1);
        await addAccountsPage.EnterPhone("1234567896",1);
        //await addAccountsPage.page.pause();
        await addAccountsPage.SelectOneIdYes(1);
        await addAccountsPage.EnterOneIDUsername(1);
    
        await addAccountsPage.ClickOnAddOTnHubAccount();
       

});

test('TC5_Continue to Add More Accounts2 ', async () =>
{
        
    //MedicalStudent
       // await addAccountsPage.page.pause();
        await addAccountsPage.SelectProfession('Medical Student',2);
        await addAccountsPage.EnterLegalFname("christy",2);
        await addAccountsPage.EnterLegalLname("John",2);
        await addAccountsPage.EnterInitial("H",2);
        await addAccountsPage.EnterUniversity("TDUniversity",2);
        await addAccountsPage.SelectClinicalSpeciality("Nephrology",2);
        await addAccountsPage.EnterEmail("test1@test.com",2);
        await addAccountsPage.EnterPhone("1234567896",2);
        await addAccountsPage.EnterExt("123",2);
        await addAccountsPage.SelectOneIdNo(2);
        await addAccountsPage.ClickMoreInfo(2);
        await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(2);
        await addAccountsPage.EnterOneIDUsername(2);

        await addAccountsPage.ClickOnAddOTnHubAccount();


 //Midwife -2100
        await addAccountsPage.SelectProfession('Midwife',3);
        await addAccountsPage.EnterRegisterNumber("2100",3);
        //await addAccountsPage.page.pause();
        await addAccountsPage.ValidateRegisterNumber(3);
        await addAccountsPage.EnterOHIPNumber(757575,3);
        await addAccountsPage.EnterEmail("test1@test.com",3);
        await addAccountsPage.EnterPhone("1234567896",3);
        await addAccountsPage.EnterExt("123",3);
        await addAccountsPage.SelectOneIdNo(3);
        await addAccountsPage.ClickMoreInfo(3);
        await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(3);
        await addAccountsPage.EnterOneIDUsername(3);
       
        
        await addAccountsPage.ClickOnAddOTnHubAccount();


    });
    
test('TC6_Continue to Add More Accounts3 ', async () =>
{
        
 //Telemedicine coordinator-clinical  
        await addAccountsPage.SelectProfession('Telemedicine Coordinator: Clinical',4);
        await addAccountsPage.EnterLegalFname("christy",4);
        await addAccountsPage.EnterLegalLname("John",4);
        await addAccountsPage.EnterInitial("H",4);
        await addAccountsPage.EnterEmail("test1@test.com",4);
        await addAccountsPage.EnterPhone("1234567896",4);
        await addAccountsPage.EnterExt("123",4);
        //await addAccountsPage.page.pause();
        await addAccountsPage.SelectOneIdNo(4);
        await addAccountsPage.ClickMoreInfo(4);
        await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(4);
        await addAccountsPage.EnterOneIDUsername(4);

        
      
        await addAccountsPage.ClickOnPrimaryContact();
        await addAccountsPage.ClickOnAddAccounts();
        await addAccountsPage.ClickOnAddOTnHubAccount();
        await addAccountsPage.CloseAddOTnHubAccount();
         //await delay(2000);
        await primaryContactPage.ClickOnBack();
         await delay(3000);
        await primaryContactPage.ClickOnNext();
        

        


    });
    

test('TC7_Submission page ', async () =>
{
 test.setTimeout(200000);
 await submissionPage.page.pause();
        await submissionPage.VerifySubmissionPage();
       // await submissionPage.ClickOnEdit();
       // await submissionPage.ClickOnEditCancelNo();
       // await submissionPage.ClickOnEditCancelYes();
        //await submissionPage.ClickOnEditSave();
       // await submissionPage.ClickOnView();
       // await submissionPage.ClickOnHide();
       // await submissionPage.ClickOnViewEdit();
       // await submissionPage.ClickOnHereLink();
       // await submissionPage.bringToFront();
       // await submissionPage.ClickOnViewSave();
        //await submissionPage.ClickOnViewEdit();
        //await submissionPage.ClickOnCancelNo();
       // await submissionPage.ClickOnCancelYes();
      // await submissionPage.ClickOnNotRobot(); // no need
       await submissionPage.NoCancelSubmission();
       //await submissionPage.YesCancelSubmission();// no need
        
        
       await addAccountsPage.page.pause();
       


});

test('TC8_Submission page Edit Primary Contact ', async () =>
{
 test.setTimeout(200000);
        await submissionPage.VerifySubmissionPage();
        await submissionPage.ClickOnEdit();
       // await submissionPage.EditLegalFname("");

         const firstname ="Sichukk";
         await primaryContactPage.EnterFirstName(firstname);
         await primaryContactPage.EnterLastName("Kasdetkk");
         await primaryContactPage.EnterMiddleInitial("K");
         await primaryContactPage.EnterPreferedFirstName("SK");
         await primaryContactPage.EnterPreferedLastName("sklast");
         await primaryContactPage.EnterJobTitle("Pcc");
         await primaryContactPage.EnterEmail("sichukk@adadaf.com");
         await primaryContactPage.EnterPhone("1234567222");
         await primaryContactPage.EnterExt("456");
         await primaryContactPage.EnterFax("9876435633");
         await submissionPage.ClickOnEditSave();
         await submissionPage.VerifyFirstName(firstname);


});

*/

test('TC9_Submission page Edit User Accounts ', async () =>
{
 test.setTimeout(200000);
  await submissionPage.page.pause();
        await submissionPage.ClickOnViewEdit();

        
//Physician
    //  await addAccountsPage.SelectProfession('Physician',0);
    //     await addAccountsPage.EnterRegisterNumber("55084",0);
    //     await addAccountsPage.ValidateRegisterNumber(0);
    //     await addAccountsPage.SelectClinicalSpeciality("Family / General Practice Medicine",0);
    //     await addAccountsPage.EnterOHIPNumber(7575752,0);
    //     await addAccountsPage.EnterEmail("test12@test.com",0);
    //     await addAccountsPage.EnterPhone("2222222222",0);
    //     await addAccountsPage.EnterExt("122",0);
    //     await addAccountsPage.SelectOneIdNo(0);
    //     await addAccountsPage.ClickMoreInfo(0);
    //     await addAccountsPage.bringToFront();
    //     await addAccountsPage.SelectOneIdYes(0);
    //     await addAccountsPage.EnterOneIDUsername(0);


    // //Midwife -2100
    //     await addAccountsPage.SelectProfession('Midwife',0);
    //     await addAccountsPage.EnterRegisterNumber("2100",0);
    //     await addAccountsPage.ValidateRegisterNumber(0);
    //     await delay(4000)
    //     await addAccountsPage.EnterOHIPNumber(757572,0);
    //     await addAccountsPage.EnterEmail("test12@test.com",0);
    //     await addAccountsPage.EnterPhone("1234567222",0);
    //     await addAccountsPage.EnterExt("122",0);
    //     await addAccountsPage.SelectOneIdNo(0);
    //     await addAccountsPage.ClickMoreInfo(0);
    //     await addAccountsPage.bringToFront();
    //     await addAccountsPage.SelectOneIdYes(0);
    //     await delay(4000);
    //     await addAccountsPage.EnterOneIDUsername(0);   
        
        
 /*
    //Nurse - reg nurse [0512426]-np[123445]
        await addAccountsPage.SelectProfession('Nurse',0);
        await addAccountsPage.VerifyNurseList(0);
        await addAccountsPage.SelectNurseCategory('Registered Nurse (RN)',0);
        await addAccountsPage.EnterRegisterNumber("0512426",0);
        await addAccountsPage.ValidateRegisterNumber(0);
        await addAccountsPage.SelectClinicalSpeciality("Chipodiatry",0);
        await addAccountsPage.EnterEmail("test12@test.com",0);
        await addAccountsPage.EnterPhone("1234567222",0);
        await addAccountsPage.EnterExt("122",0);
        await addAccountsPage.SelectOneIdNo(0);
        await addAccountsPage.ClickMoreInfo(0);
        await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(0);
        await addAccountsPage.EnterOneIDUsername(0);
        await addAccountsPage.SelectNurseCategory('Nurse Practitioner (NP)',0);
        await addAccountsPage.EnterRegisterNumber("123422",0);
        await addAccountsPage.EnterLegalFname("testab",0);
        await addAccountsPage.EnterLegalLname("testtab",0);
        await addAccountsPage.SelectClinicalSpeciality("Denturology",0);
        await addAccountsPage.EnterOHIPNumber(45667,0);
        await addAccountsPage.EnterEmail("test122@test.com",0);
        await addAccountsPage.EnterPhone("1222222222",0);
        await addAccountsPage.SelectOneIdNo(0);
        await addAccountsPage.ClickMoreInfo(0);
        await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(0);
        await addAccountsPage.EnterOneIDUsername(0);
        
*/

    // //MedicalStudent
        // await addAccountsPage.SelectProfession('Medical Student',0);
        // await addAccountsPage.EnterLegalFname("christyab",0);
        // await addAccountsPage.EnterLegalLname("Johnab",0);
        // await addAccountsPage.EnterInitial("B",0);
        // await addAccountsPage.EnterUniversity("TDUniversity",0);
        // await addAccountsPage.SelectClinicalSpeciality("Nephrology",0);
        // await addAccountsPage.EnterEmail("test122@test.com",0);
        // await addAccountsPage.EnterPhone("1234222222",0);
        // await addAccountsPage.EnterExt("122",0);
        // await addAccountsPage.SelectOneIdNo(0);
        // await addAccountsPage.ClickMoreInfo(0);
        // await addAccountsPage.bringToFront();
        // await addAccountsPage.SelectOneIdYes(0);
        // await addAccountsPage.EnterOneIDUsername(0);



    // //Telemedicine coordinator-clinical  
        await addAccountsPage.SelectProfession('Telemedicine Coordinator: Clinical',0);
        await addAccountsPage.EnterLegalFname("christyab",0);
        await addAccountsPage.EnterLegalLname("Johnab",0);
        await addAccountsPage.EnterInitial("B",0);
        await addAccountsPage.EnterEmail("test122@test.com",0);
        await addAccountsPage.EnterPhone("1234567222",0);
        await addAccountsPage.EnterExt("122",0);
        // await addAccountsPage.SelectOneIdNo(0);
        // await addAccountsPage.ClickMoreInfo(0);
        // await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(0);
        await addAccountsPage.EnterOneIDUsername(0);

        await submissionPage.ClickOnViewSave();



});

});

