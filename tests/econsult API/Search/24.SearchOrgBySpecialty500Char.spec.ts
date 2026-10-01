import {test, expect, request} from "@playwright/test"
import {setReport, loadEnv } from "../../../helper/functions";
import {createHIALToken, ResponseValidation} from "../../../helper/APIfunctions";
loadEnv('econsult_API_staging')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;

test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,

    });
})
   
    test('23. Search Organization by  one char specialty', async({}) => {
        setReport('econsult API', 'Search')
     
        const searchSpecialty=process.env.longName
        console.log(searchSpecialty)
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        const res = await apiContext.get(`${process.env.baseURL}/organizations`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"specialty": searchSpecialty,
                    "_summary": true
                    }
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        console.log(body.total)
        const expected = {
            "resourceType": "OperationOutcome",
            "issue": [
              {
                "severity": "error",
                "details": {
                  "coding": {
                    "system": "https://ehealthontario.ca/API/FHIR/NamingSystem/eConsult/1/eConsultErrors",
                    "code": "R_FIELD_EXCEEDS_LIMIT",
                    "display": "field exceeds limit"
                  }
                },
                "diagnostics": "specialty length is over max limit, 501 > 500"
              }
            ]
          }   
        expect(res.status()).toEqual(400)
        console.log("-=Response Validation=-", ResponseValidation(expected,body))

        })  
   

    
