import { Locator, Page ,expect} from "@playwright/test";

    export async function scrollToTheElement(page:Page,ele:string)
    {
         const element = page.locator(ele);
         element.waitFor({ state: 'visible' });
         element.scrollIntoViewIfNeeded();

    }

    
      export async function ClickButton(page:Page,ele:Locator)
    {
          await ele.click();


    }
    export async function EnterValue(page:Page,ele:Locator,fillData:string)
    {

      await ele.fill(fillData);
      await ele.press('Enter');
    }
    
    
    