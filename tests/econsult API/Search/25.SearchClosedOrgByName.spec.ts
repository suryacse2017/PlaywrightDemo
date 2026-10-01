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
   
    test('25. Search Closed Organization by name', async({}) => {
        setReport('econsult API', 'Search')
     
        const searchName=process.env.searchClosedOrganization
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
        const expected = {
            "resourceType": "Bundle",
            "type": "searchset",
            "total": 0,
            "link": [
                {
                "relation": "self",
                "url": "http://internal-dev-C-MtSer-EOHGBTMDFVGC-393432251.ca-central-1.elb.amazonaws.com/hub/v1//organizations?name=Mei_SG1119_closed&_summary=true"
                }
                ]
         }         
        expect(res.status()).toEqual(200)
        console.log("-=Response Validation=-", ResponseValidation(expected,body))

        })  
   

    
