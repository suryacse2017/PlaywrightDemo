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



test('89. CVVR-13 Create VVR with tac not on the list', async()=>{
    setReport('Video API', 'CVVR')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {
            "state": "active",
            "tac": "blurb",
            "type": "Clinical",
            "expiryDate": "2016-11-28T10:00:01"
        },
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
        "details": "invalid TAC value:blurb, valid TAC values:[Allergy, Cardiology, CardiovascularSurgery, Dentistry, Dermatology, EmergencyTelemedicine, Endocrinology, Ent, GastroEnterology, GeneralSurgery, Genetics, Gynaecology, Hematology, Immunology, InfectiousDiseases, MentalHealth, Nephrology, Neurology, Neurosurgery, Newborn, Obstetrics, Oncology, Ophthalmology, OralSurgery, OrthopaedicSurgery, PalliativeCare, PhysicalMedicineAndRehabilitation, PlasticSurgery, Podiatry, PrimaryCare, Respirology, Rheumatology, ThoracicSurgery, TransplantSurgery, Urology, Other]",
        "version": "1.0.8",
        "validation": []
      }
    
    console.log("-=Response Validation=-", ResponseValidation(expected,body))
    // expect(body).toEqual(expected)
    expect(res.status()).toEqual(400)
})




test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
    
});