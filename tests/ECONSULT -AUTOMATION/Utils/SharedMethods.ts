import { Locator, Page ,expect} from "@playwright/test";
// sharedContext.ts
export const sharedData = {
    CASEID: '332470587',
    CASEIndex:0,
    CASEUserName:'',
    CASEComment:'',
    CASECreatedDateTime:'',
    CASECreatedDateTime2:'',
    CASEName:'',
    CASEPatientName:'',
    CASEPatientGender:'',
    CASEAge:'',
    CASEProgramName:'',
    CASEFileName:'',
    
};
export class SharedMethods
{

  // static caseID:string="";

  //   static getIds():string
  //   {
  //       return SharedMethods.caseID;

  //   }
    async scrollToTheElement(page:Page,ele:string)
    {
         const element = page.locator(ele);
         element.waitFor({ state: 'visible' });
         element.scrollIntoViewIfNeeded();

    }

    
      async  ClickButton(ele:Locator)
    {
          await ele.click();

    }
   async  EnterValue(ele:Locator,fillData:any)
    {
                
          if (typeof fillData === 'string') 
          {
           await ele.fill(fillData);
      
          } 
          else 
          {
            await ele.fill(`${fillData}`);
          }
          await ele.press('Enter');

    }
     async  EnterTextBoxValue(ele:Locator,fillData:any)
    {
                
          if (typeof fillData === 'string') 
          {
           await ele.fill(fillData);
      
          } 
          else 
          {
            await ele.fill(`${fillData}`);
          }
          

    }


    async  SelectDropDownValue(ele:Locator,selectValue:string)
    {

      await ele.selectOption({ label: selectValue });

    }
    
    
}    
    