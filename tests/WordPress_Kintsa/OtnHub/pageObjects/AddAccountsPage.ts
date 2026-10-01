import { Page,expect, Locator} from '@playwright/test';
import { ClickButton, EnterValue,SelectDropDownValue} from "../Utils/SharedMethods";


function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class AddAccountsPage 
{

 
      readonly page: Page;
   //   readonly Profession: Locator;
    //  readonly RegisterNumber: Locator;
      readonly ValidateButton: Locator;
      readonly ProfessionList: Locator;
      //readonly OhipNumber: Locator;
     // readonly OneIdNo: Locator;
    //  readonly OneIdYes: Locator;
      readonly MoreInfo: Locator;
      //readonly HereLink: Locator;
     // readonly Fname: Locator;
     // readonly Lname: Locator;
      //readonly Initial: Locator;
      //readonly University: Locator;
     

       //readonly ClinicalSpeciality: Locator;
       // readonly NurseCategory: Locator;

      

     // readonly Email: Locator;
      //readonly Phone: Locator;
    //  readonly Ext: Locator;
     // readonly OneIdUserName: Locator;
      readonly heading: Locator;

      readonly NextButton: Locator;
      readonly BackButton: Locator;
      readonly PrimaryContactLink: Locator;
      readonly AddAccountsLink: Locator;
      readonly AddOTNHubAccountLink: Locator;
      readonly CloseOTNHubSpan: Locator;

      
      


      
      
      

      constructor(page: Page) 
      {
        this.page = page;
        this.heading = page.locator('h3.et_pb_hide_tag', { hasText: 'Apply for additional healthcare professional user accounts' });
        //this.Profession =page.locator('select[name="users[0][profession]"]');
       // this.Profession =page.locator('select[name*="[profession]"]');
       // this.RegisterNumber=page.locator('input[name="users[0][professional_reg_num]"]');
        this.ValidateButton=page.locator('a.et_pb_btn_find_img', { hasText: 'Validate' });
        this.ProfessionList=page.locator('select[name="users[0][profession]"]');
      //  this.OhipNumber=page.locator('input[name="users[0][OHIP]"]');
      //  this.Email=page.locator('input[name="users[0][email]"]');
       // this.Phone=page.locator('input[name="users[0][phone]"]');
       // this.Ext=page.locator('input[name="users[0][phone_ext]"]');
       // this.OneIdNo=page.locator('input[type="radio"][name="users[0][check_to_oneid]"][value="0"]');
       // this.HereLink=page.locator('a', { hasText: 'here' }).nth(1);
       // this.OneIdYes=page.locator('input[type="radio"][name="users[0][check_to_oneid]"][value="1"]');
       // this.Fname=page.locator('input[name="users[0][legal_first_name]"]');
        //this.Lname=page.locator('input[name="users[0][legal_last_name]"]');
        //this.OneIdUserName=page.locator('input[name="users[0][oneid_user_name]"]');

         
         //this.NurseCategory =page.locator('select[name="users[0][nurse_category]"]');
       //  this.ClinicalSpeciality =page.locator('select[name="users[0][provider_service]"]');

         //this.Initial=page.locator('input[name="users[0][middle_initial]"]');
        // this.University=page.locator('input[name="users[0][registered_with_text]"]');
         this.PrimaryContactLink=page.locator('a:text("Primary Contact")');
         this.AddAccountsLink=page.locator('a:text("Add Accounts")');
         this.AddOTNHubAccountLink=page.locator('a:text("+ Add an OTNhub user account")');
         //this.CloseOTNHubSpan=page.locator('span.et_pb_x_del_user');
         this.CloseOTNHubSpan=page.locator('//span[text()="New user"]/following-sibling::span[@class="et_pb_x_del_user"]');

         



      }

      async bringToFront() {
  await this.page.bringToFront();
}


      async VerifyaddAccountsPage() 
        {

            const actualText = await this.heading.innerText();
            expect(actualText).toBe('Apply for additional healthcare professional user accounts');


        }

         async VerifyProfessionList(num:number) 
        {
           
              const elm=this.page.locator(`select[name="users[${num}][profession]"]`);

            await ClickButton(elm);
            await expect(this.ProfessionList).toBeVisible();
            const actualOptionsRaw  = await this.ProfessionList.allTextContents();
                  const actualOptions = actualOptionsRaw
                  .flatMap(text => text.split('\n'))
                  .map(text => text.trim())
                  .filter(text => text.length > 0);
           // console.log('Actual options:----------', actualOptions);

            const expectedOptions = [
               'Allied Health Professional',
               'Health Care Administrator (non-clinical)',
               'Medical Resident / Fellow',
               'Medical Student',
               'Midwife',
               'Nurse',
               'Physician',
               'Technical Support',
               'Telemedicine Coordinator: Clinical',
               'Telemedicine Coordinator: Non-Clinical'
            ];
            for (const expected of expectedOptions) 
               {
                expect(actualOptions).toContain(expected);
               }



        }

        
        async SelectProfession(selectValue: string,num:number) 
        {
            //  const selector = `select[name="users[${num}][profession]"]`;
            //  const Profession = this.page.locator(`select[name="users[${num}][profession]"]`);
              const elm=this.page.locator(`select[name="users[${num}][profession]"]`);
              await ClickButton(elm);

            await SelectDropDownValue(elm,selectValue);
            
        }

      async EnterRegisterNumber(RegNum: string,num:number) 
        {
               const elm=this.page.locator(`input[name="users[${num}][professional_reg_num]"]`);
              await ClickButton(elm);
              await EnterValue(elm,RegNum);
        }
      async ValidateRegisterNumber(num:number) 
        {
         
              const elm=this.page.locator(`//*[@id="ui-id-content-${num}"]/div[4]/div[2]/a`);
              await ClickButton(elm);

        }

         async EnterOHIPNumber(OhipNumber: number,num:number) 
        {
              const elm=this.page.locator(`input[name="users[${num}][OHIP]"]`);
              await ClickButton(elm);
              await EnterValue(elm,OhipNumber);
        }
          async EnterEmail(fillData: string,num:number) 
        {
              const elm=this.page.locator(`input[name="users[${num}][email]"]`);
              await ClickButton(elm);
              await EnterValue(elm,fillData);
        }
           async EnterPhone(fillData: string,num:number) 
        {
           const elm=this.page.locator(`input[name="users[${num}][phone]"]`);
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }
        async EnterExt(fillData: string,num:number) 
        {
           const elm=this.page.locator(`input[name="users[${num}][phone_ext]"]`);
              await ClickButton(elm);
              await EnterValue(elm, fillData);
           

        }

          async SelectOneIdNo(num:number) 
        {
          
           const elm=this.page.locator(`input[type="radio"][name="users[${num}][check_to_oneid]"][value="0"]`);
          await ClickButton(elm);
           
        }

        async ClickMoreInfo(num:number) 
        {
          
           const elm=this.page.locator(`//*[@id="ui-id-content-${num}"]/div[19]/div[1]/div[2]/div/p[2]/a`);
              await ClickButton(elm);
           
        }
           async SelectOneIdYes(num:number)
        {
           const elm=this.page.locator(`input[type="radio"][name="users[${num}][check_to_oneid]"][value="1"]`);
          await ClickButton(elm);
           
        }
        async EnterOneIDUsername(num:number) 
        {
           // await delay(6000);
          // console.log("firstname-------+----- " ,await this.page.locator(`input[name="users[${num}][legal_first_name]"]`).inputValue());
           if(await this.page.locator(`input[name="users[${num}][legal_first_name]"]`).inputValue()=='')
           {
           // console.log("firstname------------ " ,await this.page.locator(`input[name="users[${num}][legal_first_name]"]`).inputValue());
            await delay(4000);

           }

            const fullName = `${await this.page.locator(`input[name="users[${num}][legal_first_name]"]`).inputValue()}.${await this.page.locator(`input[name="users[${num}][legal_last_name]"]`).inputValue()}${"@oneid.on.ca"}`;
            //console.log("fullName---------------",fullName);
            const elm=this.page.locator(`input[name="users[${num}][oneid_user_name]"]`);;
            await ClickButton(elm);
            await EnterValue(elm, fullName);
        }
           
        //Nurse
        
      async VerifyNurseList(num:number) 
      {
            const elm=this.page.locator(`select[name="users[${num}][nurse_category]"]`);
            await ClickButton(elm);
            await expect(elm).toBeVisible();
            const actualOptionsRaw  = await elm.allTextContents();
                  const actualOptions = actualOptionsRaw
                  .flatMap(text => text.split('\n'))
                  .map(text => text.trim())
                  .filter(text => text.length > 0);
            //console.log('Actual options:----------', actualOptions);

            const expectedOptions = [
               'Registered Nurse (RN)',
               'Registered Practical Nurse (RPN)',
               'Nurse Practitioner (NP)'
                      ];
            for (const expected of expectedOptions) 
               {
                expect(actualOptions).toContain(expected);
               }


      }

        
      async SelectNurseCategory(selectValue: string,num:number) 
      {
              const elm=this.page.locator(`select[name="users[${num}][nurse_category]"]`);
              await ClickButton(elm);
           //   if(selectValue=="Physician")
            //  {
                  await SelectDropDownValue(elm,selectValue);
            //  }
      }

      async SelectClinicalSpeciality(selectValue: string,num:number) 
      {
              const elm=this.page.locator(`select[name="users[${num}][provider_service]"]`);
              await ClickButton(elm);
            await SelectDropDownValue(elm,selectValue);

      }

      async EnterLegalFname(fillData:string,num:number) 
      {
            
             const elm=this.page.locator(`input[name="users[${num}][legal_first_name]"]`);
              await ClickButton(elm);
              await EnterValue(elm,fillData);
      }
          
      async EnterLegalLname(fillData:string,num:number) 
      {
            const elm=this.page.locator(`input[name="users[${num}][legal_last_name]"]`);
              await ClickButton(elm);
              await EnterValue(elm,fillData);
      }
          
   //MedicalStudent
   async EnterInitial(fillData:string,num:number) 
      {
            const elm=this.page.locator(`input[name="users[${num}][middle_initial]"]`);
              await ClickButton(elm);
              await EnterValue(elm,fillData);
      }
      async EnterUniversity(fillData:string,num:number) 
      {
            const elm=this.page.locator(`input[name="users[${num}][registered_with_text]"]`);;
              await ClickButton(elm);
              await EnterValue(elm,fillData);
      }
   
   

      async ClickOnPrimaryContact() 
      {
            const elm=this.PrimaryContactLink;
              await ClickButton(elm);

      }
         async ClickOnAddAccounts() 
      {
            const elm=this.AddAccountsLink;
              await ClickButton(elm);

      }

      async ClickOnAddOTnHubAccount() 
      {
            const elm=this.AddOTNHubAccountLink;
              await ClickButton(elm);
              await delay(4000);

      }
             async CloseAddOTnHubAccount() 
      {
            const elm=this.CloseOTNHubSpan;
              await ClickButton(elm);

      }

    
        // async getProfession(num:number) 
        // {
        //       const professionValue=this.page.locator(`select[name="users[${num}][profession]"]`).innerText();
        //       return professionValue;

            
        // }









}
