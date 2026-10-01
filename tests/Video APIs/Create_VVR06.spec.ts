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
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });
})

test('8. CVVR06-Create VVR with authorization, mandatory inputs less expiry date', async({}) => {
    setReport('Video API', 'CVVR')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {
            "tac": "Cardiology",
            "type": "Clinical",
        },
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    console.log(body)
    const expected = {
        "status": 400,
        "app": "VIDEO",
        "error": "E_VALIDATION_ERROR",
        "reference": regexMatchAll,
        "details": "expiry date/time must be provided",
        "version": "1.0.8",
        "validation": []
      }
    console.log("-=Response Validation=-", ResponseValidation(expected,body))
    expect(res.status()).toEqual(400)
})


test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});