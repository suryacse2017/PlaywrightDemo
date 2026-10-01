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
test.describe('36.Referrer closes case after it is created', ()=> {
//Referrer creates case, consultant answers and then referrer closes the case
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
        test('35.Consultant provides answer with tag', async({}) => {
          setReport('econsult API', 'CreateCase')
          const consultantUserl=createHIALToken(process.env.consultantUser)
          console.log(consultantUserl)
          
          const res = await apiContext.post(`${process.env.baseURL}/referralRequest/`+caseId+'/composition', {
              data: {
                "resourceType": "composition",
                "text": "Consultant Provides Consult",
                "extension": [
                  {
                    "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/econsult_note_state",
                    "valueString": "Consult Provided"
                  },
                  {
                    "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/tag",
                    "valueString": "Tag1=ABC",
                    "_comment": "tag example"
                  },
                  {
                    "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/KPI",
                    "extension": [
                      {
                        "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/KPI_question",
                        "valueString": "Time Spent In Minutes"
                      },
                      {
                        "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/KPI_answer",
                        "valueInt": 20
                      },
                      {
                        "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/KPI_comment",
                        "valueString": "I spent 20 minutes on this econsult"
                      }
                    ]
                  }
                ],
                "date": "2018-04-12",
                "author": {
                  "reference": "practitioner/@self"
                }
              },
              headers: { "Authorization": consultantUserl},
                          
          })
          console.log(res)
          const body = await res.json()
          console.log(body)
          expect(res.status()).toEqual(200)
          const expected={
            
              "resourceType": "OperationOutcome",
              "id": regexMatchAll,
              "issue": []
            
          }
          console.log("-=Response Validation=-", ResponseValidation(expected,body)) 
          })  
        test('36.Referrer closes case', async({}) => {
            setReport('econsult API', 'CreateCase')
            const referrerUserl=createHIALToken(process.env.referrerUser)
            console.log(referrerUserl)
            
            const res = await apiContext.post(`${process.env.baseURL}/referralRequest/`+caseId+'/composition', {
                data: {
                  
                    "resourceType": "composition",
                    "text": "TEST - Referrer Completes Case",
                    "extension": [
                      {
                        "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/econsult_note_state",
                        "valueString": "Completed"
                      },
                      {
                        "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/KPI",
                        "extension": [
                          {
                            "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/KPI_question",
                            "valueString": "Did eConsult help you avoid referring the patient to be seen directly by a specialist, either virtually or in-person ?"
                          },
                          {
                            "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/KPI_answer",
                            "valueBoolean": true
                          },
                          {
                            "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/KPI_comment",
                            "valueString": "TESTING - comments about why referral was required or not"
                          }
                        ]
                      }
                    ],
                    "date": "2018-04-30",
                    "author": {
                      "reference": "practitioner/@self"
                    
                  }
                },
                headers: { "Authorization": referrerUserl},
                            
            })
            console.log(res)
            const body = await res.json()
            
            expect(res.status()).toEqual(200)
           
            })  
        test.afterAll(async ({ }) => {
            // Dispose all responses.
            await apiContext.dispose();
        });
    })

    
