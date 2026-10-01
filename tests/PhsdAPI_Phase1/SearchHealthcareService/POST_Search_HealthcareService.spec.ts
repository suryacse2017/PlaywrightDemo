import { test, expect, request ,Page} from '@playwright/test';
import{resources,logApiCall} from "../../../res/resource";

let token: any;
let tokenScope: any;
let noScope: any;
let baseURL1:any;
let resource:any;
let baseURL: any;

test.beforeAll(async () => 
{

        token = resources.jwtToken;
        tokenScope =resources.scopeToken;
        noScope=resources.noScopeToken;
        baseURL1 = test.info().project.use.baseURL;
        resource =resources.PostHealthcareService;
        baseURL = baseURL1+resource;

}

);


test('@smoke TC1_Post_Search HealthcareService no authorization should fail', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams
       ({
          
           
       }).toString();

       const headers = {
            "Content-Type":"application/x-www-form-urlencoded",
           "Authorization": ` `
    
       };

    const requestBody = new URLSearchParams({
        "program": "Connex"

    }).toString();

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json(); 
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(401);
    expect(textValue).toContain('Authorization header is missing');
});

test('TC2_Post_Search HealthcareService no scope should fail', async ({ request }) =>
    {
       

       console.log('baseURL :--------------', baseURL);
       let params:any;
       params = new URLSearchParams
       ({
          
           
       }).toString();

       const headers = {
            "Content-Type":"application/x-www-form-urlencoded",
           "Authorization": `Bearer ${noScope}`
    
       };

    const requestBody = new URLSearchParams({
        "program": "Connex"

    }).toString();

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json(); 
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain('scope claim is missing');
});



test('TC3_POST_Search HealthcareService by Connex - pagination', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
           
           
       });
       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };
 
       const requestBody = new URLSearchParams({
        "program": "Connex",
         "_count":"1"

    }).toString();

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json(); 
    const textValue = jsonResponse.resourceType;
    const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;
  
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('CONNEX');
   });


   test('TC4_POST_Search HealthcareService Connex no scope should fail', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
           
           
       });
       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${noScope}`
    
       };
 
       const requestBody = new URLSearchParams({
        "program": "Connex",
         "_count":"1"

    }).toString();

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json(); 
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain('scope claim is missing');
   });

   test('TC5_POST_Search HealthcareService by invalid parameter should fail', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
           
           
       });
       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };
 
       const requestBody = new URLSearchParams({
        "programs": "Connex",
         "_count":"1"

    }).toString();

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json(); 
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain('HealthcareService search parameter not supported:programs');
   });

   test('TC6_POST_Search HealthcareService TH811 - pagination', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
           
           
       });
       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };
 
       const requestBody = new URLSearchParams({
        "program": "TH811",
         "_count":"1",
         "_offset":"3"

    }).toString();

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json(); 
    const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);    
    expect(programCode).toContain('THLN');
   });


   test('TC7_POST_Search HealthcareService TH811 no scope should fail', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
           
           
       });
       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${noScope}`
    
       };
 
       const requestBody = new URLSearchParams({
        "program": "TH811",
         "name":"com"

    }).toString();

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json(); 
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain('scope claim is missing');
   });

   test('TC8_POST_Search HealthcareService TH811 or Connex', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
           
           
       });
       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };
 
       const requestBody = new URLSearchParams({
        "program": "th811,connex",
        

    }).toString();

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType; 
    const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toMatch(/CONNEX|THLN/);

   });

   test('TC9_POST_Search HealthcareService TH811 and Connex', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
           
           
       }).toString();
       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };
 
       const requestBody = new URLSearchParams();
       requestBody.append("program", "th811");
       requestBody.append("program", "connex");

    const fullUrl = `${baseURL}${params}`;
    const response = await request.post(`${baseURL}${params}`, {headers: headers,data: requestBody.toString()});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType; 
    const urls=jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain('HealthcareService');
   });


   test('TC10_POST_Search HealthcareService by THLN should fail', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
           
           "program":"THLN"
       }).toString();
       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('no scope defined for current operation');
   });


   test('TC11_POST_Search HealthcareService by THRS should fail', async ({ request }) =>
    {

        let params:any;
        params = new URLSearchParams({
            
            "program":"THRS"
        }).toString();
        const headers = {
            "Content-Type":"application/x-www-form-urlencoded",
            'Authorization': `Bearer ${token}`
     
        };
 
     const fullUrl = `${baseURL}?${params}`;
     const response = await request.post(`${baseURL}?${params}`, {headers: headers});
     await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
     const jsonResponse = await response.json();
     const textValue = jsonResponse.issue[0].details.text;
     expect(response.status()).toBe(403);
     expect(textValue).toContain('no scope defined for current operation');
   });


   test('TC12_POST_Search HealthcareService by eConsult should fail', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"econsult"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();

    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('no scope defined for current operation');
   });


   test('TC13_POST_Search HealthcareService by eServices should fail', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"eServices"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('program=eservice scope');
   });


   
   test('TC14_POST_Search HealthcareService by eVisit should fail', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"eVisit"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain('unknown program:evisit');
   });

   test('TC15_POST_Search HealthcareService Connex by Identifier', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"Connex",
           "identifier":"http://ehealthontario.ca/fhir/NamingSystem/id-connex-healthcareservice|35400"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('CONNEX');
   });

   test('TC16_POST_Search HealthcareService Connex by Id', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"Connex",
           "_id":"eb8c638f-636a-429f-959e-eb316f2ebf86"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls=jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain("_id=eb8c638f-636a-429f-959e-eb316f2ebf86");
   });


   test('TC17_POST_Search HealthcareService Connex by Name', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"Connex",
           "name":"Community"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('CONNEX');
   });


   test('TC18_POST_Search HealthcareService Connex by Keyword', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"Connex",
           "_content":"wheelchair"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const tot=jsonResponse.total;
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    if(tot!=0)
    {
        const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;
        expect(programCode).toContain('CONNEX');
    }

   });


   test('TC19_POST_Search HealthcareService TH811 by Identifier', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"TH811",
           "identifier":"http://ehealthontario.ca/fhir/NamingSystem/id-thln-healthcareservice|133524"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('THLN');
   });


   test('TC20_POST_Search HealthcareService TH811 by Id', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"TH811",
           "_id":"6c324175-8bef-4c18-a252-096fe272b309"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls=jsonResponse.link[0].url;    

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain("_id=6c324175-8bef-4c18-a252-096fe272b309");
   });


   test('TC21_POST_Search HealthcareService TH811 by Name', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"TH811",
           "name":"com"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls=jsonResponse.link[0].url;    
    const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('THLN');
   });


   test('TC22_POST_Search HealthcareService TH811 by Keyword', async ({ request }) =>
    {

       let params:any;
       params = new URLSearchParams({
         
           "program":"TH811",
           "_content":"wheelchair"
       }).toString();

       const headers = {
           "Content-Type":"application/x-www-form-urlencoded",
           'Authorization': `Bearer ${token}`
    
       };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, {headers: headers});
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls=jsonResponse.link[0].url;    
    const programCode=jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('THLN');
   });  









   


