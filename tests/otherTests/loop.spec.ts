import { test, expect, Page, Locator } from '@playwright/test';


test('QAT-3', async ({ page }) => {
    await page.goto('https://sso.stagingotn.ca/');

    let bannerText = await page.getByRole('banner').innerText()
    let bannerList = bannerText.split('\n')
    
    let headers = await page.getByRole('heading').all()
    headers = headers.slice(0,-1)

    for (let i = 0; i < headers.length; i++) {
        const message = headers[i]
        const messageContent = bannerList[i*2+1]
        let messageContentList = messageContent.split(" ")
        let counter = 0; let words = 0;
        const messageText = bannerList[i*2]+"-"+messageContent.slice(0,25)

        const pagePromise = page.waitForEvent('popup');
        await message.click()
        const page1 = await pagePromise
        const pageContent = (await page1.locator('div > .et_builder_inner_content > .et_pb_section > .et_pb_row').innerText());

        for (let word of messageContentList) {
            if (word === "|"){
                break
            }
            word = word.replace(/[^a-z0-9]/gi, '');

            if (!["–","_","-",""].includes(word)){
                if (pageContent.includes(word)){
                    let count = (pageContent.match(new RegExp(word,'g')) || []).length;
                    // console.log(word,count)
                    counter = counter + count
                    words = words + count-1
                }             
                words++   
            }
        }
        let percent = Math.round((counter/words) * 10000)/100
        // console.log(counter, words, percent)
        await page1.screenshot({ path: `./helper/screenshots/${i+1}-${percent}-${messageText}.png`, fullPage: true });

        // await page1.waitForTimeout(2000);
        await page1.close()
    }
    await page.screenshot({ path: `./helper/screenshots/HomeScreen.png`, fullPage: true });
    // await page.waitForTimeout(1000);
    await page.close()
});


