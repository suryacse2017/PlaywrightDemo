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




test.describe('CVVR16 Create/delete VVR with long title', ()=> {
    var vvrld;
    
    test('101. CVVR16 Create VVR with 999 characteres title', async({}) => {
        setReport('Video API', 'CVVR')
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR16-Very long title more than 100 characters once Very long title more than 100 characters twice plus CVVR16-Very long title more than 1000 characters once Very long title more than 1000 characters twice plus CVVR16-Very long title more than 100 characters once Very long title more than 1000 characters twice plus Very long title more than 100 characters once Very long title more than 100 characters twice plus CVVR16-Very long title more than 1000 characters once Very long title more than 1000 characters twice plus CVVR16-Very long title more than 100 characters once Very long title more than 1000 characters twice plusVery long title more than 100 characters once Very long title more than 100 characters twice plus CVVR16-Very long title more than 1000 characters once Very long title more than 1000 characters twice plus CVVR16-Very long title more than 100 characters once Very long title more than 1000 characters twice 10 ee more than 1000 characters twice plus  Going over 1000 chara",
                "tac": "Allergy",
                "type": "Administrative",
                "expiryDate": expireDATE,
                "participants": []
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "tac": "Allergy",
            "type": "Administrative",
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
    test('102. CVVRD16  - Delete the VVR identified by a valid id', async({}) => {
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


    
