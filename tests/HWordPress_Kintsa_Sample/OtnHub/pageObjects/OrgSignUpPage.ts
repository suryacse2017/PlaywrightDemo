import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { ClickButton, EnterValue} from "../Utils/SharedMethods";


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
      readonly ConfirmButton: Locator;
      readonly OrgNameDropDown: Locator;
      readonly NextButton: string;
    

      constructor(page: Page, context: BrowserContext) 
      {
        this.page = page;
        this.context = context;
        this.inputLocator = 'input[name="find_organization"]';
        this.ConfirmButton = page.locator('button.ui-button.ui-corner-all.ui-widget', { hasText: 'Confirm' });
        this.NextButton = 'text=Next';
        this.OrgNameDropDown = page.locator('//div[contains(@class, "ui-menu-item-wrapper") and .//span[text()="Cancer"] and contains(., " Care Ontario")]');
      }

  
      async EnterOrganizationNameDropDown(fillData: string) 
      {
              const elm = this.page.locator(this.inputLocator);
              await ClickButton(this.page, elm);
              await EnterValue(this.page, elm, fillData);
              await delay(6000);
              await this.OrgNameDropDown.waitFor({ state: 'visible' });
              await ClickButton(this.page, this.OrgNameDropDown);

      }

      
      

       async ClickOnConfirm()
      {
          const elm=this.ConfirmButton;
          await ClickButton(this.page,elm);
      
      }
      
      
          async ClickOnNext(num:number)
      {
          
          const elm=this.page.locator(this.NextButton).nth(num);
          await ClickButton(this.page,elm);
      
      }
       


}
