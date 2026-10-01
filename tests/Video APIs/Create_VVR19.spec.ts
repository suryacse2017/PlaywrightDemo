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




test.describe('CVVR19 Create/delete VVR with multiple patients', ()=> {
    var vvrld;
    
    test('107. CVVR19-Create VVR with authorization and mandatory inputs and multiple patients', async({}) => {
        setReport('Video API', 'CVVR')
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR19",
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
                      "participantName": "Ana Marino",
                      "billingInfo": {
                        "patientFirstName": "Ana",
                        "patientLastName": "Marino",
                        "patientMiddleName": "Ioana",
                        "patientSex": "female",
                        "patientDob": "1990-10-11",
                        "ohipNumber": "123123125",
                        "ohipVersionCode": "AB"
                      }
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
          "id": regexMatchAll,
          "title": "CVVR19",
          "tac": "Cardiology",
          "type": "Clinical",
          "state": "Active",
          "expiryDate": expireDATE,
          "participants": [
            {
              "id": regexMatchAll,
              "type": "Patient",
              "state": "Active",
              "participantName": "Ana Marino",
              "billingInfo": {
                "ohipNumber": "123123125",
                "ohipVersionCode": "AB",
                "patientDob": "1990-10-11",
                "patientSex": "female",
                "patientLastName": "Marino",
                "patientFirstName": "Ana"
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
        expect(res.status()).toEqual(200)

        vvrld = body['id']
    })
    test('108. CVVRD19 - Delete the VVR identified by a valid id', async({}) => {
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


    
