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
    noScope = resources.noScopeToken;
    baseURL1 = test.info().project.use.baseURL;
    resource = resources.GetPractitioner;
    baseURL = baseURL1 + resource;
}

);


test('@smoke TC1_Get_Search Practitioner without authorization should fail  ', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

        }).toString();

    console.log(params.toString());
    const headers = {
        'Authorization': ` `

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
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

test('TC2_Get_Search Practitioner without scope should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "Anna"

        }).toString();

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${noScope}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;

    expect(response.status()).toBe(400);
    expect(textValue).toContain('scope claim is missing');
});



test('TC3_Get_Search Practitioner by invalid parameter should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "names": "anna"

        }).toString();

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(400);
    expect(textValue).toContain("Practitioner search parameter not supported:names");

});

test('TC4_Get_Search Practitioner by Legal Name', async ({ request }) => {

    let params: any;

    params = new URLSearchParams();
    params.append("name", "Hnatyshyn");
    params.append("name", "webster");
    params.append("name", "sherry");

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster/);

});

test('TC5_Get_Search Practitioner by Former Name', async ({ request }) => {

    let params: any;

    params = new URLSearchParams();
    params.append("name", "HNATYSHYN");
    params.append("name", "sherry");
    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params.toString()}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/HNATYSHYN|Hnatyshyn/);

});

test('TC6_Get_Search Practitioner by First and Last Name', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-nurse|9423419",

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/HNATYSHYN|Hnatyshyn/);

});

test('TC7_Get_Search Practitioner by First Name', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "name": "Anna"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Annaiah|Annala|Annan|ANNABLE|Annamalai/);


});


test('TC8_Get_Search Practitioner by Middle Name', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "name": "PENELPHA"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for test env
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});


test('TC9_Get_Search Practitioner by CPSO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-physician|151295"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].given[0];

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    // expect(name).toContain('Andrew');

});


test('TC10_Get_Search Practitioner by CNO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-nurse|9423419"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].given[0];

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    //expect(name).toContain('Sherry Leigh');

});


test('TC11_Get_Search Practitioner by CDIO Identifier', async ({ request }) => {


    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-dietitian|15453"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for dev env
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');


});


test('TC12_Get_Search Practitioner by OCP Identifier', async ({ request }) => {


    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-pharmacist|625816"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for dev env
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');


});


test('TC13_Get_Search Practitioner by CMO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-midwife|2614"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for dev env
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});

test('TC14_Get_Search Practitioner by RCDSO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-dental-surgeon|501918"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for dev env
    expect(response.status()).toBe(200);
    // expect(textValue).toContain('Bundle');

});


test('TC15_Get_Search Practitioner by CPYO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-registration-psychologist|1363"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for dev env
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});

test('TC16_Get_Search Practitioner by CASLP Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-registration-audiologist-speech-language-pathologist|8765"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for dev env
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});


test('TC17_Get_Search Practitioner by CDEO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-denturist|471-86"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain('Tran');

});


test('TC18_Get_Search Practitioner by CMRTO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-registration-medical-radiation-techologist|18337"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for dev env
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});



test('TC19_Get_Search Practitioner by CMTO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-massage-therapist|Y 766"

        }).toString();

    // %7C → | (pipe symbol)
    // %20 → (space)

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;


    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain('Wolfe');

});

test('TC20_Get_Search Practitioner by CRTO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-registration-respiratory-therapist|003057"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //Response is different for dev env
    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});



test('TC21_Get_Search Practitioner by CDHO Identifier', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-dental-hygienist|020225"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain('Currie');

});



test('TC22_Get_Search Practitioner by UPI Identifier + address FR translated', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-provider-upi|103988058550"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain('Wiggins');

});

test('TC23_Get_Search Practitioner- dual license', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-provider-upi|104286541677"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});

test('TC24_Get_Search Practitioner by active status', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "name": "Anna",
            "active": "true",

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    //expect(name).toMatch(/Annala|Annan|Annamalai/);


});

test('TC25_Get_Search Practitioner by terminated status', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "name": "Russell",
            "active": "false",
            "Perkins": "Perkins"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;

    expect(response.status()).toBe(400);
    expect(textValue).toContain('Practitioner search parameter not supported:Perkins');

});


test('TC26_Get_Search Practitioner by Keyword', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "_content": "McDonough"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(name).toMatch(/MCDONOUGH|Shoebotham/);


});


test('TC27_Get_Search Practitioner by OR operation', async ({ request }) => {

    const params = new URLSearchParams
        ({

            "name": "McDonough,Cheryl"

        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(name).toMatch(/Mcdonough|MCDONOUGH/);


});


test('TC28_Get_Search Practitioner by Id', async ({ request }) => {

    const params = new URLSearchParams
        ({


        }).toString();

    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();

    expect(response.status()).toBe(200);

});

test('TC29_Get_Search Practitioner by multiple parameter', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "Cheryl",
            "_content": "McDonough",

        }).toString();

    console.log(params.toString());
    const headers = {
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    expect(response.status()).toBe(200);


});