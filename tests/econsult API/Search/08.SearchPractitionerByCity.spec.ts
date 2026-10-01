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
   
    test('8. Search practitioner by city', async({}) => {
        setReport('econsult API', 'Search')
     
        const searchCity=process.env.testSearchCity
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"city": searchCity}
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const city=	body.entry[0]['resource']['extension'][1]['valueAddress']['city']
        console.log('city:'+city)
        //const expected = {  }
        //console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)
        //check that practitioner with the right sity is found
        expect(city).toEqual(searchCity)
        })  
   
        
    
