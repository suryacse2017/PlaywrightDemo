import { Page,expect, Locator} from '@playwright/test';
import { ClickButton, EnterValue} from "../Utils/SharedMethods";


function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class PrimaryContactPage 
{

 
      readonly page: Page;
      readonly FirstName: Locator;
      readonly LastName: Locator;
      readonly MiddleName: Locator;
      readonly PreferedFName: Locator;
      readonly PreferedLName: Locator;
      readonly JobTitle: Locator;
      readonly Email: Locator;
      readonly Phone: Locator;
      readonly Ext: Locator;
      readonly Fax: Locator;
      readonly heading: Locator;

      readonly NextButton: Locator;
      readonly BackButton: Locator;

      constructor(page: Page) 
      {
        this.page = page;
        this.FirstName =page.locator('//input[@type="text" and @name="legal_first_name_primary"]');
        this.LastName =page.locator('//input[@type="text" and @name="legal_last_name_primary"]');
        this.MiddleName =page.locator('//input[@type="text" and @name="middle_initial_primary"]');
        this.PreferedFName =page.locator('//input[@type="text" and @name="preferred_first_name_primary"]');
        this.PreferedLName =page.locator('//input[@type="text" and @name="preferred_last_name_primary"]');
        this.JobTitle =page.locator('//input[@type="text" and @name="job_title_primary"]');
        this.Email =page.locator('//input[@type="text" and @name="email_primary"]');
        this.Phone =page.locator('//input[@type="text" and @name="phone_primary"]');
        this.Ext =page.locator('//input[@type="text" and @name="phone_ext_primary"]');
        this.Fax =page.locator('//input[@type="text" and @name="fax_primary"]');
        this.NextButton =page.getByRole('link', { name: 'Next' });
        this.BackButton =page.getByRole('link', { name: 'Back' });
        this.heading = page.locator('h3.et_pb_hide_tag', { hasText: 'Primary Contact Information.' });









      }




      async VerifyprimaryContactPage() 
        {

            const actualText = await this.heading.innerText();
            expect(actualText).toBe('Primary Contact Information.');


        }
        async EnterFirstName(fillData: string) 
        {
              const elm=this.FirstName;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }
         async EnterLastName(fillData: string) 
        {
           const elm=this.LastName;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }

        async EnterMiddleInitial(fillData: string) 
        {
           const elm=this.MiddleName;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }

        async EnterPreferedFirstName(fillData: string) 
        {
           const elm=this.PreferedFName;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }

        async EnterPreferedLastName(fillData: string) 
        {
           const elm=this.PreferedLName;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }
        
        async EnterJobTitle(fillData: string) 
        {
           const elm=this.JobTitle;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }
        
        async EnterEmail(fillData: string) 
        {
           const elm=this.Email;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }
        
        async EnterPhone(fillData: string) 
        {
           const elm=this.Phone;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }
        
        async EnterExt(fillData: string) 
        {
           const elm=this.Ext;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }
        
        async EnterFax(fillData: string) 
        {
           const elm=this.Fax;
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }
      async ClickOnNext()
      {
          
          const elm=this.NextButton;
          await ClickButton(elm);
      
      }
      async ClickOnBack()
      {
          
          const elm=this.BackButton;
          await ClickButton(elm);
      
      }
  


             
           










}
