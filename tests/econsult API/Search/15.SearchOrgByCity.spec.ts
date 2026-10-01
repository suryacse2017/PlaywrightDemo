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
   
    test('15. Search Organization by city - not available', async({}) => {
        setReport('econsult API', 'Search')
     
        const searchCity=process.env.testSearchCity
        console.log(searchCity)
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        const res = await apiContext.get(`${process.env.baseURL}/organizations`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params:{"city": searchCity,
                    
                    }
            
                
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
                    "code": "R_SEARCH_CRITERIA_NOT_SUPPORTED",
                    "display": "Search criteria not supported"
                  }
                },
                "diagnostics": "search parameter not supported:city"
              }
            ]
          }

        expect(res.status()).toEqual(400)
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        

        })  
   

    
