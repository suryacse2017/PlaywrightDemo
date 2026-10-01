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
   
    test('10. Search Organization by keyword', async({}) => {
        setReport('econsult API', 'Search')
     
        const searchKeyword=process.env.testSearchOrgKeyword
        console.log(searchKeyword)
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
const res = await apiContext.get(`${process.env.baseURL}/organizations`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"keyword": searchKeyword,
                     "_summary": true
                    }
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        console.log(body.total)
        //const expected = {}          
        expect(res.status()).toEqual(200)
        expect(body.total).toBeGreaterThan(0)

        })  
   

    
