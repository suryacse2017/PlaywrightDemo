import { Page, Locator, BrowserContext, expect } from '@playwright/test';
//import { scrollToTheElement ,ClickButton, EnterValue} from "../Utils/SharedMethods";
import { SharedMethods} from "../Utils/SharedMethods";



function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
export class HomePage 
{
      private  sharedMethods:SharedMethods;
      readonly page: Page;
      private CASEID:string="";
 //Locators
        readonly otnCredentialsButton: Locator;
        readonly userName: Locator;
        readonly password: Locator;
        readonly signInButton: Locator;
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
        readonly waitResponse: Locator;
        readonly waitMoreInfo: Locator
        readonly needAttention: Locator;
        readonly provideConsultLink: Locator;
        //readonly provideConsultArea: Locator;
        readonly TextArea: Locator;
        readonly parent: Locator;
        readonly cards: Locator;
        readonly patientFullName: Locator;
        readonly caseID: Locator;
        readonly timeSpendDropdown: Locator;
        readonly timeSpend: Locator;
        readonly timespendOk:Locator;
        readonly completeLink:Locator;
        readonly completeButton:Locator;
        readonly requestClarificationLink:Locator;
        readonly addNoteLink:Locator;
        readonly requestMoreInfoLink: Locator;
        readonly secondTextArea: Locator;
        readonly CompleteCheckBox1: Locator;
        readonly CompleteCheckBox2: Locator;
        readonly provideMorInfoLink:Locator;
        readonly cancelLink:Locator;
        readonly cancelButton:Locator;








      

      
      // readonly AlredyMember: string;
      // readonly NotMember: string;
      // readonly AlredyOTnHub: string;
      // readonly NotOTnHub: string;
      // readonly HCOSignUp: string;


      //***************************************************************************************************************************************************** */
      constructor(page: Page) 
      {
        this.sharedMethods=new SharedMethods();
        this.page = page;

        this.otnCredentialsButton = page.locator('//*[@id="btnOTNCredentials"]');
        this.userName             = page.locator('//*[@id="Ecom_User_eMail"]');
        this.password             = page.locator('//*[@id="Ecom_Password"]');
        this.signInButton         = page.locator('xpath=//input[@value="Sign In"]');


              this.eConsultlink = page.locator('xpath=//li[@class="ng-scope"]//span[@class="nav-icon ng-scope"]');
              this.reqEconsult = page.locator('xpath=//button[normalize-space()="Request Consult"]');
              this.specificProvider = page.locator('input[type="radio"][name="position"][value="DIRECT"]')
              // this.recipient            = page.locator('input[placeholder="Search for Specialist or Specialty Group..."]');
              this.recipient = page.locator('input[role="combobox"]');
              this.fName = page.locator('xpath=//input[@id="firstName"]');
              this.lName = page.locator('xpath=//input[@id="lastName"]');
              this.dob = page.locator('input[placeholder="YYYY-MM-DD"]');
              this.gender = page.locator('xpath=//input[@value="M"]');
              this.ohip1 = page.locator('input[placeholder="Enter patient OHIP number..."]');
              this.ohip2 = page.locator('input[placeholder="Version code"]');
              this.requestHistory = page.locator('textarea[name="requestNte"]')
              // this.requestSend          = page.locator('//button[normalize-space()="Send"]');
              this.requestSend = page.locator('//button[contains(text(),"Send")]');
              this.waitResponse = page.locator('//span[normalize-space()="Waiting for Response"]');
              this.waitMoreInfo = page.locator('//span[normalize-space()="Waiting for More Info"]');
              this.patientFullName = page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(0);
              this.needAttention = page.getByText('Needs Attention', { exact: false });

              this.parent = page.locator('//div[@class="MuiBox-root css-v2wkp3"]');
              this.cards = this.parent.locator('div.MuiPaper-root.MuiCard-root');
              this.caseID = page.locator('(//p[@class="MuiTypography-root MuiTypography-body2 css-lue9sa"])[1]');
              // this.provideConsult=page.locator('//button[@id="mui-p-34359-T-provided"]');
              this.provideConsultLink = page.getByRole('tab', { name: 'Provide Consult' });
              this.TextArea = page.locator('//textarea').nth(0);
              //this.timeSpendDropdown = page.locator('//input[@name="timeSpentOnConsult"]');
              this.timeSpendDropdown = page.locator('#mui-component-select-timeSpentOnConsult');
              this.timeSpend = page.locator('//li[normalize-space()="6 - 10 minutes"]');
              this.timespendOk = page.locator('//button[normalize-space()="Ok"]');
              this.completeLink = page.getByRole('tab', { name: 'Complete' });
              this.completeButton = page.getByRole('button', { name: 'Complete', exact: true });
              this.requestClarificationLink = page.getByRole('tab', { name: 'Request Clarification' });
              this.addNoteLink = page.getByRole('tab', { name: 'Add Note' });
              this.requestMoreInfoLink = page.getByRole('tab', { name: 'Request More Info' });
              this.secondTextArea = page.locator('//textarea').nth(2);
              this.CompleteCheckBox1 = page.locator('//input[@name="noOhip"]').nth(0);
              this.CompleteCheckBox2 = page.locator('//input[@name="noOhip"]').nth(1);
              this.provideMorInfoLink = page.getByRole('tab', { name: 'Provide More Info' });
              this.cancelLink = page.getByRole('tab', { name: 'Cancel' });
              this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });

              

      
      }


      //***************************************************************************************************************************************************** */
   
//Login
         async pageClose()
      {
            
             await this.page.close();
              
      }

      async ClickOtnCredentialsButton()
      {
            
              await this.otnCredentialsButton.click();
              
      }


      async EnterUsername(user:string)
      {
            const elm=this.userName;
            await this.sharedMethods.EnterTextBoxValue(elm,user);
      }
      async EnterPassword(passwrd:string) 
      {
         const elm=this.password;
           await this.sharedMethods.EnterTextBoxValue(elm,passwrd);
      }
     async ClickSignIn()
     {
        await this.signInButton.click();
      }

//Create a case
      
      async ClickOneConsult()
      {
            await this.eConsultlink.waitFor({ state: 'visible' });
              this.eConsultlink.click();
      }
       async ClickRequestConsult()
      {     await delay(3000);
            await this.reqEconsult.waitFor({ state: 'visible' });
              this.reqEconsult.click();
      }
      async SelectSpecificProvider()
      {
              await this.specificProvider.waitFor({ state: 'visible' });
              this.specificProvider.click();
      }
       async EnterRecipient(recipient:string)
      {
            
           const elm=this.recipient;
           await elm.fill('perf');
           const listbox = this.page.locator('ul[role="listbox"]');
           await expect(listbox).toBeVisible();
           await this.page.getByRole('option', { name: 'Performance testing group, My own company'}).click();

      }
       async EnterPatientFName(fname:string)
      {
            
               const elm=this.fName;
           await this.sharedMethods.EnterTextBoxValue(elm,fname);
      }
       async EnterPatientLName(lname:string)
      {
            
               const elm=this.lName;
           await this.sharedMethods.EnterTextBoxValue(elm,lname);
      }
       async EnterDOB(dob:string)
      {
            
          const elm=this.dob;
           await this.sharedMethods.EnterTextBoxValue(elm,dob);
      }
       async SelectMale()
      {
            
              this.gender.click();
      }
       async EnterOHIP(ohip1:string,ohip2:string)
      {
            
           const elm=this.ohip1;
           await this.sharedMethods.EnterTextBoxValue(elm,ohip1);
           const elm2=this.ohip2;
           await this.sharedMethods.EnterTextBoxValue(elm2,ohip2);
      }

      async EnterRequest(request:string)
      {
            
           const elm=this.requestHistory;
           await this.sharedMethods.EnterTextBoxValue(elm,request);
      }
        async ClickOnSend()
      {
       // const c= await this.requestSend.count();
          //  console.log("send button count",c);
          await this.requestSend.waitFor({ state: 'visible' });
            await this.requestSend.click();
              
      }

      async ClickWaitingforResponse()
      {
            await delay(5000);
              this.waitResponse.click();
      }
        async ClickWaitingforMorInfo()
      {
            await delay(5000);
              this.waitMoreInfo.click();
      }
      async VerifyCaseCreated(expectedRequest:string,fname:string,lname:string)
      {
        //found request
             
              const cardCount = await this.cards.count();
              console.log(`Total cases waiting for response is  : ${cardCount}`);

              let found = false;

              for (let i = 0; i < cardCount; i++) 
                {
                      const card = this.cards.nth(i);
                        await delay(5000);
                        await card.click();
                        await delay(8000);
                       const textLocator = card.locator(
                                                        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                                                        );

                      const text = (await textLocator.first().textContent())?.trim();

                      if (text === expectedRequest) 
                     {
                              found = true;
                //found fname and lname
                              //this.patientFullName      = page.locator('//div[@class="MuiStack-root css-p58oka"]/p').nth(0);

                              const fullname = this.patientFullName;
                              let fullNm=(await fullname.innerText()).trim();
                              const [firstName, lastName] = fullNm.split(' ');
                                 if (firstName === fname && lastName === lname ) 
                                {

                                        console.log(`✅ Case successfully created with Patient name ${fullNm} at case index ${i}`);
                 //find case id
                                        this.CASEID=(await this.caseID.innerText()).trim();
                                        //SharedMethods.caseID=(await this.caseID.innerText()).trim();
                                        //console.log(`Case Id :`, SharedMethods.caseID);
                                        console.log(`Case Id :`, this.CASEID);
                                        
                                        break;
                                }
                              
                      }
              }
                
              expect(found).toBeTruthy();


      }
//Specialist
        // async getCaseID()
        //  {
        //          console.log(`CASEID :`, this.CASEID);
        //         console.log(`sharedMethods Case Id :`, SharedMethods.caseID);
        //         return SharedMethods.caseID;
        //  } 
          async ClickNeedsAttention()
      {await delay(5000);
            await this.needAttention.waitFor({ state: 'visible' });
              this.needAttention.click();
      }

         async getCaseByCaseId(caseID:string)
         {
                //found case by ID
             
              const cardCount = await this.cards.count();
              console.log(`Total cases Needs Attention is  :${cardCount}`);

              let found = false;

              for (let i = 0; i < cardCount; i++) 
                {
                      const card = this.cards.nth(i);
                        await delay(5000);
                        await card.click();
                        await delay(8000);

                                        let caseid=(await this.caseID.innerText()).trim();
                                        console.log(`Case Id :`, caseid);
                                  if (caseID === caseid) 
                                {
                                        found = true;
                                       // console.log(`Case found by Case ID ${caseID} at case index ${i}`);
           
                                        
                                        break;
                                }

                }
                
              expect(found).toBeTruthy();
              return true;
         }
         /*
          async ProvideConsult(provideConsult: string, time: string) 
          {
                //provide consultation for each non attenton case

                let cardCount = await this.cards.count();
                console.log(`Total cases Needs Attention ${cardCount}`);
                console.log(`cardCount:`, cardCount);
                //await delay(10000);
                if (cardCount === 0)
                  return;
                let i=0;
                console.log(`cardCount and i :`, cardCount, i);
                const card = this.cards.nth(i);
                console.log(`cards.nth(i) :`, i);
                //await delay(5000);
                await card.click();
                await delay(5000);
                await this.provideConsultLink.click();
                //await delay(3000);
                let textArea = await this.provideConsultArea.innerText();

                console.log(`textArea :`, textArea);
                if (textArea === "") 
                {

                  console.log('area empty');
                  const elm = this.provideConsultArea;
                  await this.sharedMethods.EnterTextBoxValue(elm, provideConsult);
                  await delay(3000);
                  await this.ClickOnSend();
                  await delay(15000);
                  await this.SelectTimeSpend(time);
                  await delay(15000);
                  await this.ClickNeedsAttention();
                  await delay(3000);
                  await this.ProvideConsult(provideConsult, time);

                }

          }*/
               async ProvideConsult(comment: string, time: string) 
          {
                //provide consultation for each non attenton case
                          const validCases = [
                                              "Creating cases for Performance testing - Provide consult",
                                              "Creating cases for Performance testing - Complete Case",
                                              "Creating cases for Performance testing - Request Clarifications",
                                              "Creating cases for Performance testing - Add note after  Request Clarification",
                                            ];


                let cardCount = await this.cards.count();
                console.log(`Total cases Needs Attention is  :${cardCount}`);
                if (cardCount === 0)
                {
                  //console.log("cardCount is 0");
                  return;
                  
                }
                  
                let found = false;
                let i=0;
                for (i = 0; i < cardCount; i++) 
                    {
                          const card = this.cards.nth(i);
                          await delay(5000);
                          const textLocator = card.locator(
                            `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                          );

                          const text = (await textLocator.first().textContent())?.trim();
                          if (text && validCases.includes(text)) 
                          {
                                found = true;
                               // console.log(`${text} found at case index ${i}`);
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
                                console.log("Case : ",text);
                                found=false;
                                await this.ClickNeedsAttention();
                                await delay(10000);
                                break;

                          }
                    }
                    if (cardCount > 1 && found === false && i < cardCount)
                    {
                     // console.log("cardCount ,found , i",cardCount ,found , i);
                      await this.ProvideConsult(comment,time);
                      
                    }
          }

        async SelectTimeSpend(timeSpend:string)
         {
                await this.timeSpendDropdown.click()
                await delay(3000);
                   const timeoption = this.page.locator(`//li[normalize-space()="${timeSpend}"]`);
                await timeoption.click();
                await this.timespendOk.click();
                
                 

         }
          async CaseComplete(caseName: string, feedback1: string,feedback2: string) 
          {
                    //case completed for consultation provided case

                    const cardCount = await this.cards.count();
                    console.log(`Total cases Needs Attention is    : ${cardCount}`);
                    if (cardCount === 0)
                {
                  //console.log("cardCount is 0");
                  return;
                  
                }
                    let found = false;

                    for (let i = 0; i < cardCount; i++) 
                    {
                      const card = this.cards.nth(i);
                      await delay(5000);
                      
                      const textLocator = card.locator(
                        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                      );

                      const text = (await textLocator.first().textContent())?.trim();
                      if (text === caseName) 
                      {
                        found = true;
                        await card.click();
                        await delay(8000);                        
                       // console.log(`${caseName} found at case index ${i}`);
                        await this.completeLink.click();
                       const elm = this.TextArea;
                         await this.sharedMethods.EnterTextBoxValue(elm, feedback1);
                          //await delay(5000);
                          const elm2 = this.secondTextArea;
                          await this.sharedMethods.EnterTextBoxValue(elm2, feedback2);
                          await this.SelectCheckBoxes();
                          await this.ClickOnComplete();
                          await delay(10000);
                          console.log("Requester completed the case");
                          break;
                        // }
                      }
                    }

         }
         async SelectCheckBoxes()
      {

            await this.CompleteCheckBox1.click();
            await this.CompleteCheckBox2.click();
              
      }
         async ClickOnComplete()
      {

            await this.completeButton.click();
            await delay(5000);
            
              
      }
     async RequestClarification(caseName:string,comment:string)
         {
                //case completed for consultation provided case
                // const validCases = [
                //                               "Creating cases for Performance testing - Add note after  Request Clarification",
                //                               "Creating cases for Performance testing - Request Clarifications",
                //                             ];
             //   await this.cards.waitFor({ state: 'visible' });
                const cardCount = await this.cards.count();
                console.log(`Total cases Needs Attention is  :${cardCount}`);
                if (cardCount === 0)
                {
                  //console.log("cardCount is 0");
                  return;
                  
                }

                let found = false;

                for (let i = 0; i < cardCount; i++) 
                {
                  const card = this.cards.nth(i);
                  await delay(5000);

                  const textLocator = card.locator(
                    `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                  );
                  await delay(5000);
                  const text = (await textLocator.first().textContent())?.trim();
                   if (text === caseName) 
                    {

                    found = true;
                    await card.click();
                    await delay(10000);
                    //console.log(`${text} found at case index ${i}`);
                    await this.requestClarificationLink.waitFor({ state: 'visible' });
                    await this.requestClarificationLink.click();
                    const elm = this.TextArea;
                    await this.sharedMethods.EnterTextBoxValue(elm, comment);
                    await delay(3000);
                    await this.ClickOnSend();
                    console.log("Requester sent request clarification");
                    break;
                  }

               }
        }
      async AddNote(caseName: string, comment: string) 
      {
              //case completed for consultation provided case

              const cardCount = await this.cards.count();
              console.log(`Total cases waiting for response is   :${cardCount}`);
          if (cardCount === 0)
                {
                  //console.log("cardCount is 0");
                  return;
                  
                }
              let found = false;

              for (let i = 0; i < cardCount; i++)
             {
                const card = this.cards.nth(i);
                await delay(5000);

                const textLocator = card.locator(
                  `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                );

                const text = (await textLocator.first().textContent())?.trim();
                if (text === caseName) 
                {
                  found = true;
                 // console.log(`${caseName} found at case index ${i}`);
                  await card.click();
                  await delay(8000);
                  await this.addNoteLink.click();
                  const elm = this.TextArea;
                  await this.sharedMethods.EnterTextBoxValue(elm, comment);
                   await delay(3000);
                  await this.ClickOnSend();
                  console.log("Requester added notes");
                  break;
                }

              }

      }

      async AddNote2(caseName: string, comment: string,time:string) 
      {
              //case completed for consultation provided case

              const cardCount = await this.cards.count();
              console.log(`Total cases waiting for response is  :${cardCount}`);

              let found = false;

              for (let i = 0; i < cardCount; i++)
             {
                const card = this.cards.nth(i);
                await delay(5000);

                const textLocator = card.locator(
                  `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                );

                const text = (await textLocator.first().textContent())?.trim();
                if (text === caseName) 
                {
                  found = true;
                 // console.log(`${caseName} found at case index ${i}`);
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
                  console.log("Case : ",text);
                  break;
                }

              }

      }
      async ProvideMoreInfo(caseName: string, comment: string) 
      {
              //case completed for consultation provided case

              const cardCount = await this.cards.count();
              console.log(`Total cases waiting for response is   :${cardCount}`);
              if (cardCount === 0)
                {
                  //console.log("cardCount is 0");
                  return;
                  
                }
              let found = false;

              for (let i = 0; i < cardCount; i++)
             {
                const card = this.cards.nth(i);
                await delay(5000);

                const textLocator = card.locator(
                  `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                );

                const text = (await textLocator.first().textContent())?.trim();
                if (text === caseName) 
                {
                  found = true;
                  await card.click();
                  await delay(8000);
                 // console.log(`${caseName} found at case index ${i}`);
                  await this.provideMorInfoLink.click();
                  const elm = this.TextArea;
                  await this.sharedMethods.EnterTextBoxValue(elm, comment);
                   await delay(8000);
                        await this.ClickOnSend();
                        console.log("Requester sent provide more information");
                  break;
                }


                // let textArea=await this.provideConsultArea.innerText();

                //                 console.log(`textArea :`, textArea);
                //           if (textArea === "") 
                //         {

                //                 console.log('area empty');
                //                 const elm=this.provideConsultArea;
                //                 await this.sharedMethods.EnterTextBoxValue(elm,comment);
                //                 break;
                //         }

              }

      }
      
      /*
         async RequestMoreInfo(comment:string)
         {
                //Request for more information of the case
             
              const cardCount = await this.cards.count();
              console.log(`Total cases Needs Attention ${cardCount}`);

             // let found = false;

              for (let i = 0; i < cardCount; i++) 
                {
                      const card = this.cards.nth(i);
                        await delay(5000);
                        await card.click();
                        await this.requestMoreInfoLink.click();
                        let textArea=await this.provideConsultArea.innerText();

                                        console.log(`textArea :`, textArea);
                                  if (textArea === "") 
                                {
                                       
                                        console.log('area empty');
                                        const elm=this.provideConsultArea;
                                        await this.sharedMethods.EnterTextBoxValue(elm,comment);
                                        break;
                                }

                }
                
             // expect(found).toBeTruthy();
              return true;
         }*/

         async CancelCase(caseName: string, comment: string) 
          {
                    //case completed for consultation provided case

                    const cardCount = await this.cards.count();
                    console.log(`Total cases Needs Attention is  :${cardCount}`);
                    if (cardCount === 0)
                {
                  //console.log("cardCount is 0");
                  return;
                  
                }
                    let found = false;

                    for (let i = 0; i < cardCount; i++) 
                    {
                      const card = this.cards.nth(i);
                      await delay(5000);
                      
                      const textLocator = card.locator(
                        `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                      );

                      const text = (await textLocator.first().textContent())?.trim();
                      if (text === caseName) 
                      {
                        found = true;
                        await card.click();
                        await delay(8000);
                      //  console.log(`${caseName} found at case index ${i}`);
                        await this.cancelLink.click();
                       const elm = this.TextArea;
                         await this.sharedMethods.EnterTextBoxValue(elm, comment);
                          await delay(3000);
                         await this.SelectCheckBoxes();
                         console.log("Requester cancel the case");
                        await this.ClickOnCancel();


                           break;
                      
                      }
                    }

         }
         async ClickOnCancel()
      {
          await this.cancelButton.waitFor({ state: 'visible' });
            await this.cancelButton.click();
            await delay(5000);
              
      }



      async RequestMoreInfo(comment:string,time:string)
      {
                //provide consultation for each non attenton case
                          const validCases = [
                                              "Creating cases for Performance testing - Request More Information",
                                              "Creating cases for Performance testing - Add Note after Request More Information",
                                              "Creating cases for Performance testing - Provide More Information",
                                              "Creating cases for Performance testing - Cancel",
                                            ];


                let cardCount = await this.cards.count();
                console.log(`Total cases Needs Attention is  :${cardCount}`);
                if (cardCount === 0)
                {
                 // console.log("cardCount is 0");
                  return;
                  
                }
                  
                let found = false;
                let i=0;
                for (i = 0; i < cardCount; i++) 
                    {
                          const card = this.cards.nth(i);
                          await delay(5000);
                          const textLocator = card.locator(
                            `xpath=.//div[contains(@class,"MuiBox-root")]/div[contains(@class,"MuiStack-root")]/p`
                          );

                          const text = (await textLocator.first().textContent())?.trim();
                          if (text && validCases.includes(text)) 
                          {
                                found = true;
                              //  console.log(`${text} found at case index ${i}`);
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
                                 console.log("Case : ",text);
                                found=false;
                                await this.ClickNeedsAttention();
                                await delay(10000);
                                break;

                          }
                    }
                    if (cardCount > 1 && found === false && i < cardCount)
                    {
                      //console.log("cardCount ,found , i",cardCount ,found , i);
                      await this.RequestMoreInfo(comment,time);
                      
                    }
       }
       
}