import {test, expect} from "@playwright/test"
import { setReport } from "../../helper/functions";
import {generateSignature, ResponseValidation} from "../../helper/APIfunctions"
require('custom-env').env('Sandbox')

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

test('DRA_F10-3 - Bundle with no entry resourceType', async({page}) => {
  setReport('Functional Tests', 'DRA_F10-3')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey8, process.env.sharedsecret8, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
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
          "diagnostics": "#/entry/0/resource: required key [resourceType] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [resourceType] not found"
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

test('DRA_F10-4 - Bundle with wrong entry resourceType', async({page}) => {
  setReport('Functional Tests', 'DRA_F10-4')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey7, process.env.sharedsecret7, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "entry": [
          {
            "resource": {
              "resourceType": "Blabla",
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
          "diagnostics": "#/entry/0/resource/resourceType: Blabla is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/resourceType: Blabla is not a valid enum value"
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

test('DRA_F10-5 - Bundle without Id', async({page}) => {
  setReport('Functional Tests', 'DRA_F10-5')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey7, process.env.sharedsecret7, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
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
          "diagnostics": "Pointer to Validation error:#"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: required key [id] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "required key [id] not found"
        }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})
/*
test('DRA_F10 -  Report API with no bundle resourceType - DRA-21', async({page}) => {
  setReport('Functional Tests', 'DRA_F10')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "BlaBla",
        "id": "blabla",
        "type": "blabla",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "bla",
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
                      "family": "Does",
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
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": "VR"
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
  
  //not sure about the complete OperationOutcome content
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
          "diagnostics": "#/entry/0/resource: required key [resourceType] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [resourceType] not found"
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
  
  expect(body).not.toEqual(expected)
  
  expect(res.status()).toEqual(400)
})


test('DRA_F10-1 -  Report API with Bundle with missing type DRA-15', async({page}) => {
  setReport('Functional Tests', 'DRA_F10-1')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
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
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": "VR"
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
  /*
  //not sure about the complete OperationOutcome content
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
          "diagnostics": "#/entry/0/resource: required key [resourceType] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [resourceType] not found"
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
  
  expect(body).not.toEqual(expected)
  
  expect(res.status()).toEqual(400)
})

test('DRA_F10-2 -  Report API with Bundle with missing type DRA-21', async({page}) => {
  setReport('Functional Tests', 'DRA_F10-2')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7a",
        "type": "blabla",
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
                      "value": "cff0b31a-e4b4-44cc-9611-9cc1bab895ff"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": "VR"
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
  
  //not sure about the complete OperationOutcome content
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
          "diagnostics": "#/entry/0/resource: required key [resourceType] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [resourceType] not found"
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
  
  expect(body).not.toEqual(expected)

  expect(res.status()).toEqual(400)
})
*/
test('DRA_F11 - Diagnostic report with de-activated recipient', async({page}) => {
  setReport('Functional Tests', 'DRA_F11')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
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
                              "value": "82408"
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
                          "value": "89942"
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
          "severity": "error",
          "code": "OTN_RECIPIENT_NOT_ALLOWED",
          "diagnostics": "Unable to deliver report",
          "location": "Communication/Recipient/94cdf2b5-4622-441d-b979-10e41db04bd8"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F12 - Diagnostic report with no identifier for patient', async({page}) => {
  setReport('Functional Tests', 'DRA_F12')
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
                    "code": "{{validActCode}}"
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
          "diagnostics": "Cannot find identifier(s) for Patient"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F12-3 - Patient object with empty fields', async({page}) => {
  setReport('Functional Tests', 'DRA_F12-3')
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
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "",
                      "given": [
                        ""
                      ],
                      "prefix": [
                        ""
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "",
                      "value": "",
                      "use": ""
                    }
                  ],
                  "birthDate": "",
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
          "diagnostics": "#/entry/0/resource/contained/0/telecom/0/system:  is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0/telecom/0/use:  is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0/resourceType: Patient is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [text] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [status] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [class] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [period] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [contained] not found"
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

test('DRA_F12-2 - Patient without most mandatory fields except id, name and identifier', async({page}) => {
  setReport('Functional Tests', 'DRA_F12-2')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
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
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Doe",
                      "given": [
                        "John"
                      ]
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
          "diagnostics": "#/entry/0/resource/contained/0: required key [address] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [telecom] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [birthDate] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0/resourceType: Patient is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [text] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [status] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [class] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [period] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [contained] not found"
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

test('DRA_F13 - No identifier for practitioner', async({page}) => {
  setReport('Functional Tests', 'DRA_F13')
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
                      "value": "4245"
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
          "diagnostics": "cannot find referenced object for reference:339c54c3-656f-4d47-90e8-3e12004d4a26"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test.describe.fixme('DRA_F13-1 -  Send a report to a practitioner with Registry #=empty string in communication section', () => {
  test('DRA_F13-1 -  Send a report to a practitioner with Registry #=empty string in communication section', async({page}) => {
  setReport('Functional Tests', 'DRA_F13-1')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
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
                      "family": "Doe-Flin",
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
                              "value": "45737"
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
                    "start": "2001-01-01T00:00:00",
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
                          "value": " "
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
                  "name": "Central CCAC"
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
          "severity": "error",
          "code": "OTN_RECIPIENT_NOT_ALLOWED",
          "diagnostics": "Unable to deliver report",
          "location": "Communication/Recipient/94cdf2b5-4622-441d-b979-10e41db04bd8"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
});
})

test('DRA_F14 - 16 HRM Medical Record - Functional Test Cases - Amended Report - GIF', async({page}) => {
  setReport('Functional Tests', 'DRA_F14')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "bundle1",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "FT#16",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "Patient#PT1",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567897 ZE"
                    }
                  ],
                  "name": [
                    {
                      "family": "PTLastOne",
                      "given": [
                        "PTOne"
                      ]
                    }
                  ],
                  "gender": "female",
                  "birthDate": "1911-05-01",
                  "address": [
                    {
                      "line": [
                        "1 First Avenue"
                      ],
                      "city": "North York",
                      "state": "ON",
                      "postalCode": "M3C 4M5",
                      "country": "CAN"
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "416-555-1234"
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "Encounter#1",
                  "text": {
                    "status": "generated",
                    "div": "Patient admitted post-COPD for monitoring"
                  },
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "daskjdhask1"
                    }
                  ],
                  "status": "in-progress",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "period": {
                    "start": "2017-01-01T13:00",
                    "end": "2017-02-02T13:00"
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
                              "value": "345435"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ]
                }
              ],
              "subject": {
                "reference": "Patient#PT1"
              },
              "context": {
                "reference": "Encounter#1"
              },
              "effectiveDateTime": "2015-01-01T12:00:00",
              "conclusion": "some conclusion",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "Amended Report: This is a sample report in text format"
                },
                {
                  "contentType": "text/html",
                  "data": "<html><p>Amended Report: This is a sample report in html format</p></html>"
                },
                {
                  "contentType": "image/gif",
                  "data": "R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj8wZAKUsAOzZz+UMAOsJAP/Z2ccMDA8PD/95eX5NWvsJCOVNQPtfX/8zM8+QePLl38MGBr8JCP+zs9myn/8GBqwpAP/GxgwJCPny78lzYLgjAJ8vAP9fX/+MjMUcAN8zM/9wcM8ZGcATEL+QePdZWf/29uc/P9cmJu9MTDImIN+/r7+/vz8/P8VNQGNugV8AAF9fX8swMNgTAFlDOICAgPNSUnNWSMQ5MBAQEJE3QPIGAM9AQMqGcG9vb6MhJsEdGM8vLx8fH98AANIWAMuQeL8fABkTEPPQ0OM5OSYdGFl5jo+Pj/+pqcsTE78wMFNGQLYmID4dGPvd3UBAQJmTkP+8vH9QUK+vr8ZWSHpzcJMmILdwcLOGcHRQUHxwcK9PT9DQ0O/v70w5MLypoG8wKOuwsP/g4P/Q0IcwKEswKMl8aJ9fX2xjdOtGRs/Pz+Dg4GImIP8gIH0sKEAwKKmTiKZ8aB/f39Wsl+LFt8dgUE9PT5x5aHBwcP+AgP+WltdgYMyZfyywz78AAAAAAAD///8AAP9mZv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKgALAAAAAA9AEQAAAj/AFEJHEiwoMGDCBMqXMiwocAbBww4nEhxoYkUpzJGrMixogkfGUNqlNixJEIDB0SqHGmyJSojM1bKZOmyop0gM3Oe2liTISKMOoPy7GnwY9CjIYcSRYm0aVKSLmE6nfq05QycVLPuhDrxBlCtYJUqNAq2bNWEBj6ZXRuyxZyDRtqwnXvkhACDV+euTeJm1Ki7A73qNWtFiF+/gA95Gly2CJLDhwEHMOUAAuOpLYDEgBxZ4GRTlC1fDnpkM+fOqD6DDj1aZpITp0dtGCDhr+fVuCu3zlg49ijaokTZTo27uG7Gjn2P+hI8+PDPERoUB318bWbfAJ5sUNFcuGRTYUqV/3ogfXp1rWlMc6awJjiAAd2fm4ogXjz56aypOoIde4OE5u/F9x199dlXnnGiHZWEYbGpsAEA3QXYnHwEFliKAgswgJ8LPeiUXGwedCAKABACCN+EA1pYIIYaFlcDhytd51sGAJbo3onOpajiihlO92KHGaUXGwWjUBChjSPiWJuOO/LYIm4v1tXfE6J4gCSJEZ7YgRYUNrkji9P55sF/ogxw5ZkSqIDaZBV6aSGYq/lGZplndkckZ98xoICbTcIJGQAZcNmdmUc210hs35nCyJ58fgmIKX5RQGOZowxaZwYA+JaoKQwswGijBV4C6SiTUmpphMspJx9unX4KaimjDv9aaXOEBteBqmuuxgEHoLX6Kqx+yXqqBANsgCtit4FWQAEkrNbpq7HSOmtwag5w57GrmlJBASEU18ADjUYb3ADTinIttsgSB1oJFfA63bduimuqKB1keqwUhoCSK374wbujvOSu4QG6UvxBRydcpKsav++Ca6G8A6Pr1x2kVMyHwsVxUALDq/krnrhPSOzXG1lUTIoffqGR7Goi2MAxbv6O2kEG56I7CSlRsEFKFVyovDJoIRTg7sugNRDGqCJzJgcKE0ywc0ELm6KBCCJo8DIPFeCWNGcyqNFE06ToAfV0HBRgxsvLThHn1oddQMrXj5DyAQgjEHSAJMWZwS3HPxT/QMbabI/iBCliMLEJKX2EEkomBAUCxRi42VDADxyTYDVogV+wSChqmKxEKCDAYFDFj4OmwbY7bDGdBhtrnTQYOigeChUmc1K3QTnAUfEgGFgAWt88hKA6aCRIXhxnQ1yg3BCayK44EWdkUQcBByEQChFXfCB776aQsG0BIlQgQgE8qO26X1h8cEUep8ngRBnOy74E9QgRgEAC8SvOfQkh7FDBDmS43PmGoIiKUUEGkMEC/PJHgxw0xH74yx/3XnaYRJgMB8obxQW6kL9QYEJ0FIFgByfIL7/IQAlvQwEpnAC7DtLNJCKUoO/w45c44GwCXiAFB/OXAATQryUxdN4LfFiwgjCNYg+kYMIEFkCKDs6PKAIJouyGWMS1FSKJOMRB/BoIxYJIUXFUxNwoIkEKPAgCBZSQHQ1A2EWDfDEUVLyADj5AChSIQW6gu10bE/JG2VnCZGfo4R4d0sdQoBAHhPjhIB94v/wRoRKQWGRHgrhGSQJxCS+0pCZbEhAAOw=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "communication#1",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "Practitioner#MD1",
                  "name": [
                    {
                      "family": "MDLastOne",
                      "given": [
                        "MDOne"
                      ]
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
                  "id": "#org1",
                  "identifier": [
                    {
                      "system": "http://otn.ca/HRMHOSTORG",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "the org"
                }
              ],
              "recipient": [
                {
                  "reference": "Practitioner#MD1"
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
  const body = await res.text()
  console.log(body)
        expect(body).toContain("1/3 Successful Delivery to EMR")
        expect(body).toContain("2/3 Successful Delivery to EMR")
        expect(body).toContain("3/3 MSH|^~\\\\&||OTNTHC||")
  expect(res.status()).toEqual(200)
})

test('DRA_F14-1 - 17 HRM Medical Record - Functional Test Cases - Cancelled Report - GIF', async({page}) => {
  setReport('Functional Tests', 'DRA_F14-1')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "bundle1",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "FT#16",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "Patient#PT2",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567897 ZE"
                    }
                  ],
                  "name": [
                    {
                      "family": "PTLastTwo",
                      "given": [
                        "PTTwo"
                      ]
                    }
                  ],
                  "gender": "female",
                  "birthDate": "1922-05-02",
                  "address": [
                    {
                      "line": [
                        "2 Second Avenue"
                      ],
                      "city": "Toronto",
                      "state": "ON",
                      "postalCode": "M1P 2L2",
                      "country": "CAN"
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "416-555-2345"
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "Encounter#1",
                  "text": {
                    "status": "generated",
                    "div": "Patient admitted post-COPD for monitoring"
                  },
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "daskjdhask1"
                    }
                  ],
                  "status": "in-progress",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "period": {
                    "start": "2017-01-01T13:00",
                    "end": "2017-02-02T13:00"
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
                              "value": "345435"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ]
                }
              ],
              "subject": {
                "reference": "Patient#PT2"
              },
              "context": {
                "reference": "Encounter#1"
              },
              "effectiveDateTime": "2015-01-01T12:00:00",
              "conclusion": "some conclusion",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "This is a sample report in text format"
                },
                {
                  "contentType": "text/html",
                  "data": "<html><p>This is a sample report in html format</p></html>"
                },
                {
                  "contentType": "image/gif",
                  "data": "R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj8wZAKUsAOzZz+UMAOsJAP/Z2ccMDA8PD/95eX5NWvsJCOVNQPtfX/8zM8+QePLl38MGBr8JCP+zs9myn/8GBqwpAP/GxgwJCPny78lzYLgjAJ8vAP9fX/+MjMUcAN8zM/9wcM8ZGcATEL+QePdZWf/29uc/P9cmJu9MTDImIN+/r7+/vz8/P8VNQGNugV8AAF9fX8swMNgTAFlDOICAgPNSUnNWSMQ5MBAQEJE3QPIGAM9AQMqGcG9vb6MhJsEdGM8vLx8fH98AANIWAMuQeL8fABkTEPPQ0OM5OSYdGFl5jo+Pj/+pqcsTE78wMFNGQLYmID4dGPvd3UBAQJmTkP+8vH9QUK+vr8ZWSHpzcJMmILdwcLOGcHRQUHxwcK9PT9DQ0O/v70w5MLypoG8wKOuwsP/g4P/Q0IcwKEswKMl8aJ9fX2xjdOtGRs/Pz+Dg4GImIP8gIH0sKEAwKKmTiKZ8aB/f39Wsl+LFt8dgUE9PT5x5aHBwcP+AgP+WltdgYMyZfyywz78AAAAAAAD///8AAP9mZv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKgALAAAAAA9AEQAAAj/AFEJHEiwoMGDCBMqXMiwocAbBww4nEhxoYkUpzJGrMixogkfGUNqlNixJEIDB0SqHGmyJSojM1bKZOmyop0gM3Oe2liTISKMOoPy7GnwY9CjIYcSRYm0aVKSLmE6nfq05QycVLPuhDrxBlCtYJUqNAq2bNWEBj6ZXRuyxZyDRtqwnXvkhACDV+euTeJm1Ki7A73qNWtFiF+/gA95Gly2CJLDhwEHMOUAAuOpLYDEgBxZ4GRTlC1fDnpkM+fOqD6DDj1aZpITp0dtGCDhr+fVuCu3zlg49ijaokTZTo27uG7Gjn2P+hI8+PDPERoUB318bWbfAJ5sUNFcuGRTYUqV/3ogfXp1rWlMc6awJjiAAd2fm4ogXjz56aypOoIde4OE5u/F9x199dlXnnGiHZWEYbGpsAEA3QXYnHwEFliKAgswgJ8LPeiUXGwedCAKABACCN+EA1pYIIYaFlcDhytd51sGAJbo3onOpajiihlO92KHGaUXGwWjUBChjSPiWJuOO/LYIm4v1tXfE6J4gCSJEZ7YgRYUNrkji9P55sF/ogxw5ZkSqIDaZBV6aSGYq/lGZplndkckZ98xoICbTcIJGQAZcNmdmUc210hs35nCyJ58fgmIKX5RQGOZowxaZwYA+JaoKQwswGijBV4C6SiTUmpphMspJx9unX4KaimjDv9aaXOEBteBqmuuxgEHoLX6Kqx+yXqqBANsgCtit4FWQAEkrNbpq7HSOmtwag5w57GrmlJBASEU18ADjUYb3ADTinIttsgSB1oJFfA63bduimuqKB1keqwUhoCSK374wbujvOSu4QG6UvxBRydcpKsav++Ca6G8A6Pr1x2kVMyHwsVxUALDq/krnrhPSOzXG1lUTIoffqGR7Goi2MAxbv6O2kEG56I7CSlRsEFKFVyovDJoIRTg7sugNRDGqCJzJgcKE0ywc0ELm6KBCCJo8DIPFeCWNGcyqNFE06ToAfV0HBRgxsvLThHn1oddQMrXj5DyAQgjEHSAJMWZwS3HPxT/QMbabI/iBCliMLEJKX2EEkomBAUCxRi42VDADxyTYDVogV+wSChqmKxEKCDAYFDFj4OmwbY7bDGdBhtrnTQYOigeChUmc1K3QTnAUfEgGFgAWt88hKA6aCRIXhxnQ1yg3BCayK44EWdkUQcBByEQChFXfCB776aQsG0BIlQgQgE8qO26X1h8cEUep8ngRBnOy74E9QgRgEAC8SvOfQkh7FDBDmS43PmGoIiKUUEGkMEC/PJHgxw0xH74yx/3XnaYRJgMB8obxQW6kL9QYEJ0FIFgByfIL7/IQAlvQwEpnAC7DtLNJCKUoO/w45c44GwCXiAFB/OXAATQryUxdN4LfFiwgjCNYg+kYMIEFkCKDs6PKAIJouyGWMS1FSKJOMRB/BoIxYJIUXFUxNwoIkEKPAgCBZSQHQ1A2EWDfDEUVLyADj5AChSIQW6gu10bE/JG2VnCZGfo4R4d0sdQoBAHhPjhIB94v/wRoRKQWGRHgrhGSQJxCS+0pCZbEhAAOw=="
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "communication#1",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "Practitioner#RNP3",
                  "name": [
                    {
                      "family": "RPLastThree",
                      "given": [
                        "RPThree"
                      ]
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-nurse",
                          "value": process.env.validRegistryID1
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
                      "system": "http://otn.ca/HRMHOSTORG",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "the org"
                }
              ],
              "recipient": [
                {
                  "reference": "Practitioner#RNP3"
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
  const body = await res.text()
  console.log(body)
  expect(body).toContain("1/3 Successful Delivery to EMR")
  expect(body).toContain("2/3 Successful Delivery to EMR")
  expect(body).toContain("3/3 MSH|^~\\\\&||OTNTHC||")
  expect(res.status()).toEqual(200)
})

test('DRA_F15 - DiagnosticReport wrong encounter resourceType', async({page}) => {
  setReport('Functional Tests', 'DRA_F15')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
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
                  "resourceType": "Encont",
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
          "diagnostics": "Pointer to Validation error:#"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#: required key [resourceType] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/1/resourceType: Encont is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/1/resourceType: Encont is not a valid enum value"
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
          "diagnostics": "10 schema violations found"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
})

test('DRA_F16 - DiagnosticReport without Id', async({page}) => {
  setReport('Functional Tests', 'DRA_F16')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey6, process.env.sharedsecret6, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7b",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
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
          "diagnostics": "#/entry/0/resource: required key [id] not found"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/resourceType: DiagnosticReport is not a valid enum value"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource: required key [id] not found"
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

test('DRA_F17 - DiagnosticReport with status="blabla"', async({page}) => {
  setReport('Functional Tests', 'DRA_F17')
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
                  "gender": "undefined",
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
              "status": "blabla",
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
  const body = await res.text()
  console.log(body)
 /* const expected = {
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
          "diagnostics": "#/entry/0/resource/status: blabla is not a valid enum value"
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
    }
      ]
        }
        */
  
  expect(body).toContain("status: blabla is not a valid enum value")
  expect(res.status()).toEqual(400)
})

test('DRA_17-2 - DiagnosticReport with status = "preliminary" DRA-22', async({page}) => {
  setReport('Functional Tests', 'DRA_F17-2')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
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
                    "code": "VR"
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
              "status": "preliminary",
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

test('DRA_F17-3 - DiagnosticReport without status', async({page}) => {
  setReport('Functional Tests', 'DRA_F17-3')
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
                  "gender": "undefined",
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
                    "code": process.env.alidActCode
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
          "diagnostics": "#/entry/0/resource: required key [status] not found"
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

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});