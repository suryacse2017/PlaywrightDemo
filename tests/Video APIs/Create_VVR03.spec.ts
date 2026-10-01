import {test, expect} from "@playwright/test"
import {setReport, loadEnv } from "../../helper/functions";
import {generateSignature, ResponseValidation, getOffsetDate, getOffsetTime, getDateTime} from "../../helper/APIfunctions"
loadEnv('AWS_Staging_PEXIP')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;
let expireDATE: String = `${getOffsetDate(2)}T${getOffsetTime(0)}`
let expireDATEpastTime: String = `${getDateTime(-3600)}`
let expireDATEafterTime: String = `${getDateTime(3600)}`
let expireDATEpastDate: String = `${getDateTime(-86400)}`
// let signature;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });
})



test('3. CVVR03 - Create VVR with no authorization and mandatory inputs', async({}) => {
    setReport('Video API', 'CVVR')
    const res = await apiContext.post(`/${process.env.relURL}`, {
        data: {
            "tac": "Cardiology",
            "state": "active",
            "type": "Clinical",
            "expiryDate": expireDATE
          }
    })
    const body = await res.json()
    console.log(body)
    const expected = {
        "status": 401,
        "app": "AUTHENTICATION",
        "error": "E_INVALID_API_ACCESS_TOKEN",
        "reference": regexMatchAll,
        "details": "apikey not provided",
        "version": "1.0.8",
        "validation": []
      }
    console.log("-=Response Validation=-", ResponseValidation(expected,body))
    expect(res.status()).toEqual(401)
})


test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});