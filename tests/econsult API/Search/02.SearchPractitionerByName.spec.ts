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
   
    test('2. Search practitioner by name', async({}) => {
        setReport('econsult API', 'Search')
     
        const testSearchNamel= process.env.testSearchName
        const testSearchName2l=process.env.testSearchName2
        const referrerUserl=createHIALToken(process.env.referrerUser)
        console.log(referrerUserl)
       
        //const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
const res = await apiContext.get(`${process.env.baseURL}/practitioners`, {
            data: {},
            headers: { "Authorization": referrerUserl},
            params: {"name": testSearchNamel}
            
                
        })
        console.log(res)
        const body = await res.json()
        console.log(body)
        const expected = {
            "resourceType": "Bundle",
            "type": "searchset",
            "total": 2,
            "link": [
              {
                "relation": "self",
                "url": "http://internal-dev-C-MtSer-EOHGBTMDFVGC-393432251.ca-central-1.elb.amazonaws.com/hub/v1/practitioners?name=Ven"
              }
            ],
            "entry": [
              {
                "fullUrl": "http://internal-dev-C-MtSer-EOHGBTMDFVGC-393432251.ca-central-1.elb.amazonaws.com/hub/v1/practitioner/999900015850",
                "resource": {
                  "resourceType": "Practitioner",
                  "id": "999900015850",
                  "name": {
                    "prefix": "Dr",
                    "family": "Venone",
                    "given": "Sarsh"
                  },
                  "telecom": {
                    "system": "phone"
                  },
                  "practitionerRole": {
                    "managingOrganization": "Toronto Central CCAC",
                    "specialty": [
                      {
                        "coding": {
                          "system": "2.16.840.1.113883.6.96",
                          "code": "394814009",
                          "display": "Cardiology"
                        }
                      }
                    ]
                  },
                  "extension": [
                    {
                      "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/services",
                      "valueCoding": {
                        "system": "https://www.ehealthontario.ca/API/FHIR/ValueSet/eConsult/1/eConsultServices",
                        "code": "ECONSULT"
                      }
                    },
                    {
                      "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/is_primary_office_location",
                      "valueAddress": {
                        "line": "Toronto",
                        "city": "Toronto"
                      }
                    },
                    {
                      "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/practitioner_homepage",
                      "valueString": "https://directory.otn.ca/#/profile/people/27830614"
                    }
                  ]
                }
              },
              {
                "fullUrl": "http://internal-dev-C-MtSer-EOHGBTMDFVGC-393432251.ca-central-1.elb.amazonaws.com/hub/v1/practitioner/26061634",
                "resource": {
                  "resourceType": "Practitioner",
                  "id": "26061634",
                  "name": {
                    "prefix": "Dr.",
                    "family": "Battle-Ventura",
                    "given": "Sara"
                  },
                  "telecom": {
                    "system": "phone",
                    "value": "4164464110x4189"
                  },
                  "practitionerRole": {
                    "managingOrganization": "OTN",
                    "specialty": [
                      {
                        "coding": {
                          "system": "2.16.840.1.113883.6.96",
                          "code": "394814009",
                          "display": "Cardiology"
                        }
                      }
                    ]
                  },
                  "extension": [
                    {
                      "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/services",
                      "valueCoding": {
                        "system": "https://www.ehealthontario.ca/API/FHIR/ValueSet/eConsult/1/eConsultServices",
                        "code": "ECONSULT"
                      }
                    },
                    {
                      "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/is_primary_office_location",
                      "valueAddress": {
                        "line": "105 Moathfield Dr. Toronto",
                        "city": "Toronto"
                      }
                    },
                    {
                      "url": "https://www.ehealthontario.ca/API/FHIR/StructureDefinition/eConsult/1/extension/practitioner_homepage",
                      "valueString": "https://directory.otn.ca/#/profile/people/2797818"
                    }
                  ]
                }
              }
            ]
          }
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        //there is a correct response to the request
        expect(res.status()).toEqual(200)
        // at least a name that fit criteria is found
        const familyName=body.entry[0]['resource']['name']['family']
        const givenName=body.entry[0]['resource']['name']['given']
        console.log('family name:'+familyName)
        console.log('givenName:' + givenName)
        expect(familyName).toContain(testSearchNamel)
        expect(givenName).toContain(testSearchName2l)
        })  
   

    
