import { test, expect, request, Page } from '@playwright/test';
import { resources, logApiCall } from "../../../res/resource";

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
    resource = resources.PostPractitioner;
    baseURL = baseURL1 + resource;

}

);

test('@smoke TC1_POST_Search Practitioner without authorization should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({

        "name": "Community",


    }).toString();

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': ` `

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, { headers: headers });
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

test('TC2_POST_Search Practitioner without scope should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({

        "name": "smith",


    }).toString();

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${noScope}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, { headers: headers });
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

test('TC3_POST_Search Practitionerby invalid parameter should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({

        "names": "Community",


    }).toString();

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;

    expect(response.status()).toBe(400);
    expect(textValue).toContain("Practitioner search parameter not supported:names");
});

test('TC4_POST_Search Practitioner by Legal Name! ', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({

        "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-physician|V6434",


    }).toString();

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain('Jin');

});

test('TC5_POST_Search Practitioner by  Former Name', async ({ request }) => {

    let params: any;
    params = new URLSearchParams();
    params.append("name", "HNATYSHYN");
    params.append("name", "sherry");


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Hnatyshyn/);

});

test('TC6_POST_Search Practitioner by First and Last Name', async ({ request }) => {

    let params: any;
    params = new URLSearchParams();
    params.append("name", "Daniela");
    params.append("name", "Mezzaucella");


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain('Mezzaucella');

});

test('TC7_POST_Search Practitioner by First Name', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-physician|V6434"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    //  const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    // expect(name).toMatch(/GRUNDSOE|Calinga-On|Braulio/);

});


test('TC8_POST_Search Practitioner by Middle  Name', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "George"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/GEORGE|Salib|George/);

});

test('TC9_POST_Search Practitioner by CPSO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-physician|V6434"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain('Jin');

});

test('TC10_POST_Search Practitioner by CNO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-nurse|9423419"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Hnatyshyn/);

});

test('TC11_POST_Search Practitioner by CDIO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-dietitian|1838"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Corry/);

});

test('TC12_POST_Search Practitioner by OCP Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-pharmacist|631811"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Wojcicka/);

});

test('TC13_POST_Search Practitioner by CMO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-midwife|2302"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Meuser/);

});

test('TC14_POST_Search Practitioner by RCDSO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-dental-surgeon|8489"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Mcdonough/);

});

test('TC15_POST_Search Practitioner by CASLP Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-registration-audiologist-speech-language-pathologist|8765"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Gordon/);

});

test('TC16_POST_Search Practitioner by CDEO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-denturist|471-86"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
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

test('TC17_POST_Search Practitioner by CMRTO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-registration-medical-radiation-techologist|18337"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});

test('TC18_POST_Search Practitioner by CMTO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-registration-respiratory-therapist|003057"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});
test('TC19_POST_Search Practitioner by CRTO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-registration-respiratory-therapist|002955"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Wiggins/);

});

test('TC20_POST_Search Practitioner by CDHO Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-license-dental-hygienist|020225"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
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

test('TC21_POST_Search Practitioner by UPI Identifier', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-provider-upi|101981036292"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Hnatyshyn-Webster|Hnatyshyn/);

});

test('TC22_POST_Search Practitioner by Dual License', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "identifier": "https://fhir.infoway-inforoute.ca/NamingSystem/ca-on-provider-upi|104286541677"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');

});

test('TC23_POST_Search Practitioner by Active Status', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "anna",
            "active": "true"


        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`
    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toMatch(/Annala|Annan|Annamalai|Annable/);

});

test('TC24_POST_Search Practitioner by terminated Status', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "anna",
            "active": "false",
            "Perkins": "Perkins"

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;

    expect(response.status()).toBe(400);
    expect(textValue).toContain('Practitioner search parameter not supported:Perkins');

});

test('TC25_POST_Search Practitioner by Keyword', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "anna",


        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
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

test('TC26_POST_Search Practitioner by Multiple Parameters', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "Cheryl",
            "_content": "McDonough",

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const urls = jsonResponse.link[0].url;

    expect(response.status()).toBe(200);
    // expect(textValue).toContain('Bundle');
    //expect(urls).toContain("McDonough");

});

test('TC27_POST_Search Practitioner by OR operation', async ({ request }) => {

    let params: any;
    params = new URLSearchParams
        ({

            "name": "daniela,anna",
            "active": "true",

        }).toString();


    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.post(`${baseURL}?${params.toString()}`, { headers: headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.resourceType;
    const name = jsonResponse.entry[0].resource.name[0].family;

    expect(response.status()).toBe(200);
    expect(textValue).toContain('Bundle');
    expect(name).toContain("Hamilton");

});

