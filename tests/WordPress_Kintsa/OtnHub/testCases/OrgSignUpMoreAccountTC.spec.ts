import { test } from "../Utils/HomePageSetup";
import { OrgSignUpPage } from "../pageObjects/OrgSignUpPage";
import { PrimaryContactPage } from "../pageObjects/PrimaryContactPage";
import { AddAccountsPage } from "../pageObjects/AddAccountsPage";
import { SubmissionPage } from "../pageObjects/SubmisionPage";



let orgSignUpPage: OrgSignUpPage;
let primaryContactPage: PrimaryContactPage;
let addAccountsPage: AddAccountsPage;
let submissionPage: SubmissionPage;
let professionValue="";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Use serial to ensure test2 runs after test1.Test suite1
test.describe.serial('Org SignUp and Details Flow', () => 
{

    test.beforeAll(async ({ homePage, context }) => {
        orgSignUpPage = new OrgSignUpPage(homePage, context);
        primaryContactPage = new PrimaryContactPage(homePage);
        addAccountsPage = new AddAccountsPage(homePage);
        submissionPage = new SubmissionPage(homePage);
    });

    test('TC1_OrgSignUp page1 Enter Org_Name', async () => 
    {
        await delay(1000);
        test.setTimeout(100000);
        await orgSignUpPage.EnterOrganizationNameDropDown('Cancer');
        await orgSignUpPage.ClickOnConfirm();
        await orgSignUpPage.ClickOnNext(1);
    });

    test('TC2_Continue to Enter Primary Contact', async () => 
    {

        await primaryContactPage.EnterFirstName("Sichu");
        await primaryContactPage.EnterLastName("Kasdet");
        await primaryContactPage.EnterMiddleInitial("P");
        await primaryContactPage.EnterPreferedFirstName("Sichu");
        await primaryContactPage.EnterPreferedLastName("Kichu");
        await primaryContactPage.EnterJobTitle("ProductController");
        await primaryContactPage.EnterEmail("sichu@adadaf.com");
        await primaryContactPage.EnterPhone("1234567896");
        await primaryContactPage.EnterExt("123");
        await primaryContactPage.EnterFax("1234567556");

        await primaryContactPage.ClickOnNext();
    });

    
    test('TC4_Continue to Add More Accounts 1', async () =>
{
        
         
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
        await addAccountsPage.SelectOneIdNo(4);
        await addAccountsPage.ClickMoreInfo(4);
        await addAccountsPage.bringToFront();
        await addAccountsPage.SelectOneIdYes(4);
        await addAccountsPage.EnterOneIDUsername(4);
       
        await primaryContactPage.ClickOnNext();
        //await addAccountsPage.page.pause();
        
    });
    

    test('TC8_Submission page Edit Primary Contact ', async () =>
    {
        test.setTimeout(200000);
            //  await addAccountsPage.page.pause();
            await submissionPage.VerifySubmissionPage();
            await delay(4000);
            await submissionPage.ClickOnEdit();
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



     test('TC9_Submission page Edit User Accounts ', async () =>
    {
    test.setTimeout(200000);
    
            
            console.log("professionValue-------",professionValue);

                //Physician
                        await submissionPage.ClickOnViewEdit(0);
                        await addAccountsPage.SelectProfession('Physician',0);
                        await addAccountsPage.EnterRegisterNumber("55084",0);
                        await addAccountsPage.ValidateRegisterNumber(0);
                        await addAccountsPage.SelectClinicalSpeciality("Family / General Practice Medicine",0);
                        await addAccountsPage.EnterOHIPNumber(7575752,0);
                        await addAccountsPage.EnterEmail("test12@test.com",0);
                        await addAccountsPage.EnterPhone("2222222222",0);
                        await addAccountsPage.EnterExt("122",0);
                        await addAccountsPage.SelectOneIdNo(0);
                        await addAccountsPage.ClickMoreInfo(0);
                        await addAccountsPage.bringToFront();
                        await addAccountsPage.SelectOneIdYes(0);
                        await addAccountsPage.EnterOneIDUsername(0);
                        await submissionPage.ClickOnViewSave(0);
                        await submissionPage.ClickOnHide(0);
                       // await submissionPage.page.pause();

             //Nurse - reg nurse [0512426]-np[123445]
                    await submissionPage.ClickOnViewEdit(1);
                    await addAccountsPage.SelectProfession('Nurse',1);
                    //await addAccountsPage.VerifyNurseList(1); // no need
                    await addAccountsPage.SelectNurseCategory('Registered Nurse (RN)',1);
                    await addAccountsPage.EnterRegisterNumber("0512426",1);
                    await addAccountsPage.ValidateRegisterNumber(1);
                    await addAccountsPage.SelectClinicalSpeciality("Chipodiatry",1);
                    await addAccountsPage.EnterEmail("test12@test.com",1);
                    await addAccountsPage.EnterPhone("1234567222",1);
                    await addAccountsPage.EnterExt("122",1);
                    await addAccountsPage.SelectOneIdNo(1);
                    await addAccountsPage.ClickMoreInfo(1);
                    await addAccountsPage.bringToFront();
                    await addAccountsPage.SelectOneIdYes(1);
                    await addAccountsPage.EnterOneIDUsername(1);
                    await addAccountsPage.SelectNurseCategory('Nurse Practitioner (NP)',1);
                    await addAccountsPage.EnterRegisterNumber("123422",1);
                    await addAccountsPage.EnterLegalFname("testab",1);
                    await addAccountsPage.EnterLegalLname("testtab",1);
                    await addAccountsPage.SelectClinicalSpeciality("Denturology",1);
                    await addAccountsPage.EnterOHIPNumber(45667,1);
                    await addAccountsPage.EnterEmail("test122@test.com",1);
                    await addAccountsPage.EnterPhone("1222222222",1);
                    await addAccountsPage.SelectOneIdNo(1);
                    await addAccountsPage.ClickMoreInfo(1);
                    await addAccountsPage.bringToFront();
                    await addAccountsPage.SelectOneIdYes(1);
                    await addAccountsPage.EnterOneIDUsername(1);
                    await submissionPage.ClickOnViewSave(1);
                    await submissionPage.ClickOnHide(1);
                    //await submissionPage.page.pause();


             // //MedicalStudent
                    await submissionPage.ClickOnViewEdit(2);
                    await addAccountsPage.SelectProfession('Medical Student',2);
                    await addAccountsPage.EnterLegalFname("christyab",2);
                    await addAccountsPage.EnterLegalLname("Johnab",2);
                    await addAccountsPage.EnterInitial("B",2);
                    await addAccountsPage.EnterUniversity("TDUniversity",2);
                    await addAccountsPage.SelectClinicalSpeciality("Nephrology",2);
                    await addAccountsPage.EnterEmail("test122@test.com",2);
                    await addAccountsPage.EnterPhone("1234222222",2);
                    await addAccountsPage.EnterExt("122",2);
                    await addAccountsPage.SelectOneIdNo(2);
                    await addAccountsPage.ClickMoreInfo(2);
                    await addAccountsPage.bringToFront();
                    await addAccountsPage.SelectOneIdYes(2);
                    await addAccountsPage.EnterOneIDUsername(2);
                    await submissionPage.ClickOnViewSave(2);
                    await submissionPage.ClickOnHide(2);
                  //  await submissionPage.page.pause();
           //Midwife -2100
                    await submissionPage.ClickOnViewEdit(3);
                    await addAccountsPage.SelectProfession('Midwife',3);
                    await addAccountsPage.EnterRegisterNumber("2100",3);
                    await addAccountsPage.ValidateRegisterNumber(3);
                    await delay(4000)
                    await addAccountsPage.EnterOHIPNumber(757572,3);
                    await addAccountsPage.EnterEmail("test12@test.com",3);
                    await addAccountsPage.EnterPhone("1234567222",3);
                    await addAccountsPage.EnterExt("122",3);
                    await addAccountsPage.SelectOneIdNo(3);
                    await addAccountsPage.ClickMoreInfo(3);
                    await addAccountsPage.bringToFront();
                    await addAccountsPage.SelectOneIdYes(3);
                    await delay(4000);
                    await addAccountsPage.EnterOneIDUsername(3);  
                    await submissionPage.ClickOnViewSave(3);
                    await submissionPage.ClickOnHide(3);

         //Telemedicine coordinator-clinical  
                    await submissionPage.ClickOnViewEdit(4);
                    await addAccountsPage.SelectProfession('Telemedicine Coordinator: Clinical',4);
                    await addAccountsPage.EnterLegalFname("christyab",4);
                    await addAccountsPage.EnterLegalLname("Johnab",4);
                    await addAccountsPage.EnterInitial("B",4);
                    await addAccountsPage.EnterEmail("test122@test.com",4);
                    await addAccountsPage.EnterPhone("1234567222",4);
                    await addAccountsPage.EnterExt("122",4);
                    await addAccountsPage.SelectOneIdNo(4);
                    await addAccountsPage.ClickMoreInfo(4);
                    await addAccountsPage.bringToFront();
                    await addAccountsPage.SelectOneIdYes(4);
                    await addAccountsPage.EnterOneIDUsername(4);
                    await submissionPage.ClickOnViewSave(4);
                    await submissionPage.ClickOnHide(4);


    });  

});

