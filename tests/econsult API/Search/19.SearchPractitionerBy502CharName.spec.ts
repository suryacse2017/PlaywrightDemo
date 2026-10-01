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
   
    test('19. Search practitioner by name with more than 500 characters', async({}) => {
        setReport('econsult API', 'Search')
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
        const name=process.env.longName
        
const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"name": name}
            
                
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
                  "code": "R_FIELD_EXCEEDS_LIMIT",
                  "display": "field exceeds limit"
                }
              },
              "diagnostics": "last name length is over max limit, 501 > 500"
            }
          ]
        }
          
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(400)
        
        })  
   

    
