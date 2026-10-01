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
   
    test('8. Search practitioner by name and specialty', async({}) => {
        setReport('econsult API', 'CreateCase')
     
        const searchSpecialty=process.env.keywordSpec
        const consultantName=process.env.searchConsultant
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"name":consultantName,
                    "specialty": searchSpecialty}
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const consultantId=body.entry[0]['resource']['id']
        console.log(consultantId)
        const specialty=body.entry[0]['resource']['practitionerRole']['specialty'][0]['coding']['display']
        console.log("Specialty: "+specialty)
        const familyName=body.entry[0]['resource']['name']['family']
        console.log('family name:'+familyName)
        //const expected = {  }
        //console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)
        //check the specialty and name of the found practitioner are right
        expect(specialty).toContain(searchSpecialty)
        expect(familyName).toEqual(consultantName)
        expect(body.total).toEqual(1)
        })  
   

    
