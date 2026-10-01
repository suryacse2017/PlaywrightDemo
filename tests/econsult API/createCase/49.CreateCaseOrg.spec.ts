import {test, expect, request} from "@playwright/test"
import {setReport, loadEnv } from "../../../helper/functions";
import {createHIALToken, ResponseValidation} from "../../../helper/APIfunctions";
import { Day } from '../../../helper/functions';
loadEnv('econsult_API_staging')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;

test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,

    });
})
test.describe('49.Create case for a org', ()=> {  
    var consultantId
    test('Search Organization by name', async({}) => {
        setReport('econsult API', 'CreateCase')
   
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
        expect(body.total).toEqual(1)
        consultantId= "organization/"+body.entry[0]['resource']['id']
        
    })  
    test('Create case with org', async() => {
        setReport('econsult API', 'CreateCase')
        let date=new Day()
        const currentDate=date.caformatDate
        console.log(currentDate)
        const searchSpecialty=process.env.keywordSpec
        //consultantId is hardcoded; if the calcuation is needed execute SearchByNameAndSpeciality as a subtest before CreateCase
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
       
        const res = await apiContext.post(`${process.env.baseURL}/referralRequest`, {
            data: {
                "resourceType": "ReferralRequest",
                "contained": [
                  {
                    "resourceType": "Patient",
                    "id": "1",
                    "contained": [
                      {
                        "resourceType": "Coverage",
                        "text": "OHIP",
                        "extension": [
                          {
                            "url": "www.ehealthontario.on.ca/FHIR2/StructureDefinition/extensions/OHIP_version_code",
                            "valueString": "22"
                          },
                          {
                            "url": "2.16.840.1.113883.4.59",
                            "valueString": "2222222222"
                          }
                        ]
                      }
                    ],
                    "name": {
                      "family": "NeedsAnOrg",
                      "given": "Bigman"
                    },
                    "gender": "male",
                    "birthDate": "2001-01-01"
                  },
                  {
                    "resourceType": "Composition",
                    "id": "1",
                    "text": "This patient needs a whole org"
                  }
                ],
                "extension": [
                  {
                    "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/eConsult_title",
                    "valueString": "org required for this guy"
                  }
                ],
                "date": currentDate,
                "priority": {
                  "coding": {
                    "system": "2.16.840.1.113883.6.96",
                    "code": "394848005",
                    "display": "ROUTINE"
                  }
                },
                "patient": {
                  "reference": "contained/patient/1",
                  "_comment": "this is the patient"
                },
                "requester": {
                  "reference": "practitioner/@self",
                  "_comment": "this is the requester"
                },
                "recipient": {
                  "reference": consultantId,
                  "_comment": "this is the recipient"
                },
                "description": "I like it",
                "serviceRequested": {
                  "coding": {
                    "system": "2.16.840.1.113883.6.96",
                    "code": "11429006",
                    "display": "Consultation"
                  }
                },
                "supportingInformation": [
                  {
                    "reference": "contained/composition/1",
                    "_comment": "this is the attachment",
                    "display": "attachment"
                  }
                ]
              
          },
            headers: { "Authorization": referrerUserl,
                       "Content-Type": 'application/fire+json'
                    },
            
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const caseId=body['id']
        console.log(caseId)
        //const expected = {  }
        //console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)
        
        })  
    
    test.afterAll(async ({ }) => {
        // Dispose all responses.
        await apiContext.dispose();
    });
})
    
