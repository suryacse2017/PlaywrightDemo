import { test, expect, request, Page } from '@playwright/test';
import { resources, logApiCall } from "../../../res/resource";

//import {APIUtils} from './Utils/APIUtils';

let token1: any;
token1 = "";

let token: any;
let baseURL1: any;
let resource: any;
let baseURL: any;


test.beforeAll(async () => {

    token = resources.jwtToken;
    baseURL1 = test.info().project.use.baseURL;
    resource = resources.GetOrganization;
    baseURL = baseURL1 + resource;

}

);



test('@smoke TC1_Get_Search Organization without authorization should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "name": "ksenia"

    }).toString();

    const headers = {

        'Authorization': ` `

    };

    const fullUrl = `${baseURL}?${params}`;
    const response = await request.get(`${baseURL}?${params}`, { headers: headers });
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

test('TC2_Get_Search Organization without scope should fail', async ({ request }) => {
    let params: any;
    params = new URLSearchParams({
        "name": "ksenia"

    }).toString();
    const headers = {
        'Authorization': `Bearer ${token}`,

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.get(`${baseURL}?${params}`, { headers: headers });
    await logApiCall({
        method: 'GET',
        fullUrl,
        headers,
        response,
    });
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('no scope');
});

