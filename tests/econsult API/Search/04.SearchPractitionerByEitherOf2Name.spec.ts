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
   
    test('4. Search practitioner by either two name', async({}) => {
        setReport('econsult API', 'Search')
     
        const testSearchNamel= process.env.testSearchName
        const testSearchName2l= process.env.testSearchName2
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {'name':testSearchNamel+','+testSearchName2l}
            
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        //there is a correct response to the request
        expect(res.status()).toEqual(200)
        // at least a name that fit criteria is found
        const familyName=body.entry[0]['resource']['name']['family']
        const givenName=body.entry[0]['resource']['name']['given']
        console.log('family name:'+familyName)
        console.log('givenName:' + givenName)
        expect(familyName).toContain(testSearchNamel)
        expect(givenName).toContain(testSearchName2l)
        })  
   

    
