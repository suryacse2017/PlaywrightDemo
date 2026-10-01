import {test, expect} from "@playwright/test"
import {setReport, loadEnv } from "../../helper/functions";
import {generateSignature, ResponseValidation, getOffsetDate, getOffsetTime} from "../../helper/APIfunctions"
loadEnv('AWS_Staging_PEXIP')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;
let expireDATE: String = `${getOffsetDate(2)}T${getOffsetTime(0)}`
// let signature;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });
})

test('128. DVVR01 - Delete the VVR with no parameters', async()=>{
    setReport('Video API', 'DVVR')
    const d = new Date()
    let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/abc123`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.delete(`/${process.env.relURL}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })
    expect(res.status()).toEqual(401)
})

test('129. DVVR02 - Delete the VVR without vvr Id', async()=>{
    setReport('Video API', 'DVVR')
    const d = new Date()
    let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.delete(`/${process.env.relURL}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })
    expect(res.status()).toEqual(401)
})

test('130. DVVR03 - Delete the VVR identified by vvrUUID that never existed', async()=>{
    setReport('Video API', 'DVVR')
    const vvrId1 = '8c2410db-2aa2-4923-9bdd-1feaed955dvv'
    const d = new Date()
    let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId1}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.delete(`/${process.env.relURL}/${vvrId1}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    console.log("-=Body=-")
    console.log(body)
    const expected = {
        "status": 400,
        "app": "VIDEO",
        "error": "E_VALIDATION_ERROR",
        "reference": regexMatchAll,
        "details": `cannot find VVR with uuid:${vvrId1}`,
        "version": "1.0.8",
        "validation": []
      }

    console.log("-=Response Validation=-", ResponseValidation(expected,body))
    // expect(body).toEqual(expected)
    expect(res.status()).toEqual(400)
})

test.describe('131-133', ()=> {
    var vvrId;

    test('131. CVVR04-Create VVR with authorization, mandatory inputs and title', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "VVR to delete",
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
            "title": "VVR to delete",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
    
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })

    test('132. DVVR04 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.text()
        console.log("-=Body=-")
        console.log(body)
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)
    })
    test('133. DVVR05 - Delete the VVR identified by vvr id  that has already been deleted', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "status": 400,
            "app": "VIDEO",
            "error": "E_VALIDATION_ERROR",
            "reference": regexMatchAll,
            "details": `cannot find VVR with uuid:${vvrId}`,
            "version": "1.0.8",
            "validation": []
        }
    
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(400)
    })
    test.afterAll(async ({ }) => {
        setReport('Video API', 'DVVR')
    });
})



test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});