import { test, expect, request, Page } from '@playwright/test';
import { resources, logApiCall } from "../../../res/resource";


let token: any;
let baseURL1: any;
let resource: any;
let baseURL: any;


test.beforeAll(async () => {

    token = resources.jwtToken;
    baseURL1 = test.info().project.use.baseURL;
    resource = resources.PostLocation;
    baseURL = baseURL1 + resource;

}

);



test('@smoke Post_Search Location without authorization should fail', async ({ request }) => {

    let params: any;
    params = new URLSearchParams({
        "name": "Community"

    }).toString();
    const headers = {

        'Content-Type': `application/x-www-form-urlencoded`,
        'Authorization': ` `

    };


    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.post(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const responseHeaders = response.headers();
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(401);
    expect(textValue).toContain('Authorization header is missing');
});




test('Post_Search Location without scope should fail', async ({ request }) => {
    let params: any;
    params = new URLSearchParams({
        "name": "Community"

    }).toString();
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `application/x-www-form-urlencoded`,

    };

    const fullUrl = `${baseURL}?${params.toString()}`;
    const response = await request.post(`${baseURL}?${params}`, { headers });
    await logApiCall({
        method: 'POST',
        fullUrl,
        headers,
        response,
    });
    const responseHeaders = response.headers();
    const jsonResponse = await response.json();
    const textValue = jsonResponse.issue[0].details.text;
    expect(response.status()).toBe(403);
    expect(textValue).toContain('no scope');

});


