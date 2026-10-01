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
   
    test('18. Search practitioner by name with 0 characters', async({}) => {
        setReport('econsult API', 'Search')
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"name": ''}
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const expected = {
          
            "resourceType": "OperationOutcome",
            "issue": [
              {
                "severity": "error",
                "details": {
                  "coding": {
                    "system": "https://ehealthontario.ca/API/FHIR/NamingSystem/eConsult/1/eConsultErrors",
                    "code": "R_LASTNAME_TOO_SHORT",
                    "display": "Last Name is less than two characters"
                  }
                },
                "diagnostics": "name is less than 2 characters"
              }
            ]
          }
          
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(400)
        
        })  
   

    
