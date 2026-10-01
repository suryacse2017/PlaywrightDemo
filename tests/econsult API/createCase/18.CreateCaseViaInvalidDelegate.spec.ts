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
test.describe('18.Cannot create a case via  invalid delegate', ()=> {

    test('18.Create a Case via invalid delegate', async() => {
        setReport('econsult API', 'CreateCase')
        let date=new Day()
        const currentDate=date.caformatDate
        console.log(currentDate)
        const searchSpecialty=process.env.keywordSpec
        //consultantId is hardcoded; if the calcuation is needed execute SearchByNameAndSpeciality as a subtest before CreateCase
        const consultantId="practitioner/"+process.env.practitionerId
        const practitionerIdl=process.env.practitionerId
        const invalidDelegaltorIdl=process.env.invalidDelegaltorId
        const referrerUserId1="practitioner/@delegator/"+process.env.invalidDelegatorUserId
        const referrerUserId2="consult requested for "+process.env.reffererUserId
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log("delegate "+process.env.referrerUser)
        console.log("token " +referrerUserl)
        console.log("referrerUserId= " +referrerUserId1)
        const diagnostics="Current User: "+invalidDelegaltorIdl+" is not a Delegate for REFERRER:"+practitionerIdl
       
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
                    "family": "doe",
                    "given": "john"
                  },
                  "gender": "M",
                  "birthDate": "2001-01-01"
                },
                {
                  "resourceType": "Composition",
                  "id": "1",
                  "text": "this was created by a delegate"
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
                "_comment": "this is the patient"
              },
              "extension": [
                {
                  "url": "https://ehealthontario.on.ca/eConsult/FHIR2/StructureDefinition/extensions/eConsult_title",
                  "valueString": referrerUserId2
                }
              ],
              "requester": {
                "reference": referrerUserId1,
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
                  "code": "394848005",
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
                       
                    },
                    
         })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const reason=body.issue[0]['details']['coding']['code']
        const expected = {
          "resourceType": "OperationOutcome",
          "issue": [
            {
              "severity": "error",
              "details": {
                "coding": {
                  "system": "https://ehealthontario.ca/API/FHIR/NamingSystem/eConsult/1/eConsultErrors",
                  "code": "R_USER_INSUFFICIENT_PERMISSIONS",
                  "display": "User does not have permission to invoke this API"
                }
              },
              "diagnostics": diagnostics
            }
          ]
        }
        

        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        expect(res.status()).toEqual(403)
        expect(reason).toEqual('R_USER_INSUFFICIENT_PERMISSIONS')
        
        })  
 
        test.afterAll(async ({ }) => {
            // Dispose all responses.
            await apiContext.dispose();
        });
    })

    
