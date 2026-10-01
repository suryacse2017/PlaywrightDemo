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




test.describe('CVVR20 Create/delete VVR with authorization,mandatory inputs,multiple patients and VVM', ()=> {
    var vvrld,vp0,vp1,vp2;
    
    test('109. CVVR20-Create VVR with authorization,mandatory inputs,multiple patients and VVM', async({}) => {
        setReport('Video API', 'CVVR')
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
           data: {"title": "CVVR20",
           "tac": "Cardiology",
           "type": "Clinical",
           "state": "InProgress",
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
        vvrld = body['id']
        const vp0 = body['participants'][0]['id']
        const vp1 = body['participants'][1]['id']
        const vp2 = body['participants'][2]['id']
       
        const expected = {
      
          "id": regexMatchAll,
          "title": "CVVR20",
          "tac": "Cardiology",
          "type": "Clinical",
          "state":"InProgress",
          "expiryDate": expireDATE,
          "participants": [
            {
              "id": regexMatchAll,
              "type": "Patient",
              "state": "Waiting",
              "participantName": "Ana Marino",
              "videoSession":regexMatchAll,
              "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${vp0}/videosession`,
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
              "state": "Waiting",
              "participantName": "Dan Ionescu",
              "videoSession":regexMatchAll,
              "videoAccessUrl":  `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${vp1}/videosession`,
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
              "state": "Waiting",
              "participantName": "Dr.Andy Smith",
              "videoSession":regexMatchAll,
              "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${vp2}/videosession`,
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

            })
    test('110. CVVRD20 - Delete the VVR identified by a valid id', async({}) => {
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


    
