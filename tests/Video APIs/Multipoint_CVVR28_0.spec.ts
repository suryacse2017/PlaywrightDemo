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
})

//Copy the video links from terminal on browsers on different devices. Connect (clink on the appropriate button if necessary on each device) manually the call.
test('181. CVVR28 - Create clinical VVR with authorization,mandatory inputs,multiple patients and VVM', async()=>{
    setReport('Adhock Multipoint', 'CVVR28')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {
            "title": "CVVR28 for adhoc multipoint call",
            "tac": "Cardiology",
            "state": "InProgress",
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
              }
            ]
        },
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    // console.log("-=Body=-")
    // console.log(body)
    const vp0 = body['participants'][0]['id']
    const vp1 = body['participants'][1]['id']
    const vp2 = body['participants'][2]['id']
    const expected = {
        "id": regexMatchAll,
        "title": "CVVR28 for adhoc multipoint call",
        "name": regexMatchAll,
        "tac": "Cardiology",
        "type": "Clinical",
        "state": "InProgress",
        "expiryDate": expireDATE,
        "participants": [
          {
            "id": regexMatchAll,
            "type": "Patient",
            "state": "Waiting",
            "participantName": "Dan Ionescu",
            "videoSession": regexMatchAll,
            "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${vp0}/videosession`,
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
            "type": "Patient",
            "state": "Waiting",
            "participantName": "Dan Ionescu",
            "videoSession": regexMatchAll,
            "videoAccessUrl": `${process.env.baseVideoURL}/${process.env.relVideoURL}/participants/${vp1}/videosession`,
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
            "videoSession": regexMatchAll,
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
    // expect(body).toEqual(expected)
    expect(res.status()).toEqual(200)

    vvrId = body['id']
    printLinks(body)
})

test.afterEach(async({page}) => {
    test.setTimeout(150000)
    await page.waitForTimeout(120000)
    console.log(`\n***Stop Video Modality for ${vvrId} with 30 seconds delay***`)
    const d = new Date()
    var signature = generateSignature("PUT", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    var res = await apiContext.put(`/${process.env.relURL}/${vvrId}/`, {
        data: {
            "state": "Active"
        },
        headers: {
            "Authorization":signature
        }
    })
    expect(res.status()).toEqual(200)

    console.log('***Delete the VVR identified by vvrId***')
    var signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    var res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
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


function printLinks(body){
    const participants = body['participants']
    participants.forEach((element, i) => {
        console.log("Web Link", (i+1), ":", element['videoAccessUrl'])
    });
}
