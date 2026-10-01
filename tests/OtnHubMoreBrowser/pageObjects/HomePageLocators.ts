import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { scrollToTheElement ,ClickButton} from "../Utils/SharedMethods";


function delay(ms: number) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
export class HomePage 
{
      readonly page: Page;
      readonly context: BrowserContext;
      //Locators
      readonly otnCredentialsButton: Locator;
      readonly oneIdButton: Locator;
      readonly notSurelink: Locator;
      readonly UnSureClose: Locator;
      readonly UnsureText: Locator;
      readonly signUpOtnLink: Locator;
      readonly signUpOtnText: Locator;
      readonly OtnLink: Locator;
      readonly signUpLink: Locator;
      readonly CaroselOne: Locator;
      readonly CaroselOneItem: Locator;
      readonly CaroselTwoItem: Locator;
      readonly CaroselTwo: Locator;
      readonly SupportResource: Locator;
      readonly TrainingCentre: Locator;
      readonly ResourceLibrary: Locator;
      readonly Physician: Locator;
      readonly Nurse: Locator;
      readonly Administrator: Locator;
      readonly Contact: Locator;
      readonly Physician2: Locator;
      readonly orgSignUp: Locator;
      readonly ExpSignUp: Locator;
      readonly FAQ: string;
      readonly HCOSignUp2: Locator;

      

      
      readonly AlredyMember: string;
      readonly NotMember: string;
      readonly AlredyOTnHub: string;
      readonly NotOTnHub: string;
      readonly HCOSignUp: string;
      
      readonly IWorkOrg: string;
      readonly IndependentPr: string;
      readonly HaveOneID: string;
      readonly DontHaveOneID: string;
      readonly MedicalFellow: string;
      readonly emailField: string;
      readonly selectAccountText: string;
      readonly otnCAText: string;
      readonly econsultText: string;
      readonly econsultQLinkText: string;
      readonly scrollText: string;
      readonly scrollText2: string;
      readonly PractiseSignUp: string;
      readonly GetOneID: string;
      readonly ExpressSignUpTxt: string;

    

      constructor(page: Page, context: BrowserContext) 
      {
        this.page = page;
        this.context = context;
        this.otnCredentialsButton = page.locator('text=OTN Credentials');
        this.oneIdButton = page.locator('//a[text()="OTN Credentials"]/following::a[1]');
        this.notSurelink =  page.locator('//a[text()="OTN Credentials"]/following::a[2]');
        this.UnSureClose =  page.locator('#not-sure');
        this.UnsureText =  page.locator('text="Unsure how to log in?"');

        this.signUpOtnLink = page.locator('text=Sign up for OTNhub').nth(0);
        this.signUpOtnText = page.locator('text=Sign up for an OTNhub account').nth(0);
        this.OtnLink = page.locator('text=otn.ca').nth(0);
        this.signUpLink = page.locator('text= Sign up.').nth(0);
 
       // this.CaroselOne = page.locator('a.flex-active');
        this.CaroselOne = page.locator('a', { hasText: '1' }).nth(1);
        this.CaroselOneItem = page.locator('//*[@id="post-6387"]/div/div/div/div[1]/div[4]/div/div[2]/div/div/div[2]/div/a[1]');
        this.CaroselTwo = page.locator('a', { hasText: '2' });
        this.CaroselTwoItem = page.locator('//*[@id="post-6387"]/div/div/div/div[1]/div[4]/div/div[2]/div/div/div[2]/div/a[2]');
        this.SupportResource =  page.locator('text=Support Resources');
        this.TrainingCentre =  page.locator('//h3[text()="Training Centre"]');

        this.ResourceLibrary =  page.locator('//h3[text()="Resource Library"]');

        this.Physician = page.locator('text=I\'m a physician, medical fellow, resident, or medical student');
        const targetButton = page.locator("//button[text()=\"I'm a medical fellow, medical resident, or medical student\"]");
        this.Physician2 = targetButton.locator('xpath=preceding-sibling::button[1]');
        this.AlredyMember = 'text= Yes, my organization is already a member';
        this.NotMember = 'text= No, my organization isn’t a member yet';
        this.AlredyOTnHub = "text= Yes, I already have an OTNhub account with another organization";
        this.NotOTnHub = "text= No, I don’t have an OTNhub account with another organization";
        this.Nurse = page.locator('text= nurse practitioner, allied');
        this. Administrator = page.locator('text=  administrator or support staff');
        this. Contact = page.locator('text=primary contact service');

        this.HCOSignUp = 'text= Health Care Organization Sign Up';
        this.HCOSignUp2 = page.locator('a[href="https://signup.otn.ca/org-signup/"]', { hasText: 'Health Care Organization Sign Up' });
        this.IndependentPr = "text= I’m an independent practitioner";
       


        this.emailField = '#Ecom_User_eMail';
        this.selectAccountText = 'text=Select Your Account Provider';
        this.otnCAText = 'text=/^Making access to care better/';
        //this.econsultText = 'text=eConsult Improvements';
        this.econsultText = 'text=Customer Satisfaction Survey Now Open';
        this.econsultQLinkText = 'text=OTNhub Quick Links';
        this.scrollText = 'text=You’ll need to belong to an OTNhub member organization.';
        this.scrollText2 = 'text=Frequently Asked Questions';
        this.PractiseSignUp = 'text=Private Practice Sign Up';
        this.HaveOneID = "text= Yes, I have my ONE® ID";
        this.DontHaveOneID ="text= No, I don’t have a ONE® ID";
        this.GetOneID = 'text=Get your ONE® ID from CPSO';
        this.IWorkOrg = 'text= I work at an organization';
        this.ExpressSignUpTxt = 'text=ONE® ID Express Sign Up';
        this.MedicalFellow = 'text=I\'m a medical fellow';
        this.orgSignUp=page.locator('//a[normalize-space(text())="Organization Sign Up"]');
        this.ExpSignUp=page.locator('//a[normalize-space(text())="Express Sign Up"]');
        this.FAQ='//h5[@class="et_pb_toggle_title"]';

        
        
        

        
      }

    //PART 4
      async clickORGSignUp(page:Page)
      {
          await ClickButton(this.orgSignUp)
       
      }
      async ClickExpressSignUp(page:Page)
      {
          await ClickButton(this.ExpSignUp)
       
      }
      async ClickFAQ(page:Page,num:number)
      {
          const elm=page.locator(this.FAQ).nth(num);
          await ClickButton(elm)
       
      }
     
  
 //PART 3

      async ScrollToElement(page:Page,txt:string)
      {
        
        if(txt=="OTNhubMembership")
        {
          await scrollToTheElement(page, this.scrollText);
        }
        if(txt=="FrequentlyAskedQuestions")
        {
          await scrollToTheElement(page, this.scrollText2);
        }

        
        
      }
      async clickRole(page:Page,role:string)
      {
         if(role=="Physician")
        {
          console.log("Physician");
          await ClickButton(this.Physician)
        }

         if(role=="Nurse")
        {
          await ClickButton(this.Nurse)
        }

           if(role=="Administrator")
        {
          await ClickButton(this.Administrator)
        }

        if(role=="Contact")
        {
          await ClickButton(this.Contact)
        }

        if(role=="Physician2")
        {
          await ClickButton(this.Physician2)
        }
        


      }
    

       async assertClassActive(page:Page,role:string,num:number)
      {
           if(role=="Physician")
        {
          let classAttr = await this.Physician.getAttribute('class');
          expect(classAttr).toContain('active');
        }
             if(role=="Nurse")
        {
          let classAttr = await this.Nurse.getAttribute('class');
          expect(classAttr).toContain('active');
        }
             if(role=="Administrator")
        {
          let classAttr = await this.Administrator.getAttribute('class');
          expect(classAttr).toContain('active');
        }
             if(role=="Contact")
        {
          let classAttr = await this.Contact.getAttribute('class');
          expect(classAttr).toContain('active');
        }
              if(role=="Iwork")
        {
          let classAttr = await page.locator(this.IWorkOrg).nth(num).getAttribute('class');
          expect(classAttr).toContain('active');
        }

        
      }

      async assertClassNonActive(page:Page,role:string)
      {
        if(role=="Physician")
        {
          let classAttr = await this.Physician.getAttribute('class');
          expect(classAttr).not.toContain('active');
        }
        if(role=="Nurse")
        {
          let classAttr = this.Nurse.getAttribute('class');
          expect(classAttr).not.toContain('active');
        }
        if(role=="Administrator")
        {
          let classAttr = await this.Administrator.getAttribute('class');
          expect(classAttr).not.toContain('active');
        }
        if(role=="Contact")
        {
          let classAttr = await this.Contact.getAttribute('class');
          expect(classAttr).not.toContain('active');
        }
      }
      async clickWorkAtOrg(page:Page,num:number)
      {
 
          const elm=page.locator(this.IWorkOrg).nth(num);
          await ClickButton(elm)
       
      }
       async clickAlreadyMember(page:Page,num:number)
      {
        const elm=page.locator(this.AlredyMember).nth(num);
          await ClickButton(elm)
       
      }
       async clickNotMember(page:Page,num:number)
      {
        const elm=page.locator(this.NotMember).nth(num);
          await ClickButton(elm)
       
      }
      async clickAlredyOTNHub(page:Page,num:number)
      {
        
        const elm=page.locator(this.AlredyOTnHub).nth(num);
          await ClickButton(elm);
      }

       async clickDontOTNHub(page:Page,num:number)
      {
        
        const elm=page.locator(this.NotOTnHub).nth(num);
          await ClickButton(elm)
       
      }
      async clickNotOTNHub(page:Page,num:number)
      {
        const elm=page.locator(this.NotOTnHub).nth(num);
          await ClickButton(elm)
       
      }

      
      
      async clickHCOSignUp(page:Page,num:number)
      {
         const elm=page.locator(this.HCOSignUp).nth(num);
          await ClickButton(elm)
       
      }
      async clickHCOSignUp2(page:Page,num:number)
      {
         const elm=this.HCOSignUp2;
          await ClickButton(elm)
       
      }

//       {
// await page.locator('a[href="https://signup.otn.ca/org-signup/"]', { hasText: 'Health Care Organization Sign Up' }).click();

        
//       }
      async clickIndepenedentPractioner(page:Page,num:number)
      {
        const elm=page.locator(this.IndependentPr).nth(num);
          await ClickButton(elm)
       
      }
        async clickHaveOneID(page:Page,num:number)
      {
         
          const elm=page.locator(this.HaveOneID).nth(num);
          await ClickButton(elm)
       
      }
      async PrivatePractiseSignUp(page:Page,num:number)
      {
          const elm=page.locator(this.PractiseSignUp).nth(num);
          await ClickButton(elm)
       
      }

       async clickDontHaveOneID(page:Page,num:number)
      {
          const elm=page.locator(this.DontHaveOneID).nth(num);
          await ClickButton(elm)
       
      }
          async GetOneIDCPSO(page:Page,num:number)
      {
          const elm=page.locator(this.GetOneID).nth(num);
          await ClickButton(elm)
       
      }
        async ExpressSignUp(page:Page,num:number)
      {
        
          const elm=page.locator(this.ExpressSignUpTxt).nth(num);
          await ClickButton(elm)
       
      }
      
        async clickMedicalFellow(page:Page,num:number)
      {
          
          const elm=page.locator(this.MedicalFellow).nth(num);
          await ClickButton(elm)
       
      }


      //PART 1
      
      async clickOtnCredentialsButton(): Promise<Page> 
      {
            const [newPage] = await Promise.all([
              this.context.waitForEvent('page'),
              this.otnCredentialsButton.click()
            ]);
            await newPage.waitForLoadState();
            return newPage;
      }
      async assertEmailFieldVisible(page: Page)
      {
          await expect(page.locator(this.emailField)).toBeVisible();
      }

      async clickOneIdButton(): Promise<Page> 
      {
            const [newPage] = await Promise.all([
              this.context.waitForEvent('page'),
              this.oneIdButton.click()
            ]);
            await newPage.waitForLoadState();
            return newPage;
      }
      async assertSelectAccountTextVisible(page: Page) 
      {
          await page.waitForLoadState();
          await expect(page.locator(this.selectAccountText)).toBeVisible();
      }

     async clickNotSureLink(): Promise<void> 
     {
        await this.notSurelink.click();
        await delay(5000);
       // await this.UnsureText.waitFor({ state: 'visible' });
        await expect(this.UnsureText).toBeVisible();
      }

      async clickSignUpOTN(): Promise<void> 
      {
        await this.signUpOtnLink.click();

      }
      async assertsignUpOtnTextVisible() 
      {
          await this.page.waitForLoadState();
          await expect(this.signUpOtnText).toBeVisible();
      }

      async clickOtnCAlink(homePage:Page): Promise<void> 
      {
            
        await Promise.all([
              homePage.waitForNavigation({ waitUntil: 'load' }),
              this.OtnLink.click()
            ]);

      }
      async assertOtnCaTextVisible(page: Page) 
      {
          //await page.waitForLoadState();
          await expect(page.locator(this.otnCAText)).toBeVisible();
      }

       async clickSignUpLink(): Promise<void> 
      {
        await this.signUpLink.click();

      }
      

         //PART 2
    
      async asserteConsultTextVisible(page: Page) 
      {

          await expect(page.locator(this.econsultText)).toBeVisible();
      }

      async clickCarosels(page:Page)
      {
          scrollToTheElement(page,this.econsultQLinkText);

          await this.CaroselOne.click();
          await this.CaroselTwo.click();
          await this.CaroselOne.click();
        
      }
       async clickCaroselsItems(page:Page)
      {
          scrollToTheElement(page,this.econsultQLinkText);

          await this.CaroselOne.click();
          await this.CaroselOneItem.click();
          await page.goBack();
          await this.CaroselTwo.click();
          await this.CaroselTwoItem.click();
          await page.goBack();
        
      }

      async clickSupportResources(page:Page): Promise<Page> 
      {

           scrollToTheElement(page,this.econsultQLinkText);
           await delay(9000);
       // await this.UnsureTex
          
            const [newPage] = await Promise.all([
              this.context.waitForEvent('page'),
              this.SupportResource.click()
            ]);
            await newPage.waitForLoadState();
            return newPage;
      }
      async assertnewSupportResourcesPageURL(page: Page)
      {
          expect(page.url()).toBe('https://otnhub.ca/help/');
      }


       async clickTrainingCentre(page:Page): Promise<Page> 
      {
           scrollToTheElement(page,this.econsultQLinkText);
            const [newPage] = await Promise.all([
              this.context.waitForEvent('page'),
              this.TrainingCentre.click()
            ]);
            await newPage.waitForLoadState();
            return newPage;
      }
      async assertnewTrainingCentrePageURL(page: Page)
      {
          expect(page.url()).toBe('https://training.otn.ca/');
      }

       async clickResourceLibrary(page:Page): Promise<Page> 
      {
            scrollToTheElement(page,this.econsultQLinkText);
            const [newPage] = await Promise.all([
              this.context.waitForEvent('page'),
              this.ResourceLibrary.click()
            ]);
            await newPage.waitForLoadState();
            return newPage;
      }
         async assertnewResourceLibraryPageURL(page: Page)
      {
          expect(page.url()).toBe('https://otnhub.ca/resource-library/');
      }
  

      



}
