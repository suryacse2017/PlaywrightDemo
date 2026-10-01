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

test.describe('134-140', ()=>{
    var VVRid;
    var VVRp1;
    var VVRp2;
    var VVRp3;

    test('134. VVM01-1 - Create VVR with authorization and mandatory inputs and multiple patients', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`,{
            data: {
                "title": "VVR for Video Modality",
                "tac": "Cardiology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": [
                    {
                        "type": "Nurse",
                        "participantName": "Dr.Andy Smith",
                        "billingInfo": {
                            "billingNumber": "123456",
                            "cpsoLicenseNumber": "2345623456"
                        }
                    },
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
                        "type": "Patient",
                        "participantName": "Ioana Pavelescu",
                        "billingInfo": {
                            "patientFirstName": "Ioana",
                            "patientLastName": "Pavelescu",
                            "patientMiddleName": "Adina",
                            "patientSex": "female",
                            "patientDob": "1990-01-11",
                            "ohipNumber": "123123155",
                            "ohipVersionCode": "DC"
                        }
                    }
                ]
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        // console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "VVR for Video Modality",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "Patient",
                "state": "Active",
                "participantName": "Ioana Pavelescu",
                "billingInfo": {
                  "ohipNumber": "123123155",
                  "ohipVersionCode": "DC",
                  "patientDob": "1990-01-11",
                  "patientSex": "female",
                  "patientLastName": "Pavelescu",
                  "patientFirstName": "Ioana"
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
              },
              {
                "id": regexMatchAll,
                "type": "Nurse",
                "state": "Active",
                "participantName": "Dr.Andy Smith",
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
        console.log(body)
        
        expect(res.status()).toEqual(200)

        VVRid = body['id']
        VVRp1 = body['participants'][0]['id']
        VVRp2 = body['participants'][1]['id']
        VVRp3 = body['participants'][2]['id']
        console.log(VVRid)
        console.log(VVRp1)
        console.log(VVRp2)
        console.log(VVRp3)
    })

    test('135. GVVR05 - Get a specific VVR for a client with multiple VVRs', async()=>{
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}/${VVRid}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/${VVRid}/`,{
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        const expected = {
            "id": VVRid,
            "title": "VVR for Video Modality",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": regexMatchAll,
                "type": "Patient",
                "state": "Active",
                "participantName": "Ioana Pavelescu",
                "billingInfo": {
                  "ohipNumber": "123123155",
                  "ohipVersionCode": "DC",
                  "patientDob": "1990-01-11",
                  "patientSex": "female",
                  "patientLastName": "Pavelescu",
                  "patientFirstName": "Ioana"
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
              },
              {
                "id": regexMatchAll,
                "type": "Nurse",
                "state": "Active",
                "participantName": "Dr.Andy Smith",
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
        console.log(body)
        expect(res.status()).toEqual(200)
    })
    test(`136. VVM01-2 - Start Video Modality for VVR with VVRId  and 3 participants`, async()=>{
        const d = new Date()
        let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${VVRid}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.put(`/${process.env.relURL}/${VVRid}/`,{
            data: {
                "state": "InProgress",
                "participants": [
                  {
                    "id": VVRp1
                  },
                  {
                    "id": VVRp2
                  },
                  {
                    "id": VVRp3
                  }
                ]
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log(body)
        const expected = {
            "id": VVRid,
            "title": "VVR for Video Modality",
            "name": regexMatchAll,
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "InProgress",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": VVRp1,
                "type": "Patient",
                "state": "Waiting",
                "participantName": "Ioana Pavelescu",
                "videoSession": regexMatchAll,
                "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${VVRp1}/videosession`,
                "billingInfo": {
                  "ohipNumber": "123123155",
                  "ohipVersionCode": "DC",
                  "patientDob": "1990-01-11",
                  "patientSex": "female",
                  "patientLastName": "Pavelescu",
                  "patientFirstName": "Ioana"
                }
              },
              
              {
                "id": VVRp2,
                "type": "Patient",
                "state": "Waiting",
                "participantName": "Dan Ionescu",
                "videoSession": regexMatchAll,
                "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${VVRp2}/videosession`,
                "billingInfo": {
                  "ohipNumber": "123123123",
                  "ohipVersionCode": "AB",
                  "patientDob": "1990-10-11",
                  "patientSex": "male",
                  "patientLastName": "Ionescu",
                  "patientFirstName": "Dan"
                },
                "eventHistory": [
                  {
                    "start": regexMatchAll,
                    "end": regexMatchAll
                  }
                ],
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              
              {
                "id": VVRp3,
                "type": "Nurse",
                "state": "Waiting",
                "participantName": "Dr.Andy Smith",
                "videoSession": regexMatchAll,
                "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${VVRp3}/videosession`,
                "billingInfo": {
                  "billingNumber": "123456",
                  "cpsoLicenseNumber": "2345623456"
                },
                "eventHistory": [
                  {
                    "start": regexMatchAll,
                    "end": regexMatchAll
                  }
                ],
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
            ],
            "isOffNet": false,
            "isLectureMode": false
          }
       // console.log("-=Response Validation=-", ResponseValidation(expected,body))
        console.log(body)
        
        expect(res.status()).toEqual(200)
    })

    test(`137. VVM04 - Stop Video Modality for VVR with VVRId and 3 participants`, async()=>{
        const d = new Date()
        let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${VVRid}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.put(`/${process.env.relURL}/${VVRid}/`,{
            data: {
                "state": "Active"
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log(body)
        const expected = {
          id: VVRid,
          title: 'VVR for Video Modality',
          tac: 'Cardiology',
          type: 'Clinical',
          state: 'Active',
          expiryDate: regexMatchAll,
          participants: [
            {
              id: VVRp1,
              type: 'Patient',
              state: 'Active',
              participantName: 'Ioana Pavelescu',
              billingInfo: {
                "ohipNumber": "123123155",
                "ohipVersionCode": "DC",
                "patientDob": "1990-01-11",
                "patientSex": "female",
                "patientLastName": "Pavelescu",
                "patientFirstName": "Ioana"
              },
              eventHistory: [ {
                "end": regexMatchAll,
                "start": regexMatchAll,
                }],
              isRoomBasedSystem: false,
              isHostSystem: false
            },
            {
              id: VVRp2,
              type: 'Patient',
              state: 'Active',
              participantName: 'Dan Ionescu',
              billingInfo: {
                "ohipNumber": "123123123",
                "ohipVersionCode": "AB",
                "patientDob": "1990-10-11",
                "patientSex": "male",
                "patientLastName": "Ionescu",
                "patientFirstName": "Dan"
              },
              eventHistory: [ {
                "end": regexMatchAll,
                "start": regexMatchAll,
                }],
              isRoomBasedSystem: false,
              isHostSystem: false
            },
            {
              id: VVRp3,
              type: 'Nurse',
              state: 'Active',
              participantName: 'Dr.Andy Smith',
              billingInfo: {
                "billingNumber": "123456",
                "cpsoLicenseNumber": "2345623456"
              },
              eventHistory: [{
                "end": regexMatchAll,
                "start": regexMatchAll,
                }],
              isRoomBasedSystem: false,
              isHostSystem: false
            }
          ],
          isOffNet: false,
          isLectureMode: false
        }

       // console.log("-=Response Validation=-", ResponseValidation(expected,body))
       
        
        expect(res.status()).toEqual(200)
    })

    test(`138. VVM05 - Start again Video Modality for ${VVRid} and 3 participants`, async()=>{
      const d = new Date()
        let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${VVRid}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.put(`/${process.env.relURL}/${VVRid}/`,{
            data: {
                "state": "InProgress",
                "participants": [
                  {
                    "id": VVRp1
                  },
                  {
                    "id": VVRp2
                  },
                  {
                    "id": VVRp3
                  }
                ]
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log(body)
        const expected = {
            "id": VVRid,
            "title": "VVR for Video Modality",
            "name": regexMatchAll,
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "InProgress",
            "expiryDate": expireDATE,
            "participants": [
              {
                "id": VVRp1,
                "type": "Patient",
                "state": "Waiting",
                "participantName": "Ioana Pavelescu",
                "videoSession": regexMatchAll,
                "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${VVRp1}/videosession`,
                "billingInfo": {
                  "ohipNumber": "123123155",
                  "ohipVersionCode": "DC",
                  "patientDob": "1990-01-11",
                  "patientSex": "female",
                  "patientLastName": "Pavelescu",
                  "patientFirstName": "Ioana"
                }
              },
              
              {
                "id": VVRp2,
                "type": "Patient",
                "state": "Waiting",
                "participantName": "Dan Ionescu",
                "videoSession": regexMatchAll,
                "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${VVRp2}/videosession`,
                "billingInfo": {
                  "ohipNumber": "123123123",
                  "ohipVersionCode": "AB",
                  "patientDob": "1990-10-11",
                  "patientSex": "male",
                  "patientLastName": "Ionescu",
                  "patientFirstName": "Dan"
                },
                "eventHistory": [
                  {
                    "start": regexMatchAll,
                    "end": regexMatchAll
                  }
                ],
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
              
              {
                "id": VVRp3,
                "type": "Nurse",
                "state": "Waiting",
                "participantName": "Dr.Andy Smith",
                "videoSession": regexMatchAll,
                "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${VVRp3}/videosession`,
                "billingInfo": {
                  "billingNumber": "123456",
                  "cpsoLicenseNumber": "2345623456"
                },
                "eventHistory": [
                  {
                    "start": regexMatchAll,
                    "end": regexMatchAll
                  }
                ],
                "isRoomBasedSystem": false,
                "isHostSystem": false
              },
            ],
            "isOffNet": false,
            "isLectureMode": false
          }
      // console.log("-=Response Validation=-", ResponseValidation(expected,body))
        console.log(body)
        
        expect(res.status()).toEqual(200)
    })  

    test(`139. VVM06 - Stop again Video Modality for ${VVRid} and 3 participants`, async()=>{
      const d = new Date()
      let signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${VVRid}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
      const res = await apiContext.put(`/${process.env.relURL}/${VVRid}/`,{
          data: {
              "state": "Active"
          },
          headers: {
              "Authorization":signature
          }
      })
      const body = await res.json()
      // console.log(body)
      const expected = {
          "id": VVRid,
          "title": "VVR for Video Modality",
          "tac": "Cardiology",
          "type": "Clinical",
          "state": "Active",
          "expiryDate": expireDATE,
          "participants": [
            {
              "id": VVRp3,
              "type": "Nurse",
              "state": "Active",
              "participantName": "Dr.Andy Smith",
              "billingInfo": {
                "billingNumber": "123456",
                "cpsoLicenseNumber": "2345623456"
              },
              "eventHistory": [
                {
                  "start": regexMatchAll,
                  "end": regexMatchAll
                }
              ],
              "isRoomBasedSystem": false,
              "isHostSystem": false
            },
            {
              "id": VVRp2,
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
              "eventHistory": [
                {
                  "start": regexMatchAll,
                  "end": regexMatchAll
                }
              ],
              "isRoomBasedSystem": false,
              "isHostSystem": false
            },
           
            {
              "id": VVRp1,
              "type": "Patient",
              "state": "Active",
              "participantName": "Ioana Pavelescu",
              "billingInfo": {
                 "ohipNumber": "123123155",
                  "ohipVersionCode": "DC",
                  "patientDob": "1990-01-11",
                  "patientSex": "female",
                  "patientLastName": "Pavelescu",
                  "patientFirstName": "Ioana"
              },
              "eventHistory": [
                {
                  "start": regexMatchAll,
                  "end": regexMatchAll
                }
              ],
              "isRoomBasedSystem": false,
              "isHostSystem": false
            },
          ],
          "isOffNet": false,
          "isLectureMode": false
        }
     // console.log("-=Response Validation=-", ResponseValidation(expected,body))
        
      expect(res.status()).toEqual(200)
    })  

    test('140. CVVRD14-01 - Delete the VVR identified by a valid id', async()=>{
      const d = new Date()
      let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${VVRid}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
      const res = await apiContext.delete(`/${process.env.relURL}/${VVRid}/`, {
          data: {},
          headers: {
              "Authorization":signature
          }
      })
      expect(res.status()).toEqual(200)
  })

    test.afterAll(async ({ }) => {
      setReport('Video API', 'VVM')
    });
})

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});


