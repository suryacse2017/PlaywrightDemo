import {test, expect} from "@playwright/test"
import {setReport, loadEnv } from "../../../helper/functions";
import {createHIALToken, ResponseValidation} from "../../../helper/APIfunctions";
loadEnv('econsult_API_staging')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });
})




    
    test('1. Search without any credentials', async({}) => {
        setReport('econsult API', 'Search')
     
        const testSearchNamel= process.env.testSearchName
        const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data:{},
            headers:{},
            params: {'name': testSearchNamel}
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log('==Body==')
        console.log(body)
        console.log('==Body==')
        const expected = {
            resourceType: 'OperationOutcome',
        issue: [
                {
                severity: 'error',
                "details": {
                    "coding": {
                      "system": "https://ehealthontario.ca/API/FHIR/NamingSystem/eConsult/1/eConsultErrors",
                      "code": "R_USER_NOT_FOUND",
                      "display": "User not found in eConsult"
                    },
                diagnostics: 'Authorization header is empty'
                }
            }
            ]
        }
        //console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(404)

        })  
   

    
