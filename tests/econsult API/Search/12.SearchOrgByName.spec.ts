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
   
    test('12. Search Organization by name', async({}) => {
        setReport('econsult API', 'Search')
     
        const searchName=process.env.testSearchOrgName
        console.log(searchName)
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        const res = await apiContext.get(`${process.env.baseURL}/organizations`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"name": searchName,
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
   

    
