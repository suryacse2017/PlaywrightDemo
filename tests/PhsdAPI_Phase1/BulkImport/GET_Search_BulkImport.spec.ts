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
let contentLocationURL2:string;
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

//Postman->Bulk Import _PHSD copy SK

{//Happy Path


test('TC1_Get_Bulk Export - HealthcareService-happy path - step 1/4', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("Connex"); 
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


    });

test('TC2_GET_Bulk Export - Response from Bulk Status - HealthcareService- step 2/4', async ({ request }) => 
   {
            const fabToken = await fabricatedToken("Connex"); 
            
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

test('TC3_POST_Bulk Import - HealthcareService-happy path - step 3/4', async ({ request }) => 
{
            const fabToken = await fabricatedToken("Connex"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBody(uploadURL,"HealthcareService"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(202); 
            contentLocationURL2= responseHeaders['content-location']; 

});

}
{//HealthcareService
    
       

test('TC4_GET_Bulk Import -  HealthcareService - step 4/4', async ({ request }) => 
{
        test.setTimeout(200000);
        const fabToken = await fabricatedToken("Connex"); 
        
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async'
        };
                    
                    const url2=contentLocationURL2.trim();
                    const result1 = url2.split('=')[0];
                    let result2 = url2.split('=')[1];
                    result2 = decodeURIComponent(result2);
                    const result = `${result1}=${result2}`;
        
                
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

});

test('TC5_POST_HealthcareService Import - invalid inputFormat should failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyInvalidInputFormat(uploadURL,"HealthcareService"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(514); 

});

test('TC6_POST_HealthcareService Import - missing inputFormat should  failed', async ({ request }) => 
{
        const fabToken = await fabricatedToken("TH811"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'                
        
        };
        const reqBody = await requestBodyMissingInputFormat(uploadURL,"HealthcareService"); 

        const fullUrl = importBaseURL;
        const response = await request.post(importBaseURL, {headers,data: reqBody});
        
        await logApiCall({
            method: 'POST',
            fullUrl,
            headers,
            response,
            });
    
        let responseHeaders = response.headers();
    
        expect(response.status()).toBe(400); 

});
test('TC7_POST_HealthcareService Import - Invalid input type', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyInvalidInput(uploadURL,"HealthcareService"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});

test('TC8_POST_HealthcareService Import - missing input type', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyMissingInput(uploadURL); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});

test('TC9_POST_HealthcareService Import - Invalid input url should failed', async ({ request }) => 
{
        const fabToken = await fabricatedToken("TH811"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'                
        
        };
        const reqBody = await requestBodyInvalidUrl(uploadURL,"HealthcareService"); 

        const fullUrl = importBaseURL;
        const response = await request.post(importBaseURL, {headers,data: reqBody});
        
        await logApiCall({
            method: 'POST',
            fullUrl,
            headers,
            response,
            });
    
        let responseHeaders = response.headers();
    
        expect(response.status()).toBe(400); 

});

test('TC10_POST_HealthcareService Import - missing input url should failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyMissingUrl("HealthcareService"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});


}
{  //Location
    
test('TC11_POST_Bulk Import - Location-happy path - step 3/4', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBody(uploadURL,"Location"); 
            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(202); 
            contentLocationURL= responseHeaders['content-location']; 

});


test('TC12_POST_Location Import - invalid inputFormat should failed', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}`,
                    'Accept': 'application/fhir+json',
                    'Prefer': 'respond-async',
                    'Content-Type': 'application/json'                
                
                };
                const reqBody = await requestBodyInvalidInputFormat(uploadURL,"Location"); 

                const fullUrl = importBaseURL;
                const response = await request.post(importBaseURL, {headers,data: reqBody});
                
                await logApiCall({
                    method: 'POST',
                    fullUrl,
                    headers,
                    response,
                    });
            
                let responseHeaders = response.headers();
            
                expect(response.status()).toBe(514); 

    });

test('TC13_POST_Location Import - missing inputFormat should  failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyMissingInputFormat(uploadURL,"Location"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});
test('TC14_POST_Location Import - Invalid input type', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}`,
                    'Accept': 'application/fhir+json',
                    'Prefer': 'respond-async',
                    'Content-Type': 'application/json'                
                
                };
                const reqBody = await requestBodyInvalidInput(uploadURL,"Location"); 
    
                const fullUrl = importBaseURL;
                const response = await request.post(importBaseURL, {headers,data: reqBody});
                
                await logApiCall({
                    method: 'POST',
                    fullUrl,
                    headers,
                    response,
                    });
            
                let responseHeaders = response.headers();
            
                expect(response.status()).toBe(400); 
    
    });

test('TC15_POST_Location Import - missing input type', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}`,
                    'Accept': 'application/fhir+json',
                    'Prefer': 'respond-async',
                    'Content-Type': 'application/json'                
                
                };
                const reqBody = await requestBodyMissingInput(uploadURL); 
    
                const fullUrl = importBaseURL;
                const response = await request.post(importBaseURL, {headers,data: reqBody});
                
                await logApiCall({
                    method: 'POST',
                    fullUrl,
                    headers,
                    response,
                    });
            
                let responseHeaders = response.headers();
            
                expect(response.status()).toBe(400); 
    
    });

test('TC16_POST_Location Import - Invalid input url should failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyInvalidUrl(uploadURL,"Location"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});

test('TC17_POST_Location  Import - missing input url should failed', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}`,
                    'Accept': 'application/fhir+json',
                    'Prefer': 'respond-async',
                    'Content-Type': 'application/json'                
                
                };
                const reqBody = await requestBodyMissingUrl("Location"); 
    
                const fullUrl = importBaseURL;
                const response = await request.post(importBaseURL, {headers,data: reqBody});
                
                await logApiCall({
                    method: 'POST',
                    fullUrl,
                    headers,
                    response,
                    });
            
                let responseHeaders = response.headers();
            
                expect(response.status()).toBe(400); 
    
    });
    
}
    

{//Organization
    

test('TC18_POST_Bulk Import - Organization-happy path - step 3/4', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBody(uploadURL,"Organization"); 
            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(202); 
            contentLocationURL= responseHeaders['content-location']; 

});

test('TC19_POST_ Organization Import - invalid inputFormat should failed', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}`,
                    'Accept': 'application/fhir+json',
                    'Prefer': 'respond-async',
                    'Content-Type': 'application/json'                
                
                };
                const reqBody = await requestBodyInvalidInputFormat(uploadURL,"Organization"); 

                const fullUrl = importBaseURL;
                const response = await request.post(importBaseURL, {headers,data: reqBody});
                
                await logApiCall({
                    method: 'POST',
                    fullUrl,
                    headers,
                    response,
                    });
            
                let responseHeaders = response.headers();
            
                expect(response.status()).toBe(514); 

    });

test('TC20_POST_Organization Import - missing inputFormat should  failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyMissingInputFormat(uploadURL,"Organization"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});
test('TC21_POST_Organization Import - Invalid input type', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}`,
                    'Accept': 'application/fhir+json',
                    'Prefer': 'respond-async',
                    'Content-Type': 'application/json'                
                
                };
                const reqBody = await requestBodyInvalidInput(uploadURL,"Organization"); 
    
                const fullUrl = importBaseURL;
                const response = await request.post(importBaseURL, {headers,data: reqBody});
                
                await logApiCall({
                    method: 'POST',
                    fullUrl,
                    headers,
                    response,
                    });
            
                let responseHeaders = response.headers();
            
                expect(response.status()).toBe(400); 
    
    });

test('TC22_POST_OrganizationImport - missing input type', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}`,
                    'Accept': 'application/fhir+json',
                    'Prefer': 'respond-async',
                    'Content-Type': 'application/json'                
                
                };
                const reqBody = await requestBodyMissingInput(uploadURL); 
    
                const fullUrl = importBaseURL;
                const response = await request.post(importBaseURL, {headers,data: reqBody});
                
                await logApiCall({
                    method: 'POST',
                    fullUrl,
                    headers,
                    response,
                    });
            
                let responseHeaders = response.headers();
            
                expect(response.status()).toBe(400); 
    
    });

test('TC23_POST_Organization Import - Invalid input url should failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyInvalidUrl(uploadURL,"Organization"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});

test('TC24_POST_Organization Import - missing input url should failed', async ({ request }) => 
    {
                const fabToken = await fabricatedToken("TH811"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}`,
                    'Accept': 'application/fhir+json',
                    'Prefer': 'respond-async',
                    'Content-Type': 'application/json'                
                
                };
                const reqBody = await requestBodyMissingUrl("Organization"); 
    
                const fullUrl = importBaseURL;
                const response = await request.post(importBaseURL, {headers,data: reqBody});
                
                await logApiCall({
                    method: 'POST',
                    fullUrl,
                    headers,
                    response,
                    });
            
                let responseHeaders = response.headers();
            
                expect(response.status()).toBe(400); 
    
    });


}

{//Practitioner
    
test('TC25_POST_Bulk Import - Practitioner-happy path - step 3/4', async ({ request }) => 
{
        const fabToken = await fabricatedToken("TH811"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'                
        
        };
        const reqBody = await requestBody(uploadURL,"Practitioner"); 
        const fullUrl = importBaseURL;
        const response = await request.post(importBaseURL, {headers,data: reqBody});
        
        await logApiCall({
            method: 'POST',
            fullUrl,
            headers,
            response,
            });
    
        let responseHeaders = response.headers();
    
        expect(response.status()).toBe(202); 
        contentLocationURL= responseHeaders['content-location']; 

});

test('TC26_POST_Practitioner Import - invalid inputFormat should failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyInvalidInputFormat(uploadURL,"Practitioner"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(514); 

});

test('TC27_POST_Practitioner Import - missing inputFormat should  failed', async ({ request }) => 
{
        const fabToken = await fabricatedToken("TH811"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'                
        
        };
        const reqBody = await requestBodyMissingInputFormat(uploadURL,"Practitioner"); 

        const fullUrl = importBaseURL;
        const response = await request.post(importBaseURL, {headers,data: reqBody});
        
        await logApiCall({
            method: 'POST',
            fullUrl,
            headers,
            response,
            });
    
        let responseHeaders = response.headers();
    
        expect(response.status()).toBe(400); 

});
test('TC28_POST_Practitioner Import - Invalid input type', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyInvalidInput(uploadURL,"Practitioner"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});

test('TC29_POST_Practitioner Import - missing input type', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyMissingInput(uploadURL); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});

test('TC30_POST_Practitioner Import - Invalid input url should failed', async ({ request }) => 
{
        const fabToken = await fabricatedToken("TH811"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'                
        
        };
        const reqBody = await requestBodyInvalidUrl(uploadURL,"Practitioner"); 

        const fullUrl = importBaseURL;
        const response = await request.post(importBaseURL, {headers,data: reqBody});
        
        await logApiCall({
            method: 'POST',
            fullUrl,
            headers,
            response,
            });
    
        let responseHeaders = response.headers();
    
        expect(response.status()).toBe(400); 

});

test('TC31_POST_Practitioner Import - missing input url should failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyMissingUrl("Practitioner"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});


}


{//Questionnaire

test('TC32_POST_Bulk Import - Questionnaire-happy path - step 3/4', async ({ request }) => 
{
        const fabToken = await fabricatedToken("TH811"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'                
        
        };
        const reqBody = await requestBody(uploadURL,"Questionnaire"); 
        const fullUrl = importBaseURL;
        const response = await request.post(importBaseURL, {headers,data: reqBody});
        
        await logApiCall({
            method: 'POST',
            fullUrl,
            headers,
            response,
            });
    
        let responseHeaders = response.headers();
    
        expect(response.status()).toBe(202); 
        contentLocationURL= responseHeaders['content-location']; 

});

test('TC33_POST_Questionnaire Import - invalid inputFormat should failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyInvalidInputFormat(uploadURL,"Questionnaire"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(514); 

});

test('TC34_POST_Questionnaire Import - missing inputFormat should  failed', async ({ request }) => 
{
        const fabToken = await fabricatedToken("TH811"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'                
        
        };
        const reqBody = await requestBodyMissingInputFormat(uploadURL,"Questionnaire"); 

        const fullUrl = importBaseURL;
        const response = await request.post(importBaseURL, {headers,data: reqBody});
        
        await logApiCall({
            method: 'POST',
            fullUrl,
            headers,
            response,
            });
    
        let responseHeaders = response.headers();
    
        expect(response.status()).toBe(400); 

});
test('TC35_POST_Questionnaire Import - Invalid input type', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyInvalidInput(uploadURL,"Questionnaire"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});

test('TC36_POST_Questionnaire Import - missing input type', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyMissingInput(uploadURL); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});

test('TC37_POST_Questionnaire Import - Invalid input url should failed', async ({ request }) => 
{
        const fabToken = await fabricatedToken("TH811"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}`,
            'Accept': 'application/fhir+json',
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'                
        
        };
        const reqBody = await requestBodyInvalidUrl(uploadURL,"Questionnaire"); 

        const fullUrl = importBaseURL;
        const response = await request.post(importBaseURL, {headers,data: reqBody});
        
        await logApiCall({
            method: 'POST',
            fullUrl,
            headers,
            response,
            });
    
        let responseHeaders = response.headers();
    
        expect(response.status()).toBe(400); 

});

test('TC38_POST_Questionnaire Import - missing input url should failed', async ({ request }) => 
{
            const fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}`,
                'Accept': 'application/fhir+json',
                'Prefer': 'respond-async',
                'Content-Type': 'application/json'                
            
            };
            const reqBody = await requestBodyMissingUrl("Questionnaire"); 

            const fullUrl = importBaseURL;
            const response = await request.post(importBaseURL, {headers,data: reqBody});
            
            await logApiCall({
                method: 'POST',
                fullUrl,
                headers,
                response,
                });
        
            let responseHeaders = response.headers();
        
            expect(response.status()).toBe(400); 

});
}




