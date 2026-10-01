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
test.describe('51.Upload file in econsult', ()=> { 
    var uploadURL  

    test('Get a document for upload', async({}) => {
        setReport('econsult API', 'CreateCase')
        const searchName=process.env.testSearchOrgName
        console.log(searchName)
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        const res = await apiContext.post(`${process.env.baseURL}/documents/`, {
            data: {
                "fileName": "fileName.docx"
              },
            headers: { "Authorization": referrerUserl,
                        "Content-Type":'application/json'
                    },
           
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        uploadURL=body.url
        console.log("URL: "+uploadURL)
        const expected = {
            "url": regexMatchAll,
            "expiresInSec": 60
          }          
        expect(res.status()).toEqual(200)
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        })  

        test('51.Uploads a valid file into eConsult', async({}) => {
            setReport('econsult API', 'CreateCase')
         
            const searchName=process.env.testSearchOrgName
            console.log(searchName)
            const referrerUserl=createHIALToken(process.env.referrerUser)
            console.log(referrerUserl)
            const fileContent='--------------------------b2dc5f49fa4a7a62'+'Content-Disposition: form-data; name="file"; filename="sample TextFile.txt"'+'Content-Type: text/plain'+'test file blabla'+'--------------------------b2dc5f49fa4a7a62'
           
            const res = await apiContext.post(uploadURL, {
                data:fileContent,
                headers: {"Authorization": referrerUserl,
                    "Content-Type":'text/plain'
                        },
                    params:{ "fileName": "fileName.docx"}
             })
                                
            console.log(res)
            const body = await res.json()
            console.log(body)
            const expected = {
                
              }          
            expect(res.status()).toEqual(200)
           // console.log("-=Response Validation=-", ResponseValidation(expected,body))
    
            })  

            test.afterAll(async ({ }) => {
                // Dispose all responses.
                await apiContext.dispose();
            });           

})

    
