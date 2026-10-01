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
   
    test('7. Search practitioner by specialty', async({}) => {
        setReport('econsult API', 'Search')
     
        const searchSpecialty=process.env.keywordSpec
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"specialty": searchSpecialty}
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const specialty=body.entry[0]['resource']['practitionerRole']['specialty'][0]['coding']['display']
        console.log("Specialty: "+specialty)
        //const expected = {  }
        //console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)
        //check the specaily of the found practitioner is right
        expect(specialty).toContain(searchSpecialty)
        })  
   

    
