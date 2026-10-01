import { APIResponse } from "@playwright/test";

export const resources =
{
  AppCatalog: "app/4c3d29a2-34a4-48cd-8ac4-a37ce2d1dc04",
  AppCatalog2: "apps",
  baseURL:"https://onecatalogue-local.awsdevotn.ca/",
};

export async function fabricatedToken(programType:any)
 {
    let fabToken: any;
    let payload:any;
    // Define the payload as a JSON string
    if(programType!="scope")
    {
      payload = JSON.stringify(
        {
          
          "auditTrackingId": "UUID1234567890",
          "scope": "HealthcareService.allowed Practitioner.allowed system/PHSD.Export system/PHSD.Import HealthcareService.allowed%3Fprogram%3D"+programType+"",
          "uao": "urn:ehealth:rid: 1.2.3.45:1234",
          "uaoName": "Ontario Telemedicine Network",
          "expires_in": 900
          
       }
       //"scope": ""+operationType+""+".allowed system/PHSD.Export system/PHSD.Import HealthcareService.allowed%3Fprogram%3D"+programType+"",
       );
    }
    else
    {
      payload = JSON.stringify(
        {
          
          "auditTrackingId": "UUID1234567890",
          "scope": "HealthcareService.allowed Practitioner.allowed system/PHSD.Import HealthcareService.allowed%3Fprogram%3DConnex",
          "uao": "urn:ehealth:rid: 1.2.3.45:1234",
          "uaoName": "Ontario Telemedicine Network",
          "expires_in": 900
          
       }
       );
    }
   
    // Convert string to Base64
    function toBase64(str:any) 
    {
      return Buffer.from(str).toString('base64');
    }
    // Encode to Base64
    const jwtToken = toBase64(payload);
    // Store in Postman environment
    fabToken = jwtToken;
    //pm.environment.set("jwtToken", jwtToken);
   // console.log("Base64 Encoded Token:", fabToken);
    return fabToken;

}


type ApiLogOptions = {
  method: any;
  url: any;
  fetchHeaders?: Record<string, string>;
  body?: any;
  response: any;
};

type AppCatalogLogOptions = {
  method: any;
  url: any;
  headers:any,
  body?: any;
  response: any;
};


export async function logApiCall({ method, url, fetchHeaders, body, response }: ApiLogOptions) {
  console.log('==================== API CALL ====================');
  console.log(`→ Method: ${method}`);
  console.log(`→ URL: ${url}`);
  if (fetchHeaders) console.log(`→ Headers: ${JSON.stringify(fetchHeaders, null, 2)}`);
  if (body) console.log(`→ Body: ${JSON.stringify(body, null, 2)}`);

  console.log(`← Status: ${response.status}`);
  const respBody = await response.text; // Or response.json() if you're sure
  console.log(`← Response Body: ${respBody}`);
  console.log('===================================================');
}

export async function AppCatalogApiCall({ method, url, headers, body, response }: AppCatalogLogOptions) {
  console.log('==================== API CALL ====================');
  console.log(`→ Method: ${method}`);
  console.log(`→ URL: ${url}`);
  if (headers) console.log(`→ Headers: ${JSON.stringify(headers, null, 2)}`);
  if (body) console.log(`→ Body: ${JSON.stringify(body, null, 2)}`);

  console.log(`← Status: ${response.status}`);
  const respBody = await response.text; // Or response.json() if you're sure
  console.log(`← Response Body: ${respBody}`);
  console.log('===================================================');
}










export async function requestBody()
 {
            const requestBody =
            {
              "resourceType": "Bundle",
              "id": "set-context-transaction-bundle-example",
              "meta": {
                "profile": [
                  "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
                ]
              },
              "entry": [
                {
                  "request": {
                    "method": "POST",
                    "url": "Patient"
                  },
                  "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                  "resource": {
                    "resourceType": "Patient",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "name": [
                      {
                        "use": "official",
                        "family": "Smith",
                        "given": [
                          "Jane"
                        ]
                      }
                    ],
                    "gender": "female"
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Encounter"
                  },
                  "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
                  "resource": {
                    "resourceType": "Encounter",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "status": "in-progress",
                    "class": {
                      "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                      "code": "IMP",
                      "display": "inpatient encounter"
                    },
                    "subject": {
                      "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                      "type": "Patient"
                    }
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "PractitionerRole"
                  },
                  "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
                  "resource": {
                    "resourceType": "PractitionerRole",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "active": true,
                    "practitioner": {
                      "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                      "type": "Practitioner"
                    },
                    "organization": {
                      "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                      "type": "Organization"
                    },
                    "location": [
                      {
                        "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                        "type": "Location"
                      }
                    ]
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Practitioner"
                  },
                  "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                  "resource": {
                    "resourceType": "Practitioner",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "name": [
                      {
                        "use": "official",
                        "family": "Jones",
                        "given": [
                          "Julie"
                        ],
                        "suffix": [
                          "MD"
                        ]
                      }
                    ]
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Organization"
                  },
                  "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                  "resource": {
                    "resourceType": "Organization",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "name": "Example Hospital"
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Location"
                  },
                  "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                  "resource": {
                    "resourceType": "Location",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "status": "active",
                    "name": "North Wing",
                    "mode": "instance",
                    "physicalType": {
                      "coding": [
                        {
                          "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                          "code": "wi",
                          "display": "Wing"
                        }
                      ]
                    },
                    "managingOrganization": {
                      "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                      "type": "Organization"
                    }
                  }
                }
              ],
              "type": "batch"
            }
                        return requestBody;
 
}

export async function requestBodySecond()
 {
            const requestBody =
            {
              "resourceType": "Bundle",
              "id": "set-context-transaction-bundle-example",
              "meta": {
                "profile": [
                  "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
                ]
              },
              "entry": [
                {
                  "request": {
                    "method": "POST",
                    "url": "Patient"
                  },
                  "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                  "resource": {
                    "resourceType": "Patient",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "name": [
                      {
                        "use": "official",
                        "family": "Smith",
                        "given": [
                          "Jane"
                        ]
                      }
                    ],
                    "gender": "female"
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Encounter"
                  },
                  "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
                  "resource": {
                    "resourceType": "Encounter",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "status": "in-progress",
                    "class": {
                      "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                      "code": "IMP",
                      "display": "inpatient encounter"
                    },
                    "subject": {
                      "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                      "type": "Patient"
                    }
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "PractitionerRole"
                  },
                  "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
                  "resource": {
                    "resourceType": "PractitionerRole",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "active": true,
                    "practitioner": {
                      "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                      "type": "Practitioner"
                    },
                    "organization": {
                      "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                      "type": "Organization"
                    },
                    "location": [
                      {
                        "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                        "type": "Location"
                      }
                    ]
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Practitioner"
                  },
                  "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                  "resource": {
                    "resourceType": "Practitioner",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "name": [
                      {
                        "use": "official",
                        "family": "Jones",
                        "given": [
                          "Julie"
                        ],
                        "suffix": [
                          "MD"
                        ]
                      }
                    ]
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Organization"
                  },
                  "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                  "resource": {
                    "resourceType": "Organization",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "name": "Example Hospital"
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Location"
                  },
                  "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                  "resource": {
                    "resourceType": "Location",
                    "identifier": [
                      {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                      }
                    ],
                    "status": "active",
                    "name": "North Wing",
                    "mode": "instance",
                    "physicalType": {
                      "coding": [
                        {
                          "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                          "code": "wi",
                          "display": "Wing"
                        }
                      ]
                    },
                    "managingOrganization": {
                      "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                      "type": "Organization"
                    }
                  }
                }
              ],
              "type": "batch"
            };
                        return requestBody;
 
}

export async function requestBodyMedicatnDiagno()
 {
            const requestBody =
            {
              "resourceType": "Bundle",
              "id": "set-context-transaction-bundle-example",
              "meta": {
                  "profile": [
                      "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
                  ]
              },
              "entry": [
                  {
                      "request": {
                          "method": "POST",
                          "url": "Patient"
                      },
                      "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                      "resource": {
                          "resourceType": "Patient",
                          "identifier": [
                              {
                                  "system": "https://infoway-inforoute.ca/fhir/NamingSystem/ca-on-patient-hcn",
                                  "value": "1234567890"
                              }
                          ],
                          "name": [
                              {
                                  "use": "official",
                                  "family": "Smith",
                                  "given": [
                                      "Jane"
                                  ]
                              }
                          ],
                          "gender": "female"
                      }
                  },
                  {
                      "request": {
                          "method": "POST",
                          "url": "Encounter"
                      },
                      "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
                      "resource": {
                          "resourceType": "Encounter",
                          "status": "in-progress",
                          "class": {
                              "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                              "code": "IMP",
                              "display": "inpatient encounter"
                          },
                          "subject": {
                              "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                              "type": "Patient"
                          }
                      }
                  },
                  {
                      "request": {
                          "method": "POST",
                          "url": "PractitionerRole"
                      },
                      "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
                      "resource": {
                          "resourceType": "PractitionerRole",
                          "active": true,
                          "practitioner": {
                              "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                              "type": "Practitioner"
                          },
                          "organization": {
                              "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                              "type": "Organization"
                          },
                          "location": [
                              {
                                  "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                                  "type": "Location"
                              }
                          ]
                      }
                  },
                  {
                      "request": {
                          "method": "POST",
                          "url": "Practitioner"
                      },
                      "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                      "resource": {
                          "resourceType": "Practitioner",
                          "name": [
                              {
                                  "use": "official",
                                  "family": "Jones",
                                  "given": [
                                      "Julie"
                                  ],
                                  "suffix": [
                                      "MD"
                                  ]
                              }
                          ]
                      }
                  },
                  {
                      "request": {
                          "method": "POST",
                          "url": "Organization"
                      },
                      "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                      "resource": {
                          "resourceType": "Organization",
                          "identifier": [
                              {
                                  "system": "SOFA-launchID",
                                  "value": "launchID"
                              }
                          ],
                          "name": "Example Hospital"
                      }
                  },
                  {
                      "request": {
                          "method": "POST",
                          "url": "Location"
                      },
                      "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                      "resource": {
                          "resourceType": "Location",
                          "identifier": [
                              {
                                  "system": "SOFA-launchID",
                                  "value": "launchID"
                              }
                          ],
                          "status": "active",
                          "name": "North Wing",
                          "mode": "instance",
                          "physicalType": {
                              "coding": [
                                  {
                                      "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                                      "code": "wi",
                                      "display": "Wing"
                                  }
                              ]
                          },
                          "managingOrganization": {
                              "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                              "type": "Organization"
                          }
                      }
                  },
                  {
                      "request": {
                          "method": "POST",
                          "url": "Medication"
                      },
                      "fullUrl": "urn:uuid:98765432-10ab-cdef-1234-567890abcdef",
                      "resource": {
                          "resourceType": "Medication",
                          "code": {
                              "coding": [
                                  {
                                      "system": "http://terminology.hl7.org/CodeSystem/hc-CCDD",
                                      "code": "02257149",
                                      "display": "SENSIPAR (cinacalcet (cinacalcet hydrochloride) 60 mg oral tablet) AMGEN CANADA INC"
                                  }
                              ]
                          },
                          "form": {
                              "coding": [
                                  {
                                      "system": "http://snomed.info/sct",
                                      "code": "1163573008",
                                      "display": "Film-coated oral tablet"
                                  }
                              ]
                          }
                      }
                  },
                   {
                                  "request": {
                                      "method": "POST",
                                      "url": "DiagnosticReport"
                                  },
                                  "fullUrl": "urn:uuid:a1b2c3d4-e5f6-4789-8901-234567890abc",
                                  "resource": {
                                      "resourceType": "DiagnosticReport",
                                      "status": "final",
                                      "code": {
                                          "coding": [
                                              {
                                                  "system": "http://loinc.org",
                                                  "code": "12345-6",
                                                  "display": "Example Diagnostic Report"
                                              }
                                          ]
                                      },
                                      "subject": {
                                          "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                                          "type": "Patient"
                                      },
                                      "encounter": {
                                          "reference": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
                                          "type": "Encounter"
                                      },
                                      "issued": "2024-03-18T12:00:00-04:00"
                                  }
                              }
              ],
              "type": "batch"
          }
           
          return requestBody;
 
}

export async function requesNoIdentifierName()
 {
            const requestBody =
            {
              "resourceType": "Bundle",
              "id": "set-context-transaction-bundle-example",
              "meta": {
                "profile": [
                  "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
                ]
              },
              "entry": [
                {
                  "request": {
                    "method": "POST",
                    "url": "Patient"
                  },
                  "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                  "resource": {
                    "resourceType": "Patient",
                    "name": [
                      {
                        "use": "official",
                        "family": "Smith",
                        "given": [
                          "Jane"
                        ]
                      }
                    ],
                    "gender": "female"
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Encounter"
                  },
                  "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
                  "resource": {
                    "resourceType": "Encounter",
                    "status": "in-progress",
                    "class": {
                      "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                      "code": "IMP",
                      "display": "inpatient encounter"
                    },
                    "subject": {
                      "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                      "type": "Patient"
                    }
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "PractitionerRole"
                  },
                  "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
                  "resource": {
                    "resourceType": "PractitionerRole",
                    "active": true,
                    "practitioner": {
                      "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                      "type": "Practitioner"
                    },
                    "organization": {
                      "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                      "type": "Organization"
                    },
                    "location": [
                      {
                        "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                        "type": "Location"
                      }
                    ]
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Practitioner"
                  },
                  "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                  "resource": {
                    "resourceType": "Practitioner",
                    "name": [
                      {
                        "use": "official",
                        "family": "Jones",
                        "given": [
                          ""
                        ],
                        "suffix": [
                          "MD"
                        ]
                      }
                    ]
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Organization"
                  },
                  "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                  "resource": {
                    "resourceType": "Organization",
                    "name": "Example Hospital"
                  }
                },
                {
                  "request": {
                    "method": "POST",
                    "url": "Location"
                  },
                  "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                  "resource": {
                    "resourceType": "Location",
                    "status": "active",
                    "name": "North Wing",
                    "mode": "instance",
                    "physicalType": {
                      "coding": [
                        {
                          "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                          "code": "wi",
                          "display": "Wing"
                        }
                      ]
                    },
                    "managingOrganization": {
                      "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                      "type": "Organization"
                    }
                  }
                }
              ],
              "type": "batch"
            }
           
            return requestBody;
 
}

export async function requestPractionerFail()
 {
            const requestBody =
            {
  "resourceType": "Bundle",
  "id": "set-context-transaction-bundle-example",
  "meta": {
    "profile": [
      "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
    ]
  },
  "entry": [
    {
      "request": {
        "method": "POST",
        "url": "Patient"
      },
      "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
      "resource": {
        "resourceType": "Patient",
        "name": [
          {
            "use": "official",
            "family": "Smith",
            "given": [
              "Jane"
            ]
          }
        ],
        "gender": "female"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Encounter"
      },
      "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
      "resource": {
        "resourceType": "Encounter",
        "status": "in-progress",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "IMP",
          "display": "inpatient encounter"
        },
        "subject": {
          "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
          "type": "Patient"
        }
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "PractitionerRole"
      },
      "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
      "resource": {
        "resourceType": "PractitionerRole",
        "active": true,
        "practitioner": {
          "reference": "",
          "type": "Practitioner"
        },
        "organization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        },
        "location": [
          {
            "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
            "type": "Location"
          }
        ]
      }
    },
  
    {
      "request": {
        "method": "POST",
        "url": "Organization"
      },
      "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
      "resource": {
        "resourceType": "Organization",
        "name": "Example Hospital"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Location"
      },
      "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
      "resource": {
        "resourceType": "Location",
        "status": "active",
        "name": "North Wing",
        "mode": "instance",
        "physicalType": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
              "code": "wi",
              "display": "Wing"
            }
          ]
        },
        "managingOrganization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        }
      }
    }
  ],
  "type": "batch"
}
            return requestBody;
 
}

export async function requestPatientFail()
 {
            const requestBody =
            {
  "resourceType": "Bundle",
  "id": "set-context-transaction-bundle-example",
  "meta": {
    "profile": [
      "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
    ]
  },
  "entry": [
   
    {
      "request": {
        "method": "POST",
        "url": "Encounter"
      },
      "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
      "resource": {
        "resourceType": "Encounter",
        "status": "in-progress",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "IMP",
          "display": "inpatient encounter"
        },
        "subject": {
          "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
          "type": "Patient"
        }
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "PractitionerRole"
      },
      "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
      "resource": {
        "resourceType": "PractitionerRole",
        "active": true,
        "practitioner": {
          "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
          "type": "Practitioner"
        },
        "organization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        },
        "location": [
          {
            "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
            "type": "Location"
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Practitioner"
      },
      "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
      "resource": {
        "resourceType": "Practitioner",
        "name": [
          {
            "use": "official",
            "family": "Jones",
            "given": [
              "Anna"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Organization"
      },
      "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
      "resource": {
        "resourceType": "Organization",
        "name": "Example Hospital"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Location"
      },
      "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
      "resource": {
        "resourceType": "Location",
        "status": "active",
        "name": "North Wing",
        "mode": "instance",
        "physicalType": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
              "code": "wi",
              "display": "Wing"
            }
          ]
        },
        "managingOrganization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        }
      }
    }
  ],
  "type": "batch"
}
           
            return requestBody;
 
}

export async function requestEncounterFail()
 {
            const requestBody ={
  "resourceType": "Bundle",
  "id": "set-context-transaction-bundle-example",
  "meta": {
    "profile": [
      "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
    ]
  },
  "entry": [
    {
      "request": {
        "method": "POST",
        "url": "Patient"
      },
      "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
      "resource": {
        "resourceType": "Patient",
        "name": [
          {
            "use": "official",
            "family": "Smith",
            "given": [
              "Jane"
            ]
          }
        ],
        "gender": "female"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "PractitionerRole"
      },
      "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
      "resource": {
        "resourceType": "PractitionerRole",
        "active": true,
        "practitioner": {
          "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
          "type": "Practitioner"
        },
        "organization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        },
        "location": [
          {
            "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
            "type": "Location"
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Practitioner"
      },
      "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
      "resource": {
        "resourceType": "Practitioner",
        "name": [
          {
            "use": "official",
            "family": "Jones",
            "given": [
              "Anna"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Organization"
      },
      "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
      "resource": {
        "resourceType": "Organization",
        "name": "Example Hospital"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Location"
      },
      "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
      "resource": {
        "resourceType": "Location",
        "status": "active",
        "name": "North Wing",
        "mode": "instance",
        "physicalType": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
              "code": "wi",
              "display": "Wing"
            }
          ]
        },
        "managingOrganization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        }
      }
    }
  ],
  "type": "batch"
}
           
            return requestBody;
 
}
export async function requestLocationFail()
 {
            const requestBody ={
  "resourceType": "Bundle",
  "id": "set-context-transaction-bundle-example",
  "meta": {
    "profile": [
      "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
    ]
  },
  "entry": [
    {
      "request": {
        "method": "POST",
        "url": "Patient"
      },
      "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
      "resource": {
        "resourceType": "Patient",
        "name": [
          {
            "use": "official",
            "family": "Smith",
            "given": [
              "Jane"
            ]
          }
        ],
        "gender": "female"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Encounter"
      },
      "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
      "resource": {
        "resourceType": "Encounter",
        "status": "in-progress",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "IMP",
          "display": "inpatient encounter"
        },
        "subject": {
          "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
          "type": "Patient"
        }
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "PractitionerRole"
      },
      "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
      "resource": {
        "resourceType": "PractitionerRole",
        "active": true,
        "practitioner": {
          "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
          "type": "Practitioner"
        },
        "organization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        },
        "location": [
          {
            "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
            "type": "Location"
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Practitioner"
      },
      "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
      "resource": {
        "resourceType": "Practitioner",
        "name": [
          {
            "use": "official",
            "family": "Jones",
            "given": [
              "Anna"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Organization"
      },
      "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
      "resource": {
        "resourceType": "Organization",
        "name": "Example Hospital"
      }
    }
  ],
  "type": "batch"
}
            return requestBody;
 
}

export async function requestRoleFail()
 {
            const requestBody ={
  "resourceType": "Bundle",
  "id": "set-context-transaction-bundle-example",
  "meta": {
    "profile": [
      "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
    ]
  },
  "entry": [
    {
      "request": {
        "method": "POST",
        "url": "Patient"
      },
      "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
      "resource": {
        "resourceType": "Patient",
        "name": [
          {
            "use": "official",
            "family": "Smith",
            "given": [
              "Jane"
            ]
          }
        ],
        "gender": "female"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Encounter"
      },
      "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
      "resource": {
        "resourceType": "Encounter",
        "status": "in-progress",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "IMP",
          "display": "inpatient encounter"
        },
        "subject": {
          "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
          "type": "Patient"
        }
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Practitioner"
      },
      "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
      "resource": {
        "resourceType": "Practitioner",
        "name": [
          {
            "use": "official",
            "family": "Jones",
            "given": [
              "Anna"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Organization"
      },
      "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
      "resource": {
        "resourceType": "Organization",
        "name": "Example Hospital"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Location"
      },
      "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
      "resource": {
        "resourceType": "Location",
        "status": "active",
        "name": "North Wing",
        "mode": "instance",
        "physicalType": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
              "code": "wi",
              "display": "Wing"
            }
          ]
        },
        "managingOrganization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        }
      }
    }
  ],
  "type": "batch"
}
           
            return requestBody;
 
}

export async function requestOrgFail()
 {
            const requestBody ={
  "resourceType": "Bundle",
  "id": "set-context-transaction-bundle-example",
  "meta": {
    "profile": [
      "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
    ]
  },
  "entry": [
    {
      "request": {
        "method": "POST",
        "url": "Patient"
      },
      "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
      "resource": {
        "resourceType": "Patient",
        "name": [
          {
            "use": "official",
            "family": "Smith",
            "given": [
              "Jane"
            ]
          }
        ],
        "gender": "female"
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Encounter"
      },
      "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
      "resource": {
        "resourceType": "Encounter",
        "status": "in-preogress",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "IMP",
          "display": "inpatient encounter"
        },
        "subject": {
          "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
          "type": "Patient"
        }
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "PractitionerRole"
      },
      "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
      "resource": {
        "resourceType": "PractitionerRole",
        "active": true,
        "practitioner": {
          "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
          "type": "Practitioner"
        },
        "organization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        },
        "location": [
          {
            "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
            "type": "Location"
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Practitioner"
      },
      "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
      "resource": {
        "resourceType": "Practitioner",
        "name": [
          {
            "use": "official",
            "family": "Jones",
            "given": [
              "Anna"
            ],
            "suffix": [
              "MD"
            ]
          }
        ]
      }
    },
    {
      "request": {
        "method": "POST",
        "url": "Location"
      },
      "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
      "resource": {
        "resourceType": "Location",
        "status": "active",
        "name": "North Wing",
        "mode": "instance",
        "physicalType": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
              "code": "wi",
              "display": "Wing"
            }
          ]
        },
        "managingOrganization": {
          "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
          "type": "Organization"
        }
      }
    }
  ],
  "type": "batch"
}
           
            return requestBody;
 
}

export async function requestMedicationFail()
 {
            const requestBody ={
    "resourceType": "Bundle",
    "id": "set-context-transaction-bundle-example",
    "meta": {
        "profile": [
            "http://fhir.infoway-inforoute.ca/io/HALO/StructureDefinition/set-context-transaction-bundle"
        ]
    },
    "entry": [
        {
            "request": {
                "method": "POST",
                "url": "Patient"
            },
            "fullUrl": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
            "resource": {
                "resourceType": "Patient",
                "identifier": [
                    {
                        "system": "https://infoway-inforoute.ca/fhir/NamingSystem/ca-on-patient-hcn",
                        "value": "1234567890"
                    }
                ],
                "name": [
                    {
                        "use": "official",
                        "family": "Smith",
                        "given": [
                            "Jane"
                        ]
                    }
                ],
                "gender": "female"
            }
        },
        {
            "request": {
                "method": "POST",
                "url": "Encounter"
            },
            "fullUrl": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
            "resource": {
                "resourceType": "Encounter",
                "status": "in-progress",
                "class": {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                    "code": "IMP",
                    "display": "inpatient encounter"
                },
                "subject": {
                    "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                    "type": "Patient"
                }
            }
        },
        {
            "request": {
                "method": "POST",
                "url": "PractitionerRole"
            },
            "fullUrl": "urn:uuid:b3b7f021-6566-4be5-a6ec-736bc44fefb8",
            "resource": {
                "resourceType": "PractitionerRole",
                "active": true,
                "practitioner": {
                    "reference": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
                    "type": "Practitioner"
                },
                "organization": {
                    "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                    "type": "Organization"
                },
                "location": [
                    {
                        "reference": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
                        "type": "Location"
                    }
                ]
            }
        },
        {
            "request": {
                "method": "POST",
                "url": "Practitioner"
            },
            "fullUrl": "urn:uuid:1ba55e38-715b-4072-8608-f5739245e6d8",
            "resource": {
                "resourceType": "Practitioner",
                "name": [
                    {
                        "use": "official",
                        "family": "Jones",
                        "given": [
                            "Julie"
                        ],
                        "suffix": [
                            "MD"
                        ]
                    }
                ]
            }
        },
        {
            "request": {
                "method": "POST",
                "url": "Organization"
            },
            "fullUrl": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
            "resource": {
                "resourceType": "Organization",
                "identifier": [
                    {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                    }
                ],
                "name": "Example Hospital"
            }
        },
        {
            "request": {
                "method": "POST",
                "url": "Location"
            },
            "fullUrl": "urn:uuid:039b0733-79ec-476b-9ccc-109944222d58",
            "resource": {
                "resourceType": "Location",
                "identifier": [
                    {
                        "system": "SOFA-launchID",
                        "value": "launchID"
                    }
                ],
                "status": "active",
                "name": "North Wing",
                "mode": "instance",
                "physicalType": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                            "code": "wi",
                            "display": "Wing"
                        }
                    ]
                },
                "managingOrganization": {
                    "reference": "urn:uuid:9b530e85-bf64-4f35-a186-65ac1ddaf303",
                    "type": "Organization"
                }
            }
        },
         {
                        "request": {
                            "method": "POST",
                            "url": "DiagnosticReport"
                        },
                        "fullUrl": "urn:uuid:a1b2c3d4-e5f6-4789-8901-234567890abc",
                        "resource": {
                            "resourceType": "DiagnosticReport",
                            "status": "final",
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://loinc.org",
                                        "code": "12345-6",
                                        "display": "Example Diagnostic Report"
                                    }
                                ]
                            },
                            "subject": {
                                "reference": "urn:uuid:d12004a7-5ed5-41ab-a8f2-0de5f0c98847",
                                "type": "Patient"
                            },
                            "encounter": {
                                "reference": "urn:uuid:e753f568-6faf-4a9e-aec8-fe0d2a4f397c",
                                "type": "Encounter"
                            },
                            "issued": "2024-03-18T12:00:00-04:00"
                        }
                    }
    ],
    "type": "batch"
}
           
            return requestBody;
 
}


export async function requestClearContext()
 {
            const requestBody =
            {
  "resourceType": "Bundle",
  "type": "batch",
  "entry": [
    {
      "request": {
        "method": "DELETE",
        "url": "Patient/5c039193-719d-4f01-99ce-cc9fc1dcb97c"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Encounter/0efe3e92-f4b0-4e7b-8e21-0ce759034a0b"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "PractitionerRole/99ee9ebc-289a-4591-bb01-51a01b53e43f"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Organization/bea0c0b9-6af5-432e-acef-46199beb2d2f"
      }
    },
    {
      "request": {
        "method": "DELETE",
        "url": "Location/d4592d1c-1bb8-4bba-a6b4-e0ea4b822483"
      }
    }
  ]
}

           
            return requestBody;
 
}

export async function requestClearPatient()
 {
            const requestBody =
            {
  "resourceType": "Bundle",
  "type": "batch",
  "entry": [
    {
      "request": {
        "method": "GET",
        "url": "Patient/00305cc5-632b-45b9-bd0e-92573b3f626a"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Encounter/0efe3e92-f4b0-4e7b-8e21-0ce759034a0b"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "PractitionerRole/99ee9ebc-289a-4591-bb01-51a01b53e43f"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Organization/bea0c0b9-6af5-432e-acef-46199beb2d2f"
      }
    },
    {
      "request": {
        "method": "DELETE",
        "url": "Location/d4592d1c-1bb8-4bba-a6b4-e0ea4b822483"
      }
    }
  ]
}

           
            return requestBody;
 
}

export async function requestResourcenotFound()
 {
            const requestBody =
            //Bygiving invalid url id
{
  "resourceType": "Bundle",
  "type": "batch",
  "entry": [
    {
      "request": {
        "method": "DELETE",
        "url": "Patient/dc3bf7c6-46d4-4954-99da-176e563e5380"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Encounter/0efe3e92-f4b0-4e7b-8e21-0ce759034a1b"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "PractitionerRole/99ee9ebc-289a-4591-bb01-51a01b53e44f"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Organization/bea0c0b9-6af5-432e-acef-46199beb2d3f"
      }
    },
    {
      "request": {
        "method": "DELETE",
        "url": "Location/d4592d1c-1bb8-4bba-a6b4-e0ea4b822493"
      }
    }
  ]
}

           
            return requestBody;
 
}

export async function requestNoAuthoeized()
 {
            const requestBody =
            {
  "resourceType": "Bundle",
  "type": "batch",
  "entry": [
    {
      "request": {
        "method": "DELETE",
        "url": "Patient/dc3bf7c6-46d4-4954-99da-176e563e538d"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Encounter/0efe3e92-f4b0-4e7b-8e21-0ce759034a0b"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "PractitionerRole/99ee9ebc-289a-4591-bb01-51a01b53e43f"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Organization/bea0c0b9-6af5-432e-acef-46199beb2d2f"
      }
    },
    {
      "request": {
        "method": "DELETE",
        "url": "Location/d4592d1c-1bb8-4bba-a6b4-e0ea4b822483"
      }
    }
  ]
}

           
            return requestBody;
 
}

export async function requestNoPract()
 {
            const requestBody =
            {
  "resourceType": "Bundle",
  "type": "batch",
  "entry": [
    {
      "request": {
        "method": "DELETE",
        "url": "Patient/dc3bf7c6-46d4-4954-99da-176e563e538d"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Encounter/0efe3e92-f4b0-4e7b-8e21-0ce759034a0b"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Organization/bea0c0b9-6af5-432e-acef-46199beb2d2f"
      }
    },
    {
      "request": {
        "method": "DELETE",
        "url": "Location/d4592d1c-1bb8-4bba-a6b4-e0ea4b822483"
      }
    }
  ]
}

           
            return requestBody;
 
}

export async function requestResourceGone()
 {
            const requestBody =
           //Bygiving deleted url id in above resource not found request
{
  "resourceType": "Bundle",
  "type": "batch",
  "entry": [
    {
      "request": {
        "method": "DELETE",
        "url": "Patient/dc3bf7c6-46d4-4954-99da-176e563e538d"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Encounter/0efe3e92-f4b0-4e7b-8e21-0ce759034a0b"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "PractitionerRole/99ee9ebc-289a-4591-bb01-51a01b53e43f"
      }
    },
     {
      "request": {
        "method": "DELETE",
        "url": "Organization/bea0c0b9-6af5-432e-acef-46199beb2d2f"
      }
    },
    {
      "request": {
        "method": "DELETE",
        "url": "Location/d4592d1c-1bb8-4bba-a6b4-e0ea4b822483"
      }
    }
  ]
}

            return requestBody;
 
}
export async function requesdwmm()
 {
            const requestBody ="";
           
            return requestBody;
 
}

/*

 const expectedLocations = [
            "Patient","Encounter","PractitionerRole","Practitioner","Organization",
            "Location","Medication","DiagnosticReport"
          ];

        const actualLocations = response.data.entry.map((entry: any) => entry.response.location);
        const actualTypes = actualLocations.map(location => location.split('/')[0]);
        console.log('Actual resource types:', actualTypes);
        expect(actualTypes.sort()).toEqual(expectedLocations.sort());




        const actualLocations = response.data.entry
        .map((entry: any) => entry.response.location)
        .filter((location: string | undefined) => location !== undefined); 
        const actualTypes = actualLocations.map(location => location.split('/')[0]);
        expect(actualTypes.includes("Practitioner")).toBe(false);

        */

        