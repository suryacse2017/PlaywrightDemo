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

test.describe('111-112', ()=> {
    var vvrld;
    
    test('111. Get all VVRs for the user with curent apikey to delete', async() => {
        // setReport('Video API', 'GVVR')
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = []
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)

        //vvrld = body[0]['id']
    })
    /*
    test('112. DVVR04 - Delete the VVR identified by a valid id', async() => {
         setReport('Video API', 'GVVR')
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
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
        expect(res.status()).toEqual(200)
    })
    */
    test.afterAll(async ({ }) => {
        setReport('Video API', 'GVVR')
    });
})

test('113. GVVR01 - GET VVR With No Authorisation No Inputs', async() => {
    setReport('Video API', 'GVVR')
    const res = await apiContext.get(`/${process.env.relURL}`,{
        data: {},
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

test('114. GVVR02 - Get VVR for a client with no VVR', async() => {
    setReport('Video API', 'GVVR')
    const d = new Date()
    let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.get(`/${process.env.relURL}`,{
        data: {},
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    console.log(body)
    // const expected = []
    // expect(body).toEqual(expected)
    expect(res.status()).toEqual(200)
})

test.describe('115, 116, 124', ()=> {
    var vvrId1;

    test('115. CVVR04 - Create 1st VVR with authorization and mandatory inputs', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`,{
            data: {
                "tac": "Cardiology",
                "type": "Clinical",
                "expiryDate": expireDATE
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
        ResponseValidation(expected, body)
        expect(res.status()).toEqual(200)

        vvrId1 = body['id']
    })
    test('116. GVVR03 - Get VVR for a client with one VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = [
            {
              "id": regexMatchAll,
              "tac": "Cardiology",
              "type": "Clinical",
              "state": "Active",
              "expiryDate": expireDATE,
              "participants": [],
              "isOffNet": false,
              "isLectureMode": false
            }
          ]
        console.log("-=Response Validation=-")
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)
    })
    test('124. DVVR04 - Delete the VVR identified by 1st id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId1}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId1}`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })

    test.afterAll(async ({ }) => {
        setReport('Video API', 'GVVR')
    });
})

test.describe('118,122,125', ()=> {
    var vvrId2;

    test('118. CVVR04 - Create 2nd VVR with authorization and mandatory inputs', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`,{
            data: {
                "tac": "Cardiology",
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
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
        console.log("-=Response Validation=-")
        ResponseValidation(expected, body)
        expect(res.status()).toEqual(200)

        vvrId2 = body['id']
    })
    test('122. GVVR05 - Get a specific VVR for a client with multiple VVRs', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId2}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId2}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId2,
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        console.log("-=Response Validation=-")
        // console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)
    })
    test('125. DVVR04 - Delete the VVR identified by 2nd id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId2}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId2}`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })

    test.afterAll(async ({ }) => {
        setReport('Video API', 'GVVR')
    });
})

test.describe('119,120,121,126,127', ()=> {
    var vvrId3;
    var vvrId4;

    test('119. CVVR04 - Create 3rd VVR with authorization and mandatory inputs', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`,{
            data: {
                "tac": "Cardiology",
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
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
        console.log("-=Response Validation=-")
        ResponseValidation(expected, body)
        expect(res.status()).toEqual(200)

        vvrId3 = body['id']
    })
    test('120. CVVR04 - Create 4th VVR with authorization and mandatory inputs', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`,{
            data: {
                "tac": "Cardiology",
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
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
        console.log("-=Response Validation=-")
        ResponseValidation(expected, body)
        expect(res.status()).toEqual(200)

        vvrId4 = body['id']
    })
    test('121. GVVR05 - Get VVR for a client with multiple VVRs', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test('126. DVVR04 - Delete the VVR identified by 3rd id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId3}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId3}`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test('127. DVVR04 - Delete the VVR identified by 4th id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId4}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId4}`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test.afterAll(async ({ }) => {
        setReport('Video API', 'GVVR')
    });
})

test('123. GVVR06 - Get a specific VVR for a client that have multiple VVR using a wrong id', async()=>{
    setReport('Video API', 'GVVR')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })
    expect(res.status()).toEqual(400)
})

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});


