import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { SharedMethods } from "../Utils/SharedMethods";
//import * as fs from 'fs';
import { sharedData } from '../Utils/SharedMethods';


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export class LoginPage 
{
    private sharedMethods: SharedMethods;
    readonly page: Page;

    //Locators
    readonly otnCredentialsButton: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly signInButton: Locator;
    readonly UserName: Locator;
    readonly SignOut: Locator;

 

  

    constructor(page: Page) 
    {
        this.sharedMethods = new SharedMethods();
        this.page = page;

        this.otnCredentialsButton = page.locator('//*[@id="btnOTNCredentials"]');
        this.userName = page.locator('//*[@id="Ecom_User_eMail"]');
        this.password = page.locator('//*[@id="Ecom_Password"]');
        this.signInButton = page.locator('xpath=//input[@value="Sign In"]');
        this.UserName = page.locator('//div[@aria-label="Surya TestEnv"]');
        this.UserName = page.locator('//span[@class=\'MuiButton-endIcon MuiButton-iconSizeLarge css-1ab87kf\']');
        this.SignOut = page.locator('//p[normalize-space()="Sign out"]');
       

        
        

    }

    async navigate() {
        await this.page.goto('https://econsult.testotn.ca');
    }

     async ClickOtnCredentialsButton() {

    await this.otnCredentialsButton.click();

  }

    async SelectButton(buttonText: string) 
    {              
                    if(buttonText === "Assign")
                    {
                       const elm=this.page.getByRole('button', { name: `${buttonText}`, exact: true });
                       this.sharedMethods.ClickButton(elm);
                       console.log("Case Assigned");
                     
                    }
                    else if(buttonText === "Unassign")
                    {  const elm=this.page.getByRole('button', { name: `${buttonText}`, exact: true });
                       this.sharedMethods.ClickButton(elm);
                      console.log("Case unassigned");
                    }
                    else if(buttonText === "Search")
                    {
                       //const elm = this.page.getByText(buttonText, { exact: true });
                        const elm = this. page.locator('(//*[name()="path"][@id="search.2"])');
                       this.sharedMethods.ClickButton(elm);
                    }
                    else
                    { //Request Consult
                      const elm=this.page.getByRole('button', { name: `${buttonText}`, exact: true });
                       this.sharedMethods.ClickButton(elm);
                    }
                    




          //await this.page.getByRole('button', { name: `${buttonText}`, exact: true }).click();
          // const elm=this.page.getByRole('button', { name: `${buttonText}`, exact: true });
          // this.sharedMethods.ClickButton(elm);
          //await this.page.locator(`//*[@role="button" and contains(., "${buttonText}")]`).click();

   }
     async ClickOnTab(buttonText: string) 
    {

    //await this.page.getByRole('tab', { name: `${buttonText}`, exact: true }).click();
    await this.page.locator(`//*[@role="tab" and contains(., "${buttonText}")]`).click();

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
    //await this.page.pause();
    await this.signInButton.click();
  }
  
    async LogOut() 
    {
    await this.UserName.click();
    await this.SignOut.click();
     await delay(8000);
    }





}