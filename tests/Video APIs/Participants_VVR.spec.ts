import {test, expect} from "@playwright/test"
import {setReport, loadEnv } from "../../helper/functions";
import {generateSignature, ResponseValidation, getOffsetDate, getOffsetTime} from "../../helper/APIfunctions"
loadEnv('AWS_Staging_PEXIP')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;
let expireDATE: String = `${getOffsetDate(2)}T${getOffsetTime(0)}`
let vvrId;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });

    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {
            "title": "VVR for participants",
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
    // console.log("-=Body=-")
    // console.log(body)
    const expected = {
        "id": regexMatchAll,
        "title": "VVR for participants",
        "tac": "Cardiology",
        "type": "Clinical",
        "state": "Active",
        "expiryDate": expireDATE,
        "participants": [],
        "isOffNet": false,
        "isLectureMode": false
    }
    ResponseValidation(expected,body)
    expect(res.status()).toEqual(200)

    vvrId = body['id']
    console.log('\n**Create VVR with authorization and mandatory inputs**\n')
})

test('142. PVVR01 - Get a specific VVR for a client with multiple VVRs and no participants', async()=>{
    setReport('Video API', 'PVVR')
    const d = new Date()
    let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    console.log("-=Body=-")
    console.log(body)
    const expected = {
        "id": vvrId,
        "title": "VVR for participants",
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
})

test.describe('143-144', ()=> {

    test('143. PVVR02 - Add Participants to vvrId no parameters - error', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/${vvrId}/participants/`, {
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(400)
    })
    test("144. PVVR02-1 - VVR doesn't have new participants", async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
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
    })
    test.afterAll(async ({ }) => {
      setReport('Video API', 'PVVR')
    });
})

test.describe('145-147', ()=> {
    var vvrp1;

    test('145. PVVR03 - Add one participant participant, type=nurse to vvrId', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "type": "Nurse"
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
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "Nurse",
                "state": "Active",
                "billingInfo": {},
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

        vvrp1 = body['participants'][0]['id']
    })
    test('146. PVVR03-1 - VVR does have only one participant type=nurse', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": vvrp1,
                "type": "Nurse",
                "state": "Active",
                "billingInfo": {},
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
    test('147. PVVR03-2 - Remove participant for a VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "id": vvrp1
                }
            ],
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test.afterAll(async ({ }) => {
      setReport('Video API', 'PVVR')
    });
})

test.describe('148-150', ()=> {
    var vvrp1;

    test('148. PVVR04 - Add Participants to vvrId, type and name', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "type": "SpecialistPhysician",
                  "participantName": "Dr.Andy Smith"
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
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "SpecialistPhysician",
                "state": "Active",
                "participantName": "Dr.Andy Smith",
                "billingInfo": {},
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

        vvrp1 = body['participants'][0]['id']
    })
    test('149. PVVR04-1 - VVR has the new participant', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "SpecialistPhysician",
                "state": "Active",
                "participantName": "Dr.Andy Smith",
                "billingInfo": {},
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
    test('150. PVVR04-2 - Remove participant for a VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "id": vvrp1
                }
            ],
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test.afterAll(async ({ }) => {
      setReport('Video API', 'PVVR')
    });
})

test.describe('151-153', ()=> {
    var vvrp1;

    test('151. PVVR05 - Add Participant to vvrId, type and name and billing', async()=>{
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
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
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

        vvrp1 = body['participants'][0]['id']
    })
    test('152. PVVR05-1 - VVR has the new participant', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": vvrp1,
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
    test('153. PVVR05-2 - Remove participant for a VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/participants`, {
            data: [
                {
                  "id": vvrp1
                }
            ],
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test.afterAll(async ({ }) => {
      setReport('Video API', 'PVVR')
    });
})

test.describe('154-156', ()=> {
    var vvrp1;

    test('154. PVVR06 - Add patient participant to vvrId', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "type": "Patient",
                  "participantName": "Monica Badila",
                  "billingInfo": {
                    "patientFirstName": "Monica",
                    "patientLastName": "Badila",
                    "patientMiddleName": "Ion",
                    "patientSex": "female",
                    "patientDob": "1990-10-11",
                    "ohipNumber": "123123123",
                    "ohipVersionCode": "AB"
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
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "Patient",
                "state": "Active",
                "participantName": "Monica Badila",
                "billingInfo": {
                  "ohipNumber": "123123123",
                  "ohipVersionCode": "AB",
                  "patientDob": "1990-10-11",
                  "patientSex": "female",
                  "patientLastName": "Badila",
                  "patientFirstName": "Monica"
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

        vvrp1 = body['participants'][0]['id']
    })
    test('155. PVVR06-1 - VVR has the new participant', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": vvrp1,
                "type": "Patient",
                "state": "Active",
                "participantName": "Monica Badila",
                "billingInfo": {
                  "ohipNumber": "123123123",
                  "ohipVersionCode": "AB",
                  "patientDob": "1990-10-11",
                  "patientSex": "female",
                  "patientLastName": "Badila",
                  "patientFirstName": "Monica"
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
    test('156. PVVR06-2 - Remove participant for a VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "id": vvrp1
                }
            ],
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test.afterAll(async ({ }) => {
      setReport('Video API', 'PVVR')
    });
})

test.describe('157-159', ()=> {
    var vvrp1;

    test('157. PVVR07 - Add patient type no other info', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "type": "Patient"
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
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "Patient",
                "state": "Active",
                "billingInfo": {},
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

        vvrp1 = body['participants'][0]['id']
    })
    test('158. PVVR07-1 - VVR has the new participant', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": vvrp1,
                "type": "Patient",
                "state": "Active",
                "billingInfo": {},
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
    test('159. PVVR07-2 - Remove participant for a VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "id": vvrp1
                }
            ],
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test.afterAll(async ({ }) => {
      setReport('Video API', 'PVVR')
    });
})

test.describe('160-165', ()=> {
    var vvrp1, vvrp2, vvrp3, vvrp4, vvrp5, vvrp6, vvrp7, vvrp8, vvrp9, vvrp10, vvrp11, vvrp12
    var vvrpType1, vvrpType2, vvrpType3, vvrpType4

    test('160. PVVR08 - Add all participant  types no other info', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "type": "Patient"
                },
                {
                  "type": "PrimaryCarePhysician"
                },
                {
                  "type": "SpecialistPhysician"
                },
                {
                  "type": "NursePractitioner"
                },
                {
                  "type": "Nurse"
                },
                {
                  "type": "AlliedHealth"
                },
                {
                  "type": "OrganizationLeader"
                },
                {
                  "type": "PrimaryContact"
                },
                {
                  "type": "TelemedicineCoordinator"
                },
                {
                  "type": "TechnicalContact"
                },
                {
                  "type": "EducationUser"
                },
                {
                  "type": "AdminUser"
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
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "AdminUser",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "EducationUser",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "TechnicalContact",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "TelemedicineCoordinator",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "PrimaryContact",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "OrganizationLeader",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "AlliedHealth",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "Nurse",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "NursePractitioner",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "SpecialistPhysician",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "PrimaryCarePhysician",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "Patient",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              }
            ],
            "isOffNet": false,
            "isLectureMode": false
        }
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200);

        vvrp1 = body['participants'][0]['id']
        vvrp2 = body['participants'][1]['id']
        vvrp3 = body['participants'][2]['id']
        vvrp4 = body['participants'][3]['id']
        vvrp5 = body['participants'][4]['id']
        vvrp6 = body['participants'][5]['id']
        vvrp7 = body['participants'][6]['id']
        vvrp8 = body['participants'][7]['id']
        vvrp9 = body['participants'][8]['id']
        vvrp10 = body['participants'][9]['id']
        vvrp11 = body['participants'][10]['id']
        vvrp12 = body['participants'][11]['id']
        vvrpType1 = body['participants'][0]['type']
        vvrpType2 = body['participants'][1]['type']
        vvrpType3 = body['participants'][2]['type']
        vvrpType4 = body['participants'][3]['type']
    })
    test('161. PVVR08-1 - VVR has all new participants', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": vvrp1,
                "type": "AdminUser",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp2,
                "type": "EducationUser",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp3,
                "type": "TechnicalContact",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp4,
                "type": "TelemedicineCoordinator",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp5,
                "type": "PrimaryContact",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp6,
                "type": "OrganizationLeader",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp7,
                "type": "AlliedHealth",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp8,
                "type": "Nurse",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp9,
                "type": "NursePractitioner",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp10,
                "type": "SpecialistPhysician",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp11,
                "type": "PrimaryCarePhysician",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp12,
                "type": "Patient",
                "state": "Active",
                "billingInfo": {},
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
    test('162. PVVR08-2 - Remove participant for a VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "id": vvrp1
                },
                {
                  "id": vvrp2
                },
                {
                  "id": vvrp3
                },
                {
                  "id": vvrp4
                },
                {
                  "id": vvrp5
                },
                {
                  "id": vvrp6
                },
                {
                  "id": vvrp8
                },
                {
                  "id": vvrp9
                }
            ],
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test("163. PVVR08-3 - VVR doesn't have the deleted participants", async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": vvrp7,
                "type": "AlliedHealth",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp10,
                "type": "SpecialistPhysician",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp11,
                "type": "PrimaryCarePhysician",
                "state": "Active",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp12,
                "type": "Patient",
                "state": "Active",
                "billingInfo": {},
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
    test('164. PVVR08-4 - Remove participant for a VVR', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "id": vvrp7
                },
                {
                  "id": vvrp10
                },
                {
                  "id": vvrp11
                },
                {
                  "id": vvrp12
                }
            ],
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    test("165. PVVR08-5 - VVR doesn't have the deleted participants", async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
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
    })
    test.afterAll(async ({ }) => {
      setReport('Video API', 'PVVR')
    });
})

test.describe('166-167', ()=> {
    var vvrp1, vvrp2, vvrp3, vvrp4, vvrp5, vvrp6, vvrp7, vvrp8, vvrp9, vvrp10, vvrp11, vvrp12

    test('166. PVVR09 - Add all participant  types full info', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}/participants`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/${vvrId}/participants/`, {
            data: [
                {
                  "type": "Patient",
                  "participantName": "Dan Ionescu",
                  "billingInfo": {
                    "patientFirstName": "Dan",
                    "patientLastName": "Ionescu",
                    "patientMiddleName": "Ion",
                    "patientSex": "male",
                    "patientDob": "1990-10-11",
                    "ohipNumber": "123123123",
                    "ohipVersionCode": "AB"
                  }
                },
                {
                  "type": "PrimaryCarePhysician",
                  "participantName": "Dr. Ana Pimsner",
                  "billingInfo": {
                    "billingNumber": "123666",
                    "cpsoLicenseNumber": "2345623456"
                  }
                },
                {
                  "type": "SpecialistPhysician",
                  "participantName": "Dr. Andrei Marino",
                  "billingInfo": {
                    "billingNumber": "123667",
                    "cpsoLicenseNumber": "2345623457"
                  }
                },
                {
                  "type": "NursePractitioner",
                  "participantName": "Ms. Carol Turpin",
                  "billingInfo": {
                    "insurerName": "Manulife",
                    "insuranceGroupNumber": "2345623456",
                    "insurancePolicyNumber": "2445253"
                  }
                },
                {
                  "type": "Nurse",
                  "participantName": "Ms. Amy Poole",
                  "billingInfo": {
                    "insurerName": "Manulife",
                    "insuranceGroupNumber": "2345623456",
                    "insurancePolicyNumber": "2445253"
                  }
                },
                {
                  "type": "AlliedHealth",
                  "participantName": "Mr. Nick Claus"
                },
                {
                  "type": "OrganizationLeader",
                  "participantName": "Mr. Nick Big"
                },
                {
                  "type": "PrimaryContact",
                  "participantName": "Mr. Nick Small"
                },
                {
                  "type": "TelemedicineCoordinator",
                  "participantName": "Mr. Nick Knowitall"
                },
                {
                  "type": "TechnicalContact",
                  "participantName": "Ms. Ama Jamal"
                },
                {
                  "type": "EducationUser",
                  "participantName": "Mr.Andy Teacher"
                },
                {
                  "type": "AdminUser",
                  "participantName": "Ana Test"
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
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "AdminUser",
                "state": "Active",
                "participantName": "Ana Test",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "EducationUser",
                "state": "Active",
                "participantName": "Mr.Andy Teacher",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "TechnicalContact",
                "state": "Active",
                "participantName": "Ms. Ama Jamal",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "TelemedicineCoordinator",
                "state": "Active",
                "participantName": "Mr. Nick Knowitall",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "PrimaryContact",
                "state": "Active",
                "participantName": "Mr. Nick Small",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "OrganizationLeader",
                "state": "Active",
                "participantName": "Mr. Nick Big",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "AlliedHealth",
                "state": "Active",
                "participantName": "Mr. Nick Claus",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "Nurse",
                "state": "Active",
                "participantName": "Ms. Amy Poole",
                "billingInfo": {
                  "insurerName": "Manulife",
                  "insuranceGroupNumber": "2445253",
                  "insurancePolicyNumber": "2345623456"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "NursePractitioner",
                "state": "Active",
                "participantName": "Ms. Carol Turpin",
                "billingInfo": {
                  "insurerName": "Manulife",
                  "insuranceGroupNumber": "2445253",
                  "insurancePolicyNumber": "2345623456"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "SpecialistPhysician",
                "state": "Active",
                "participantName": "Dr. Andrei Marino",
                "billingInfo": {
                  "billingNumber": "123667",
                  "cpsoLicenseNumber": "2345623457"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "PrimaryCarePhysician",
                "state": "Active",
                "participantName": "Dr. Ana Pimsner",
                "billingInfo": {
                  "billingNumber": "123666",
                  "cpsoLicenseNumber": "2345623456"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": regexMatchAll,
                "type": "Patient",
                "state": "Active",
                "participantName": "Dan Ionescu",
                "billingInfo": {
                  "ohipNumber": "123123123",
                  "ohipVersionCode": "AB",
                  "patientDob": "1990-10-11",
                  "patientSex": "male",
                  "patientLastName": "Ionescu",
                  "patientFirstName": "Dan"
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
        expect(res.status()).toEqual(200);

        vvrp1 = body['participants'][0]['id']
        vvrp2 = body['participants'][1]['id']
        vvrp3 = body['participants'][2]['id']
        vvrp4 = body['participants'][3]['id']
        vvrp5 = body['participants'][4]['id']
        vvrp6 = body['participants'][5]['id']
        vvrp7 = body['participants'][6]['id']
        vvrp8 = body['participants'][7]['id']
        vvrp9 = body['participants'][8]['id']
        vvrp10 = body['participants'][9]['id']
        vvrp11 = body['participants'][10]['id']
        vvrp12 = body['participants'][11]['id']
        
    })
    test('167. PVVR09-1 - VVR has all new participants', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": vvrId,
            "title": "VVR for participants",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": vvrp1,
                "type": "AdminUser",
                "state": "Active",
                "participantName": "Ana Test",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp2,
                "type": "EducationUser",
                "state": "Active",
                "participantName": "Mr.Andy Teacher",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp3,
                "type": "TechnicalContact",
                "state": "Active",
                "participantName": "Ms. Ama Jamal",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp4,
                "type": "TelemedicineCoordinator",
                "state": "Active",
                "participantName": "Mr. Nick Knowitall",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp5,
                "type": "PrimaryContact",
                "state": "Active",
                "participantName": "Mr. Nick Small",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp6,
                "type": "OrganizationLeader",
                "state": "Active",
                "participantName": "Mr. Nick Big",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp7,
                "type": "AlliedHealth",
                "state": "Active",
                "participantName": "Mr. Nick Claus",
                "billingInfo": {},
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp8,
                "type": "Nurse",
                "state": "Active",
                "participantName": "Ms. Amy Poole",
                "billingInfo": {
                  "insurerName": "Manulife",
                  "insuranceGroupNumber": "2445253",
                  "insurancePolicyNumber": "2345623456"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp9,
                "type": "NursePractitioner",
                "state": "Active",
                "participantName": "Ms. Carol Turpin",
                "billingInfo": {
                  "insurerName": "Manulife",
                  "insuranceGroupNumber": "2445253",
                  "insurancePolicyNumber": "2345623456"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp10,
                "type": "SpecialistPhysician",
                "state": "Active",
                "participantName": "Dr. Andrei Marino",
                "billingInfo": {
                  "billingNumber": "123667",
                  "cpsoLicenseNumber": "2345623457"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp11,
                "type": "PrimaryCarePhysician",
                "state": "Active",
                "participantName": "Dr. Ana Pimsner",
                "billingInfo": {
                  "billingNumber": "123666",
                  "cpsoLicenseNumber": "2345623456"
                },
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              {
                "id": vvrp12,
                "type": "Patient",
                "state": "Active",
                "participantName": "Dan Ionescu",
                "billingInfo": {
                  "ohipNumber": "123123123",
                  "ohipVersionCode": "AB",
                  "patientDob": "1990-10-11",
                  "patientSex": "male",
                  "patientLastName": "Ionescu",
                  "patientFirstName": "Dan"
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
    test.afterAll(async ({ }) => {
      setReport('Video API', 'PVVR')
    });
})

test.afterAll(async ({ }) => {
    // Dispose all responses.
    const d = new Date()
    let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })

    expect(res.status()).toEqual(200)
    console.log("\n**Deleted the VVR identified by a valid id**\n")
    await apiContext.dispose();
});


