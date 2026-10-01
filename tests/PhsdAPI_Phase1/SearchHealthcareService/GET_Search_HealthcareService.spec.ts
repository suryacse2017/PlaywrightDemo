import { test, expect, request, Page } from '@playwright/test';
import { resources, logApiCall } from "../../../res/resource";
import { collectionVariables } from "../../../res/collectionVariable";

let token: any;
let tokenScope: any;
let noScope: any;
let baseURL1: any;
let resource: any;
let baseURL: any;


test.beforeAll(async () => {

    token = resources.jwtToken;
    tokenScope = resources.scopeToken;
    noScope=resources.noScopeToken;
    //tokenScope = "eyJhdWRpdFRyYWNraW5nSWQiOiJVVUlEMTIzNDU2Nzg5MCIsInVzZXJuYW1lIjoicmZlbGxvd0BlbXJ0ZXN0LmNhIiwiZ2l2ZW5fbmFtZSI6IlRlc3RGaXJzdE5hbWUiLCJmYW1pbHlfbmFtZSI6IlRlc3RMYXN0TmFtZSIsInNjb3BlIjoic3lzdGVtL09yZ2FuaXphdGlvbi5yZWFkIHN5c3RlbS9QcmFjdGl0aW9uZXIucmVhZCBzeXN0ZW0vSGVhbHRoY2FyZVNlcnZpY2UucmVhZCBzeXN0ZW0vTG9jYXRpb24ucmVhZCBzeXN0ZW0vUEhTRC5FeHBvcnQgUHJhY3RpdGlvbmVyLmFsbG93ZWQgSGVhbHRoY2FyZVNlcnZpY2UuYWxsb3dlZCUzRnByb2dyYW0lM0RUSDgxMSUyQ0Nvbm5leCIsInVhbyI6InVybjplaGVhbHRoOnJpZDogMS4yLjMuNDU6MTIzNCIsInVhb1R5cGUiOiJvcmciLCJ1YW9OYW1lIjoiT250YXJpbyBUZWxlbWVkaWNpbmUgTmV0d29yayIsImV4cGlyZXNfaW4iOjB9.e30.Y1NskxCPgULz-NXevJcbkDHJgHYKl2JM128tsN5j5QY";
    baseURL1 = test.info().project.use.baseURL;
    resource = resources.GetHealthcareService;
    baseURL = baseURL1 + resource;

}

);



test('@smoke TC1_Get_Search HealthcareService no authorization should fail', async ({ request }) => {


    let params: any;
    params = new URLSearchParams({
        "program": "TH811"


    });
    const headers = {

        'Authorization': ` `

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(401);
    expect(textValue).toContain('Authorization header is missing');
});

test('TC2_Get_Search HealthcareService no scope should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "TH811",
        "name": "Anna"

    });
const headers = {
        'Authorization': `Bearer ${noScope}`

    };
    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });

    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain('scope');
});


test('TC3_Get_Search HealthcareService by Connex-pagination', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "Connex",
        "_count": "10"

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode = jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('CONNEX');
});


test('TC4_Get_Search HealthcareService Connex no scope should fail', async ({ request }) => {
    let params: any;
    params = new URLSearchParams({
        "program": "Connex",
        "_count": "1"

    });
    const headers = {
        'Authorization': `Bearer ${noScope}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;

    expect(response.status()).toBe(400);
    expect(textValue).toContain('scope');
});


test('TC5_Get_Search HealthcareService by no parameters should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
       // "program": " "

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}${params.toString()}`;
    const response = await request.get(`${baseURL}${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });

    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].diagnostics;

    expect(response.status()).toBe(400);
   // expect(textValue).toContain("'program' parameter must be provided");
});


test('TC6_Get_Search HealthcareService by invalid parameter should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "programs": "TH811"

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain("HealthcareService search parameter not supported");
});


test('TC7_Get_Search HealthcareService by TH811 - pagination', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "TH811",
        "_count": "5",
        "_offset": "1"

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode = jsonResponse.entry[0].resource.program[1].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('TH811');
});


test('TC8_Get_Search HealthcareService TH811 no scope should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "TH811",
        "_count": "1",

    });
    const headers = {
        'Authorization': `Bearer ${noScope}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain('scope');

});



test('TC9_Get_Search HealthcareService by TH811 or Connex', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "TH811,Connex",
        "name": "based"

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode = jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('CONNEX');
});

test('TC10_Get_Search HealthcareService by TH811 and Connex', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "TH811",
        "name": "Connex"

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode = jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('THLN');
});

test('TC11_Get_Search HealthcareService by THLN should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "THLN",

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('no scope defined for current operation');

});


test('TC12_Get_Search HealthcareService by THRS should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "THLN",

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('no scope defined for current operation');

});

test('TC13_Get_Search HealthcareService by eConsult should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "eConsult",

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('no scope defined for current operation');

});



test('TC14_Get_Search HealthcareService by eServices no scope should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "eServices",

    });
    token="eyJhdWRpdFRyYWNraW5nSWQiOiJVVUlEMTIzNDU2Nzg5MCIsInVzZXJuYW1lIjoicmZlbGxvd0BlbXJ0ZXN0LmNhIiwiZ2l2ZW5fbmFtZSI6IlRlc3RGaXJzdE5hbWUiLCJmYW1pbHlfbmFtZSI6IlRlc3RMYXN0TmFtZSIsInNjb3BlIjoic3lzdGVtL09yZ2FuaXphdGlvbi5yZWFkIHN5c3RlbS9QcmFjdGl0aW9uZXIucmVhZCBzeXN0ZW0vSGVhbHRoY2FyZVNlcnZpY2UucmVhZCBzeXN0ZW0vTG9jYXRpb24ucmVhZCBzeXN0ZW0vUEhTRC5FeHBvcnQgUHJhY3RpdGlvbmVyLmFsbG93ZWQgSGVhbHRoY2FyZVNlcnZpY2UuYWxsb3dlZCUzRnByb2dyYW0lM0RUSDgxMSUyQ0Nvbm5leCIsInVhbyI6InVybjplaGVhbHRoOnJpZDogMS4yLjMuNDU6MTIzNCIsInVhb1R5cGUiOiJvcmciLCJ1YW9OYW1lIjoiT250YXJpbyBUZWxlbWVkaWNpbmUgTmV0d29yayIsImV4cGlyZXNfaW4iOjB9";
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('program=eservice scope');

});

test('TC15_Get_Search HealthcareService by eVisit should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "program": "eVisit",

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain('unknown program:evisit');

});



test('TC16_Get_Search HealthcareService Connex by Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({
            "identifier": "http://ehealthontario.ca/fhir/NamingSystem/id-connex-healthcareservice|35400", // | is used insted of %7C

        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode = jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('CONNEX');
});

test('TC17_Get_Retrieve HealthcareService Connex by Id', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const connexId = collectionVariables.connexId;
    const fullUrl = `${baseURL}/${connexId}`;
    const response = await request.get(`${baseURL}/${connexId}${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls = jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain("HealthcareService");
});



test('TC18_Get_Search HealthcareService Connex by Id', async ({ request }) => {

    const connexId = collectionVariables.connexId;
    let params: any;
    params = new URLSearchParams
        ({

            "program": "Connex",
            "_id": connexId,

        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };


    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls = jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain(connexId);
});


test('TC19_Get_Search HealthcareService Connex by Name', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "program": "Connex",
            "name": "Community",

        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };


    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain("Community");

});



test('TC20_Get_Search HealthcareService Connex by Keyword', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({
            "program": "Connex",
            "name": "Community",

        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode = jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('CONNEX');
});

test('TC21_Get_Search HealthcareService TH811 by Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "identifier": "http://ehealthontario.ca/fhir/NamingSystem/id-thln-healthcareservice|199201",

    });
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const programCode = jsonResponse.entry[0].resource.program[0].coding[0].code;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(programCode).toContain('THLN');
});


test('TC22_Get_Retrieve HealthcareService TH811 by Id', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const connexId = collectionVariables.connexId2;


    const fullUrl = `${baseURL}/${connexId}`;
    const response = await request.get(`${baseURL}/${connexId}${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls = jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain("HealthcareService");
});

test('TC23_Get_Search HealthcareService TH811 by Id', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({
            "program": "TH811",
            "_id": "6144e935-5cb9-404e-8733-8b5b73311c78",
        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls = jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain("6144e935-5cb9-404e-8733-8b5b73311c78");
});


test('TC24_Get_Search HealthcareService TH811 by Name', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({
            "program": "TH811",
            "name": "service",
        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls = jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain("program=TH811&name=service");
});

test('TC25_Get_Search HealthcareService TH811 by Keyword', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({
            "program": "TH811",
            "_content": "wheelchair",
        });

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls = jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(urls).toContain("_content=wheelchair");
});








