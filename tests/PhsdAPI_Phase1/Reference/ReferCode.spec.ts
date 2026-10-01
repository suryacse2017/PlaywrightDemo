import { test, expect, request } from '@playwright/test';
import { resources } from "../../../res/resource";
import { fabricatedToken , logApiCall} from "../../../res/resource";  // Import function 
import { requestBody,requestBodyInvalidInputFormat,requestBodyMissingInputFormat,requestBodyInvalidInput,requestBodyMissingInput,requestBodyInvalidUrl,requestBodyMissingUrl} from "../../../res/resource";
import { encode } from 'punycode';



let jwtToken: any;
let baseURL1: any;
let resource: any;
let baseURL: any;
let contentLocationURL:string;
let bucketURL:any;
let importBaseURL:any;
let uploadURL:any;

function sleep(ms: number): Promise<void> 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

test.beforeAll(async () => 
{
    baseURL1 = test.info().project.use.baseURL;
    resource = resources.BulkExport;
    baseURL = baseURL1 + resource;
    resource = resources.BulkImport;
    importBaseURL = baseURL1 + resource;

}

);



{//Search by Bulk Export GET 


test('Get_Bulk Export - HealthcareService-happy path - step 1/4', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}` 
                
                };
            
                let params:any;
                params = new URLSearchParams({
                    "_type":"HealthcareService",
                    "_since":"2024-09-02T14:32:50.000-04:00",
                    "_outputFormat":"application/fhir+ndjson",
                    "_typeFilter":"program=Connex",
                    
                }).toString();
        
                const fullUrl = `${baseURL}?${params.toString()}`;
                const response = await request.get(`${baseURL}?${params.toString()}`, { headers });

                await logApiCall({
                    method: 'GET',
                    fullUrl,
                    headers,
                    response,
                  });
           
                let responseHeaders = response.headers();
          
                expect(response.status()).toBe(202); 
                contentLocationURL= responseHeaders['content-location']; 
               // console.log("-------"+contentLocationURL);

    });

test('GET_Bulk Export - Response from Bulk Status - HealthcareService- step 2/4', async ({ request }) => 
   {
            const fabToken = await fabricatedToken("TH811"); 
            
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async'
            };
           // console.log("contentLocationURL-------"+contentLocationURL);

                           
                                const url2=contentLocationURL.trim();
                                const result1 = url2.split('=')[0];
                                let result2 = url2.split('=')[1];
                                result2 = decodeURIComponent(result2);
                                const result = `${result1}=${result2}`;
                       
                let status = 0;
                let maxAttempts = 10;
                let attempt = 0;
                let response;
                const fullUrl=result;
                while (attempt < maxAttempts) 
                {
                    response = await request.get(result, { headers });
                    status = response.status();
                    console.log(`Attempt ${attempt + 1}: status = ${status}`);
                    
                    if (status === 200) {
                        console.log('✅ Export is ready!');
                        break;
                    } else if (status === 202) {
                        console.log('⏳ Export still processing...');
                        await new Promise(r => setTimeout(r, 3000)); // wait 3 seconds
                    } else {
                        console.error(`❌ Unexpected status: ${status}`);
                        break;
                    }
                    attempt++;
                }
                
                if (status !== 200) {
                    throw new Error(`Export not ready after ${maxAttempts} attempts`);
                }                
                        await logApiCall({
                            method: 'GET',
                            fullUrl,
                            headers,
                            response,
                        });
                const jsonResponse = await response.json(); 
                uploadURL = jsonResponse.output[0].url;
    
    });

/* reference
    test('GET2_Bulk Export - Response from Bulk Status - HealthcareService- step 2/4', async ({ request }) => 
        {
            const fabToken = await fabricatedToken("TH811"); 
            
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async'
            };
            console.log("contentLocationURL-------"+contentLocationURL);
                    //  const queryParam = encodeURIComponent("exportStatus=export-2025-04-30T16:22:22.247");
                    //  const url = `https://api-sandbox.awsstagingotn.ca/hsd/directory/v1/$export?_typeFilter=${queryParam}`;
                    //  const response = await request.get(url, { headers });
    
            const url2 = contentLocationURL.trim(); 
            const result1 = url2.split('=')[0];
            let result2 = url2.split('=')[1];
            
            result2 = decodeURIComponent(result2);
            
            const result = `${result1}=${result2}`;
            
            let status = 0;
            let maxAttempts = 10;
            let attempt = 0;
            let response;
            
            while (attempt < maxAttempts) 
            {
                response = await request.get(result, { headers });
                status = response.status();
                console.log(`Attempt ${attempt + 1}: status = ${status}`);
                
                if (status === 200) {
                    console.log('✅ Export is ready!');
                    break;
                } else if (status === 202) {
                    console.log('⏳ Export still processing...');
                    await new Promise(r => setTimeout(r, 3000)); // wait 3 seconds
                } else {
                    console.error(`❌ Unexpected status: ${status}`);
                    break;
                }
                attempt++;
            }
            
            if (status !== 200) {
                throw new Error(`Export not ready after ${maxAttempts} attempts`);
            }
            
                             
            // await sleep(29300);
            
            // expect(response.status()).toBe(200); // or 202 depending on server behavior

    
    
        });*/
   
            


}


//  If There’s No Close Button?
// Click Outside
// await page.mouse.click(0, 0);
//  Press Escape Key
// await page.keyboard.press('Escape');

        
         //await page.locator(this.econsultText).scrollIntoViewIfNeeded();
          //           await page.evaluate(() => {
          //   window.scrollBy(0, window.innerHeight); // scroll down by one viewport height
          // });
       // await this.CaroselOne.scrollIntoViewIfNeeded();
       // await page.reload();

       //Refer
{


  /*
  test('Open https://otnhub.ca in Chrome', async () => 
  {
          // Launch browser with "chrome" channel — this also supports Microsoft Edge if installed as Edge Chromium
          const browser = await chromium.launch({
            headless: false, // set to true to run headless
            channel: 'chrome' // Change to 'msedge' for Microsoft Edge if you prefer
          });
  
          const context = await browser.newContext();
          const page = await context.newPage();
            await page.evaluate(() => {
          window.moveTo(0, 0);
          window.resizeTo(screen.availWidth, screen.availHeight);
        });
  
          // Navigate to the URL
          await page.goto('https://otnhub.ca');
  
          // Optionally, verify the page loaded
          await expect(page).toHaveURL('https://otnhub.ca/');
  
  
  
            // Wait for new page to open on clicking OTN Credential
            const [newCredentialPage] = await Promise.all([
              context.waitForEvent('page'), // Wait for the new tab
              await homePage.locator('text=OTN Credentials').click()
            ]);
  
            await newCredentialPage.waitForLoadState(); // Wait for the new page to load
  
            // Now check for the field on the new page
            await expect(newCredentialPage.locator('#Ecom_User_eMail')).toBeVisible();
            await homePage.bringToFront(); // go to home page
  
  
  
            //click on OneID
            const [oneIdPage] = await Promise.all([
              context.waitForEvent('page'),
              await homePage.locator('//a[text()="OTN Credentials"]/following::a[1]').click()
  
            ]);
            await oneIdPage.waitForLoadState();
            await expect(oneIdPage.locator('text=Select Your Account Provider')).toBeVisible();
            await homePage.bringToFront();
  
            //Click on notsure
             //await homePage.locator('//a[text()="OTN Credentials"]/following::a[1]').click()
             //await homePage.locator('text="Unsure how to log in?"');
  
  
    
  
  // });*/

}

/*
test.only('TC10_Get_Bulk Export Connex - response from the status endpoint', async ({ request }) => 
    {
            test.setTimeout(2000000);
            fabToken = await fabricatedToken("Connex"); 
           const headers = {
                        'Authorization': `Bearer ${fabToken}` 
                    
                    };
            
            let params:any;
            params = new URLSearchParams({
                
            }).toString();
            //const fullUrl= `${statusURL}${params.toString()}`;
           // const response = await request.get(`${statusURL}${params}`, { headers });
           // const response = await request.get("https://api2.awsdevotn.ca/hsd/directory/v1/$export?_typeFilter=exportStatus%3Dexport-2025-04-15T15:22:04.582");
           // const fullUrl="https://api2.awsdevotn.ca/hsd/directory/v1/$export?_typeFilter=exportStatus%3Dexport-2025-04-15T15:22:04.582";

                

                            const url2=statusURL.trim();
                            // const result1 = url2.split('=')[0];
                            // let result2 = url2.split('=')[1];
                            // result2 = decodeURIComponent(result2);
                            // const result = `${result1}=${result2}`;
                            const result = url2;
                
                        
            let status = 0;
            let maxAttempts = 20;
            let attempt = 0;
            let response;
            const fullUrl = result;
               while (attempt < maxAttempts) 
            {
                response = await request.get(result, { headers });
                status = response.status();
                console.log(`Attempt ${attempt + 1}: status = ${status}`);
                
                if (status === 200) {
                    console.log('✅ Export is ready!');
                    break;
                } else if (status === 202) {
                    console.log('⏳ Export still processing...');
                    await new Promise(r => setTimeout(r, 3000)); // wait 3 seconds
                } else {
                    console.error(`❌ Unexpected status: ${status}`);
                    break;
                }
                attempt++;
            }
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
                });
            if (status !== 200) {
                throw new Error(`Export not ready after ${maxAttempts} attempts`);
            } 
            const responseBody = await response.json();
            bucketURL = responseBody.output[0].url;

    }); 
    await expect(page.locator(this.AlredyOTnHub).nth(num)).toBeVisible();
    //await delay(30000);


    test('TC1_OrgSignUp page1 Enter Org_Name', async ({ context, homePage }) => 
{
           
            appPage=homePage;
            otnHub = new OrgSignUpPage(appPage, context);
             //await appPage.pause();
            //test.setTimeout(20000);

            // await otnHub.EnterOrganizationName(appPage, "Cancer Care Ontario");
            // await otnHub.ClickOnCancel(appPage);
            // await otnHub.EnterOrganizationName2(appPage, "Cancer Care Ontario");
            // await otnHub.ClickOnConfirm(appPage);
            // await otnHub.EnterOrganizationName2(appPage, "Cancer Care Ontario");
            // await otnHub.ClosePopUpWindow(appPage);
            // //await delay(3000);
            // await otnHub.ClickOnAppCancel(appPage);
            // await otnHub.ClickOnNo(appPage);
            //                               //      await otnHub.ClickOnAppCancel(appPage);
            //                               //      await otnHub.ClickOnYes(appPage);

            await otnHub.EnterOrganizationNameDropDown(appPage, "Cancer");
            await otnHub.ClickOnConfirm(appPage);
            await otnHub.ClickOnNext(appPage,1);

            // await context.storageState({ path: 'storageState.json' });
            // await context.close();
            
            //await appPage.pause();


});


test('TC2_OrgSignUp page1 Enter Org_Name', async () => 
{
//       // ✅ Test 2 - Continue from saved session
//        if (!fs.existsSync('storageState.json')) {
//     throw new Error("⚠️ storageState.json not found. Run TC1 test first.");
//   }
//  // Create new browser context with saved state
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext({ storageState: 'storageState.json' });
//   const homePage = await context.newPage();
            await appPage.pause();
//             //test.setTimeout(20000);

//             const otnHub = new OrgSignUpPage(homePage, context);

            await otnHub.EnterFirstName(appPage, "Surya");



});
    
    */