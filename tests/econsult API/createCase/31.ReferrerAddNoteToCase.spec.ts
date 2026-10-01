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
test.describe('Referrer add a note to existing case', ()=> {

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
        test('31.Referrer add a note to the case just created', async({}) => {
            setReport('econsult API', 'CreateCase')
            const referrerUserl=createHIALToken(process.env.referrerUser)
            console.log(referrerUserl)
            const path=`${process.env.baseURL}/referralRequest/`+caseId+'/composition'
            console.log('Path is: '+path)
            
            const res = await apiContext.post(`${process.env.baseURL}/referralRequest/`+caseId+'/composition', {
                data: {
                  "resourceType": "composition",
                  "text": "Forgotten tidbit of knowledge",
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
           
            expect(res.status()).toEqual(200)
            const expected = {
              "resourceType": "OperationOutcome",
              "id": regexMatchAll,
              "issue": []
            }  
            console.log("-=Response Validation=-", ResponseValidation(expected,body)) 
                   })  
        test.afterAll(async ({ }) => {
            // Dispose all responses.
            await apiContext.dispose();
        });
    })

    
