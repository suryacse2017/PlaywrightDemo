import { Locator, Page ,expect} from "@playwright/test";

    export async function scrollToTheElement(page:Page,ele:string)
    {
         const element = page.locator(ele);
         element.waitFor({ state: 'visible' });
         element.scrollIntoViewIfNeeded();

    }

    
      export async function ClickButton(ele:Locator)
    {
          await ele.click();

    }
    export async function EnterValue(ele:Locator,fillData:any)
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

    export async function SelectDropDownValue(ele:Locator,selectValue:string)
    {

      await ele.selectOption({ label: selectValue });

    }
    
    
    
    