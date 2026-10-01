import {test, expect} from "@playwright/test"
import {setReport, loadEnv } from "../../helper/functions";
import {generateSignature, ResponseValidation, getOffsetDate, getOffsetTime} from "../../helper/APIfunctions"
loadEnv('AWS_Staging_PEXIP')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;
let expireDATE: String = `${getOffsetDate(2)}T${getOffsetTime(0)}`
// let signature;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });
})

test.describe('Clean remaining VVR', ()=> {
    var vvrId;
    
    test.skip('111. Get all VVRs for the user with curent apikey to delete', async() => {
        // setReport('Video API', 'GVVR')
        const d = new Date()
        let signature = generateSignature("GET", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.get(`/${process.env.relURL}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
       
        expect(res.status()).toEqual(200)
        const expected = []
      
       if (body===expected)
        {  vvrId=0;
        console.log("-=Body=-")
        console.log(body) 
        console.log(vvrId)
       }
       
       else {
             console.log("-=Body=-")
            console.log(body) 
            vvrId = body[0]['id']
            console.log ("==id==")
            console.log(vvrId)
        }
    })
  
   test.skip('132. DVVR04 - Delete the VVR identified by a valid id', async()=>{
        if (!(vvrId===0))
        {
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.text()
        console.log("-=Body=-")
        console.log(body)
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)
        }
    })

    test.afterAll(async () => {
        setReport('Video API', 'DVVR')
    });
})


test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});


