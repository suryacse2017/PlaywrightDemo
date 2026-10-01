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
test.describe('22and27.Create a Case with non-Latin characters and check it was created', ()=> {

    var caseId; 
    test('22.Create a Case with non-Latin characters', async() => {
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
                          "valueString": "9876543217"
                        }
                      ]
                    }
                  ],
                  "name": {
                    "family": "یک بیمار (non-latin lastname)",
                    "given": "یک بیمار (non-latin firstname)"
                  },
                  "gender": "male",
                  "birthDate": "2001-01-01"
                },
                {
                  "resourceType": "Composition",
                  "id": "1",
                  "text": "一个不错的注意事项 (non-latin note)"
                }
              ],
              "extension": [
                {
                  "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/tag",
                  "valueString": "EncounterID=45345435",
                  "_comment": "یک بیمار"
                },
                {
                  "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/tag",
                  "valueString": "MRN=1234567",
                  "_comment": "یک بیمار"
                },
                {
                  "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/eConsult_title",
                  "valueString": "یک بیمار (non-latin title)"
                }
              ],
              "date": "Tue Jul 26 16:50:35 EDT 2016",
              "priority": {
                "coding": {
                  "system": "2.16.840.1.113883.6.96",
                  "code": "394848005",
                  "display": "ROUTINE"
                }
              },
              "patient": {
                "reference": "contained/patient/1",
                "_comment": "یک بیمار"
              },
              "requester": {
                "reference": "practitioner/@self",
                "_comment": "یک بیمار"
              },
              "recipient": {
                "reference": consultantId,
                "_comment": "this is the recipient"
              },
              "description": "一个不错的注意事项 (non-latin note)",
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
        test('27 Check the case exists', async({}) => {
            setReport('econsult API', 'CreateCase')
            const referrerUserl=createHIALToken(process.env.referrerUser)
            console.log(referrerUserl)
            
            const res = await apiContext.get(`${process.env.baseURL}/referralRequest/`+caseId, {
                data: {},
                headers: { "Authorization": referrerUserl},
                            
            })
            console.log(res)
            const body = await res.json()
            console.log(body)
            console.log(body['id'])
            expect(res.status()).toEqual(200)
           expect(body['id']).toEqual(caseId)
            })  
        test.afterAll(async ({ }) => {
            // Dispose all responses.
            await apiContext.dispose();
        });
    })

    
