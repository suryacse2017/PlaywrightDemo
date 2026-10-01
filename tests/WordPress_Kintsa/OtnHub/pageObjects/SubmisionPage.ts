import { Page,expect, Locator} from '@playwright/test';
import { ClickButton, EnterValue,SelectDropDownValue} from "../Utils/SharedMethods";


function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class SubmissionPage 
{

 
      readonly page: Page;
      readonly heading: Locator;
      readonly EditButton: Locator;
      readonly EditCancelButton: Locator;
      readonly EditCancelNo: Locator;
      readonly EditCancelYes: Locator;
      readonly EditSaveButton: Locator;
      readonly ViewButton: Locator;
      readonly HideButton: Locator;
      readonly CancelButton: Locator;
      readonly CancelNo: Locator;
      readonly CancelYes: Locator;
     // readonly ViewEditButton: Locator;
      readonly ViewSaveButton: Locator;
      readonly hereLink: Locator;
      readonly robot: Locator;
      readonly cancelSubmission: Locator;
      readonly NoSubmission: Locator;
      readonly YesSubmission: Locator;
      //readonly VerifyFName: Locator;

      

   
      


      
      
      

      constructor(page: Page) 
      {
        this.page = page;
        this.heading = page.locator('h3.et_pb_x_color_black', { hasText: 'Please review and confirm your information:' });
        this.EditButton=page.locator('//h3[normalize-space(text())="Primary Contact"]/ancestor::div[contains(@class,"et_pb_row")]//a[contains(@class,"et_pb_x_button_edit")]').nth(0);
        this.EditCancelButton=page.locator('//h3[normalize-space(text())="Primary Contact"]/ancestor::div[contains(@class,"et_pb_row")]//a[contains(@class,"et_pb_x_button_edit_cancel")]').nth(0);
        this.EditCancelNo=page.locator('//*[@id="et_pb_x_org_signup_dialog_confirm"]/p[3]/a[1]');
        this.EditCancelYes=page.locator('//*[@id="et_pb_x_org_signup_dialog_confirm"]/p[3]/a[2]');
        this.EditSaveButton=page.locator('//h3[normalize-space(text())="Primary Contact"]/ancestor::div[contains(@class,"et_pb_row")]//a[contains(@class,"et_pb_x_button_edit")]').nth(0);
        this.ViewButton=page.locator('//*[@id="ui-id-0"]/a[3]');
        this.HideButton=page.locator('//*[@id="ui-id-0"]/a[3]');
        this.CancelButton=page.locator('//*[@id="ui-id-0"]/a[2]');
        this.CancelNo=page.locator('//*[@id="et_pb_x_org_signup_dialog_confirm"]/p[3]/a[1]');
        this.CancelYes=page.locator('//*[@id="et_pb_x_org_signup_dialog_confirm"]/p[3]/a[2]');
       // this.ViewEditButton=page.locator('//*[@id="ui-id-0"]/a[1]');
        this.ViewSaveButton=page.locator('//*[@id="ui-id-0"]/a[1]');
        //this.hereLink=page.locator('//a[text()="here"]').nth(1);
        this.hereLink=page.locator('//*[@id="ui-id-content-0"]/div[19]/div[1]/div[2]/div/p[2]/a');
        this.robot=page.locator('//*[@id="recaptcha-anchor"]/div[1]');
        this.cancelSubmission=page.locator('//*[@id="post-3924"]/div/form/div[3]/div/div/div/div/div[6]/a[1]');
        this.NoSubmission=page.locator('//html/body/div[45]/div[3]/div/button[2]');
        this.YesSubmission=page.locator('//html/body/div[45]/div[3]/div/button[1]');

       // this.VerifyFName=page.locator('//*[@id="legal_first_name_primary-error"]/following-sibling::span[@class="et_pb_x_label_value"]');
       // this.VerifyFName=page.locator('//*[@id="post-3924"]/div/form/div[2]/div/div/div/div/div[6]/div[2]/div[6]/div[2]/div[4]/div/div[1]/div[2]/span');

        
        






      }

    async bringToFront() 
    {
       await this.page.bringToFront();
    }

      async VerifySubmissionPage() 
        {
            const actualText = await this.heading.innerText();
            expect(actualText).toBe('Please review and confirm your information:');

        }

        
        async ClickOnEdit() 
        {
          const elm = this.EditButton;
           
          await ClickButton(elm);
          
        }
     
        async ClickOnEditCancelNo() 
        {
          const elm=this.EditCancelButton;
          await ClickButton(elm);
          const elm2=this.EditCancelNo;
          await ClickButton(elm2);

            
        }
        //  async ClickOnEditCancelYes() 
        // {
        //   const elm=this.EditCancelButton;
        //   await ClickButton(elm);
        //   const elm2=this.EditCancelYes;
        //   await ClickButton(elm2);
   
        // }
        async ClickOnEditSave() 
        {
          const elm=this.EditSaveButton
          await ClickButton(elm);
           
        }
        async ClickOnView() 
        {
          const elm=this.ViewButton;
          await ClickButton(elm);
            
        }

        async ClickOnHide(num:number) 
        {
          const elm=this.page.locator(`//*[@id="ui-id-${num}"]/a[3]`);
          await ClickButton(elm);
            
        }
      async ClickOnViewEdit(num:number) 
        {
          const elm=this.page.locator(`//*[@id="ui-id-${num}"]/a[1]`);
          await ClickButton(elm);
          
        }

         async ClickOnCancelNo() 
        {
          const elm=this.CancelButton;
          await ClickButton(elm);
          const elm2=this.CancelNo;
          await ClickButton(elm2);

            
        }
         async ClickOnCancelYes() 
        {
          const elm=this.CancelButton;
          await ClickButton(elm);
          const elm2=this.CancelYes;
          await ClickButton(elm2);

            
        }
         async ClickOnViewSave(num:number) 
        {
          const elm=this.page.locator(`//*[@id="ui-id-${num}"]/a[1]`);
          await ClickButton(elm);
           
        }
         async ClickOnHereLink() 
        {
          const elm=this.hereLink;
          await ClickButton(elm);
           
        }
         async ClickOnNotRobot() 
        {
          const elm=this.robot;
          await ClickButton(elm);
           
        }
          async NoCancelSubmission() 
        {
          const elm=this.cancelSubmission;
          await ClickButton(elm);
          const elm2=this.NoSubmission;
          await ClickButton(elm2);
           
        }
        async YesCancelSubmission() 
        {
          const elm3=this.cancelSubmission;
          await ClickButton(elm3);
          const elm4=this.YesSubmission;
          await ClickButton(elm4);
           
        }
 
            async VerifyFirstName(fname:string) 
        {
              const count = await this.page.locator('//h3[normalize-space(.)="Primary Contact"] /following::label[normalize-space(text())="Legal First Name"]/following::span[1][following::h3[text()="User Accounts"]]').count();
              console.log("Found elements:-----------", count);

              const fnameValue = await this.page.locator('//h3[normalize-space(.)="Primary Contact"] /following::label[normalize-space(text())="Legal First Name"]/following::span[1][following::h3[text()="User Accounts"]]').textContent();
              console.log("Extracted text:---------", fnameValue?.trim());
              expect(fnameValue).toBe(fname);

           
        }
       
       
       












}
