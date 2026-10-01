import {test, expect} from "@playwright/test"
import {setReport, loadEnv } from "../../helper/functions";
import {generateSignature, ResponseValidation, getOffsetDate, getOffsetTime} from "../../helper/APIfunctions"
loadEnv('AWS_Staging_PEXIP')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;
let expireDATE: String = `${getOffsetDate(2)}T${getOffsetTime(0)}`
let expireDATE2: String = `${getOffsetDate(5)}T10:00:01`


test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });
})

test.describe('173-180', ()=> {
    var participantId;
    let vvrId;

    test('173. CVVR04-Create VVR with authorization and mandatory inputs',async () => {
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
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
        // console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)
    
        vvrId = body['id']
    })
    test('174. UVVR01 - Update the type of the previous VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.put(`/${process.env.relURL}/${vvrId}/`, {
            data: {
                "type": "Administrative"
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
    })
    test('175. UVVR02 - Update the tac of the previous VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.put(`/${process.env.relURL}/${vvrId}/`, {
            data: {
                "tac": "Allergy"
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
            "tac": "Allergy",
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
    })
    test('176. UVVR03 - Update the expiry date of the previous VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.put(`/${process.env.relURL}/${vvrId}/`, {
            data: {
                "expiryDate": expireDATE2
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
            "tac": "Allergy",
            "type": "Administrative",
            "state": "Active",
            "expiryDate": expireDATE2,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)
    })
    test('177. UVVR04 - Update the title of the previous VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.put(`/${process.env.relURL}/${vvrId}/`, {
            data: {
                "title": "UVVR04-Changed title"
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
            "title": "UVVR04-Changed title",
            "tac": "Allergy",
            "type": "Administrative",
            "state": "Active",
            "expiryDate": expireDATE2,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)
    })
    test('178. PVVR04-1 - Add Participants to vvrId, type and name and billing', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "type": "PrimaryCarePhysician",
                  "participantName": "Dr.Ana Marino",
                  "billingInfo": {
                    "billingNumber": "123456",
                    "cpsoLicenseNumber": "2345623456"
                  }
                }
            ],
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "UVVR04-Changed title",
            "tac": "Allergy",
            "type": "Administrative",
            "state": "Active",
            "expiryDate": expireDATE2,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "PrimaryCarePhysician",
                "state": "Active",
                "participantName": "Dr.Ana Marino",
                "billingInfo": {
                  "billingNumber": "123456",
                  "cpsoLicenseNumber": "2345623456"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              }
            ],
            "isOffNet": false,
            "isLectureMode": false
        }
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        participantId = body['participants'][0]['id']
    })
    test('179. UVVR04-2 - Update the type  of the previous VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.put(`/${process.env.relURL}/${vvrId}/`, {
            data: {
                "type": "Clinical"
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "UVVR04-Changed title",
            "tac": "Allergy",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE2,
            "participants": [
              {
                "id": participantId,
                "type": "PrimaryCarePhysician",
                "state": "Active",
                "participantName": "Dr.Ana Marino",
                "billingInfo": {
                  "billingNumber": "123456",
                  "cpsoLicenseNumber": "2345623456"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              }
            ],
            "isOffNet": false,
            "isLectureMode": false
        }
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)
    })
    test('180. UVVRD04 - Delete the VVR identified by a valid id',async () => {
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
    test.afterAll(async ({ }) => {
        setReport('Video API', 'UVVR')
    });
})

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});