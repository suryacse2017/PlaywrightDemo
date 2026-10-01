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
   
    test('6. Search practitioner by name - COPY OTC-476', async({}) => {
        setReport('econsult API', 'Search')
     
        const searchChar='cHf'
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"keyword": searchChar}
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const expected = {  }
        //console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)

        })  
   

    
