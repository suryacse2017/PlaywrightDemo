import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { scrollToTheElement ,ClickButton, EnterValue} from "../Utils/SharedMethods";


function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class OrgSignUpPage 
{

 
      readonly page: Page;
      readonly context: BrowserContext;
      //Locators
      readonly inputLocator: string;
            
      
      readonly hereLink: Locator;
      readonly hereNo: Locator;
      readonly hereYes: Locator;
      
      readonly CancelButton: Locator;
      readonly ConfirmButton: Locator;
      readonly orgName: Locator;
      readonly AppCancelButton: Locator;
      readonly popUpYes: Locator;
      readonly popUpNo: Locator;
      readonly OrgNameDropDown: Locator;
      readonly NextButton: string;
      readonly FirstName: Locator;

  

    

      constructor(page: Page, context: BrowserContext) 
      {
        this.page = page;
        this.context = context;
        
        this.hereLink = page.locator('#oh_request_new_org');
        this.hereNo = page.locator('//button[@type="button" and contains(@class, "ui-button") and text()="No"]');
        this.hereYes = page.locator('//button[@type="button" and contains(@class, "ui-button") and text()="Yes"]');
        this.inputLocator = 'input[name="find_organization"]';
        this.CancelButton = page.locator('button.ui-button.ui-corner-all.ui-widget', { hasText: 'Cancel' });
        this.ConfirmButton = page.locator('button.ui-button.ui-corner-all.ui-widget', { hasText: 'Confirm' });
        this.NextButton = 'text=Next';
        this.orgName= page.locator('span.ui-autocomplete-state-highlight', { hasText: 'Cancer Care Ontario' });
        this.AppCancelButton = page.locator('a.et_pb_x_button_cancel', { hasText: 'Cancel' }).nth(0);
        this.popUpYes = page.locator('//button[@type="button" and contains(@class, "ui-button") and text()="Yes"]').nth(1);
        this.popUpNo = page.locator('//button[@type="button" and contains(@class, "ui-button") and text()="No"]').nth(1);
       // this.OrgNameDropDown = page.locator('//div[contains(@class, "ui-menu-item-wrapper") and .//span[text()="Can"] and contains(., "Mary, MD")]');
        this.OrgNameDropDown = page.locator('//div[contains(@class, "ui-menu-item-wrapper") and .//span[text()="Cancer"] and contains(., " Care Ontario")]');



      }

      

        async ClickOnHere() 
        {
            
              await ClickButton(this.hereLink);

        }

        

         async ClickOnHereNo()
      {
          const elm=this.hereNo;
          await ClickButton(elm);
      
      }
       async ClickOnHereYes()
      {
          const elm=this.hereYes;
          await ClickButton(elm);
      
      }

        async EnterOrganizationName(fillData: string) 
        {
              const elm = this.page.locator(this.inputLocator);
              await delay(1000);
              await ClickButton(elm);
              await EnterValue(elm, fillData);
              //await delay(1000000);
              //await this.orgName.press('Enter');

      }

      
        async EnterOrganizationName2(fillData: string) 
        {
              const elm = this.page.locator(this.inputLocator);
              await delay(1000);
              await ClickButton(elm);
              await EnterValue(elm, fillData);
              await delay(1000);

      }
      async EnterOrganizationNameDropDown(fillData: string) 
      {
              const elm = this.page.locator(this.inputLocator);
              await delay(1000);
              await ClickButton(elm);
              await EnterValue(elm, fillData);
              await delay(1000);
              //const elm2 = page.locator(this.OrgNameDropDown);
              await this.OrgNameDropDown.waitFor({ state: 'visible' });
              await ClickButton(this.OrgNameDropDown);

      }

      
      async ClickOnCancel()
      {


          await this.CancelButton.waitFor({ state: 'visible' });
          const elm=this.CancelButton;
          await ClickButton(elm);
      
      }

       async ClickOnConfirm()
      {
          //await this.ConfirmButton.waitFor({ state: 'visible' });
          const elm=this.ConfirmButton;
          await ClickButton(elm);
      
      }
      
       async ClosePopUpWindow()
      {
         // await this.ConfirmButton.waitFor({ state: 'visible' });
          const elm= this.page.locator('button.ui-dialog-titlebar-close[title="Close"]').nth(1);

          await ClickButton(elm);
      
      }
          async ClickOnNext(num:number)
      {
          
          const elm=this.page.locator(this.NextButton).nth(num);
          await ClickButton(elm);
      
      }
       
      async ClickOnAppCancel()
      {
          const elm=this.AppCancelButton;
          await ClickButton(elm);
      
      }
       async ClickOnYes()
      {
          const elm=this.popUpYes;
          await ClickButton(elm);
      
      }
       async ClickOnNo()
      {
          const elm=this.popUpNo;
          await ClickButton(elm);
      
      }



}
