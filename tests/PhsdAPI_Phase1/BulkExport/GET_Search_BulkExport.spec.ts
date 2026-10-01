import { test, expect, request } from '@playwright/test';
import { resources } from "../../../res/resource";
import { fabricatedToken , logApiCall} from "../../../res/resource";  // Import function 
import { encode } from 'punycode';

import * as https from 'https';

let jwtToken: any;
let fabToken: any;
let baseURL1: any;
let resource: any;
let baseURL: any;
let statusURL:string;
let bucketURL:any;
let contentLocationURL2:string;

function sleep(ms: number): Promise<void> 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

test.beforeAll(async () => 
{
    baseURL1 = test.info().project.use.baseURL;
    resource = resources.BulkExport;
    baseURL = baseURL1 + resource;
}

);

//Postman->Bulk Export&Import Copy SK

{//Search by Bulk Export GET 


{ //Happy Path

test('TC1_Get_Bulk Export without any credentials should fail', async ({ request }) => 
{
   
    const headers = {
        'Authorization': ` `, 
 
    };

    let params:any;
    params = new URLSearchParams({
        "_type":"HealthcareService",
        "_since": "2024-06-09T14:32:50.000-04:00",
        "_typeFilter":"programs=Connex"
        
    }).toString();

    const fullUrl = `${baseURL}${params.toString()}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
      });

    expect(response.status()).toBe(401); 
});
test('TC2_Get_Bulk Export without any parameters should fail', async ({ request }) => 
    {
 
        fabToken = await fabricatedToken("Connex"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}` 
        
        };
    
        let params:any;
        params = new URLSearchParams({
           
            
        }).toString();
    
        const fullUrl = `${baseURL}${params.toString()}`;
        const response = await request.get(`${baseURL}?${params}`, { headers });
        await logApiCall({
            method: 'GET',
            fullUrl,
            headers,
            response,
          });
        
         expect(response.status()).toBe(400); 
    });
test('TC3_Get_Bulk Export without scope should fail', async ({ request }) => 
    {
    
        fabToken = await fabricatedToken("scope"); // Call the function and store the value
         const headers = {
            'Authorization': `Bearer ${fabToken}` 
        
        };
    
        let params:any;
        params = new URLSearchParams({
            "_type":"HealthcareService",
            "_since": "2024-06-09T14:32:50.000-04:00",
            "_typeFilter":"program=Connex"
            
        }).toString();
    
        const fullUrl = `${baseURL}${params.toString()}`;
        const response = await request.get(`${baseURL}?${params}`, { headers });
        await logApiCall({
            method: 'GET',
            fullUrl,
            headers,
            response,
          });

        expect(response.status()).toBe(403); 
    });
test('TC4_Get_Bulk Export by multiple types should fail', async ({ request }) => 
{
        fabToken = await fabricatedToken("Connex"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}` 
        
        };
        
            let params = new URLSearchParams();
            params.append("_type", "HealthcareService");  // First _type value
            params.append("_type", "Location");        // Second _type value
            params.append("_typeFilter", "program=Connex");
      
            const fullUrl = `${baseURL}${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });

            expect(response.status()).toBe(400); 
        });   
test('TC5_Get_Bulk Export by invalid parameter should fail', async ({ request }) => 
    {
    
        fabToken = await fabricatedToken("Connex"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}` 
        
        };
    
        let params:any;
        params = new URLSearchParams({
            "_type":"HealthcareService",
            "_since": "2024-06-09T14:32:50.000-04:00",
            "_typeFilter":"program=Connextttt",
            
        }).toString();


        const fullUrl = `${baseURL}${params.toString()}`;
        const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
        await logApiCall({
            method: 'GET',
            fullUrl,
            headers,
            response,
          });
   
        expect(response.status()).toBe(400); 
    }); 
test.skip('TC6_Get_Bulk Export by HealthcareService without program should fail', async ({ request }) => 
    {
        
        fabToken = await fabricatedToken("Connex"); 
        const headers = {
            'Authorization': `Bearer ${fabToken}` 
        
        };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"HealthcareService",
                "_since": "2024-06-09T14:32:50.000-04:00",
                "_typeFilter":"program= ",
                
            }).toString();
    
    
            const fullUrl = `${baseURL}${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
      
            expect(response.status()).toBe(400); 
    }); 
}

{//Connex
test('TC7_Get_Bulk Export by HealthcareService Connex', async ({ request }) => 
    {
                fabToken = await fabricatedToken("Connex"); 
                const headers = {
                    'Authorization': `Bearer ${fabToken}` 
                
                };
            
                let params:any;
                params = new URLSearchParams({
                    "_type":"HealthcareService",
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
                statusURL= responseHeaders['content-location']; 

    });

test('TC8_Get_Bulk Export by HealthcareService Connex by Name', async ({ request }) => 
        {
            fabToken = await fabricatedToken("Connex"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
                
                    let params:any;
                    params = new URLSearchParams({
                        "_type":"HealthcareService",
                        "_typeFilter":"program%3DConnex%26name%3Dcon",
                        
                    }).toString();
            
            
                    const fullUrl = `${baseURL}?${params.toString()}`;
                    
                    let response = await request.get(`${baseURL}?${params.toString()}`, { headers });
                    await logApiCall({
                        method: 'GET',
                        fullUrl,
                        headers,
                        response,
                      });
                
                    let responseHeaders = response.headers();
                    expect(response.status()).toBe(202); 
                    statusURL= responseHeaders['content-location']; 
    
    });
test('TC9_Get_Bulk Export by HealthcareService Connex since time', async ({ request }) => 
        {
            fabToken = await fabricatedToken("Connex"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
                
                    let params:any;
                    params = new URLSearchParams({
                        "_type":"HealthcareService",
                        "_since": "2024-06-09T14:32:50.000-04:00",
                        "_typeFilter":"program%3DConnex%26name%3Dcon",
                        
                    }).toString();
            
            
                    const fullUrl = `${baseURL}?${params.toString()}`;
                    
                    let response = await request.get(`${baseURL}?${params.toString()}`, { headers });
                    await logApiCall({
                        method: 'GET',
                        fullUrl,
                        headers,
                        response,
                      });
                
                    let responseHeaders = response.headers();
                    expect(response.status()).toBe(202); 
                    statusURL= responseHeaders['content-location']; 
    
    });
test('TC10_Get_Bulk Export Connex - response from the status endpoint', async ({ request }) => 
    {
           test.setTimeout(20000000);
            fabToken = await fabricatedToken("Connex"); 
           const headers = {
                        'Authorization': `Bearer ${fabToken}` 
                    
                    };
            
            let params:any;
            params = new URLSearchParams({
                
            }).toString();
                    const url2=statusURL.trim();
                    const result = url2;
              
                        
            let status = 0;
            let maxAttempts = 60;
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
                } 
                else if (status === 429) {
                    console.log('⏳ Export still processing...');
                    await new Promise(r => setTimeout(r, 10000)); // wait 3 seconds
                }
                else {
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
            //expect(response.statusCode).toBe(200); 
            const responseBody = await response.json();
            bucketURL = responseBody.output[0].url;
            console.log("bucketURL--------" + bucketURL);

    }); 
test('TC11_Get_Bulk Export Connex - response from amazon s3 bucket url', async ({ request }) => 
        {
    test.setTimeout(2000000);
    console.log("bucketURL--------" + bucketURL);
    const agent = new https.Agent({
        rejectUnauthorized: false, // ✅ allow self-signed certs
    });

    await new Promise<void>((resolve, reject) => {
        https.get(bucketURL, { agent }, (res) => {
            console.log(`STATUS: ${res.statusCode}`);

            if (res.statusCode !== 200) {
                reject(new Error(`❌ Failed with status ${res.statusCode}`));
            }

            res.setEncoding('utf8');
            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                console.log('✅ Response received!');
                console.log(rawData);
                resolve();
            });

        }).on('error', (e) => {
            reject(new Error(`⚠️ Request error: ${e.message}`));
        });
    });

    }); 

}    

{//TH811
test.only('TC12_Get_Bulk Export by HealthcareService TH811', async ({ request }) => 
    {
        fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"HealthcareService",
                "_typeFilter":"program=TH811",
                
            }).toString();
    
    
            const fullUrl = `${baseURL}${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
             const responseHeaders = response.headers();
            expect(response.status()).toBe(202); 
            statusURL= responseHeaders['content-location']; 
    }); 
test('TC13_Get_Search HealthcareService + typeFilter parameter TH811', async ({ request }) => 
     {
            fabToken = await fabricatedToken("TH811"); 
                    const headers = {
                        'Authorization': `Bearer ${fabToken}` 
                    
                    };

                    let params:any;
                    params = new URLSearchParams({
                        "_type": "HealthcareService",
                        "_typeFilter":"program=TH811",
                
                    }).toString();
        
                    const fullUrl = `${baseURL}?${params.toString()}`;
                    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
                    await logApiCall({
                        method: 'GET',
                        fullUrl,
                        headers,
                        response,
                      });
                    const responseHeaders = response.headers();
                    expect(response.status()).toBe(202); 
                    statusURL= responseHeaders['content-location']; 

    });
test('TC14_Get_Search HealthcareService + typeFilter parameter TH811 and Connex', async ({ request }) => 
{
    fabToken = await fabricatedToken("TH811%26program%3DConnex"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"HealthcareService",
                "_typeFilter":"program=TH811&program=Connex",
                
            }).toString();

            const fullUrl = `${baseURL}${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
            const responseHeaders = response.headers();
            expect(response.status()).toBe(202); 
            statusURL= responseHeaders['content-location']; 

   });
test('TC15_Get_Search HealthcareService + since', async ({ request }) => 
    {
                    fabToken = await fabricatedToken("TH811"); 
                    const headers = {
                        'Authorization': `Bearer ${fabToken}` 
                    
                    };
                
                    let params:any;
                    params = new URLSearchParams({
                        "_type":"HealthcareService",
                        "_since": "2024-06-09T14:32:50.000-04:00",
                        "_typeFilter":"program=TH811",
                        
                    }).toString();
            
            
                    const fullUrl = `${baseURL}?${params.toString()}`;
                    
                    let response = await request.get(`${baseURL}?${params.toString()}`, { headers });
                    await logApiCall({
                        method: 'GET',
                        fullUrl,
                        headers,
                        response,
                      });

                    let responseHeaders = response.headers();
   
                    expect(response.status()).toBe(202); 
                    statusURL= responseHeaders['content-location']; 
    
        }); 
test('TC16_Get_Search Practitioner by Bulk Export', async ({ request }) => 
    {
        fabToken = await fabricatedToken("TH811"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"Practitioner",
               
            }).toString();
    
    
            const fullUrl = `${baseURL}${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
            const responseHeaders = response.headers();
            expect(response.status()).toBe(202); 
            statusURL= responseHeaders['content-location']; 
    });
test('TC17_Get_Search Practitioner + since', async ({ request }) => 
    {
        fabToken = await fabricatedToken("TH811"); 
        //fabToken = await fabricatedToken("TH811","HealthcareService"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"Practitioner",
                "_since": "2024-06-09T14:32:50.000-04:00",
                
            }).toString();
    
    
            const fullUrl = `${baseURL}${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
            const responseHeaders = response.headers();
            expect(response.status()).toBe(202); 
            statusURL= responseHeaders['content-location']; 

    });
test('TC18_Get_Search Practitioner + typeFilter parameter Name', async ({ request }) => 
    {
        fabToken = await fabricatedToken("TH811"); 
        //fabToken = await fabricatedToken("TH811","HealthcareService"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"Practitioner",
                "_typeFilter":"name%3DTHN",
                
            }).toString();
    
    
            const fullUrl = `${baseURL}${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
            const responseHeaders = response.headers();
            expect(response.status()).toBe(202); 
            statusURL= responseHeaders['content-location']; 

    });        
test('TC19_Get_Search Practitioner + typeFilter parameter License', async ({ request }) => 
    {
        fabToken = await fabricatedToken("TH811"); 
        //fabToken = await fabricatedToken("TH811","HealthcareService"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"Practitioner",
                "_typeFilter":"name%3DTHN",
                
            }).toString();

            const fullUrl = `${baseURL}${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
            const responseHeaders = response.headers();
            expect(response.status()).toBe(202); 
            statusURL= responseHeaders['content-location']; 

    });                              
test.only('TC20_Get_Bulk Export TH811 - response from the status endpoint', async ({ request }) => 
        {
            test.setTimeout(2000000000);
            fabToken = await fabricatedToken("TH811");
               const headers = {
                        'Authorization': `Bearer ${fabToken}` 
                    
                    };
            
            let params:any;
            params = new URLSearchParams({
                
            }).toString();
                    const url2=statusURL.trim();
                    const result = url2;
              
                        
            let status = 0;
            let maxAttempts = 60;
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
                } 
                else if (status === 429) {
                    console.log('⏳ Export still processing...');
                    await new Promise(r => setTimeout(r, 10000)); // wait 3 seconds
                }
                else {
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
            //expect(response.statusCode).toBe(200); 
            const responseBody = await response.json();
            bucketURL = responseBody.output[0].url;
            console.log("bucketURL--------" + bucketURL);
                
    }); 
test.only('TC21_Get_Bulk Export TH811 - response from amazon s3 bucket url', async ({ request }) => 
{
     test.setTimeout(2000000);
    console.log("bucketURL--------" + bucketURL);
    const agent = new https.Agent({
        rejectUnauthorized: false, // ✅ allow self-signed certs
    });

    await new Promise<void>((resolve, reject) => {
        https.get(bucketURL, { agent }, (res) => {
            console.log(`STATUS: ${res.statusCode}`);

            if (res.statusCode !== 200) {
                reject(new Error(`❌ Failed with status ${res.statusCode}`));
            }

            res.setEncoding('utf8');
            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                console.log('✅ Response received!');
                console.log(rawData);
                resolve();
            });

        }).on('error', (e) => {
            reject(new Error(`⚠️ Request error: ${e.message}`));
        });
    });       
}); 
}

 
{//CWM
test('TC22_Get_Bulk Export by HealthcareService CWM', async ({ request }) => 
    {
        fabToken = await fabricatedToken("CWM"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"HealthcareService",
                "_since": "2024-06-09T14:32:50.000-04:00",
                "_typeFilter":"program=CWM",
                
            }).toString();
            const fullUrl = `${baseURL}?${params.toString()}`;
            await sleep(3000);
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
            const responseHeaders = response.headers();
            expect(response.status()).toBe(202); 
            statusURL= responseHeaders['content-location']; 
    }); 
test('TC23_Get_Bulk Export CWM - response from the status endpoint', async ({ request }) => 
{
            test.setTimeout(2000000000);
            fabToken = await fabricatedToken("CWM"); 
              const headers = {
                        'Authorization': `Bearer ${fabToken}` 
                    
                    };
            
            let params:any;
            params = new URLSearchParams({
                
            }).toString();
                    const url2=statusURL.trim();
                    const result = url2;
              
                        
            let status = 0;
            let maxAttempts = 60;
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
                } 
                else if (status === 429) {
                    console.log('⏳ Export still processing...');
                    await new Promise(r => setTimeout(r, 10000)); // wait 3 seconds
                }
                else {
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
            //expect(response.statusCode).toBe(200); 
            const responseBody = await response.json();
            bucketURL = responseBody.output[0].url;
            console.log("bucketURL--------" + bucketURL);
               
    }); 
test('TC24_Get_Bulk Export CWM - response from amazon s3 bucket url', async ({ request }) => 
{
            test.setTimeout(2000000);
    console.log("bucketURL--------" + bucketURL);
    const agent = new https.Agent({
        rejectUnauthorized: false, // ✅ allow self-signed certs
    });

    await new Promise<void>((resolve, reject) => {
        https.get(bucketURL, { agent }, (res) => {
            console.log(`STATUS: ${res.statusCode}`);

            if (res.statusCode !== 200) {
                reject(new Error(`❌ Failed with status ${res.statusCode}`));
            }

            res.setEncoding('utf8');
            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                console.log('✅ Response received!');
                console.log(rawData);
                resolve();
            });

        }).on('error', (e) => {
            reject(new Error(`⚠️ Request error: ${e.message}`));
        });
    }); 

    }); 

}

{//eServices
test('TC25_Get_Bulk Export by HealthcareService eServices', async ({ request }) => 
    {
        fabToken = await fabricatedToken("eServices"); 
            const headers = {
                'Authorization': `Bearer ${fabToken}` 
            
            };
        
            let params:any;
            params = new URLSearchParams({
                "_type":"HealthcareService",
                "_typeFilter":"program=eServices",
                
            }).toString();
            const fullUrl = `${baseURL}?${params.toString()}`;
            const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
            await logApiCall({
                method: 'GET',
                fullUrl,
                headers,
                response,
              });
            const responseHeaders = response.headers();
            expect(response.status()).toBe(202); 
            statusURL= responseHeaders['content-location']; 
    }); 
test('TC26_Get_Bulk Export eServices - response from the status endpoint', async ({ request }) => 
{
            test.setTimeout(2000000000);
            fabToken = await fabricatedToken("eServices"); 
                 const headers = {
                        'Authorization': `Bearer ${fabToken}` 
                    
                    };
            
            let params:any;
            params = new URLSearchParams({
                
            }).toString();
                    const url2=statusURL.trim();
                    const result = url2;
              
                        
            let status = 0;
            let maxAttempts = 60;
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
                } 
                else if (status === 429) {
                    console.log('⏳ Export still processing...');
                    await new Promise(r => setTimeout(r, 10000)); // wait 3 seconds
                }
                else {
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
            //expect(response.statusCode).toBe(200); 
            const responseBody = await response.json();
            bucketURL = responseBody.output[0].url;
            console.log("bucketURL--------" + bucketURL);
               
    }); 
test('TC27_Get_Bulk Export eServices - response from amazon s3 bucket url', async ({ request }) => 
{
            test.setTimeout(2000000);
    console.log("bucketURL--------" + bucketURL);
    const agent = new https.Agent({
        rejectUnauthorized: false, // ✅ allow self-signed certs
    });

    await new Promise<void>((resolve, reject) => {
        https.get(bucketURL, { agent }, (res) => {
            console.log(`STATUS: ${res.statusCode}`);

            if (res.statusCode !== 200) {
                reject(new Error(`❌ Failed with status ${res.statusCode}`));
            }

            res.setEncoding('utf8');
            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                console.log('✅ Response received!');
                console.log(rawData);
                resolve();
            });

        }).on('error', (e) => {
            reject(new Error(`⚠️ Request error: ${e.message}`));
        });
    }); 
    }); 
}

}
