import {test, expect} from "@playwright/test"
import { setReport } from "../../helper/functions";
import {generateSignature, ResponseValidation} from "../../helper/APIfunctions"
require('custom-env').env('Env_Staging')

let apiContext;
let apiContextAuth;
let regexMatchAll: RegExp = /(.*?)/;
// let signature;

test.beforeAll(async ({ playwright }) => {
    // console.log(`${process.env.baseUrl}/diagnosticreports`,process.env.apikey2, process.env.sharedsecret2)
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });
})

test('DRA_F18 - DiagnosticReport without subject', async({page}) => {
  setReport('Functional Tests', 'DRA_F18')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "2017-08-28T12:54:30-04:00",
              "conclusion": "Some outcome",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/0"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [subject] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/resourceType: DiagnosticReport is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [recipient] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [sender] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F18-1 - DiagnosticReport with wrong reference in subject', async({page}) => {
  setReport('Functional Tests', 'DRA_F18-1')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "female",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd7"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "2017-08-28T12:54:30-04:00",
              "conclusion": "Some outcome",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "cannot find referenced object for reference:aed6c8e6-4e09-47f4-a4ae-78bb049abcd7"
        }
      ] 
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F19 - DiagnosticReport without context', async({page}) => {
  setReport('Functional Tests', 'DRA_F19')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "male",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "effectiveDateTime": "2017-08-28T12:54:30-04:00",
              "conclusion": "Some outcome",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },

      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/0"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [context] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/resourceType: DiagnosticReport is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [recipient] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [sender] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
        }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F19-1 - DiagnosticReport with wrong reference in  context', async({page}) => {
  setReport('Functional Tests', 'DRA_F19-1')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "blabla",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff888"
              },
              "effectiveDateTime": "2017-08-28T12:54:30-04:00",
              "conclusion": "Some outcome",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "cannot find referenced object for reference:3a5e9805-389c-446d-bda2-071410bff888"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F20 - DiagnosticReport with no effectiveDateTime', async({page}) => {
  setReport('Functional Tests', 'DRA_F20')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "conclusion": "Some outcome",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/0"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [effectiveDateTime] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/resourceType: DiagnosticReport is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [recipient] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [sender] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F21 - DiagnosticReport without conclusion', async({page}) => {
  setReport('Functional Tests', 'DRA_F21')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data:   {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },

      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/0"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [conclusion] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/resourceType: DiagnosticReport is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [recipient] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [sender] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F21-1 - DiagnosticReport with conclusion empty', async({page}) => {
  setReport('Functional Tests', 'DRA_F21-1')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": process.env.validRegistryID
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
      "issue": [
        {
          "severity": "information",
          "code": "OTN_SUCCESS",
          "diagnostics": "1/2 Successful Delivery to EMR",
          "location": "Communication/Recipient/94cdf2b5-4622-441d-b979-10e41db04bd8"
        },
        {
          "severity": "information",
          "code": "OTN_SUCCESS",
          "diagnostics": "2/2 Successful Delivery to EMR",
          "location": "Communication/Recipient/94cdf2b5-4622-441d-b979-10e41db04bd8"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(200)
})

test('DRA_F22 - DiagnosticReport without presented form', async({page}) => {
  setReport('Functional Tests', 'DRA_F22')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "Some outcome"
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },

      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/0"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [presentedForm] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/resourceType: DiagnosticReport is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [recipient] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [sender] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F22-1 - DiagnosticReport with presented form empty', async({page}) => {
  setReport('Functional Tests', 'DRA_F22-1')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "application/pdf",
                  "data": ""
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": process.env.validRegistryID
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
      "issue": [
        {
          "severity": "information",
          "code": "OTN_SUCCESS",
          "diagnostics": "Successful Delivery to EMR",
          "location": "Communication/Recipient/94cdf2b5-4622-441d-b979-10e41db04bd8"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(200)
})

test('DRA_F23 - Diagnostic report with no communication', async({page}) => {
  setReport('Functional Tests', 'DRA_F23')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_INTERNAL_ERROR"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F23-1 - Communication without contained array', async({page}) => {
  setReport('Functional Tests', 'DRA_F23-1')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/1"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [contained] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/resourceType: Communication is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [status] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [contained] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [subject] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [context] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [conclusion] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [effectiveDateTime] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [presentedForm] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F23-2 - Communication without sender', async({page}) => {
  setReport('Functional Tests', 'DRA_F23-2')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ]
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/1"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [sender] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/resourceType: Communication is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [status] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [subject] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [context] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [conclusion] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [effectiveDateTime] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [presentedForm] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0/resourceType: Practitioner is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [address] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [birthDate] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0/resourceType: Practitioner is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [text] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [identifier] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [status] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [class] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [period] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [contained] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1/resourceType: Organization is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1: required key [address] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1: required key [telecom] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1: required key [birthDate] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1/resourceType: Organization is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1: required key [text] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1: required key [status] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1: required key [class] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1: required key [period] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/1: required key [contained] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F23-3 - Communication with wrong refference for the sender', async({page}) => {
  setReport('Functional Tests', 'DRA_F23-3')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "2"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "cannot find referenced object for reference:2"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA23-4 - Communication without recipient', async({page}) => {
    setReport('Functional Tests', 'DRA_23-4')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
    const res = await apiContext.post(`/diagnosticreports/`, {
        data: {
          "resourceType": "Bundle",
          "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
          "entry": [
            {
              "resource": {
                "resourceType": "DiagnosticReport",
                "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
                "contained": [
                  {
                    "resourceType": "Patient",
                    "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                    "identifier": [
                      {
                        "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                        "value": "1234567890 ON"
                      },
                      {
                        "system": "http://otn.ca/patient-id",
                        "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                      }
                    ],
                    "name": [
                      {
                        "family": "Doe",
                        "given": [
                          "John"
                        ],
                        "prefix": [
                          "Sir"
                        ]
                      }
                    ],
                    "gender": "other",
                    "telecom": [
                      {
                        "system": "phone",
                        "value": "",
                        "use": "home"
                      }
                    ],
                    "birthDate": "1960-03-11",
                    "address": [
                      {
                        "use": "",
                        "line": [
                          ""
                        ],
                        "city": "",
                        "state": "ON",
                        "postalCode": "",
                        "country": ""
                      }
                    ]
                  },
                  {
                    "resourceType": "Encounter",
                    "id": "3a5e9805-389c-446d-bda2-071410bff899",
                    "text": {
                      "status": "generated",
                      "div": "Called in with some issue"
                    },
                    "contained": [
                      {
                        "resourceType": "Practitioner",
                        "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                        "name": [
                          {
                            "family": "Smith",
                            "given": [
                              "Jane"
                            ],
                            "prefix": [
                              "Dr."
                            ]
                          }
                        ],
                        "telecom": [
                          {
                            "system": "phone",
                            "value": "555-555-5555",
                            "use": "home"
                          }
                        ],
                        "qualification": [
                          {
                            "identifier": [
                              {
                                "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                                "value": "55185"
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    "identifier": [
                      {
                        "system": "http://otn.ca/encounterId",
                        "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                      }
                    ],
                    "status": "finished",
                    "class": {
                      "system": "http://hl7.org/fhir/v3/ActCode",
                      "code": process.env.validActCode
                    },
                    "participant": [
                      {
                        "individual": {
                          "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                        }
                      }
                    ],
                    "period": {
                      "start": "2017-08-28T12:54:30-04:00",
                      "end": "2017-08-28T12:54:30-04:00"
                    }
                  }
                ],
                "status": "final",
                "subject": {
                  "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                },
                "context": {
                  "reference": "3a5e9805-389c-446d-bda2-071410bff899"
                },
                "effectiveDateTime": "08/28/2017",
                "conclusion": "",
                "presentedForm": [
                  {
                    "contentType": "text/plain",
                    "data": "VGhpcyBpcyBhIHRlc3Qu"
                  },
                  {
                    "contentType": "application/pdf",
                    "data": "GKJHGKJHGIUITTIU=="
                  }
                ]
              }
            },
            {
              "resource": {
                "resourceType": "Communication",
                "id": "111111111111",
                "contained": [
                  {
                    "resourceType": "Practitioner",
                    "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                    "name": [
                      {
                        "family": "Smith",
                        "given": [
                          "Jong"
                        ],
                        "prefix": [
                          "GP."
                        ]
                      }
                    ],
                    "telecom": [
                      {
                        "system": "phone",
                        "value": "555-555-1111",
                        "use": "home"
                      }
                    ],
                    "qualification": [
                      {
                        "identifier": [
                          {
                            "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                            "value": "86802"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "resourceType": "Organization",
                    "id": "1",
                    "identifier": [
                      {
                        "system": "http://otn.ca/hrmhostorg",
                        "value": process.env.validOrgID
                      }
                    ],
                    "name": "William Osler Health System"
                  }
                ],
                "sender": {
                  "reference": "1"
                }
              }
            }
          ]
        },
        headers: {
        "Authorization":signature
        }
    })
    const body = await res.json()
    console.log(body)
    const expected = {
        "resourceType": "OperationOutcome",
        "issue": [
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "Pointer to Validation error:#/entry/1"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource: required key [recipient] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/resourceType: Communication is not a valid enum value"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource: required key [status] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource: required key [subject] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource: required key [context] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource: required key [conclusion] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource: required key [effectiveDateTime] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource: required key [presentedForm] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0/resourceType: Practitioner is not a valid enum value"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0: required key [address] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0: required key [birthDate] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0/resourceType: Practitioner is not a valid enum value"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0: required key [text] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0: required key [identifier] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0: required key [status] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0: required key [class] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0: required key [period] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/0: required key [contained] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1/resourceType: Organization is not a valid enum value"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1: required key [address] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1: required key [telecom] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1: required key [birthDate] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1/resourceType: Organization is not a valid enum value"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1: required key [text] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1: required key [status] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1: required key [class] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1: required key [period] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/1/resource/contained/1: required key [contained] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#: 0 subschemas matched instead of one"
          }
        ]
      }
    expect(body).toEqual(expected)
    expect(res.status()).toEqual(400)
})

test('DRA_F23-5 - Communication with wrong reference for recipient', async({page}) => {
  setReport('Functional Tests', 'DRA_F23-5')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd9"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "cannot find referenced object for reference:94cdf2b5-4622-441d-b979-10e41db04bd9"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F23-6 - Communication with no practitioner', async({page}) => {
  setReport('Functional Tests', 'DRA_F23-6')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
    "resourceType": "OperationOutcome",
    "issue": [
      {
        "severity": "fatal",
        "code": "OTN_RESOURCE_VALIDATION_ERROR",
        "diagnostics": "cannot find referenced object for reference:94cdf2b5-4622-441d-b979-10e41db04bd8"
      }
    ]
  }

    expect(body).toEqual(expected)
    expect(res.status()).toEqual(400)
})

test('DRA23-7 - Communication with no practitioner and no recipient', async({page}) => {
    setReport('Functional Tests', 'DRA_23-7')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
    const res = await apiContext.post(`/diagnosticreports/`, {
        data: {
          "resourceType": "Bundle",
          "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
          "entry": [
            {
              "resource": {
                "resourceType": "DiagnosticReport",
                "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
                "contained": [
                  {
                    "resourceType": "Patient",
                    "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                    "identifier": [
                      {
                        "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                        "value": "1234567890 ON"
                      },
                      {
                        "system": "http://otn.ca/patient-id",
                        "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                      }
                    ],
                    "name": [
                      {
                        "family": "Doe",
                        "given": [
                          "John"
                        ],
                        "prefix": [
                          "Sir"
                        ]
                      }
                    ],
                    "gender": "other",
                    "telecom": [
                      {
                        "system": "phone",
                        "value": "",
                        "use": "home"
                      }
                    ],
                    "birthDate": "1960-03-11",
                    "address": [
                      {
                        "use": "",
                        "line": [
                          ""
                        ],
                        "city": "",
                        "state": "ON",
                        "postalCode": "",
                        "country": ""
                      }
                    ]
                  },
                  {
                    "resourceType": "Encounter",
                    "id": "3a5e9805-389c-446d-bda2-071410bff899",
                    "text": {
                      "status": "generated",
                      "div": "Called in with some issue"
                    },
                    "contained": [
                      {
                        "resourceType": "Practitioner",
                        "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                        "name": [
                          {
                            "family": "Smith",
                            "given": [
                              "Jane"
                            ],
                            "prefix": [
                              "Dr."
                            ]
                          }
                        ],
                        "telecom": [
                          {
                            "system": "phone",
                            "value": "555-555-5555",
                            "use": "home"
                          }
                        ],
                        "qualification": [
                          {
                            "identifier": [
                              {
                                "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                                "value": "55185"
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    "identifier": [
                      {
                        "system": "http://otn.ca/encounterId",
                        "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                      }
                    ],
                    "status": "finished",
                    "class": {
                      "system": "http://hl7.org/fhir/v3/ActCode",
                      "code": process.env.validActCode
                    },
                    "participant": [
                      {
                        "individual": {
                          "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                        }
                      }
                    ],
                    "period": {
                      "start": "2017-08-28T12:54:30-04:00",
                      "end": "2017-08-28T12:54:30-04:00"
                    }
                  }
                ],
                "status": "final",
                "subject": {
                  "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                },
                "context": {
                  "reference": "3a5e9805-389c-446d-bda2-071410bff899"
                },
                "effectiveDateTime": "08/28/2017",
                "conclusion": "",
                "presentedForm": [
                  {
                    "contentType": "text/plain",
                    "data": "VGhpcyBpcyBhIHRlc3Qu"
                  },
                  {
                    "contentType": "application/pdf",
                    "data": "GKJHGKJHGIUITTIU=="
                  }
                ]
              }
            },
            {
              "resource": {
                "resourceType": "Communication",
                "id": "111111111111",
                "contained": [
                  {
                    "resourceType": "Organization",
                    "id": "1",
                    "identifier": [
                      {
                        "system": "http://otn.ca/hrmhostorg",
                        "value": process.env.validOrgID
                      }
                    ],
                    "name": "William Osler Health System"
                  }
                ],
                "sender": {
                  "reference": "1"
                }
              }
            }
          ]
        },
        headers: {
        "Authorization":signature
        }
    })
    const body = await res.json()
    console.log(body)
    const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/1"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [recipient] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/resourceType: Communication is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [status] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [subject] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [context] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [conclusion] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [effectiveDateTime] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource: required key [presentedForm] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0/resourceType: Organization is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [address] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [telecom] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [birthDate] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0/resourceType: Organization is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [text] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [status] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [class] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [period] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/1/resource/contained/0: required key [contained] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
        }
      ]
    }

    expect(body).toEqual(expected)
    expect(res.status()).toEqual(400)
})

test('DRA_F23-8 - Communication with no organization', async({page}) => {
  setReport('Functional Tests', 'DRA_F23-8')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "cannot find referenced object for reference:1"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F23-9 - Communication with no organization and no sender', async({page}) => {
  setReport('Functional Tests', 'DRA_F23-9')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "gender": "other",
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "08/28/2017",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ]
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
const expected = {
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "Pointer to Validation error:#/entry/1"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource: required key [sender] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/resourceType: Communication is not a valid enum value"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource: required key [status] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource: required key [subject] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource: required key [context] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource: required key [conclusion] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource: required key [effectiveDateTime] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource: required key [presentedForm] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0/resourceType: Practitioner is not a valid enum value"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0: required key [address] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0: required key [birthDate] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0/resourceType: Practitioner is not a valid enum value"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0: required key [text] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0: required key [identifier] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0: required key [status] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0: required key [class] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0: required key [period] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#/entry/1/resource/contained/0: required key [contained] not found"
    },
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "#: 0 subschemas matched instead of one"
    }
  ]
}

  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F24 - Diagnostic report without contained encounter', async({page}) => {
  setReport('Functional Tests', 'DRA_F24')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "2017-08-28T12:54:30-04:00",
              "conclusion": "Some outcome",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "fatal",
      "code": "OTN_RESOURCE_VALIDATION_ERROR",
      "diagnostics": "cannot find referenced object for reference:3a5e9805-389c-446d-bda2-071410bff899"
    }
  ]
}
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)

})

test('DRA_F25 - Diagnostic report with no encounter resourceTpe', async({page}) => {
  setReport('Functional Tests', 'DRA_F25')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890 ON"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ],
                      "prefix": [
                        "Sir"
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "",
                      "use": "home"
                    }
                  ],
                  "birthDate": "1960-03-11",
                  "address": [
                    {
                      "use": "",
                      "line": [
                        ""
                      ],
                      "city": "",
                      "state": "ON",
                      "postalCode": "",
                      "country": ""
                    }
                  ]
                },
                {
                  "resourceType": "Blabla",
                  "id": "3a5e9805-389c-446d-bda2-071410bff899",
                  "text": {
                    "status": "generated",
                    "div": "Called in with some issue"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "Jane"
                          ],
                          "prefix": [
                            "Dr."
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "55185"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-08-28T12:54:30-04:00",
                    "end": "2017-08-28T12:54:30-04:00"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
              },
              "context": {
                "reference": "3a5e9805-389c-446d-bda2-071410bff899"
              },
              "effectiveDateTime": "2017-08-28T12:54:30-04:00",
              "conclusion": "Some outcome",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "VGhpcyBpcyBhIHRlc3Qu"
                },
                {
                  "contentType": "application/pdf",
                  "data": "GKJHGKJHGIUITTIU=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "111111111111",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                  "name": [
                    {
                      "family": "Smith",
                      "given": [
                        "Jong"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-1111",
                      "use": "home"
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "86802"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "William Osler Health System"
                }
              ],
              "recipient": [
                {
                  "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                }
              ],
              "sender": {
                "reference": "1"
              }
            }
          }
        ]
      },
      headers: {
      "Authorization":signature
      }
  })
  const body = await res.json()
  console.log(body)
  const expected = {
      "resourceType": "OperationOutcome",
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/0"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/1/resourceType: Blabla is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/1/resourceType: Blabla is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/1: required key [name] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/1: required key [address] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/1: required key [telecom] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/1: required key [birthDate] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/resourceType: DiagnosticReport is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [recipient] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [sender] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: 0 subschemas matched instead of one"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA26 - Encounter without id', async({page}) => {
    setReport('Daniela Tests', 'DRA_26')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
    const res = await apiContext.post(`/diagnosticreports/`, {
        data: {
          "resourceType": "Bundle",
          "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
          "entry": [
            {
              "resource": {
                "resourceType": "DiagnosticReport",
                "id": "febe36bb-e9a0-436d-9cb1-c7551443f91b",
                "contained": [
                  {
                    "resourceType": "Patient",
                    "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                    "identifier": [
                      {
                        "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                        "value": "1234567890 ON"
                      },
                      {
                        "system": "http://otn.ca/patient-id",
                        "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                      }
                    ],
                    "name": [
                      {
                        "family": "Doe",
                        "given": [
                          "John"
                        ],
                        "prefix": [
                          "Sir"
                        ]
                      }
                    ],
                    "telecom": [
                      {
                        "system": "phone",
                        "value": "",
                        "use": "home"
                      }
                    ],
                    "birthDate": "1960-03-11",
                    "address": [
                      {
                        "use": "",
                        "line": [
                          ""
                        ],
                        "city": "",
                        "state": "ON",
                        "postalCode": "",
                        "country": ""
                      }
                    ]
                  },
                  {
                    "resourceType": "Encounter",
                    "text": {
                      "status": "generated",
                      "div": "Called in with some issue"
                    },
                    "contained": [
                      {
                        "resourceType": "Practitioner",
                        "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                        "name": [
                          {
                            "family": "Smith",
                            "given": [
                              "Jane"
                            ],
                            "prefix": [
                              "Dr."
                            ]
                          }
                        ],
                        "telecom": [
                          {
                            "system": "phone",
                            "value": "555-555-5555",
                            "use": "home"
                          }
                        ],
                        "qualification": [
                          {
                            "identifier": [
                              {
                                "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                                "value": "55185"
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    "identifier": [
                      {
                        "system": "http://otn.ca/encounterId",
                        "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                      }
                    ],
                    "status": "finished",
                    "class": {
                      "system": "http://hl7.org/fhir/v3/ActCode",
                      "code": process.env.validActCode
                    },
                    "participant": [
                      {
                        "individual": {
                          "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                        }
                      }
                    ],
                    "period": {
                      "start": "2017-08-28T12:54:30-04:00",
                      "end": "2017-08-28T12:54:30-04:00"
                    }
                  }
                ],
                "status": "final",
                "subject": {
                  "reference": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                },
                "context": {
                  "reference": "3a5e9805-389c-446d-bda2-071410bff899"
                },
                "effectiveDateTime": "2017-08-28T12:54:30-04:00",
                "conclusion": "Some outcome",
                "presentedForm": [
                  {
                    "contentType": "text/plain",
                    "data": "VGhpcyBpcyBhIHRlc3Qu"
                  },
                  {
                    "contentType": "application/pdf",
                    "data": "GKJHGKJHGIUITTIU=="
                  }
                ]
              }
            },
            {
              "resource": {
                "resourceType": "Communication",
                "id": "111111111111",
                "contained": [
                  {
                    "resourceType": "Practitioner",
                    "id": "94cdf2b5-4622-441d-b979-10e41db04bd8",
                    "name": [
                      {
                        "family": "Smith",
                        "given": [
                          "Jong"
                        ],
                        "prefix": [
                          "GP."
                        ]
                      }
                    ],
                    "telecom": [
                      {
                        "system": "phone",
                        "value": "555-555-1111",
                        "use": "home"
                      }
                    ],
                    "qualification": [
                      {
                        "identifier": [
                          {
                            "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                            "value": "86802"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "resourceType": "Organization",
                    "id": "1",
                    "identifier": [
                      {
                        "system": "http://otn.ca/hrmhostorg",
                        "value": process.env.validOrgID
                      }
                    ],
                    "name": "William Osler Health System"
                  }
                ],
                "recipient": [
                  {
                    "reference": "94cdf2b5-4622-441d-b979-10e41db04bd8"
                  }
                ],
                "sender": {
                  "reference": "1"
                }
              }
            }
          ]
        },
        headers: {
        "Authorization":signature
        }
    })
    const body = await res.json()
    console.log(body)
    const expected = {
        "resourceType": "OperationOutcome",
        "issue": [
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "Pointer to Validation error:#/entry/0"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource/contained/1: required key [id] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource/contained/1/resourceType: Encounter is not a valid enum value"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource/contained/1: required key [id] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource/contained/1: required key [name] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource/contained/1: required key [address] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource/contained/1: required key [telecom] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource/contained/1: required key [birthDate] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource/resourceType: DiagnosticReport is not a valid enum value"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource: required key [recipient] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#/entry/0/resource: required key [sender] not found"
          },
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "#: 0 subschemas matched instead of one"
          }
        ]
      }
    expect(body).toEqual(expected)
    expect(res.status()).toEqual(400)
})






test('DRA71 - REPORT- status "arrived" pdf, pdf, INVALID patient_id', async({page}) => {
    setReport('Daniela Tests', 'DRA_71')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey5, process.env.sharedsecret5, d.toISOString())
    const res = await apiContext.post(`/diagnosticreports/`, {
        data: {
            "resourceType": "Bundle",
            "id": "#bundle1",
            "type": "collection",
            "entry": [
              {
                "resource": {
                  "resourceType": "DiagnosticReport",
                  "id": "#report1-ENROLLMENT REPORT",
                  "status": "final",
                  "contained": [
                    {
                      "resourceType": "Patient",
                      "id": "PatientID_RCYB3494C_1646329406659_1",
                      "identifier": [
                        {
                          "system": process.env.patientID_url,
                          "value": "RCYB3494C"
                        }
                      ],
                      "name": [
                        {
                          "family": "Svantesson",
                          "given": [
                            "Svante"
                          ]
                        }
                      ],
                      "gender": "male",
                      "birthDate": "1976-03-14",
                      "telecom": [
                        {
                          "system": "email",
                          "value": "home",
                          "rank": "1"
                        },
                        {
                          "system": "phone",
                          "value": "home",
                          "rank": "2"
                        }
                      ],
                      "address": [
                        {
                          "use": "home",
                          "line": [
                            "1234 Street name"
                          ],
                          "city": "Barrie",
                          "state": "ON",
                          "postalCode": "K2K2K2",
                          "country": "CA"
                        }
                      ]
                    },
                    {
                      "resourceType": "Encounter",
                      "id": "#enc1",
                      "text": {
                        "status": "generated",
                        "div": "description of this encounter"
                      },
                      "contained": [
                        {
                          "resourceType": "Practitioner",
                          "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                          "name": [
                            {
                              "family": "Smith",
                              "given": [
                                "Jane"
                              ],
                              "prefix": [
                                "Dr."
                              ]
                            }
                          ],
                          "telecom": [
                            {
                              "system": "phone",
                              "value": "555-555-5555",
                              "use": "home"
                            }
                          ],
                          "qualification": [
                            {
                              "identifier": [
                                {
                                  "system": process.env.mdLic,
                                  "value": "345435"
                                }
                              ]
                            }
                          ]
                        }
                      ],
                      "identifier": [
                        {
                          "system": "http://otn.ca/encounterId",
                          "value": "daskjdhask"
                        }
                      ],
                      "status": "arrived",
                      "class": {
                        "system": "http://hl7.org/fhir/v3/ActCode",
                        "code": process.env.validActCode
                      },
                      "participant": [
                        {
                          "individual": {
                            "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                          }
                        }
                      ],
                      "period": {
                        "start": "2018-01-01T13:00",
                        "end": "2018-02-02T13:00"
                      }
                    }
                  ],
                  "subject": {
                    "reference": "#p1"
                  },
                  "context": {
                    "reference": "#enc1"
                  },
                  "effectiveDateTime": "2015-01-01T12:00:00",
                  "conclusion": "some outcome",
                  "presentedForm": [
                    {
                      "contentType": "application/pdf",
                      "data": "GKJHGKJHGIUITTIU=="
                    },
                    {
                      "contentType": "application/pdf",
                      "data": "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Q291bnQgMQovS2lkcyBbNSAwIFIgXSA+PgplbmRvYmoKMiAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZwogL1BhZ2VzIDEgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9Gb250IDw8CiAgL0YxIDE1IDAgUgogIC9GMyAxNiAwIFIKPj4KL1Byb2NTZXQgWyAvUERGIC9JbWFnZUIgL0ltYWdlQyAvVGV4dCBdCi9YT2JqZWN0IDw8CiAgL0ltNCAxMiAwIFIKICAvSW0zIDEwIDAgUgogIC9JbTIgOCAwIFIKICAvSW0xIDYgMCBSCj4+Cj4+CmVuZG9iagp4cmVmCjAgMTgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDA1Mzc1IDAwMDAwIG4gCjAwMDAwMDU0MzMgMDAwMDAgbiAKMDAwMDAwNTQ4MyAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDQ5NzUgMDAwMDAgbiAKMDAwMDAwMDEyOCAwMDAwMCBuIAowMDAwMDAwMzM5IDAwMDAwIG4gCjAwMDAwMDAzNTcgMDAwMDAgbiAKMDAwMDAwMDc3NCAwMDAwMCBuIAowMDAwMDAwNzkzIDAwMDAwIG4gCjAwMDAwMDEwMTEgMDAwMDAgbiAKMDAwMDAwMTAzMCAwMDAwMCBuIAowMDAwMDAxNDEzIDAwMDAwIG4gCjAwMDAwMDE0MzMgMDAwMDAgbiAKMDAwMDAwNTEzMyAwMDAwMCBuIAowMDAwMDA1MjQxIDAwMDAwIG4gCjAwMDAwMDUzNTQgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAxOAovUm9vdCAyIDAgUgovSW5mbyA0IDAgUgovSUQgWzw4N0JFOUFEMEUwMjg2NTA5NTNENEVDNTRDRjZCNzNGOD4gPDg3QkU5QUQwRTAyODY1MDk1M0Q0RUM1NENGNkI3M0Y4Pl0KPj4Kc3RhcnR4cmVmCjU2NTEKJSVFT0YK"
                    }
                  ]
                }
              },
              {
                "resource": {
                  "resourceType": "Communication",
                  "id": "#comm1",
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "#pr1",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "John",
                            "peter"
                          ],
                          "prefix": [
                            "Dr."
                          ],
                          "suffix": [
                            "Sr"
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "416-555-1234",
                          "use": "home",
                          "rank": 1
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": process.env.mdLic,
                              "value": process.env.validRegistryID
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "resourceType": "Organization",
                      "id": "#org1",
                      "identifier": [
                        {
                          "system": process.env.hrmHostOrg_url,
                          "value": process.env.validOrgID
                        }
                      ],
                      "name": "the org"
                    }
                  ],
                  "recipient": [
                    {
                      "reference": "#pr1"
                    }
                  ],
                  "sender": {
                    "reference": "#org1"
                  }
                }
              }
            ]
          },
        headers: {
        "Authorization":signature
        }
    })
    const body = await res.json()
    console.log(body)
    const expected = {
        "resourceType": "OperationOutcome",
        "issue": [
          {
            "severity": "fatal",
            "code": "OTN_RESOURCE_VALIDATION_ERROR",
            "diagnostics": "cannot find referenced object for reference:#p1"
          }
        ]
      }
    expect(body).toEqual(expected)
    expect(res.status()).toEqual(400)
})

test('DRA150 - Report with Content type 1 recipients, (pdf-db), 1 fax', async({page}) => {
    setReport('Fax Tests', 'DRA_150')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
    const res = await apiContext.post(`/diagnosticreports/`, {
        data: {
            "resourceType": "Bundle",
            "id": "#bundle1",
            "type": "collection",
            "entry": [
              {
                "resource": {
                  "resourceType": "DiagnosticReport",
                  "id": "#report1-ENROLLMENT REPORT",
                  "status": "final",
                  "contained": [
                    {
                      "resourceType": "Patient",
                      "id": "#p1",
                      "identifier": [
                        {
                          "system": process.env.patientHCN_url,
                          "value": "1234567890 ON"
                        },
                        {
                          "system": process.env.patientID_url,
                          "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                        }
                      ],
                      "name": [
                        {
                          "family": "Doeson",
                          "given": [
                            "John"
                          ],
                          "prefix": [
                            "Sir"
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "555-555-5555",
                          "use": "mobile"
                        }
                      ],
                      "birthDate": "1960-03-11",
                      "address": [
                        {
                          "use": "home",
                          "line": [
                            "123 main St"
                          ],
                          "city": "Kingston",
                          "state": "ON",
                          "postalCode": "H0H0H0",
                          "country": "CAN"
                        }
                      ]
                    },
                    {
                      "resourceType": "Encounter",
                      "id": "#enc1",
                      "text": {
                        "status": "generated",
                        "div": "description of this encounter"
                      },
                      "contained": [
                        {
                          "resourceType": "Practitioner",
                          "id": "339c54c3-656f-4d47-90e8-3e12004d4a26",
                          "name": [
                            {
                              "family": "Smith",
                              "given": [
                                "Jane"
                              ],
                              "prefix": [
                                "Dr."
                              ]
                            }
                          ],
                          "telecom": [
                            {
                              "system": "phone",
                              "value": "555-555-5555",
                              "use": "home"
                            }
                          ],
                          "qualification": [
                            {
                              "identifier": [
                                {
                                  "system": process.env.mdLic,
                                  "value": "345435"
                                }
                              ]
                            }
                          ]
                        }
                      ],
                      "identifier": [
                        {
                          "system": "http://otn.ca/encounterId",
                          "value": "daskjdhask"
                        }
                      ],
                      "status": "arrived",
                      "class": {
                        "system": "http://hl7.org/fhir/v3/ActCode",
                        "code": process.env.validActCode
                      },
                      "participant": [
                        {
                          "individual": {
                            "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                          }
                        }
                      ],
                      "period": {
                        "start": "2018-01-01T13:00",
                        "end": "2018-02-02T13:00"
                      }
                    }
                  ],
                  "subject": {
                    "reference": "#p1"
                  },
                  "context": {
                    "reference": "#enc1"
                  },
                  "effectiveDateTime": "2015-01-01T12:00:00",
                  "conclusion": "some outcome",
                  "presentedForm": [
                    {
                      "contentType": "application/pdf",
                      "data": "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CjU1NiAwIDMzMyA1MDAgMjc4IDU1NiA1MDAgMCA1MDAgNTAwXQovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKOSAwIG9iago8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL0RLTFdGUytIZWx2ZXRpY2EvRm9udEJCb3hbLTIyIC0yMTggOTI5IDc0MV0vRmxhZ3MgMzIKL0FzY2VudCA3NDEKL0NhcEhlaWdodCA3NDEKL0Rlc2NlbnQgLTIxOAovSXRhbGljQW5nbGUgMAovU3RlbVYgMTM5Ci9NaXNzaW5nV2lkdGggMjc4Ci9YSGVpZ2h0IDUzOQovQ2hhclNldCgvQS9CL0MvRC9FL0YvSS9LL0wvTi9PL1AvUi9TL1QvVS9WL1cvYS9iL2JyYWNrZXRsZWZ0L2JyYWNrZXRyaWdodC9jL2NvbW1hL2QvZS9maXZlL2ZvdXIvZy9oL2kvay9sL20vbi9vL29uZS9wL3BhcmVubGVmdC9wYXJlbnJpZ2h0L3Ivcy9zZXZlbi9zaXgvc3BhY2UvdC90aHJlZS90d28vdS91bmRlcnNjb3JlL3YveC95L3plcm8pL0ZvbnRGaWxlMyAxNSAwIFI+PgplbmRvYmoKJUJlZ2luUmVzb3VyY2U6IGZpbGUgKFBERiBGb250RmlsZSBvYmpfMTUpCjE1IDAgb2JqCjw8L0ZpbHRlci9GbGF0ZURlY29kZQovU3VidHlwZS9UeXBlMUMvTGVuZ3RoIDM2NDI+PnN0cmVhbQp4nJ1XeVgUV/atoumqEgEjnRLXbgQXQAQEFDcWFWRJs4iAAUVEQUBoQHYMKFGj0Yc6JhCRGBtRBI0K6KAOgqDGNW7EJTTYqDSYdpnRqMmtzmt+M69hMvn89/c131fvVfdbzr3nnnOhKWMjiqZpE/+E1NyE7ORVcYaZszCGFsYaCeNEOTjtj+m6AvE4Sr7vmZkgNaWQqQiZGleN/cjOQhg/HP4+DAo/ooxp2l0etdc2ImyJ3ZQpDgvSMwoykxOTsq2mzZo1y2plgdV/v7HySchKTkyzmkQGuQmp6RmKhLTs4GTFypwsq8VxaVlWcquwhMSc1LjMD17+td//7wSKombMS5ufviDDxzdzYVZ2TkBu3Cf5K+UFq+KDE0JCE5PCkheH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PHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJyB4bWxuczppWD0naHR0cDovL25zLmFkb2JlLmNvbS9pWC8xLjAvJz4KPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9J3V1aWQ6OGIzYTIyM2UtNzc4NS0xMWU2LTAwMDAtNTVmMTVmNWVkM2VhJyB4bWxuczpwZGY9J2h0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8nIHBkZjpQcm9kdWNlcj0nR1BMIEdob3N0c2NyaXB0IDkuMDYnLz4KPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9J3V1aWQ6OGIzYTIyM2UtNzc4NS0xMWU2LTAwMDAtNTVmMTVmNWVkM2VhJyB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPjx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTA5LTA3VDE0OjM2OjUyLTA0OjAwPC94bXA6TW9kaWZ5RGF0ZT4KPHhtcDpDcmVhdGVEYXRlPjIwMTYtMDktMDdUMTQ6MzY6NTItMDQ6MDA8L3htcDpDcmVhdGVEYXRlPgo8eG1wOkNyZWF0b3JUb29sPlBTY3JpcHQ1LmRsbCBWZXJzaW9uIDUuMi4yPC94bXA6Q3JlYXRvclRvb2w+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjhiM2EyMjNlLTc3ODUtMTFlNi0wMDAwLTU1ZjE1ZjVlZDNlYScgeG1sbnM6eGFwTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nIHhhcE1NOkRvY3VtZW50SUQ9J3V1aWQ6OGIzYTIyM2UtNzc4NS0xMWU2LTAwMDAtNTVmMTVmNWVkM2VhJy8+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjhiM2EyMjNlLTc3ODUtMTFlNi0wMDAwLTU1ZjE1ZjVlZDNlYScgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJyBkYzpmb3JtYXQ9J2FwcGxpY2F0aW9uL3BkZic+PGRjOnRpdGxlPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+RG9jdW1lbnQgVERNPC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6dGl0bGU+PGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5uaHU8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9J3cnPz4KZW5kc3RyZWFtCmVuZG9iagoyIDAgb2JqCjw8L1Byb2R1Y2VyKEdQTCBHaG9zdHNjcmlwdCA5LjA2KQovQ3JlYXRpb25EYXRlKEQ6MjAxNjA5MDcxNDM2NTItMDQnMDAnKQovTW9kRGF0ZShEOjIwMTYwOTA3MTQzNjUyLTA0JzAwJykKL1RpdGxlKERvY3VtZW50IFRETSkKL0NyZWF0b3IoUFNjcmlwdDUuZGxsIFZlcnNpb24gNS4yLjIpCi9BdXRob3Iobmh1KT4+ZW5kb2JqCnhyZWYKMCAxNwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDQ3MjEgMDAwMDAgbiAKMDAwMDAxMjk2OCAwMDAwMCBuIAowMDAwMDA0NjUzIDAwMDAwIG4gCjAwMDAwMDQ0NjkgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDA0NDQ5IDAwMDAwIG4gCjAwMDAwMDQ3ODYgMDAwMDAgbiAKMDAwMDAwNjg0NiAwMDAwMCBuIAowMDAwMDA3Mjg3IDAwMDAwIG4gCjAwMDAwMDU4NjIgMDAwMDAgbiAKMDAwMDAwNDkwMCAwMDAwMCBuIAowMDAwMDA0ODI3IDAwMDAwIG4gCjAwMDAwMDQ4NTcgMDAwMDAgbiAKMDAwMDAwNjgxNiAwMDAwMCBuIAowMDAwMDA3NzQ0IDAwMDAwIG4gCjAwMDAwMTE0NzEgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAxNyAvUm9vdCAxIDAgUiAvSW5mbyAyIDAgUgovSUQgWzw2MTMxQzE4MUUxMzUxNDFGQTJBMkY3OTMzN0RFOURERj48NjEzMUMxODFFMTM1MTQxRkEyQTJGNzkzMzdERTlEREY+XQo+PgpzdGFydHhyZWYKMTMxNjIKJSVFT0YKKMTMx"
                    }
                  ]
                }
              },
              {
                "resource": {
                  "resourceType": "Communication",
                  "id": "#comm1",
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "#pr1",
                      "name": [
                        {
                          "family": "Smith",
                          "given": [
                            "John",
                            "peter"
                          ],
                          "prefix": [
                            "Dr."
                          ],
                          "suffix": [
                            "Sr"
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "416-555-1234",
                          "use": "home",
                          "rank": 1
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": process.env.mdLic,
                              "value": "70044"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "resourceType": "Practitioner",
                      "id": "#pr2",
                      "name": [
                        {
                          "family": "Consultant",
                          "given": [
                            "Medical",
                            "Cody"
                          ],
                          "prefix": [
                            "Dr."
                          ],
                          "suffix": [
                            "Sr"
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "fax",
                          "value": "416-354-8289",
                          "use": "work",
                          "rank": 1
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": process.env.mdLic,
                              "value": "909300"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "resourceType": "Organization",
                      "id": "#org1",
                      "identifier": [
                        {
                          "system": process.env.hrmHostOrg_url,
                          "value": process.env.validOrgID
                        }
                      ],
                      "name": "the org"
                    }
                  ],
                  "recipient": [
                    {
                      "reference": "#pr2"
                    }
                  ],
                  "sender": {
                    "reference": "#org1"
                  }
                }
              }
            ]
          },
        headers: {
        "Authorization":signature
        }
    })
    const body = await res.json()
    console.log(body)
    const expected = {
        "resourceType": "OperationOutcome",
        "id": "#report1-ENROLLMENT REPORT",
        "issue": [
          {
            "severity": "information",
            "code": "OTN_SUCCESS",
            "diagnostics": "Queued for delivery to FAX#416-354-8289",
            "location": "Communication/Recipient/#pr2"
          }
        ]
      }
    expect(body).toEqual(expected)
    expect(res.status()).toEqual(200)
})

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});