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




test.describe('CVVR14-Create/delete  VVR to test type', ()=> {
    var vvrId;
    
    test('90. CVVR14-01 - Create VVR with different type', async()=>{
        setReport('Video API', 'CVVR')
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR14-01",
                "tac": "Genetics",
                "type": "Test",
                "expiryDate": expireDATE,
                "participants": []
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
            "title": "CVVR14-01",
            "tac": "Genetics",
            "type": "Test",
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
        test('91. CVVRD14-01 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test('92. CVVR14-02 - Create VVR with different type', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR14-02",
                "tac": "Genetics",
                "type": "Educational",
                "expiryDate": expireDATE,
                "participants": []
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
            "title": "CVVR14-02",
            "tac": "Genetics",
            "type": "Educational",
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
    test('93. CVVRD14-02 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
    })

    test('94. CVVR14-03 - Create VVR with different type', async()=>{
       
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR14-03",
                "tac": "Genetics",
                "type": "IndirectClinical",
                "expiryDate": expireDATE,
                "participants": []
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
            "title": "CVVR14-03",
            "tac": "Genetics",
            "type": "IndirectClinical",
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
    test('95. CVVRD14-03 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
    })
    test('96. CVVR14-04 - Create VVR with different type', async()=>{
       
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR14-04",
                "tac": "Genetics",
                "type": "Administrative",
                "expiryDate": expireDATE,
                "participants": []
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
            "title": "CVVR14-04",
            "tac": "Genetics",
            "type": "Administrative",
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
    test('97. CVVRD14-04 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
    })

    test('98. CVVR14-05 - Create VVR with different type', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR14-05",
                "tac": "Genetics",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
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
            "title": "CVVR14-05",
            "tac": "Genetics",
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
    test('99. CVVRD14-05 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
    })
    test.afterAll(async ({ }) => {
        // Dispose all responses.
        await apiContext.dispose();
    });

  })
    
