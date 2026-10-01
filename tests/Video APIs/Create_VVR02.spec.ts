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

    
    test('CVVR02-Create VVR With Authorisation, No Inputs', async({}) => {
        setReport('Video API', 'CVVR')
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
           
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log(body)
        const expected = {
            "status": 400,
            "app": "VIDEO",
            "error": "E_UNKNOWN",
            "reference": regexMatchAll,
            "details": "org.springframework.http.converter.HttpMessageNotReadableException: Required request body is missing: public ca.otn.middletier.virtualvisit.dto.VVRDto ca.otn.middletier.virtualvisit.controller.VirtualVisitController.createVVR(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse,ca.otn.middletier.virtualvisit.dto.VVRDto) throws java.lang.Exception:Required request body is missing: public ca.otn.middletier.virtualvisit.dto.VVRDto ca.otn.middletier.virtualvisit.controller.VirtualVisitController.createVVR(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse,ca.otn.middletier.virtualvisit.dto.VVRDto) throws java.lang.Exception",
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
