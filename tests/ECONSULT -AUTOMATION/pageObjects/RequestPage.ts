import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { SharedMethods } from "../Utils/SharedMethods";
//import * as fs from 'fs';
import { sharedData } from '../Utils/SharedMethods';

//import path from 'path';


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export class RequestPage {
  private sharedMethods: SharedMethods;
  readonly page: Page;
  public CASEID: string = "";


  //Locators
  readonly caseID: Locator;
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
  readonly waitResponse: Locator;
  readonly needsAttention: Locator;
  readonly cards: Locator;
  readonly programName: Locator;
  readonly patientFullName: Locator;
  readonly patientGender: Locator;
  readonly patientAge: Locator;
  readonly addNoteLink: Locator;
  readonly TextArea: Locator;
  readonly saveAsDraft: Locator;
  readonly noteTextArea: Locator;
  readonly parent: Locator;
  readonly dateTime: Locator;
  readonly caseUserName: Locator;
  readonly caseDate: Locator;
  readonly caseFile: Locator;
  readonly draftcaseFile: Locator;
  readonly redirectLink: Locator;
  readonly cancelLink: Locator;
  readonly selectSpecialist: Locator;
  readonly AssignButton: Locator;






  constructor(page: Page) {
    this.sharedMethods = new SharedMethods();
    this.page = page;

    this.reqEconsult = page.locator('xpath=//button[normalize-space()="Request Consult"]');
    this.caseID = page.locator('(//p[@class="MuiTypography-root MuiTypography-body2 css-lue9sa"])[1]');
    this.specificProvider = page.locator('input[type="radio"][name="position"][value="DIRECT"]');
    //this.recipient = page.locator('input[role="combobox"]');
    this.recipient = page.getByPlaceholder('Search for Specialist or Specialty Group...')
    this.fName = page.locator('xpath=//input[@id="firstName"]');
    this.lName = page.locator('xpath=//input[@id="lastName"]');
    this.dob = page.locator('input[placeholder="YYYY-MM-DD"]');
    this.gender = page.locator('xpath=//input[@value="M"]');
    this.ohip1 = page.locator('input[placeholder="Enter patient OHIP number..."]');
    this.ohip2 = page.locator('input[placeholder="Version code"]');
    this.requestHistory = page.locator('textarea[name="requestNte"]')
    // this.requestSend = page.locator('//button[contains(text(),"Send")]');
    this.requestSend = page.locator('//button[normalize-space()="Send"]');


    this.caseUserName = page.locator('//div[contains(@class, "MuiStack-root css-1xhj18k")]/div/p').nth(0);
    this.caseDate = page.locator('//div[contains(@class, "MuiStack-root css-1xhj18k")]/p').nth(0);
    this.draftcaseFile = page.locator('//p[contains(@class, "MuiTypography-root MuiTypography-body2 css-yaiv84")]');
    this.caseFile = page.locator('button.MuiButton-root.MuiButton-textPrimary').nth(1);


    //this.caseFile=page.locator('//button[contains(text(), ".txt")]')


    this.saveAsDraft = page.locator('//button[normalize-space()="Save as Draft"]');
    this.waitResponse = page.locator('//span[normalize-space()="Waiting for Response"]');
    //this.needsAttention = page.locator('//span[normalize-space()="Needs Attention"]');
    this.needsAttention = page.locator('//span[contains(text(),"Needs Attention")]');

    this.programName = page.locator('//div[p[text()="Group"]]/following-sibling::div//a/p').nth(0);
    this.patientFullName = page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(0);
    this.patientGender = this.page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(1);
    this.patientAge = page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(2);
    this.parent = page.locator('//div[@class="MuiBox-root css-v2wkp3"]');
    this.cards = this.parent.locator('div.MuiPaper-root.MuiCard-root');
    const card = this.page.locator('.MuiCard-root').nth(0);
    this.TextArea = page.locator('//textarea').nth(0);
    this.addNoteLink = page.getByRole('tab', { name: 'Add Note' });
    this.noteTextArea = this.page.getByPlaceholder('Enter note......');
    this.dateTime = page.locator('//p[contains(text(), "submitted new case")]/parent::div/following-sibling::p');
    // this.attachment = page.locator('div[title="Select a file to upload"]');
    // this.dragDrop = page.locator('div[title="Select a file to upload"]');
    this.redirectLink=page.locator('[id*="T-redirect"]');
    this.cancelLink=page.locator('[id*="T-cancel"]');
    this.selectSpecialist = page.locator('//p[contains(text(),"Select a specialist")]').nth(0);
    this.AssignButton = page.locator('//button[contains(text(),"Assign")]');
    


//button[@id='mui-p-47260-T-cancel']

  }

  async ClickRequestConsult() {

    await this.reqEconsult.waitFor({ state: 'visible' });
    this.reqEconsult.click();

  }

  async SelectSpecificProvider() {
    await this.specificProvider.waitFor({ state: 'visible' });
    this.specificProvider.click();
  }

  async FillAndSelect(recipient1: string) 
  {
    const elm = this.recipient;
    await elm.fill(recipient1);
    if (recipient1 === "lily") {
      await this.page.getByRole('option', { name: /Dr Lily TwentyThree Lily Spec TwentyThree/ }).click();
      
    }
    else if (recipient1 === "automation") {
      await this.page.getByRole('option', { name: /Program for automation testing, Umbrella Health/ }).click();
    }
    else if (recipient1 === "Group for automation") {
      await this.page.getByRole('option', { name: /Group for automation testing, Umbrella Health/ }).click();
    }
    else {
      console.log("Recipient not found in the list");
    }
  }
   async SelectDropdown(arg1: string) 
  {
      
       if (arg1 === "Dr. Lily") 
        {   const elm = this.selectSpecialist;
           await this.sharedMethods.ClickButton(elm);
           await this.page.getByRole('option', { name: /Dr\. Lily TwentyThree Lily Spec TwentyThree.*/ }).click();
        }
  
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
    //await this.page.waitForTimeout(5000);

  }
  async ClickWaitingforResponse() {
    // await this.page.pause();
    await delay(8000);
    this.waitResponse.click();
  }

  async ClickNeedsAttention() {
   // await this.page.pause();
    await delay(8000);
    await this.needsAttention.click();
  }

  async VerifyCaseCreated(caseType: string, fName: string, lName: string, dob: string, gender: string, ohip: string, caseName: string) {

    //await this.page.pause();
    const cardCount = await this.cards.count();
    //console.log(`Total cases  : ${cardCount}`);

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
      // console.log("Case Name from the card is : ", text);
      // console.log("Case Name from the card is : ", caseName);

      if (text === caseName) {
        found = true;
        sharedData.CASEName = caseName;
        //console.log(" sharedData.CASEName-------------------", sharedData.CASEName);




        let fullText = await this.page.locator('//p[contains(text(), "submitted new case")]').textContent();
        let userName = fullText?.replace('submitted new case', '').trim() ?? '';
        sharedData.CASEUserName = userName;
       // console.log("sharedData.CASEUserName", sharedData.CASEUserName);


        const dateLocator = this.dateTime;
        const dateTime = (await dateLocator.innerText()).trim();
        //console.log("dateTime-------------------", dateTime); // "Apr 08, 2026 3:43 PM"
        sharedData.CASECreatedDateTime = dateTime;
        //console.log(" sharedData.CASECreatedDateTime-------------------", sharedData.CASECreatedDateTime);

        //found programname
        const programName = this.page.locator('//div[p[text()="' + caseType + '"]]/following-sibling::div//a/p').nth(0);
        let pNm = (await programName.innerText()).trim();
        //console.log(" programeName----------" + pNm);
        sharedData.CASEProgramName = pNm;
        //console.log(" sharedData.CASEProgramName-------------------", sharedData.CASEProgramName);


        //found fname and lname
       // console.log(" caseName ok ----------");
        const fullname = this.patientFullName;
        let fullNm = (await fullname.innerText()).trim();
        const [firstName, lastName] = fullNm.split(' ');
       // console.log(" firstName, lastName----------" + firstName + lastName);
        sharedData.CASEPatientName = fullNm;
        //console.log(" sharedData.CASEPatientName-------------------", sharedData.CASEPatientName);


        const rawText = await this.patientGender.textContent();
       // console.log("rawText----------" + rawText); // Output: Male


        const gender2 = rawText?.replace(',', '').trim() ?? '';

        sharedData.CASEPatientGender = gender2;
        //console.log("gender -------", sharedData.CASEPatientGender); // Output: Male



        const birthDate = new Date(dob);
        const today = new Date();


        let calculatedAge = today.getFullYear() - birthDate.getFullYear();


        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }


       // console.log(`Calculated Age for ${dob} is: ${calculatedAge}`);
        sharedData.CASEAge = calculatedAge.toString();
        //console.log("sharedData.CASEAge-------------------", sharedData.CASEAge);


        if (firstName === fName && lastName === lName && gender === gender2) {
          console.log(`✅ Case successfully created with Patient name ${fullNm} at case index ${i}`);
          //find case id
          this.CASEID = (await this.caseID.innerText()).trim();
          console.log(`Case Id :`, this.CASEID);
          sharedData.CASEID = this.CASEID;
         // console.log(`Case Id :`, sharedData.CASEID);
          break;
        }

      }
    }
    expect(found).toBeTruthy();
  }
  async VerifyOptions(arg1: string, arg2?: string, arg3?: string) 
  {
    if(arg2 === "Add note")
    {
      const addNote = this.addNoteLink;
      await expect(addNote).toBeVisible();
    }
    if(arg2 === "Re-direct")
    {
      const redirect = this.redirectLink;
      await expect(redirect).toBeVisible();
    }
     if(arg3 === "Re-direct")
    {
      const redirect = this.redirectLink;
      await expect(redirect).toBeVisible();
    }

    const cancel = this.cancelLink;
    await expect(cancel).toBeVisible();

  }
  async HoverElement(buttonText: string) {

    await this.addNoteLink.hover();

  }
  async VerifyAddNotetooltip(toolTip: string) {
   // console.log("toolTip", toolTip);
    await expect(this.addNoteLink).toHaveAttribute('title', toolTip);
    await delay(10000);

  }


  async ClickOnButton(buttonText: string) {

    await this.page.getByRole('tab', { name: `${buttonText}` }).click();

  }
  async AddNote(comment: string, caseName: string) {


    const elm = this.TextArea;
    await this.sharedMethods.EnterTextBoxValue(elm, comment);
    //await delay(1000);
    await elm.press('Enter');
    console.log("Added notes");
    //console.log("Case : ", caseName);

  }

  async AddAttachment(fileName: string) {

    const fileName2 = fileName.split('\\').pop() ?? ''; // The ?? '' ensures the result is ALWAYS a string, never undefined
    //console.log(fileName2); // This will be "Patient1.txt"
    sharedData.CASEFileName = fileName2;

   // console.log("sharedData.CASEFileName-------------------", sharedData.CASEFileName);
    await this.page.setInputFiles('#fileUpload', fileName);
    //await this.page.waitForTimeout(35000);

  }

  async ClickOnSaveAsDraf() {
    //await delay(5000);
    //await this.saveAsDraft.waitFor({ state: 'visible' });
    await this.saveAsDraft.click();
    //await this.page.waitForTimeout(5000);


  }
  async ClickOnCase(caseID: string) {

    let rawText = await this.page.locator('span.MuiTypography-root', { hasText: `Case ID: ${caseID}` }).innerText();

    // Remove the label and trim any leftover spaces
    let caseid = rawText.replace('Case ID:', '').trim();

    //console.log(caseid); // Result: "331278522"

    if (caseID === caseid) {
      this.cards.nth(0).click();
    }


  }
  async getAddNote() {


    await this.addNoteLink.click();
    //console.log("getAddNote------------------", await this.noteTextArea.inputValue());
    return await this.noteTextArea.inputValue();
  }

  async VerifyDraftNotVisible(draftNote: string) {
    const noteText = this.page.getByText(draftNote);

    // This will wait and pass only if the text is NOT found
    await expect(noteText).not.toBeVisible();

  }

  async VerifySuccessNoteAdded(draftNote: string) {

    const successToast = this.page.locator('div, span, p').filter({ hasText: /success/i });
    await expect(successToast.first()).toBeVisible({ timeout: 5000 });

    // Fix for line 408/409:
    const successToast2 = this.page.locator('text="Note added"');
    await expect(successToast2).toBeVisible({ timeout: 5000 });
  }

  async getCaseDetails(caseID: string, arg: string) //click on a case and get the details
  {

    const cardCount = await this.cards.count();
   /// console.log(`Total cases   :${cardCount}`);
    let found = false;
    for (let i = 0; i < cardCount; i++) 
      {
          const card = this.cards.nth(i);
          await delay(5000);
          //let caseid = (await this.page.locator('span.MuiTypography-root', { hasText: `Case ID: ${caseID}` }).innerText()).trim();
          let rawText = await this.page.locator('span.MuiTypography-root', { hasText: `Case ID: ${caseID}` }).innerText();
          // Remove the label and trim any leftover spaces
          let caseid = rawText.replace('Case ID:', '').trim();
         // console.log("Get Case details of CaseID  :"+ caseid); // Result: "331278522"
          let file = "";
          if (caseID === caseid) 
          {
              found = true;
              await card.click();
            if(arg !== "draft note")
            {
                const fullText = await this.caseUserName.innerText();
                let userName = fullText.split("added")[0].trim();
                //console.log(userName);
                sharedData.CASEUserName = userName.trim();
                //console.log(`User Name in case :`, sharedData.CASEUserName);

                let caseNote = fullText.split("added")[1].trim();
                const result = `added ${caseNote}`;
                sharedData.CASEComment = result;
                //console.log(`Comment in case :`, sharedData.CASEComment);

                let caseDate = await this.caseDate.innerText();
                sharedData.CASECreatedDateTime = caseDate.trim();
              // console.log(`Created Date in case :`, sharedData.CASECreatedDateTime);
                if (arg !== "add note only") {
                  if (arg === "draft note") {
                    file = await this.draftcaseFile.innerText();
                  }
                  else {
                    file = await this.caseFile.innerText();
                  }
                  const fileNameOnly = file.split('-')[0].trim();
                  sharedData.CASEFileName = fileNameOnly;
                // console.log(`File Name in case :`, sharedData.CASEFileName);
              }
            }
               break;
          }


    }
    expect(found).toBeTruthy();
    return true;
  }


}