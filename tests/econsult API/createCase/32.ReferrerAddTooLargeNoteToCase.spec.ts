import {test, expect, request} from "@playwright/test"
import {setReport, loadEnv } from "../../../helper/functions";
import {createHIALToken, ResponseValidation} from "../../../helper/APIfunctions";
import { Day } from '../../../helper/functions';
loadEnv('econsult_API_staging')
let apiContext; 
let regexMatchAll: RegExp = /(.*?)/;
const consultantId="practitioner/"+process.env.practitionerId
test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,

    });
})
test.describe('32.Referrer add a note  too large to existing case', ()=> {

    var caseId; 
    test('Create case', async() => {
        setReport('econsult API', 'CreateCase')
        let date=new Day()
        const currentDate=date.caformatDate
        console.log(currentDate)
        const searchSpecialty=process.env.keywordSpec
        //consultantId is hardcoded; if the calcuation is needed execute SearchByNameAndSpeciality as a subtest before CreateCase
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
        const res = await apiContext.post(`${process.env.baseURL}/referralRequest`, {
            data: {"resourceType": "ReferralRequest",
            "meta": {
              "security": [
                {
                  "extension": {
                    "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/limited_patient_consent_note",
                    "valueString": "claudiu limited consent input"
                  },
                  "system": "http://hl7.org/fhir/v3/ActCode",
                  "code": "CPLYCD",
                  "display": "comply with consent directive"
                }
              ]
            },
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
                  "family": "Catone",
                  "given": "Magda"
                },
                "gender": "male",
                "birthDate": "2001-01-01"
              },
              {
                "resourceType": "Composition",
                "id": "1",
                "text": "this is a note example"
              }
            ],
            "extension": [
              {
                "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/tag",
                "valueString": "EncounterID=45345435",
                "_comment": "tag example"
              },
              {
                "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/tag",
                "valueString": "MRN=1234567",
                "_comment": "another tag example"
              },
              {
                "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/eConsult_title",
                "valueString": "econsult title example one"
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
        caseId=body['id']
        console.log(caseId)
        //const expected = {  }
        //console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(200)
        
        })  
        test('32.Referrer add a note too large to the case', async({}) => {
            setReport('econsult API', 'CreateCase')
            const referrerUserl=createHIALToken(process.env.referrerUser)
            console.log(referrerUserl)
            const path=`${process.env.baseURL}/referralRequest/`+caseId+'/composition'
            console.log('Path is: '+path)
            
            const res = await apiContext.post(`${process.env.baseURL}/referralRequest/`+caseId+'/composition', {
                data: {
                  "resourceType": "composition",
                 "text": "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",
                  "extension": [
                    {
                      "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/econsult_note_state",
                      "valueString": "Submitted"
                    },
                    {
                      "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/note_author_role",
                      "valueString": "Referrer"
                    }
                  ],
                  "date": "2015-12-12",
                  "author": {
                    "reference": "practitioner/@self"
                  }
                },
                headers: { "Authorization": referrerUserl},
                            
            })
            console.log(res)
            const body = await res.json()
            console.log(body)
           
            expect(res.status()).toEqual(400)
            const expected = {
              "resourceType": "OperationOutcome",
              "issue": [
                {
                  "severity": "error",
                  "details": {
                    "coding": {
                      "system": "https://ehealthontario.ca/API/FHIR/NamingSystem/eConsult/1/eConsultErrors",
                      "code": "R_FIELD_EXCEEDS_LIMIT",
                      "display": "field exceeds limit"
                    }
                  },
                  "diagnostics": "Error creating new Note:Composition 'text' length is over allowed limit: 10000 > 4000"
                }
              ]
            }
            console.log("-=Response Validation=-", ResponseValidation(expected,body)) 
                   })  
        test.afterAll(async ({ }) => {
            // Dispose all responses.
            await apiContext.dispose();
        });
    })

    
