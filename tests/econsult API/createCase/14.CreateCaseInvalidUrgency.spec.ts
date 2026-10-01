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
test.describe('14.Cannot create a Case with an invalid urgency', ()=> {

    test('14.Create a Case with an invalid urgency', async() => {
        setReport('econsult API', 'CreateCase')
        let date=new Day()
        const currentDate=date.caformatDate
        console.log(currentDate)
        const searchSpecialty=process.env.keywordSpec
        //consultantId is hardcoded; if the calcuation is needed execute SearchByNameAndSpeciality as a subtest before CreateCase
        const consultantId="practitioner/"+process.env.practitionerId
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
                        }
                      ]
                    }
                  ],
                  "name": {
                    "family": "smith",
                    "given": "john"
                  },
                  "gender": "M",
                  "birthDate": "1980-01-01"
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
              "date": "Tue Jul 26 16:50:35 EDT 2016",
              "priority": {
                "coding": {
                  "system": "2.16.840.1.113883.6.96",
                  "code": "394848808080",
                  "display": "TESTING"
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
                "reference": "practitioner/{{consultantId}}",
                "_comment": "this is the recipient"
              },
              "description": "I like it",
              "serviceRequested": {
                "coding": {
                  "system": "2.16.840.1.113883.6.96",
                  "code": "394848005",
                  "display": "Consultation"
                }
              },
              "supportingInformation": [
                {
                  "reference": {
                    "reference": "contained/composition/1",
                    "_comment": "this is the attachment"
                  },
                  "display": "attachment"
                }
              ]
            },
            headers: { "Authorization": referrerUserl,
                       
                    },
                    
         })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const expected = {
          "resourceType": "OperationOutcome",
          "issue": [
            {
              "severity": "error",
              "details": {
                "coding": {
                  "system": "https://ehealthontario.ca/API/FHIR/NamingSystem/eConsult/1/eConsultErrors",
                  "code": "R_VALIDATION_ERROR",
                  "display": "Validation error"
                }
              },
              "diagnostics": "java.lang.IllegalStateException: Expected a string but was BEGIN_OBJECT at line 1 column 1741 path $.supportingInformation[0].reference"
            }
          ]
        }
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(400)
        
        })  
 
        test.afterAll(async ({ }) => {
            // Dispose all responses.
            await apiContext.dispose();
        });
    })

    
