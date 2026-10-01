import { Page, Locator} from '@playwright/test';
import { ClickButton, EnterValue} from "../Utils/SharedMethods";


function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class PrimaryContactPage 
{

 
      readonly page: Page;
      readonly FirstName: Locator;

      constructor(page: Page) 
      {
        this.page = page;
        this.FirstName =page.locator('//input[@type="text" and @name="legal_first_name_primary"]');


      }
        async EnterFirstName(fillData: string) 
        {
              await ClickButton(this.page, this.FirstName);
              await EnterValue(this.page, this.FirstName, fillData);
           

        }


}
