import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { SharedMethods } from "../Utils/SharedMethods";
//import * as fs from 'fs';
import { sharedData } from '../Utils/SharedMethods';


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export class HomePage 
{
  private sharedMethods: SharedMethods;
  readonly page: Page;
  public CASEID: string = "";
  //Locators
  readonly otnCredentialsButton: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly UserName: Locator;
  readonly SignOut: Locator;
  readonly eConsultlink: Locator;
  readonly reqEconsult: Locator;
  readonly specificProvider: Locator;
  readonly recipient: Locator;
  readonly fName: Locator;
  readonly lName: Locator;
  readonly dob: Locator;
  readonly gender: Locator;
  readonly ohip1: Locator;
  readonly ohip2: Locator;
  readonly requestHistory: Locator;
  readonly requestSend: Locator;
  readonly saveAsDraft: Locator;
  readonly draftSave: Locator;
  readonly waitResponse: Locator;
  readonly waitMoreInfo: Locator
  readonly needAttention: Locator;
  readonly provideConsultLink: Locator;
  readonly TextArea: Locator;
  readonly parent: Locator;
  readonly cards: Locator;
  readonly patientFullName: Locator;
  readonly patientGender: Locator;
  readonly patientAge: Locator;
  readonly caseID: Locator;
 // readonly caseIDInList: Locator;
  readonly UserNameInList: Locator;
  readonly SubmittedInList: Locator;
  readonly CommentInList: Locator;

  readonly timeSpendDropdown: Locator;
  readonly timeSpend: Locator;
  readonly timespendOk: Locator;
  readonly completeLink: Locator;
  readonly completeButton: Locator;
  readonly requestClarificationLink: Locator;
  readonly addNoteLink: Locator;
  readonly noteTextArea: Locator;
  readonly requestMoreInfoLink: Locator;
  readonly secondTextArea: Locator;
  readonly CompleteCheckBox1: Locator;
  readonly CompleteCheckBox2: Locator;
  readonly provideMorInfoLink: Locator;
  readonly cancelLink: Locator;
  readonly cancelButton: Locator;
  readonly returnConsultLink: Locator;
  readonly notAvailableBox: Locator;
  readonly returnButton: Locator;
  readonly consentBox: Locator;
  readonly consentTextArea: Locator;
  readonly fileAttachment: Locator;

  

    constructor(page: Page) 
    {
         this.sharedMethods = new SharedMethods();
    this.page = page;

    this.otnCredentialsButton = page.locator('//*[@id="btnOTNCredentials"]');
    this.userName = page.locator('//*[@id="Ecom_User_eMail"]');
    this.password = page.locator('//*[@id="Ecom_Password"]');
    this.signInButton = page.locator('xpath=//input[@value="Sign In"]');
    this.UserName = page.locator('//div[@aria-label="Surya TestEnv"]');
    this.SignOut = page.locator('//p[normalize-space()="Sign out"]');

    this.eConsultlink = page.locator('xpath=//li[@class="ng-scope"]//span[@class="nav-icon ng-scope"]');
    this.reqEconsult = page.locator('xpath=//button[normalize-space()="Request Consult"]');
    this.specificProvider = page.locator('input[type="radio"][name="position"][value="DIRECT"]')
    this.recipient = page.locator('input[role="combobox"]');
    this.fName = page.locator('xpath=//input[@id="firstName"]');
    this.lName = page.locator('xpath=//input[@id="lastName"]');
    this.dob = page.locator('input[placeholder="YYYY-MM-DD"]');
    this.gender = page.locator('xpath=//input[@value="M"]');
    this.ohip1 = page.locator('input[placeholder="Enter patient OHIP number..."]');
    this.ohip2 = page.locator('input[placeholder="Version code"]');
    this.requestHistory = page.locator('textarea[name="requestNte"]')
    this.requestSend = page.locator('//button[contains(text(),"Send")]');
    this.saveAsDraft = page.locator('//button[normalize-space()="Save as Draft"]');
    this.draftSave = page.locator('//button[normalize-space()="Draft Saved"]');
    this.waitResponse = page.locator('//span[normalize-space()="Waiting for Response"]');
    this.waitMoreInfo = page.locator('//span[normalize-space()="Waiting for More Info"]');
    this.patientFullName = page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(0);
    this.patientGender = this.page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(1);
   // const genderElement = this.page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(1);
    this.patientAge = page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(2);
    this.needAttention = page.getByText('Needs Attention', { exact: false });

    this.parent = page.locator('//div[@class="MuiBox-root css-v2wkp3"]');
    this.cards = this.parent.locator('div.MuiPaper-root.MuiCard-root');
    this.caseID = page.locator('(//p[@class="MuiTypography-root MuiTypography-body2 css-lue9sa"])[1]');

    const card = this.page.locator('.MuiCard-root').nth(0);
   // this.caseIDInList=card.locator('span.MuiTypography-root', { hasText: `Case ID: ${caseID}` })
    this.UserNameInList = card.locator('p.MuiTypography-body2', { hasText: 'TestEnv'});
    this.SubmittedInList = card.locator('span.MuiTypography-body5', { hasText: 'Submitted'});
    this.CommentInList = card.locator('span.MuiTypography-body1b').nth(0);



    this.provideConsultLink = page.getByRole('tab', { name: 'Provide Consult' });
    this.TextArea = page.locator('//textarea').nth(0);
    this.timeSpendDropdown = page.locator('#mui-component-select-timeSpentOnConsult');
    this.timeSpend = page.locator('//li[normalize-space()="6 - 10 minutes"]');
    this.timespendOk = page.locator('//button[normalize-space()="Ok"]');
    this.completeLink = page.getByRole('tab', { name: 'Complete' });
    this.completeButton = page.getByRole('button', { name: 'Complete', exact: true });
    this.requestClarificationLink = page.getByRole('tab', { name: 'Request Clarification' });
    this.addNoteLink = page.getByRole('tab', { name: 'Add Note' });
    //this.addNoteLink = page.locator('//button[normalize-space()="Add Note"]')
    this. noteTextArea = this.page.getByPlaceholder('Enter note......');
    this.requestMoreInfoLink = page.getByRole('tab', { name: 'Request More Info' });
    this.secondTextArea = page.locator('//textarea').nth(2);
    this.CompleteCheckBox1 = page.locator('//input[@name="noOhip"]').nth(0);
    this.CompleteCheckBox2 = page.locator('//input[@name="noOhip"]').nth(1);
    this.provideMorInfoLink = page.getByRole('tab', { name: 'Provide More Info' });
    this.cancelLink = page.getByRole('tab', { name: 'Cancel' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    this.returnConsultLink = page.getByRole('tab', { name: 'Return Consult' });
    this.notAvailableBox = page.locator('//input[@name="notAvailable"]');
    this.returnButton = page.locator('//button[normalize-space()="Return"]');
    this.consentBox = page.locator('(//input[@type="checkbox"])').nth(1);
     this.consentTextArea = page.locator('textarea[name="patientConsent"]')
     this.fileAttachment=page.locator('div[title="Select a file to upload"]')

    }

    //Requester********************************************************************************************
    async navigate() {
        await this.page.goto('https://econsult.testotn.ca');
    }



    async LogOut() 
    {
    await this.UserName.click();
    await this.SignOut.click();
     await delay(8000);
    }

  async ClickOtnCredentialsButton() {

    await this.otnCredentialsButton.click();

  }


  async EnterUsername(user: string) {
    const elm = this.userName;
    await this.sharedMethods.EnterTextBoxValue(elm, user);
  }
  async EnterPassword(passwrd: string) {
    const elm = this.password;
    await this.sharedMethods.EnterTextBoxValue(elm, passwrd);
  }
  async ClickSignIn() {
    await this.signInButton.click();
  }


  async ClickOneConsult() {
    await this.eConsultlink.waitFor({ state: 'visible' });
    this.eConsultlink.click();
  }
  async ClickRequestConsult() {
    await delay(6000);
    await this.reqEconsult.waitFor({ state: 'visible' });
    this.reqEconsult.click();
  }
  async SelectSpecificProvider() {
    await this.specificProvider.waitFor({ state: 'visible' });
    this.specificProvider.click();
  }
  async EnterRecipient(recipient: string) {

    const elm = this.recipient;
    await elm.fill('perf');
    const listbox = this.page.locator('ul[role="listbox"]');
    await expect(listbox).toBeVisible();
    await this.page.getByRole('option', { name: 'Performance testing group, My own company' }).click();

  }
  async EnterPatientFName(fname: string) {

    const elm = this.fName;
    await this.sharedMethods.EnterTextBoxValue(elm, fname);
  }
  async EnterPatientLName(lname: string) {

    const elm = this.lName;
    await this.sharedMethods.EnterTextBoxValue(elm, lname);
  }
  async EnterDOB(dob: string) {

    const elm = this.dob;
    await this.sharedMethods.EnterTextBoxValue(elm, dob);
  }
  async SelectMale() {

    this.gender.click();
  }
  async EnterOHIP(ohip1: string, ohip2: string) {

    const elm = this.ohip1;
    await this.sharedMethods.EnterTextBoxValue(elm, ohip1);
    const elm2 = this.ohip2;
    await this.sharedMethods.EnterTextBoxValue(elm2, ohip2);
  }

  async EnterRequest(request: string) {

    const elm = this.requestHistory;
    await this.sharedMethods.EnterTextBoxValue(elm, request);
  }
  async ClickOnSend() {

    await this.requestSend.waitFor({ state: 'visible' });
    await this.requestSend.click();

  }
    async  ClickOnSaveAsDraf(){
     //await delay(5000);
    //await this.saveAsDraft.waitFor({ state: 'visible' });
    await this.saveAsDraft.click();
    await delay(8000);

  }
    async  ClickOnDraftSaved(){
     //await delay(5000);
    await this.draftSave.waitFor({ state: 'visible' });
    await this.draftSave.click();
    await delay(8000);

  }

  async ClickWaitingforResponse() 
  {
   // await this.page.pause();
    await delay(5000);
    this.waitResponse.click();
  }
  async ClickWaitingforMorInfo() {
    await delay(5000);
    this.waitMoreInfo.click();
  }


  

    async VerifyCaseCreated(fName:string, lName:string, dob:string, gender:string, ohip:string , caseName:string) 
    {

    await this.page.pause();
    const cardCount = await this.cards.count();
    console.log(`Total cases waiting for response is  : ${cardCount}`);

    let found = false;

    for (let i = 0; i < cardCount; i++) {
      const card = this.cards.nth(i);
      await delay(5000);
      await card.click();
      await delay(10000);
      const textLocator = card.locator(
        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
      );

      const text = (await textLocator.first().textContent())?.trim();

      if (text === caseName) 
      {
        found = true;
        //found fname and lname
        console.log(" caseName ok ----------");


        const fullname = this.patientFullName;
        let fullNm = (await fullname.innerText()).trim();
        const [firstName, lastName] = fullNm.split(' ');
        console.log(" firstName, lastName----------"+firstName+lastName);



                // 1. Locate the element

                //const genderElement = this.page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(1);

                // 2. Get the full text content (e.g., ", Male")
                const rawText = await this.patientGender.textContent();
                console.log("rawText----------"+rawText); // Output: Male

                // 3. Clean the text to get just "Male"
                // We replace the comma and any whitespace
                const gender2 = rawText?.replace(',', '').trim();
                console.log(gender2); // Output: Male

                //Calculate years old 
                    // 1. Create the date objects using your 'dob' variable
                        const birthDate = new Date(dob);
                        const today = new Date();

                        // 2. Calculate initial age
                        let calculatedAge = today.getFullYear() - birthDate.getFullYear();

                        // 3. Adjust if birthday hasn't happened yet this year
                        const monthDiff = today.getMonth() - birthDate.getMonth();
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                            calculatedAge--;
                        }

                        // 4. Use the result (e.g., verify it on the eConsult portal)
                        console.log(`Calculated Age for ${dob} is: ${calculatedAge}`);


        if (firstName === fName && lastName === lName && gender === gender2) 
          {
          console.log(`✅ Case successfully created with Patient name ${fullNm} at case index ${i}`);
          //find case id
          this.CASEID = (await this.caseID.innerText()).trim();
          console.log(`Case Id :`, this.CASEID);
          sharedData.CASEID = this.CASEID;
          console.log(`Case Id :`, sharedData.CASEID);
          break;
        }

      }
    }
    expect(found).toBeTruthy();
  }

  // async VerifyCaseCreated1(expectedRequest: string, fname: string, lname: string) {


  //   const cardCount = await this.cards.count();
  //   console.log(`Total cases waiting for response is  : ${cardCount}`);

  //   let found = false;

  //   for (let i = 0; i < cardCount; i++) {
  //     const card = this.cards.nth(i);
  //     await delay(5000);
  //     await card.click();
  //     await delay(10000);
  //     const textLocator = card.locator(
  //       `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
  //     );

  //     const text = (await textLocator.first().textContent())?.trim();

  //     if (text === expectedRequest) {
  //       found = true;
  //       //found fname and lname


  //       const fullname = this.patientFullName;
  //       let fullNm = (await fullname.innerText()).trim();
  //       const [firstName, lastName] = fullNm.split(' ');
  //       if (firstName === fname && lastName === lname) {

  //         console.log(`✅ Case successfully created with Patient name ${fullNm} at case index ${i}`);
  //         //find case id
  //         this.CASEID = (await this.caseID.innerText()).trim();
  //         console.log(`Case Id :`, this.CASEID);

  //         break;
  //       }

  //     }
  //   }

  //   expect(found).toBeTruthy();


  // }

  async ClickNeedsAttention() {
    await delay(5000);
    await this.needAttention.waitFor({ state: 'visible' });
    this.needAttention.click();
  }

  async getCaseDetailsFromList(caseID: string) 
  {

    const cardCount = await this.cards.count();
    console.log(`Total cases Needs Attention is  :${cardCount}`);

    let found = false;

    for (let i = 0; i < cardCount; i++) 
    {
      const card = this.cards.nth(i);
      await delay(5000);
      //let caseid = (await this.page.locator('span.MuiTypography-root', { hasText: `Case ID: ${caseID}` }).innerText()).trim();
             


             let rawText = await this.page.locator('span.MuiTypography-root', { hasText: `Case ID: ${caseID}` }).innerText();

              // Remove the label and trim any leftover spaces
              let caseid = rawText.replace('Case ID:', '').trim(); 

              console.log(caseid); // Result: "331278522"

         if (caseID === caseid) 
        {
            found = true;
            sharedData.CASEIndex = i;
            console.log(`Case found at index ${sharedData.CASEIndex}`);

              let fullUserName = await this.UserNameInList.innerText();
              let UserName = fullUserName.split('|')[0].trim();
              sharedData.CASEUserName=UserName;
              console.log(`User Name in List :`, sharedData.CASEUserName);

            let SubmitedDate = (await this.SubmittedInList.innerText()).trim();
            sharedData.CASESubmittedDate=SubmitedDate;  
            console.log(`Submited Date in List :`, sharedData.CASESubmittedDate);

              let Comment = (await this.CommentInList.innerText()).trim();
              sharedData.CASEComment=Comment;
              console.log(`Comment in List :`, sharedData.CASEComment);
              break;
          }


    }
    expect(found).toBeTruthy();
    return true;
  }

// async getCaseByCaseId(caseID: string) 
//   {


//     const cardCount = await this.cards.count();
//     console.log(`Total cases Needs Attention is  :${cardCount}`);

//     let found = false;

//     for (let i = 0; i < cardCount; i++) 
//     {
//       const card = this.cards.nth(i);
//       await delay(5000);
//       // await card.click();
//       // await delay(8000);

//        //let caseid = (await this.caseID.innerText()).trim();
//        let caseid = (await this.caseIDInList.innerText()).trim();
//       console.log(`Case Id :`, caseid);
//       if (caseID === caseid) 
//         {
//         found = true;
//         sharedData.CASEIndex = i;
//         console.log(`Case found at case index ${i}`);

//         break;
//       }

//     }
//     expect(found).toBeTruthy();
//     return true;
//   }
  
  async getAddNote() {


    await this.addNoteLink.click();

    return await this.noteTextArea.inputValue();
  }

  async HoverElement(buttonText:string) 
  {
     // await this.page.getByRole('tab', { name: buttonText }).hover();
      //this.page.locator('(//button[normalize-space()='+buttonText+'])[1]');

      await this.addNoteLink.hover();

  }
   async VerifyAddNotetooltip(toolTip:string) 
  {
    console.log("toolTip",toolTip);
     await expect(this.addNoteLink).toHaveAttribute('title', toolTip);
      await delay(10000);

  }

   async VerifyDraftNotVisible(draftNote:string) 
  {
    const noteText = this.page.getByText(draftNote);
      
      // This will wait and pass only if the text is NOT found
      await expect(noteText).not.toBeVisible();

  }
    
    















  async ProvideConsult(comment: string, time: string) {
    //provide consultation for each non attenton case
    const validCases = [
      "Creating cases for Performance testing - Provide consult",
      "Creating cases for Performance testing - Complete Case",
      "Creating cases for Performance testing - Request Clarifications",
      "Creating cases for Performance testing - Add note after  Request Clarification",
    ];


    let cardCount = await this.cards.count();
    console.log(`Total cases Needs Attention is  :${cardCount}`);
    if (cardCount === 0) {

      return;

    }

    let found = false;
    let i = 0;
    for (i = 0; i < cardCount; i++) 
      {
          const card = this.cards.nth(i);
          await delay(5000);
          const textLocator = card.locator(
            `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
          );

          const text = (await textLocator.first().textContent())?.trim();
          if (text && validCases.includes(text)) {
            found = true;
            await card.click();
            await delay(8000);
            await this.provideConsultLink.waitFor({ state: 'visible' });
            await this.provideConsultLink.click();
            await this.TextArea.waitFor({ state: 'visible' });
            const elm = this.TextArea;
            await delay(3000);
            await this.sharedMethods.EnterTextBoxValue(elm, comment);
            await delay(3000);
            await this.ClickOnSend();
            await delay(15000);
            await this.SelectTimeSpend(time);
            await delay(15000);
            console.log("Specialist provided Consultation");
            console.log("Case : ", text);
            found = false;
            await this.ClickNeedsAttention();
            await delay(10000);
            break;

          }
    }
    if (cardCount > 1 && found === false && i < cardCount) {

      await this.ProvideConsult(comment, time);

    }
  }

  async SelectTimeSpend(timeSpend: string) {
    await this.timeSpendDropdown.click()
    await delay(3000);
    const timeoption = this.page.locator(`//li[normalize-space()="${timeSpend}"]`);
    await timeoption.click();
    await this.timespendOk.click();



  }
  async CaseComplete(caseName: string, feedback1: string, feedback2: string) {
    //case completed for consultation provided case

    const cardCount = await this.cards.count();
    console.log(`Total cases Needs Attention is    : ${cardCount}`);
    if (cardCount === 0) {

      return;

    }
    let found = false;

    for (let i = 0; i < cardCount; i++) {
      const card = this.cards.nth(i);
      await delay(5000);

      const textLocator = card.locator(
        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
      );

      const text = (await textLocator.first().textContent())?.trim();
      if (text === caseName) {
        found = true;
        await card.click();
        await delay(8000);
        await this.completeLink.click();
        const elm = this.TextArea;
        await this.sharedMethods.EnterTextBoxValue(elm, feedback1);
        const elm2 = this.secondTextArea;
        await this.sharedMethods.EnterTextBoxValue(elm2, feedback2);
        await this.SelectCheckBoxes();
        await this.ClickOnComplete();
        await delay(10000);
        console.log("Requester completed the case");
        console.log("Case : ", text);
        break;
        // }
      }
    }

  }
  async SelectCheckBoxes() {

    await this.CompleteCheckBox1.click();
    await this.CompleteCheckBox2.click();

  }
  async ClickOnComplete() {

    await this.completeButton.click();
    await delay(5000);


  }
  async RequestClarification(caseName: string, comment: string) {


    const cardCount = await this.cards.count();
    console.log(`Total cases Needs Attention is  :${cardCount}`);
    if (cardCount === 0) {

      return;

    }

    let found = false;

    for (let i = 0; i < cardCount; i++) {
      const card = this.cards.nth(i);
      await delay(5000);

      const textLocator = card.locator(
        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
      );
      await delay(5000);
      const text = (await textLocator.first().textContent())?.trim();
      if (text === caseName) {

        found = true;
        await card.click();
        await delay(10000);
        await this.requestClarificationLink.waitFor({ state: 'visible' });
        await this.requestClarificationLink.click();
        const elm = this.TextArea;
        await this.sharedMethods.EnterTextBoxValue(elm, comment);
        await delay(3000);
        await this.ClickOnSend();
        console.log("Requester sent request clarification");
        console.log("Case : ", text);
        break;
      }

    }
  }
  async AddNote(caseName: string, comment: string) 
  {

     //await this.page.pause();   
    // const cardCount = await this.cards.count();
    // console.log(`Total cases waiting for response is   :${cardCount}`);
    // if (cardCount === 0) {
    //   return;

    // }
    // let found = false;

    // for (let i = 0; i < cardCount; i++) {
    //   const card = this.cards.nth(i);
    //   await delay(5000);

    //   const textLocator = card.locator(
    //     `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
    //   );

    //   const text = (await textLocator.first().textContent())?.trim();
    //   if (text === caseName) {
    //     found = true;
    //     await card.click();
         await delay(8000);
        await this.addNoteLink.click();
        const elm = this.TextArea;
        await this.sharedMethods.EnterTextBoxValue(elm, comment);
        await delay(5000);
        await elm.press('Enter');
        //await delay(3000);
        // if(caseName.includes("Add Draft Note"))
        // {
          // await this.ClickOnSaveAsDraf();
           //await this.ClickOnDraftSaved();
        // }
        // else
        // {
        //   await this.ClickOnSend();

        // }
        
        console.log("Requester added notes");
        console.log("Case : ", caseName);
        //break;
      //}

    //}

  }

  async AddNote2(caseName: string, comment: string, time: string) {

    const cardCount = await this.cards.count();
    console.log(`Total cases waiting for response is  :${cardCount}`);

    let found = false;

    for (let i = 0; i < cardCount; i++) {
      const card = this.cards.nth(i);
      await delay(5000);

      const textLocator = card.locator(
        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
      );

      const text = (await textLocator.first().textContent())?.trim();
      if (text === caseName) {
        found = true;

        await card.click();
        await delay(8000);
        await this.addNoteLink.click();
        const elm = this.TextArea;
        await this.sharedMethods.EnterTextBoxValue(elm, comment);
        await delay(3000);

        await this.ClickOnSend();
        await delay(15000);
        await this.SelectTimeSpend(time);
        await delay(15000);
        console.log("Specialist added note");
        console.log("Case : ", text);
        break;
      }

    }

  }
  async ProvideMoreInfo(caseName: string, comment: string) {


    const cardCount = await this.cards.count();
    console.log(`Total cases waiting for response is   :${cardCount}`);
    if (cardCount === 0) {

      return;

    }
    let found = false;

    for (let i = 0; i < cardCount; i++) {
      const card = this.cards.nth(i);
      await delay(5000);

      const textLocator = card.locator(
        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
      );

      const text = (await textLocator.first().textContent())?.trim();
      if (text === caseName) {
        found = true;
        await card.click();
        await delay(8000);

        await this.provideMorInfoLink.click();
        const elm = this.TextArea;
        await this.sharedMethods.EnterTextBoxValue(elm, comment);
        await delay(8000);
        await this.ClickOnSend();
        console.log("Requester sent provide more information");
        console.log("Case : ", text);
        break;
      }



    }

  }



  async CancelCase(caseName: string, comment: string) {

    const cardCount = await this.cards.count();
    console.log(`Total cases Needs Attention is  :${cardCount}`);
    if (cardCount === 0) {

      return;

    }
    let found = false;

    for (let i = 0; i < cardCount; i++) {
      const card = this.cards.nth(i);
      await delay(5000);

      const textLocator = card.locator(
        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
      );

      const text = (await textLocator.first().textContent())?.trim();
      if (text === caseName) {
        found = true;
        await card.click();
        await delay(8000);

        await this.cancelLink.click();
        const elm = this.TextArea;
        await this.sharedMethods.EnterTextBoxValue(elm, comment);
        await delay(3000);
        await this.SelectCheckBoxes();
        console.log("Requester cancel the case");
        console.log("Case : ", text);
        await this.ClickOnCancel();


        break;

      }
    }

  }
  async ClickOnCancel() {
    await this.cancelButton.waitFor({ state: 'visible' });
    await this.cancelButton.click();
    await delay(5000);

  }



  async RequestMoreInfo(comment: string, time: string) {

    const validCases = [
      "Creating cases for Performance testing - Request More Information",
      "Creating cases for Performance testing - Add Note after Request More Information",
      "Creating cases for Performance testing - Provide More Information",
      "Creating cases for Performance testing - Cancel",
    ];


    let cardCount = await this.cards.count();
    console.log(`Total cases Needs Attention is  :${cardCount}`);
    if (cardCount === 0) {

      return;

    }

    let found = false;
    let i = 0;
    for (i = 0; i < cardCount; i++) {
      const card = this.cards.nth(i);
      await delay(5000);
      const textLocator = card.locator(
        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
      );

      const text = (await textLocator.first().textContent())?.trim();
      if (text && validCases.includes(text)) {
        found = true;

        await card.click();
        await delay(8000);
        await this.requestMoreInfoLink.waitFor({ state: 'visible' });
        await this.requestMoreInfoLink.click();
        await this.TextArea.waitFor({ state: 'visible' });
        const elm = this.TextArea;
        await delay(3000);
        await this.sharedMethods.EnterTextBoxValue(elm, comment);
        await delay(3000);
        await this.ClickOnSend();
        await delay(15000);
        await this.SelectTimeSpend(time);
        await delay(15000);
        console.log("Specialist request more information");
        console.log("Case : ", text);
        found = false;
        await this.ClickNeedsAttention();
        await delay(10000);
        break;

      }
    }
    if (cardCount > 1 && found === false && i < cardCount) {

      await this.RequestMoreInfo(comment, time);

    }
  }

  async ReturnConsult(caseName: string) {

    const cardCount = await this.cards.count();
    console.log(`Total cases waiting for response is  :${cardCount}`);

    let found = false;

    for (let i = 0; i < cardCount; i++) {
      const card = this.cards.nth(i);
      await delay(5000);

      const textLocator = card.locator(
        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
      );

      const text = (await textLocator.first().textContent())?.trim();
      if (text === caseName) {
        found = true;

        await card.click();
        await delay(8000);
        await this.returnConsultLink.click();
        await this.notAvailableBox.click();
        await this.returnButton.click();
        await delay(15000);
        console.log("Specialist Return consult");
        console.log("Case : ", text);
        break;
      }

    }

  }
  async SelectConsentDirectives() {

    await this.consentBox.click();
    await delay(3000);


  }

 async EnterConsent(consent: string) {

    const elm = this.consentTextArea;
    await this.sharedMethods.EnterTextBoxValue(elm, consent);
  }

   async attachFile(filename: string) 
   {

// 1. Start waiting for the file chooser before clicking
const fileChooserPromise = this.page.waitForEvent('filechooser');

// 2. Click the image element that triggers the upload
// Using the 'alt' text is often the most reliable way to target images
await this.page.getByAltText('Attach files').click();

// 3. Wait for the file chooser and set the file path
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles('C:\\Users\\surya.krishnan\\OneDrive - Ontario Health\\Desktop\\patientHistory.txt');





  }



}