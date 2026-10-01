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




test.describe('CVVR05 -Create VVR with authorization and mandatory inputs and title', ()=> {
    var vvrld;
    
    test('6. CVVR05 - Create VVR with authorization, mandatory inputs and title', async({}) => {
        setReport('Video API', 'CVVR')
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR05",
                "tac": "Cardiology",
                "state": "Active",
                "type": "Clinical",
                "expiryDate": expireDATE
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR05",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)

        vvrld = body['id']
    })
    test('7. CVVRD05 - Delete the VVR identified by a valid id', async({}) => {
        
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrld}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrld}`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test.afterAll(async ({ }) => {
        // Dispose all responses.
        await apiContext.dispose();
    });
})




    
