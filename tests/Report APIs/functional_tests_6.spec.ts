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

//Novari(003 004), HRM, emails, patient 
//vRest Folder Daniela
test('DRA_F70 - Novari Sample REFERENCE', async({page}) => {
  setReport('Functional Tests', 'DRA_F70')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
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

test('DRA_70-2 - Novari Sample REFERENCE with non-existent recipient', async({page}) => {
  //Fails because a different message is expected. How to get the physician by an id?
  setReport('Functional Tests', 'DRA_F70-2')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
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
                          "value": "555-555-5551",
                          "use": "home"
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "03456780"
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
                          "value": "03000003"
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

test('DRA_F70-3 - Novari Sample REFERENCE with de-activated recipient', async({page}) => {
  setReport('Functional Tests', 'DRA_F70-3')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
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

test.describe.fixme('DRA_F70-4 - Novari Sample REFERENCE NEW ISSUES HRM-5 2.0 WRONG IDs', () => {
  test('DRA_F70-4 - Novari Sample REFERENCE NEW ISSUES HRM-5 2.0 WRONG IDs', async({page}) => {
    //Fails because a different message is expected. How to get the physician by an id?
  setReport('Functional Tests', 'DRA_F70-4')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "833a5646-9178-448e-a7f3-31b087e6919e",
        "type": "collection",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "aa3f0e0b-aa95-44e8-a117-329214cc8eea",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "555913fa-4a85-4f3d-1479-0c1bc171a12c",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "2342342323 AC"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "555913fa-4a85-4f3d-1479-0c1bc171a12c"
                    }
                  ],
                  "name": [
                    {
                      "family": "Patient",
                      "given": [
                        "Test"
                      ],
                      "prefix": [
                        ""
                      ],
                      "suffix": [
                        ""
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-8310",
                      "use": "home",
                      "rank": 1
                    }
                  ],
                  "gender": "male",
                  "birthDate": "2017-10-04",
                  "address": [
                    {
                      "use": "home",
                      "line": [
                        "123 Erehwon St."
                      ],
                      "city": "Kingston",
                      "state": "ON",
                      "postalCode": "A1A 1A1",
                      "country": "CA"
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "beb15f21-28f8-46de-bfc1-68c793e98ffa",
                  "text": {
                    "status": "generated",
                    "div": "Immediate health concern: Testing - Please Ignore"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "d8038606-dec8-4683-81b2-cc9cd7b6708f",
                      "name": [
                        {
                          "family": "Physician",
                          "given": [
                            "Test2"
                          ],
                          "prefix": [
                            ""
                          ],
                          "suffix": [
                            ""
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "613-531-3008",
                          "use": "home",
                          "rank": 1
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "54134"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "beb15f21-28f8-46de-bfc1-68c793e98ffa"
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
                        "reference": "d8038606-dec8-4683-81b2-cc9cd7b6708f"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-10-10T18:39:18Z",
                    "end": "2017-11-20T13:37:54Z"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "555913fa-4a85-4f3d-1479-0c1bc171a12c"
              },
              "context": {
                "reference": "beb15f21-28f8-46de-bfc1-68c793e98ffa"
              },
              "effectiveDateTime": "2017-11-20T13:37:54Z",
              "conclusion": "Not completed – no response from patient",
              "presentedForm": [
                {
                  "contentType": "application/pdf",
                  "data": "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ci9GbGF0ZURlY29kZT4+c3RyZWFtCnicK1QIVNAPqVBw8nVWcAViACOsBAUKZW5kc3RyZWFtCmVuZG9iagozNSAwIG9iago8PC9UeXBlL1hPYmplY3QvU3VidHlwZS9Gb3JtL1Jlc291cmNlczw8Pj4vQkJveFswIDAgNTAxLjEyIDEzOC42XS9Gb3JtVHlwZSAxL01hdHJpeCBbMSAwIDAgMSAwIDBdL0xlbmd0aCAyMi9GaWx0ZXIvRmxhdGVEZWNvZGU+PnN0cmVhbQp4nCtUCFTQD6lQcPJ1VnAFYgAjrAQFCmVuZHN0cmVhbQplbmRvYmoKMzYgMCBvYmoKPDwvQXV0aG9yKEJsYWluZSBKZW5raW5zKS9Db21wYW55KCkvQ3JlYXRpb25EYXRlKEQ6MjAxNzA3MTgxNTIwNDQtMDQnMDAnKS9DcmVhdG9yKEFjcm9iYXQgUERGTWFrZXIgMTcgZm9yIFdvcmQpL0tleXdvcmRzKCkvTW9kRGF0ZShEOjIwMTcxMTIwMDgzODI4LTA1JzAwJykvUHJvZHVjZXIoQWRvYmUgUERGIExpYnJhcnkgMTUuMDsgbW9kaWZpZWQgdXNpbmcgaVRleHRTaGFycJIgNS41LjExIKkyMDAwLTIwMTcgaVRleHQgR3JvdXAgTlYgXChBR1BMLXZlcnNpb25cKSkvU291cmNlTW9kaWZpZWQoRDoyMDE3MDcxODE5MTk1NikvVGl0bGUoTWVkaWNhbCBvZmZpY2UgcmVnaXN0cmF0aW9uIGZvcm0pL19UZW1wbGF0ZUlEKFRDMDEwMjMzOTQxMDMzKT4+CmVuZG9iagozNyAwIG9iago8PC9MZW5ndGggMzY4MC9UeXBlL01ldGFkYXRhL1N1YnR5cGUvWE1MPj5zdHJlYW0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4xLjAtamMwMDMiPgogIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIgogICAgICAgIHhtbG5zOnBkZng9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmeC8xLjMvIgogICAgICAgIHhtbG5zOmFkaG9jd2Y9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWNyb2JhdEFkaG9jV29ya2Zsb3cvMS4wLyIKICAgICAgeG1wOk1vZGlmeURhdGU9IjIwMTctMTEtMjBUMDg6Mzg6MjgtMDU6MDAiCiAgICAgIHhtcDpDcmVhdGVEYXRlPSIyMDE3LTA3LTE4VDE1OjIwOjQ0LTA0OjAwIgogICAgICB4bXA6TWV0YWRhdGFEYXRlPSIyMDE3LTExLTIwVDA4OjM4OjI4LTA1OjAwIgogICAgICB4bXA6Q3JlYXRvclRvb2w9IkFjcm9iYXQgUERGTWFrZXIgMTcgZm9yIFdvcmQiCiAgICAgIHhtcE1NOkRvY3VtZW50SUQ9InV1aWQ6ZDU4Y2NlNWItZmY3OC00ZDM1LWJlMGItMWY1ODM3NjhmNmRmIgogICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ1dWlkOjRkYTllNDRhLWY5YTctNGFlYS05MzMzLWY2OGVhMjk0MGE2ZSIKICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi9wZGYiCiAgICAgIHBkZjpQcm9kdWNlcj0iQWRvYmUgUERGIExpYnJhcnkgMTUuMDsgbW9kaWZpZWQgdXNpbmcgaVRleHRTaGFycOKEoiA1LjUuMTEgwqkyMDAwLTIwMTcgaVRleHQgR3JvdXAgTlYgKEFHUEwtdmVyc2lvbikiCiAgICAgIHBkZjpLZXl3b3Jkcz0iIgogICAgICBwZGZ4OlNvdXJjZU1vZGlmaWVkPSJEOjIwMTcwNzE4MTkxOTU2IgogICAgICBwZGZ4OkNvbXBhbnk9IiIKICAgICAgcGRmeDpfVGVtcGxhdGVJRD0iVEMwMTAyMzM5NDEwMzMiCiAgICAgIGFkaG9jd2Y6c3RhdGU9IjEiCiAgICAgIGFkaG9jd2Y6dmVyc2lvbj0iMS4xIj4KICAgICAgPHhtcE1NOnN1YmplY3Q+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICA8cmRmOmxpPjM8L3JkZjpsaT4KICAgICAgICA8L3JkZjpTZXE+CiAgICAgIDwveG1wTU06c3ViamVjdD4KICAgICAgPGRjOnRpdGxlPgogICAgICAgIDxyZGY6QWx0PgogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5NZWRpY2FsIG9mZmljZSByZWdpc3RyYXRpb24gZm9ybTwvcmRmOmxpPgogICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPGRjOmNyZWF0b3I+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICA8cmRmOmxpPkJsYWluZSBKZW5raW5zPC9yZGY6bGk+CiAgICAgICAgPC9yZGY6U2VxPgogICAgICA8L2RjOmNyZWF0b3I+CiAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4KZW5kc3RyZWFtCmVuZG9iagozOCAwIG9iago8PC9Bbm5vdHMgMzkgMCBSL0NvbnRlbnRzIDQwIDAgUi9Dcm9wQm94WzAuMCAwLjAgNjEyLjAgNzkyLjBdL01lZGlhQm94WzAuMCAwLjAgNjEyLjAgNzkyLjBdL1BhcmVudCA0MSAw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agpbNTUgMCBSXQplbmRvYmoKNTYgMCBvYmoKPDwvQXNjZW50IDk5OC9DYXBIZWlnaHQgNzE2L0Rlc2NlbnQgLTMyNS9GbGFncyA5Ni9Gb250QkJveFstNTE3IC0zMjUgMTM1OSA5OThdL0ZvbnRGYW1pbHkoQXJpYWwpL0ZvbnROYW1lL0FyaWFsLUl0YWxpY01UL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDQwMC9JdGFsaWNBbmdsZSAtMTIvU3RlbVYgOTIvVHlwZS9Gb250RGVzY3JpcHRvci9YSGVpZ2h0IDUxOT4+CmVuZG9iago0IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS9OYW1lL0hlbHYvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQvRW5jb2RpbmcgNTcgMCBSPj4KZW5kb2JqCjUzIDAgb2JqCjw8L0YgNC9NSzw8Pj4vUCAzOCAwIFIvUGFyZW50IDU4IDAgUi9SZWN0WzY4Ljc3MyAxMzEuMDQgMjE4Ljc3MyAxNDIuOTk0XS9TdWJ0eXBlL1dpZGdldC9UeXBlL0Fubm90L0FQPDwvTiAyMiAwIFI+Pj4+CmVuZG9iago0MyAwIG9iago8PC9CYXNlRm9udC9FQUNESFYrQXJpYWxNVC9EZXNjZW5kYW50Rm9udHMgNTQgMCBSL0VuY29kaW5nL0lkZW50aXR5LUgvU3VidHlwZS9UeXBlMC9Ub1VuaWNvZGUgNDcgMCBSL1R5cGUvRm9udD4+CmVuZG9iago0NiAwIG9iago8PC9CYXNlRm9udC9BcmlhbC1JdGFsaWNNVC9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRmlyc3RDaGFyIDAvRm9udERlc2NyaXB0b3IgNTYgMCBSL0xhc3RDaGFyIDI1NS9TdWJ0eXBlL1RydWVUeXBlL1R5cGUvRm9udC9XaWR0aHNbNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAyNzggMjc4IDM1NSA1NTYgNTU2IDg4OSA2NjcgMTkxIDMzMyAzMzMgMzg5IDU4NCAyNzggMzMzIDI3OCAyNzggNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDI3OCAyNzggNTg0IDU4NCA1ODQgNTU2IDEwMTUgNjY3IDY2NyA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTAwIDY2NyA1NTYgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgNjY3IDk0NCA2NjcgNjY3IDYxMSAyNzggMjc4IDI3OCA0NjkgNTU2IDMzMyA1NTYgNTU2IDUwMCA1NTYgNTU2IDI3OCA1NTYgNTU2IDIyMiAyMjIgNTAwIDIyMiA4MzMgNTU2IDU1NiA1NTYgNTU2IDMzMyA1MDAgMjc4IDU1NiA1MDAgNzIyIDUwMCA1MDAgNTAwIDMzNCAyNjAgMzM0IDU4NCAzNTAgNTU2IDM1MCAyMjIgNTU2IDMzMyAxMDAwIDU1NiA1NTYgMzMzIDEwMDAgNjY3IDMzMyAxMDAwIDM1MCA2MTEgMzUwIDM1MCAyMjIgMjIyIDMzMyAzMzMgMzUwIDU1NiAxMDAwIDMzMyAxMDAwIDUwMCAzMzMgOTQ0IDM1MCA1MDAgNjY3IDI3OCAzMzMgNTU2IDU1NiA1NTYgNTU2IDI2MCA1NTYgMzMzIDczNyAzNzAgNTU2IDU4NCAzMzMgNzM3IDU1MiA0MDAgNTQ5IDMzMyAzMzMgMzMzIDU3NiA1MzcgMzMzIDMzMyAzMzMgMzY1IDU1NiA4MzQgODM0IDgzNCA2MTEgNjY3IDY2NyA2NjcgNjY3IDY2NyA2NjcgMTAwMCA3MjIgNjY3IDY2NyA2NjcgNjY3IDI3OCAyNzggMjc4IDI3OCA3MjIgNzIyIDc3OCA3NzggNzc4IDc3OCA3NzggNTg0IDc3OCA3MjIgNzIyIDcyMiA3MjIgNjY3IDY2NyA2MTEgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODg5IDUwMCA1NTYgNTU2IDU1NiA1NTYgMjc4IDI3OCAyNzggMjc4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NDkgNjExIDU1NiA1NTYgNTU2IDU1NiA1MDAgNTU2IDUwMF0+PgplbmRvYmoKNTcgMCBvYmoKPDwvRGlmZmVyZW5jZXNbMjQvYnJldmUvY2Fyb24vY2lyY3VtZmxleC9kb3RhY2NlbnQvaHVuZ2FydW1sYXV0L29nb25lay9yaW5nL3RpbGRlIDM5L3F1b3Rlc2luZ2xlIDk2L2dyYXZlIDEyOC9idWxsZXQvZGFnZ2VyL2RhZ2dlcmRibC9lbGxpcHNpcy9lbWRhc2gvZW5kYXNoL2Zsb3Jpbi9mcmFjdGlvbi9ndWlsc2luZ2xsZWZ0L2d1aWxzaW5nbHJpZ2h0L21pbnVzL3BlcnRob3VzYW5kL3F1b3RlZGJsYmFzZS9xdW90ZWRibGxlZnQvcXVvdGVkYmxyaWdodC9xdW90ZWxlZnQvcXVvdGVyaWdodC9xdW90ZXNpbmdsYmFzZS90cmFkZW1hcmsvZmkvZmwvTHNsYXNoL09FL1NjYXJvbi9ZZGllcmVzaXMvWmNhcm9uL2RvdGxlc3NpL2xzbGFzaC9vZS9zY2Fyb24vemNhcm9uIDE2MC9FdXJvIDE2NC9jdXJyZW5jeSAxNjYvYnJva2VuYmFyIDE2OC9kaWVyZXNpcy9jb3B5cmlnaHQvb3JkZmVtaW5pbmUgMTcyL2xvZ2ljYWxub3QvLm5vdGRlZi9yZWdpc3RlcmVkL21hY3Jvbi9kZWdyZWUvcGx1c21pbnVzL3R3b3N1cGVyaW9yL3RocmVlc3VwZXJpb3IvYWN1dGUvbXUgMTgzL3BlcmlvZGNlbnRlcmVkL2NlZGlsbGEvb25lc3VwZXJpb3Ivb3JkbWFzY3VsaW5lIDE4OC9vbmVxdWFydGVyL29uZWhhbGYvdGhyZWVxdWFydGVycyAxOTIvQWdyYXZlL0FhY3V0ZS9BY2lyY3VtZmxleC9BdGlsZGUvQWRpZXJlc2lzL0FyaW5nL0FFL0NjZWRpbGxhL0VncmF2ZS9FYWN1dGUvRWNpcmN1bWZsZXgvRWRpZXJlc2lzL0lncmF2ZS9JYWN1dGUvSWNpcmN1bWZsZXgvSWRpZXJlc2lzL0V0aC9OdGlsZGUvT2dyYXZlL09hY3V0ZS9PY2lyY3VtZmxleC9PdGlsZGUvT2RpZXJlc2lzL211bHRpcGx5L09zbGFzaC9VZ3JhdmUvVWFjdXRlL1VjaXJjdW1mbGV4L1VkaWVyZXNpcy9ZYWN1dGUvVGhvcm4vZ2VybWFuZGJscy9hZ3JhdmUvYWFjdXRlL2FjaXJjdW1mbGV4L2F0aWxkZS9hZGllcmVzaXMvYXJpbmcvYWUvY2NlZGlsbGEvZWdyYXZlL2VhY3V0ZS9lY2lyY3VtZmxleC9lZGllcmVzaXMvaWdyYXZlL2lhY3V0ZS9pY2lyY3VtZmxleC9pZGllcmVzaXMvZXRoL250aWxkZS9vZ3JhdmUvb2FjdXRlL29jaXJjdW1mbGV4L290aWxkZS9vZGllcmVzaXMvZGl2aWRlL29zbGFzaC91Z3JhdmUvdWFjdXRlL3VjaXJjdW1mbGV4L3VkaWVyZXNpcy95YWN1dGUvdGhvcm4veWRpZXJlc2lzXS9UeXBlL0VuY29kaW5nPj4KZW5kb2JqCjUyIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA0MDk2L01LPDw+Pi9QIDM4IDAgUi9SZWN0WzU0Ljc3NDUgMzU0Ljk2IDU1Ny4xODIgNjkwLjA4NV0vU3VidHlwZS9XaWRnZXQvVChDaGFydE5vdGVzKS9UVShDaGFydCBOb3RlcykvVHlwZS9Bbm5vdC9WKCkvQVA8PC9OIDM0IDAgUj4+Pj4KZW5kb2JqCjUwIDAgb2JqCjw8L0FQPDwvTiAzNSAwIFI+Pi9EQSgvSGVsdiAgMCBUZiAwIGcpL0RSPDwvRW5jb2Rpbmc8PC9QREZEb2NFbmNvZGluZyA1NyAwIFI+Pi9Gb250PDwvSGVsdiA0IDAgUj4+Pj4vRiA0L0ZUL1R4L0ZmIDQwOTYvUCAzOCAwIFIvUmVjdFs1NS41NiAxNzguNDggNTU2LjY4IDMxNy4wOF0vU3VidHlwZS9XaWRnZXQvVChBY3Rpb25zKS9UVShBY3Rpb25zOikvVHlwZS9Bbm5vdC9WKCk+PgplbmRvYmoKNTEgMCBvYmoKPDwvREEoL0hlbHYgMTIgVGYgMCBnKS9EUjw8L0VuY29kaW5nPDwvUERGRG9jRW5jb2RpbmcgNTcgMCBSPj4vRm9udDw8L0hlbHYgNCAwIFI+Pj4+L0YgNC9NSzw8Pj4vUCAzOCAwIFIvUGFyZW50IDU5IDAgUi9SZWN0WzM5Ny40NCAxNDcuNiA1NDguMjggMTY4LjI0N10vU3VidHlwZS9XaWRnZXQvVHlwZS9Bbm5vdC9BUDw8L04gMyAwIFI+Pj4+CmVuZG9iago2MCAwIG9iago8PC9Db3VudCA0L0ZpcnN0IDYxIDAgUi9MYXN0IDYyIDAgUi9UeXBlL091dGxpbmVzPj4KZW5kb2JqCjYxIDAgb2JqCjw8L0EgNjMgMCBSL05leHQgNjQgMCBSL1BhcmVudCA2MCAwIFIvVGl0bGUo/v8AUABBAFQASQBFAE4AVAAgAEkATgBGAE8AUgBNAEEAVABJAE8ATik+PgplbmRvYmoKNjIgMCBvYmoKPDwvQSA2NSAwIFIvUGFyZW50IDYwIDAgUi9QcmV2IDY2IDAgUi9UaXRsZSj+/wBQAEgAWQBTAEkAQwBJAEEATgAgAEkATgBGAE8AUgBNAEEAVABJAE8ATik+PgplbmRvYmoKNjUgMCBvYmoKPDwvRFszOCAwIFIvWFlaIDIzNyA3MjYgbnVsbF0vUy9Hb1RvPj4KZW5kb2JqCjY2IDAgb2JqCjw8L0EgNjcgMCBSL05leHQgNjIgMCBSL1BhcmVudCA2MCAwIFIvUHJldiA2NCAwIFIvVGl0bGUo/v8ARQBOAEMATwBVAE4AVABFAFIAIABEAEUAVABBAEkATABTKT4+CmVuZG9iago2NyAwIG9iago8PC9EWzY4IDAgUi9YWVogMjQ4IDMyNSBudWxsXS9TL0dvVG8+PgplbmRvYmoKNjQgMCBvYmoKPDwvQSA2OSAwIFIvTmV4dCA2NiAwIFIvUGFyZW50IDYwIDAgUi9QcmV2IDYxIDAgUi9UaXRsZSj+/wBFAE4AQwBPAFUATgBUAEUAUgBJAE4ARwAgAFAASABZAFMASQBDAEkAQQBOACAASQBOAEYATwBSAE0AQQBUAEkATwBOKT4+CmVuZG9iago2OSAwIG9iago8PC9EWzY4IDAgUi9YWVogMTkzIDQ2MCBudWxsXS9TL0dvVG8+PgplbmRvYmoKNjMgMCBvYmoKPDwvRFs2OCAwIFIvWFlaIDI0NCA2NDIgbnVsbF0vUy9Hb1RvPj4KZW5kb2JqCjU5IDAgb2JqCjw8L0ZUL1R4L0ZmIDgzODg2MDgvS2lkc1s3MCAwIFIgNTEgMCBSXS9UKERhdGUpL1RVKERhdGU6KS9WKE5vdiAyMCwgMjAxNyk+PgplbmRvYmoKNTggMCBvYmoKPDwvRlQvVHgvRmYgODM4ODYwOC9LaWRzWzcxIDAgUiA1MyAwIFJdL1QoRW5jb3VudGVyaW5nUGh5c2ljaWFuTmFtZSkvVFUoQ29tbXVuaXR5IFBoeXNpY2lhbiBOYW1lOikvVihUZXN0MiBQaHlzaWNpYW4pPj4KZW5kb2JqCjcyIDAgb2JqCjw8L0Jhc2VGb250L0Vkd2FyZGlhblNjcmlwdElUQy9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRmlyc3RDaGFyIDAvRm9udERlc2NyaXB0b3IgNzMgMCBSL0xhc3RDaGFyIDI1NS9OYW1lL0Vkd2FyZGlhblNjcmlwdElUQy9TdWJ0eXBlL1RydWVUeXBlL1R5cGUvRm9udC9XaWR0aHNbNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCAxNzcgMjg3IDQ3OCA0NzggNDc4IDUzNSA4ODkgMzIxIDQzOSA0MzkgMjc4IDUyMyAyMjMgMzU4IDIyMyA1MjkgNDc4IDQ3OCA0NzggNDc4IDQ3OCA0NzggNDc4IDQ3OCA0NzggNDc4IDIyMyAyMjMgNTIzIDUyMyA1MjMgNDM2IDY4MCA5MDggOTI5IDc5NyA4NDcgODQxIDY2MCA3MzQgODYzIDYzOCA1NjMgODgxIDc1OSA5NzggODcxIDc5MyA3NjkgNzAyIDkyNSA3MDcgNTg3IDkwMSA3NDkgOTI0IDEwMDQgOTMxIDY1MyA0MzkgNTI5IDQzOSA1MDAgNTAwIDUwMCAzNDQgMjYzIDI0MiAzNDQgMjQ2IDEzMyAzMzUgMzEzIDE2OCAxNTEgMzAxIDE2MCA1NDQgMzkxIDI5MCAyNjUgMjg5IDI3OCAxOTUgMTY1IDMxMyAyNzMgNDI0IDM0OCAzMDggMjc5IDQzOSA1MDAgNDM5IDY2NyA2NjkgNDc4IDY2OSAyMDkgNDc4IDMwMSA2NjggNDc4IDQ3OCA1MDAgNzMxIDcwNyAyNDkgMTE2OCA2NjkgNzkzIDY2OSA2NjkgMjA5IDIwOSAzMDEgMzAxIDY2OSA0NDUgNTk3IDUwMCA3NzUgMTk1IDI0OSA0MTYgNjY5IDkwMSA5MzEgMTc3IDI4NyA0NzggNDc4IDUwOCA0NzggNTAwIDQ3OCA1MDAgNzY4IDM0NCAzNTggNjAxIDM1OCA3NjggNTAwIDQ3OCA1MjMgMzE4IDMxOCA1MDAgMzQ4IDgyNyAyMzEgNTAwIDMxOCAzNDQgMzU4IDY2NyA2NTAgNjU5IDQzNiA5MDggOTA4IDkwOCA5MDggOTA4IDkwOCAxMjkxIDc5NyA4NDEgODQxIDg0MSA4NDEgNjM4IDYzOCA2MzggNjM4IDg0NyA4NzEgNzkzIDc5MyA3OTMgNzkzIDc5MyA1MjMgNzkzIDkwMSA5MDEgOTAxIDkwMSA5MzEgNzQ4IDI5MSAzNDQgMzQ0IDM0NCAzNDQgMzQ0IDM0NCA0NDAgMjQyIDI0NiAyNDYgMjQ2IDI0NiAxNjggMTY4IDE2OCAxNjggMjkwIDM5MSAyOTAgMjkwIDI5MCAyOTAgMjkwIDUyMyAyOTAgMzEzIDMxMyAzMTMgMzEzIDMwOCAyNjEgMzA4XT4+CmVuZG9iagoyIDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS9FbmNvZGluZyA3NCAwIFIvTmFtZS9IZWx2L1N1YnR5cGUvVHlwZTEvVHlwZS9Gb250Pj4KZW5kb2JqCjc1IDAgb2JqCjw8L0Jhc2VGb250L1phcGZEaW5nYmF0cy9OYW1lL1phRGIvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQ+PgplbmRvYmoKNzQgMCBvYmoKPDwvRGlmZmVyZW5jZXNbMjQvYnJldmUvY2Fyb24vY2lyY3VtZmxleC9kb3RhY2NlbnQvaHVuZ2FydW1sYXV0L29nb25lay9yaW5nL3RpbGRlIDM5L3F1b3Rlc2luZ2xlIDk2L2dyYXZlIDEyOC9idWxsZXQvZGFnZ2VyL2RhZ2dlcmRibC9lbGxpcHNpcy9lbWRhc2gvZW5kYXNoL2Zsb3Jpbi9mcmFjdGlvbi9ndWlsc2luZ2xsZWZ0L2d1aWxzaW5nbHJpZ2h0L21pbnVzL3BlcnRob3VzYW5kL3F1b3RlZGJsYmFzZS9xdW90ZWRibGxlZnQvcXVvdGVkYmxyaWdodC9xdW90ZWxlZnQvcXVvdGVyaWdodC9xdW90ZXNpbmdsYmFzZS90cmFkZW1hcmsvZmkvZmwvTHNsYXNoL09FL1NjYXJvbi9ZZGllcmVzaXMvWmNhcm9uL2RvdGxlc3NpL2xzbGFzaC9vZS9zY2Fyb24vemNhcm9uIDE2MC9FdXJvIDE2NC9jdXJyZW5jeSAxNjYvYnJva2VuYmFyIDE2OC9kaWVyZXNpcy9jb3B5cmlnaHQvb3JkZmVtaW5pbmUgMTcyL2xvZ2ljYWxub3QvLm5vdGRlZi9yZWdpc3RlcmVkL21hY3Jvbi9kZWdyZWUvcGx1c21pbnVzL3R3b3N1cGVyaW9yL3RocmVlc3VwZXJpb3IvYWN1dGUvbXUgMTgzL3BlcmlvZGNlbnRlcmVkL2NlZGlsbGEvb25lc3VwZXJpb3Ivb3JkbWFzY3VsaW5lIDE4OC9vbmVxdWFydGVyL29uZWhhbGYvdGhyZWVxdWFydGVycyAxOTIvQWdyYXZlL0FhY3V0ZS9BY2lyY3VtZmxleC9BdGlsZGUvQWRpZXJlc2lzL0FyaW5nL0FFL0NjZWRpbGxhL0VncmF2ZS9FYWN1dGUvRWNpcmN1bWZsZXgvRWRpZXJlc2lzL0lncmF2ZS9JYWN1dGUvSWNpcmN1bWZsZXgvSWRpZXJlc2lzL0V0aC9OdGlsZGUvT2dyYXZlL09hY3V0ZS9PY2lyY3VtZmxleC9PdGlsZGUvT2RpZXJlc2lzL211bHRpcGx5L09zbGFzaC9VZ3JhdmUvVWFjdXRlL1VjaXJjdW1mbGV4L1VkaWVyZXNpcy9ZYWN1dGUvVGhvcm4vZ2VybWFuZGJscy9hZ3JhdmUvYWFjdXRlL2FjaXJjdW1mbGV4L2F0aWxkZS9hZGllcmVzaXMvYXJpbmcvYWUvY2NlZGlsbGEvZWdyYXZlL2VhY3V0ZS9lY2lyY3VtZmxleC9lZGllcmVzaXMvaWdyYXZlL2lhY3V0ZS9pY2lyY3VtZmxleC9pZGllcmVzaXMvZXRoL250aWxkZS9vZ3JhdmUvb2FjdXRlL29jaXJjdW1mbGV4L290aWxkZS9vZGllcmVzaXMvZGl2aWRlL29zbGFzaC91Z3JhdmUvdWFjdXRlL3VjaXJjdW1mbGV4L3VkaWVyZXNpcy95YWN1dGUvdGhvcm4veWRpZXJlc2lzXS9UeXBlL0VuY29kaW5nPj4KZW5kb2JqCjczIDAgb2JqCjw8L0FzY2VudCA4NTEvQ2FwSGVpZ2h0IDY0MC9EZXNjZW50IC0zMjgvRmxhZ3MgMzIvRm9udEJCb3hbLTMyMiAtMzI4IDE2OTIgODUxXS9Gb250RmFtaWx5KEVkd2FyZGlhbiBTY3JpcHQgSVRDKS9Gb250RmlsZTIgNDkgMCBSL0ZvbnROYW1lL0Vkd2FyZGlhblNjcmlwdElUQy9Gb250U3RyZXRjaC9Ob3JtYWwvRm9udFdlaWdodCA0MDAvSXRhbGljQW5nbGUgMC9TdGVtViA1Mi9UeXBlL0ZvbnREZXNjcmlwdG9yL1hIZWlnaHQgMjY1Pj4KZW5kb2JqCjc2IDAgb2JqCjw8L0NsYXNzTWFwIDc3IDAgUi9LIDc4IDAgUi9QYXJlbnRUcmVlIDc5IDAgUi9QYXJlbnRUcmVlTmV4dEtleSAyL1JvbGVNYXAgODAgMCBSL1R5cGUvU3RydWN0VHJlZVJvb3Q+PgplbmRvYmoKNzcgMCBvYmoKPDw+PgplbmRvYmoKNzggMCBvYmoKPDwvS1s4MSAwIFIgODIgMCBSIDgzIDAgUiA4NCAwIFIgODUgMCBSIDg2IDAgUiA4NyAwIFJdL1AgNzYgMCBSL1MvU2VjdD4+CmVuZG9iago3OSAwIG9iago8PC9OdW1zWzAgODggMCBSIDEgODkgMCBSXT4+CmVuZG9iago4MCAwIG9iago8PC9Bbm5vdGF0aW9uL1NwYW4vQXJ0aWZhY3QvUC9CaWJsaW9ncmFwaHkvQmliRW50cnkvQ2VudGVyZWQvUC9DaGFydC9GaWd1cmUvRGlhZ3JhbS9GaWd1cmUvRHJvcENhcC9GaWd1cmUvRW5kbm90ZS9Ob3RlL0Zvb3Rub3RlL05vdGUvSGVhZGluZyMyMDEvSDEvSGVhZGluZyMyMDIvUC9JbmxpbmVTaGFwZS9GaWd1cmUvSXRhbGljL1AvTGlzdCMyMFBhcmFncmFwaC9QL05vcm1hbC9QL091dGxpbmUvU3Bhbi9TdHJpa2VvdXQvU3Bhbi9TdWJzY3JpcHQvU3Bhbi9TdXBlcnNjcmlwdC9TcGFuL1RleHRCb3gvQXJ0L1VuZGVybGluZS9TcGFuPj4KZW5kb2JqCjg4IDAgb2JqCls4MSAwIFIgOTAgMCBSIDkxIDAgUiA5MiAwIFIgOTMgMCBSIDk0IDAgUiA5NSAwIFIgOTYgMCBSIDk3IDAgUiA5OCAwIFIgOTkgMCBSIDEwMCAwIFIgMTAxIDAgUiAxMDIgMCBSIDEwMyAwIFIgMTA0IDAgUiAxMDUgMCBSIDEwNiAwIFIgMTA3IDAgUiAxMDggMCBSIDEwOSAwIFIgMTEwIDAgUiAxMTEgMCBSIDExMiAwIFIgMTEzIDAgUiAxMTQgMCBSIDExNSAwIFIgMTE2IDAgUiAxMTcgMCBSIDExOCAwIFIgMTE5IDAgUiAxMjAgMCBSIDEyMSAwIFIgMTIyIDAgUiAxMjMgMCBSIDEyNCAwIFIgMTI1IDAgUiAxMjYgMCBSIDEyNyAwIFIgMTI4IDAgUiAxMjkgMCBSIDEzMCAwIFIgMTMxIDAgUiAxMzIgMCBSIDEzMyAwIFIgMTM0IDAgUiAxMzUgMCBSIDEzNiAwIFIgMTM3IDAgUiAxMzggMCBSIDEzOSAwIFIgMTQwIDAgUiAxNDEgMCBSIDE0MiAwIFIgMTQzIDAgUiAxNDQgMCBSIDE0NSAwIFIgMTQ2IDAgUiAxNDcgMCBSIDE0OCAwIFIgMTQ5IDAgUiAxNTAgMCBSIDE1MSAwIFIgMTUyIDAgUiAxNTMgMCBSIDE1NCAwIFIgMTU1IDAgUiAxNTYgMCBSIDE1NyAwIFIgMTU4IDAgUiAxNTkgMCBSIDE2MCAwIFIgMTYxIDAgUiAxNjIgMCBSIDE2MyAwIFIgMTY0IDAgUiAxNjUgMCBSIDE2NiAwIFIgMTY3IDAgUiAxNjggMCBSIDE2OSAwIFIgMTcwIDAgUiAxNzEgMCBSIDE3MiAwIFIgMTczIDAgUiAxNzQgMCBSIDE3NSAwIFIgMTc2IDAgUiAxNzcgMCBSIDE3OCAwIFIgMTc5IDAgUiAxODAgMCBSIDE4MSAwIFIgMTgyIDAgUiAxODMgMCBSIDE4NCAwIFIgMTg1IDAgUiAxODYgMCBSIDE4NyAwIFIgMTg4IDAgUiAxODkgMCBSIDE5MCAwIFIgMTkxIDAgUiAxOTIgMCBSIDE5MyAwIFIgMTk0IDAgUiAxOTUgMCBSIDE5NiAwIFIgMTk3IDAgUiAxOTggMCBSIDE5OSAwIFIgMjAwIDAgUiAyMDEgMCBSIDIwMiAwIFIgMjAzIDAgUiAyMDQgMCBSIDIwNSAwIFIgMjA2IDAgUiAyMDcgMCBSIDIwOCAwIFIgODUgMCBSIDgzIDAgUl0KZW5kb2JqCjg5IDAgb2JqClsyMDkgMCBSIDIxMCAwIFIgMjExIDAgUiAyMTIgMCBSIDIxMyAwIFIgMjE0IDAgUiAyMTUgMCBSIDIxNiAwIFIgMjE3IDAgUiAyMTggMCBSIDIxOSAwIFIgMjIwIDAgUiAyMjEgMCBSIDIyMiAwIFIgMjIzIDAgUiAyMjQgMCBSIDIyNSAwIFIgMjI2IDAgUiAyMjcgMCBSIDIyOCAwIFIgMjI5IDAgUiAyMzAgMCBSIDIzMSAwIFIgMjMyIDAgUiAyMzMgMCBSIDIzNCAwIFIgMjM1IDAgUiAyMzYgMCBSIDIzNyAwIFIgMjM4IDAgUiAyMzkgMCBSIDI0MCAwIFIgMjQxIDAgUiAyNDIgMCBSIDI0MyAwIFIgMjQ0IDAgUiAyNDUgMCBSIDI0NiAwIFIgMjQ3IDAgUiAyNDggMCBSIDI0OSAwIFIgMjUwIDAgUiAyNTEgMCBSIDI1MiAwIFIgMjUzIDAgUiAyNTQgMCBSIDI1NSAwIFIgMjU2IDAgUiAyNTcgMCBSIDI1OCAwIFIgMjU5IDAgUiAyNjAgMCBSIDI2MSAwIFIgMjYyIDAgUiAyNjMgMCBSIDI2NCAwIFIgMjY1IDAgUiAyNjYgMCBSIDI2NyAwIFIgMjY4IDAgUiAyNjkgMCBSIDI3MCAwIFIgMjcxIDAgUiAyNzIgMCBSIDI3MyAwIFIgMjc0IDAgUiAyNzUgMCBSIDI3NiAwIFIgMjc3IDAgUiAyNzggMCBSIDI3OSAwIFIgMjgwIDAgUiAyODEgMCBSIDI4MiAwIFIgMjgzIDAgUiAyODQgMCBSIDg3IDAgUl0KZW5kb2JqCjIwOSAwIG9iago8PC9BIDI4NSAwIFIvS1swIDBdL0xhbmcoRU4tVVMpL1AgMjg2IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjEwIDAgb2JqCjw8L0EgMjg3IDAgUi9LWzEgMV0vTGFuZyhFTi1VUykvUCAyODYgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMTEgMCBvYmoKPDwvS1syIDJdL1AgMjg4IDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyMTIgMCBvYmoKPDwvQSAyODkgMCBSL0tbMyAzXS9QIDI5MCAwIFIvUGcgMzggMCBSL1MvSGVhZGluZyMyMDI+PgplbmRvYmoKMjEzIDAgb2JqCjw8L0EgMjkxIDAgUi9LWzQgNF0vTGFuZyhFTi1VUykvUCAyOTAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMTQgMCBvYmoKPDwvS1s1IDVdL1AgMjkyIDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyMTUgMCBvYmoKPDwvQSAyOTMgMCBSL0tbNiA2XS9MYW5nKEVOLVVTKS9QIDI5NCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIxNiAwIG9iago8PC9LWzcgN10vUCAyOTUgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjIxNyAwIG9iago8PC9BIDI5NiAwIFIvS1s4IDhdL0xhbmcoRU4tVVMpL1AgMjk3IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjE4IDAgb2JqCjw8L0EgMjk4IDAgUi9LWzkgOV0vTGFuZyhFTi1VUykvUCAyOTcgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMTkgMCBvYmoKPDwvQSAyOTkgMCBSL0tbMTAgMTBdL0xhbmcoRU4tVVMpL1AgMjk3IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjIwIDAgb2JqCjw8L0EgMzAwIDAgUi9LWzExIDExXS9MYW5nKEVOLVVTKS9QIDI5NyAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIyMSAwIG9iago8PC9BIDMwMSAwIFIvS1sxMiAxMl0vTGFuZyhFTi1VUykvUCAyOTcgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMjIgMCBvYmoKPDwvS1sxMyAxM10vUCAzMDIgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjIyMyAwIG9iago8PC9BIDMwMyAwIFIvS1sxNCAxNF0vTGFuZyhFTi1VUykvUCAzMDQgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMjQgMCBvYmoKPDwvQSAzMDUgMCBSL0tbMTUgMTVdL0xhbmcoRU4tVVMpL1AgMzA0IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjI1IDAgb2JqCjw8L0EgMzA2IDAgUi9LWzE2IDE2XS9MYW5nKEVOLVVTKS9QIDMwNCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIyNiAwIG9iago8PC9BIDMwNyAwIFIvS1sxNyAxN10vTGFuZyhFTi1VUykvUCAzMDQgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMjcgMCBvYmoKPDwvQSAzMDggMCBSL0tbMTggMThdL0xhbmcoRU4tVVMpL1AgMzA0IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjI4IDAgb2JqCjw8L0EgMzA5IDAgUi9LWzE5IDE5XS9MYW5nKEVOLVVTKS9QIDMwNCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIyOSAwIG9iago8PC9LWzIwIDIwXS9QIDMxMCAwIFIvUGcgMzggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMjMwIDAgb2JqCjw8L0EgMzExIDAgUi9LWzIxIDIxXS9MYW5nKEVOLVVTKS9QIDMxMiAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIzMSAwIG9iago8PC9BIDMxMyAwIFIvS1syMiAyMl0vTGFuZyhFTi1VUykvUCAzMTIgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMzIgMCBvYmoKPDwvQSAzMTQgMCBSL0tbMjMgMjNdL0xhbmcoRU4tVVMpL1AgMzEyIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjMzIDAgb2JqCjw8L0EgMzE1IDAgUi9LWzI0IDI0XS9MYW5nKEVOLVVTKS9QIDMxMiAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIzNCAwIG9iago8PC9BIDMxNiAwIFIvS1syNSAyNV0vTGFuZyhFTi1VUykvUCAzMTIgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMzUgMCBvYmoKPDwvQSAzMTcgMCBSL0tbMjYgMjZdL0xhbmcoRU4tVVMpL1AgMzEyIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjM2IDAgb2JqCjw8L0tbMjcgMjddL1AgMzE4IDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyMzcgMCBvYmoKPDwvQSAzMTkgMCBSL0tbMjggMjhdL0xhbmcoRU4tVVMpL1AgMzIwIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjM4IDAgb2JqCjw8L0EgMzIxIDAgUi9LWzI5IDI5XS9MYW5nKEVOLVVTKS9QIDMyMCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIzOSAwIG9iago8PC9BIDMyMiAwIFIvS1szMCAzMF0vTGFuZyhFTi1VUykvUCAzMjAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNDAgMCBvYmoKPDwvQSAzMjMgMCBSL0tbMzEgMzFdL0xhbmcoRU4tVVMpL1AgMzIwIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjQxIDAgb2JqCjw8L0EgMzI0IDAgUi9LWzMyIDMyXS9MYW5nKEVOLVVTKS9QIDMyMCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI0MiAwIG9iago8PC9BIDMyNSAwIFIvS1szMyAzM10vTGFuZyhFTi1VUykvUCAzMjAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNDMgMCBvYmoKPDwvS1szNCAzNF0vUCAzMjYgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjI0NCAwIG9iago8PC9BIDMyNyAwIFIvS1szNSAzNV0vTGFuZyhFTi1VUykvUCAzMjggMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNDUgMCBvYmoKPDwvS1szNiAzNl0vUCAzMjkgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjI0NiAwIG9iago8PC9BIDMzMCAwIFIvS1szNyAzN10vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNDcgMCBvYmoKPDwvQSAzMzIgMCBSL0tbMzggMzhdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI0OCAwIG9iago8PC9BIDMzMyAwIFIvS1szOSAzOV0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjQ5IDAgb2JqCjw8L0EgMzM0IDAgUi9LWzQwIDQwXS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNTAgMCBvYmoKPDwvQSAzMzUgMCBSL0tbNDEgNDFdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI1MSAwIG9iago8PC9BIDMzNiAwIFIvS1s0MiA0Ml0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjUyIDAgb2JqCjw8L0EgMzM3IDAgUi9LWzQzIDQzXS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNTMgMCBvYmoKPDwvQSAzMzggMCBSL0tbNDQgNDRdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI1NCAwIG9iago8PC9BIDMzOSAwIFIvS1s0NSA0NV0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjU1IDAgb2JqCjw8L0EgMzQwIDAgUi9LWzQ2IDQ2XS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNTYgMCBvYmoKPDwvQSAzNDEgMCBSL0tbNDcgNDddL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI1NyAwIG9iago8PC9BIDM0MiAwIFIvS1s0OCA0OF0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjU4IDAgb2JqCjw8L0EgMzQzIDAgUi9LWzQ5IDQ5XS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNTkgMCBvYmoKPDwvQSAzNDQgMCBSL0tbNTAgNTBdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI2MCAwIG9iago8PC9BIDM0NSAwIFIvS1s1MSA1MV0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjYxIDAgb2JqCjw8L0EgMzQ2IDAgUi9LWzUyIDUyXS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNjIgMCBvYmoKPDwvQSAzNDcgMCBSL0tbNTMgNTNdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI2MyAwIG9iago8PC9LWzU0IDU0XS9QIDM0OCAwIFIvUGcgMzggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMjY0IDAgb2JqCjw8L0EgMzQ5IDAgUi9LWzU1IDU1XS9MYW5nKEVOLVVTKS9QIDM1MCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI2NSAwIG9iago8PC9BIDM1MSAwIFIvS1s1NiA1Nl0vTGFuZyhFTi1VUykvUCAzNTAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNjYgMCBvYmoKPDwvQSAzNTIgMCBSL0tbNTcgNTddL0xhbmcoRU4tVVMpL1AgMzUwIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjY3IDAgb2JqCjw8L0EgMzUzIDAgUi9LWzU4IDU4XS9MYW5nKEVOLVVTKS9QIDM1MCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI2OCAwIG9iago8PC9BIDM1NCAwIFIvS1s1OSA1OV0vTGFuZyhFTi1VUykvUCAzNTAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNjkgMCBvYmoKPDwvQSAzNTUgMCBSL0tbNjAgNjBdL0xhbmcoRU4tVVMpL1AgMzUwIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjcwIDAgb2JqCjw8L0tbNjEgNjFdL1AgMzU2IDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyNzEgMCBvYmoKPDwvQSAzNTcgMCBSL0tbNjIgNjJdL0xhbmcoRU4tVVMpL1AgMzU4IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjcyIDAgb2JqCjw8L0tbNjMgNjNdL1AgMzU5IDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyNzMgMCBvYmoKPDwvQSAzNjAgMCBSL0tbNjQgNjRdL0xhbmcoRU4tVVMpL1AgMzYxIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjc0IDAgb2JqCjw8L0EgMzYyIDAgUi9LWzY1IDY1XS9MYW5nKEVOLVVTKS9QIDM2MyAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI3NSAwIG9iago8PC9BIDM2NCAwIFIvS1s2NiA2Nl0vTGFuZyhFTi1VUykvUCAzNjUgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNzYgMCBvYmoKPDwvQSAzNjYgMCBSL0tbNjcgNjddL0xhbmcoRU4tVVMpL1AgMzY3IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjc3IDAgb2JqCjw8L0EgMzY4IDAgUi9LWzY4IDY4XS9MYW5nKEVOLVVTKS9QIDM2OSAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI3OCAwIG9iago8PC9LWzY5IDY5XS9QIDM3MCAwIFIvUGcgMzggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMjc5IDAgb2JqCjw8L0EgMzcxIDAgUi9LWzcwIDcwXS9MYW5nKEVOLVVTKS9QIDM3MiAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI4MCAwIG9iago8PC9BIDM3MyAwIFIvS1s3MSA3MV0vTGFuZyhFTi1VUykvUCAzNzQgMCBSL1BnIDM4IDAgUi9TL0l0YWxpYz4+CmVuZG9iagoyODEgMCBvYmoKPDwvQSAzNzUgMCBSL0tbNzIgNzJdL0xhbmcoRU4tVVMpL1AgMzc2IDAgUi9QZyAzOCAwIFIvUy9JdGFsaWM+PgplbmRvYmoKMjgyIDAgb2JqCjw8L0EgMzc3IDAgUi9LWzczIDczXS9MYW5nKEVOLVVTKS9QIDM3OCAwIFIvUGcgMzggMCBSL1MvSXRhbGljPj4KZW5kb2JqCjI4MyAwIG9iago8PC9BIDM3OSAwIFIvS1s3NCA3NF0vTGFuZyhFTi1VUykvUCAzODAgMCBSL1BnIDM4IDAgUi9TL0l0YWxpYz4+CmVuZG9iagoyODQgMCBvYmoKPDwvS1s3NSA3NV0vUCAzODEgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjg3IDAgb2JqCjw8L0EgMzgyIDAgUi9LWzc2IDc2XS9MYW5nKEVOLVVTKS9QIDc4IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMzgyIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzgxIDAgb2JqCjw8L0tbMjg0IDAgUiAzNzIgMCBSIDM3NCAwIFIgMzc2IDAgUiAzNzggMCBSIDM4MCAwIFJdL1AgODYgMCBSL1MvVFI+PgplbmRvYmoKODYgMCBvYmoKPDwvQSAzODMgMCBSL0tbMjg4IDAgUiAyOTIgMCBSIDI5NSAwIFIgMzAyIDAgUiAzMTAgMCBSIDMxOCAwIFIgMzI2IDAgUiAzMjkgMCBSIDM0OCAwIFIgMzU2IDAgUiAzNTkgMCBSIDM3MCAwIFIgMzgxIDAgUl0vUCA3OCAwIFIvUy9UYWJsZT4+CmVuZG9iagozODMgMCBvYmoKPDwvQkJveFs1My4wMTMzIDE5Ny4yNyA1NjguNDQgNzQ4LjMzXS9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2s+PgplbmRvYmoKMjg4IDAgb2JqCjw8L0tbMjExIDAgUiAyODYgMCBSXS9QIDg2IDAgUi9TL1RSPj4KZW5kb2JqCjI5MiAwIG9iago8PC9LWzIxNCAwIFIgMjkwIDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagoyOTUgMCBvYmoKPDwvS1syMTYgMCBSIDI5NCAwIFJdL1AgODYgMCBSL1MvVFI+PgplbmRvYmoKMzAyIDAgb2JqCjw8L0tbMjIyIDAgUiAyOTcgMCBSXS9QIDg2IDAgUi9TL1RSPj4KZW5kb2JqCjMxMCAwIG9iago8PC9LWzIyOSAwIFIgMzA0IDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagozMTggMCBvYmoKPDwvS1syMzYgMCBSIDMxMiAwIFJdL1AgODYgMCBSL1MvVFI+PgplbmRvYmoKMzI2IDAgb2JqCjw8L0tbMjQzIDAgUiAzMjAgMCBSXS9QIDg2IDAgUi9TL1RSPj4KZW5kb2JqCjMyOSAwIG9iago8PC9LWzI0NSAwIFIgMzI4IDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagozNDggMCBvYmoKPDwvS1syNjMgMCBSIDMzMSAwIFJdL1AgODYgMCBSL1MvVFI+PgplbmRvYmoKMzU2IDAgb2JqCjw8L0tbMjcwIDAgUiAzNTAgMCBSXS9QIDg2IDAgUi9TL1RSPj4KZW5kb2JqCjM1OSAwIG9iago8PC9LWzI3MiAwIFIgMzU4IDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagozNzAgMCBvYmoKPDwvS1syNzggMCBSIDM2MSAwIFIgMzYzIDAgUiAzNjUgMCBSIDM2NyAwIFIgMzY5IDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagozNjEgMCBvYmoKPDwvSyAyNzMgMCBSL1AgMzcwIDAgUi9TL1REPj4KZW5kb2JqCjM2MyAwIG9iago8PC9LIDI3NCAwIFIvUCAzNzAgMCBSL1MvVEQ+PgplbmRvYmoKMzY1IDAgb2JqCjw8L0sgMjc1IDAgUi9QIDM3MCAwIFIvUy9URD4+CmVuZG9iagozNjcgMCBvYmoKPDwvSyAyNzYgMCBSL1AgMzcwIDAgUi9TL1REPj4KZW5kb2JqCjM2OSAwIG9iago8PC9LIDI3NyAwIFIvUCAzNzAgMCBSL1MvVEQ+PgplbmRvYmoKMzU4IDAgb2JqCjw8L0sgMjcxIDAgUi9QIDM1OSAwIFIvUy9URD4+CmVuZG9iagozNTAgMCBvYmoKPDwvS1syNjQgMCBSIDI2NSAwIFIgMjY2IDAgUiAyNjcgMCBSIDI2OCAwIFIgMjY5IDAgUl0vUCAzNTYgMCBSL1MvVEQ+PgplbmRvYmoKMzMxIDAgb2JqCjw8L0tbMjQ2IDAgUiAyNDcgMCBSIDI0OCAwIFIgMjQ5IDAgUiAyNTAgMCBSIDI1MSAwIFIgMjUyIDAgUiAyNTMgMCBSIDI1NCAwIFIgMjU1IDAgUiAyNTYgMCBSIDI1NyAwIFIgMjU4IDAgUiAyNTkgMCBSIDI2MCAwIFIgMjYxIDAgUiAyNjIgMCBSXS9QIDM0OCAwIFIvUy9URD4+CmVuZG9iagozMjggMCBvYmoKPDwvSyAyNDQgMCBSL1AgMzI5IDAgUi9TL1REPj4KZW5kb2JqCjMyMCAwIG9iago8PC9LWzIzNyAwIFIgMjM4IDAgUiAyMzkgMCBSIDI0MCAwIFIgMjQxIDAgUiAyNDIgMCBSXS9QIDMyNiAwIFIvUy9URD4+CmVuZG9iagozMTIgMCBvYmoKPDwvS1syMzAgMCBSIDIzMSAwIFIgMjMyIDAgUiAyMzMgMCBSIDIzNCAwIFIgMjM1IDAgUl0vUCAzMTggMCBSL1MvVEQ+PgplbmRvYmoKMzA0IDAgb2JqCjw8L0tbMjIzIDAgUiAyMjQgMCBSIDIyNSAwIFIgMjI2IDAgUiAyMjcgMCBSIDIyOCAwIFJdL1AgMzEwIDAgUi9TL1REPj4KZW5kb2JqCjI5NyAwIG9iago8PC9LWzIxNyAwIFIgMjE4IDAgUiAyMTkgMCBSIDIyMCAwIFIgMjIxIDAgUl0vUCAzMDIgMCBSL1MvVEQ+PgplbmRvYmoKMjk0IDAgb2JqCjw8L0sgMjE1IDAgUi9QIDI5NSAwIFIvUy9URD4+CmVuZG9iagoyOTAgMCBvYmoKPDwvS1syMTIgMCBSIDIxMyAwIFJdL1AgMjkyIDAgUi9TL1REPj4KZW5kb2JqCjI4NiAwIG9iago8PC9LWzIwOSAwIFIgMjEwIDAgUl0vUCAyODggMCBSL1MvVEQ+PgplbmRvYmoKMzcyIDAgb2JqCjw8L0sgMjc5IDAgUi9QIDM4MSAwIFIvUy9URD4+CmVuZG9iagozNzQgMCBvYmoKPDwvSyAyODAgMCBSL1AgMzgxIDAgUi9TL1REPj4KZW5kb2JqCjM3NiAwIG9iago8PC9LIDI4MSAwIFIvUCAzODEgMCBSL1MvVEQ+PgplbmRvYmoKMzc4IDAgb2JqCjw8L0sgMjgyIDAgUi9QIDM4MSAwIFIvUy9URD4+CmVuZG9iagozODAgMCBvYmoKPDwvSyAyODMgMCBSL1AgMzgxIDAgUi9TL1REPj4KZW5kb2JqCjM3OSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM3NyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM3NSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM3MyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM3MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2OCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2NiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2NCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2MiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2MCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1NyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1NSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1NCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1MyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1MiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM0OSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM0NyAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzQ2IDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozNDUgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM0NCAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzQzIDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozNDIgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM0MSAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzQwIDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMzkgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjMzOCAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzM3IDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMzYgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjMzNSAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzM0IDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMzMgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjMzMiAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzMwIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzI3IDAgb2JqCjw8L08vTGF5b3V0L1RleHRBbGlnbi9DZW50ZXIvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagoyOTkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagoyOTggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagoyOTYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagoyOTMgMCBvYmoKPDwvTy9MYXlvdXQvVGV4dEFsaWduL0NlbnRlci9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjI5MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjI4OSAwIG9iago8PC9PL0xheW91dC9UZXh0QWxpZ24vQ2VudGVyL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMjg3IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMjg1IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKODEgMCBvYmoKPDwvQSAzODQgMCBSL0tbMCAwXS9MYW5nKEVOLVVTKS9QIDc4IDAgUi9QZyA2OCAwIFIvUy9IZWFkaW5nIzIwMT4+CmVuZG9iago5MCAwIG9iago8PC9LWzEgMl0vTGFuZyhFTi1VUykvUCAzODUgMCBSL1BnIDY4IDAgUi9TL1A+PgplbmRvYmoKOTEgMCBvYmoKPDwvS1syIDVdL0xhbmcoRU4tVVMpL1AgMzg2IDAgUi9QZyA2OCAwIFIvUy9QPj4KZW5kb2JqCjkyIDAgb2JqCjw8L0EgMzg3IDAgUi9LWzMgOF0vTGFuZyhFTi1VUykvUCAzODggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iago5MyAwIG9iago8PC9BIDM4OSAwIFIvS1s0IDldL0xhbmcoRU4tVVMpL1AgMzkwIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKOTQgMCBvYmoKPDwvQSAzOTEgMCBSL0tbNSAxMF0vTGFuZyhFTi1VUykvUCAzOTAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iago5NSAwIG9iago8PC9BIDM5MiAwIFIvS1s2IDExXS9MYW5nKEVOLVVTKS9QIDM5MCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjk2IDAgb2JqCjw8L0tbNyAxMl0vUCAzOTMgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjk3IDAgb2JqCjw8L0EgMzk0IDAgUi9LWzggMTNdL1AgMzk1IDAgUi9QZyA2OCAwIFIvUy9IZWFkaW5nIzIwMj4+CmVuZG9iago5OCAwIG9iago8PC9BIDM5NiAwIFIvS1s5IDE0XS9MYW5nKEVOLVVTKS9QIDM5NSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjk5IDAgb2JqCjw8L0tbMTAgMTVdL1AgMzk3IDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxMDAgMCBvYmoKPDwvQSAzOTggMCBSL0tbMTEgMTZdL0xhbmcoRU4tVVMpL1AgMzk5IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTAxIDAgb2JqCjw8L0EgNDAwIDAgUi9LWzEyIDE3XS9MYW5nKEVOLVVTKS9QIDQwMSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEwMiAwIG9iago8PC9BIDQwMiAwIFIvS1sxMyAxOF0vTGFuZyhFTi1VUykvUCA0MDMgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMDMgMCBvYmoKPDwvQSA0MDQgMCBSL0tbMTQgMTldL0xhbmcoRU4tVVMpL1AgNDA1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTA0IDAgb2JqCjw8L0EgNDA2IDAgUi9LWzE1IDIwXS9MYW5nKEVOLVVTKS9QIDQwNSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEwNSAwIG9iago8PC9BIDQwNyAwIFIvS1sxNiAyMV0vTGFuZyhFTi1VUykvUCA0MDggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMDYgMCBvYmoKPDwvQSA0MDkgMCBSL0tbMTcgMjJdL0xhbmcoRU4tVVMpL1AgNDA4IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTA3IDAgb2JqCjw8L0EgNDEwIDAgUi9LWzE4IDIzXS9MYW5nKEVOLVVTKS9QIDQxMSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEwOCAwIG9iago8PC9LWzE5IDI0XS9QIDQxMiAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTA5IDAgb2JqCjw8L0EgNDEzIDAgUi9LWzIwIDI1XS9MYW5nKEVOLVVTKS9QIDQxNCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjExMCAwIG9iago8PC9BIDQxNSAwIFIvS1syMSAyNl0vTGFuZyhFTi1VUykvUCA0MTYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMTEgMCBvYmoKPDwvS1syMiAyN10vUCA0MTcgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjExMiAwIG9iago8PC9BIDQxOCAwIFIvS1syMyAyOF0vTGFuZyhFTi1VUykvUCA0MTkgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMTMgMCBvYmoKPDwvQSA0MjAgMCBSL0tbMjQgMjldL0xhbmcoRU4tVVMpL1AgNDIxIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTE0IDAgb2JqCjw8L0EgNDIyIDAgUi9LWzI1IDMwXS9MYW5nKEVOLVVTKS9QIDQyMyAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjExNSAwIG9iago8PC9BIDQyNCAwIFIvS1syNiAzMV0vTGFuZyhFTi1VUykvUCA0MjUgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMTYgMCBvYmoKPDwvQSA0MjYgMCBSL0tbMjcgMzJdL0xhbmcoRU4tVVMpL1AgNDI3IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTE3IDAgb2JqCjw8L0EgNDI4IDAgUi9LWzI4IDMzXS9MYW5nKEVOLVVTKS9QIDQyOSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjExOCAwIG9iago8PC9LWzI5IDM0XS9QIDQzMCAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTE5IDAgb2JqCjw8L0EgNDMxIDAgUi9LWzMwIDM1XS9MYW5nKEVOLVVTKS9QIDQzMiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEyMCAwIG9iago8PC9BIDQzMyAwIFIvS1szMSAzNl0vTGFuZyhFTi1VUykvUCA0MzQgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMjEgMCBvYmoKPDwvQSA0MzUgMCBSL0tbMzIgMzddL0xhbmcoRU4tVVMpL1AgNDM2IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTIyIDAgb2JqCjw8L0EgNDM3IDAgUi9LWzMzIDM4XS9MYW5nKEVOLVVTKS9QIDQzOCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEyMyAwIG9iago8PC9BIDQzOSAwIFIvS1szNCAzOV0vTGFuZyhFTi1VUykvUCA0NDAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMjQgMCBvYmoKPDwvQSA0NDEgMCBSL0tbMzUgNDBdL0xhbmcoRU4tVVMpL1AgNDQyIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTI1IDAgb2JqCjw8L0EgNDQzIDAgUi9LWzM2IDQxXS9MYW5nKEVOLVVTKS9QIDQ0NCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEyNiAwIG9iago8PC9BIDQ0NSAwIFIvS1szNyA0Ml0vTGFuZyhFTi1VUykvUCA0NDYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMjcgMCBvYmoKPDwvS1szOCA0M10vUCA0NDcgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjEyOCAwIG9iago8PC9BIDQ0OCAwIFIvS1szOSA0NF0vTGFuZyhFTi1VUykvUCA0NDkgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMjkgMCBvYmoKPDwvQSA0NTAgMCBSL0tbNDAgNDVdL0xhbmcoRU4tVVMpL1AgNDUxIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTMwIDAgb2JqCjw8L0EgNDUyIDAgUi9LWzQxIDQ2XS9MYW5nKEVOLVVTKS9QIDQ1MyAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEzMSAwIG9iago8PC9LWzQyIDQ3XS9QIDQ1NCAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTMyIDAgb2JqCjw8L0EgNDU1IDAgUi9LWzQzIDQ4XS9MYW5nKEVOLVVTKS9QIDQ1NiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEzMyAwIG9iago8PC9BIDQ1NyAwIFIvS1s0NCA0OV0vTGFuZyhFTi1VUykvUCA0NTggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMzQgMCBvYmoKPDwvQSA0NTkgMCBSL0tbNDUgNTBdL0xhbmcoRU4tVVMpL1AgNDYwIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTM1IDAgb2JqCjw8L0tbNDYgNTFdL1AgNDYxIDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxMzYgMCBvYmoKPDwvQSA0NjIgMCBSL0tbNDcgNTJdL0xhbmcoRU4tVVMpL1AgNDYzIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTM3IDAgb2JqCjw8L0EgNDY0IDAgUi9LWzQ4IDUzXS9MYW5nKEVOLVVTKS9QIDQ2NSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEzOCAwIG9iago8PC9BIDQ2NiAwIFIvS1s0OSA1NF0vTGFuZyhFTi1VUykvUCA0NjcgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMzkgMCBvYmoKPDwvQSA0NjggMCBSL0tbNTAgNTVdL0xhbmcoRU4tVVMpL1AgNDY5IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTQwIDAgb2JqCjw8L0tbNTEgNTZdL1AgNDcwIDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxNDEgMCBvYmoKPDwvQSA0NzEgMCBSL0tbNTIgNTddL0xhbmcoRU4tVVMpL1AgNDcyIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTQyIDAgb2JqCjw8L0EgNDczIDAgUi9LWzUzIDU4XS9MYW5nKEVOLVVTKS9QIDQ3NCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE0MyAwIG9iago8PC9BIDQ3NSAwIFIvS1s1NCA1OV0vTGFuZyhFTi1VUykvUCA0NzYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNDQgMCBvYmoKPDwvQSA0NzcgMCBSL0tbNTUgNjBdL0xhbmcoRU4tVVMpL1AgNDc4IDAgUi9QZyA2OCAwIFIvUy9IZWFkaW5nIzIwMj4+CmVuZG9iagoxNDUgMCBvYmoKPDwvS1s1NiA2MV0vUCA0NzkgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjE0NiAwIG9iago8PC9BIDQ4MCAwIFIvS1s1NyA2Ml0vTGFuZyhFTi1VUykvUCA0ODEgMCBSL1BnIDY4IDAgUi9TL0NlbnRlcmVkPj4KZW5kb2JqCjE0NyAwIG9iago8PC9BIDQ4MiAwIFIvS1s1OCA2M10vTGFuZyhFTi1VUykvUCA0ODMgMCBSL1BnIDY4IDAgUi9TL0NlbnRlcmVkPj4KZW5kb2JqCjE0OCAwIG9iago8PC9LWzU5IDY0XS9QIDQ4NCAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTQ5IDAgb2JqCjw8L0EgNDg1IDAgUi9LWzYwIDY1XS9MYW5nKEVOLVVTKS9QIDQ4NiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE1MCAwIG9iago8PC9BIDQ4NyAwIFIvS1s2MSA2Nl0vTGFuZyhFTi1VUykvUCA0ODYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNTEgMCBvYmoKPDwvS1s2MiA2N10vUCA0ODggMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjE1MiAwIG9iago8PC9BIDQ4OSAwIFIvS1s2MyA2OF0vUCA0OTAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNTMgMCBvYmoKPDwvQSA0OTEgMCBSL0tbNjQgNjldL0xhbmcoRU4tVVMpL1AgNDkwIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTU0IDAgb2JqCjw8L0tbNjUgNzBdL1AgNDkyIDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxNTUgMCBvYmoKPDwvQSA0OTMgMCBSL0tbNjYgNzFdL0xhbmcoRU4tVVMpL1AgNDk0IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTU2IDAgb2JqCjw8L0EgNDk1IDAgUi9LWzY3IDcyXS9MYW5nKEVOLVVTKS9QIDQ5NCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE1NyAwIG9iago8PC9BIDQ5NiAwIFIvS1s2OCA3M10vTGFuZyhFTi1VUykvUCA0OTQgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNTggMCBvYmoKPDwvQSA0OTcgMCBSL0tbNjkgNzRdL0xhbmcoRU4tVVMpL1AgNDk4IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTU5IDAgb2JqCjw8L0EgNDk5IDAgUi9LWzcwIDc1XS9MYW5nKEVOLVVTKS9QIDQ5OCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE2MCAwIG9iago8PC9BIDUwMCAwIFIvS1s3MSA3Nl0vTGFuZyhFTi1VUykvUCA0OTggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNjEgMCBvYmoKPDwvS1s3MiA3N10vUCA1MDEgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjE2MiAwIG9iago8PC9BIDUwMiAwIFIvS1s3MyA3OF0vTGFuZyhFTi1VUykvUCA1MDMgMCBSL1BnIDY4IDAgUi9TL0hlYWRpbmcjMjAyPj4KZW5kb2JqCjE2MyAwIG9iago8PC9BIDUwNCAwIFIvS1s3NCA3OV0vTGFuZyhFTi1VUykvUCA1MDMgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNjQgMCBvYmoKPDwvQSA1MDUgMCBSL0tbNzUgODBdL0xhbmcoRU4tVVMpL1AgNTAzIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTY1IDAgb2JqCjw8L0EgNTA2IDAgUi9LWzc2IDgxXS9MYW5nKEVOLVVTKS9QIDUwNyAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE2NiAwIG9iago8PC9BIDUwOCAwIFIvS1s3NyA4Ml0vTGFuZyhFTi1VUykvUCA1MDcgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNjcgMCBvYmoKPDwvQSA1MDkgMCBSL0tbNzggODNdL0xhbmcoRU4tVVMpL1AgNTA3IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTY4IDAgb2JqCjw8L0EgNTEwIDAgUi9LWzc5IDg0XS9MYW5nKEVOLVVTKS9QIDUxMSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE2OSAwIG9iago8PC9BIDUxMiAwIFIvS1s4MCA4NV0vTGFuZyhFTi1VUykvUCA1MTEgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNzAgMCBvYmoKPDwvQSA1MTMgMCBSL0tbODEgODZdL0xhbmcoRU4tVVMpL1AgNTExIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTcxIDAgb2JqCjw8L0tbODIgODddL1AgNTE0IDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxNzIgMCBvYmoKPDwvQSA1MTUgMCBSL0tbODMgODhdL0xhbmcoRU4tVVMpL1AgNTE2IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTczIDAgb2JqCjw8L0EgNTE3IDAgUi9LWzg0IDg5XS9MYW5nKEVOLVVTKS9QIDUxNiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE3NCAwIG9iago8PC9LWzg1IDkwXS9QIDUxOCAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTc1IDAgb2JqCjw8L0EgNTE5IDAgUi9LWzg2IDkxXS9QIDUyMCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE3NiAwIG9iago8PC9BIDUyMSAwIFIvS1s4NyA5Ml0vTGFuZyhFTi1VUykvUCA1MjAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNzcgMCBvYmoKPDwvS1s4OCA5M10vUCA1MjIgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjE3OCAwIG9iago8PC9BIDUyMyAwIFIvS1s4OSA5NF0vTGFuZyhFTi1VUykvUCA1MjQgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNzkgMCBvYmoKPDwvQSA1MjUgMCBSL0tbOTAgOTVdL0xhbmcoRU4tVVMpL1AgNTI0IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTgwIDAgb2JqCjw8L0EgNTI2IDAgUi9LWzkxIDk2XS9MYW5nKEVOLVVTKS9QIDUyNCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE4MSAwIG9iago8PC9BIDUyNyAwIFIvS1s5MiA5N10vTGFuZyhFTi1VUykvUCA1MjggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxODIgMCBvYmoKPDwvQSA1MjkgMCBSL0tbOTMgOThdL0xhbmcoRU4tVVMpL1AgNTI4IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTgzIDAgb2JqCjw8L0EgNTMwIDAgUi9LWzk0IDk5XS9MYW5nKEVOLVVTKS9QIDUyOCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE4NCAwIG9iago8PC9BIDUzMSAwIFIvS1s5NSAxMDBdL0xhbmcoRU4tVVMpL1AgNTMyIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTg1IDAgb2JqCjw8L0EgNTMzIDAgUi9LWzk2IDEwMV0vTGFuZyhFTi1VUykvUCA1MzIgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxODYgMCBvYmoKPDwvQSA1MzQgMCBSL0tbOTcgMTAyXS9MYW5nKEVOLVVTKS9QIDUzMiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE4NyAwIG9iago8PC9BIDUzNSAwIFIvS1s5OCAxMDNdL0xhbmcoRU4tVVMpL1AgNTM2IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTg4IDAgb2JqCjw8L0EgNTM3IDAgUi9LWzk5IDEwNF0vTGFuZyhFTi1VUykvUCA1MzYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxODkgMCBvYmoKPDwvQSA1MzggMCBSL0tbMTAwIDEwNV0vTGFuZyhFTi1VUykvUCA1MzYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxOTAgMCBvYmoKPDwvQSA1MzkgMCBSL0tbMTAxIDEwNl0vTGFuZyhFTi1VUykvUCA1NDAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxOTEgMCBvYmoKPDwvQSA1NDEgMCBSL0tbMTAyIDEwN10vTGFuZyhFTi1VUykvUCA1NDAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxOTIgMCBvYmoKPDwvQSA1NDIgMCBSL0tbMTAzIDEwOF0vTGFuZyhFTi1VUykvUCA1NDAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxOTMgMCBvYmoKPDwvS1sxMDQgMTA5XS9QIDU0MyAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTk0IDAgb2JqCjw8L0EgNTQ0IDAgUi9LWzEwNSAxMTBdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk1IDAgb2JqCjw8L0EgNTQ2IDAgUi9LWzEwNiAxMTFdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk2IDAgb2JqCjw8L0EgNTQ3IDAgUi9LWzEwNyAxMTJdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk3IDAgb2JqCjw8L0EgNTQ4IDAgUi9LWzEwOCAxMTNdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk4IDAgb2JqCjw8L0EgNTQ5IDAgUi9LWzEwOSAxMTRdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk5IDAgb2JqCjw8L0EgNTUwIDAgUi9LWzExMCAxMTVdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjAwIDAgb2JqCjw8L0EgNTUxIDAgUi9LWzExMSAxMTZdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9IZWFkaW5nIzIwMj4+CmVuZG9iagoyMDEgMCBvYmoKPDwvQSA1NTIgMCBSL0tbMTEyIDExN10vTGFuZyhFTi1VUykvUCA1NDUgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMDIgMCBvYmoKPDwvQSA1NTMgMCBSL0tbMTEzIDExOF0vTGFuZyhFTi1VUykvUCA1NDUgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMDMgMCBvYmoKPDwvQSA1NTQgMCBSL0tbMTE0IDExOV0vTGFuZyhFTi1VUykvUCA1NDUgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMDQgMCBvYmoKPDwvS1sxMTUgMTIwXS9QIDU1NSAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMjA1IDAgb2JqCjw8L0EgNTU2IDAgUi9LWzExNiAxMjFdL0xhbmcoRU4tVVMpL1AgNTU3IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjA2IDAgb2JqCjw8L0EgNTU4IDAgUi9LWzExNyAxMjJdL0xhbmcoRU4tVVMpL1AgNTU5IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjA3IDAgb2JqCjw8L0EgNTYwIDAgUi9LWzExOCAxMjNdL0xhbmcoRU4tVVMpL1AgNTYxIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjA4IDAgb2JqCjw8L0tbMTE5IDEyNF0vUCA1NjIgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjg1IDAgb2JqCjw8L0EgNTYzIDAgUi9LWzEyMCAxMjVdL0xhbmcoRU4tVVMpL1AgNzggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iago4MyAwIG9iago8PC9BIDU2NCAwIFIvS1sxMjEgMTI2XS9QIDc4IDAgUi9QZyA2OCAwIFIvUy9GaWd1cmU+PgplbmRvYmoKNTY0IDAgb2JqCjw8L0JCb3hbMzIxLjEgNjgyLjM1NSA1NTEuNiA3MzIuMDAyXS9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2s+PgplbmRvYmoKNTYzIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTYyIDAgb2JqCjw8L0tbMjA4IDAgUiA1NTcgMCBSIDU1OSAwIFIgNTYxIDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago4NCAwIG9iago8PC9BIDU2NSAwIFIvS1szOTMgMCBSIDM5NyAwIFIgNDEyIDAgUiA0MTcgMCBSIDQzMCAwIFIgNDQ3IDAgUiA0NTQgMCBSIDQ2MSAwIFIgNDcwIDAgUiA0NzkgMCBSIDQ4NCAwIFIgNDg4IDAgUiA0OTIgMCBSIDUwMSAwIFIgNTE0IDAgUiA1MTggMCBSIDUyMiAwIFIgNTQzIDAgUiA1NTUgMCBSIDU2MiAwIFJdL1AgNzggMCBSL1MvVGFibGU+PgplbmRvYmoKNTY1IDAgb2JqCjw8L0JCb3hbMC4wIC0xNjM4NC4wIDU2NS43NCA2ODIuNjNdL08vTGF5b3V0L1BsYWNlbWVudC9CbG9jaz4+CmVuZG9iagozOTMgMCBvYmoKPDwvS1s5NiAwIFIgMzg4IDAgUiAzOTAgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjM5NyAwIG9iago8PC9LWzk5IDAgUiAzOTUgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjQxMiAwIG9iago8PC9LWzEwOCAwIFIgMzk5IDAgUiA0MDEgMCBSIDQwMyAwIFIgNDA1IDAgUiA0MDggMCBSIDQxMSAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNDE3IDAgb2JqCjw8L0tbMTExIDAgUiA0MTQgMCBSIDQxNiAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNDMwIDAgb2JqCjw8L0tbMTE4IDAgUiA0MTkgMCBSIDQyMSAwIFIgNDIzIDAgUiA0MjUgMCBSIDQyNyAwIFIgNDI5IDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago0NDcgMCBvYmoKPDwvS1sxMjcgMCBSIDQzMiAwIFIgNDM0IDAgUiA0MzYgMCBSIDQzOCAwIFIgNDQwIDAgUiA0NDIgMCBSIDQ0NCAwIFIgNDQ2IDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago0NTQgMCBvYmoKPDwvS1sxMzEgMCBSIDQ0OSAwIFIgNDUxIDAgUiA0NTMgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjQ2MSAwIG9iago8PC9LWzEzNSAwIFIgNDU2IDAgUiA0NTggMCBSIDQ2MCAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNDcwIDAgb2JqCjw8L0tbMTQwIDAgUiA0NjMgMCBSIDQ2NSAwIFIgNDY3IDAgUiA0NjkgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjQ3OSAwIG9iago8PC9LWzE0NSAwIFIgNDcyIDAgUiA0NzQgMCBSIDQ3NiAwIFIgNDc4IDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago0ODQgMCBvYmoKPDwvS1sxNDggMCBSIDQ4MSAwIFIgNDgzIDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago0ODggMCBvYmoKPDwvS1sxNTEgMCBSIDQ4NiAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNDkyIDAgb2JqCjw8L0tbMTU0IDAgUiA0OTAgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjUwMSAwIG9iago8PC9LWzE2MSAwIFIgNDk0IDAgUiA0OTggMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjUxNCAwIG9iago8PC9LWzE3MSAwIFIgNTAzIDAgUiA1MDcgMCBSIDUxMSAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNTE4IDAgb2JqCjw8L0tbMTc0IDAgUiA1MTYgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjUyMiAwIG9iago8PC9LWzE3NyAwIFIgNTIwIDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago1NDMgMCBvYmoKPDwvS1sxOTMgMCBSIDUyNCAwIFIgNTI4IDAgUiA1MzIgMCBSIDUzNiAwIFIgNTQwIDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago1NTUgMCBvYmoKPDwvS1syMDQgMCBSIDU0NSAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNTQ1IDAgb2JqCjw8L0tbMTk0IDAgUiAxOTUgMCBSIDE5NiAwIFIgMTk3IDAgUiAxOTggMCBSIDE5OSAwIFIgMjAwIDAgUiAyMDEgMCBSIDIwMiAwIFIgMjAzIDAgUl0vUCA1NTUgMCBSL1MvVEQ+PgplbmRvYmoKNTI0IDAgb2JqCjw8L0tbMTc4IDAgUiAxNzkgMCBSIDE4MCAwIFJdL1AgNTQzIDAgUi9TL1REPj4KZW5kb2JqCjUyOCAwIG9iago8PC9LWzE4MSAwIFIgMTgyIDAgUiAxODMgMCBSXS9QIDU0MyAwIFIvUy9URD4+CmVuZG9iago1MzIgMCBvYmoKPDwvS1sxODQgMCBSIDE4NSAwIFIgMTg2IDAgUl0vUCA1NDMgMCBSL1MvVEQ+PgplbmRvYmoKNTM2IDAgb2JqCjw8L0tbMTg3IDAgUiAxODggMCBSIDE4OSAwIFJdL1AgNTQzIDAgUi9TL1REPj4KZW5kb2JqCjU0MCAwIG9iago8PC9LWzE5MCAwIFIgMTkxIDAgUiAxOTIgMCBSXS9QIDU0MyAwIFIvUy9URD4+CmVuZG9iago1MjAgMCBvYmoKPDwvS1sxNzUgMCBSIDE3NiAwIFJdL1AgNTIyIDAgUi9TL1REPj4KZW5kb2JqCjUxNiAwIG9iago8PC9LWzE3MiAwIFIgMTczIDAgUl0vUCA1MTggMCBSL1MvVEQ+PgplbmRvYmoKNTAzIDAgb2JqCjw8L0tbMTYyIDAgUiAxNjMgMCBSIDE2NCAwIFJdL1AgNTE0IDAgUi9TL1REPj4KZW5kb2JqCjUwNyAwIG9iago8PC9LWzE2NSAwIFIgMTY2IDAgUiAxNjcgMCBSXS9QIDUxNCAwIFIvUy9URD4+CmVuZG9iago1MTEgMCBvYmoKPDwvS1sxNjggMCBSIDE2OSAwIFIgMTcwIDAgUl0vUCA1MTQgMCBSL1MvVEQ+PgplbmRvYmoKNDk0IDAgb2JqCjw8L0tbMTU1IDAgUiAxNTYgMCBSIDE1NyAwIFJdL1AgNTAxIDAgUi9TL1REPj4KZW5kb2JqCjQ5OCAwIG9iago8PC9LWzE1OCAwIFIgMTU5IDAgUiAxNjAgMCBSXS9QIDUwMSAwIFIvUy9URD4+CmVuZG9iago0OTAgMCBvYmoKPDwvS1sxNTIgMCBSIDE1MyAwIFJdL1AgNDkyIDAgUi9TL1REPj4KZW5kb2JqCjQ4NiAwIG9iago8PC9LWzE0OSAwIFIgMTUwIDAgUl0vUCA0ODggMCBSL1MvVEQ+PgplbmRvYmoKNDgxIDAgb2JqCjw8L0sgMTQ2IDAgUi9QIDQ4NCAwIFIvUy9URD4+CmVuZG9iago0ODMgMCBvYmoKPDwvSyAxNDcgMCBSL1AgNDg0IDAgUi9TL1REPj4KZW5kb2JqCjQ3MiAwIG9iago8PC9LIDE0MSAwIFIvUCA0NzkgMCBSL1MvVEQ+PgplbmRvYmoKNDc0IDAgb2JqCjw8L0sgMTQyIDAgUi9QIDQ3OSAwIFIvUy9URD4+CmVuZG9iago0NzYgMCBvYmoKPDwvSyAxNDMgMCBSL1AgNDc5IDAgUi9TL1REPj4KZW5kb2JqCjQ3OCAwIG9iago8PC9LIDE0NCAwIFIvUCA0NzkgMCBSL1MvVEQ+PgplbmRvYmoKNDYzIDAgb2JqCjw8L0sgMTM2IDAgUi9QIDQ3MCAwIFIvUy9URD4+CmVuZG9iago0NjUgMCBvYmoKPDwvSyAxMzcgMCBSL1AgNDcwIDAgUi9TL1REPj4KZW5kb2JqCjQ2NyAwIG9iago8PC9LIDEzOCAwIFIvUCA0NzAgMCBSL1MvVEQ+PgplbmRvYmoKNDY5IDAgb2JqCjw8L0sgMTM5IDAgUi9QIDQ3MCAwIFIvUy9URD4+CmVuZG9iago0NTYgMCBvYmoKPDwvSyAxMzIgMCBSL1AgNDYxIDAgUi9TL1REPj4KZW5kb2JqCjQ1OCAwIG9iago8PC9LIDEzMyAwIFIvUCA0NjEgMCBSL1MvVEQ+PgplbmRvYmoKNDYwIDAgb2JqCjw8L0sgMTM0IDAgUi9QIDQ2MSAwIFIvUy9URD4+CmVuZG9iago0NDkgMCBvYmoKPDwvSyAxMjggMCBSL1AgNDU0IDAgUi9TL1REPj4KZW5kb2JqCjQ1MSAwIG9iago8PC9LIDEyOSAwIFIvUCA0NTQgMCBSL1MvVEQ+PgplbmRvYmoKNDUzIDAgb2JqCjw8L0sgMTMwIDAgUi9QIDQ1NCAwIFIvUy9URD4+CmVuZG9iago0MzIgMCBvYmoKPDwvSyAxMTkgMCBSL1AgNDQ3IDAgUi9TL1REPj4KZW5kb2JqCjQzNCAwIG9iago8PC9LIDEyMCAwIFIvUCA0NDcgMCBSL1MvVEQ+PgplbmRvYmoKNDM2IDAgb2JqCjw8L0sgMTIxIDAgUi9QIDQ0NyAwIFIvUy9URD4+CmVuZG9iago0MzggMCBvYmoKPDwvSyAxMjIgMCBSL1AgNDQ3IDAgUi9TL1REPj4KZW5kb2JqCjQ0MCAwIG9iago8PC9LIDEyMyAwIFIvUCA0NDcgMCBSL1MvVEQ+PgplbmRvYmoKNDQyIDAgb2JqCjw8L0sgMTI0IDAgUi9QIDQ0NyAwIFIvUy9URD4+CmVuZG9iago0NDQgMCBvYmoKPDwvSyAxMjUgMCBSL1AgNDQ3IDAgUi9TL1REPj4KZW5kb2JqCjQ0NiAwIG9iago8PC9LIDEyNiAwIFIvUCA0NDcgMCBSL1MvVEQ+PgplbmRvYmoKNDE5IDAgb2JqCjw8L0sgMTEyIDAgUi9QIDQzMCAwIFIvUy9URD4+CmVuZG9iago0MjEgMCBvYmoKPDwvSyAxMTMgMCBSL1AgNDMwIDAgUi9TL1REPj4KZW5kb2JqCjQyMyAwIG9iago8PC9LIDExNCAwIFIvUCA0MzAgMCBSL1MvVEQ+PgplbmRvYmoKNDI1IDAgb2JqCjw8L0sgMTE1IDAgUi9QIDQzMCAwIFIvUy9URD4+CmVuZG9iago0MjcgMCBvYmoKPDwvSyAxMTYgMCBSL1AgNDMwIDAgUi9TL1REPj4KZW5kb2JqCjQyOSAwIG9iago8PC9LIDExNyAwIFIvUCA0MzAgMCBSL1MvVEQ+PgplbmRvYmoKNDE0IDAgb2JqCjw8L0sgMTA5IDAgUi9QIDQxNyAwIFIvUy9URD4+CmVuZG9iago0MTYgMCBvYmoKPDwvSyAxMTAgMCBSL1AgNDE3IDAgUi9TL1REPj4KZW5kb2JqCjM5OSAwIG9iago8PC9LIDEwMCAwIFIvUCA0MTIgMCBSL1MvVEQ+PgplbmRvYmoKNDAxIDAgb2JqCjw8L0sgMTAxIDAgUi9QIDQxMiAwIFIvUy9URD4+CmVuZG9iago0MDMgMCBvYmoKPDwvSyAxMDIgMCBSL1AgNDEyIDAgUi9TL1REPj4KZW5kb2JqCjQwNSAwIG9iago8PC9LWzEwMyAwIFIgMTA0IDAgUl0vUCA0MTIgMCBSL1MvVEQ+PgplbmRvYmoKNDA4IDAgb2JqCjw8L0tbMTA1IDAgUiAxMDYgMCBSXS9QIDQxMiAwIFIvUy9URD4+CmVuZG9iago0MTEgMCBvYmoKPDwvSyAxMDcgMCBSL1AgNDEyIDAgUi9TL1REPj4KZW5kb2JqCjM5NSAwIG9iago8PC9LWzk3IDAgUiA5OCAwIFJdL1AgMzk3IDAgUi9TL1REPj4KZW5kb2JqCjM4OCAwIG9iago8PC9LIDkyIDAgUi9QIDM5MyAwIFIvUy9URD4+CmVuZG9iagozOTAgMCBvYmoKPDwvS1s5MyAwIFIgOTQgMCBSIDk1IDAgUl0vUCAzOTMgMCBSL1MvVEQ+PgplbmRvYmoKNTU3IDAgb2JqCjw8L0sgMjA1IDAgUi9QIDU2MiAwIFIvUy9URD4+CmVuZG9iago1NTkgMCBvYmoKPDwvSyAyMDYgMCBSL1AgNTYyIDAgUi9TL1REPj4KZW5kb2JqCjU2MSAwIG9iago8PC9LIDIwNyAwIFIvUCA1NjIgMCBSL1MvVEQ+PgplbmRvYmoKNTYwIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTU4IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTU2IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTU0IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTUzIDAgb2JqCjw8L08vTGF5b3V0L1RleHRBbGlnbi9DZW50ZXIvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago1NTIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago1NTEgMCBvYmoKPDwvTy9MYXlvdXQvVGV4dEFsaWduL0NlbnRlci9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU1MCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0OSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0OCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0NyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0NiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0NCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0MiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzOSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzOCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzNyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzNSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzNCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzMyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzMSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzMCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyOSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyNyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyNiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyNSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyMyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyMSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxOSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxNyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxNSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxMyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxMiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxMCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwOSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwOCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwNiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwNSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwNCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwMiAwIG9iago8PC9PL0xheW91dC9UZXh0QWxpZ24vQ2VudGVyL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTAwIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDk5IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDk3IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDk2IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDk1IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDkzIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDkxIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDg5IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDg3IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDg1IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDgyIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDgwIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDc3IDAgb2JqCjw8L08vTGF5b3V0L1RleHRBbGlnbi9DZW50ZXIvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NzUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NzMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NzEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NjggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NjYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NjQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NjIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NDggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NDUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NDMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NDEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MTggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MTUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MTMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MTAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozOTggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozOTYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozOTQgMCBvYmoKPDwvTy9MYXlvdXQvVGV4dEFsaWduL0NlbnRlci9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM5MiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM5MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM4OSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM4NyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM4NiAwIG9iago8PC9LIDkxIDAgUi9QIDU2NiAwIFIvUy9USD4+CmVuZG9iago1NjYgMCBvYmoKPDwvS1szODUgMCBSIDM4NiAwIFJdL1AgODIgMCBSL1MvVFI+PgplbmRvYmoKODIgMCBvYmoKPDwvQSA1NjcgMCBSL0sgNTY2IDAgUi9QIDc4IDAgUi9TL1RhYmxlPj4KZW5kb2JqCjU2NyAwIG9iago8PC9CQm94WzQ2Ljg1MjYgNjc5LjM4IDU2OC4wMiA3MjAuOTk5XS9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2s+PgplbmRvYmoKMzg1IDAgb2JqCjw8L0sgOTAgMCBSL1AgNTY2IDAgUi9TL1RIPj4KZW5kb2JqCjM4NCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjQxIDAgb2JqCjw8L0NvdW50IDIvS2lkc1s2OCAwIFIgMzggMCBSXS9UeXBlL1BhZ2VzPj4KZW5kb2JqCjU2OCAwIG9iago8PC9BY3JvRm9ybSA1NjkgMCBSL01hcmtJbmZvPDwvTWFya2VkIHRydWU+Pi9NZXRhZGF0YSAzNyAwIFIvT3V0bGluZXMgNjAgMCBSL1BhZ2VMYXlvdXQvT25lQ29sdW1uL1BhZ2VzIDQxIDAgUi9TdHJ1Y3RUcmVlUm9vdCA3NiAwIFIvVHlwZS9DYXRhbG9nPj4KZW5kb2JqCjY4IDAgb2JqCjw8L0Fubm90cyA1NzAgMCBSL0NvbnRlbnRzWzU3MSAwIFIgNTcyIDAgUiA1NzMgMCBSIDU3NCAw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ZiAwIGcgKS9EUjw8L0VuY29kaW5nPDwvUERGRG9jRW5jb2RpbmcgNzQgMCBSPj4vRm9udDw8L0Vkd2FyZGlhblNjcmlwdElUQyA3MiAwIFIvSGVsdiAyIDAgUi9aYURiIDc1IDAgUj4+Pj4vRmllbGRzWzUwIDAgUiA2MDMgMCBSIDYwNCAwIFIgNjA1IDAgUiA2MDYgMCBSIDYwNyAwIFIgNjA4IDAgUiA2MDkgMCBSIDYxMCAwIFIgNjExIDAgUiA1OSAwIFIgNjEyIDAgUiA2MTMgMCBSIDYxNCAwIFIgNjE1IDAgUiA2MTYgMCBSIDYxNyAwIFIgNjE4IDAgUiA2MTkgMCBSIDYyMCAwIFIgNjIxIDAgUiA2MjIgMCBSIDYyMyAwIFIgNjI0IDAgUiA2MjUgMCBSIDYyNiAwIFIgNjI3IDAgUiA1OCAwIFIgNjI4IDAgUiA2MjkgMCBSIDYzMCAwIFIgNjMxIDAgUiA2MzIgMCBSIDYzMyAwIFIgNjM0IDAgUiA1MiAwIFJdPj4KZW5kb2JqCjU3MCAwIG9iagpbNzAgMCBSIDYxMiAwIFIgNjA3IDAgUiA2MDggMCBSIDYwOSAwIFIgNjExIDAgUiA2MjkgMCBSIDYzMiAwIFIgNjM0IDAgUiA2MTcgMCBSIDYzMCAwIFIgNjE4IDAgUiA2MDMgMCBSIDYwNCAwIFIgNjA1IDAgUiA2MDYgMCBSIDcxIDAgUiA2MTMgMCBSIDYxNCAwIFIgNjE1IDAgUiA2MTYgMCBSIDYxOSAwIFIgNjIwIDAgUiA2MjEgMCBSIDYyMyAwIFIgNjIyIDAgUiA2MjQgMCBSIDYyNiAwIFIgNjI4IDAgUiA2MjUgMCBSIDYxMCAwIFIgNjI3IDAgUiA2MzEgMCBSIDYzMyAwIFJdCmVuZG9iago3MCAwIG9iago8PC9GIDQvTUs8PD4+L1AgNjggMCBSL1BhcmVudCA1OSAwIFIvUmVjdFs4MS4yMzY3IDY1NS43MSAzNDMuOTE2IDY2OS4wMTZdL1N1YnR5cGUvV2lkZ2V0L1R5cGUvQW5ub3QvQVA8PC9OIDEgMCBSPj4+PgplbmRvYmoKNjEyIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzM3My4wOTQgNjgxLjgzNSA1NTEuMzk4IDY2Ny45MTVdL1N1YnR5cGUvV2lkZ2V0L1QoUENQTmFtZSkvVFUoUENQOikvVHlwZS9Bbm5vdC9WKFRlc3QyIFBoeXNpY2lhbikvQVA8PC9OIDUgMCBSPj4+PgplbmRvYmoKNjA3IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzE1OC41NjEgNTY1LjMxOCAyNzIuNjgxIDU3OS4xNDhdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudFByZWZlcnJlZExhbmd1YWdlKS9UVShQcmVmZXJyZWQgTGFuZ3VhZ2UpL1R5cGUvQW5ub3QvVihQYXNodG8pL0FQPDwvTiAxMCAwIFI+Pj4+CmVuZG9iago2MDggMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbNTUuNjc0MSA1NjUuMzE4IDEyMS42NzQgNTc5LjE0OF0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50QmlydGhEYXRlKS9UVShCaXJ0aCBkYXRlOikvVHlwZS9Bbm5vdC9WKDQgLSBPY3QgLSAyMDE3KS9BUDw8L04gMTEgMCBSPj4+PgplbmRvYmoKNjA5IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzEyNS41NTggNTY1LjMxOCAxNTQuNjc0IDU3OS4xNDhdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudEFnZSkvVFUoQWdlOikvVHlwZS9Bbm5vdC9WKDApL0FQPDwvTiAxMiAwIFI+Pj4+CmVuZG9iago2MTEgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbNTUuMTMxMiA1NDYuNTgxIDMwMC4xNzEgNTMyLjc1MV0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50U3RyZWV0QWRkcmVzcykvVFUoU3RyZWV0IGFkZHJlc3M6KS9UeXBlL0Fubm90L1YoMTIzIEVyZWh3b24gU3QuKS9BUDw8L04gMTQgMCBSPj4+PgplbmRvYmoKNjI5IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzI3Ni45MDkgNTY1LjMxOCA0MjYuNTYgNTc5LjE0OF0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50SGVhbHRoSW5zdXJhbmNlTm8pL1RVKEhlYWx0aCBJbnN1cmFuY2UgTm8uOikvVHlwZS9Bbm5vdC9WKDIzNDIzNDIzMjMpL0FQPDwvTiAxNSAwIFI+Pj4+CmVuZG9iago2MzIgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbMzAyLjA1MSA1MzIuNzUxIDQyNC40NTEgNTQ2LjU4MV0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50UGhvbmVOdW1iZXIpL1RVKEhvbWUgcGhvbmUgbm8uOikvVHlwZS9Bbm5vdC9WKDU1NTU1NTgzMTApL0FQPDwvTiAxNyAwIFI+Pj4+CmVuZG9iago2MzQgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbNTUuMTMxMiA1MTQuNDAzIDE4Mi42OTEgNTAwLjU3M10vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50QXB0U3VpdGUpL1RVKEFwYXJ0bWVudC9TdWl0ZSkvVHlwZS9Bbm5vdD4+CmVuZG9iago2MTcgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbMTg0LjI4NCA1MTQuNDAzIDM2MC4wODQgNTAwLjU3M10vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50Q2l0eSkvVFUoQ2l0eTopL1R5cGUvQW5ub3QvVihLaW5nc3RvbikvQVA8PC9OIDE4IDAgUj4+Pj4KZW5kb2JqCjYzMCAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFszNjIuNDUxIDUxNC40MDMgNDg3LjUwMiA1MDAuNTczXS9TdWJ0eXBlL1dpZGdldC9UKFBhdGllbnRQcm92aW5jZSkvVFUoUHJvdmluY2U6KS9UeXBlL0Fubm90L1YoT250YXJpbykvQVA8PC9OIDE5IDAgUj4+Pj4KZW5kb2JqCjYxOCAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFs0OTAuNDY5IDUwMC41NzMgNTU2LjE2NCA1MTQuNDAzXS9TdWJ0eXBlL1dpZGdldC9UKFBhdGllbnRQb3N0YWxDb2RlKS9UVShQb3N0YWwgQ29kZTopL1R5cGUvQW5ub3QvVihBMUEgMUExKS9BUDw8L04gMjAgMCBSPj4+PgplbmRvYmoKNjAzIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzM3My4yOCA2NDQuMjU5IDU1MS44NzEgNjY2LjI1OV0vU3VidHlwZS9XaWRnZXQvVChQQ1BBZGRyZXNzKS9UeXBlL0Fubm90L1YoMTQ3MyBKb2huIENvdW50ZXIgQmx2ZCkvQVA8PC9OIDYgMCBSPj4+PgplbmRvYmoKNjA0IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzU2LjYxOTYgNjEyLjU4OCAyMDkuNzYxIDU5OC43NThdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudExhc3ROYW1lKS9UeXBlL0Fubm90L1YoUGF0aWVudCkvQVA8PC9OIDcgMCBSPj4+PgplbmRvYmoKNjA1IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzIxMi4yMTkgNjEyLjU4OCAzMTMuMTg5IDU5OC43NThdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudEZpcnN0TmFtZSkvVHlwZS9Bbm5vdC9WKFRlc3QpL0FQPDwvTiA4IDAgUj4+Pj4KZW5kb2JqCjYwNiAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFszMTUuMDYzIDYxMi41ODggNDQzLjY4NSA1OTguNzU4XS9TdWJ0eXBlL1dpZGdldC9UKFBhdGllbnRPdGhlck5hbWVzKS9UeXBlL0Fubm90Pj4KZW5kb2JqCjcxIDAgb2JqCjw8L0YgNC9NSzw8Pj4vUCA2OCAwIFIvUGFyZW50IDU4IDAgUi9SZWN0WzU0LjgzNDYgNDEwLjcyMSAzMDQuNTU1IDQyNC45NDZdL1N1YnR5cGUvV2lkZ2V0L1R5cGUvQW5ub3QvQVA8PC9OIDIxIDAgUj4+Pj4KZW5kb2JqCjYxMyAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFszMDYuODM1IDQxMC43MjEgNTU2Ljc5NSA0MjQuOTQ2XS9TdWJ0eXBlL1dpZGdldC9UKEVuY291bnRlcmluZ1BoeXNpY2lhbkNQU09JZCkvVFUoQ1BTTyBOby4pL1R5cGUvQW5ub3QvVig1NDEzNCkvQVA8PC9OIDIzIDAgUj4+Pj4KZW5kb2JqCjYxNCAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM5MjcwNC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFs1NS43MTgyIDM1Mi4xNjEgMjIwLjk1OSAzODkuOTA3XS9TdWJ0eXBlL1dpZGdldC9UKEVuY291bnRlcmluZ1BoeXNpY2lhblByaW1hcnlQcmFjdGljZU5hbWUpL1RVKFByaW1hcnkgUHJhY3RpY2UgTmFtZTopL1R5cGUvQW5ub3Q+PgplbmRvYmoKNjE1IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzIyMy4xOTUgMzUyLjE2MSAzODguNDM1IDM4OS45MDddL1N1YnR5cGUvV2lkZ2V0L1QoRW5jb3VudGVyaW5nUGh5c2ljaWFuUHJpbWFyeVByYWN0aWNlQWRkcmVzcykvVFUoUHJhY3RpY2UgYWRkcmVzczopL1R5cGUvQW5ub3QvVigxNDczIEpvaG4gQ291bnRlciBCbHZkKS9BUDw8L04gMjQgMCBSPj4+PgplbmRvYmoKNjE2IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzM5MS4zMTUgMzUyLjE2MSA1NTYuNDM1IDM4OS45MDddL1N1YnR5cGUvV2lkZ2V0L1QoRW5jb3VudGVyaW5nUGh5c2ljaWFuUHJpbWFyeVByYWN0aWNlUGhvbmVOdW1iZXIpL1RVKFByYWN0aWNlIHBob25lIG5vLjopL1R5cGUvQW5ub3QvVihcKDYxM1wpIDUzMS0zMDA4KS9BUDw8L04gMjUgMCBSPj4+PgplbmRvYmoKNjE5IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA0MDk2L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzU1LjE5NDYgMjU4LjIxMSAxNTMuMjM1IDI5NC42MDRdL1N1YnR5cGUvV2lkZ2V0L1QoZVZpc2l0SW5pdGlhdGVkQnkpL1RVKGVWaXNpdCBJbml0aWF0ZWQgQnk6KS9UeXBlL0Fubm90L1YoUGF0aWVudCkvQVA8PC9OIDI2IDAgUj4+Pj4KZW5kb2JqCjYyMCAwIG9iago8PC9GIDQvRlQvVHgvRmYgNDA5Ni9NSzw8Pj4vUCA2OCAwIFIvUmVjdFsxNTUuOTk1IDI1OC4yMTEgMjU0LjAzNSAyOTQuNjA0XS9TdWJ0eXBlL1dpZGdldC9UKGVWaXNpdEluaXRpYXRlZERhdGUpL1RVKGVWaXNpdCBJbml0aWF0ZWQgRGF0ZTopL1R5cGUvQW5ub3QvVihOb3YgMjAsIDIwMTcgMTogMzcgUE0gVVRDKS9BUDw8L04gMjcgMCBSPj4+PgplbmRvYmoKNjIxIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA0MDk2L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzI1Ni45MTUgMjU4LjIxMSAzNTQuODM1IDI5NC42MDRdL1N1YnR5cGUvV2lkZ2V0L1QoZVZpc2l0Q2xvc2VEYXRlKS9UVShlVmlzaXQgQ2xvc2UgRGF0ZTopL1R5cGUvQW5ub3QvVihOb3YgMjAsIDIwMTcgMTozNyBQTSBVVEMpL0FQPDwvTiAyOCAwIFI+Pj4+CmVuZG9iago2MjMgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDQwOTYvTUs8PD4+L1AgNjggMCBSL1JlY3RbMzU3LjcxNSAyNTguMjExIDQ2My41NTUgMjk0LjYwNF0vU3VidHlwZS9XaWRnZXQvVChlVmlzaXRDb21tdW5pY2F0aW9uTWV0aG9kcykvVFUoZVZpc2l0IFR5cGVcKHNcKTopL1R5cGUvQW5ub3QvVihWaWRlbyBDYWxsKS9BUDw8L04gMjkgMCBSPj4+PgplbmRvYmoKNjIyIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA0MDk2L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzQ2Ni40MzUgMjU4LjIxMSA1NTYuNDM1IDI5NC42MDRdL1N1YnR5cGUvV2lkZ2V0L1QoVHJpYWdlUHJpb3JpdHkpL1RVKFRyaWFnZSBQcmlvcml0eTopL1R5cGUvQW5ub3Q+PgplbmRvYmoKNjI0IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzU0Ljk1NDYgMTY1LjM2OSA1NTYuNjc1IDI0NS45Nl0vU3VidHlwZS9XaWRnZXQvVChSZWFzb25Gb3JWaXNpdE5vdGVzKS9UVShQcmVzZW50aW5nIENvbXBsYWludCBcKGVudGVyZWQgYnkgcGF0aWVudFwpKS9UeXBlL0Fubm90L1YoVGVzdGluZyAtIFBsZWFzZSBJZ25vcmUpL0FQPDwvTiAzMCAwIFI+Pj4+CmVuZG9iago2MjYgMCBvYmoKPDwvREEoL0hlbHYgMTIgVGYgMCBnKS9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFs1NC44MzQ2IDEzMC44ODQgMjIwLjc5NSAxNTMuMzY4XS9TdWJ0eXBlL1dpZGdldC9UKFR5cGVPZlJlcXVlc3QpL1RVKFR5cGUgb2YgUmVxdWVzdDopL1R5cGUvQW5ub3QvVihJbW1lZGlhdGUgaGVhbHRoIGNvbmNlcm4pL0FQPDwvTiAzMSAwIFI+Pj4+CmVuZG9iago2MjggMCBvYmoKPDwvREEoL0hlbHYgMTIgVGYgMCBnKS9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFsyMjIuODM1IDEzMC44ODQgMzg4Ljc5NSAxNTMuMzY4XS9TdWJ0eXBlL1dpZGdldC9UKGVWaXNpdFJlcXVlc3RlZFBoeXNpY2lhbikvVFUoUmVxdWVzdCBQaHlzaWNpYW46KS9UeXBlL0Fubm90L1YoVGVzdDIgUGh5c2ljaWFuKS9BUDw8L04gMzIgMCBSPj4+PgplbmRvYmoKNjI1IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzM5MC45NTUgMTMwLjg4NCA1NTYuNzk1IDE1My4zNjhdL1N1YnR5cGUvV2lkZ2V0L1QoZVZpc2l0Q2F0ZWdvcmllcykvVFUoQ2F0ZWdvcmllczopL1R5cGUvQW5ub3QvVihJbmp1cnkpL0FQPDwvTiAzMyAwIFI+Pj4+CmVuZG9iago2MTAgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbNTA0Ljg2OCA2MTIuNTg4IDU1NS40MjMgNTk4Ljc1OF0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50U2V4KS9UVShBZ2U6KS9UeXBlL0Fubm90L1YoTWFsZSkvQVA8PC9OIDEzIDAgUj4+Pj4KZW5kb2JqCjYyNyAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFs0NDQuODk1IDYxMi41ODggNTAwLjM3NCA1OTguNzU4XS9TdWJ0eXBlL1dpZGdldC9UKFBhdGllbnRQcmVmaXgpL1R5cGUvQW5ub3Q+PgplbmRvYmoKNjMxIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzQzMS4wNDcgNTY1LjMxOCA1NTYuMDk4IDU3OS4xNDhdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudEhlYWx0aEluc3VyYW5jZVByb3ZpbmNlKS9UVShQcm92aW5jZTopL1R5cGUvQW5ub3QvVihPbnRhcmlvKS9BUDw8L04gMTYgMCBSPj4+PgplbmRvYmoKNjMzIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzQyNy44NzUgNTMyLjY5MyA1NTYuNTU4IDU0Ni41MjNdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudEVtYWlsQWRkcmVzcykvVFUoRW1haWwgQWRkcmVzczopL1R5cGUvQW5ub3QvVihncmFoYW1zdGF2ZWxleWJlcnJ5KzQwMEBnbWFpbC5jb20pL0FQPDwvTiA5IDAgUj4+Pj4KZW5kb2JqCjQyIDAgb2JqClsvSUNDQmFzZWQgNTg5IDAgUl0KZW5kb2JqCjYzNSAwIG9iagpbL0lDQ0Jhc2VkIDU5MiAwIFJdCmVuZG9iago1ODAgMCBvYmoKWy9JbmRleGVkIDYzNSAwIFIgMjM3IDU5MyAwIFJdCmVuZG9iago1ODEgMCBvYmoKPDwvQUlTIGZhbHNlL0JNL05vcm1hbC9DQSAxLjAvT1AgZmFsc2UvT1BNIDEvU0EgdHJ1ZS9TTWFzay9Ob25lL1R5cGUvRXh0R1N0YXRlL2NhIDEuMC9vcCBmYWxzZT4+CmVuZG9iago2MzYgMCBvYmoKPDwvT3JkZXJpbmcoSWRlbnRpdHkpL1JlZ2lzdHJ5KEFkb2JlKS9TdXBwbGVtZW50IDA+PgplbmRvYmoKNjM3IDAgb2JqCjw8L0FzY2VudCAxMDQwL0NJRFNldCA1OTQgMCBSL0NhcEhlaWdodCA3MTYvRGVzY2VudCAtMzI1L0ZsYWdzIDQvRm9udEJCb3hbLTY2NSAtMzI1IDIwMDAgMTA0MF0vRm9udEZhbWlseShBcmlhbCkvRm9udEZpbGUyIDU5NSAwIFIvRm9udE5hbWUvR0hNUEVMK0FyaWFsL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDQwMC9JdGFsaWNBbmdsZSAwL1N0ZW1WIDg4L1R5cGUvRm9udERlc2NyaXB0b3IvWEhlaWdodCA1MTk+PgplbmRvYmoKNjM4IDAgb2JqCjw8L0Jhc2VGb250L0dITVBFTCtBcmlhbC9DSURTeXN0ZW1JbmZvIDYzNiAwIFIvQ0lEVG9HSURNYXAvSWRlbnRpdHkvRFcgMTAwMC9Gb250RGVzY3JpcHRvciA2MzcgMCBSL1N1YnR5cGUvQ0lERm9udFR5cGUyL1R5cGUvRm9udC9XWzBbNzUwIDAgMjc4IDI3OCAyNzggMzU1IDU1NiA1NTYgODg5IDY2NyAxOTEgMzMzIDMzMyAzODkgNTg0IDI3OCAzMzMgMjc4IDI3OCA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgMjc4IDI3OCA1ODQgNTg0IDU4NCA1NTYgMTAxNSA2NjcgNjY3IDcyMiA3MjIgNjY3IDYxMSA3NzggNzIyIDI3OCA1MDAgNjY3IDU1NiA4MzMgNzIyIDc3OCA2NjcgNzc4IDcyMiA2NjcgNjExIDcyMiA2NjcgOTQ0IDY2NyA2NjcgNjExIDI3OCAyNzggMjc4IDQ2OSA1NTYgMzMzIDU1NiA1NTYgNTAwIDU1NiA1NTYgMjc4IDU1NiA1NTYgMjIyIDIyMiA1MDAgMjIyIDgzMyA1NTYgNTU2IDU1NiA1NTYgMzMzIDUwMCAyNzggNTU2IDUwMCA3MjIgNTAwIDUwMCA1MDAgMzM0IDI2MCAzMzQgNTg0IDY2NyA2NjcgNzIyIDY2NyA3MjIgNzc4IDcyMiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1MDAgNTU2IDU1NiA1NTYgNTU2IDI3OCAyNzggMjc4IDI3OCA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDQwMCA1NTYgNTU2IDU1NiAzNTAgNTM3IDYxMSA3MzcgNzM3XSAxNDFbMzMzIDMzMyA1NDldIDE0NVs3NzggNzEzIDU0OSA1NDkgNTQ5IDU1NiA1NzYgNDk0IDcxMyA4MjMgNTQ5IDI3NCAzNzAgMzY1IDc2OCA4ODkgNjExIDYxMSAzMzMgNTg0IDU0OSA1NTYgNTQ5IDYxMiA1NTYgNTU2XSAxNzJbNjY3IDY2NyA3NzhdIDE3Nls5NDQgNTU2XSAxNzlbMzMzIDMzMyAyMjIgMjIyIDU0OSA0OTQgNTAwIDY2NyAxNjcgNTU2IDMzMyAzMzMgNTAwIDUwMCA1NTYgMjc4IDIyMiAzMzNdIDE5OFs2NjcgNjY3IDY2NyA2NjcgNjY3IDI3OCAyNzggMjc4IDI3OCA3NzggNzc4IDc3OCA3MjIgNzIyIDcyMiAyNzggMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDU1NiAyMjIgNjY3IDUwMCA2MTEgNTAwIDI2MCA3MjIgNTU2IDY2NyA1MDAgNjY3IDU1NiA1ODQgNTg0IDMzMyAzMzMgMzMzIDgzNCA4MzQgODM0IDU1NiA3NzggNTU2IDI3OCA2NjcgNTAwIDcyMiA1MDAgNzIyIDUwMCA1NTYgNTUyIDMzMyA2NjcgNTU2IDY2NyA1NTYgNzIyIDYxNSA3MjIgNjY3IDU1NiA2NjcgNTU2IDU1NiAyMjIgNTU2IDI5MiA1NTYgMzM0IDcyMiA1NTYgNzIyIDU1NiA3NzggNTU2IDcyMiAzMzMgNzIyIDMzMyA2NjcgNTAwIDYxMSAyNzggNjExIDM3NSA3MjIgNTU2IDcyMiA1NTYgNjExIDUwMCA2MTEgNTAwIDU1MSA3NzggNzk4IDU3OCA1NTcgNDQ2IDYxNyAzOTUgNjQ4IDU1MiA1MDAgMzY1IDEwOTRdIDMxM1s1MDBdIDMxNVs1MDBdIDMxN1s1MDAgNTAwIDk3OSA3MTkgNTgzIDYwNCA1ODQgNjA0IDYwNCA3MDggNjI1IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcyOSA2MDRdIDM3Nls5OTAgOTkwIDk5MCA5OTAgNjA0IDYwNCA2MDQgMTAyMSAxMDUyIDkxNyA3NTAgNzUwIDUzMSA2NTYgNTk0IDUxMCA1MDAgNzUwIDczNSA0NDQgNjA0IDE4OCAzNTQgODg1IDMyMyA2MDQgMzU0IDM1NCA2MDQgMzU0IDY2NyA1NTYgNzIyIDUwMCA3MjIgNTAwIDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDcyMiA1NTYgNzIyIDU1NiAyNzggMjc4IDI3OCAyNzggMjc4IDI3OCAyNzggMjIyIDUwMCAyMjIgNjY3IDUwMCA1MDAgNTU2IDIyMiA3MjIgNTU2IDcyMyA1NTYgNzc4IDU1NiA3NzggNTU2IDcyMiAzMzMgNjY3IDUwMCA2MTEgMjc4IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgOTQ0IDcyMiA2NjcgNTAwIDIyMiA2NjcgNTU2XSA0NzNbODg5IDc3OCA2MTEgMjc4IDk0NCA3MjIgOTQ0IDcyMiA5NDQgNzIyIDY2NyA1MDAgMjIyIDMzMyA1NTYgNjAwIDgzNCA4MzQgODM0IDgzNCAzMzMgMzMzIDMzMyAzMzMgNjY3IDc4NCA4MzggMzg0IDc3NCA4NTUgNzUyIDIyMiA2NjcgNjY3IDY2OCA2NjcgNjExIDcyMiAyNzggNjY3IDY2OCA4MzMgNzIyIDY1MCA3NzggNzIyIDY2NyA2MTggNjExIDY2NyA2NjcgODM1IDc0OCAyNzggNjY3IDU3OCA0NDYgNTU2IDIyMiA1NDcgNTc1IDUwMCA0NDEgNTU2IDU1NiAyMjIgNTAwIDUwMCA1NzYgNTAwIDQ0OCA1NTYgNTY5IDQ4MiA1NDcgNTI1IDcxMyA3ODEgMjIyIDU0NyA1NTYgNTQ3IDc4MSA2NjcgODY1IDU0MiA3MTkgNjY3IDI3OCAyNzggNTAwIDEwNTcgMTAxMCA4NTQgNTgzIDYzNSA3MTkgNjY3IDY1NiA2NjcgNTQyIDY3NyA2NjcgOTIzIDYwNCA3MTkgNzE5IDU4MyA2NTYgODMzIDcyMiA3NzggNzE5IDY2NyA3MjIgNjExIDYzNSA3NjAgNjY3IDc0MCA2NjcgOTE3IDkzOCA3OTIgODg1IDY1NiA3MTkgMTAxMCA3MjIgNTU2IDU3MyA1MzEgMzY1IDU4MyA1NTYgNjY5IDQ1OCA1NTkgNTU5IDQzOCA1ODMgNjg4IDU1MiA1NTYgNTQyIDU1NiA1MDAgNDU4IDUwMCA4MjMgNTAwIDU3MyA1MjEgODAyIDgyMyA2MjUgNzE5IDUyMSA1MTAgNzUwIDU0MiA1NTYgNTU2IDM2NSA1MTAgNTAwIDIyMiAyNzggMjIyIDkwNiA4MTMgNTU2IDQzOCA1MDAgNTUyIDQ4OSA0MTFdIDY1MVsxMDczIDY5MCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDM4MyAwIDI3NSAwIDAgMjc4IDU2MyA1NDIgMzk5IDUwOCA2MDIgMjQ3IDM4MiA1OTkgNTkwIDI0NyA1MDkgNDYxIDQ2MyA1OTkgNjAxIDI0NyAzNTMgNTc0IDUyOSA1NjYgNTQ2IDQ2MSA0NzkgNTUwIDUwOSA2OTQgNjQzIDQ5MyA0OTMgNDkzIDIzNiA0MTcgODE1IDI0NyA1MDkgNTA5IDQ2MyA0NjMgNTM1IDY5NCA2OTQgNjk0IDY5NCA1NjMgNTYzIDU2MyA1NDIgMzk5IDUwOCA2MDIgMjg3IDQxMSA1OTAgMjg3IDUwOSA0NjEgNDYzIDYwMSAzNTMgNTc0IDU2NiA1NDYgNDc5IDU1MCA1MDkgNjk0IDY0MyAyNDcgNTQyIDQ2MSA1NDYgNTc2IDAgMCAwIDAgMzE5IDMxOSAzNTYgNDEzIDIwNyAwIDAgMCAwIDAgMCAwIDAgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDUyNiAzMTkgNTI2IDc1MCA3NTAgMjgyIDc1MCA1MjYgNTI2IDUyNiA3NTAgNzUwIDc1MCA3NTAgNzUwIDAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA2MzggNzUwIDc1MCA3NTAgNzEzIDcxMyAyNDQgMjQ0IDc1MCA3NTAgNzUwIDc1MCA1NjMgNTI2IDUzMCA1MzAgNDg5IDQ4OSA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDYzOCA1ODggMzc1IDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDAgMCAwIDAgMCA3NTAgNzUwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNTU2XSA4NjRbNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDMxOSAzMTkgNzUwIDYxNiA0MTMgMjA3IDIyOSAyMDcgMjI5IDQzMiA0MzIgMjA3IDIyOSA2MzggNTg4IDI0NCAyNDQgMjA3IDIyOSA3MTMgNzEzIDI0NCAyNDQgMjgyIDM3NSA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDMzNyAzMzcgMzM3IDMzNyA0ODkgNDg5IDQ4OSA0ODkgODIxIDgyMSA1MzEgNTMxIDgyMSA4MjEgNTMxIDUzMSAxMDk4IDEwOTggODQ2IDg0NiAxMDk4IDEwOTggODQ2IDg0NiA1ODIgNTgyIDU4MiA1ODIgNTgyIDU4MiA1ODIgNTgyIDU0NCA0NTAgNTI2IDM5NCA1NDQgNDUwIDUyNiAzOTQgNzg5IDc4OSAyNjggMjYzIDU4MiA1ODIgMjY4IDI2MyA2MDEgNjAxIDM5NCAzOTQgNTA2IDUwNiAyMDcgMjA3IDMzOCAzMzggMzk0IDM5NCA1MjYgNTI2IDI0NCAyNDQgMjgyIDM3NSA0NTAgMzk0IDQzMiA0MzIgNjM4IDU4OCA2MzggNTg4IDI0NCAyNDQgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA3NTAgNzUwIDAgMCA3NTAgNzUwIDc1MCAwIDAgNzUwIDc1MCAwIDAgNzUwIDc1MCA3NTAgMCAwIDAgMCAwIDAgNzUwIDAgMCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAzMTkgMzE5IDMxOSA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAxMjVdIDExMjlbMjAwMCA4NTcgNjU2IDg1NCA2NjkgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA1MTMgODM0IDgzNCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDIyMiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgMjc4IDIyMiAyNzggMjIyIDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDc3OCA1NTYgODU3IDY1NiA4NTcgNjU2IDg1NyA2NTYgODU3IDY1NiA4NTcgNjU2IDcyMiA1NTYgNzIyIDU1NiA4NTQgNjY5IDg1NCA2NjkgODU0IDY2OSA4NTQgNjY5IDg1NCA2NjkgNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNjY3IDU1NiAyNzggMjIyIDc3OCA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDAgMCAwIDAgNTQyIDM2NSA5MjMgNjY5IDU4MyA0MzggNTgzIDQzOCA3MjIgNTUyIDU1NiA1MDAgNTU2IDUwMCA2NjcgNTAwIDY2NyA1MjEgNjY3IDU1NiA3NTIgNTU2IDc3OCA1NTYgNzEzIDI0NCAyNjggMjYzIDU4MiAyNDQgMjQ0IDI0NCAyNDQgMjQ0IDI0NCAyNjkgMCAwIDMzMyAzMzMgMCAwIDAgMCAyMDcgMjI5IDIwNyAyMjkgMjA3IDIyOSAyMDcgMjI5IDQzMiA0MzIgNDMyIDQzMiA2MzggNTg4IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgODIxIDgyMSA1MzEgNTMxIDgyMSA4MjEgNTMxIDUzMSA4MjEgODIxIDUzMSA1MzEgMTA5OCAxMDk4IDg0NiA4NDYgMTA5OCAxMDk4IDg0NiA4NDYgNTgyIDU4MiA1NDQgNDUwIDUyNiAzOTQgNzg5IDc4OSA3ODkgMjY4IDI2MyA3ODkgNzg5IDI2OCAyNjMgNzg5IDc4OSAyNjggMjYzIDc4OSA3ODkgMjY4IDI2MyA3ODkgNzg5IDI2OCAyNjMgNTgyIDU4MiA1ODIgNTgyIDExNTUgMTE1NSA5MDYgOTA2IDgxMiA5MzMgMzk0IDUxNSA2MDEgNjAxIDM5NCAzOTQgNjAxIDYwMSAzOTQgMzk0IDYwMSA2MDEgMzk0IDM5NCA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDUwNiA1MDYgMjA3IDIwNyA1MDYgNTA2IDIwNyAyMDcgNTA2IDUwNiAyMDcgMjA3IDUwNiA1MDYgMjA3IDIwNyA1MjYgNTI2IDI0NCAyNDQgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgMjQ0IDI0NCA1MjYgNTI2IDU2MyA1MjYgNTMwIDUzMCAyODIgMzc1IDM4OCAzODggMzg4IDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA2MzggNTg4IDYzOCA1ODggMjQ0IDI0NCA0MzIgNDMyIDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDgxMiA4MTIgODEyIDgxMiAyMDcgMCAwIDAgMCAwIDAgMCAxMTIzIDEwODQgMCAwIDAgMCAwIDAgMTk0IDM3MCAwIDAgNjAwIDAgMCAwIDgyMSA4MjEgNTMxIDUzMSAxMDk4IDEwOTggODQ2IDg0NiA1NDQgNDUwIDUyNiAzOTQgNDEzIDMzOCAyODIgMjQ0IDMyMCAyNDQgMjQ0IDI0NCAyNDQgMjQ0IDgxMiA5MzMgMjQ3IDAgMzQyIDQ5MyA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA1NDQgNjAxIDUyNiA1MjYgNTQ0IDYwMSA1NTYgNzU4IDY1NiA1NTYgNjU2IDU1NiA3MjIgNzIyIDUwMCA3MjIgODEwIDY1NiA1NTYgNTU3IDY2NyA2MDQgNjExIDc3OCA2MjQgODgxIDIyMiAyNzggNjY3IDUwMCAyMjIgNTAwIDg5MSA3MjIgNTU2IDc3OCA4NjggNjY3IDc1NCA1NTYgNjY3IDY2NyA1MDAgNjE4IDM4MCAyNzggNjExIDI3OCA2MTEgNzQ4IDcyMiA3NzIgNTAwIDYxMSA1MDAgNjExIDYxMSA1NDUgNTQ1IDU1NiA1NTYgNDU4IDQ4NyA1NTYgMjYwIDQxMyA1ODQgMjc4IDEzMzMgMTIyMiAxMDQ5IDEwNjIgODMzIDQ1MSAxMjIyIDk0NCA3NzEgNTU2IDY2NyA1NTYgMCA2NjcgNTU2XSAxNzUyWzg4OSA3NzggNTU2IDc3OCA1NTYgNjY3IDUwMCA3NzggNTU2IDc3OCA1NTYgNjExIDU0NSAyMjIgMTMzMyAxMjIyIDEwNDkgNzc4IDU1NiAxMDM0IDYxOCA3MjIgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgMjc4IDI3OCAyNzggMjc4IDc3OCA1NTYgNzc4IDU1NiA3MjIgMzMzIDcyMiAzMzMgNzIyIDU1NiA3MjIgNTU2IDY2NyA1MDAgNjExIDI3OCA1NDUgNDM3IDcyMiA1NTYgNzA2IDYwNCA1NjUgNjExIDUwMCA2NjcgNTU2IDY2NyA1NTYgNzc4IDU1NiAwIDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDY2NyA1MDAgNTU2IDU1NiA1NTYgNTU2IDUwMCA1MDAgNTU2IDU1NiA1NTYgNzM5IDQ1OCA0NTggNjMxIDUwNyAyNzggNTU2IDU1NiA1NTkgNTAxIDYxNyA1NTYgNTU2IDU1NiAyMjIgMjIyIDM1NiAzMjcgMzA0IDIyMiA1NzIgODMzIDgzMyA4MzMgNTU2IDU1NiA1NTMgNTU2IDc5MSA3ODEgNTUwIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyA1NDIgNTQyIDUwMCAyMjIgMjYwIDIyMiAzNDkgMjc4IDI3OCA1NTYgNTY4IDU0NyA1MDAgNzIyIDUwMCA1MjAgNTAwIDU0MSA1NDUgNTQ1IDUwMCA1MDAgNTAwIDUwMCA3NzggNTMxIDUwNyA1NTkgNTUyIDM5NyA1MDAgNDA0IDU1NiA1MDAgNTAwIDk2NCA5MDYgMTAwNSA3MTIgNDI5IDcxOSA3NjQgNjYxIDYzMiA0ODUgNTI3IDM4MyAzODMgMTU5IDI0MCAyNDAgMjQwIDM2NCA0ODEgMzIxIDE5MSAzNTUgMjIyIDIyMiAyMjIgMzMzIDMzMyAzNDkgMzQ5IDU4NCA1ODQgNTg0IDU4NCAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMjc4IDI3OCAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMyMiAxNTcgMzQwIDMyOCAzNDkgMzgzIDM4MyAzODMgMzgzIDM4MyAzMzMgMzMzIDMzMyAzMzMgMzMzIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAzMzMgMzMzIDMzMyA1NzUgNTQ3IDc3MiA5NTggNzcyIDU2MCA3ODEgNjAxIDc3OCA1NTYgNzIyIDUwMCA2MTEgNDA0IDYyNSA1MjkgNzU2IDU3NyA4OTEgODMzIDY3NCA1NTYgNjc0IDUwMCA2NjcgNjY3IDYwOSA1OTYgNzM3IDU1NCA0NjQgNDEwIDYwMSA1NzMgNTAwIDIyMiA3NzggNDQyIDQ0MiA2NjcgNzE5IDU1NiA1NTkgMTMzOCA2MjQgNzc4IDYxMyA5NTAgNzEzIDY2OCA1MDAgODk3IDY5NSA4MjkgNjg1IDEwNTMgODY3IDYwNCA0NTggNzk2IDY4OCA3NzggNTU2IDgwMyA2MzEgODAzIDYzMSAxMDc0IDg5NiA4MzMgNjEyIDExOTEgODUyIDAgMTMzOCA2MjQgNzIyIDUwMCA1MDMgMCAwIDAgMCAwIDAgNzE5IDU1OSA2NTYgNTIxIDY2NyA1NTYgNjcwIDU0OSA2MDQgNDU4IDU4MyA0MzggNzQyIDUzNiA4NzkgNjQ4IDExMzcgODcwIDc1MyA1MjEgNzIyIDUwMCA2MTEgNDU4IDkyNSA2OTEgNjY3IDUyMSA4NjEgNjY2IDg2MSA2NjYgMjc4IDkyMyA2NjkgNjY3IDU1MSA2NTYgNTgzIDcyMiA1NTIgNzIyIDU1MiA2NjcgNTIxIDgzMyA2ODggMzMzIDY2NyA1NTYgNjY3IDU1Nl0gMjM0Nls4ODkgNjY3IDU1NiA3NTIgNTU2IDkyMyA2NjkgNjA0IDQ1OCA2MDQgNTQ1IDcxOSA1NTkgNzE5IDU1OSA3NzggNTU2IDc3OCA1NTYgNzE5IDUxMCA2MzUgNTAwIDYzNSA1MDAgNjM1IDUwMCA2NjcgNTIxIDg4NSA3MTkgNjU2IDU1NiA5NjggODc2IDk1NiA4MTUgNjYzIDUwOSA5NzAgOTEwIDEwMzQgODc4IDc3OCA1NTkgNzQ3IDY2NiAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA3MjIgNTAwIDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjExIDI3OCA3NzggNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiAyNzggMjIyIDI3OCAyNzggNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNTU2IDIyMiA1NTYgMjIyIDU1NiAyMjIgNTU2IDIyMiA4MzMgODMzIDgzMyA4MzMgODMzIDgzMyA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDc3OCA1NTYgNjY3IDU1NiA2NjcgNTU2IDcyMiAzMzMgNzIyIDMzMyA3MjIgMzMzIDcyMiAzMzMgNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDYxMSAyNzggNjExIDI3OCA2MTEgMjc4IDYxMSAyNzggNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDY2NyA1MDAgNjY3IDUwMCA5NDQgNzIyIDk0NCA3MjIgNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNjExIDUwMCA2MTEgNTAwIDYxMSA1MDAgNTU2IDI3OCA3MjIgNTAwIDU1NiAyMjIgNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA2NjcgNjY3IDgxMyA4MTMgODEzIDgxMyA4MTMgODEzIDQ0NiA0NDYgNDQ2IDQ0NiA0NDYgNDQ2IDc2NSA3NjUgOTI4IDkyOCA5MjggOTI4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODIwIDgyMCAxMDE1IDEwMTUgMTAxNSAxMDE1IDEwMTUgMTAxNSAyMjIgMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDM3NSAzNzUgNTcxIDU3MSA1NzEgNTcxIDU3MSA1NzEgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODI3IDgyNyAxMDIyIDEwMjIgOTczIDk3MyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDgxMyA5NjAgMTAwOSA5NjAgNzgxIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc4MSA3OTYgNzk2IDk5MiA5OTIgOTQzIDk0MyA5NDMgOTQzIDU3OCA1NzggNDQ2IDQ0NiA1NTYgNTU2IDIyMiAyMjIgNTU2IDU1NiA1NDcgNTQ3IDc4MSA3ODEgNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA2NjcgNjY3IDgxMyA4MTMgODEzIDgxMyA4MTMgODEzIDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODIwIDgyMCAxMDE1IDEwMTUgMTAxNSAxMDE1IDEwMTUgMTAxNSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc5NiA3OTYgOTkyIDk5MiA5NDMgOTQzIDk0MyA5NDMgNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDY2NyA2NjcgNjY3IDY2NyA2NjcgMzMzIDMzMyAzMzMgMzMzIDMzMyA1NTYgNTU2IDU1NiA1NTYgNTU2IDgxMyA4MTMgODY5IDg2OSA3MjIgMzMzIDMzMyAzMzMgMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjc4IDI3OCA0MjQgNDI0IDMzMyAzMzMgMzMzIDU0NyA1NDcgNTQ3IDU0NyA1NjkgNTY5IDU0NyA1NDcgNjY3IDY2NyA4NjIgODg3IDc2NSAzMzMgMzMzIDMzMyA3ODEgNzgxIDc4MSA3ODEgNzgxIDkyNCA4MjcgODk0IDc5NiA3NDggMzMzIDMzMyA1NTYgNzIyIDcyMiA4MzMgNzIyIDExNjQgOTQ0IDY2NyA2MTFdIDI4MjRbNTAwIDU5NCAwIDAgMCAwIDIyMiAyMjIgNTIxIDY2NyA2ODIgMzQ5IDY4NSAzNjcgNjg3IDY4NyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAyNzggMzMzIDMzMyAzMzMgMzMzIDM5NyAzOTcgMzMzIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA2NjcgNTU2IDQ5NiA3NDggODg5IDUzMSA1MDAgNTUxIDU1MSA0OTAgNDU4IDIyMiA0MjIgNTAwIDQwMSA2ODggNTU5IDU1NiA1MDAgNjA4IDYwOCA2MDggOTQ0IDQ1NyA1NTYgNTU2IDUyMSA1NDIgNTQyIDQ1OCA1NDcgNTk3IDczMyA1OTcgNTAwIDcyMiA1MDAgNDU4IDQyNyA2MDcgMzY1IDUwMCA1NDIgNTIxIDcxMyA1ODMgNDUzIDY2NCA0MTUgNDE1IDQ0OSA0MTAgNDEwIDQ5NiA0MjkgMTY3IDMxNCA0MjUgMzUyIDUxMCA0MzAgNDI5IDUxMiAzODIgNDE4IDQ1MSA0MzMgNDI5IDYyMyAzNzIgMzcyIDM3NyA2MDAgMzc3IDM3NyAzNzIgMzcyIDMxOCAzMTggMzc3IDE1NyAzMzkgNTczIDM4MiAzNzcgMzU0IDM3NyAzNzcgMzc4IDIyMCAzODIgNDA3IDU3MyAzMjEgMzkxIDM4NSAzMjEgMzc4IDQ0MCAzNDMgMTU3IDI0MCAzODIgMzIxIDM4NSAzMjEgMzc5IDQ0MCAzNDMgOTM2IDEzMDAgNDM5IDEyNzMgNjU3IDIzOSA1NDQgMCAwIDAgMCAwIDAgMCAwIDAgMzM3IDMzNyA0ODkgNDg5IDQ1MCAzOTQgNDUwIDM5NCA3MDkgNjU1IDc0OSA2MDcgNjA5IDc0NSA2NTYgNzg5IDU4NCAwIDAgMCA1NTYgMzMzIDM1NCAyMDcgMjA3IDIwNyAyMDcgNzkzIDEyMjEgNTAwXSAzMDI0WzUwMF0gMzAyNlszMzMgMjUwIDE2NyA1NTYgMjc4IDIwMCA4MyAwIDczNyA3MjIgODMzIDY4OCA5MDggODg3IDg4NyA2NjcgNzIyIDUwMCA1NTYgNjExIDUwMCA1MDAgNTgxIDAgMCAwIDAgMCA1NjkgNzIyIDcyMiA3MjIgNTQyIDM2NSAwIDAgMCAzNTMgMCAyNjMgMjg5IDAgMCAwIDAgMCAwIDAgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgMzM3IDMzNyAzMzcgMzM3IDQ4OSA0ODkgODIxIDgyMSA1MzEgNTMxIDU0NCA0NTAgNTI2IDM5NCA1NDQgNDUwIDUyNiAzOTQgNTQ0IDQ1MCA1MjYgMzk0IDc4OSA3ODkgMjY4IDI2MyA3ODkgNzg5IDI2OCAyNjMgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgMzM4IDMzOCAzOTQgMzk0IDMzOCAzMzggMzk0IDM5NCA1MjYgNTI2IDI0NCAyNDQgNTI2IDUyNiAyNDQgMjQ0IDUyNiA1MjYgMjQ0IDI0NCA1MDYgNTA2IDIwNyAyMDcgNDg5IDQ4OSA0ODkgNDg5IDgyMSA4MjEgNTMxIDUzMSA1NTYgNTU2IDI3OCA4MzMgNTU2IDU1NiAzMzMgMzMzIDUwMCAyNzggNTAwIDU1NiAzODAgNTU3IDc4NiAyMjIgMjIyIDU1NiA1NDcgNTY4IDU1NiA1NTYgMjc4IDcxMyA1MDAgMjIyIDgzMyA1NTYgNTU2IDMzMyA1MDAgMzg3IDUwMCA1MDAgNTAwIDU1NiA1NTYgNTU2IDU1NiA0NTggNDU4IDY1MCAyMjIgNTAwIDIyMiA1NTYgNTQ1IDM3NyAzNTQgMzQ4IDM3MyAzMTggMjI5IDIyOSAzNzcgMzgzIDE1NyAxNTcgMTU3IDE1NyAyNzEgMTU3IDE1NyAyNzUgNTcyIDU3MiAzODIgMzgyIDM4MiAzNzcgMzc1IDM0MCAxNTcgMjIwIDM4MiAzODggMzc4IDM1NCAzMjEgMzU4IDM1OCAzNTggMzY5IDM2NCAwIDAgMCAwIDI3OCAzNzIgMzcyIDM3NyAzMjggMzcyIDc3OCA2NjcgNTU2IDcyMiAzMzMgNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCAyMjIgMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDU0NyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA1NDcgMjIyIDIyMiAyMjIgMjIyIDU0NyA1NDcgNTQ3IDU0NyA1NDQgNjAxIDQ1MyA2NjcgNzIyIDY2OCA2NjcgNTU2IDUwMCAyMjIgNzM3IDU1NiA3MjIgMzMzIDY2NyA1MDAgNTAwIDUwMCA1MDAgMjIyIDU0MiAzNjUgNjY3IDUwMCA2NjcgNTAwIDYwNCA0NTggNjU2IDU4MyAwIDAgMCAwIDAgMCAwIDAgMCA5NDMgNDkwIDUwMCA1NTYgMjIyIDU1NiA2NjcgNzIyIDU1NiAyNzggNzIyIDU1NiA2NjcgNTAwIDYxMSA1MDAgNTAwIDU3NyA0MjUgNjQ4IDAgMCAwIDAgMCAwIDIyMiA3MjMgNzIyIDcyMyAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNzc4IDU1NiA5NDQgNzIyIDcwMyAwIDczMiA1OTcgMTAzNyA4NDEgMjc4IDQzOCAxOTEgMTkxIDUwMCA1MDAgMjc4IDI3OCAyNzggMzMzIDAgMCAwIDAgMCAwIDAgMCA2MTEgNTU2IDU1NiAzODQgNTM5IDUzNCA1NTYgNTM5IDU2MSA1MTkgNTU2IDU1OSA1NTYgMzg3IDU1NiA1NTYgNTU2IDU1NiA1NjIgNTIzIDU1NiA1NjAgNzIxIDcyOCA3NDYgMTE2MSA3NDYgMzc2IDY1NyA3NzggNTU2IDIyMiA0OTYgMjU1IDU1NiAyODkgNTU5IDU1NiA1NTYgMzc2IDI1NSAyMjIgNTU1IDU2NyA1OTUgNjEzIDU1NCA1MDQgNjQ4IDYxNyAyMzkgNDMxIDU2NyA0NjcgNzIyIDYxNSA2NDkgNTUzIDY0OSA2MDcgNTUzIDUwOCA2MDggNTUxIDc5MyA1NTQgNTUzIDUwNyA4MjEgODMzIDQ2NyA2NDkgNTU0IDYxMyA1OTUgNTU1IDU1NSA1NTUgNTU1IDU1NSA1NTUgNTk1IDU1NCA1NTQgNTU0IDU1NCAyMzkgMjM5IDIzOSAyMzkgNjE1IDY0OSA2NDkgNjQ5IDY0OSA2NDkgNjA4IDYwOCA2MDggNjA4IDU1MyA1NTUgNTU1IDU1NSA1OTUgNTk1IDU5NSA1OTUgNjEzIDYxMyA1NTQgNTU0IDU1NCA1NTQgNTU0IDY0OCA2NDggNjQ4IDY0OCA2MTcgNjE4IDIzOSAyMzkgMjM5IDIzOSAyMzkgNjU4IDQzMSA1NjcgNDY3IDQ2NyA0NjcgNDY3IDYxNSA2MTUgNjE1IDYyMCA2NDkgNjQ5IDY0OSA2MDcgNjA3IDYwNyA1NTMgNTUzIDU1MyA1NTMgNTUzIDUwOCA1MDggNTA4IDUwNyA2MDggNjA4IDYwOCA2MDggNjA4IDYwOCA3OTMgNzkzIDc5MyA3OTMgNTUzIDU1MyA1NTMgNTA3IDUwNyA1MDcgNTU1IDgyMSA2NDkgNTU1IDU2NyA0NjAgNTU1IDU1NCA1MDcgNjE3IDY0OSAyMzkgNTY3IDU0NCA3MjIgNjE1IDUyMyA2NDkgNjEyIDU1MyA1MTggNTA4IDU1MyA2NTkgNTU0IDY1OCA2NDkgNTU1IDU1NCA2MTcgMjM5IDY0OSA1NTMgNjQ5IDIzOSA1NTMgNTU0IDcxMCA0NjAgNTk3IDU1MyAyMzkgMjM5IDQzMSA4NjkgODM5IDczMSA1MTEgNTQ4IDYxMiA1NTUgNTY1IDU2NyA0NjAgNTUxIDU1NCA3OTEgNTE1IDYxMiA2MTIgNTExIDU1MSA3MjIgNjE3IDY0OSA2MTIgNTUzIDU5NSA1MDggNTQ4IDYzMSA1NTQgNjA3IDU2MSA3NzAgNzY1IDY4NiA3MzggNTQyIDU5NyA4MzUgNjA3IDM5MiAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjggNzI4IDcyOCA3MjggNzI4IDcyOCA3MjggNzI4IDcyOCA3MjggNzI4IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiA1MTEgMzc2IDM3NiAzNzYgMjU1IDI1NSAzMDEgMzMxIDI1NSAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDY1NyA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAyMjIgNDk2IDI1NSAyNTUgMzAxIDMzMSAyNTUgMjg5IDI4OSAzNzUgMjg5IDU1OSA1NTkgNTU5IDU1OSA1NzggMzMzIDMzMyAzMzMgMzMzIDYxNiA2MTYgNjE2IDc1NSA2MDQgNzM2IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDE1NzMgMTc1NiAwIDE4NTMgMCAwIDAgMCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDgyMSA4MjEgNTMxIDUzMSA0ODkgNDg5IDU2MyA1MjYgNTMwIDUzMCAyMDcgMjI5IDIwNyAyMjkgNjM4IDU4OCAyNDQgMjQ0IDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDI0NCAyNDQgNDMyIDQzMiA0MzIgNDMyIDgxMiA4MTIgODEyIDgxMiA1NjMgNTI2IDUzMCA1MzAgODIxIDgyMSA1MzEgNTMxIDgyMSA4MjEgNTMxIDUzMSA2MDEgNjAxIDM5NCAzOTQgNTg4IDYyNSA1NzMgNjExIDkyMCA3MzEgODgyIDYzNCAxNDY0IDAgMCAwIDAgMCA2MzggNTg4IDI0NCAyNDQgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA2MzggNTg4IDI0NCAyNDQgNjM4IDU4OCAyNDQgMjQ0IDYzOCA1ODggMjQ0IDI0NCAwIDU3NyA0NzUgNjExIDQ1OCA3MTkgNTg0IDY2NyA1NTYgMTMwMCA1NTYgNjY3IDk2MCA3NjAgNzg4IDcxOCA5NTggODU2IDY2NyA1MDAgMTA2OCA4ODQgMTEzMiA4NTEgNzIyIDU0MiA3MDUgNTU0IDI3OCAyNzggNTU3IDc2NyAzOTggNTkxIDU1NyA2NjggNTc2IDgzMyA2NjcgNzMyIDY5NSAzMzMgNTU2IDQ5MCAxNTkgMzIxIDY2NyA2MTEgMjc4IDc3OSAxNDE3IDEwMzYgMTM4MSAxODUzIDIwNyAyMDcgMjA3IDIyOSAyMDcgMjA3IDIwNyAyMDcgMjkwIDIwNyAyMDcgMjA3IDIwNyAyMDcgMjA3IDIwNyAyMDcgMjA3IDIwNyAyMDcgMjQ0IDI0NCAyNDQgMjQ0IDI0NCAyNzIgMjQ0IDIwMCAzNDMgMzQzIDU1NiAzNjQgMzY0IDUxOSA1MTkgNjM4IDYzOCA2MzggNjM4IDYzOCA2MzggNjM4IDYzOCA1NjMgNTYzIDQ4NyA1NjMgNTYzIDQ4NyA3MTMgNzEzIDI0NCAyNDQgNTYzIDUyNiA1MzAgNTMwIDU4MiA1ODIgNTgyIDU4MiA3ODkgNzg5IDI2OCAyNjMgNTgyIDU4MiAyNjggMjYzIDUwNiA1MDYgMjA3IDIwNyAzMzggMzM4IDM5NCAzOTQgNjM4IDU4OCAyNDQgMjQ0IDYzOCA1ODggMjQ0IDI0NCA0NjQgNDY0IDQzMiA0MzIgNDI3IDQyNyAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA1NDQgNjAxIDAgMzk5IDUwOCA2MDIgNjQzIDAgMCAzMTkgMzE5IDUzMyA1MzAgNTMzIDUzMCA1MzMgNTMwIDUzNCA1MzMgNTMwIDU4MiAzMTkgMzk0IDI3MyAxODUgMCA3OTMgNzM5IDcyNSA3MTYgNzE4IDcyNSA3MDkgNTk4IDcyNCA4MDcgNzE2IDY1OSA1MjggOTI0IDc2NyA2OTUgNjE2IDcwNiA3MTggNzAwIDc1NCA3MTYgNzA4IDcwMCA3MjUgNjk5IDc5MiA3MzggNzY0IDcyNSA2OTggNjYwIDY3OCA2NzcgNTE2IDc2MiA2ODYgNzgyIDc2MiAyNzQgMjIyIDE2OSAyMDAgMjY1IDIzMSA1MTQgODMzIDU1MSA1ODAgNTgzIDU1MyA1NTAgNDkyIDU1MSA2NjcgNTgwIDU1MSAyMjAgODM0IDU0MiA1NTMgNTUxIDUyMyA1NTMgNTU5IDU1MSAyMjAgNTUzIDQ1NiA1NTEgMzQ3IDgzMyA1MTcgNTY0IDU1MSA1NTEgODMxIDU1MSA1NTUgMzk0IDgzMSA1NTAgNTU1IDc0NCA3MTMgMjc4IDMyNCAxMDAxIDEwMDEgNzI3IDExMDQgMTEwNCAxMTAyIDExMDQgMTM4NSA1NTZdIDQxOThbMCAwIDcxMyA3MTMgMjQ0IDI0NCAxNzEgMzM3IDMzNyAxMDk4IDEwOTggODQ2IDg0NiA4MTIgOTMzIDM5NCA1MTUgMjgyIDE5NyA0ODkgNDg5IDAgNTAwIDcyMiA1NTIgMTMzMCAxMDY5IDY2NyA1NjUgNjU2IDU4MyA4MzAgNzg2IDUzNCA3NTMgNzUzIDUzNyA3NDMgNzk0XV0+PgplbmRvYmoKNjM5IDAgb2JqCls2MzggMCBSXQplbmRvYmoKNTgyIDAgb2JqCjw8L0Jhc2VGb250L0dITVBFTCtBcmlhbC9EZXNjZW5kYW50Rm9udHMgNjM5IDAgUi9FbmNvZGluZy9JZGVudGl0eS1IL1N1YnR5cGUvVHlwZTAvVG9Vbmljb2RlIDU5NiAwIFIvVHlwZS9Gb250Pj4KZW5kb2JqCjY0MCAwIG9iagpbNjM4IDAgUl0KZW5kb2JqCjU4MyAwIG9iago8PC9CYXNlRm9udC9VREhHSEErQXJpYWwvRGVzY2VuZGFudEZvbnRzIDY0MCAwIFIvRW5jb2RpbmcvSWRlbnRpdHktSC9TdWJ0eXBlL1R5cGUwL1RvVW5pY29kZSA1OTcgMCBSL1R5cGUvRm9udD4+CmVuZG9iago2NDEgMCBvYmoKWzYzOCAwIFJdCmVuZG9iago1ODQgMCBvYmoKPDwvQmFzZUZvbnQvSE9EUFZVK0FyaWFsL0Rlc2NlbmRhbnRGb250cyA2NDEgMCBSL0VuY29kaW5nL0lkZW50aXR5LUgvU3VidHlwZS9UeXBlMC9Ub1VuaWNvZGUgNTk4IDAgUi9UeXBlL0ZvbnQ+PgplbmRvYmoKNjQyIDAgb2JqCjw8L09yZGVyaW5nKElkZW50aXR5KS9SZWdpc3RyeShBZG9iZSkvU3VwcGxlbWVudCAwPj4KZW5kb2JqCjY0MyAwIG9iago8PC9Bc2NlbnQgMTA0MC9DSURTZXQgNTkwIDAgUi9DYXBIZWlnaHQgNzE2L0Rlc2NlbnQgLTMyNS9GbGFncyA0L0ZvbnRCQm94Wy02NjUgLTMyNSAyMDAwIDEwNDBdL0ZvbnRGYW1pbHkoQXJpYWwpL0ZvbnRGaWxlMiA1OTEgMCBSL0ZvbnROYW1lL0FNUEFOTytBcmlhbE1UL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDQwMC9JdGFsaWNBbmdsZSAwL1N0ZW1WIDg4L1R5cGUvRm9udERlc2NyaXB0b3IvWEhlaWdodCA1MTk+PgplbmRvYmoKNTUgMCBvYmoKPDwvQmFzZUZvbnQvQU1QQU5PK0FyaWFsTVQvQ0lEU3lzdGVtSW5mbyA2NDIgMCBSL0NJRFRvR0lETWFwL0lkZW50aXR5L0RXIDEwMDAvRm9udERlc2NyaXB0b3IgNjQzIDAgUi9TdWJ0eXBlL0NJREZvbnRUeXBlMi9UeXBlL0ZvbnQvV1swWzc1MCAwIDI3OCAyNzggMjc4IDM1NSA1NTYgNTU2IDg4OSA2NjcgMTkxIDMzMyAzMzMgMzg5IDU4NCAyNzggMzMzIDI3OCAyNzggNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDI3OCAyNzggNTg0IDU4NCA1ODQgNTU2IDEwMTUgNjY3IDY2NyA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTAwIDY2NyA1NTYgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgNjY3IDk0NCA2NjcgNjY3IDYxMSAyNzggMjc4IDI3OCA0NjkgNTU2IDMzMyA1NTYgNTU2IDUwMCA1NTYgNTU2IDI3OCA1NTYgNTU2IDIyMiAyMjIgNTAwIDIyMiA4MzMgNTU2IDU1NiA1NTYgNTU2IDMzMyA1MDAgMjc4IDU1NiA1MDAgNzIyIDUwMCA1MDAgNTAwIDMzNCAyNjAgMzM0IDU4NCA2NjcgNjY3IDcyMiA2NjcgNzIyIDc3OCA3MjIgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTAwIDU1NiA1NTYgNTU2IDU1NiAyNzggMjc4IDI3OCAyNzggNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA0MDAgNTU2IDU1NiA1NTYgMzUwIDUzNyA2MTEgNzM3IDczN10gMTQxWzMzMyAzMzMgNTQ5XSAxNDVbNzc4IDcxMyA1NDkgNTQ5IDU0OSA1NTYgNTc2IDQ5NCA3MTMgODIzIDU0OSAyNzQgMzcwIDM2NSA3NjggODg5IDYxMSA2MTEgMzMzIDU4NCA1NDkgNTU2IDU0OSA2MTIgNTU2IDU1Nl0gMTcyWzY2NyA2NjcgNzc4XSAxNzZbOTQ0IDU1Nl0gMTc5WzMzMyAzMzMgMjIyIDIyMiA1NDkgNDk0IDUwMCA2NjcgMTY3IDU1NiAzMzMgMzMzIDUwMCA1MDAgNTU2IDI3OCAyMjIgMzMzXSAxOThbNjY3IDY2NyA2NjcgNjY3IDY2NyAyNzggMjc4IDI3OCAyNzggNzc4IDc3OCA3NzggNzIyIDcyMiA3MjIgMjc4IDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyA1NTYgMjIyIDY2NyA1MDAgNjExIDUwMCAyNjAgNzIyIDU1NiA2NjcgNTAwIDY2NyA1NTYgNTg0IDU4NCAzMzMgMzMzIDMzMyA4MzQgODM0IDgzNCA1NTYgNzc4IDU1NiAyNzggNjY3IDUwMCA3MjIgNTAwIDcyMiA1MDAgNTU2IDU1MiAzMzMgNjY3IDU1NiA2NjcgNTU2IDcyMiA2MTUgNzIyIDY2NyA1NTYgNjY3IDU1NiA1NTYgMjIyIDU1NiAyOTIgNTU2IDMzNCA3MjIgNTU2IDcyMiA1NTYgNzc4IDU1NiA3MjIgMzMzIDcyMiAzMzMgNjY3IDUwMCA2MTEgMjc4IDYxMSAzNzUgNzIyIDU1NiA3MjIgNTU2IDYxMSA1MDAgNjExIDUwMCA1NTEgNzc4IDc5OCA1NzggNTU3IDQ0NiA2MTcgMzk1IDY0OCA1NTIgNTAwIDM2NSAxMDk0XSAzMTNbNTAwXSAzMTVbNTAwXSAzMTdbNTAwIDUwMCA5NzkgNzE5IDU4MyA2MDQgNTg0IDYwNCA2MDQgNzA4IDYyNSA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MjkgNjA0XSAzNzZbOTkwIDk5MCA5OTAgOTkwIDYwNCA2MDQgNjA0IDEwMjEgMTA1MiA5MTcgNzUwIDc1MCA1MzEgNjU2IDU5NCA1MTAgNTAwIDc1MCA3MzUgNDQ0IDYwNCAxODggMzU0IDg4NSAzMjMgNjA0IDM1NCAzNTQgNjA0IDM1NCA2NjcgNTU2IDcyMiA1MDAgNzIyIDUwMCA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3MjIgNTU2IDcyMiA1NTYgMjc4IDI3OCAyNzggMjc4IDI3OCAyNzggMjc4IDIyMiA1MDAgMjIyIDY2NyA1MDAgNTAwIDU1NiAyMjIgNzIyIDU1NiA3MjMgNTU2IDc3OCA1NTYgNzc4IDU1NiA3MjIgMzMzIDY2NyA1MDAgNjExIDI3OCA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDk0NCA3MjIgNjY3IDUwMCAyMjIgNjY3IDU1Nl0gNDczWzg4OSA3NzggNjExIDI3OCA5NDQgNzIyIDk0NCA3MjIgOTQ0IDcyMiA2NjcgNTAwIDIyMiAzMzMgNTU2IDYwMCA4MzQgODM0IDgzNCA4MzQgMzMzIDMzMyAzMzMgMzMzIDY2NyA3ODQgODM4IDM4NCA3NzQgODU1IDc1MiAyMjIgNjY3IDY2NyA2NjggNjY3IDYxMSA3MjIgMjc4IDY2NyA2NjggODMzIDcyMiA2NTAgNzc4IDcyMiA2NjcgNjE4IDYxMSA2NjcgNjY3IDgzNSA3NDggMjc4IDY2NyA1NzggNDQ2IDU1NiAyMjIgNTQ3IDU3NSA1MDAgNDQxIDU1NiA1NTYgMjIyIDUwMCA1MDAgNTc2IDUwMCA0NDggNTU2IDU2OSA0ODIgNTQ3IDUyNSA3MTMgNzgxIDIyMiA1NDcgNTU2IDU0NyA3ODEgNjY3IDg2NSA1NDIgNzE5IDY2NyAyNzggMjc4IDUwMCAxMDU3IDEwMTAgODU0IDU4MyA2MzUgNzE5IDY2NyA2NTYgNjY3IDU0MiA2NzcgNjY3IDkyMyA2MDQgNzE5IDcxOSA1ODMgNjU2IDgzMyA3MjIgNzc4IDcxOSA2NjcgNzIyIDYxMSA2MzUgNzYwIDY2NyA3NDAgNjY3IDkxNyA5MzggNzkyIDg4NSA2NTYgNzE5IDEwMTAgNzIyIDU1NiA1NzMgNTMxIDM2NSA1ODMgNTU2IDY2OSA0NTggNTU5IDU1OSA0MzggNTgzIDY4OCA1NTIgNTU2IDU0MiA1NTYgNTAwIDQ1OCA1MDAgODIzIDUwMCA1NzMgNTIxIDgwMiA4MjMgNjI1IDcxOSA1MjEgNTEwIDc1MCA1NDIgNTU2IDU1NiAzNjUgNTEwIDUwMCAyMjIgMjc4IDIyMiA5MDYgODEzIDU1NiA0MzggNTAwIDU1MiA0ODkgNDExXSA2NTFbMTA3MyA2OTAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAzODMgMCAyNzUgMCAwIDI3OCA1NjMgNTQyIDM5OSA1MDggNjAyIDI0NyAzODIgNTk5IDU5MCAyNDcgNTA5IDQ2MSA0NjMgNTk5IDYwMSAyNDcgMzUzIDU3NCA1MjkgNTY2IDU0NiA0NjEgNDc5IDU1MCA1MDkgNjk0IDY0MyA0OTMgNDkzIDQ5MyAyMzYgNDE3IDgxNSAyNDcgNTA5IDUwOSA0NjMgNDYzIDUzNSA2OTQgNjk0IDY5NCA2OTQgNTYzIDU2MyA1NjMgNTQyIDM5OSA1MDggNjAyIDI4NyA0MTEgNTkwIDI4NyA1MDkgNDYxIDQ2MyA2MDEgMzUzIDU3NCA1NjYgNTQ2IDQ3OSA1NTAgNTA5IDY5NCA2NDMgMjQ3IDU0MiA0NjEgNTQ2IDU3NiAwIDAgMCAwIDMxOSAzMTkgMzU2IDQxMyAyMDcgMCAwIDAgMCAwIDAgMCAwIDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgMzE5IDUyNiA3NTAgNzUwIDI4MiA3NTAgNTI2IDUyNiA1MjYgNzUwIDc1MCA3NTAgNzUwIDc1MCAwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNjM4IDc1MCA3NTAgNzUwIDcxMyA3MTMgMjQ0IDI0NCA3NTAgNzUwIDc1MCA3NTAgNTYzIDUyNiA1MzAgNTMwIDQ4OSA0ODkgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA2MzggNTg4IDM3NSA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAwIDAgMCAwIDAgNzUwIDc1MCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDU1Nl0gODY0Wzc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAzMTkgMzE5IDc1MCA2MTYgNDEzIDIwNyAyMjkgMjA3IDIyOSA0MzIgNDMyIDIwNyAyMjkgNjM4IDU4OCAyNDQgMjQ0IDIwNyAyMjkgNzEzIDcxMyAyNDQgMjQ0IDI4MiAzNzUgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCAzMzcgMzM3IDMzNyAzMzcgNDg5IDQ4OSA0ODkgNDg5IDgyMSA4MjEgNTMxIDUzMSA4MjEgODIxIDUzMSA1MzEgMTA5OCAxMDk4IDg0NiA4NDYgMTA5OCAxMDk4IDg0NiA4NDYgNTgyIDU4MiA1ODIgNTgyIDU4MiA1ODIgNTgyIDU4MiA1NDQgNDUwIDUyNiAzOTQgNTQ0IDQ1MCA1MjYgMzk0IDc4OSA3ODkgMjY4IDI2MyA1ODIgNTgyIDI2OCAyNjMgNjAxIDYwMSAzOTQgMzk0IDUwNiA1MDYgMjA3IDIwNyAzMzggMzM4IDM5NCAzOTQgNTI2IDUyNiAyNDQgMjQ0IDI4MiAzNzUgNDUwIDM5NCA0MzIgNDMyIDYzOCA1ODggNjM4IDU4OCAyNDQgMjQ0IDU0NCA2MDEgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNzUwIDc1MCAwIDAgNzUwIDc1MCA3NTAgMCAwIDc1MCA3NTAgMCAwIDc1MCA3NTAgNzUwIDAgMCAwIDAgMCAwIDc1MCAwIDAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgMzE5IDMxOSAzMTkgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgMTI1XSAxMTI5WzIwMDAgODU3IDY1NiA4NTQgNjY5IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNTEzIDgzNCA4MzQgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAyMjIgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDI3OCAyMjIgMjc4IDIyMiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDg1NyA2NTYgODU3IDY1NiA4NTcgNjU2IDg1NyA2NTYgODU3IDY1NiA3MjIgNTU2IDcyMiA1NTYgODU0IDY2OSA4NTQgNjY5IDg1NCA2NjkgODU0IDY2OSA4NTQgNjY5IDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDY2NyA1NTYgMjc4IDIyMiA3NzggNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiAwIDAgMCAwIDU0MiAzNjUgOTIzIDY2OSA1ODMgNDM4IDU4MyA0MzggNzIyIDU1MiA1NTYgNTAwIDU1NiA1MDAgNjY3IDUwMCA2NjcgNTIxIDY2NyA1NTYgNzUyIDU1NiA3NzggNTU2IDcxMyAyNDQgMjY4IDI2MyA1ODIgMjQ0IDI0NCAyNDQgMjQ0IDI0NCAyNDQgMjY5IDAgMCAzMzMgMzMzIDAgMCAwIDAgMjA3IDIyOSAyMDcgMjI5IDIwNyAyMjkgMjA3IDIyOSA0MzIgNDMyIDQzMiA0MzIgNjM4IDU4OCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDgyMSA4MjEgNTMxIDUzMSA4MjEgODIxIDUzMSA1MzEgODIxIDgyMSA1MzEgNTMxIDEwOTggMTA5OCA4NDYgODQ2IDEwOTggMTA5OCA4NDYgODQ2IDU4MiA1ODIgNTQ0IDQ1MCA1MjYgMzk0IDc4OSA3ODkgNzg5IDI2OCAyNjMgNzg5IDc4OSAyNjggMjYzIDc4OSA3ODkgMjY4IDI2MyA3ODkgNzg5IDI2OCAyNjMgNzg5IDc4OSAyNjggMjYzIDU4MiA1ODIgNTgyIDU4MiAxMTU1IDExNTUgOTA2IDkwNiA4MTIgOTMzIDM5NCA1MTUgNjAxIDYwMSAzOTQgMzk0IDYwMSA2MDEgMzk0IDM5NCA2MDEgNjAxIDM5NCAzOTQgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA1MDYgNTA2IDIwNyAyMDcgNTA2IDUwNiAyMDcgMjA3IDUwNiA1MDYgMjA3IDIwNyA1MDYgNTA2IDIwNyAyMDcgNTI2IDUyNiAyNDQgMjQ0IDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDI0NCAyNDQgNTI2IDUyNiA1NjMgNTI2IDUzMCA1MzAgMjgyIDM3NSAzODggMzg4IDM4OCA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNjM4IDU4OCA2MzggNTg4IDI0NCAyNDQgNDMyIDQzMiA2MzggNTg4IDI0NCAyNDQgNjM4IDU4OCA4MTIgODEyIDgxMiA4MTIgMjA3IDAgMCAwIDAgMCAwIDAgMTEyMyAxMDg0IDAgMCAwIDAgMCAwIDE5NCAzNzAgMCAwIDYwMCAwIDAgMCA4MjEgODIxIDUzMSA1MzEgMTA5OCAxMDk4IDg0NiA4NDYgNTQ0IDQ1MCA1MjYgMzk0IDQxMyAzMzggMjgyIDI0NCAzMjAgMjQ0IDI0NCAyNDQgMjQ0IDI0NCA4MTIgOTMzIDI0NyAwIDM0MiA0OTMgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA1MjYgNTI2IDU0NCA2MDEgNTU2IDc1OCA2NTYgNTU2IDY1NiA1NTYgNzIyIDcyMiA1MDAgNzIyIDgxMCA2NTYgNTU2IDU1NyA2NjcgNjA0IDYxMSA3NzggNjI0IDg4MSAyMjIgMjc4IDY2NyA1MDAgMjIyIDUwMCA4OTEgNzIyIDU1NiA3NzggODY4IDY2NyA3NTQgNTU2IDY2NyA2NjcgNTAwIDYxOCAzODAgMjc4IDYxMSAyNzggNjExIDc0OCA3MjIgNzcyIDUwMCA2MTEgNTAwIDYxMSA2MTEgNTQ1IDU0NSA1NTYgNTU2IDQ1OCA0ODcgNTU2IDI2MCA0MTMgNTg0IDI3OCAxMzMzIDEyMjIgMTA0OSAxMDYyIDgzMyA0NTEgMTIyMiA5NDQgNzcxIDU1NiA2NjcgNTU2IDAgNjY3IDU1Nl0gMTc1Mls4ODkgNzc4IDU1NiA3NzggNTU2IDY2NyA1MDAgNzc4IDU1NiA3NzggNTU2IDYxMSA1NDUgMjIyIDEzMzMgMTIyMiAxMDQ5IDc3OCA1NTYgMTAzNCA2MTggNzIyIDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDI3OCAyNzggMjc4IDI3OCA3NzggNTU2IDc3OCA1NTYgNzIyIDMzMyA3MjIgMzMzIDcyMiA1NTYgNzIyIDU1NiA2NjcgNTAwIDYxMSAyNzggNTQ1IDQzNyA3MjIgNTU2IDcwNiA2MDQgNTY1IDYxMSA1MDAgNjY3IDU1NiA2NjcgNTU2IDc3OCA1NTYgMCA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA2NjcgNTAwIDU1NiA1NTYgNTU2IDU1NiA1MDAgNTAwIDU1NiA1NTYgNTU2IDczOSA0NTggNDU4IDYzMSA1MDcgMjc4IDU1NiA1NTYgNTU5IDUwMSA2MTcgNTU2IDU1NiA1NTYgMjIyIDIyMiAzNTYgMzI3IDMwNCAyMjIgNTcyIDgzMyA4MzMgODMzIDU1NiA1NTYgNTUzIDU1NiA3OTEgNzgxIDU1MCAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgNTQyIDU0MiA1MDAgMjIyIDI2MCAyMjIgMzQ5IDI3OCAyNzggNTU2IDU2OCA1NDcgNTAwIDcyMiA1MDAgNTIwIDUwMCA1NDEgNTQ1IDU0NSA1MDAgNTAwIDUwMCA1MDAgNzc4IDUzMSA1MDcgNTU5IDU1MiAzOTcgNTAwIDQwNCA1NTYgNTAwIDUwMCA5NjQgOTA2IDEwMDUgNzEyIDQyOSA3MTkgNzY0IDY2MSA2MzIgNDg1IDUyNyAzODMgMzgzIDE1OSAyNDAgMjQwIDI0MCAzNjQgNDgxIDMyMSAxOTEgMzU1IDIyMiAyMjIgMjIyIDMzMyAzMzMgMzQ5IDM0OSA1ODQgNTg0IDU4NCA1ODQgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDI3OCAyNzggMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMjIgMTU3IDM0MCAzMjggMzQ5IDM4MyAzODMgMzgzIDM4MyAzODMgMzMzIDMzMyAzMzMgMzMzIDMzMyA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMzMzIDMzMyAzMzMgNTc1IDU0NyA3NzIgOTU4IDc3MiA1NjAgNzgxIDYwMSA3NzggNTU2IDcyMiA1MDAgNjExIDQwNCA2MjUgNTI5IDc1NiA1NzcgODkxIDgzMyA2NzQgNTU2IDY3NCA1MDAgNjY3IDY2NyA2MDkgNTk2IDczNyA1NTQgNDY0IDQxMCA2MDEgNTczIDUwMCAyMjIgNzc4IDQ0MiA0NDIgNjY3IDcxOSA1NTYgNTU5IDEzMzggNjI0IDc3OCA2MTMgOTUwIDcxMyA2NjggNTAwIDg5NyA2OTUgODI5IDY4NSAxMDUzIDg2NyA2MDQgNDU4IDc5NiA2ODggNzc4IDU1NiA4MDMgNjMxIDgwMyA2MzEgMTA3NCA4OTYgODMzIDYxMiAxMTkxIDg1MiAwIDEzMzggNjI0IDcyMiA1MDAgNTAzIDAgMCAwIDAgMCAwIDcxOSA1NTkgNjU2IDUyMSA2NjcgNTU2IDY3MCA1NDkgNjA0IDQ1OCA1ODMgNDM4IDc0MiA1MzYgODc5IDY0OCAxMTM3IDg3MCA3NTMgNTIxIDcyMiA1MDAgNjExIDQ1OCA5MjUgNjkxIDY2NyA1MjEgODYxIDY2NiA4NjEgNjY2IDI3OCA5MjMgNjY5IDY2NyA1NTEgNjU2IDU4MyA3MjIgNTUyIDcyMiA1NTIgNjY3IDUyMSA4MzMgNjg4IDMzMyA2NjcgNTU2IDY2NyA1NTZdIDIzNDZbODg5IDY2NyA1NTYgNzUyIDU1NiA5MjMgNjY5IDYwNCA0NTggNjA0IDU0NSA3MTkgNTU5IDcxOSA1NTkgNzc4IDU1NiA3NzggNTU2IDcxOSA1MTAgNjM1IDUwMCA2MzUgNTAwIDYzNSA1MDAgNjY3IDUyMSA4ODUgNzE5IDY1NiA1NTYgOTY4IDg3NiA5NTYgODE1IDY2MyA1MDkgOTcwIDkxMCAxMDM0IDg3OCA3NzggNTU5IDc0NyA2NjYgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNzIyIDUwMCA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDYxMSAyNzggNzc4IDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgMjc4IDIyMiAyNzggMjc4IDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDU1NiAyMjIgNTU2IDIyMiA1NTYgMjIyIDU1NiAyMjIgODMzIDgzMyA4MzMgODMzIDgzMyA4MzMgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDY2NyA1NTYgNjY3IDU1NiA3MjIgMzMzIDcyMiAzMzMgNzIyIDMzMyA3MjIgMzMzIDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNjY3IDUwMCA2MTEgMjc4IDYxMSAyNzggNjExIDI3OCA2MTEgMjc4IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA2NjcgNTAwIDY2NyA1MDAgOTQ0IDcyMiA5NDQgNzIyIDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDYxMSA1MDAgNjExIDUwMCA2MTEgNTAwIDU1NiAyNzggNzIyIDUwMCA1NTYgMjIyIDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNjY3IDY2NyA4MTMgODEzIDgxMyA4MTMgODEzIDgxMyA0NDYgNDQ2IDQ0NiA0NDYgNDQ2IDQ0NiA3NjUgNzY1IDkyOCA5MjggOTI4IDkyOCA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDgyMCA4MjAgMTAxNSAxMDE1IDEwMTUgMTAxNSAxMDE1IDEwMTUgMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDIyMiAzNzUgMzc1IDU3MSA1NzEgNTcxIDU3MSA1NzEgNTcxIDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDgyNyA4MjcgMTAyMiAxMDIyIDk3MyA5NzMgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA4MTMgOTYwIDEwMDkgOTYwIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzk2IDc5NiA5OTIgOTkyIDk0MyA5NDMgOTQzIDk0MyA1NzggNTc4IDQ0NiA0NDYgNTU2IDU1NiAyMjIgMjIyIDU1NiA1NTYgNTQ3IDU0NyA3ODEgNzgxIDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNjY3IDY2NyA4MTMgODEzIDgxMyA4MTMgODEzIDgxMyA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDgyMCA4MjAgMTAxNSAxMDE1IDEwMTUgMTAxNSAxMDE1IDEwMTUgNzgxIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc4MSA3OTYgNzk2IDk5MiA5OTIgOTQzIDk0MyA5NDMgOTQzIDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA2NjcgNjY3IDY2NyA2NjcgNjY3IDMzMyAzMzMgMzMzIDMzMyAzMzMgNTU2IDU1NiA1NTYgNTU2IDU1NiA4MTMgODEzIDg2OSA4NjkgNzIyIDMzMyAzMzMgMzMzIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDI3OCAyNzggNDI0IDQyNCAzMzMgMzMzIDMzMyA1NDcgNTQ3IDU0NyA1NDcgNTY5IDU2OSA1NDcgNTQ3IDY2NyA2NjcgODYyIDg4NyA3NjUgMzMzIDMzMyAzMzMgNzgxIDc4MSA3ODEgNzgxIDc4MSA5MjQgODI3IDg5NCA3OTYgNzQ4IDMzMyAzMzMgNTU2IDcyMiA3MjIgODMzIDcyMiAxMTY0IDk0NCA2NjcgNjExXSAyODI0WzUwMCA1OTQgMCAwIDAgMCAyMjIgMjIyIDUyMSA2NjcgNjgyIDM0OSA2ODUgMzY3IDY4NyA2ODcgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMjc4IDMzMyAzMzMgMzMzIDMzMyAzOTcgMzk3IDMzMyAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNjY3IDU1NiA0OTYgNzQ4IDg4OSA1MzEgNTAwIDU1MSA1NTEgNDkwIDQ1OCAyMjIgNDIyIDUwMCA0MDEgNjg4IDU1OSA1NTYgNTAwIDYwOCA2MDggNjA4IDk0NCA0NTcgNTU2IDU1NiA1MjEgNTQyIDU0MiA0NTggNTQ3IDU5NyA3MzMgNTk3IDUwMCA3MjIgNTAwIDQ1OCA0MjcgNjA3IDM2NSA1MDAgNTQyIDUyMSA3MTMgNTgzIDQ1MyA2NjQgNDE1IDQxNSA0NDkgNDEwIDQxMCA0OTYgNDI5IDE2NyAzMTQgNDI1IDM1MiA1MTAgNDMwIDQyOSA1MTIgMzgyIDQxOCA0NTEgNDMzIDQyOSA2MjMgMzcyIDM3MiAzNzcgNjAwIDM3NyAzNzcgMzcyIDM3MiAzMTggMzE4IDM3NyAxNTcgMzM5IDU3MyAzODIgMzc3IDM1NCAzNzcgMzc3IDM3OCAyMjAgMzgyIDQwNyA1NzMgMzIxIDM5MSAzODUgMzIxIDM3OCA0NDAgMzQzIDE1NyAyNDAgMzgyIDMyMSAzODUgMzIxIDM3OSA0NDAgMzQzIDkzNiAxMzAwIDQzOSAxMjczIDY1NyAyMzkgNTQ0IDAgMCAwIDAgMCAwIDAgMCAwIDMzNyAzMzcgNDg5IDQ4OSA0NTAgMzk0IDQ1MCAzOTQgNzA5IDY1NSA3NDkgNjA3IDYwOSA3NDUgNjU2IDc4OSA1ODQgMCAwIDAgNTU2IDMzMyAzNTQgMjA3IDIwNyAyMDcgMjA3IDc5MyAxMjIxIDUwMF0gMzAyNFs1MDBdIDMwMjZbMzMzIDI1MCAxNjcgNTU2IDI3OCAyMDAgODMgMCA3MzcgNzIyIDgzMyA2ODggOTA4IDg4NyA4ODcgNjY3IDcyMiA1MDAgNTU2IDYxMSA1MDAgNTAwIDU4MSAwIDAgMCAwIDAgNTY5IDcyMiA3MjIgNzIyIDU0MiAzNjUgMCAwIDAgMzUzIDAgMjYzIDI4OSAwIDAgMCAwIDAgMCAwIDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDMzNyAzMzcgMzM3IDMzNyA0ODkgNDg5IDgyMSA4MjEgNTMxIDUzMSA1NDQgNDUwIDUyNiAzOTQgNTQ0IDQ1MCA1MjYgMzk0IDU0NCA0NTAgNTI2IDM5NCA3ODkgNzg5IDI2OCAyNjMgNzg5IDc4OSAyNjggMjYzIDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDMzOCAzMzggMzk0IDM5NCAzMzggMzM4IDM5NCAzOTQgNTI2IDUyNiAyNDQgMjQ0IDUyNiA1MjYgMjQ0IDI0NCA1MjYgNTI2IDI0NCAyNDQgNTA2IDUwNiAyMDcgMjA3IDQ4OSA0ODkgNDg5IDQ4OSA4MjEgODIxIDUzMSA1MzEgNTU2IDU1NiAyNzggODMzIDU1NiA1NTYgMzMzIDMzMyA1MDAgMjc4IDUwMCA1NTYgMzgwIDU1NyA3ODYgMjIyIDIyMiA1NTYgNTQ3IDU2OCA1NTYgNTU2IDI3OCA3MTMgNTAwIDIyMiA4MzMgNTU2IDU1NiAzMzMgNTAwIDM4NyA1MDAgNTAwIDUwMCA1NTYgNTU2IDU1NiA1NTYgNDU4IDQ1OCA2NTAgMjIyIDUwMCAyMjIgNTU2IDU0NSAzNzcgMzU0IDM0OCAzNzMgMzE4IDIyOSAyMjkgMzc3IDM4MyAxNTcgMTU3IDE1NyAxNTcgMjcxIDE1NyAxNTcgMjc1IDU3MiA1NzIgMzgyIDM4MiAzODIgMzc3IDM3NSAzNDAgMTU3IDIyMCAzODIgMzg4IDM3OCAzNTQgMzIxIDM1OCAzNTggMzU4IDM2OSAzNjQgMCAwIDAgMCAyNzggMzcyIDM3MiAzNzcgMzI4IDM3MiA3NzggNjY3IDU1NiA3MjIgMzMzIDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDIyMiA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDIyMiAyMjIgMjIyIDIyMiA1NDcgNTQ3IDU0NyA1NDcgNTQ0IDYwMSA0NTMgNjY3IDcyMiA2NjggNjY3IDU1NiA1MDAgMjIyIDczNyA1NTYgNzIyIDMzMyA2NjcgNTAwIDUwMCA1MDAgNTAwIDIyMiA1NDIgMzY1IDY2NyA1MDAgNjY3IDUwMCA2MDQgNDU4IDY1NiA1ODMgMCAwIDAgMCAwIDAgMCAwIDAgOTQzIDQ5MCA1MDAgNTU2IDIyMiA1NTYgNjY3IDcyMiA1NTYgMjc4IDcyMiA1NTYgNjY3IDUwMCA2MTEgNTAwIDUwMCA1NzcgNDI1IDY0OCAwIDAgMCAwIDAgMCAyMjIgNzIzIDcyMiA3MjMgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDc3OCA1NTYgOTQ0IDcyMiA3MDMgMCA3MzIgNTk3IDEwMzcgODQxIDI3OCA0MzggMTkxIDE5MSA1MDAgNTAwIDI3OCAyNzggMjc4IDMzMyAwIDAgMCAwIDAgMCAwIDAgNjExIDU1NiA1NTYgMzg0IDUzOSA1MzQgNTU2IDUzOSA1NjEgNTE5IDU1NiA1NTkgNTU2IDM4NyA1NTYgNTU2IDU1NiA1NTYgNTYyIDUyMyA1NTYgNTYwIDcyMSA3MjggNzQ2IDExNjEgNzQ2IDM3NiA2NTcgNzc4IDU1NiAyMjIgNDk2IDI1NSA1NTYgMjg5IDU1OSA1NTYgNTU2IDM3NiAyNTUgMjIyIDU1NSA1NjcgNTk1IDYxMyA1NTQgNTA0IDY0OCA2MTcgMjM5IDQzMSA1NjcgNDY3IDcyMiA2MTUgNjQ5IDU1MyA2NDkgNjA3IDU1MyA1MDggNjA4IDU1MSA3OTMgNTU0IDU1MyA1MDcgODIxIDgzMyA0NjcgNjQ5IDU1NCA2MTMgNTk1IDU1NSA1NTUgNTU1IDU1NSA1NTUgNTU1IDU5NSA1NTQgNTU0IDU1NCA1NTQgMjM5IDIzOSAyMzkgMjM5IDYxNSA2NDkgNjQ5IDY0OSA2NDkgNjQ5IDYwOCA2MDggNjA4IDYwOCA1NTMgNTU1IDU1NSA1NTUgNTk1IDU5NSA1OTUgNTk1IDYxMyA2MTMgNTU0IDU1NCA1NTQgNTU0IDU1NCA2NDggNjQ4IDY0OCA2NDggNjE3IDYxOCAyMzkgMjM5IDIzOSAyMzkgMjM5IDY1OCA0MzEgNTY3IDQ2NyA0NjcgNDY3IDQ2NyA2MTUgNjE1IDYxNSA2MjAgNjQ5IDY0OSA2NDkgNjA3IDYwNyA2MDcgNTUzIDU1MyA1NTMgNTUzIDU1MyA1MDggNTA4IDUwOCA1MDcgNjA4IDYwOCA2MDggNjA4IDYwOCA2MDggNzkzIDc5MyA3OTMgNzkzIDU1MyA1NTMgNTUzIDUwNyA1MDcgNTA3IDU1NSA4MjEgNjQ5IDU1NSA1NjcgNDYwIDU1NSA1NTQgNTA3IDYxNyA2NDkgMjM5IDU2NyA1NDQgNzIyIDYxNSA1MjMgNjQ5IDYxMiA1NTMgNTE4IDUwOCA1NTMgNjU5IDU1NCA2NTggNjQ5IDU1NSA1NTQgNjE3IDIzOSA2NDkgNTUzIDY0OSAyMzkgNTUzIDU1NCA3MTAgNDYwIDU5NyA1NTMgMjM5IDIzOSA0MzEgODY5IDgzOSA3MzEgNTExIDU0OCA2MTIgNTU1IDU2NSA1NjcgNDYwIDU1MSA1NTQgNzkxIDUxNSA2MTIgNjEyIDUxMSA1NTEgNzIyIDYxNyA2NDkgNjEyIDU1MyA1OTUgNTA4IDU0OCA2MzEgNTU0IDYwNyA1NjEgNzcwIDc2NSA2ODYgNzM4IDU0MiA1OTcgODM1IDYwNyAzOTIgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzI4IDcyOCA3MjggNzI4IDcyOCA3MjggNzI4IDcyOCA3MjggNzI4IDcyOCA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgNTExIDM3NiAzNzYgMzc2IDI1NSAyNTUgMzAxIDMzMSAyNTUgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiA2NTcgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgMjIyIDQ5NiAyNTUgMjU1IDMwMSAzMzEgMjU1IDI4OSAyODkgMzc1IDI4OSA1NTkgNTU5IDU1OSA1NTkgNTc4IDMzMyAzMzMgMzMzIDMzMyA2MTYgNjE2IDYxNiA3NTUgNjA0IDczNiAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAxNTczIDE3NTYgMCAxODUzIDAgMCAwIDAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCA4MjEgODIxIDUzMSA1MzEgNDg5IDQ4OSA1NjMgNTI2IDUzMCA1MzAgMjA3IDIyOSAyMDcgMjI5IDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDI0NCAyNDQgNjM4IDU4OCAyNDQgMjQ0IDQzMiA0MzIgNDMyIDQzMiA4MTIgODEyIDgxMiA4MTIgNTYzIDUyNiA1MzAgNTMwIDgyMSA4MjEgNTMxIDUzMSA4MjEgODIxIDUzMSA1MzEgNjAxIDYwMSAzOTQgMzk0IDU4OCA2MjUgNTczIDYxMSA5MjAgNzMxIDg4MiA2MzQgMTQ2NCAwIDAgMCAwIDAgNjM4IDU4OCAyNDQgMjQ0IDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgNjM4IDU4OCAyNDQgMjQ0IDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDI0NCAyNDQgMCA1NzcgNDc1IDYxMSA0NTggNzE5IDU4NCA2NjcgNTU2IDEzMDAgNTU2IDY2NyA5NjAgNzYwIDc4OCA3MTggOTU4IDg1NiA2NjcgNTAwIDEwNjggODg0IDExMzIgODUxIDcyMiA1NDIgNzA1IDU1NCAyNzggMjc4IDU1NyA3NjcgMzk4IDU5MSA1NTcgNjY4IDU3NiA4MzMgNjY3IDczMiA2OTUgMzMzIDU1NiA0OTAgMTU5IDMyMSA2NjcgNjExIDI3OCA3NzkgMTQxNyAxMDM2IDEzODEgMTg1MyAyMDcgMjA3IDIwNyAyMjkgMjA3IDIwNyAyMDcgMjA3IDI5MCAyMDcgMjA3IDIwNyAyMDcgMjA3IDIwNyAyMDcgMjA3IDIwNyAyMDcgMjA3IDI0NCAyNDQgMjQ0IDI0NCAyNDQgMjcyIDI0NCAyMDAgMzQzIDM0MyA1NTYgMzY0IDM2NCA1MTkgNTE5IDYzOCA2MzggNjM4IDYzOCA2MzggNjM4IDYzOCA2MzggNTYzIDU2MyA0ODcgNTYzIDU2MyA0ODcgNzEzIDcxMyAyNDQgMjQ0IDU2MyA1MjYgNTMwIDUzMCA1ODIgNTgyIDU4MiA1ODIgNzg5IDc4OSAyNjggMjYzIDU4MiA1ODIgMjY4IDI2MyA1MDYgNTA2IDIwNyAyMDcgMzM4IDMzOCAzOTQgMzk0IDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDI0NCAyNDQgNDY0IDQ2NCA0MzIgNDMyIDQyNyA0MjcgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNTQ0IDYwMSAwIDM5OSA1MDggNjAyIDY0MyAwIDAgMzE5IDMxOSA1MzMgNTMwIDUzMyA1MzAgNTMzIDUzMCA1MzQgNTMzIDUzMCA1ODIgMzE5IDM5NCAyNzMgMTg1IDAgNzkzIDczOSA3MjUgNzE2IDcxOCA3MjUgNzA5IDU5OCA3MjQgODA3IDcxNiA2NTkgNTI4IDkyNCA3NjcgNjk1IDYxNiA3MDYgNzE4IDcwMCA3NTQgNzE2IDcwOCA3MDAgNzI1IDY5OSA3OTIgNzM4IDc2NCA3MjUgNjk4IDY2MCA2NzggNjc3IDUxNiA3NjIgNjg2IDc4MiA3NjIgMjc0IDIyMiAxNjkgMjAwIDI2NSAyMzEgNTE0IDgzMyA1NTEgNTgwIDU4MyA1NTMgNTUwIDQ5MiA1NTEgNjY3IDU4MCA1NTEgMjIwIDgzNCA1NDIgNTUzIDU1MSA1MjMgNTUzIDU1OSA1NTEgMjIwIDU1MyA0NTYgNTUxIDM0NyA4MzMgNTE3IDU2NCA1NTEgNTUxIDgzMSA1NTEgNTU1IDM5NCA4MzEgNTUwIDU1NSA3NDQgNzEzIDI3OCAzMjQgMTAwMSAxMDAxIDcyNyAxMTA0IDExMDQgMTEwMiAxMTA0IDEzODUgNTU2XSA0MTk4WzAgMCA3MTMgNzEzIDI0NCAyNDQgMTcxIDMzNyAzMzcgMTA5OCAxMDk4IDg0NiA4NDYgODEyIDkzMyAzOTQgNTE1IDI4MiAxOTcgNDg5IDQ4OSAwIDUwMCA3MjIgNTUyIDEzMzAgMTA2OSA2NjcgNTY1IDY1NiA1ODMgODMwIDc4NiA1MzQgNzUzIDc1MyA1MzcgNzQzIDc5NF1dPj4KZW5kb2JqCjY0NCAwIG9iagpbNTUgMCBSXQplbmRvYmoKNTg1IDAgb2JqCjw8L0Jhc2VGb250L0FNUEFOTytBcmlhbE1UL0Rlc2NlbmRhbnRGb250cyA2NDQgMCBSL0VuY29kaW5nL0lkZW50aXR5LUgvU3VidHlwZS9UeXBlMC9Ub1VuaWNvZGUgNTk5IDAgUi9UeXBlL0ZvbnQ+PgplbmRvYmoKNjQ1IDAgb2JqCls2MzggMCBSXQplbmRvYmoKNTg2IDAgb2JqCjw8L0Jhc2VGb250L1NDTURLRCtBcmlhbC9EZXNjZW5kYW50Rm9udHMgNjQ1IDAgUi9FbmNvZGluZy9JZGVudGl0eS1IL1N1YnR5cGUvVHlwZTAvVG9Vbmljb2RlIDYwMCAwIFIvVHlwZS9Gb250Pj4KZW5kb2JqCjY0NiAwIG9iagpbNjM4IDAgUl0KZW5kb2JqCjU4NyAwIG9iago8PC9CYXNlRm9udC9LTlBTSVUrQXJpYWwvRGVzY2VuZGFudEZvbnRzIDY0NiAwIFIvRW5jb2RpbmcvSWRlbnRpdHktSC9TdWJ0eXBlL1R5cGUwL1RvVW5pY29kZSA2MDEgMCBSL1R5cGUvRm9udD4+CmVuZG9iago2NDcgMCBvYmoKPDwvQXNjZW50IDEwNTYvQ2FwSGVpZ2h0IDcxNi9EZXNjZW50IC0zNzYvRmxhZ3MgMzIvRm9udEJCb3hbLTYyOCAtMzc2IDIwMDAgMTA1Nl0vRm9udEZhbWlseShBcmlhbCkvRm9udE5hbWUvQXJpYWwtQm9sZE1UL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDcwMC9JdGFsaWNBbmdsZSAwL1N0ZW1WIDEzNi9UeXBlL0ZvbnREZXNjcmlwdG9yL1hIZWlnaHQgNTE5Pj4KZW5kb2JqCjQ0IDAgb2JqCjw8L0Jhc2VGb250L0FyaWFsLUJvbGRNVC9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRmlyc3RDaGFyIDAvRm9udERlc2NyaXB0b3IgNjQ3IDAgUi9MYXN0Q2hhciAyNTUvU3VidHlwZS9UcnVlVHlwZS9UeXBlL0ZvbnQvV2lkdGhzWzc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgMjc4IDMzMyA0NzQgNTU2IDU1NiA4ODkgNzIyIDIzOCAzMzMgMzMzIDM4OSA1ODQgMjc4IDMzMyAyNzggMjc4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAzMzMgMzMzIDU4NCA1ODQgNTg0IDYxMSA5NzUgNzIyIDcyMiA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTU2IDcyMiA2MTEgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgNjY3IDk0NCA2NjcgNjY3IDYxMSAzMzMgMjc4IDMzMyA1ODQgNTU2IDMzMyA1NTYgNjExIDU1NiA2MTEgNTU2IDMzMyA2MTEgNjExIDI3OCAyNzggNTU2IDI3OCA4ODkgNjExIDYxMSA2MTEgNjExIDM4OSA1NTYgMzMzIDYxMSA1NTYgNzc4IDU1NiA1NTYgNTAwIDM4OSAyODAgMzg5IDU4NCAzNTAgNTU2IDM1MCAyNzggNTU2IDUwMCAxMDAwIDU1NiA1NTYgMzMzIDEwMDAgNjY3IDMzMyAxMDAwIDM1MCA2MTEgMzUwIDM1MCAyNzggMjc4IDUwMCA1MDAgMzUwIDU1NiAxMDAwIDMzMyAxMDAwIDU1NiAzMzMgOTQ0IDM1MCA1MDAgNjY3IDI3OCAzMzMgNTU2IDU1NiA1NTYgNTU2IDI4MCA1NTYgMzMzIDczNyAzNzAgNTU2IDU4NCAzMzMgNzM3IDU1MiA0MDAgNTQ5IDMzMyAzMzMgMzMzIDU3NiA1NTYgMzMzIDMzMyAzMzMgMzY1IDU1NiA4MzQgODM0IDgzNCA2MTEgNzIyIDcyMiA3MjIgNzIyIDcyMiA3MjIgMTAwMCA3MjIgNjY3IDY2NyA2NjcgNjY3IDI3OCAyNzggMjc4IDI3OCA3MjIgNzIyIDc3OCA3NzggNzc4IDc3OCA3NzggNTg0IDc3OCA3MjIgNzIyIDcyMiA3MjIgNjY3IDY2NyA2MTEgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODg5IDU1NiA1NTYgNTU2IDU1NiA1NTYgMjc4IDI3OCAyNzggMjc4IDYxMSA2MTEgNjExIDYxMSA2MTEgNjExIDYxMSA1NDkgNjExIDYxMSA2MTEgNjExIDYxMSA1NTYgNjExIDU1Nl0+PgplbmRvYmoKNjQ4IDAgb2JqCjw8L0FzY2VudCAxMDQwL0NhcEhlaWdodCA3MTYvRGVzY2VudCAtMzI1L0ZsYWdzIDMyL0ZvbnRCQm94Wy02NjUgLTMyNSAyMDAwIDEwNDBdL0ZvbnRGYW1pbHkoQXJpYWwpL0ZvbnROYW1lL0FyaWFsTVQvRm9udFN0cmV0Y2gvTm9ybWFsL0ZvbnRXZWlnaHQgNDAwL0l0YWxpY0FuZ2xlIDAvU3RlbVYgODgvVHlwZS9Gb250RGVzY3JpcHRvci9YSGVpZ2h0IDUxOT4+CmVuZG9iago0NSAwIG9iago8PC9CYXNlRm9udC9BcmlhbE1UL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9GaXJzdENoYXIgMC9Gb250RGVzY3JpcHRvciA2NDggMCBSL0xhc3RDaGFyIDI1NS9TdWJ0eXBlL1RydWVUeXBlL1R5cGUvRm9udC9XaWR0aHNbNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAyNzggMjc4IDM1NSA1NTYgNTU2IDg4OSA2NjcgMTkxIDMzMyAzMzMgMzg5IDU4NCAyNzggMzMzIDI3OCAyNzggNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDI3OCAyNzggNTg0IDU4NCA1ODQgNTU2IDEwMTUgNjY3IDY2NyA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTAwIDY2NyA1NTYgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgNjY3IDk0NCA2NjcgNjY3IDYxMSAyNzggMjc4IDI3OCA0NjkgNTU2IDMzMyA1NTYgNTU2IDUwMCA1NTYgNTU2IDI3OCA1NTYgNTU2IDIyMiAyMjIgNTAwIDIyMiA4MzMgNTU2IDU1NiA1NTYgNTU2IDMzMyA1MDAgMjc4IDU1NiA1MDAgNzIyIDUwMCA1MDAgNTAwIDMzNCAyNjAgMzM0IDU4NCAzNTAgNTU2IDM1MCAyMjIgNTU2IDMzMyAxMDAwIDU1NiA1NTYgMzMzIDEwMDAgNjY3IDMzMyAxMDAwIDM1MCA2MTEgMzUwIDM1MCAyMjIgMjIyIDMzMyAzMzMgMzUwIDU1NiAxMDAwIDMzMyAxMDAwIDUwMCAzMzMgOTQ0IDM1MCA1MDAgNjY3IDI3OCAzMzMgNTU2IDU1NiA1NTYgNTU2IDI2MCA1NTYgMzMzIDczNyAzNzAgNTU2IDU4NCAzMzMgNzM3IDU1MiA0MDAgNTQ5IDMzMyAzMzMgMzMzIDU3NiA1MzcgMzMzIDMzMyAzMzMgMzY1IDU1NiA4MzQgODM0IDgzNCA2MTEgNjY3IDY2NyA2NjcgNjY3IDY2NyA2NjcgMTAwMCA3MjIgNjY3IDY2NyA2NjcgNjY3IDI3OCAyNzggMjc4IDI3OCA3MjIgNzIyIDc3OCA3NzggNzc4IDc3OCA3NzggNTg0IDc3OCA3MjIgNzIyIDcyMiA3MjIgNjY3IDY2NyA2MTEgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODg5IDUwMCA1NTYgNTU2IDU1NiA1NTYgMjc4IDI3OCAyNzggMjc4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NDkgNjExIDU1NiA1NTYgNTU2IDU1NiA1MDAgNTU2IDUwMF0+PgplbmRvYmoKNTc5IDAgb2JqCjw8L0NTIDYzNSAwIFIvUy9UcmFuc3BhcmVuY3k+PgplbmRvYmoKeHJlZgowIDY0OQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDA2Nzg4MCAwMDAwMCBuIAowMDAwMDAwMzAwIDAwMDAwIG4gCjAwMDAwNjIzNDggMDAwMDAgbiAKMDAwMDAwMDU4MCAwMDAwMCBuIAowMDAwMDAwODcwIDAwMDAwIG4gCjAwMDAwMDExNTUgMDAwMDAgbiAKMDAwMDAwMTQzOSAwMDAwMCBuIAowMDAwMDAxNzE5IDAwMDAwIG4gCjAwMDAwMDIwMjUgMDAwMDAgbiAKMDAwMDAwMjMwOCAwMDAwMCBuIAowMDAwMDAyNTkwIDAwMDAwIG4gCjAwMDAwMDI4NjQgMDAwMDAgbiAKMDAwMDAwMzE0MSAwMDAwMCBuIAowMDAwMDAzNDMyIDAwMDAwIG4gCjAwMDAwMDM3MTMgMDAwMDAgbiAKMDAwMDAwMzk5OCAwMDAwMCBuIAowMDAwMDA0Mjc4IDAwMDAwIG4gCjAwMDAwMDQ1NjIgMDAwMDAgbiAKMDAwMDAwNDg0NyAwMDAwMCBuIAowMDAwMDA1MTIzIDAwMDAwIG4gCjAwMDAwMDU0MTUgMDAwMDAgbiAKMDAwMDAwNTY5OSAwMDAwMCBuIAowMDAwMDA1OTc5IDAwMDAwIG4gCjAwMDAwMDYyNzAgMDAwMDAgbiAKMDAwMDAwNjU1NyAwMDAwMCBuIAowMDAwMDA2ODMzIDAwMDAwIG4gCjAwMDAwMDcxMzcgMDAwMDAgbiAKMDAwMDAwNzQ0MCAwMDAwMCBuIAowMDAwMDA3NzIxIDAwMDAwIG4gCjAwMDAwMDgwMTYgMDAwMDAgbiAKMDAwMDAwODMxMyAwMDAwMCBuIAowMDAwMDA4NjAzIDAwMDAwIG4gCjAwMDAwMDg4NzcgMDAwMDAgbiAKMDAwMDAwOTA2MiAwMDAwMCBuIAowMDAwMDA5MjQ2IDAwMDAwIG4gCjAwMDAwMDk2MzIgMDAwMDAgbiAKMDAwMDAxMzM4OCAwMDAwMCBuIAowMDAwMDYyMDQ3IDAwMDAwIG4gCjAwMDAwMTM2NjcgMDAwMDAgbiAKMDAwMDEwMzIxMCAwMDAwMCBuIAowMDAwMTc4MDk5IDAwMDAwIG4gCjAwMDAwNjI1NzAgMDAwMDAgbiAKMDAwMDIxMjk1NiAwMDAwMCBuIAowMDAwMjE0MzYxIDAwMDAwIG4gCjAwMDAwNjI2OTkgMDAwMDAgbiAKMDAwMDAxNTIxNyAwMDAwMCBuIAowMDAwMDE1NTQwIDAwMDAwIG4gCjAwMDAwMTU3MDggMDAwMDAgbiAKMDAwMDA2NTI0MiAwMDAwMCBuIAowMDAwMDY1NDc1IDAwMDAwIG4gCjAwMDAwNjUwNzQgMDAwMDAgbiAKMDAwMDA2MjQzNyAwMDAwMCBuIAowMDAwMDYyMDkzIDAwMDAwIG4gCjAwMDAxOTU4NjEgMDAwMDAgbiAKMDAwMDA2MjExOCAwMDAwMCBuIAowMDAwMDYzODgyIDAwMDAwIG4gCjAwMDAwNjY1MzcgMDAwMDAgbiAKMDAwMDA2NjQ0NSAwMDAwMCBuIAowMDAwMDY1Njg3IDAwMDAwIG4gCjAwMDAwNjU3NTUgMDAwMDAgbiAKMDAwMDA2NTg1OSAwMDAwMCBuIAowMDAwMDY2MzkwIDAwMDAwIG4gCjAwMDAwNjYxODkgMDAwMDAgbiAKMDAwMDA2NTk2NyAwMDAwMCBuIAowMDAwMDY2MDIyIDAwMDAwIG4gCjAwMDAwNjYxMzQgMDAwMDAgbiAKMDAwMDEwMzQzNSAwMDAwMCBuIAowMDAwMDY2MzM1IDAwMDAwIG4gCjAwMDAxNzE2OTggMDAwMDAgbiAKMDAwMDE3NDUzNSAwMDAwMCBuIAowMDAwMDY2NjczIDAwMDAwIG4gCjAwMDAwNjkyMzggMDAwMDAgbiAKMDAwMDA2ODA0NiAwMDAwMCBuIAowMDAwMDY3OTY5IDAwMDAwIG4gCjAwMDAwNjk1MDIgMDAwMDAgbiAKMDAwMDA2OTYyMSAwMDAwMCBuIAowMDAwMDY5NjQyIDAwMDAwIG4gCjAwMDAwNjk3MzEgMDAwMDAgbiAKMDAwMDA2OTc3NiAwMDAwMCBuIAowMDAwMDgzNjQwIDAwMDAwIG4gCjAwMDAxMDI5NzUgMDAwMDAgbiAKMDAwMDA5MzE0MyAwMDAwMCBuIAowMDAwMDkzNDEzIDAwMDAwIG4gCjAwMDAwOTMwNjEgMDAwMDAgbiAKMDAwMDA3ODAzMyAwMDAwMCBuIAowMDAwMDc3ODE4IDAwMDAwIG4gCjAwMDAwNzAwOTkgMDAwMDAgbiAKMDAwMDA3MTA4MCAwMDAwMCBuIAowMDAwMDgzNzIzIDAwMDAwIG4gCjAwMDAwODM3ODcgMDAwMDAgbiAKMDAwMDA4Mzg1MSAwMDAwMCBuIAowMDAwMDgzOTMwIDAwMDAwIG4gCjAwMDAwODQwMDkgMDAwMDAgbiAKMDAwMDA4NDA4OSAwMDAwMCBuIAowMDAwMDg0MTY5IDAwMDAwIG4gCjAwMDAwODQyMjkgMDAwMDAgbiAKMDAwMDA4NDMwMiAwMDAwMCBuIAowMDAwMDg0MzgyIDAwMDAwIG4gCjAwMDAwODQ0NDMgMDAwMDAgbiAKMDAwMDA4NDUyNSAwMDAwMCBuIAowMDAwMDg0NjA3IDAwMDAwIG4gCjAwMDAwODQ2ODkgMDAwMDAgbiAKMDAwMDA4NDc3MSAwMDAwMCBuIAowMDAwMDg0ODUzIDAwMDAwIG4gCjAwMDAwODQ5MzUgMDAwMDAgbiAKMDAwMDA4NTAxNyAwMDAwMCBuIAowMDAwMDg1MDk5IDAwMDAwIG4gCjAwMDAwODUxNjEgMDAwMDAgbiAKMDAwMDA4NTI0MyAwMDAwMCBuIAowMDAwMDg1MzI1IDAwMDAwIG4gCjAwMDAwODUzODcgMDAwMDAgbiAKMDAwMDA4NTQ2OSAwMDAwMCBuIAowMDAwMDg1NTUxIDAwMDAwIG4gCjAwMDAwODU2MzMgMDAwMDAgbiAKMDAwMDA4NTcxNSAwMDAwMCBuIAowMDAwMDg1Nzk3IDAwMDAwIG4gCjAwMDAwODU4NzkgMDAwMDAgbiAKMDAwMDA4NTk0MSAwMDAwMCBuIAowMDAwMDg2MDIzIDAwMDAwIG4gCjAwMDAwODYxMDUgMDAwMDAgbiAKMDAwMDA4NjE4NyAwMDAwMCBuIAowMDAwMDg2MjY5IDAwMDAwIG4gCjAwMDAwODYzNTEgMDAwMDAgbiAKMDAwMDA4NjQzMyAwMDAwMCBuIAowMDAwMDg2NTE1IDAwMDAwIG4gCjAwMDAwODY1OTcgMDAwMDAgbiAKMDAwMDA4NjY1OSAwMDAwMCBuIAowMDAwMDg2NzQxIDAwMDAwIG4gCjAwMDAwODY4MjMgMDAwMDAgbiAKMDAwMDA4NjkwNSAwMDAwMCBuIAowMDAwMDg2OTY3IDAwMDAwIG4gCjAwMDAwODcwNDkgMDAwMDAgbiAKMDAwMDA4NzEzMSAwMDAwMCBuIAowMDAwMDg3MjEzIDAwMDAwIG4gCjAwMDAwODcyNzUgMDAwMDAgbiAKMDAwMDA4NzM1NyAwMDAwMCBuIAowMDAwMDg3NDM5IDAwMDAwIG4gCjAwMDAwODc1MjEgMDAwMDAgbiAKMDAwMDA4NzYwMyAwMDAwMCBuIAowMDAwMDg3NjY1IDAwMDAwIG4gCjAwMDAwODc3NDcgMDAwMDAgbiAKMDAwMDA4NzgyOSAwMDAwMCBuIAowMDAwMDg3OTExIDAwMDAwIG4gCjAwMDAwODc5OTggMDAwMDAgbiAKMDAwMDA4ODA2MCAwMDAwMCBuIAowMDAwMDg4MTQ0IDAwMDAwIG4gCjAwMDAwODgyMjggMDAwMDAgbiAKMDAwMDA4ODI5MCAwMDAwMCBuIAowMDAwMDg4MzcyIDAwMDAwIG4gCjAwMDAwODg0NTQgMDAwMDAgbiAKMDAwMDA4ODUxNiAwMDAwMCBuIAowMDAwMDg4NTg2IDAwMDAwIG4gCjAwMDAwODg2NjggMDAwMDAgbiAKMDAwMDA4ODczMCAwMDAwMCBuIAowMDAwMDg4ODEyIDAwMDAwIG4gCjAwMDAwODg4OTQgMDAwMDAgbiAKMDAwMDA4ODk3NiAwMDAwMCBuIAowMDAwMDg5MDU4IDAwMDAwIG4gCjAwMDAwODkxNDAgMDAwMDAgbiAKMDAwMDA4OTIyMiAwMDAwMCBuIAowMDAwMDg5Mjg0IDAwMDAwIG4gCjAwMDAwODkzNzEgMDAwMDAgbiAKMDAwMDA4OTQ1MyAwMDAwMCBuIAowMDAwMDg5NTM1IDAwMDAwIG4gCjAwMDAwODk2MTcgMDAwMDAgbiAKMDAwMDA4OTY5OSAwMDAwMCBuIAowMDAwMDg5NzgxIDAwMDAwIG4gCjAwMDAwODk4NjMgMDAwMDAgbiAKMDAwMDA4OTk0NSAwMDAwMCBuIAowMDAwMDkwMDI3IDAwMDAwIG4gCjAwMDAwOTAwODkgMDAwMDAgbiAKMDAwMDA5MDE3MSAwMDAwMCBuIAowMDAwMDkwMjUzIDAwMDAwIG4gCjAwMDAwOTAzMTUgMDAwMDAgbiAKMDAwMDA5MDM4NSAwMDAwMCBuIAowMDAwMDkwNDY3IDAwMDAwIG4gCjAwMDAwOTA1MjkgMDAwMDAgbiAKMDAwMDA5MDYxMSAwMDAwMCBuIAowMDAwMDkwNjkzIDAwMDAwIG4gCjAwMDAwOTA3NzUgMDAwMDAgbiAKMDAwMDA5MDg1NyAwMDAwMCBuIAowMDAwMDkwOTM5IDAwMDAwIG4gCjAwMDAwOTEwMjEgMDAwMDAgbiAKMDAwMDA5MTEwNCAwMDAwMCBuIAowMDAwMDkxMTg3IDAwMDAwIG4gCjAwMDAwOTEyNzAgMDAwMDAgbiAKMDAwMDA5MTM1MyAwMDAwMCBuIAowMDAwMDkxNDM2IDAwMDAwIG4gCjAwMDAwOTE1MjAgMDAwMDAgbiAKMDAwMDA5MTYwNCAwMDAwMCBuIAowMDAwMDkxNjg4IDAwMDAwIG4gCjAwMDAwOTE3NzIgMDAwMDAgbiAKMDAwMDA5MTgzNiAwMDAwMCBuIAowMDAwMDkxOTIwIDAwMDAwIG4gCjAwMDAwOTIwMDQgMDAwMDAgbiAKMDAwMDA5MjA4OCAwMDAwMCBuIAowMDAwMDkyMTcyIDAwMDAwIG4gCjAwMDAwOTIyNTYgMDAwMDAgbiAKMDAwMDA5MjM0MCAwMDAwMCBuIAowMDAwMDkyNDI5IDAwMDAwIG4gCjAwMDAwOTI1MTMgMDAwMDAgbiAKMDAwMDA5MjU5NyAwMDAwMCBuIAowMDAwMDkyNjgxIDAwMDAwIG4gCjAwMDAwOTI3NDUgMDAwMDAgbiAKMDAwMDA5MjgyOSAwMDAwMCBuIAowMDAwMDkyOTEzIDAwMDAwIG4gCjAwMDAwOTI5OTcgMDAwMDAgbiAKMDAwMDA3MTcxMyAwMDAwMCBuIAowMDAwMDcxNzkzIDAwMDAwIG4gCjAwMDAwNzE4NzMgMDAwMDAgbiAKMDAwMDA3MTkzMyAwMDAwMCBuIAowMDAwMDcyMDA2IDAwMDAwIG4gCjAwMDAwNzIwODYgMDAwMDAgbiAKMDAwMDA3MjE0NiAwMDAwMCBuIAowMDAwMDcyMjI2IDAwMDAwIG4gCjAwMDAwNzIyODYgMDAwMDAgbiAKMDAwMDA3MjM2NiAwMDAwMCBuIAowMDAwMDcyNDQ2IDAwMDAwIG4gCjAwMDAwNzI1MjggMDAwMDAgbiAKMDAwMDA3MjYxMCAwMDAwMCBuIAowMDAwMDcyNjkyIDAwMDAwIG4gCjAwMDAwNzI3NTQgMDAwMDAgbiAKMDAwMDA3MjgzNiAwMDAwMCBuIAowMDAwMDcyOTE4IDAwMDAwIG4gCjAwMDAwNzMwMDAgMDAwMDAgbiAKMDAwMDA3MzA4MiAwMDAwMCBuIAowMDAwMDczMTY0IDAwMDAwIG4gCjAwMDAwNzMyNDYgMDAwMDAgbiAKMDAwMDA3MzMwOCAwMDAwMCBuIAowMDAwMDczMzkwIDAwMDAwIG4gCjAwMDAwNzM0NzIgMDAwMDAgbiAKMDAwMDA3MzU1NCAwMDAwMCBuIAowMDAwMDczNjM2IDAwMDAwIG4gCjAwMDAwNzM3MTggMDAwMDAgbiAKMDAwMDA3MzgwMCAwMDAwMCBuIAowMDAwMDczODYyIDAwMDAwIG4gCjAwMDAwNzM5NDQgMDAwMDAgbiAKMDAwMDA3NDAyNiAwMDAwMCBuIAowMDAwMDc0MTA4IDAwMDAwIG4gCjAwMDAwNzQxOTAgMDAwMDAgbiAKMDAwMDA3NDI3MiAwMDAwMCBuIAowMDAwMDc0MzU0IDAwMDAwIG4gCjAwMDAwNzQ0MTYgMDAwMDAgbiAKMDAwMDA3NDQ5OCAwMDAwMCBuIAowMDAwMDc0NTYwIDAwMDAwIG4gCjAwMDAwNzQ2NDIgMDAwMDAgbiAKMDAwMDA3NDczNCAwMDAwMCBuIAowMDAwMDc0ODI2IDAwMDAwIG4gCjAwMDAwNzQ5MTggMDAwMDAgbiAKMDAwMDA3NTAxMCAwMDAwMCBuIAowMDAwMDc1MTAyIDAwMDAwIG4gCjAwMDAwNzUxOTQgMDAwMDAgbiAKMDAwMDA3NTI4NiAwMDAwMCBuIAowMDAwMDc1Mzc4IDAwMDAwIG4gCjAwMDAwNzU0NzAgMDAwMDAgbiAKMDAwMDA3NTU2MiAwMDAwMCBuIAowMDAwMDc1NjU0IDAwMDAwIG4gCjAwMDAwNzU3NDYgMDAwMDAgbiAKMDAwMDA3NTgzOCAwMDAwMCBuIAowMDAwMDc1OTMwIDAwMDAwIG4gCjAwMDAwNzYwMjIgMDAwMDAgbiAKMDAwMDA3NjExNCAwMDAwMCBuIAowMDAwMDc2MTc2IDAwMDAwIG4gCjAwMDAwNzYyNTggMDAwMDAgbiAKMDAwMDA3NjM0MCAwMDAwMCBuIAowMDAwMDc2NDIyIDAwMDAwIG4gCjAwMDAwNzY1MDQgMDAwMDAgbiAKMDAwMDA3NjU4NiAwMDAwMCBuIAowMDAwMDc2NjY4IDAwMDAwIG4gCjAwMDAwNzY3MzAgMDAwMDAgbiAKMDAwMDA3NjgxMiAwMDAwMCBuIAowMDAwMDc2ODc0IDAwMDAwIG4gCjAwMDAwNzY5NTYgMDAwMDAgbiAKMDAwMDA3NzAzOCAwMDAwMCBuIAowMDAwMDc3MTIwIDAwMDAwIG4gCjAwMDAwNzcyMDIgMDAwMDAgbiAKMDAwMDA3NzI4NCAwMDAwMCBuIAowMDAwMDc3MzQ2IDAwMDAwIG4gCjAwMDAwNzc0MjggMDAwMDAgbiAKMDAwMDA3NzUxMCAwMDAwMCBuIAowMDAwMDc3NTkyIDAwMDAwIG4gCjAwMDAwNzc2NzQgMDAwMDAgbiAKMDAwMDA3Nzc1NiAwMDAwMCBuIAowMDAwMDgzNTkyIDAwMDAwIG4gCjAwMDAwODAwMDIgMDAwMDAgbiAKMDAwMDA4MzU0NCAwMDAwMCBuIAowMDAwMDc4MjcwIDAwMDAwIG4gCjAwMDAwODM0NzkgMDAwMDAgbiAKMDAwMDA3OTk0NiAwMDAwMCBuIAowMDAwMDgzNDMxIDAwMDAwIG4gCjAwMDAwNzgzMjUgMDAwMDAgbiAKMDAwMDA4MzM2NiAwMDAwMCBuIAowMDAwMDc5ODk5IDAwMDAwIG4gCjAwMDAwNzgzODAgMDAwMDAgbiAKMDAwMDA4MzMxOCAwMDAwMCBuIAowMDAwMDc5ODE5IDAwMDAwIG4gCjAwMDAwODMyNzAgMDAwMDAgbiAKMDAwMDA4MzIyMiAwMDAwMCBuIAowMDAwMDgzMTc0IDAwMDAwIG4gCjAwMDAwODMxMjYgMDAwMDAgbiAKMDAwMDA3ODQzNSAwMDAwMCBuIAowMDAwMDgzMDc4IDAwMDAwIG4gCjAwMDAwNzk3MzEgMDAwMDAgbiAKMDAwMDA4MzAzMCAwMDAwMCBuIAowMDAwMDgyOTgyIDAwMDAwIG4gCjAwMDAwODI5MzQgMDAwMDAgbiAKMDAwMDA4Mjg4NiAwMDAwMCBuIAowMDAwMDgyODM4IDAwMDAwIG4gCjAwMDAwNzg0OTAgMDAwMDAgbiAKMDAwMDA4Mjc5MCAwMDAwMCBuIAowMDAwMDc5NjQzIDAwMDAwIG4gCjAwMDAwODI3NDIgMDAwMDAgbiAKMDAwMDA4MjY5NCAwMDAwMCBuIAowMDAwMDgyNjQ2IDAwMDAwIG4gCjAwMDAwODI1OTggMDAwMDAgbiAKMDAwMDA4MjU1MCAwMDAwMCBuIAowMDAwMDc4NTQ1IDAwMDAwIG4gCjAwMDAwODI1MDIgMDAwMDAgbiAKMDAwMDA3OTU1NSAwMDAwMCBuIAowMDAwMDgyNDU0IDAwMDAwIG4gCjAwMDAwODI0MDYgMDAwMDAgbiAKMDAwMDA4MjM1OCAwMDAwMCBuIAowMDAwMDgyMzEwIDAwMDAwIG4gCjAwMDAwODIyNjIgMDAwMDAgbiAKMDAwMDA3ODYwMCAwMDAwMCBuIAowMDAwMDgyMTk3IDAwMDAwIG4gCjAwMDAwNzk1MDggMDAwMDAgbiAKMDAwMDA3ODY1NSAwMDAwMCBuIAowMDAwMDgyMTQ5IDAwMDAwIG4gCjAwMDAwNzkzMzIgMDAwMDAgbiAKMDAwMDA4MjA4NCAwMDAwMCBuIAowMDAwMDgyMDE5IDAwMDAwIG4gCjAwMDAwODE5NTQgMDAwMDAgbiAKMDAwMDA4MTg4OSAwMDAwMCBuIAowMDAwMDgxODI0IDAwMDAwIG4gCjAwMDAwODE3NTkgMDAwMDAgbiAKMDAwMDA4MTY5NCAwMDAwMCBuIAowMDAwMDgxNjI5IDAwMDAwIG4gCjAwMDAwODE1NjQgMDAwMDAgbiAKMDAwMDA4MTQ5OSAwMDAwMCBuIAowMDAwMDgxNDM0IDAwMDAwIG4gCjAwMDAwODEzNjkgMDAwMDAgbiAKMDAwMDA4MTMwNCAwMDAwMCBuIAowMDAwMDgxMjM5IDAwMDAwIG4gCjAwMDAwODExNzQgMDAwMDAgbiAKMDAwMDA4MTEwOSAwMDAwMCBuIAowMDAwMDc4NzEwIDAwMDAwIG4gCjAwMDAwODEwNjEgMDAwMDAgbiAKMDAwMDA3OTI0NCAwMDAwMCBuIAowMDAwMDgxMDEzIDAwMDAwIG4gCjAwMDAwODA5NjUgMDAwMDAgbiAKMDAwMDA4MDkxNyAwMDAwMCBuIAowMDAwMDgwODY5IDAwMDAwIG4gCjAwMDAwODA4MjEgMDAwMDAgbiAKMDAwMDA3ODc2NSAwMDAwMCBuIAowMDAwMDgwNzczIDAwMDAwIG4gCjAwMDAwNzkxOTcgMDAwMDAgbiAKMDAwMDA3ODgyMCAwMDAwMCBuIAowMDAwMDgwNzI1IDAwMDAwIG4gCjAwMDAwNzg5NjIgMDAwMDAgbiAKMDAwMDA4MDY3NyAwMDAwMCBuIAowMDAwMDc5MDA5IDAwMDAwIG4gCjAwMDAwODA2MjkgMDAwMDAgbiAKMDAwMDA3OTA1NiAwMDAwMCBuIAowMDAwMDgwNTgxIDAwMDAwIG4gCjAwMDAwNzkxMDMgMDAwMDAgbiAKMDAwMDA4MDUzMyAwMDAwMCBuIAowMDAwMDc5MTUwIDAwMDAwIG4gCjAwMDAwNzg4NzUgMDAwMDAgbiAKMDAwMDA4MDQ4NSAwMDAwMCBuIAowMDAwMDgwMDU4IDAwMDAwIG4gCjAwMDAwODA0MzcgMDAwMDAgbiAKMDAwMDA4MDEwNSAwMDAwMCBuIAowMDAwMDgwMzg5IDAwMDAwIG4gCjAwMDAwODAxNTIgMDAwMDAgbiAKMDAwMDA4MDM0MSAwMDAwMCBuIAowMDAwMDgwMTk5IDAwMDAwIG4gCjAwMDAwODAyOTMgMDAwMDAgbiAKMDAwMDA4MDI0NiAwMDAwMCBuIAowMDAwMDc3OTQ2IDAwMDAwIG4gCjAwMDAwNzc4OTggMDAwMDAgbiAKMDAwMDA3ODE4OCAwMDAwMCBuIAowMDAwMTAzMTYyIDAwMDAwIG4gCjAwMDAxMDMxMTYgMDAwMDAgbiAKMDAwMDEwMjg3NCAwMDAwMCBuIAowMDAwMTAyODI2IDAwMDAwIG4gCjAwMDAwOTc4ODUgMDAwMDAgbiAKMDAwMDEwMjc3OCAwMDAwMCBuIAowMDAwMDk3OTMxIDAwMDAwIG4gCjAwMDAxMDI3MzAgMDAwMDAgbiAKMDAwMDEwMjY4MiAwMDAwMCBuIAowMDAwMDkzNzA0IDAwMDAwIG4gCjAwMDAxMDI2MTcgMDAwMDAgbiAKMDAwMDA5NzgzMSAwMDAwMCBuIAowMDAwMTAyNTY5IDAwMDAwIG4gCjAwMDAwOTM3NjYgMDAwMDAgbiAKMDAwMDEwMjUyMSAwMDAwMCBuIAowMDAwMDk3NTMxIDAwMDAwIG4gCjAwMDAxMDI0NzMgMDAwMDAgbiAKMDAwMDA5NzU3OCAwMDAwMCBuIAowMDAwMTAyNDI1IDAwMDAwIG4gCjAwMDAwOTc2MjUgMDAwMDAgbiAKMDAwMDEwMjM3NyAwMDAwMCBuIAowMDAwMDk3NjcyIDAwMDAwIG4gCjAwMDAxMDIzMjkgMDAwMDAgbiAKMDAwMDEwMjI4MSAwMDAwMCBuIAowMDAwMDk3NzI4IDAwMDAwIG4gCjAwMDAxMDIyMzMgMDAwMDAgbiAKMDAwMDEwMjE4NSAwMDAwMCBuIAowMDAwMDk3Nzg0IDAwMDAwIG4gCjAwMDAwOTM4MjAgMDAwMDAgbiAKMDAwMDEwMjEzNyAwMDAwMCBuIAowMDAwMDk3NDM3IDAwMDAwIG4gCjAwMDAxMDIwODkgMDAwMDAgbiAKMDAwMDA5NzQ4NCAwMDAwMCBuIAowMDAwMDkzOTE1IDAwMDAwIG4gCjAwMDAxMDIwNDEgMDAwMDAgbiAKMDAwMDA5NzE1NSAwMDAwMCBuIAowMDAwMTAxOTkzIDAwMDAwIG4gCjAwMDAwOTcyMDIgMDAwMDAgbiAKMDAwMDEwMTk0NSAwMDAwMCBuIAowMDAwMDk3MjQ5IDAwMDAwIG4gCjAwMDAxMDE4OTcgMDAwMDAgbiAKMDAwMDA5NzI5NiAwMDAwMCBuIAowMDAwMTAxODQ5IDAwMDAwIG4gCjAwMDAwOTczNDMgMDAwMDAgbiAKMDAwMDEwMTgwMSAwMDAwMCBuIAowMDAwMDk3MzkwIDAwMDAwIG4gCjAwMDAwOTM5NzggMDAwMDAgbiAKMDAwMDEwMTc1MyAwMDAwMCBuIAowMDAwMDk2Nzc5IDAwMDAwIG4gCjAwMDAxMDE3MDUgMDAwMDAgbiAKMDAwMDA5NjgyNiAwMDAwMCBuIAowMDAwMTAxNjU3IDAwMDAwIG4gCjAwMDAwOTY4NzMgMDAwMDAgbiAKMDAwMDEwMTYwOSAwMDAwMCBuIAowMDAwMDk2OTIwIDAwMDAwIG4gCjAwMDAxMDE1NjEgMDAwMDAgbiAKMDAwMDA5Njk2NyAwMDAwMCBuIAowMDAwMTAxNTEzIDAwMDAwIG4gCjAwMDAwOTcwMTQgMDAwMDAgbiAKMDAwMDEwMTQ2NSAwMDAwMCBuIAowMDAwMDk3MDYxIDAwMDAwIG4gCjAwMDAxMDE0MTcgMDAwMDAgbiAKMDAwMDA5NzEwOCAwMDAwMCBuIAowMDAwMDk0MDczIDAwMDAwIG4gCjAwMDAxMDEzNjkgMDAwMDAgbiAKMDAwMDA5NjYzOCAwMDAwMCBuIAowMDAwMTAxMzIxIDAwMDAwIG4gCjAwMDAwOTY2ODUgMDAwMDAgbiAKMDAwMDEwMTI3MyAwMDAwMCBuIAowMDAwMDk2NzMyIDAwMDAwIG4gCjAwMDAwOTQxODQgMDAwMDAgbiAKMDAwMDEwMTIyNSAwMDAwMCBuIAowMDAwMDk2NDk3IDAwMDAwIG4gCjAwMDAxMDExNzcgMDAwMDAgbiAKMDAwMDA5NjU0NCAwMDAwMCBuIAowMDAwMTAxMTI5IDAwMDAwIG4gCjAwMDAwOTY1OTEgMDAwMDAgbiAKMDAwMDA5NDI1NSAwMDAwMCBuIAowMDAwMTAxMDgxIDAwMDAwIG4gCjAwMDAwOTYzMDkgMDAwMDAgbiAKMDAwMDEwMTAzMyAwMDAwMCBuIAowMDAwMDk2MzU2IDAwMDAwIG4gCjAwMDAxMDA5ODUgMDAwMDAgbiAKMDAwMDA5NjQwMyAwMDAwMCBuIAowMDAwMTAwOTM3IDAwMDAwIG4gCjAwMDAwOTY0NTAgMDAwMDAgbiAKMDAwMDA5NDMyNiAwMDAwMCBuIAowMDAwMTAwODg5IDAwMDAwIG4gCjAwMDAwOTYxMjEgMDAwMDAgbiAKMDAwMDEwMDg0MSAwMDAwMCBuIAowMDAwMDk2MTY4IDAwMDAwIG4gCjAwMDAxMDA3OTMgMDAwMDAgbiAKMDAwMDA5NjIxNSAwMDAwMCBuIAowMDAwMTAwNzI4IDAwMDAwIG4gCjAwMDAwOTYyNjIgMDAwMDAgbiAKMDAwMDA5NDQwNSAwMDAwMCBuIAowMDAwMTAwNjgwIDAwMDAwIG4gCjAwMDAwOTYwMjcgMDAwMDAgbiAKMDAwMDEwMDYzMiAwMDAwMCBuIAowMDAwMDk2MDc0IDAwMDAwIG4gCjAwMDAwOTQ0ODQgMDAwMDAgbiAKMDAwMDEwMDU4NCAwMDAwMCBuIAowMDAwMDk1OTcxIDAwMDAwIG4gCjAwMDAxMDA1MzYgMDAwMDAgbiAKMDAwMDA5NDU0NyAwMDAwMCBuIAowMDAwMTAwNDg4IDAwMDAwIG4gCjAwMDAwOTU5MTUgMDAwMDAgbiAKMDAwMDEwMDQ0MCAwMDAwMCBuIAowMDAwMDk0NjAyIDAwMDAwIG4gCjAwMDAxMDAzOTIgMDAwMDAgbiAKMDAwMDA5NTc4NyAwMDAwMCBuIAowMDAwMTAwMzQ0IDAwMDAwIG4gCjAwMDAxMDAyOTYgMDAwMDAgbiAKMDAwMDEwMDI0OCAwMDAwMCBuIAowMDAwMDk1ODUxIDAwMDAwIG4gCjAwMDAxMDAyMDAgMDAwMDAgbiAKMDAwMDEwMDE1MiAwMDAwMCBuIAowMDAwMDk0NjU3IDAwMDAwIG4gCjAwMDAxMDAwODcgMDAwMDAgbiAKMDAwMDA5NTU5NSAwMDAwMCBuIAowMDAwMTAwMDM5IDAwMDAwIG4gCjAwMDAwOTk5OTEgMDAwMDAgbiAKMDAwMDA5OTk0MyAwMDAwMCBuIAowMDAwMDk1NjU5IDAwMDAwIG4gCjAwMDAwOTk4OTUgMDAwMDAgbiAKMDAwMDA5OTg0NyAwMDAwMCBuIAowMDAwMDk5Nzk5IDAwMDAwIG4gCjAwMDAwOTU3MjMgMDAwMDAgbiAKMDAwMDA5OTc1MSAwMDAwMCBuIAowMDAwMDk5NzAzIDAwMDAwIG4gCjAwMDAwOTQ3MjAgMDAwMDAgbiAKMDAwMDA5OTY1NSAwMDAwMCBuIAowMDAwMDk1NTM5IDAwMDAwIG4gCjAwMDAwOTk2MDcgMDAwMDAgbiAKMDAwMDA5NDc5MSAwMDAwMCBuIAowMDAwMDk5NTU5IDAwMDAwIG4gCjAwMDAwOTU0ODMgMDAwMDAgbiAKMDAwMDA5OTUxMSAwMDAwMCBuIAowMDAwMDk0ODQ2IDAwMDAwIG4gCjAwMDAwOTk0NjMgMDAwMDAgbiAKMDAwMDA5NTE2MyAwMDAwMCBuIAowMDAwMDk5NDE1IDAwMDAwIG4gCjAwMDAwOTkzNjcgMDAwMDAgbiAKMDAwMDA5OTMxOSAwMDAwMCBuIAowMDAwMDk1MjI3IDAwMDAwIG4gCjAwMDAwOTkyNzEgMDAwMDAgbiAKMDAwMDA5OTIyMyAwMDAwMCBuIAowMDAwMDk5MTc1IDAwMDAwIG4gCjAwMDAwOTUyOTEgMDAwMDAgbiAKMDAwMDA5OTEyNyAwMDAwMCBuIAowMDAwMDk5MDc5IDAwMDAwIG4gCjAwMDAwOTkwMzEgMDAwMDAgbiAKMDAwMDA5NTM1NSAwMDAwMCBuIAowMDAwMDk4OTgzIDAwMDAwIG4gCjAwMDAwOTg5MzUgMDAwMDAgbiAKMDAwMDA5ODg4NyAwMDAwMCBuIAowMDAwMDk1NDE5IDAwMDAwIG4gCjAwMDAwOTg4MzkgMDAwMDAgbiAKMDAwMDA5ODc5MSAwMDAwMCBuIAowMDAwMDk0OTAxIDAwMDAwIG4gCjAwMDAwOTg3NDMgMDAwMDAgbiAKMDAwMDA5NTA0MyAwMDAwMCBuIAowMDAwMDk4Njk1IDAwMDAwIG4gCjAwMDAwOTg2NDcgMDAwMDAgbiAKMDAwMDA5ODU5OSAwMDAwMCBuIAowMDAwMDk4NTUxIDAwMDAwIG4gCjAwMDAwOTg1MDMgMDAwMDAgbiAKMDAwMDA5ODQzOCAwMDAwMCBuIAowMDAwMDk4MzkwIDAwMDAwIG4gCjAwMDAwOTgzMjUgMDAwMDAgbiAKMDAwMDA5ODI3NyAwMDAwMCBuIAowMDAwMDk0OTg4IDAwMDAwIG4gCjAwMDAwOTgyMjkgMDAwMDAgbiAKMDAwMDA5Nzk5MiAwMDAwMCBuIAowMDAwMDk4MTgxIDAwMDAwIG4gCjAwMDAwOTgwMzkgMDAwMDAgbiAKMDAwMDA5ODEzMyAwMDAwMCBuIAowMDAwMDk4MDg2IDAwMDAwIG4gCjAwMDAwOTMzNDIgMDAwMDAgbiAKMDAwMDA5MzI5NCAwMDAwMCBuIAowMDAwMDkzMjEzIDAwMDAwIG4gCjAwMDAwOTM2MjQgMDAwMDAgbiAKMDAwMDEwMjkyMCAwMDAwMCBuIAowMDAwMTAzMDMzIDAwMDAwIG4gCjAwMDAxMDMyNzAgMDAwMDAgbiAKMDAwMDE3MDk3NSAwMDAwMCBuIAowMDAwMTcxNDA5IDAwMDAwIG4gCjAwMDAxMDM5MTggMDAwMDAgbiAKMDAwMDEwNDgzNCAwMDAwMCBuIAowMDAwMTA1NjE4IDAwMDAwIG4gCjAwMDAxMDY0OTkgMDAwMDAgbiAKMDAwMDEwNzM0NyAwMDAwMCBuIAowMDAwMTA4MjIxIDAwMDAwIG4gCjAwMDAxMDg5OTQgMDAwMDAgbiAKMDAwMDEwOTc5NCAwMDAwMCBuIAowMDAwMjE1NTM4IDAwMDAwIG4gCjAwMDAxNzgxNzIgMDAwMDAgbiAKMDAwMDE3ODIyMCAwMDAwMCBuIAowMDAwMTk1MDg0IDAwMDAwIG4gCjAwMDAxOTUyNDEgMDAwMDAgbiAKMDAwMDE5NTM5OCAwMDAwMCBuIAowMDAwMjEyMjgwIDAwMDAwIG4gCjAwMDAyMTI0MzkgMDAwMDAgbiAKMDAwMDIxMjU5NiAwMDAwMCBuIAowMDAwMTYzMzMxIDAwMDAwIG4gCjAwMDAxMTA2ODAgMDAwMDAgbiAKMDAwMDExMDk2OSAwMDAwMCBuIAowMDAwMTExMDU5IDAwMDAwIG4gCjAwMDAxMjgxNzAgMDAwMDAgbiAKMDAwMDEzMDgxOCAwMDAwMCBuIAowMDAwMTMxNTgyIDAwMDAwIG4gCjAwMDAxMzE2NzMgMDAwMDAgbiAKMDAwMDE1NDYxOSAwMDAwMCBuIAowMDAwMTU0OTM3IDAwMDAwIG4gCjAwMDAxNTUyNjQgMDAwMDAgbiAKMDAwMDE1NTYxOSAwMDAwMCBuIAowMDAwMTU1OTQ3IDAwMDAwIG4gCjAwMDAxNTYyODQgMDAwMDAgbiAKMDAwMDE1NjYzMiAwMDAwMCBuIAowMDAwMTczODgwIDAwMDAwIG4gCjAwMDAxNzQwNTcgMDAwMDAgbiAKMDAwMDE3NDIyNSAwMDAwMCBuIAowMDAwMTc0MzkxIDAwMDAwIG4gCjAwMDAxNzIwMDggMDAwMDAgbiAKMDAwMDE3MjIwOCAwMDAwMCBuIAowMDAwMTcyNDAxIDAwMDAwIG4gCjAwMDAxNzczNzQgMDAwMDAgbiAKMDAwMDE3MjU2OCAwMDAwMCBuIAowMDAwMTcxODMxIDAwMDAwIG4gCjAwMDAxNzQ2NzAgMDAwMDAgbiAKMDAwMDE3NDg2MiAwMDAwMCBuIAowMDAwMTc1MDU2IDAwMDAwIG4gCjAwMDAxNzUyOTAgMDAwMDAgbiAKMDAwMDE3MzMzMyAwMDAwMCBuIAowMDAwMTczNjkyIDAwMDAwIG4gCjAwMDAxNzU1MjQgMDAwMDAgbiAKMDAwMDE3NTcxNyAwMDAwMCBuIAowMDAwMTc1OTMyIDAwMDAwIG4gCjAwMDAxNzYzNDAgMDAwMDAgbiAKMDAwMDE3NjEzOCAwMDAwMCBuIAowMDAwMTc2NDk5IDAwMDAwIG4gCjAwMDAxNzcxODkgMDAwMDAgbiAKMDAwMDE3NjczNSAwMDAwMCBuIAowMDAwMTc3NTQ0IDAwMDAwIG4gCjAwMDAxNzY5NjAgMDAwMDAgbiAKMDAwMDE3Mjc3MCAwMDAwMCBuIAowMDAwMTczNTA5IDAwMDAwIG4gCjAwMDAxNzc2ODQgMDAwMDAgbiAKMDAwMDE3Mjk3NiAwMDAwMCBuIAowMDAwMTc3ODgyIDAwMDAwIG4gCjAwMDAxNzMxNzEgMDAwMDAgbiAKMDAwMDE3ODEzNSAwMDAwMCBuIAowMDAwMTc4MzM0IDAwMDAwIG4gCjAwMDAxNzg0MDQgMDAwMDAgbiAKMDAwMDE3ODY2NSAwMDAwMCBuIAowMDAwMTk1MDU3IDAwMDAwIG4gCjAwMDAxOTUyMTQgMDAwMDAgbiAKMDAwMDE5NTM3MSAwMDAwMCBuIAowMDAwMTk1NTI4IDAwMDAwIG4gCjAwMDAxOTU1OTggMDAwMDAgbiAKMDAwMDIxMjI1NCAwMDAwMCBuIAowMDAwMjEyNDEyIDAwMDAwIG4gCjAwMDAyMTI1NjkgMDAwMDAgbiAKMDAwMDIxMjcyNiAwMDAwMCBuIAowMDAwMjE0MTM3IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2NDkvUm9vdCA1NjggMCBSL0luZm8gMzYgMCBSL0lEIFs8YmZjNmUxM2E1NmViYjI0MTgzZWI1MDAyZDEyYzg2Zjc+PDA2OTZkYTc0YzA1YmJlOWM5Y2E1MTRmYzdhMzAxNzdiPl0+PgolaVRleHQtNS41LjExCnN0YXJ0eHJlZgoyMTU1ODYKJSVFT0YK"
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "d361c3b4-aaf1-4a69-805b-650e04d4e766",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "d8038606-dec8-4683-81b2-cc9cd7b6708f",
                  "name": [
                    {
                      "family": "Physician",
                      "given": [
                        "Test2"
                      ],
                      "prefix": [
                        ""
                      ],
                      "suffix": [
                        ""
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "613-531-3008",
                      "use": "home",
                      "rank": 1
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "54134"
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
                  "reference": "d8038606-dec8-4683-81b2-cc9cd7b6708f"
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
          "code": "OTN_NO_RECIPIENTS",
          "diagnostics": "Recipient with identifier:54134 not found"
        }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(400)
});
})

test('DRA_F70-5 - Novari Sample REFERENCE NEW ISSUES HRM-5 IT WORKS', async({page}) => {
  setReport('Functional Tests', 'DRA_F70-5')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "833a5646-9178-448e-a7f3-31b087e6919e",
        "type": "collection",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "aa3f0e0b-aa95-44e8-a117-329214cc8eea",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "555913fa-4a85-4f3d-1479-0c1bc171a12c",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "2342342323 AC"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "555913fa-4a85-4f3d-1479-0c1bc171a12c"
                    }
                  ],
                  "name": [
                    {
                      "family": "Patient",
                      "given": [
                        "Test"
                      ],
                      "prefix": [
                        ""
                      ],
                      "suffix": [
                        ""
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "555-555-8310",
                      "use": "home",
                      "rank": 1
                    }
                  ],
                  "gender": "male",
                  "birthDate": "2017-10-04",
                  "address": [
                    {
                      "use": "home",
                      "line": [
                        "123 Erehwon St."
                      ],
                      "city": "Kingston",
                      "state": "ON",
                      "postalCode": "A1A 1A1",
                      "country": "CA"
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "beb15f21-28f8-46de-bfc1-68c793e98ffa",
                  "text": {
                    "status": "generated",
                    "div": "Immediate health concern: Testing - Please Ignore"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "d8038606-dec8-4683-81b2-cc9cd7b6708f",
                      "name": [
                        {
                          "family": "Physician",
                          "given": [
                            "Test2"
                          ],
                          "prefix": [
                            ""
                          ],
                          "suffix": [
                            ""
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "613-531-3008",
                          "use": "home",
                          "rank": 1
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                              "value": "54134"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "beb15f21-28f8-46de-bfc1-68c793e98ffa"
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
                        "reference": "d8038606-dec8-4683-81b2-cc9cd7b6708f"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-10-10T18:39:18Z",
                    "end": "2017-11-20T13:37:54Z"
                  }
                }
              ],
              "status": "final",
              "subject": {
                "reference": "555913fa-4a85-4f3d-1479-0c1bc171a12c"
              },
              "context": {
                "reference": "beb15f21-28f8-46de-bfc1-68c793e98ffa"
              },
              "effectiveDateTime": "2017-11-20T13:37:54Z",
              "conclusion": "Not completed – no response from patient",
              "presentedForm": [
                {
                  "contentType": "application/pdf",
                  "data": "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ci9GbGF0ZURlY29kZT4+c3RyZWFtCnicK1QIVNAPqVBw8nVWcAViACOsBAUKZW5kc3RyZWFtCmVuZG9iagozNSAwIG9iago8PC9UeXBlL1hPYmplY3QvU3VidHlwZS9Gb3JtL1Jlc291cmNlczw8Pj4vQkJveFswIDAgNTAxLjEyIDEzOC42XS9Gb3JtVHlwZSAxL01hdHJpeCBbMSAwIDAgMSAwIDBdL0xlbmd0aCAyMi9GaWx0ZXIvRmxhdGVEZWNvZGU+PnN0cmVhbQp4nCtUCFTQD6lQcPJ1VnAFYgAjrAQFCmVuZHN0cmVhbQplbmRvYmoKMzYgMCBvYmoKPDwvQXV0aG9yKEJsYWluZSBKZW5raW5zKS9Db21wYW55KCkvQ3JlYXRpb25EYXRlKEQ6MjAxNzA3MTgxNTIwNDQtMDQnMDAnKS9DcmVhdG9yKEFjcm9iYXQgUERGTWFrZXIgMTcgZm9yIFdvcmQpL0tleXdvcmRzKCkvTW9kRGF0ZShEOjIwMTcxMTIwMDgzODI4LTA1JzAwJykvUHJvZHVjZXIoQWRvYmUgUERGIExpYnJhcnkgMTUuMDsgbW9kaWZpZWQgdXNpbmcgaVRleHRTaGFycJIgNS41LjExIKkyMDAwLTIwMTcgaVRleHQgR3JvdXAgTlYgXChBR1BMLXZlcnNpb25cKSkvU291cmNlTW9kaWZpZWQoRDoyMDE3MDcxODE5MTk1NikvVGl0bGUoTWVkaWNhbCBvZmZpY2UgcmVnaXN0cmF0aW9uIGZvcm0pL19UZW1wbGF0ZUlEKFRDMDEwMjMzOTQxMDMzKT4+CmVuZG9iagozNyAwIG9iago8PC9MZW5ndGggMzY4MC9UeXBlL01ldGFkYXRhL1N1YnR5cGUvWE1MPj5zdHJlYW0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4xLjAtamMwMDMiPgogIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIgogICAgICAgIHhtbG5zOnBkZng9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmeC8xLjMvIgogICAgICAgIHhtbG5zOmFkaG9jd2Y9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWNyb2JhdEFkaG9jV29ya2Zsb3cvMS4wLyIKICAgICAgeG1wOk1vZGlmeURhdGU9IjIwMTctMTEtMjBUMDg6Mzg6MjgtMDU6MDAiCiAgICAgIHhtcDpDcmVhdGVEYXRlPSIyMDE3LTA3LTE4VDE1OjIwOjQ0LTA0OjAwIgogICAgICB4bXA6TWV0YWRhdGFEYXRlPSIyMDE3LTExLTIwVDA4OjM4OjI4LTA1OjAwIgogICAgICB4bXA6Q3JlYXRvclRvb2w9IkFjcm9iYXQgUERGTWFrZXIgMTcgZm9yIFdvcmQiCiAgICAgIHhtcE1NOkRvY3VtZW50SUQ9InV1aWQ6ZDU4Y2NlNWItZmY3OC00ZDM1LWJlMGItMWY1ODM3NjhmNmRmIgogICAgICB4bXBNTTpJbnN0YW5jZUlEPSJ1dWlkOjRkYTllNDRhLWY5YTctNGFlYS05MzMzLWY2OGVhMjk0MGE2ZSIKICAgICAgZGM6Zm9ybWF0PSJhcHBsaWNhdGlvbi9wZGYiCiAgICAgIHBkZjpQcm9kdWNlcj0iQWRvYmUgUERGIExpYnJhcnkgMTUuMDsgbW9kaWZpZWQgdXNpbmcgaVRleHRTaGFycOKEoiA1LjUuMTEgwqkyMDAwLTIwMTcgaVRleHQgR3JvdXAgTlYgKEFHUEwtdmVyc2lvbikiCiAgICAgIHBkZjpLZXl3b3Jkcz0iIgogICAgICBwZGZ4OlNvdXJjZU1vZGlmaWVkPSJEOjIwMTcwNzE4MTkxOTU2IgogICAgICBwZGZ4OkNvbXBhbnk9IiIKICAgICAgcGRmeDpfVGVtcGxhdGVJRD0iVEMwMTAyMzM5NDEwMzMiCiAgICAgIGFkaG9jd2Y6c3RhdGU9IjEiCiAgICAgIGFkaG9jd2Y6dmVyc2lvbj0iMS4xIj4KICAgICAgPHhtcE1NOnN1YmplY3Q+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICA8cmRmOmxpPjM8L3JkZjpsaT4KICAgICAgICA8L3JkZjpTZXE+CiAgICAgIDwveG1wTU06c3ViamVjdD4KICAgICAgPGRjOnRpdGxlPgogICAgICAgIDxyZGY6QWx0PgogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5NZWRpY2FsIG9mZmljZSByZWdpc3RyYXRpb24gZm9ybTwvcmRmOmxpPgogICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPGRjOmNyZWF0b3I+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICA8cmRmOmxpPkJsYWluZSBKZW5raW5zPC9yZGY6bGk+CiAgICAgICAgPC9yZGY6U2VxPgogICAgICA8L2RjOmNyZWF0b3I+CiAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4KZW5kc3RyZWFtCmVuZG9iagozOCAwIG9iago8PC9Bbm5vdHMgMzkgMCBSL0NvbnRlbnRzIDQwIDAgUi9Dcm9wQm94WzAuMCAwLjAgNjEyLjAgNzkyLjBdL01lZGlhQm94WzAuMCAwLjAgNjEyLjAgNzkyLjBdL1BhcmVudCA0MSAw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agpbNTUgMCBSXQplbmRvYmoKNTYgMCBvYmoKPDwvQXNjZW50IDk5OC9DYXBIZWlnaHQgNzE2L0Rlc2NlbnQgLTMyNS9GbGFncyA5Ni9Gb250QkJveFstNTE3IC0zMjUgMTM1OSA5OThdL0ZvbnRGYW1pbHkoQXJpYWwpL0ZvbnROYW1lL0FyaWFsLUl0YWxpY01UL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDQwMC9JdGFsaWNBbmdsZSAtMTIvU3RlbVYgOTIvVHlwZS9Gb250RGVzY3JpcHRvci9YSGVpZ2h0IDUxOT4+CmVuZG9iago0IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS9OYW1lL0hlbHYvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQvRW5jb2RpbmcgNTcgMCBSPj4KZW5kb2JqCjUzIDAgb2JqCjw8L0YgNC9NSzw8Pj4vUCAzOCAwIFIvUGFyZW50IDU4IDAgUi9SZWN0WzY4Ljc3MyAxMzEuMDQgMjE4Ljc3MyAxNDIuOTk0XS9TdWJ0eXBlL1dpZGdldC9UeXBlL0Fubm90L0FQPDwvTiAyMiAwIFI+Pj4+CmVuZG9iago0MyAwIG9iago8PC9CYXNlRm9udC9FQUNESFYrQXJpYWxNVC9EZXNjZW5kYW50Rm9udHMgNTQgMCBSL0VuY29kaW5nL0lkZW50aXR5LUgvU3VidHlwZS9UeXBlMC9Ub1VuaWNvZGUgNDcgMCBSL1R5cGUvRm9udD4+CmVuZG9iago0NiAwIG9iago8PC9CYXNlRm9udC9BcmlhbC1JdGFsaWNNVC9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRmlyc3RDaGFyIDAvRm9udERlc2NyaXB0b3IgNTYgMCBSL0xhc3RDaGFyIDI1NS9TdWJ0eXBlL1RydWVUeXBlL1R5cGUvRm9udC9XaWR0aHNbNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAyNzggMjc4IDM1NSA1NTYgNTU2IDg4OSA2NjcgMTkxIDMzMyAzMzMgMzg5IDU4NCAyNzggMzMzIDI3OCAyNzggNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDI3OCAyNzggNTg0IDU4NCA1ODQgNTU2IDEwMTUgNjY3IDY2NyA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTAwIDY2NyA1NTYgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgNjY3IDk0NCA2NjcgNjY3IDYxMSAyNzggMjc4IDI3OCA0NjkgNTU2IDMzMyA1NTYgNTU2IDUwMCA1NTYgNTU2IDI3OCA1NTYgNTU2IDIyMiAyMjIgNTAwIDIyMiA4MzMgNTU2IDU1NiA1NTYgNTU2IDMzMyA1MDAgMjc4IDU1NiA1MDAgNzIyIDUwMCA1MDAgNTAwIDMzNCAyNjAgMzM0IDU4NCAzNTAgNTU2IDM1MCAyMjIgNTU2IDMzMyAxMDAwIDU1NiA1NTYgMzMzIDEwMDAgNjY3IDMzMyAxMDAwIDM1MCA2MTEgMzUwIDM1MCAyMjIgMjIyIDMzMyAzMzMgMzUwIDU1NiAxMDAwIDMzMyAxMDAwIDUwMCAzMzMgOTQ0IDM1MCA1MDAgNjY3IDI3OCAzMzMgNTU2IDU1NiA1NTYgNTU2IDI2MCA1NTYgMzMzIDczNyAzNzAgNTU2IDU4NCAzMzMgNzM3IDU1MiA0MDAgNTQ5IDMzMyAzMzMgMzMzIDU3NiA1MzcgMzMzIDMzMyAzMzMgMzY1IDU1NiA4MzQgODM0IDgzNCA2MTEgNjY3IDY2NyA2NjcgNjY3IDY2NyA2NjcgMTAwMCA3MjIgNjY3IDY2NyA2NjcgNjY3IDI3OCAyNzggMjc4IDI3OCA3MjIgNzIyIDc3OCA3NzggNzc4IDc3OCA3NzggNTg0IDc3OCA3MjIgNzIyIDcyMiA3MjIgNjY3IDY2NyA2MTEgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODg5IDUwMCA1NTYgNTU2IDU1NiA1NTYgMjc4IDI3OCAyNzggMjc4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NDkgNjExIDU1NiA1NTYgNTU2IDU1NiA1MDAgNTU2IDUwMF0+PgplbmRvYmoKNTcgMCBvYmoKPDwvRGlmZmVyZW5jZXNbMjQvYnJldmUvY2Fyb24vY2lyY3VtZmxleC9kb3RhY2NlbnQvaHVuZ2FydW1sYXV0L29nb25lay9yaW5nL3RpbGRlIDM5L3F1b3Rlc2luZ2xlIDk2L2dyYXZlIDEyOC9idWxsZXQvZGFnZ2VyL2RhZ2dlcmRibC9lbGxpcHNpcy9lbWRhc2gvZW5kYXNoL2Zsb3Jpbi9mcmFjdGlvbi9ndWlsc2luZ2xsZWZ0L2d1aWxzaW5nbHJpZ2h0L21pbnVzL3BlcnRob3VzYW5kL3F1b3RlZGJsYmFzZS9xdW90ZWRibGxlZnQvcXVvdGVkYmxyaWdodC9xdW90ZWxlZnQvcXVvdGVyaWdodC9xdW90ZXNpbmdsYmFzZS90cmFkZW1hcmsvZmkvZmwvTHNsYXNoL09FL1NjYXJvbi9ZZGllcmVzaXMvWmNhcm9uL2RvdGxlc3NpL2xzbGFzaC9vZS9zY2Fyb24vemNhcm9uIDE2MC9FdXJvIDE2NC9jdXJyZW5jeSAxNjYvYnJva2VuYmFyIDE2OC9kaWVyZXNpcy9jb3B5cmlnaHQvb3JkZmVtaW5pbmUgMTcyL2xvZ2ljYWxub3QvLm5vdGRlZi9yZWdpc3RlcmVkL21hY3Jvbi9kZWdyZWUvcGx1c21pbnVzL3R3b3N1cGVyaW9yL3RocmVlc3VwZXJpb3IvYWN1dGUvbXUgMTgzL3BlcmlvZGNlbnRlcmVkL2NlZGlsbGEvb25lc3VwZXJpb3Ivb3JkbWFzY3VsaW5lIDE4OC9vbmVxdWFydGVyL29uZWhhbGYvdGhyZWVxdWFydGVycyAxOTIvQWdyYXZlL0FhY3V0ZS9BY2lyY3VtZmxleC9BdGlsZGUvQWRpZXJlc2lzL0FyaW5nL0FFL0NjZWRpbGxhL0VncmF2ZS9FYWN1dGUvRWNpcmN1bWZsZXgvRWRpZXJlc2lzL0lncmF2ZS9JYWN1dGUvSWNpcmN1bWZsZXgvSWRpZXJlc2lzL0V0aC9OdGlsZGUvT2dyYXZlL09hY3V0ZS9PY2lyY3VtZmxleC9PdGlsZGUvT2RpZXJlc2lzL211bHRpcGx5L09zbGFzaC9VZ3JhdmUvVWFjdXRlL1VjaXJjdW1mbGV4L1VkaWVyZXNpcy9ZYWN1dGUvVGhvcm4vZ2VybWFuZGJscy9hZ3JhdmUvYWFjdXRlL2FjaXJjdW1mbGV4L2F0aWxkZS9hZGllcmVzaXMvYXJpbmcvYWUvY2NlZGlsbGEvZWdyYXZlL2VhY3V0ZS9lY2lyY3VtZmxleC9lZGllcmVzaXMvaWdyYXZlL2lhY3V0ZS9pY2lyY3VtZmxleC9pZGllcmVzaXMvZXRoL250aWxkZS9vZ3JhdmUvb2FjdXRlL29jaXJjdW1mbGV4L290aWxkZS9vZGllcmVzaXMvZGl2aWRlL29zbGFzaC91Z3JhdmUvdWFjdXRlL3VjaXJjdW1mbGV4L3VkaWVyZXNpcy95YWN1dGUvdGhvcm4veWRpZXJlc2lzXS9UeXBlL0VuY29kaW5nPj4KZW5kb2JqCjUyIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA0MDk2L01LPDw+Pi9QIDM4IDAgUi9SZWN0WzU0Ljc3NDUgMzU0Ljk2IDU1Ny4xODIgNjkwLjA4NV0vU3VidHlwZS9XaWRnZXQvVChDaGFydE5vdGVzKS9UVShDaGFydCBOb3RlcykvVHlwZS9Bbm5vdC9WKCkvQVA8PC9OIDM0IDAgUj4+Pj4KZW5kb2JqCjUwIDAgb2JqCjw8L0FQPDwvTiAzNSAwIFI+Pi9EQSgvSGVsdiAgMCBUZiAwIGcpL0RSPDwvRW5jb2Rpbmc8PC9QREZEb2NFbmNvZGluZyA1NyAwIFI+Pi9Gb250PDwvSGVsdiA0IDAgUj4+Pj4vRiA0L0ZUL1R4L0ZmIDQwOTYvUCAzOCAwIFIvUmVjdFs1NS41NiAxNzguNDggNTU2LjY4IDMxNy4wOF0vU3VidHlwZS9XaWRnZXQvVChBY3Rpb25zKS9UVShBY3Rpb25zOikvVHlwZS9Bbm5vdC9WKCk+PgplbmRvYmoKNTEgMCBvYmoKPDwvREEoL0hlbHYgMTIgVGYgMCBnKS9EUjw8L0VuY29kaW5nPDwvUERGRG9jRW5jb2RpbmcgNTcgMCBSPj4vRm9udDw8L0hlbHYgNCAwIFI+Pj4+L0YgNC9NSzw8Pj4vUCAzOCAwIFIvUGFyZW50IDU5IDAgUi9SZWN0WzM5Ny40NCAxNDcuNiA1NDguMjggMTY4LjI0N10vU3VidHlwZS9XaWRnZXQvVHlwZS9Bbm5vdC9BUDw8L04gMyAwIFI+Pj4+CmVuZG9iago2MCAwIG9iago8PC9Db3VudCA0L0ZpcnN0IDYxIDAgUi9MYXN0IDYyIDAgUi9UeXBlL091dGxpbmVzPj4KZW5kb2JqCjYxIDAgb2JqCjw8L0EgNjMgMCBSL05leHQgNjQgMCBSL1BhcmVudCA2MCAwIFIvVGl0bGUo/v8AUABBAFQASQBFAE4AVAAgAEkATgBGAE8AUgBNAEEAVABJAE8ATik+PgplbmRvYmoKNjIgMCBvYmoKPDwvQSA2NSAwIFIvUGFyZW50IDYwIDAgUi9QcmV2IDY2IDAgUi9UaXRsZSj+/wBQAEgAWQBTAEkAQwBJAEEATgAgAEkATgBGAE8AUgBNAEEAVABJAE8ATik+PgplbmRvYmoKNjUgMCBvYmoKPDwvRFszOCAwIFIvWFlaIDIzNyA3MjYgbnVsbF0vUy9Hb1RvPj4KZW5kb2JqCjY2IDAgb2JqCjw8L0EgNjcgMCBSL05leHQgNjIgMCBSL1BhcmVudCA2MCAwIFIvUHJldiA2NCAwIFIvVGl0bGUo/v8ARQBOAEMATwBVAE4AVABFAFIAIABEAEUAVABBAEkATABTKT4+CmVuZG9iago2NyAwIG9iago8PC9EWzY4IDAgUi9YWVogMjQ4IDMyNSBudWxsXS9TL0dvVG8+PgplbmRvYmoKNjQgMCBvYmoKPDwvQSA2OSAwIFIvTmV4dCA2NiAwIFIvUGFyZW50IDYwIDAgUi9QcmV2IDYxIDAgUi9UaXRsZSj+/wBFAE4AQwBPAFUATgBUAEUAUgBJAE4ARwAgAFAASABZAFMASQBDAEkAQQBOACAASQBOAEYATwBSAE0AQQBUAEkATwBOKT4+CmVuZG9iago2OSAwIG9iago8PC9EWzY4IDAgUi9YWVogMTkzIDQ2MCBudWxsXS9TL0dvVG8+PgplbmRvYmoKNjMgMCBvYmoKPDwvRFs2OCAwIFIvWFlaIDI0NCA2NDIgbnVsbF0vUy9Hb1RvPj4KZW5kb2JqCjU5IDAgb2JqCjw8L0ZUL1R4L0ZmIDgzODg2MDgvS2lkc1s3MCAwIFIgNTEgMCBSXS9UKERhdGUpL1RVKERhdGU6KS9WKE5vdiAyMCwgMjAxNyk+PgplbmRvYmoKNTggMCBvYmoKPDwvRlQvVHgvRmYgODM4ODYwOC9LaWRzWzcxIDAgUiA1MyAwIFJdL1QoRW5jb3VudGVyaW5nUGh5c2ljaWFuTmFtZSkvVFUoQ29tbXVuaXR5IFBoeXNpY2lhbiBOYW1lOikvVihUZXN0MiBQaHlzaWNpYW4pPj4KZW5kb2JqCjcyIDAgb2JqCjw8L0Jhc2VGb250L0Vkd2FyZGlhblNjcmlwdElUQy9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRmlyc3RDaGFyIDAvRm9udERlc2NyaXB0b3IgNzMgMCBSL0xhc3RDaGFyIDI1NS9OYW1lL0Vkd2FyZGlhblNjcmlwdElUQy9TdWJ0eXBlL1RydWVUeXBlL1R5cGUvRm9udC9XaWR0aHNbNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCAxNzcgMjg3IDQ3OCA0NzggNDc4IDUzNSA4ODkgMzIxIDQzOSA0MzkgMjc4IDUyMyAyMjMgMzU4IDIyMyA1MjkgNDc4IDQ3OCA0NzggNDc4IDQ3OCA0NzggNDc4IDQ3OCA0NzggNDc4IDIyMyAyMjMgNTIzIDUyMyA1MjMgNDM2IDY4MCA5MDggOTI5IDc5NyA4NDcgODQxIDY2MCA3MzQgODYzIDYzOCA1NjMgODgxIDc1OSA5NzggODcxIDc5MyA3NjkgNzAyIDkyNSA3MDcgNTg3IDkwMSA3NDkgOTI0IDEwMDQgOTMxIDY1MyA0MzkgNTI5IDQzOSA1MDAgNTAwIDUwMCAzNDQgMjYzIDI0MiAzNDQgMjQ2IDEzMyAzMzUgMzEzIDE2OCAxNTEgMzAxIDE2MCA1NDQgMzkxIDI5MCAyNjUgMjg5IDI3OCAxOTUgMTY1IDMxMyAyNzMgNDI0IDM0OCAzMDggMjc5IDQzOSA1MDAgNDM5IDY2NyA2NjkgNDc4IDY2OSAyMDkgNDc4IDMwMSA2NjggNDc4IDQ3OCA1MDAgNzMxIDcwNyAyNDkgMTE2OCA2NjkgNzkzIDY2OSA2NjkgMjA5IDIwOSAzMDEgMzAxIDY2OSA0NDUgNTk3IDUwMCA3NzUgMTk1IDI0OSA0MTYgNjY5IDkwMSA5MzEgMTc3IDI4NyA0NzggNDc4IDUwOCA0NzggNTAwIDQ3OCA1MDAgNzY4IDM0NCAzNTggNjAxIDM1OCA3NjggNTAwIDQ3OCA1MjMgMzE4IDMxOCA1MDAgMzQ4IDgyNyAyMzEgNTAwIDMxOCAzNDQgMzU4IDY2NyA2NTAgNjU5IDQzNiA5MDggOTA4IDkwOCA5MDggOTA4IDkwOCAxMjkxIDc5NyA4NDEgODQxIDg0MSA4NDEgNjM4IDYzOCA2MzggNjM4IDg0NyA4NzEgNzkzIDc5MyA3OTMgNzkzIDc5MyA1MjMgNzkzIDkwMSA5MDEgOTAxIDkwMSA5MzEgNzQ4IDI5MSAzNDQgMzQ0IDM0NCAzNDQgMzQ0IDM0NCA0NDAgMjQyIDI0NiAyNDYgMjQ2IDI0NiAxNjggMTY4IDE2OCAxNjggMjkwIDM5MSAyOTAgMjkwIDI5MCAyOTAgMjkwIDUyMyAyOTAgMzEzIDMxMyAzMTMgMzEzIDMwOCAyNjEgMzA4XT4+CmVuZG9iagoyIDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS9FbmNvZGluZyA3NCAwIFIvTmFtZS9IZWx2L1N1YnR5cGUvVHlwZTEvVHlwZS9Gb250Pj4KZW5kb2JqCjc1IDAgb2JqCjw8L0Jhc2VGb250L1phcGZEaW5nYmF0cy9OYW1lL1phRGIvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQ+PgplbmRvYmoKNzQgMCBvYmoKPDwvRGlmZmVyZW5jZXNbMjQvYnJldmUvY2Fyb24vY2lyY3VtZmxleC9kb3RhY2NlbnQvaHVuZ2FydW1sYXV0L29nb25lay9yaW5nL3RpbGRlIDM5L3F1b3Rlc2luZ2xlIDk2L2dyYXZlIDEyOC9idWxsZXQvZGFnZ2VyL2RhZ2dlcmRibC9lbGxpcHNpcy9lbWRhc2gvZW5kYXNoL2Zsb3Jpbi9mcmFjdGlvbi9ndWlsc2luZ2xsZWZ0L2d1aWxzaW5nbHJpZ2h0L21pbnVzL3BlcnRob3VzYW5kL3F1b3RlZGJsYmFzZS9xdW90ZWRibGxlZnQvcXVvdGVkYmxyaWdodC9xdW90ZWxlZnQvcXVvdGVyaWdodC9xdW90ZXNpbmdsYmFzZS90cmFkZW1hcmsvZmkvZmwvTHNsYXNoL09FL1NjYXJvbi9ZZGllcmVzaXMvWmNhcm9uL2RvdGxlc3NpL2xzbGFzaC9vZS9zY2Fyb24vemNhcm9uIDE2MC9FdXJvIDE2NC9jdXJyZW5jeSAxNjYvYnJva2VuYmFyIDE2OC9kaWVyZXNpcy9jb3B5cmlnaHQvb3JkZmVtaW5pbmUgMTcyL2xvZ2ljYWxub3QvLm5vdGRlZi9yZWdpc3RlcmVkL21hY3Jvbi9kZWdyZWUvcGx1c21pbnVzL3R3b3N1cGVyaW9yL3RocmVlc3VwZXJpb3IvYWN1dGUvbXUgMTgzL3BlcmlvZGNlbnRlcmVkL2NlZGlsbGEvb25lc3VwZXJpb3Ivb3JkbWFzY3VsaW5lIDE4OC9vbmVxdWFydGVyL29uZWhhbGYvdGhyZWVxdWFydGVycyAxOTIvQWdyYXZlL0FhY3V0ZS9BY2lyY3VtZmxleC9BdGlsZGUvQWRpZXJlc2lzL0FyaW5nL0FFL0NjZWRpbGxhL0VncmF2ZS9FYWN1dGUvRWNpcmN1bWZsZXgvRWRpZXJlc2lzL0lncmF2ZS9JYWN1dGUvSWNpcmN1bWZsZXgvSWRpZXJlc2lzL0V0aC9OdGlsZGUvT2dyYXZlL09hY3V0ZS9PY2lyY3VtZmxleC9PdGlsZGUvT2RpZXJlc2lzL211bHRpcGx5L09zbGFzaC9VZ3JhdmUvVWFjdXRlL1VjaXJjdW1mbGV4L1VkaWVyZXNpcy9ZYWN1dGUvVGhvcm4vZ2VybWFuZGJscy9hZ3JhdmUvYWFjdXRlL2FjaXJjdW1mbGV4L2F0aWxkZS9hZGllcmVzaXMvYXJpbmcvYWUvY2NlZGlsbGEvZWdyYXZlL2VhY3V0ZS9lY2lyY3VtZmxleC9lZGllcmVzaXMvaWdyYXZlL2lhY3V0ZS9pY2lyY3VtZmxleC9pZGllcmVzaXMvZXRoL250aWxkZS9vZ3JhdmUvb2FjdXRlL29jaXJjdW1mbGV4L290aWxkZS9vZGllcmVzaXMvZGl2aWRlL29zbGFzaC91Z3JhdmUvdWFjdXRlL3VjaXJjdW1mbGV4L3VkaWVyZXNpcy95YWN1dGUvdGhvcm4veWRpZXJlc2lzXS9UeXBlL0VuY29kaW5nPj4KZW5kb2JqCjczIDAgb2JqCjw8L0FzY2VudCA4NTEvQ2FwSGVpZ2h0IDY0MC9EZXNjZW50IC0zMjgvRmxhZ3MgMzIvRm9udEJCb3hbLTMyMiAtMzI4IDE2OTIgODUxXS9Gb250RmFtaWx5KEVkd2FyZGlhbiBTY3JpcHQgSVRDKS9Gb250RmlsZTIgNDkgMCBSL0ZvbnROYW1lL0Vkd2FyZGlhblNjcmlwdElUQy9Gb250U3RyZXRjaC9Ob3JtYWwvRm9udFdlaWdodCA0MDAvSXRhbGljQW5nbGUgMC9TdGVtViA1Mi9UeXBlL0ZvbnREZXNjcmlwdG9yL1hIZWlnaHQgMjY1Pj4KZW5kb2JqCjc2IDAgb2JqCjw8L0NsYXNzTWFwIDc3IDAgUi9LIDc4IDAgUi9QYXJlbnRUcmVlIDc5IDAgUi9QYXJlbnRUcmVlTmV4dEtleSAyL1JvbGVNYXAgODAgMCBSL1R5cGUvU3RydWN0VHJlZVJvb3Q+PgplbmRvYmoKNzcgMCBvYmoKPDw+PgplbmRvYmoKNzggMCBvYmoKPDwvS1s4MSAwIFIgODIgMCBSIDgzIDAgUiA4NCAwIFIgODUgMCBSIDg2IDAgUiA4NyAwIFJdL1AgNzYgMCBSL1MvU2VjdD4+CmVuZG9iago3OSAwIG9iago8PC9OdW1zWzAgODggMCBSIDEgODkgMCBSXT4+CmVuZG9iago4MCAwIG9iago8PC9Bbm5vdGF0aW9uL1NwYW4vQXJ0aWZhY3QvUC9CaWJsaW9ncmFwaHkvQmliRW50cnkvQ2VudGVyZWQvUC9DaGFydC9GaWd1cmUvRGlhZ3JhbS9GaWd1cmUvRHJvcENhcC9GaWd1cmUvRW5kbm90ZS9Ob3RlL0Zvb3Rub3RlL05vdGUvSGVhZGluZyMyMDEvSDEvSGVhZGluZyMyMDIvUC9JbmxpbmVTaGFwZS9GaWd1cmUvSXRhbGljL1AvTGlzdCMyMFBhcmFncmFwaC9QL05vcm1hbC9QL091dGxpbmUvU3Bhbi9TdHJpa2VvdXQvU3Bhbi9TdWJzY3JpcHQvU3Bhbi9TdXBlcnNjcmlwdC9TcGFuL1RleHRCb3gvQXJ0L1VuZGVybGluZS9TcGFuPj4KZW5kb2JqCjg4IDAgb2JqCls4MSAwIFIgOTAgMCBSIDkxIDAgUiA5MiAwIFIgOTMgMCBSIDk0IDAgUiA5NSAwIFIgOTYgMCBSIDk3IDAgUiA5OCAwIFIgOTkgMCBSIDEwMCAwIFIgMTAxIDAgUiAxMDIgMCBSIDEwMyAwIFIgMTA0IDAgUiAxMDUgMCBSIDEwNiAwIFIgMTA3IDAgUiAxMDggMCBSIDEwOSAwIFIgMTEwIDAgUiAxMTEgMCBSIDExMiAwIFIgMTEzIDAgUiAxMTQgMCBSIDExNSAwIFIgMTE2IDAgUiAxMTcgMCBSIDExOCAwIFIgMTE5IDAgUiAxMjAgMCBSIDEyMSAwIFIgMTIyIDAgUiAxMjMgMCBSIDEyNCAwIFIgMTI1IDAgUiAxMjYgMCBSIDEyNyAwIFIgMTI4IDAgUiAxMjkgMCBSIDEzMCAwIFIgMTMxIDAgUiAxMzIgMCBSIDEzMyAwIFIgMTM0IDAgUiAxMzUgMCBSIDEzNiAwIFIgMTM3IDAgUiAxMzggMCBSIDEzOSAwIFIgMTQwIDAgUiAxNDEgMCBSIDE0MiAwIFIgMTQzIDAgUiAxNDQgMCBSIDE0NSAwIFIgMTQ2IDAgUiAxNDcgMCBSIDE0OCAwIFIgMTQ5IDAgUiAxNTAgMCBSIDE1MSAwIFIgMTUyIDAgUiAxNTMgMCBSIDE1NCAwIFIgMTU1IDAgUiAxNTYgMCBSIDE1NyAwIFIgMTU4IDAgUiAxNTkgMCBSIDE2MCAwIFIgMTYxIDAgUiAxNjIgMCBSIDE2MyAwIFIgMTY0IDAgUiAxNjUgMCBSIDE2NiAwIFIgMTY3IDAgUiAxNjggMCBSIDE2OSAwIFIgMTcwIDAgUiAxNzEgMCBSIDE3MiAwIFIgMTczIDAgUiAxNzQgMCBSIDE3NSAwIFIgMTc2IDAgUiAxNzcgMCBSIDE3OCAwIFIgMTc5IDAgUiAxODAgMCBSIDE4MSAwIFIgMTgyIDAgUiAxODMgMCBSIDE4NCAwIFIgMTg1IDAgUiAxODYgMCBSIDE4NyAwIFIgMTg4IDAgUiAxODkgMCBSIDE5MCAwIFIgMTkxIDAgUiAxOTIgMCBSIDE5MyAwIFIgMTk0IDAgUiAxOTUgMCBSIDE5NiAwIFIgMTk3IDAgUiAxOTggMCBSIDE5OSAwIFIgMjAwIDAgUiAyMDEgMCBSIDIwMiAwIFIgMjAzIDAgUiAyMDQgMCBSIDIwNSAwIFIgMjA2IDAgUiAyMDcgMCBSIDIwOCAwIFIgODUgMCBSIDgzIDAgUl0KZW5kb2JqCjg5IDAgb2JqClsyMDkgMCBSIDIxMCAwIFIgMjExIDAgUiAyMTIgMCBSIDIxMyAwIFIgMjE0IDAgUiAyMTUgMCBSIDIxNiAwIFIgMjE3IDAgUiAyMTggMCBSIDIxOSAwIFIgMjIwIDAgUiAyMjEgMCBSIDIyMiAwIFIgMjIzIDAgUiAyMjQgMCBSIDIyNSAwIFIgMjI2IDAgUiAyMjcgMCBSIDIyOCAwIFIgMjI5IDAgUiAyMzAgMCBSIDIzMSAwIFIgMjMyIDAgUiAyMzMgMCBSIDIzNCAwIFIgMjM1IDAgUiAyMzYgMCBSIDIzNyAwIFIgMjM4IDAgUiAyMzkgMCBSIDI0MCAwIFIgMjQxIDAgUiAyNDIgMCBSIDI0MyAwIFIgMjQ0IDAgUiAyNDUgMCBSIDI0NiAwIFIgMjQ3IDAgUiAyNDggMCBSIDI0OSAwIFIgMjUwIDAgUiAyNTEgMCBSIDI1MiAwIFIgMjUzIDAgUiAyNTQgMCBSIDI1NSAwIFIgMjU2IDAgUiAyNTcgMCBSIDI1OCAwIFIgMjU5IDAgUiAyNjAgMCBSIDI2MSAwIFIgMjYyIDAgUiAyNjMgMCBSIDI2NCAwIFIgMjY1IDAgUiAyNjYgMCBSIDI2NyAwIFIgMjY4IDAgUiAyNjkgMCBSIDI3MCAwIFIgMjcxIDAgUiAyNzIgMCBSIDI3MyAwIFIgMjc0IDAgUiAyNzUgMCBSIDI3NiAwIFIgMjc3IDAgUiAyNzggMCBSIDI3OSAwIFIgMjgwIDAgUiAyODEgMCBSIDI4MiAwIFIgMjgzIDAgUiAyODQgMCBSIDg3IDAgUl0KZW5kb2JqCjIwOSAwIG9iago8PC9BIDI4NSAwIFIvS1swIDBdL0xhbmcoRU4tVVMpL1AgMjg2IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjEwIDAgb2JqCjw8L0EgMjg3IDAgUi9LWzEgMV0vTGFuZyhFTi1VUykvUCAyODYgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMTEgMCBvYmoKPDwvS1syIDJdL1AgMjg4IDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyMTIgMCBvYmoKPDwvQSAyODkgMCBSL0tbMyAzXS9QIDI5MCAwIFIvUGcgMzggMCBSL1MvSGVhZGluZyMyMDI+PgplbmRvYmoKMjEzIDAgb2JqCjw8L0EgMjkxIDAgUi9LWzQgNF0vTGFuZyhFTi1VUykvUCAyOTAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMTQgMCBvYmoKPDwvS1s1IDVdL1AgMjkyIDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyMTUgMCBvYmoKPDwvQSAyOTMgMCBSL0tbNiA2XS9MYW5nKEVOLVVTKS9QIDI5NCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIxNiAwIG9iago8PC9LWzcgN10vUCAyOTUgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjIxNyAwIG9iago8PC9BIDI5NiAwIFIvS1s4IDhdL0xhbmcoRU4tVVMpL1AgMjk3IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjE4IDAgb2JqCjw8L0EgMjk4IDAgUi9LWzkgOV0vTGFuZyhFTi1VUykvUCAyOTcgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMTkgMCBvYmoKPDwvQSAyOTkgMCBSL0tbMTAgMTBdL0xhbmcoRU4tVVMpL1AgMjk3IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjIwIDAgb2JqCjw8L0EgMzAwIDAgUi9LWzExIDExXS9MYW5nKEVOLVVTKS9QIDI5NyAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIyMSAwIG9iago8PC9BIDMwMSAwIFIvS1sxMiAxMl0vTGFuZyhFTi1VUykvUCAyOTcgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMjIgMCBvYmoKPDwvS1sxMyAxM10vUCAzMDIgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjIyMyAwIG9iago8PC9BIDMwMyAwIFIvS1sxNCAxNF0vTGFuZyhFTi1VUykvUCAzMDQgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMjQgMCBvYmoKPDwvQSAzMDUgMCBSL0tbMTUgMTVdL0xhbmcoRU4tVVMpL1AgMzA0IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjI1IDAgb2JqCjw8L0EgMzA2IDAgUi9LWzE2IDE2XS9MYW5nKEVOLVVTKS9QIDMwNCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIyNiAwIG9iago8PC9BIDMwNyAwIFIvS1sxNyAxN10vTGFuZyhFTi1VUykvUCAzMDQgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMjcgMCBvYmoKPDwvQSAzMDggMCBSL0tbMTggMThdL0xhbmcoRU4tVVMpL1AgMzA0IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjI4IDAgb2JqCjw8L0EgMzA5IDAgUi9LWzE5IDE5XS9MYW5nKEVOLVVTKS9QIDMwNCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIyOSAwIG9iago8PC9LWzIwIDIwXS9QIDMxMCAwIFIvUGcgMzggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMjMwIDAgb2JqCjw8L0EgMzExIDAgUi9LWzIxIDIxXS9MYW5nKEVOLVVTKS9QIDMxMiAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIzMSAwIG9iago8PC9BIDMxMyAwIFIvS1syMiAyMl0vTGFuZyhFTi1VUykvUCAzMTIgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMzIgMCBvYmoKPDwvQSAzMTQgMCBSL0tbMjMgMjNdL0xhbmcoRU4tVVMpL1AgMzEyIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjMzIDAgb2JqCjw8L0EgMzE1IDAgUi9LWzI0IDI0XS9MYW5nKEVOLVVTKS9QIDMxMiAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIzNCAwIG9iago8PC9BIDMxNiAwIFIvS1syNSAyNV0vTGFuZyhFTi1VUykvUCAzMTIgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMzUgMCBvYmoKPDwvQSAzMTcgMCBSL0tbMjYgMjZdL0xhbmcoRU4tVVMpL1AgMzEyIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjM2IDAgb2JqCjw8L0tbMjcgMjddL1AgMzE4IDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyMzcgMCBvYmoKPDwvQSAzMTkgMCBSL0tbMjggMjhdL0xhbmcoRU4tVVMpL1AgMzIwIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjM4IDAgb2JqCjw8L0EgMzIxIDAgUi9LWzI5IDI5XS9MYW5nKEVOLVVTKS9QIDMyMCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjIzOSAwIG9iago8PC9BIDMyMiAwIFIvS1szMCAzMF0vTGFuZyhFTi1VUykvUCAzMjAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNDAgMCBvYmoKPDwvQSAzMjMgMCBSL0tbMzEgMzFdL0xhbmcoRU4tVVMpL1AgMzIwIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjQxIDAgb2JqCjw8L0EgMzI0IDAgUi9LWzMyIDMyXS9MYW5nKEVOLVVTKS9QIDMyMCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI0MiAwIG9iago8PC9BIDMyNSAwIFIvS1szMyAzM10vTGFuZyhFTi1VUykvUCAzMjAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNDMgMCBvYmoKPDwvS1szNCAzNF0vUCAzMjYgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjI0NCAwIG9iago8PC9BIDMyNyAwIFIvS1szNSAzNV0vTGFuZyhFTi1VUykvUCAzMjggMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNDUgMCBvYmoKPDwvS1szNiAzNl0vUCAzMjkgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjI0NiAwIG9iago8PC9BIDMzMCAwIFIvS1szNyAzN10vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNDcgMCBvYmoKPDwvQSAzMzIgMCBSL0tbMzggMzhdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI0OCAwIG9iago8PC9BIDMzMyAwIFIvS1szOSAzOV0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjQ5IDAgb2JqCjw8L0EgMzM0IDAgUi9LWzQwIDQwXS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNTAgMCBvYmoKPDwvQSAzMzUgMCBSL0tbNDEgNDFdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI1MSAwIG9iago8PC9BIDMzNiAwIFIvS1s0MiA0Ml0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjUyIDAgb2JqCjw8L0EgMzM3IDAgUi9LWzQzIDQzXS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNTMgMCBvYmoKPDwvQSAzMzggMCBSL0tbNDQgNDRdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI1NCAwIG9iago8PC9BIDMzOSAwIFIvS1s0NSA0NV0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjU1IDAgb2JqCjw8L0EgMzQwIDAgUi9LWzQ2IDQ2XS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNTYgMCBvYmoKPDwvQSAzNDEgMCBSL0tbNDcgNDddL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI1NyAwIG9iago8PC9BIDM0MiAwIFIvS1s0OCA0OF0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjU4IDAgb2JqCjw8L0EgMzQzIDAgUi9LWzQ5IDQ5XS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNTkgMCBvYmoKPDwvQSAzNDQgMCBSL0tbNTAgNTBdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI2MCAwIG9iago8PC9BIDM0NSAwIFIvS1s1MSA1MV0vTGFuZyhFTi1VUykvUCAzMzEgMCBSL1BnIDM4IDAgUi9TL0xpc3QjMjBQYXJhZ3JhcGg+PgplbmRvYmoKMjYxIDAgb2JqCjw8L0EgMzQ2IDAgUi9LWzUyIDUyXS9MYW5nKEVOLVVTKS9QIDMzMSAwIFIvUGcgMzggMCBSL1MvTGlzdCMyMFBhcmFncmFwaD4+CmVuZG9iagoyNjIgMCBvYmoKPDwvQSAzNDcgMCBSL0tbNTMgNTNdL0xhbmcoRU4tVVMpL1AgMzMxIDAgUi9QZyAzOCAwIFIvUy9MaXN0IzIwUGFyYWdyYXBoPj4KZW5kb2JqCjI2MyAwIG9iago8PC9LWzU0IDU0XS9QIDM0OCAwIFIvUGcgMzggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMjY0IDAgb2JqCjw8L0EgMzQ5IDAgUi9LWzU1IDU1XS9MYW5nKEVOLVVTKS9QIDM1MCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI2NSAwIG9iago8PC9BIDM1MSAwIFIvS1s1NiA1Nl0vTGFuZyhFTi1VUykvUCAzNTAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNjYgMCBvYmoKPDwvQSAzNTIgMCBSL0tbNTcgNTddL0xhbmcoRU4tVVMpL1AgMzUwIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjY3IDAgb2JqCjw8L0EgMzUzIDAgUi9LWzU4IDU4XS9MYW5nKEVOLVVTKS9QIDM1MCAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI2OCAwIG9iago8PC9BIDM1NCAwIFIvS1s1OSA1OV0vTGFuZyhFTi1VUykvUCAzNTAgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNjkgMCBvYmoKPDwvQSAzNTUgMCBSL0tbNjAgNjBdL0xhbmcoRU4tVVMpL1AgMzUwIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjcwIDAgb2JqCjw8L0tbNjEgNjFdL1AgMzU2IDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyNzEgMCBvYmoKPDwvQSAzNTcgMCBSL0tbNjIgNjJdL0xhbmcoRU4tVVMpL1AgMzU4IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjcyIDAgb2JqCjw8L0tbNjMgNjNdL1AgMzU5IDAgUi9QZyAzOCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoyNzMgMCBvYmoKPDwvQSAzNjAgMCBSL0tbNjQgNjRdL0xhbmcoRU4tVVMpL1AgMzYxIDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjc0IDAgb2JqCjw8L0EgMzYyIDAgUi9LWzY1IDY1XS9MYW5nKEVOLVVTKS9QIDM2MyAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI3NSAwIG9iago8PC9BIDM2NCAwIFIvS1s2NiA2Nl0vTGFuZyhFTi1VUykvUCAzNjUgMCBSL1BnIDM4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyNzYgMCBvYmoKPDwvQSAzNjYgMCBSL0tbNjcgNjddL0xhbmcoRU4tVVMpL1AgMzY3IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjc3IDAgb2JqCjw8L0EgMzY4IDAgUi9LWzY4IDY4XS9MYW5nKEVOLVVTKS9QIDM2OSAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI3OCAwIG9iago8PC9LWzY5IDY5XS9QIDM3MCAwIFIvUGcgMzggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMjc5IDAgb2JqCjw8L0EgMzcxIDAgUi9LWzcwIDcwXS9MYW5nKEVOLVVTKS9QIDM3MiAwIFIvUGcgMzggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjI4MCAwIG9iago8PC9BIDM3MyAwIFIvS1s3MSA3MV0vTGFuZyhFTi1VUykvUCAzNzQgMCBSL1BnIDM4IDAgUi9TL0l0YWxpYz4+CmVuZG9iagoyODEgMCBvYmoKPDwvQSAzNzUgMCBSL0tbNzIgNzJdL0xhbmcoRU4tVVMpL1AgMzc2IDAgUi9QZyAzOCAwIFIvUy9JdGFsaWM+PgplbmRvYmoKMjgyIDAgb2JqCjw8L0EgMzc3IDAgUi9LWzczIDczXS9MYW5nKEVOLVVTKS9QIDM3OCAwIFIvUGcgMzggMCBSL1MvSXRhbGljPj4KZW5kb2JqCjI4MyAwIG9iago8PC9BIDM3OSAwIFIvS1s3NCA3NF0vTGFuZyhFTi1VUykvUCAzODAgMCBSL1BnIDM4IDAgUi9TL0l0YWxpYz4+CmVuZG9iagoyODQgMCBvYmoKPDwvS1s3NSA3NV0vUCAzODEgMCBSL1BnIDM4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjg3IDAgb2JqCjw8L0EgMzgyIDAgUi9LWzc2IDc2XS9MYW5nKEVOLVVTKS9QIDc4IDAgUi9QZyAzOCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMzgyIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzgxIDAgb2JqCjw8L0tbMjg0IDAgUiAzNzIgMCBSIDM3NCAwIFIgMzc2IDAgUiAzNzggMCBSIDM4MCAwIFJdL1AgODYgMCBSL1MvVFI+PgplbmRvYmoKODYgMCBvYmoKPDwvQSAzODMgMCBSL0tbMjg4IDAgUiAyOTIgMCBSIDI5NSAwIFIgMzAyIDAgUiAzMTAgMCBSIDMxOCAwIFIgMzI2IDAgUiAzMjkgMCBSIDM0OCAwIFIgMzU2IDAgUiAzNTkgMCBSIDM3MCAwIFIgMzgxIDAgUl0vUCA3OCAwIFIvUy9UYWJsZT4+CmVuZG9iagozODMgMCBvYmoKPDwvQkJveFs1My4wMTMzIDE5Ny4yNyA1NjguNDQgNzQ4LjMzXS9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2s+PgplbmRvYmoKMjg4IDAgb2JqCjw8L0tbMjExIDAgUiAyODYgMCBSXS9QIDg2IDAgUi9TL1RSPj4KZW5kb2JqCjI5MiAwIG9iago8PC9LWzIxNCAwIFIgMjkwIDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagoyOTUgMCBvYmoKPDwvS1syMTYgMCBSIDI5NCAwIFJdL1AgODYgMCBSL1MvVFI+PgplbmRvYmoKMzAyIDAgb2JqCjw8L0tbMjIyIDAgUiAyOTcgMCBSXS9QIDg2IDAgUi9TL1RSPj4KZW5kb2JqCjMxMCAwIG9iago8PC9LWzIyOSAwIFIgMzA0IDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagozMTggMCBvYmoKPDwvS1syMzYgMCBSIDMxMiAwIFJdL1AgODYgMCBSL1MvVFI+PgplbmRvYmoKMzI2IDAgb2JqCjw8L0tbMjQzIDAgUiAzMjAgMCBSXS9QIDg2IDAgUi9TL1RSPj4KZW5kb2JqCjMyOSAwIG9iago8PC9LWzI0NSAwIFIgMzI4IDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagozNDggMCBvYmoKPDwvS1syNjMgMCBSIDMzMSAwIFJdL1AgODYgMCBSL1MvVFI+PgplbmRvYmoKMzU2IDAgb2JqCjw8L0tbMjcwIDAgUiAzNTAgMCBSXS9QIDg2IDAgUi9TL1RSPj4KZW5kb2JqCjM1OSAwIG9iago8PC9LWzI3MiAwIFIgMzU4IDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagozNzAgMCBvYmoKPDwvS1syNzggMCBSIDM2MSAwIFIgMzYzIDAgUiAzNjUgMCBSIDM2NyAwIFIgMzY5IDAgUl0vUCA4NiAwIFIvUy9UUj4+CmVuZG9iagozNjEgMCBvYmoKPDwvSyAyNzMgMCBSL1AgMzcwIDAgUi9TL1REPj4KZW5kb2JqCjM2MyAwIG9iago8PC9LIDI3NCAwIFIvUCAzNzAgMCBSL1MvVEQ+PgplbmRvYmoKMzY1IDAgb2JqCjw8L0sgMjc1IDAgUi9QIDM3MCAwIFIvUy9URD4+CmVuZG9iagozNjcgMCBvYmoKPDwvSyAyNzYgMCBSL1AgMzcwIDAgUi9TL1REPj4KZW5kb2JqCjM2OSAwIG9iago8PC9LIDI3NyAwIFIvUCAzNzAgMCBSL1MvVEQ+PgplbmRvYmoKMzU4IDAgb2JqCjw8L0sgMjcxIDAgUi9QIDM1OSAwIFIvUy9URD4+CmVuZG9iagozNTAgMCBvYmoKPDwvS1syNjQgMCBSIDI2NSAwIFIgMjY2IDAgUiAyNjcgMCBSIDI2OCAwIFIgMjY5IDAgUl0vUCAzNTYgMCBSL1MvVEQ+PgplbmRvYmoKMzMxIDAgb2JqCjw8L0tbMjQ2IDAgUiAyNDcgMCBSIDI0OCAwIFIgMjQ5IDAgUiAyNTAgMCBSIDI1MSAwIFIgMjUyIDAgUiAyNTMgMCBSIDI1NCAwIFIgMjU1IDAgUiAyNTYgMCBSIDI1NyAwIFIgMjU4IDAgUiAyNTkgMCBSIDI2MCAwIFIgMjYxIDAgUiAyNjIgMCBSXS9QIDM0OCAwIFIvUy9URD4+CmVuZG9iagozMjggMCBvYmoKPDwvSyAyNDQgMCBSL1AgMzI5IDAgUi9TL1REPj4KZW5kb2JqCjMyMCAwIG9iago8PC9LWzIzNyAwIFIgMjM4IDAgUiAyMzkgMCBSIDI0MCAwIFIgMjQxIDAgUiAyNDIgMCBSXS9QIDMyNiAwIFIvUy9URD4+CmVuZG9iagozMTIgMCBvYmoKPDwvS1syMzAgMCBSIDIzMSAwIFIgMjMyIDAgUiAyMzMgMCBSIDIzNCAwIFIgMjM1IDAgUl0vUCAzMTggMCBSL1MvVEQ+PgplbmRvYmoKMzA0IDAgb2JqCjw8L0tbMjIzIDAgUiAyMjQgMCBSIDIyNSAwIFIgMjI2IDAgUiAyMjcgMCBSIDIyOCAwIFJdL1AgMzEwIDAgUi9TL1REPj4KZW5kb2JqCjI5NyAwIG9iago8PC9LWzIxNyAwIFIgMjE4IDAgUiAyMTkgMCBSIDIyMCAwIFIgMjIxIDAgUl0vUCAzMDIgMCBSL1MvVEQ+PgplbmRvYmoKMjk0IDAgb2JqCjw8L0sgMjE1IDAgUi9QIDI5NSAwIFIvUy9URD4+CmVuZG9iagoyOTAgMCBvYmoKPDwvS1syMTIgMCBSIDIxMyAwIFJdL1AgMjkyIDAgUi9TL1REPj4KZW5kb2JqCjI4NiAwIG9iago8PC9LWzIwOSAwIFIgMjEwIDAgUl0vUCAyODggMCBSL1MvVEQ+PgplbmRvYmoKMzcyIDAgb2JqCjw8L0sgMjc5IDAgUi9QIDM4MSAwIFIvUy9URD4+CmVuZG9iagozNzQgMCBvYmoKPDwvSyAyODAgMCBSL1AgMzgxIDAgUi9TL1REPj4KZW5kb2JqCjM3NiAwIG9iago8PC9LIDI4MSAwIFIvUCAzODEgMCBSL1MvVEQ+PgplbmRvYmoKMzc4IDAgb2JqCjw8L0sgMjgyIDAgUi9QIDM4MSAwIFIvUy9URD4+CmVuZG9iagozODAgMCBvYmoKPDwvSyAyODMgMCBSL1AgMzgxIDAgUi9TL1REPj4KZW5kb2JqCjM3OSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM3NyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM3NSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM3MyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM3MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2OCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2NiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2NCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2MiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM2MCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1NyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1NSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1NCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1MyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1MiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM1MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM0OSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM0NyAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzQ2IDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozNDUgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM0NCAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzQzIDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozNDIgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM0MSAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzQwIDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMzkgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjMzOCAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzM3IDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMzYgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjMzNSAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzM0IDAgb2JqCjw8L08vTGF5b3V0L1N0YXJ0SW5kZW50IDM2LjAvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMzMgMCBvYmoKPDwvTy9MYXlvdXQvU3RhcnRJbmRlbnQgMzYuMC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjMzMiAwIG9iago8PC9PL0xheW91dC9TdGFydEluZGVudCAzNi4wL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzMwIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMzI3IDAgb2JqCjw8L08vTGF5b3V0L1RleHRBbGlnbi9DZW50ZXIvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMjEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMTEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozMDAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagoyOTkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagoyOTggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagoyOTYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagoyOTMgMCBvYmoKPDwvTy9MYXlvdXQvVGV4dEFsaWduL0NlbnRlci9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjI5MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjI4OSAwIG9iago8PC9PL0xheW91dC9UZXh0QWxpZ24vQ2VudGVyL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMjg3IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKMjg1IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKODEgMCBvYmoKPDwvQSAzODQgMCBSL0tbMCAwXS9MYW5nKEVOLVVTKS9QIDc4IDAgUi9QZyA2OCAwIFIvUy9IZWFkaW5nIzIwMT4+CmVuZG9iago5MCAwIG9iago8PC9LWzEgMl0vTGFuZyhFTi1VUykvUCAzODUgMCBSL1BnIDY4IDAgUi9TL1A+PgplbmRvYmoKOTEgMCBvYmoKPDwvS1syIDVdL0xhbmcoRU4tVVMpL1AgMzg2IDAgUi9QZyA2OCAwIFIvUy9QPj4KZW5kb2JqCjkyIDAgb2JqCjw8L0EgMzg3IDAgUi9LWzMgOF0vTGFuZyhFTi1VUykvUCAzODggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iago5MyAwIG9iago8PC9BIDM4OSAwIFIvS1s0IDldL0xhbmcoRU4tVVMpL1AgMzkwIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKOTQgMCBvYmoKPDwvQSAzOTEgMCBSL0tbNSAxMF0vTGFuZyhFTi1VUykvUCAzOTAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iago5NSAwIG9iago8PC9BIDM5MiAwIFIvS1s2IDExXS9MYW5nKEVOLVVTKS9QIDM5MCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjk2IDAgb2JqCjw8L0tbNyAxMl0vUCAzOTMgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjk3IDAgb2JqCjw8L0EgMzk0IDAgUi9LWzggMTNdL1AgMzk1IDAgUi9QZyA2OCAwIFIvUy9IZWFkaW5nIzIwMj4+CmVuZG9iago5OCAwIG9iago8PC9BIDM5NiAwIFIvS1s5IDE0XS9MYW5nKEVOLVVTKS9QIDM5NSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjk5IDAgb2JqCjw8L0tbMTAgMTVdL1AgMzk3IDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxMDAgMCBvYmoKPDwvQSAzOTggMCBSL0tbMTEgMTZdL0xhbmcoRU4tVVMpL1AgMzk5IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTAxIDAgb2JqCjw8L0EgNDAwIDAgUi9LWzEyIDE3XS9MYW5nKEVOLVVTKS9QIDQwMSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEwMiAwIG9iago8PC9BIDQwMiAwIFIvS1sxMyAxOF0vTGFuZyhFTi1VUykvUCA0MDMgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMDMgMCBvYmoKPDwvQSA0MDQgMCBSL0tbMTQgMTldL0xhbmcoRU4tVVMpL1AgNDA1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTA0IDAgb2JqCjw8L0EgNDA2IDAgUi9LWzE1IDIwXS9MYW5nKEVOLVVTKS9QIDQwNSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEwNSAwIG9iago8PC9BIDQwNyAwIFIvS1sxNiAyMV0vTGFuZyhFTi1VUykvUCA0MDggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMDYgMCBvYmoKPDwvQSA0MDkgMCBSL0tbMTcgMjJdL0xhbmcoRU4tVVMpL1AgNDA4IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTA3IDAgb2JqCjw8L0EgNDEwIDAgUi9LWzE4IDIzXS9MYW5nKEVOLVVTKS9QIDQxMSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEwOCAwIG9iago8PC9LWzE5IDI0XS9QIDQxMiAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTA5IDAgb2JqCjw8L0EgNDEzIDAgUi9LWzIwIDI1XS9MYW5nKEVOLVVTKS9QIDQxNCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjExMCAwIG9iago8PC9BIDQxNSAwIFIvS1syMSAyNl0vTGFuZyhFTi1VUykvUCA0MTYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMTEgMCBvYmoKPDwvS1syMiAyN10vUCA0MTcgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjExMiAwIG9iago8PC9BIDQxOCAwIFIvS1syMyAyOF0vTGFuZyhFTi1VUykvUCA0MTkgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMTMgMCBvYmoKPDwvQSA0MjAgMCBSL0tbMjQgMjldL0xhbmcoRU4tVVMpL1AgNDIxIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTE0IDAgb2JqCjw8L0EgNDIyIDAgUi9LWzI1IDMwXS9MYW5nKEVOLVVTKS9QIDQyMyAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjExNSAwIG9iago8PC9BIDQyNCAwIFIvS1syNiAzMV0vTGFuZyhFTi1VUykvUCA0MjUgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMTYgMCBvYmoKPDwvQSA0MjYgMCBSL0tbMjcgMzJdL0xhbmcoRU4tVVMpL1AgNDI3IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTE3IDAgb2JqCjw8L0EgNDI4IDAgUi9LWzI4IDMzXS9MYW5nKEVOLVVTKS9QIDQyOSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjExOCAwIG9iago8PC9LWzI5IDM0XS9QIDQzMCAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTE5IDAgb2JqCjw8L0EgNDMxIDAgUi9LWzMwIDM1XS9MYW5nKEVOLVVTKS9QIDQzMiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEyMCAwIG9iago8PC9BIDQzMyAwIFIvS1szMSAzNl0vTGFuZyhFTi1VUykvUCA0MzQgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMjEgMCBvYmoKPDwvQSA0MzUgMCBSL0tbMzIgMzddL0xhbmcoRU4tVVMpL1AgNDM2IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTIyIDAgb2JqCjw8L0EgNDM3IDAgUi9LWzMzIDM4XS9MYW5nKEVOLVVTKS9QIDQzOCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEyMyAwIG9iago8PC9BIDQzOSAwIFIvS1szNCAzOV0vTGFuZyhFTi1VUykvUCA0NDAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMjQgMCBvYmoKPDwvQSA0NDEgMCBSL0tbMzUgNDBdL0xhbmcoRU4tVVMpL1AgNDQyIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTI1IDAgb2JqCjw8L0EgNDQzIDAgUi9LWzM2IDQxXS9MYW5nKEVOLVVTKS9QIDQ0NCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEyNiAwIG9iago8PC9BIDQ0NSAwIFIvS1szNyA0Ml0vTGFuZyhFTi1VUykvUCA0NDYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMjcgMCBvYmoKPDwvS1szOCA0M10vUCA0NDcgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjEyOCAwIG9iago8PC9BIDQ0OCAwIFIvS1szOSA0NF0vTGFuZyhFTi1VUykvUCA0NDkgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMjkgMCBvYmoKPDwvQSA0NTAgMCBSL0tbNDAgNDVdL0xhbmcoRU4tVVMpL1AgNDUxIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTMwIDAgb2JqCjw8L0EgNDUyIDAgUi9LWzQxIDQ2XS9MYW5nKEVOLVVTKS9QIDQ1MyAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEzMSAwIG9iago8PC9LWzQyIDQ3XS9QIDQ1NCAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTMyIDAgb2JqCjw8L0EgNDU1IDAgUi9LWzQzIDQ4XS9MYW5nKEVOLVVTKS9QIDQ1NiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEzMyAwIG9iago8PC9BIDQ1NyAwIFIvS1s0NCA0OV0vTGFuZyhFTi1VUykvUCA0NTggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMzQgMCBvYmoKPDwvQSA0NTkgMCBSL0tbNDUgNTBdL0xhbmcoRU4tVVMpL1AgNDYwIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTM1IDAgb2JqCjw8L0tbNDYgNTFdL1AgNDYxIDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxMzYgMCBvYmoKPDwvQSA0NjIgMCBSL0tbNDcgNTJdL0xhbmcoRU4tVVMpL1AgNDYzIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTM3IDAgb2JqCjw8L0EgNDY0IDAgUi9LWzQ4IDUzXS9MYW5nKEVOLVVTKS9QIDQ2NSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjEzOCAwIG9iago8PC9BIDQ2NiAwIFIvS1s0OSA1NF0vTGFuZyhFTi1VUykvUCA0NjcgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxMzkgMCBvYmoKPDwvQSA0NjggMCBSL0tbNTAgNTVdL0xhbmcoRU4tVVMpL1AgNDY5IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTQwIDAgb2JqCjw8L0tbNTEgNTZdL1AgNDcwIDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxNDEgMCBvYmoKPDwvQSA0NzEgMCBSL0tbNTIgNTddL0xhbmcoRU4tVVMpL1AgNDcyIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTQyIDAgb2JqCjw8L0EgNDczIDAgUi9LWzUzIDU4XS9MYW5nKEVOLVVTKS9QIDQ3NCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE0MyAwIG9iago8PC9BIDQ3NSAwIFIvS1s1NCA1OV0vTGFuZyhFTi1VUykvUCA0NzYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNDQgMCBvYmoKPDwvQSA0NzcgMCBSL0tbNTUgNjBdL0xhbmcoRU4tVVMpL1AgNDc4IDAgUi9QZyA2OCAwIFIvUy9IZWFkaW5nIzIwMj4+CmVuZG9iagoxNDUgMCBvYmoKPDwvS1s1NiA2MV0vUCA0NzkgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjE0NiAwIG9iago8PC9BIDQ4MCAwIFIvS1s1NyA2Ml0vTGFuZyhFTi1VUykvUCA0ODEgMCBSL1BnIDY4IDAgUi9TL0NlbnRlcmVkPj4KZW5kb2JqCjE0NyAwIG9iago8PC9BIDQ4MiAwIFIvS1s1OCA2M10vTGFuZyhFTi1VUykvUCA0ODMgMCBSL1BnIDY4IDAgUi9TL0NlbnRlcmVkPj4KZW5kb2JqCjE0OCAwIG9iago8PC9LWzU5IDY0XS9QIDQ4NCAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTQ5IDAgb2JqCjw8L0EgNDg1IDAgUi9LWzYwIDY1XS9MYW5nKEVOLVVTKS9QIDQ4NiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE1MCAwIG9iago8PC9BIDQ4NyAwIFIvS1s2MSA2Nl0vTGFuZyhFTi1VUykvUCA0ODYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNTEgMCBvYmoKPDwvS1s2MiA2N10vUCA0ODggMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjE1MiAwIG9iago8PC9BIDQ4OSAwIFIvS1s2MyA2OF0vUCA0OTAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNTMgMCBvYmoKPDwvQSA0OTEgMCBSL0tbNjQgNjldL0xhbmcoRU4tVVMpL1AgNDkwIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTU0IDAgb2JqCjw8L0tbNjUgNzBdL1AgNDkyIDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxNTUgMCBvYmoKPDwvQSA0OTMgMCBSL0tbNjYgNzFdL0xhbmcoRU4tVVMpL1AgNDk0IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTU2IDAgb2JqCjw8L0EgNDk1IDAgUi9LWzY3IDcyXS9MYW5nKEVOLVVTKS9QIDQ5NCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE1NyAwIG9iago8PC9BIDQ5NiAwIFIvS1s2OCA3M10vTGFuZyhFTi1VUykvUCA0OTQgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNTggMCBvYmoKPDwvQSA0OTcgMCBSL0tbNjkgNzRdL0xhbmcoRU4tVVMpL1AgNDk4IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTU5IDAgb2JqCjw8L0EgNDk5IDAgUi9LWzcwIDc1XS9MYW5nKEVOLVVTKS9QIDQ5OCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE2MCAwIG9iago8PC9BIDUwMCAwIFIvS1s3MSA3Nl0vTGFuZyhFTi1VUykvUCA0OTggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNjEgMCBvYmoKPDwvS1s3MiA3N10vUCA1MDEgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjE2MiAwIG9iago8PC9BIDUwMiAwIFIvS1s3MyA3OF0vTGFuZyhFTi1VUykvUCA1MDMgMCBSL1BnIDY4IDAgUi9TL0hlYWRpbmcjMjAyPj4KZW5kb2JqCjE2MyAwIG9iago8PC9BIDUwNCAwIFIvS1s3NCA3OV0vTGFuZyhFTi1VUykvUCA1MDMgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNjQgMCBvYmoKPDwvQSA1MDUgMCBSL0tbNzUgODBdL0xhbmcoRU4tVVMpL1AgNTAzIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTY1IDAgb2JqCjw8L0EgNTA2IDAgUi9LWzc2IDgxXS9MYW5nKEVOLVVTKS9QIDUwNyAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE2NiAwIG9iago8PC9BIDUwOCAwIFIvS1s3NyA4Ml0vTGFuZyhFTi1VUykvUCA1MDcgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNjcgMCBvYmoKPDwvQSA1MDkgMCBSL0tbNzggODNdL0xhbmcoRU4tVVMpL1AgNTA3IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTY4IDAgb2JqCjw8L0EgNTEwIDAgUi9LWzc5IDg0XS9MYW5nKEVOLVVTKS9QIDUxMSAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE2OSAwIG9iago8PC9BIDUxMiAwIFIvS1s4MCA4NV0vTGFuZyhFTi1VUykvUCA1MTEgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNzAgMCBvYmoKPDwvQSA1MTMgMCBSL0tbODEgODZdL0xhbmcoRU4tVVMpL1AgNTExIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTcxIDAgb2JqCjw8L0tbODIgODddL1AgNTE0IDAgUi9QZyA2OCAwIFIvUy9BcnRpZmFjdD4+CmVuZG9iagoxNzIgMCBvYmoKPDwvQSA1MTUgMCBSL0tbODMgODhdL0xhbmcoRU4tVVMpL1AgNTE2IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTczIDAgb2JqCjw8L0EgNTE3IDAgUi9LWzg0IDg5XS9MYW5nKEVOLVVTKS9QIDUxNiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE3NCAwIG9iago8PC9LWzg1IDkwXS9QIDUxOCAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTc1IDAgb2JqCjw8L0EgNTE5IDAgUi9LWzg2IDkxXS9QIDUyMCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE3NiAwIG9iago8PC9BIDUyMSAwIFIvS1s4NyA5Ml0vTGFuZyhFTi1VUykvUCA1MjAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNzcgMCBvYmoKPDwvS1s4OCA5M10vUCA1MjIgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjE3OCAwIG9iago8PC9BIDUyMyAwIFIvS1s4OSA5NF0vTGFuZyhFTi1VUykvUCA1MjQgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxNzkgMCBvYmoKPDwvQSA1MjUgMCBSL0tbOTAgOTVdL0xhbmcoRU4tVVMpL1AgNTI0IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTgwIDAgb2JqCjw8L0EgNTI2IDAgUi9LWzkxIDk2XS9MYW5nKEVOLVVTKS9QIDUyNCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE4MSAwIG9iago8PC9BIDUyNyAwIFIvS1s5MiA5N10vTGFuZyhFTi1VUykvUCA1MjggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxODIgMCBvYmoKPDwvQSA1MjkgMCBSL0tbOTMgOThdL0xhbmcoRU4tVVMpL1AgNTI4IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTgzIDAgb2JqCjw8L0EgNTMwIDAgUi9LWzk0IDk5XS9MYW5nKEVOLVVTKS9QIDUyOCAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE4NCAwIG9iago8PC9BIDUzMSAwIFIvS1s5NSAxMDBdL0xhbmcoRU4tVVMpL1AgNTMyIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTg1IDAgb2JqCjw8L0EgNTMzIDAgUi9LWzk2IDEwMV0vTGFuZyhFTi1VUykvUCA1MzIgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxODYgMCBvYmoKPDwvQSA1MzQgMCBSL0tbOTcgMTAyXS9MYW5nKEVOLVVTKS9QIDUzMiAwIFIvUGcgNjggMCBSL1MvTm9ybWFsPj4KZW5kb2JqCjE4NyAwIG9iago8PC9BIDUzNSAwIFIvS1s5OCAxMDNdL0xhbmcoRU4tVVMpL1AgNTM2IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTg4IDAgb2JqCjw8L0EgNTM3IDAgUi9LWzk5IDEwNF0vTGFuZyhFTi1VUykvUCA1MzYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxODkgMCBvYmoKPDwvQSA1MzggMCBSL0tbMTAwIDEwNV0vTGFuZyhFTi1VUykvUCA1MzYgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxOTAgMCBvYmoKPDwvQSA1MzkgMCBSL0tbMTAxIDEwNl0vTGFuZyhFTi1VUykvUCA1NDAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxOTEgMCBvYmoKPDwvQSA1NDEgMCBSL0tbMTAyIDEwN10vTGFuZyhFTi1VUykvUCA1NDAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxOTIgMCBvYmoKPDwvQSA1NDIgMCBSL0tbMTAzIDEwOF0vTGFuZyhFTi1VUykvUCA1NDAgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoxOTMgMCBvYmoKPDwvS1sxMDQgMTA5XS9QIDU0MyAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMTk0IDAgb2JqCjw8L0EgNTQ0IDAgUi9LWzEwNSAxMTBdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk1IDAgb2JqCjw8L0EgNTQ2IDAgUi9LWzEwNiAxMTFdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk2IDAgb2JqCjw8L0EgNTQ3IDAgUi9LWzEwNyAxMTJdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk3IDAgb2JqCjw8L0EgNTQ4IDAgUi9LWzEwOCAxMTNdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk4IDAgb2JqCjw8L0EgNTQ5IDAgUi9LWzEwOSAxMTRdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMTk5IDAgb2JqCjw8L0EgNTUwIDAgUi9LWzExMCAxMTVdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjAwIDAgb2JqCjw8L0EgNTUxIDAgUi9LWzExMSAxMTZdL0xhbmcoRU4tVVMpL1AgNTQ1IDAgUi9QZyA2OCAwIFIvUy9IZWFkaW5nIzIwMj4+CmVuZG9iagoyMDEgMCBvYmoKPDwvQSA1NTIgMCBSL0tbMTEyIDExN10vTGFuZyhFTi1VUykvUCA1NDUgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMDIgMCBvYmoKPDwvQSA1NTMgMCBSL0tbMTEzIDExOF0vTGFuZyhFTi1VUykvUCA1NDUgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMDMgMCBvYmoKPDwvQSA1NTQgMCBSL0tbMTE0IDExOV0vTGFuZyhFTi1VUykvUCA1NDUgMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iagoyMDQgMCBvYmoKPDwvS1sxMTUgMTIwXS9QIDU1NSAwIFIvUGcgNjggMCBSL1MvQXJ0aWZhY3Q+PgplbmRvYmoKMjA1IDAgb2JqCjw8L0EgNTU2IDAgUi9LWzExNiAxMjFdL0xhbmcoRU4tVVMpL1AgNTU3IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjA2IDAgb2JqCjw8L0EgNTU4IDAgUi9LWzExNyAxMjJdL0xhbmcoRU4tVVMpL1AgNTU5IDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjA3IDAgb2JqCjw8L0EgNTYwIDAgUi9LWzExOCAxMjNdL0xhbmcoRU4tVVMpL1AgNTYxIDAgUi9QZyA2OCAwIFIvUy9Ob3JtYWw+PgplbmRvYmoKMjA4IDAgb2JqCjw8L0tbMTE5IDEyNF0vUCA1NjIgMCBSL1BnIDY4IDAgUi9TL0FydGlmYWN0Pj4KZW5kb2JqCjg1IDAgb2JqCjw8L0EgNTYzIDAgUi9LWzEyMCAxMjVdL0xhbmcoRU4tVVMpL1AgNzggMCBSL1BnIDY4IDAgUi9TL05vcm1hbD4+CmVuZG9iago4MyAwIG9iago8PC9BIDU2NCAwIFIvS1sxMjEgMTI2XS9QIDc4IDAgUi9QZyA2OCAwIFIvUy9GaWd1cmU+PgplbmRvYmoKNTY0IDAgb2JqCjw8L0JCb3hbMzIxLjEgNjgyLjM1NSA1NTEuNiA3MzIuMDAyXS9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2s+PgplbmRvYmoKNTYzIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTYyIDAgb2JqCjw8L0tbMjA4IDAgUiA1NTcgMCBSIDU1OSAwIFIgNTYxIDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago4NCAwIG9iago8PC9BIDU2NSAwIFIvS1szOTMgMCBSIDM5NyAwIFIgNDEyIDAgUiA0MTcgMCBSIDQzMCAwIFIgNDQ3IDAgUiA0NTQgMCBSIDQ2MSAwIFIgNDcwIDAgUiA0NzkgMCBSIDQ4NCAwIFIgNDg4IDAgUiA0OTIgMCBSIDUwMSAwIFIgNTE0IDAgUiA1MTggMCBSIDUyMiAwIFIgNTQzIDAgUiA1NTUgMCBSIDU2MiAwIFJdL1AgNzggMCBSL1MvVGFibGU+PgplbmRvYmoKNTY1IDAgb2JqCjw8L0JCb3hbMC4wIC0xNjM4NC4wIDU2NS43NCA2ODIuNjNdL08vTGF5b3V0L1BsYWNlbWVudC9CbG9jaz4+CmVuZG9iagozOTMgMCBvYmoKPDwvS1s5NiAwIFIgMzg4IDAgUiAzOTAgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjM5NyAwIG9iago8PC9LWzk5IDAgUiAzOTUgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjQxMiAwIG9iago8PC9LWzEwOCAwIFIgMzk5IDAgUiA0MDEgMCBSIDQwMyAwIFIgNDA1IDAgUiA0MDggMCBSIDQxMSAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNDE3IDAgb2JqCjw8L0tbMTExIDAgUiA0MTQgMCBSIDQxNiAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNDMwIDAgb2JqCjw8L0tbMTE4IDAgUiA0MTkgMCBSIDQyMSAwIFIgNDIzIDAgUiA0MjUgMCBSIDQyNyAwIFIgNDI5IDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago0NDcgMCBvYmoKPDwvS1sxMjcgMCBSIDQzMiAwIFIgNDM0IDAgUiA0MzYgMCBSIDQzOCAwIFIgNDQwIDAgUiA0NDIgMCBSIDQ0NCAwIFIgNDQ2IDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago0NTQgMCBvYmoKPDwvS1sxMzEgMCBSIDQ0OSAwIFIgNDUxIDAgUiA0NTMgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjQ2MSAwIG9iago8PC9LWzEzNSAwIFIgNDU2IDAgUiA0NTggMCBSIDQ2MCAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNDcwIDAgb2JqCjw8L0tbMTQwIDAgUiA0NjMgMCBSIDQ2NSAwIFIgNDY3IDAgUiA0NjkgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjQ3OSAwIG9iago8PC9LWzE0NSAwIFIgNDcyIDAgUiA0NzQgMCBSIDQ3NiAwIFIgNDc4IDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago0ODQgMCBvYmoKPDwvS1sxNDggMCBSIDQ4MSAwIFIgNDgzIDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago0ODggMCBvYmoKPDwvS1sxNTEgMCBSIDQ4NiAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNDkyIDAgb2JqCjw8L0tbMTU0IDAgUiA0OTAgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjUwMSAwIG9iago8PC9LWzE2MSAwIFIgNDk0IDAgUiA0OTggMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjUxNCAwIG9iago8PC9LWzE3MSAwIFIgNTAzIDAgUiA1MDcgMCBSIDUxMSAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNTE4IDAgb2JqCjw8L0tbMTc0IDAgUiA1MTYgMCBSXS9QIDg0IDAgUi9TL1RSPj4KZW5kb2JqCjUyMiAwIG9iago8PC9LWzE3NyAwIFIgNTIwIDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago1NDMgMCBvYmoKPDwvS1sxOTMgMCBSIDUyNCAwIFIgNTI4IDAgUiA1MzIgMCBSIDUzNiAwIFIgNTQwIDAgUl0vUCA4NCAwIFIvUy9UUj4+CmVuZG9iago1NTUgMCBvYmoKPDwvS1syMDQgMCBSIDU0NSAwIFJdL1AgODQgMCBSL1MvVFI+PgplbmRvYmoKNTQ1IDAgb2JqCjw8L0tbMTk0IDAgUiAxOTUgMCBSIDE5NiAwIFIgMTk3IDAgUiAxOTggMCBSIDE5OSAwIFIgMjAwIDAgUiAyMDEgMCBSIDIwMiAwIFIgMjAzIDAgUl0vUCA1NTUgMCBSL1MvVEQ+PgplbmRvYmoKNTI0IDAgb2JqCjw8L0tbMTc4IDAgUiAxNzkgMCBSIDE4MCAwIFJdL1AgNTQzIDAgUi9TL1REPj4KZW5kb2JqCjUyOCAwIG9iago8PC9LWzE4MSAwIFIgMTgyIDAgUiAxODMgMCBSXS9QIDU0MyAwIFIvUy9URD4+CmVuZG9iago1MzIgMCBvYmoKPDwvS1sxODQgMCBSIDE4NSAwIFIgMTg2IDAgUl0vUCA1NDMgMCBSL1MvVEQ+PgplbmRvYmoKNTM2IDAgb2JqCjw8L0tbMTg3IDAgUiAxODggMCBSIDE4OSAwIFJdL1AgNTQzIDAgUi9TL1REPj4KZW5kb2JqCjU0MCAwIG9iago8PC9LWzE5MCAwIFIgMTkxIDAgUiAxOTIgMCBSXS9QIDU0MyAwIFIvUy9URD4+CmVuZG9iago1MjAgMCBvYmoKPDwvS1sxNzUgMCBSIDE3NiAwIFJdL1AgNTIyIDAgUi9TL1REPj4KZW5kb2JqCjUxNiAwIG9iago8PC9LWzE3MiAwIFIgMTczIDAgUl0vUCA1MTggMCBSL1MvVEQ+PgplbmRvYmoKNTAzIDAgb2JqCjw8L0tbMTYyIDAgUiAxNjMgMCBSIDE2NCAwIFJdL1AgNTE0IDAgUi9TL1REPj4KZW5kb2JqCjUwNyAwIG9iago8PC9LWzE2NSAwIFIgMTY2IDAgUiAxNjcgMCBSXS9QIDUxNCAwIFIvUy9URD4+CmVuZG9iago1MTEgMCBvYmoKPDwvS1sxNjggMCBSIDE2OSAwIFIgMTcwIDAgUl0vUCA1MTQgMCBSL1MvVEQ+PgplbmRvYmoKNDk0IDAgb2JqCjw8L0tbMTU1IDAgUiAxNTYgMCBSIDE1NyAwIFJdL1AgNTAxIDAgUi9TL1REPj4KZW5kb2JqCjQ5OCAwIG9iago8PC9LWzE1OCAwIFIgMTU5IDAgUiAxNjAgMCBSXS9QIDUwMSAwIFIvUy9URD4+CmVuZG9iago0OTAgMCBvYmoKPDwvS1sxNTIgMCBSIDE1MyAwIFJdL1AgNDkyIDAgUi9TL1REPj4KZW5kb2JqCjQ4NiAwIG9iago8PC9LWzE0OSAwIFIgMTUwIDAgUl0vUCA0ODggMCBSL1MvVEQ+PgplbmRvYmoKNDgxIDAgb2JqCjw8L0sgMTQ2IDAgUi9QIDQ4NCAwIFIvUy9URD4+CmVuZG9iago0ODMgMCBvYmoKPDwvSyAxNDcgMCBSL1AgNDg0IDAgUi9TL1REPj4KZW5kb2JqCjQ3MiAwIG9iago8PC9LIDE0MSAwIFIvUCA0NzkgMCBSL1MvVEQ+PgplbmRvYmoKNDc0IDAgb2JqCjw8L0sgMTQyIDAgUi9QIDQ3OSAwIFIvUy9URD4+CmVuZG9iago0NzYgMCBvYmoKPDwvSyAxNDMgMCBSL1AgNDc5IDAgUi9TL1REPj4KZW5kb2JqCjQ3OCAwIG9iago8PC9LIDE0NCAwIFIvUCA0NzkgMCBSL1MvVEQ+PgplbmRvYmoKNDYzIDAgb2JqCjw8L0sgMTM2IDAgUi9QIDQ3MCAwIFIvUy9URD4+CmVuZG9iago0NjUgMCBvYmoKPDwvSyAxMzcgMCBSL1AgNDcwIDAgUi9TL1REPj4KZW5kb2JqCjQ2NyAwIG9iago8PC9LIDEzOCAwIFIvUCA0NzAgMCBSL1MvVEQ+PgplbmRvYmoKNDY5IDAgb2JqCjw8L0sgMTM5IDAgUi9QIDQ3MCAwIFIvUy9URD4+CmVuZG9iago0NTYgMCBvYmoKPDwvSyAxMzIgMCBSL1AgNDYxIDAgUi9TL1REPj4KZW5kb2JqCjQ1OCAwIG9iago8PC9LIDEzMyAwIFIvUCA0NjEgMCBSL1MvVEQ+PgplbmRvYmoKNDYwIDAgb2JqCjw8L0sgMTM0IDAgUi9QIDQ2MSAwIFIvUy9URD4+CmVuZG9iago0NDkgMCBvYmoKPDwvSyAxMjggMCBSL1AgNDU0IDAgUi9TL1REPj4KZW5kb2JqCjQ1MSAwIG9iago8PC9LIDEyOSAwIFIvUCA0NTQgMCBSL1MvVEQ+PgplbmRvYmoKNDUzIDAgb2JqCjw8L0sgMTMwIDAgUi9QIDQ1NCAwIFIvUy9URD4+CmVuZG9iago0MzIgMCBvYmoKPDwvSyAxMTkgMCBSL1AgNDQ3IDAgUi9TL1REPj4KZW5kb2JqCjQzNCAwIG9iago8PC9LIDEyMCAwIFIvUCA0NDcgMCBSL1MvVEQ+PgplbmRvYmoKNDM2IDAgb2JqCjw8L0sgMTIxIDAgUi9QIDQ0NyAwIFIvUy9URD4+CmVuZG9iago0MzggMCBvYmoKPDwvSyAxMjIgMCBSL1AgNDQ3IDAgUi9TL1REPj4KZW5kb2JqCjQ0MCAwIG9iago8PC9LIDEyMyAwIFIvUCA0NDcgMCBSL1MvVEQ+PgplbmRvYmoKNDQyIDAgb2JqCjw8L0sgMTI0IDAgUi9QIDQ0NyAwIFIvUy9URD4+CmVuZG9iago0NDQgMCBvYmoKPDwvSyAxMjUgMCBSL1AgNDQ3IDAgUi9TL1REPj4KZW5kb2JqCjQ0NiAwIG9iago8PC9LIDEyNiAwIFIvUCA0NDcgMCBSL1MvVEQ+PgplbmRvYmoKNDE5IDAgb2JqCjw8L0sgMTEyIDAgUi9QIDQzMCAwIFIvUy9URD4+CmVuZG9iago0MjEgMCBvYmoKPDwvSyAxMTMgMCBSL1AgNDMwIDAgUi9TL1REPj4KZW5kb2JqCjQyMyAwIG9iago8PC9LIDExNCAwIFIvUCA0MzAgMCBSL1MvVEQ+PgplbmRvYmoKNDI1IDAgb2JqCjw8L0sgMTE1IDAgUi9QIDQzMCAwIFIvUy9URD4+CmVuZG9iago0MjcgMCBvYmoKPDwvSyAxMTYgMCBSL1AgNDMwIDAgUi9TL1REPj4KZW5kb2JqCjQyOSAwIG9iago8PC9LIDExNyAwIFIvUCA0MzAgMCBSL1MvVEQ+PgplbmRvYmoKNDE0IDAgb2JqCjw8L0sgMTA5IDAgUi9QIDQxNyAwIFIvUy9URD4+CmVuZG9iago0MTYgMCBvYmoKPDwvSyAxMTAgMCBSL1AgNDE3IDAgUi9TL1REPj4KZW5kb2JqCjM5OSAwIG9iago8PC9LIDEwMCAwIFIvUCA0MTIgMCBSL1MvVEQ+PgplbmRvYmoKNDAxIDAgb2JqCjw8L0sgMTAxIDAgUi9QIDQxMiAwIFIvUy9URD4+CmVuZG9iago0MDMgMCBvYmoKPDwvSyAxMDIgMCBSL1AgNDEyIDAgUi9TL1REPj4KZW5kb2JqCjQwNSAwIG9iago8PC9LWzEwMyAwIFIgMTA0IDAgUl0vUCA0MTIgMCBSL1MvVEQ+PgplbmRvYmoKNDA4IDAgb2JqCjw8L0tbMTA1IDAgUiAxMDYgMCBSXS9QIDQxMiAwIFIvUy9URD4+CmVuZG9iago0MTEgMCBvYmoKPDwvSyAxMDcgMCBSL1AgNDEyIDAgUi9TL1REPj4KZW5kb2JqCjM5NSAwIG9iago8PC9LWzk3IDAgUiA5OCAwIFJdL1AgMzk3IDAgUi9TL1REPj4KZW5kb2JqCjM4OCAwIG9iago8PC9LIDkyIDAgUi9QIDM5MyAwIFIvUy9URD4+CmVuZG9iagozOTAgMCBvYmoKPDwvS1s5MyAwIFIgOTQgMCBSIDk1IDAgUl0vUCAzOTMgMCBSL1MvVEQ+PgplbmRvYmoKNTU3IDAgb2JqCjw8L0sgMjA1IDAgUi9QIDU2MiAwIFIvUy9URD4+CmVuZG9iago1NTkgMCBvYmoKPDwvSyAyMDYgMCBSL1AgNTYyIDAgUi9TL1REPj4KZW5kb2JqCjU2MSAwIG9iago8PC9LIDIwNyAwIFIvUCA1NjIgMCBSL1MvVEQ+PgplbmRvYmoKNTYwIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTU4IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTU2IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTU0IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTUzIDAgb2JqCjw8L08vTGF5b3V0L1RleHRBbGlnbi9DZW50ZXIvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago1NTIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago1NTEgMCBvYmoKPDwvTy9MYXlvdXQvVGV4dEFsaWduL0NlbnRlci9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU1MCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0OSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0OCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0NyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0NiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0NCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0MiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjU0MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzOSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzOCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzNyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzNSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzNCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzMyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzMSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUzMCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyOSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyNyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyNiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyNSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyMyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUyMSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxOSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxNyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxNSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxMyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxMiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUxMCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwOSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwOCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwNiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwNSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwNCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjUwMiAwIG9iago8PC9PL0xheW91dC9UZXh0QWxpZ24vQ2VudGVyL1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNTAwIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDk5IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDk3IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDk2IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDk1IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDkzIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDkxIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDg5IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDg3IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDg1IDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDgyIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDgwIDAgb2JqCjw8L08vTGF5b3V0L1dyaXRpbmdNb2RlL0xyVGI+PgplbmRvYmoKNDc3IDAgb2JqCjw8L08vTGF5b3V0L1RleHRBbGlnbi9DZW50ZXIvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NzUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NzMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NzEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NjggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NjYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NjQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NjIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NTAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NDggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NDUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NDMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0NDEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MzEgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MjAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MTggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MTUgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MTMgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MTAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDkgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDcgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDQgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDIgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iago0MDAgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozOTggMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozOTYgMCBvYmoKPDwvTy9MYXlvdXQvV3JpdGluZ01vZGUvTHJUYj4+CmVuZG9iagozOTQgMCBvYmoKPDwvTy9MYXlvdXQvVGV4dEFsaWduL0NlbnRlci9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM5MiAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM5MSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM4OSAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM4NyAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjM4NiAwIG9iago8PC9LIDkxIDAgUi9QIDU2NiAwIFIvUy9USD4+CmVuZG9iago1NjYgMCBvYmoKPDwvS1szODUgMCBSIDM4NiAwIFJdL1AgODIgMCBSL1MvVFI+PgplbmRvYmoKODIgMCBvYmoKPDwvQSA1NjcgMCBSL0sgNTY2IDAgUi9QIDc4IDAgUi9TL1RhYmxlPj4KZW5kb2JqCjU2NyAwIG9iago8PC9CQm94WzQ2Ljg1MjYgNjc5LjM4IDU2OC4wMiA3MjAuOTk5XS9PL0xheW91dC9QbGFjZW1lbnQvQmxvY2s+PgplbmRvYmoKMzg1IDAgb2JqCjw8L0sgOTAgMCBSL1AgNTY2IDAgUi9TL1RIPj4KZW5kb2JqCjM4NCAwIG9iago8PC9PL0xheW91dC9Xcml0aW5nTW9kZS9MclRiPj4KZW5kb2JqCjQxIDAgb2JqCjw8L0NvdW50IDIvS2lkc1s2OCAwIFIgMzggMCBSXS9UeXBlL1BhZ2VzPj4KZW5kb2JqCjU2OCAwIG9iago8PC9BY3JvRm9ybSA1NjkgMCBSL01hcmtJbmZvPDwvTWFya2VkIHRydWU+Pi9NZXRhZGF0YSAzNyAwIFIvT3V0bGluZXMgNjAgMCBSL1BhZ2VMYXlvdXQvT25lQ29sdW1uL1BhZ2VzIDQxIDAgUi9TdHJ1Y3RUcmVlUm9vdCA3NiAwIFIvVHlwZS9DYXRhbG9nPj4KZW5kb2JqCjY4IDAgb2JqCjw8L0Fubm90cyA1NzAgMCBSL0NvbnRlbnRzWzU3MSAwIFIgNTcyIDAgUiA1NzMgMCBSIDU3NCAw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ZiAwIGcgKS9EUjw8L0VuY29kaW5nPDwvUERGRG9jRW5jb2RpbmcgNzQgMCBSPj4vRm9udDw8L0Vkd2FyZGlhblNjcmlwdElUQyA3MiAwIFIvSGVsdiAyIDAgUi9aYURiIDc1IDAgUj4+Pj4vRmllbGRzWzUwIDAgUiA2MDMgMCBSIDYwNCAwIFIgNjA1IDAgUiA2MDYgMCBSIDYwNyAwIFIgNjA4IDAgUiA2MDkgMCBSIDYxMCAwIFIgNjExIDAgUiA1OSAwIFIgNjEyIDAgUiA2MTMgMCBSIDYxNCAwIFIgNjE1IDAgUiA2MTYgMCBSIDYxNyAwIFIgNjE4IDAgUiA2MTkgMCBSIDYyMCAwIFIgNjIxIDAgUiA2MjIgMCBSIDYyMyAwIFIgNjI0IDAgUiA2MjUgMCBSIDYyNiAwIFIgNjI3IDAgUiA1OCAwIFIgNjI4IDAgUiA2MjkgMCBSIDYzMCAwIFIgNjMxIDAgUiA2MzIgMCBSIDYzMyAwIFIgNjM0IDAgUiA1MiAwIFJdPj4KZW5kb2JqCjU3MCAwIG9iagpbNzAgMCBSIDYxMiAwIFIgNjA3IDAgUiA2MDggMCBSIDYwOSAwIFIgNjExIDAgUiA2MjkgMCBSIDYzMiAwIFIgNjM0IDAgUiA2MTcgMCBSIDYzMCAwIFIgNjE4IDAgUiA2MDMgMCBSIDYwNCAwIFIgNjA1IDAgUiA2MDYgMCBSIDcxIDAgUiA2MTMgMCBSIDYxNCAwIFIgNjE1IDAgUiA2MTYgMCBSIDYxOSAwIFIgNjIwIDAgUiA2MjEgMCBSIDYyMyAwIFIgNjIyIDAgUiA2MjQgMCBSIDYyNiAwIFIgNjI4IDAgUiA2MjUgMCBSIDYxMCAwIFIgNjI3IDAgUiA2MzEgMCBSIDYzMyAwIFJdCmVuZG9iago3MCAwIG9iago8PC9GIDQvTUs8PD4+L1AgNjggMCBSL1BhcmVudCA1OSAwIFIvUmVjdFs4MS4yMzY3IDY1NS43MSAzNDMuOTE2IDY2OS4wMTZdL1N1YnR5cGUvV2lkZ2V0L1R5cGUvQW5ub3QvQVA8PC9OIDEgMCBSPj4+PgplbmRvYmoKNjEyIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzM3My4wOTQgNjgxLjgzNSA1NTEuMzk4IDY2Ny45MTVdL1N1YnR5cGUvV2lkZ2V0L1QoUENQTmFtZSkvVFUoUENQOikvVHlwZS9Bbm5vdC9WKFRlc3QyIFBoeXNpY2lhbikvQVA8PC9OIDUgMCBSPj4+PgplbmRvYmoKNjA3IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzE1OC41NjEgNTY1LjMxOCAyNzIuNjgxIDU3OS4xNDhdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudFByZWZlcnJlZExhbmd1YWdlKS9UVShQcmVmZXJyZWQgTGFuZ3VhZ2UpL1R5cGUvQW5ub3QvVihQYXNodG8pL0FQPDwvTiAxMCAwIFI+Pj4+CmVuZG9iago2MDggMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbNTUuNjc0MSA1NjUuMzE4IDEyMS42NzQgNTc5LjE0OF0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50QmlydGhEYXRlKS9UVShCaXJ0aCBkYXRlOikvVHlwZS9Bbm5vdC9WKDQgLSBPY3QgLSAyMDE3KS9BUDw8L04gMTEgMCBSPj4+PgplbmRvYmoKNjA5IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzEyNS41NTggNTY1LjMxOCAxNTQuNjc0IDU3OS4xNDhdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudEFnZSkvVFUoQWdlOikvVHlwZS9Bbm5vdC9WKDApL0FQPDwvTiAxMiAwIFI+Pj4+CmVuZG9iago2MTEgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbNTUuMTMxMiA1NDYuNTgxIDMwMC4xNzEgNTMyLjc1MV0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50U3RyZWV0QWRkcmVzcykvVFUoU3RyZWV0IGFkZHJlc3M6KS9UeXBlL0Fubm90L1YoMTIzIEVyZWh3b24gU3QuKS9BUDw8L04gMTQgMCBSPj4+PgplbmRvYmoKNjI5IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzI3Ni45MDkgNTY1LjMxOCA0MjYuNTYgNTc5LjE0OF0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50SGVhbHRoSW5zdXJhbmNlTm8pL1RVKEhlYWx0aCBJbnN1cmFuY2UgTm8uOikvVHlwZS9Bbm5vdC9WKDIzNDIzNDIzMjMpL0FQPDwvTiAxNSAwIFI+Pj4+CmVuZG9iago2MzIgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbMzAyLjA1MSA1MzIuNzUxIDQyNC40NTEgNTQ2LjU4MV0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50UGhvbmVOdW1iZXIpL1RVKEhvbWUgcGhvbmUgbm8uOikvVHlwZS9Bbm5vdC9WKDU1NTU1NTgzMTApL0FQPDwvTiAxNyAwIFI+Pj4+CmVuZG9iago2MzQgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbNTUuMTMxMiA1MTQuNDAzIDE4Mi42OTEgNTAwLjU3M10vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50QXB0U3VpdGUpL1RVKEFwYXJ0bWVudC9TdWl0ZSkvVHlwZS9Bbm5vdD4+CmVuZG9iago2MTcgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbMTg0LjI4NCA1MTQuNDAzIDM2MC4wODQgNTAwLjU3M10vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50Q2l0eSkvVFUoQ2l0eTopL1R5cGUvQW5ub3QvVihLaW5nc3RvbikvQVA8PC9OIDE4IDAgUj4+Pj4KZW5kb2JqCjYzMCAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFszNjIuNDUxIDUxNC40MDMgNDg3LjUwMiA1MDAuNTczXS9TdWJ0eXBlL1dpZGdldC9UKFBhdGllbnRQcm92aW5jZSkvVFUoUHJvdmluY2U6KS9UeXBlL0Fubm90L1YoT250YXJpbykvQVA8PC9OIDE5IDAgUj4+Pj4KZW5kb2JqCjYxOCAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFs0OTAuNDY5IDUwMC41NzMgNTU2LjE2NCA1MTQuNDAzXS9TdWJ0eXBlL1dpZGdldC9UKFBhdGllbnRQb3N0YWxDb2RlKS9UVShQb3N0YWwgQ29kZTopL1R5cGUvQW5ub3QvVihBMUEgMUExKS9BUDw8L04gMjAgMCBSPj4+PgplbmRvYmoKNjAzIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzM3My4yOCA2NDQuMjU5IDU1MS44NzEgNjY2LjI1OV0vU3VidHlwZS9XaWRnZXQvVChQQ1BBZGRyZXNzKS9UeXBlL0Fubm90L1YoMTQ3MyBKb2huIENvdW50ZXIgQmx2ZCkvQVA8PC9OIDYgMCBSPj4+PgplbmRvYmoKNjA0IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzU2LjYxOTYgNjEyLjU4OCAyMDkuNzYxIDU5OC43NThdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudExhc3ROYW1lKS9UeXBlL0Fubm90L1YoUGF0aWVudCkvQVA8PC9OIDcgMCBSPj4+PgplbmRvYmoKNjA1IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzIxMi4yMTkgNjEyLjU4OCAzMTMuMTg5IDU5OC43NThdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudEZpcnN0TmFtZSkvVHlwZS9Bbm5vdC9WKFRlc3QpL0FQPDwvTiA4IDAgUj4+Pj4KZW5kb2JqCjYwNiAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFszMTUuMDYzIDYxMi41ODggNDQzLjY4NSA1OTguNzU4XS9TdWJ0eXBlL1dpZGdldC9UKFBhdGllbnRPdGhlck5hbWVzKS9UeXBlL0Fubm90Pj4KZW5kb2JqCjcxIDAgb2JqCjw8L0YgNC9NSzw8Pj4vUCA2OCAwIFIvUGFyZW50IDU4IDAgUi9SZWN0WzU0LjgzNDYgNDEwLjcyMSAzMDQuNTU1IDQyNC45NDZdL1N1YnR5cGUvV2lkZ2V0L1R5cGUvQW5ub3QvQVA8PC9OIDIxIDAgUj4+Pj4KZW5kb2JqCjYxMyAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFszMDYuODM1IDQxMC43MjEgNTU2Ljc5NSA0MjQuOTQ2XS9TdWJ0eXBlL1dpZGdldC9UKEVuY291bnRlcmluZ1BoeXNpY2lhbkNQU09JZCkvVFUoQ1BTTyBOby4pL1R5cGUvQW5ub3QvVig1NDEzNCkvQVA8PC9OIDIzIDAgUj4+Pj4KZW5kb2JqCjYxNCAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM5MjcwNC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFs1NS43MTgyIDM1Mi4xNjEgMjIwLjk1OSAzODkuOTA3XS9TdWJ0eXBlL1dpZGdldC9UKEVuY291bnRlcmluZ1BoeXNpY2lhblByaW1hcnlQcmFjdGljZU5hbWUpL1RVKFByaW1hcnkgUHJhY3RpY2UgTmFtZTopL1R5cGUvQW5ub3Q+PgplbmRvYmoKNjE1IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzIyMy4xOTUgMzUyLjE2MSAzODguNDM1IDM4OS45MDddL1N1YnR5cGUvV2lkZ2V0L1QoRW5jb3VudGVyaW5nUGh5c2ljaWFuUHJpbWFyeVByYWN0aWNlQWRkcmVzcykvVFUoUHJhY3RpY2UgYWRkcmVzczopL1R5cGUvQW5ub3QvVigxNDczIEpvaG4gQ291bnRlciBCbHZkKS9BUDw8L04gMjQgMCBSPj4+PgplbmRvYmoKNjE2IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzM5MS4zMTUgMzUyLjE2MSA1NTYuNDM1IDM4OS45MDddL1N1YnR5cGUvV2lkZ2V0L1QoRW5jb3VudGVyaW5nUGh5c2ljaWFuUHJpbWFyeVByYWN0aWNlUGhvbmVOdW1iZXIpL1RVKFByYWN0aWNlIHBob25lIG5vLjopL1R5cGUvQW5ub3QvVihcKDYxM1wpIDUzMS0zMDA4KS9BUDw8L04gMjUgMCBSPj4+PgplbmRvYmoKNjE5IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA0MDk2L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzU1LjE5NDYgMjU4LjIxMSAxNTMuMjM1IDI5NC42MDRdL1N1YnR5cGUvV2lkZ2V0L1QoZVZpc2l0SW5pdGlhdGVkQnkpL1RVKGVWaXNpdCBJbml0aWF0ZWQgQnk6KS9UeXBlL0Fubm90L1YoUGF0aWVudCkvQVA8PC9OIDI2IDAgUj4+Pj4KZW5kb2JqCjYyMCAwIG9iago8PC9GIDQvRlQvVHgvRmYgNDA5Ni9NSzw8Pj4vUCA2OCAwIFIvUmVjdFsxNTUuOTk1IDI1OC4yMTEgMjU0LjAzNSAyOTQuNjA0XS9TdWJ0eXBlL1dpZGdldC9UKGVWaXNpdEluaXRpYXRlZERhdGUpL1RVKGVWaXNpdCBJbml0aWF0ZWQgRGF0ZTopL1R5cGUvQW5ub3QvVihOb3YgMjAsIDIwMTcgMTogMzcgUE0gVVRDKS9BUDw8L04gMjcgMCBSPj4+PgplbmRvYmoKNjIxIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA0MDk2L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzI1Ni45MTUgMjU4LjIxMSAzNTQuODM1IDI5NC42MDRdL1N1YnR5cGUvV2lkZ2V0L1QoZVZpc2l0Q2xvc2VEYXRlKS9UVShlVmlzaXQgQ2xvc2UgRGF0ZTopL1R5cGUvQW5ub3QvVihOb3YgMjAsIDIwMTcgMTozNyBQTSBVVEMpL0FQPDwvTiAyOCAwIFI+Pj4+CmVuZG9iago2MjMgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDQwOTYvTUs8PD4+L1AgNjggMCBSL1JlY3RbMzU3LjcxNSAyNTguMjExIDQ2My41NTUgMjk0LjYwNF0vU3VidHlwZS9XaWRnZXQvVChlVmlzaXRDb21tdW5pY2F0aW9uTWV0aG9kcykvVFUoZVZpc2l0IFR5cGVcKHNcKTopL1R5cGUvQW5ub3QvVihWaWRlbyBDYWxsKS9BUDw8L04gMjkgMCBSPj4+PgplbmRvYmoKNjIyIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA0MDk2L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzQ2Ni40MzUgMjU4LjIxMSA1NTYuNDM1IDI5NC42MDRdL1N1YnR5cGUvV2lkZ2V0L1QoVHJpYWdlUHJpb3JpdHkpL1RVKFRyaWFnZSBQcmlvcml0eTopL1R5cGUvQW5ub3Q+PgplbmRvYmoKNjI0IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzU0Ljk1NDYgMTY1LjM2OSA1NTYuNjc1IDI0NS45Nl0vU3VidHlwZS9XaWRnZXQvVChSZWFzb25Gb3JWaXNpdE5vdGVzKS9UVShQcmVzZW50aW5nIENvbXBsYWludCBcKGVudGVyZWQgYnkgcGF0aWVudFwpKS9UeXBlL0Fubm90L1YoVGVzdGluZyAtIFBsZWFzZSBJZ25vcmUpL0FQPDwvTiAzMCAwIFI+Pj4+CmVuZG9iago2MjYgMCBvYmoKPDwvREEoL0hlbHYgMTIgVGYgMCBnKS9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFs1NC44MzQ2IDEzMC44ODQgMjIwLjc5NSAxNTMuMzY4XS9TdWJ0eXBlL1dpZGdldC9UKFR5cGVPZlJlcXVlc3QpL1RVKFR5cGUgb2YgUmVxdWVzdDopL1R5cGUvQW5ub3QvVihJbW1lZGlhdGUgaGVhbHRoIGNvbmNlcm4pL0FQPDwvTiAzMSAwIFI+Pj4+CmVuZG9iago2MjggMCBvYmoKPDwvREEoL0hlbHYgMTIgVGYgMCBnKS9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFsyMjIuODM1IDEzMC44ODQgMzg4Ljc5NSAxNTMuMzY4XS9TdWJ0eXBlL1dpZGdldC9UKGVWaXNpdFJlcXVlc3RlZFBoeXNpY2lhbikvVFUoUmVxdWVzdCBQaHlzaWNpYW46KS9UeXBlL0Fubm90L1YoVGVzdDIgUGh5c2ljaWFuKS9BUDw8L04gMzIgMCBSPj4+PgplbmRvYmoKNjI1IDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4MzkyNzA0L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzM5MC45NTUgMTMwLjg4NCA1NTYuNzk1IDE1My4zNjhdL1N1YnR5cGUvV2lkZ2V0L1QoZVZpc2l0Q2F0ZWdvcmllcykvVFUoQ2F0ZWdvcmllczopL1R5cGUvQW5ub3QvVihJbmp1cnkpL0FQPDwvTiAzMyAwIFI+Pj4+CmVuZG9iago2MTAgMCBvYmoKPDwvRiA0L0ZUL1R4L0ZmIDgzODg2MDgvTUs8PD4+L1AgNjggMCBSL1JlY3RbNTA0Ljg2OCA2MTIuNTg4IDU1NS40MjMgNTk4Ljc1OF0vU3VidHlwZS9XaWRnZXQvVChQYXRpZW50U2V4KS9UVShBZ2U6KS9UeXBlL0Fubm90L1YoTWFsZSkvQVA8PC9OIDEzIDAgUj4+Pj4KZW5kb2JqCjYyNyAwIG9iago8PC9GIDQvRlQvVHgvRmYgODM4ODYwOC9NSzw8Pj4vUCA2OCAwIFIvUmVjdFs0NDQuODk1IDYxMi41ODggNTAwLjM3NCA1OTguNzU4XS9TdWJ0eXBlL1dpZGdldC9UKFBhdGllbnRQcmVmaXgpL1R5cGUvQW5ub3Q+PgplbmRvYmoKNjMxIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzQzMS4wNDcgNTY1LjMxOCA1NTYuMDk4IDU3OS4xNDhdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudEhlYWx0aEluc3VyYW5jZVByb3ZpbmNlKS9UVShQcm92aW5jZTopL1R5cGUvQW5ub3QvVihPbnRhcmlvKS9BUDw8L04gMTYgMCBSPj4+PgplbmRvYmoKNjMzIDAgb2JqCjw8L0YgNC9GVC9UeC9GZiA4Mzg4NjA4L01LPDw+Pi9QIDY4IDAgUi9SZWN0WzQyNy44NzUgNTMyLjY5MyA1NTYuNTU4IDU0Ni41MjNdL1N1YnR5cGUvV2lkZ2V0L1QoUGF0aWVudEVtYWlsQWRkcmVzcykvVFUoRW1haWwgQWRkcmVzczopL1R5cGUvQW5ub3QvVihncmFoYW1zdGF2ZWxleWJlcnJ5KzQwMEBnbWFpbC5jb20pL0FQPDwvTiA5IDAgUj4+Pj4KZW5kb2JqCjQyIDAgb2JqClsvSUNDQmFzZWQgNTg5IDAgUl0KZW5kb2JqCjYzNSAwIG9iagpbL0lDQ0Jhc2VkIDU5MiAwIFJdCmVuZG9iago1ODAgMCBvYmoKWy9JbmRleGVkIDYzNSAwIFIgMjM3IDU5MyAwIFJdCmVuZG9iago1ODEgMCBvYmoKPDwvQUlTIGZhbHNlL0JNL05vcm1hbC9DQSAxLjAvT1AgZmFsc2UvT1BNIDEvU0EgdHJ1ZS9TTWFzay9Ob25lL1R5cGUvRXh0R1N0YXRlL2NhIDEuMC9vcCBmYWxzZT4+CmVuZG9iago2MzYgMCBvYmoKPDwvT3JkZXJpbmcoSWRlbnRpdHkpL1JlZ2lzdHJ5KEFkb2JlKS9TdXBwbGVtZW50IDA+PgplbmRvYmoKNjM3IDAgb2JqCjw8L0FzY2VudCAxMDQwL0NJRFNldCA1OTQgMCBSL0NhcEhlaWdodCA3MTYvRGVzY2VudCAtMzI1L0ZsYWdzIDQvRm9udEJCb3hbLTY2NSAtMzI1IDIwMDAgMTA0MF0vRm9udEZhbWlseShBcmlhbCkvRm9udEZpbGUyIDU5NSAwIFIvRm9udE5hbWUvR0hNUEVMK0FyaWFsL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDQwMC9JdGFsaWNBbmdsZSAwL1N0ZW1WIDg4L1R5cGUvRm9udERlc2NyaXB0b3IvWEhlaWdodCA1MTk+PgplbmRvYmoKNjM4IDAgb2JqCjw8L0Jhc2VGb250L0dITVBFTCtBcmlhbC9DSURTeXN0ZW1JbmZvIDYzNiAwIFIvQ0lEVG9HSURNYXAvSWRlbnRpdHkvRFcgMTAwMC9Gb250RGVzY3JpcHRvciA2MzcgMCBSL1N1YnR5cGUvQ0lERm9udFR5cGUyL1R5cGUvRm9udC9XWzBbNzUwIDAgMjc4IDI3OCAyNzggMzU1IDU1NiA1NTYgODg5IDY2NyAxOTEgMzMzIDMzMyAzODkgNTg0IDI3OCAzMzMgMjc4IDI3OCA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgMjc4IDI3OCA1ODQgNTg0IDU4NCA1NTYgMTAxNSA2NjcgNjY3IDcyMiA3MjIgNjY3IDYxMSA3NzggNzIyIDI3OCA1MDAgNjY3IDU1NiA4MzMgNzIyIDc3OCA2NjcgNzc4IDcyMiA2NjcgNjExIDcyMiA2NjcgOTQ0IDY2NyA2NjcgNjExIDI3OCAyNzggMjc4IDQ2OSA1NTYgMzMzIDU1NiA1NTYgNTAwIDU1NiA1NTYgMjc4IDU1NiA1NTYgMjIyIDIyMiA1MDAgMjIyIDgzMyA1NTYgNTU2IDU1NiA1NTYgMzMzIDUwMCAyNzggNTU2IDUwMCA3MjIgNTAwIDUwMCA1MDAgMzM0IDI2MCAzMzQgNTg0IDY2NyA2NjcgNzIyIDY2NyA3MjIgNzc4IDcyMiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1MDAgNTU2IDU1NiA1NTYgNTU2IDI3OCAyNzggMjc4IDI3OCA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDQwMCA1NTYgNTU2IDU1NiAzNTAgNTM3IDYxMSA3MzcgNzM3XSAxNDFbMzMzIDMzMyA1NDldIDE0NVs3NzggNzEzIDU0OSA1NDkgNTQ5IDU1NiA1NzYgNDk0IDcxMyA4MjMgNTQ5IDI3NCAzNzAgMzY1IDc2OCA4ODkgNjExIDYxMSAzMzMgNTg0IDU0OSA1NTYgNTQ5IDYxMiA1NTYgNTU2XSAxNzJbNjY3IDY2NyA3NzhdIDE3Nls5NDQgNTU2XSAxNzlbMzMzIDMzMyAyMjIgMjIyIDU0OSA0OTQgNTAwIDY2NyAxNjcgNTU2IDMzMyAzMzMgNTAwIDUwMCA1NTYgMjc4IDIyMiAzMzNdIDE5OFs2NjcgNjY3IDY2NyA2NjcgNjY3IDI3OCAyNzggMjc4IDI3OCA3NzggNzc4IDc3OCA3MjIgNzIyIDcyMiAyNzggMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDU1NiAyMjIgNjY3IDUwMCA2MTEgNTAwIDI2MCA3MjIgNTU2IDY2NyA1MDAgNjY3IDU1NiA1ODQgNTg0IDMzMyAzMzMgMzMzIDgzNCA4MzQgODM0IDU1NiA3NzggNTU2IDI3OCA2NjcgNTAwIDcyMiA1MDAgNzIyIDUwMCA1NTYgNTUyIDMzMyA2NjcgNTU2IDY2NyA1NTYgNzIyIDYxNSA3MjIgNjY3IDU1NiA2NjcgNTU2IDU1NiAyMjIgNTU2IDI5MiA1NTYgMzM0IDcyMiA1NTYgNzIyIDU1NiA3NzggNTU2IDcyMiAzMzMgNzIyIDMzMyA2NjcgNTAwIDYxMSAyNzggNjExIDM3NSA3MjIgNTU2IDcyMiA1NTYgNjExIDUwMCA2MTEgNTAwIDU1MSA3NzggNzk4IDU3OCA1NTcgNDQ2IDYxNyAzOTUgNjQ4IDU1MiA1MDAgMzY1IDEwOTRdIDMxM1s1MDBdIDMxNVs1MDBdIDMxN1s1MDAgNTAwIDk3OSA3MTkgNTgzIDYwNCA1ODQgNjA0IDYwNCA3MDggNjI1IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcyOSA2MDRdIDM3Nls5OTAgOTkwIDk5MCA5OTAgNjA0IDYwNCA2MDQgMTAyMSAxMDUyIDkxNyA3NTAgNzUwIDUzMSA2NTYgNTk0IDUxMCA1MDAgNzUwIDczNSA0NDQgNjA0IDE4OCAzNTQgODg1IDMyMyA2MDQgMzU0IDM1NCA2MDQgMzU0IDY2NyA1NTYgNzIyIDUwMCA3MjIgNTAwIDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDcyMiA1NTYgNzIyIDU1NiAyNzggMjc4IDI3OCAyNzggMjc4IDI3OCAyNzggMjIyIDUwMCAyMjIgNjY3IDUwMCA1MDAgNTU2IDIyMiA3MjIgNTU2IDcyMyA1NTYgNzc4IDU1NiA3NzggNTU2IDcyMiAzMzMgNjY3IDUwMCA2MTEgMjc4IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgOTQ0IDcyMiA2NjcgNTAwIDIyMiA2NjcgNTU2XSA0NzNbODg5IDc3OCA2MTEgMjc4IDk0NCA3MjIgOTQ0IDcyMiA5NDQgNzIyIDY2NyA1MDAgMjIyIDMzMyA1NTYgNjAwIDgzNCA4MzQgODM0IDgzNCAzMzMgMzMzIDMzMyAzMzMgNjY3IDc4NCA4MzggMzg0IDc3NCA4NTUgNzUyIDIyMiA2NjcgNjY3IDY2OCA2NjcgNjExIDcyMiAyNzggNjY3IDY2OCA4MzMgNzIyIDY1MCA3NzggNzIyIDY2NyA2MTggNjExIDY2NyA2NjcgODM1IDc0OCAyNzggNjY3IDU3OCA0NDYgNTU2IDIyMiA1NDcgNTc1IDUwMCA0NDEgNTU2IDU1NiAyMjIgNTAwIDUwMCA1NzYgNTAwIDQ0OCA1NTYgNTY5IDQ4MiA1NDcgNTI1IDcxMyA3ODEgMjIyIDU0NyA1NTYgNTQ3IDc4MSA2NjcgODY1IDU0MiA3MTkgNjY3IDI3OCAyNzggNTAwIDEwNTcgMTAxMCA4NTQgNTgzIDYzNSA3MTkgNjY3IDY1NiA2NjcgNTQyIDY3NyA2NjcgOTIzIDYwNCA3MTkgNzE5IDU4MyA2NTYgODMzIDcyMiA3NzggNzE5IDY2NyA3MjIgNjExIDYzNSA3NjAgNjY3IDc0MCA2NjcgOTE3IDkzOCA3OTIgODg1IDY1NiA3MTkgMTAxMCA3MjIgNTU2IDU3MyA1MzEgMzY1IDU4MyA1NTYgNjY5IDQ1OCA1NTkgNTU5IDQzOCA1ODMgNjg4IDU1MiA1NTYgNTQyIDU1NiA1MDAgNDU4IDUwMCA4MjMgNTAwIDU3MyA1MjEgODAyIDgyMyA2MjUgNzE5IDUyMSA1MTAgNzUwIDU0MiA1NTYgNTU2IDM2NSA1MTAgNTAwIDIyMiAyNzggMjIyIDkwNiA4MTMgNTU2IDQzOCA1MDAgNTUyIDQ4OSA0MTFdIDY1MVsxMDczIDY5MCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDM4MyAwIDI3NSAwIDAgMjc4IDU2MyA1NDIgMzk5IDUwOCA2MDIgMjQ3IDM4MiA1OTkgNTkwIDI0NyA1MDkgNDYxIDQ2MyA1OTkgNjAxIDI0NyAzNTMgNTc0IDUyOSA1NjYgNTQ2IDQ2MSA0NzkgNTUwIDUwOSA2OTQgNjQzIDQ5MyA0OTMgNDkzIDIzNiA0MTcgODE1IDI0NyA1MDkgNTA5IDQ2MyA0NjMgNTM1IDY5NCA2OTQgNjk0IDY5NCA1NjMgNTYzIDU2MyA1NDIgMzk5IDUwOCA2MDIgMjg3IDQxMSA1OTAgMjg3IDUwOSA0NjEgNDYzIDYwMSAzNTMgNTc0IDU2NiA1NDYgNDc5IDU1MCA1MDkgNjk0IDY0MyAyNDcgNTQyIDQ2MSA1NDYgNTc2IDAgMCAwIDAgMzE5IDMxOSAzNTYgNDEzIDIwNyAwIDAgMCAwIDAgMCAwIDAgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDUyNiAzMTkgNTI2IDc1MCA3NTAgMjgyIDc1MCA1MjYgNTI2IDUyNiA3NTAgNzUwIDc1MCA3NTAgNzUwIDAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA2MzggNzUwIDc1MCA3NTAgNzEzIDcxMyAyNDQgMjQ0IDc1MCA3NTAgNzUwIDc1MCA1NjMgNTI2IDUzMCA1MzAgNDg5IDQ4OSA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDYzOCA1ODggMzc1IDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDAgMCAwIDAgMCA3NTAgNzUwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNTU2XSA4NjRbNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDMxOSAzMTkgNzUwIDYxNiA0MTMgMjA3IDIyOSAyMDcgMjI5IDQzMiA0MzIgMjA3IDIyOSA2MzggNTg4IDI0NCAyNDQgMjA3IDIyOSA3MTMgNzEzIDI0NCAyNDQgMjgyIDM3NSA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDMzNyAzMzcgMzM3IDMzNyA0ODkgNDg5IDQ4OSA0ODkgODIxIDgyMSA1MzEgNTMxIDgyMSA4MjEgNTMxIDUzMSAxMDk4IDEwOTggODQ2IDg0NiAxMDk4IDEwOTggODQ2IDg0NiA1ODIgNTgyIDU4MiA1ODIgNTgyIDU4MiA1ODIgNTgyIDU0NCA0NTAgNTI2IDM5NCA1NDQgNDUwIDUyNiAzOTQgNzg5IDc4OSAyNjggMjYzIDU4MiA1ODIgMjY4IDI2MyA2MDEgNjAxIDM5NCAzOTQgNTA2IDUwNiAyMDcgMjA3IDMzOCAzMzggMzk0IDM5NCA1MjYgNTI2IDI0NCAyNDQgMjgyIDM3NSA0NTAgMzk0IDQzMiA0MzIgNjM4IDU4OCA2MzggNTg4IDI0NCAyNDQgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA3NTAgNzUwIDAgMCA3NTAgNzUwIDc1MCAwIDAgNzUwIDc1MCAwIDAgNzUwIDc1MCA3NTAgMCAwIDAgMCAwIDAgNzUwIDAgMCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAzMTkgMzE5IDMxOSA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAxMjVdIDExMjlbMjAwMCA4NTcgNjU2IDg1NCA2NjkgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA1MTMgODM0IDgzNCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDIyMiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgMjc4IDIyMiAyNzggMjIyIDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDc3OCA1NTYgODU3IDY1NiA4NTcgNjU2IDg1NyA2NTYgODU3IDY1NiA4NTcgNjU2IDcyMiA1NTYgNzIyIDU1NiA4NTQgNjY5IDg1NCA2NjkgODU0IDY2OSA4NTQgNjY5IDg1NCA2NjkgNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNjY3IDU1NiAyNzggMjIyIDc3OCA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDAgMCAwIDAgNTQyIDM2NSA5MjMgNjY5IDU4MyA0MzggNTgzIDQzOCA3MjIgNTUyIDU1NiA1MDAgNTU2IDUwMCA2NjcgNTAwIDY2NyA1MjEgNjY3IDU1NiA3NTIgNTU2IDc3OCA1NTYgNzEzIDI0NCAyNjggMjYzIDU4MiAyNDQgMjQ0IDI0NCAyNDQgMjQ0IDI0NCAyNjkgMCAwIDMzMyAzMzMgMCAwIDAgMCAyMDcgMjI5IDIwNyAyMjkgMjA3IDIyOSAyMDcgMjI5IDQzMiA0MzIgNDMyIDQzMiA2MzggNTg4IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgODIxIDgyMSA1MzEgNTMxIDgyMSA4MjEgNTMxIDUzMSA4MjEgODIxIDUzMSA1MzEgMTA5OCAxMDk4IDg0NiA4NDYgMTA5OCAxMDk4IDg0NiA4NDYgNTgyIDU4MiA1NDQgNDUwIDUyNiAzOTQgNzg5IDc4OSA3ODkgMjY4IDI2MyA3ODkgNzg5IDI2OCAyNjMgNzg5IDc4OSAyNjggMjYzIDc4OSA3ODkgMjY4IDI2MyA3ODkgNzg5IDI2OCAyNjMgNTgyIDU4MiA1ODIgNTgyIDExNTUgMTE1NSA5MDYgOTA2IDgxMiA5MzMgMzk0IDUxNSA2MDEgNjAxIDM5NCAzOTQgNjAxIDYwMSAzOTQgMzk0IDYwMSA2MDEgMzk0IDM5NCA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDUwNiA1MDYgMjA3IDIwNyA1MDYgNTA2IDIwNyAyMDcgNTA2IDUwNiAyMDcgMjA3IDUwNiA1MDYgMjA3IDIwNyA1MjYgNTI2IDI0NCAyNDQgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgMjQ0IDI0NCA1MjYgNTI2IDU2MyA1MjYgNTMwIDUzMCAyODIgMzc1IDM4OCAzODggMzg4IDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA2MzggNTg4IDYzOCA1ODggMjQ0IDI0NCA0MzIgNDMyIDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDgxMiA4MTIgODEyIDgxMiAyMDcgMCAwIDAgMCAwIDAgMCAxMTIzIDEwODQgMCAwIDAgMCAwIDAgMTk0IDM3MCAwIDAgNjAwIDAgMCAwIDgyMSA4MjEgNTMxIDUzMSAxMDk4IDEwOTggODQ2IDg0NiA1NDQgNDUwIDUyNiAzOTQgNDEzIDMzOCAyODIgMjQ0IDMyMCAyNDQgMjQ0IDI0NCAyNDQgMjQ0IDgxMiA5MzMgMjQ3IDAgMzQyIDQ5MyA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA1NDQgNjAxIDUyNiA1MjYgNTQ0IDYwMSA1NTYgNzU4IDY1NiA1NTYgNjU2IDU1NiA3MjIgNzIyIDUwMCA3MjIgODEwIDY1NiA1NTYgNTU3IDY2NyA2MDQgNjExIDc3OCA2MjQgODgxIDIyMiAyNzggNjY3IDUwMCAyMjIgNTAwIDg5MSA3MjIgNTU2IDc3OCA4NjggNjY3IDc1NCA1NTYgNjY3IDY2NyA1MDAgNjE4IDM4MCAyNzggNjExIDI3OCA2MTEgNzQ4IDcyMiA3NzIgNTAwIDYxMSA1MDAgNjExIDYxMSA1NDUgNTQ1IDU1NiA1NTYgNDU4IDQ4NyA1NTYgMjYwIDQxMyA1ODQgMjc4IDEzMzMgMTIyMiAxMDQ5IDEwNjIgODMzIDQ1MSAxMjIyIDk0NCA3NzEgNTU2IDY2NyA1NTYgMCA2NjcgNTU2XSAxNzUyWzg4OSA3NzggNTU2IDc3OCA1NTYgNjY3IDUwMCA3NzggNTU2IDc3OCA1NTYgNjExIDU0NSAyMjIgMTMzMyAxMjIyIDEwNDkgNzc4IDU1NiAxMDM0IDYxOCA3MjIgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgMjc4IDI3OCAyNzggMjc4IDc3OCA1NTYgNzc4IDU1NiA3MjIgMzMzIDcyMiAzMzMgNzIyIDU1NiA3MjIgNTU2IDY2NyA1MDAgNjExIDI3OCA1NDUgNDM3IDcyMiA1NTYgNzA2IDYwNCA1NjUgNjExIDUwMCA2NjcgNTU2IDY2NyA1NTYgNzc4IDU1NiAwIDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDY2NyA1MDAgNTU2IDU1NiA1NTYgNTU2IDUwMCA1MDAgNTU2IDU1NiA1NTYgNzM5IDQ1OCA0NTggNjMxIDUwNyAyNzggNTU2IDU1NiA1NTkgNTAxIDYxNyA1NTYgNTU2IDU1NiAyMjIgMjIyIDM1NiAzMjcgMzA0IDIyMiA1NzIgODMzIDgzMyA4MzMgNTU2IDU1NiA1NTMgNTU2IDc5MSA3ODEgNTUwIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyA1NDIgNTQyIDUwMCAyMjIgMjYwIDIyMiAzNDkgMjc4IDI3OCA1NTYgNTY4IDU0NyA1MDAgNzIyIDUwMCA1MjAgNTAwIDU0MSA1NDUgNTQ1IDUwMCA1MDAgNTAwIDUwMCA3NzggNTMxIDUwNyA1NTkgNTUyIDM5NyA1MDAgNDA0IDU1NiA1MDAgNTAwIDk2NCA5MDYgMTAwNSA3MTIgNDI5IDcxOSA3NjQgNjYxIDYzMiA0ODUgNTI3IDM4MyAzODMgMTU5IDI0MCAyNDAgMjQwIDM2NCA0ODEgMzIxIDE5MSAzNTUgMjIyIDIyMiAyMjIgMzMzIDMzMyAzNDkgMzQ5IDU4NCA1ODQgNTg0IDU4NCAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMjc4IDI3OCAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMyMiAxNTcgMzQwIDMyOCAzNDkgMzgzIDM4MyAzODMgMzgzIDM4MyAzMzMgMzMzIDMzMyAzMzMgMzMzIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAzMzMgMzMzIDMzMyA1NzUgNTQ3IDc3MiA5NTggNzcyIDU2MCA3ODEgNjAxIDc3OCA1NTYgNzIyIDUwMCA2MTEgNDA0IDYyNSA1MjkgNzU2IDU3NyA4OTEgODMzIDY3NCA1NTYgNjc0IDUwMCA2NjcgNjY3IDYwOSA1OTYgNzM3IDU1NCA0NjQgNDEwIDYwMSA1NzMgNTAwIDIyMiA3NzggNDQyIDQ0MiA2NjcgNzE5IDU1NiA1NTkgMTMzOCA2MjQgNzc4IDYxMyA5NTAgNzEzIDY2OCA1MDAgODk3IDY5NSA4MjkgNjg1IDEwNTMgODY3IDYwNCA0NTggNzk2IDY4OCA3NzggNTU2IDgwMyA2MzEgODAzIDYzMSAxMDc0IDg5NiA4MzMgNjEyIDExOTEgODUyIDAgMTMzOCA2MjQgNzIyIDUwMCA1MDMgMCAwIDAgMCAwIDAgNzE5IDU1OSA2NTYgNTIxIDY2NyA1NTYgNjcwIDU0OSA2MDQgNDU4IDU4MyA0MzggNzQyIDUzNiA4NzkgNjQ4IDExMzcgODcwIDc1MyA1MjEgNzIyIDUwMCA2MTEgNDU4IDkyNSA2OTEgNjY3IDUyMSA4NjEgNjY2IDg2MSA2NjYgMjc4IDkyMyA2NjkgNjY3IDU1MSA2NTYgNTgzIDcyMiA1NTIgNzIyIDU1MiA2NjcgNTIxIDgzMyA2ODggMzMzIDY2NyA1NTYgNjY3IDU1Nl0gMjM0Nls4ODkgNjY3IDU1NiA3NTIgNTU2IDkyMyA2NjkgNjA0IDQ1OCA2MDQgNTQ1IDcxOSA1NTkgNzE5IDU1OSA3NzggNTU2IDc3OCA1NTYgNzE5IDUxMCA2MzUgNTAwIDYzNSA1MDAgNjM1IDUwMCA2NjcgNTIxIDg4NSA3MTkgNjU2IDU1NiA5NjggODc2IDk1NiA4MTUgNjYzIDUwOSA5NzAgOTEwIDEwMzQgODc4IDc3OCA1NTkgNzQ3IDY2NiAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA3MjIgNTAwIDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjExIDI3OCA3NzggNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiAyNzggMjIyIDI3OCAyNzggNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNTU2IDIyMiA1NTYgMjIyIDU1NiAyMjIgNTU2IDIyMiA4MzMgODMzIDgzMyA4MzMgODMzIDgzMyA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDc3OCA1NTYgNjY3IDU1NiA2NjcgNTU2IDcyMiAzMzMgNzIyIDMzMyA3MjIgMzMzIDcyMiAzMzMgNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDYxMSAyNzggNjExIDI3OCA2MTEgMjc4IDYxMSAyNzggNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDY2NyA1MDAgNjY3IDUwMCA5NDQgNzIyIDk0NCA3MjIgNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNjExIDUwMCA2MTEgNTAwIDYxMSA1MDAgNTU2IDI3OCA3MjIgNTAwIDU1NiAyMjIgNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA2NjcgNjY3IDgxMyA4MTMgODEzIDgxMyA4MTMgODEzIDQ0NiA0NDYgNDQ2IDQ0NiA0NDYgNDQ2IDc2NSA3NjUgOTI4IDkyOCA5MjggOTI4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODIwIDgyMCAxMDE1IDEwMTUgMTAxNSAxMDE1IDEwMTUgMTAxNSAyMjIgMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDM3NSAzNzUgNTcxIDU3MSA1NzEgNTcxIDU3MSA1NzEgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODI3IDgyNyAxMDIyIDEwMjIgOTczIDk3MyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDgxMyA5NjAgMTAwOSA5NjAgNzgxIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc4MSA3OTYgNzk2IDk5MiA5OTIgOTQzIDk0MyA5NDMgOTQzIDU3OCA1NzggNDQ2IDQ0NiA1NTYgNTU2IDIyMiAyMjIgNTU2IDU1NiA1NDcgNTQ3IDc4MSA3ODEgNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA2NjcgNjY3IDgxMyA4MTMgODEzIDgxMyA4MTMgODEzIDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODIwIDgyMCAxMDE1IDEwMTUgMTAxNSAxMDE1IDEwMTUgMTAxNSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc5NiA3OTYgOTkyIDk5MiA5NDMgOTQzIDk0MyA5NDMgNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDY2NyA2NjcgNjY3IDY2NyA2NjcgMzMzIDMzMyAzMzMgMzMzIDMzMyA1NTYgNTU2IDU1NiA1NTYgNTU2IDgxMyA4MTMgODY5IDg2OSA3MjIgMzMzIDMzMyAzMzMgMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjc4IDI3OCA0MjQgNDI0IDMzMyAzMzMgMzMzIDU0NyA1NDcgNTQ3IDU0NyA1NjkgNTY5IDU0NyA1NDcgNjY3IDY2NyA4NjIgODg3IDc2NSAzMzMgMzMzIDMzMyA3ODEgNzgxIDc4MSA3ODEgNzgxIDkyNCA4MjcgODk0IDc5NiA3NDggMzMzIDMzMyA1NTYgNzIyIDcyMiA4MzMgNzIyIDExNjQgOTQ0IDY2NyA2MTFdIDI4MjRbNTAwIDU5NCAwIDAgMCAwIDIyMiAyMjIgNTIxIDY2NyA2ODIgMzQ5IDY4NSAzNjcgNjg3IDY4NyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAyNzggMzMzIDMzMyAzMzMgMzMzIDM5NyAzOTcgMzMzIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA2NjcgNTU2IDQ5NiA3NDggODg5IDUzMSA1MDAgNTUxIDU1MSA0OTAgNDU4IDIyMiA0MjIgNTAwIDQwMSA2ODggNTU5IDU1NiA1MDAgNjA4IDYwOCA2MDggOTQ0IDQ1NyA1NTYgNTU2IDUyMSA1NDIgNTQyIDQ1OCA1NDcgNTk3IDczMyA1OTcgNTAwIDcyMiA1MDAgNDU4IDQyNyA2MDcgMzY1IDUwMCA1NDIgNTIxIDcxMyA1ODMgNDUzIDY2NCA0MTUgNDE1IDQ0OSA0MTAgNDEwIDQ5NiA0MjkgMTY3IDMxNCA0MjUgMzUyIDUxMCA0MzAgNDI5IDUxMiAzODIgNDE4IDQ1MSA0MzMgNDI5IDYyMyAzNzIgMzcyIDM3NyA2MDAgMzc3IDM3NyAzNzIgMzcyIDMxOCAzMTggMzc3IDE1NyAzMzkgNTczIDM4MiAzNzcgMzU0IDM3NyAzNzcgMzc4IDIyMCAzODIgNDA3IDU3MyAzMjEgMzkxIDM4NSAzMjEgMzc4IDQ0MCAzNDMgMTU3IDI0MCAzODIgMzIxIDM4NSAzMjEgMzc5IDQ0MCAzNDMgOTM2IDEzMDAgNDM5IDEyNzMgNjU3IDIzOSA1NDQgMCAwIDAgMCAwIDAgMCAwIDAgMzM3IDMzNyA0ODkgNDg5IDQ1MCAzOTQgNDUwIDM5NCA3MDkgNjU1IDc0OSA2MDcgNjA5IDc0NSA2NTYgNzg5IDU4NCAwIDAgMCA1NTYgMzMzIDM1NCAyMDcgMjA3IDIwNyAyMDcgNzkzIDEyMjEgNTAwXSAzMDI0WzUwMF0gMzAyNlszMzMgMjUwIDE2NyA1NTYgMjc4IDIwMCA4MyAwIDczNyA3MjIgODMzIDY4OCA5MDggODg3IDg4NyA2NjcgNzIyIDUwMCA1NTYgNjExIDUwMCA1MDAgNTgxIDAgMCAwIDAgMCA1NjkgNzIyIDcyMiA3MjIgNTQyIDM2NSAwIDAgMCAzNTMgMCAyNjMgMjg5IDAgMCAwIDAgMCAwIDAgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgMzM3IDMzNyAzMzcgMzM3IDQ4OSA0ODkgODIxIDgyMSA1MzEgNTMxIDU0NCA0NTAgNTI2IDM5NCA1NDQgNDUwIDUyNiAzOTQgNTQ0IDQ1MCA1MjYgMzk0IDc4OSA3ODkgMjY4IDI2MyA3ODkgNzg5IDI2OCAyNjMgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgMzM4IDMzOCAzOTQgMzk0IDMzOCAzMzggMzk0IDM5NCA1MjYgNTI2IDI0NCAyNDQgNTI2IDUyNiAyNDQgMjQ0IDUyNiA1MjYgMjQ0IDI0NCA1MDYgNTA2IDIwNyAyMDcgNDg5IDQ4OSA0ODkgNDg5IDgyMSA4MjEgNTMxIDUzMSA1NTYgNTU2IDI3OCA4MzMgNTU2IDU1NiAzMzMgMzMzIDUwMCAyNzggNTAwIDU1NiAzODAgNTU3IDc4NiAyMjIgMjIyIDU1NiA1NDcgNTY4IDU1NiA1NTYgMjc4IDcxMyA1MDAgMjIyIDgzMyA1NTYgNTU2IDMzMyA1MDAgMzg3IDUwMCA1MDAgNTAwIDU1NiA1NTYgNTU2IDU1NiA0NTggNDU4IDY1MCAyMjIgNTAwIDIyMiA1NTYgNTQ1IDM3NyAzNTQgMzQ4IDM3MyAzMTggMjI5IDIyOSAzNzcgMzgzIDE1NyAxNTcgMTU3IDE1NyAyNzEgMTU3IDE1NyAyNzUgNTcyIDU3MiAzODIgMzgyIDM4MiAzNzcgMzc1IDM0MCAxNTcgMjIwIDM4MiAzODggMzc4IDM1NCAzMjEgMzU4IDM1OCAzNTggMzY5IDM2NCAwIDAgMCAwIDI3OCAzNzIgMzcyIDM3NyAzMjggMzcyIDc3OCA2NjcgNTU2IDcyMiAzMzMgNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCAyMjIgMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDU0NyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA1NDcgMjIyIDIyMiAyMjIgMjIyIDU0NyA1NDcgNTQ3IDU0NyA1NDQgNjAxIDQ1MyA2NjcgNzIyIDY2OCA2NjcgNTU2IDUwMCAyMjIgNzM3IDU1NiA3MjIgMzMzIDY2NyA1MDAgNTAwIDUwMCA1MDAgMjIyIDU0MiAzNjUgNjY3IDUwMCA2NjcgNTAwIDYwNCA0NTggNjU2IDU4MyAwIDAgMCAwIDAgMCAwIDAgMCA5NDMgNDkwIDUwMCA1NTYgMjIyIDU1NiA2NjcgNzIyIDU1NiAyNzggNzIyIDU1NiA2NjcgNTAwIDYxMSA1MDAgNTAwIDU3NyA0MjUgNjQ4IDAgMCAwIDAgMCAwIDIyMiA3MjMgNzIyIDcyMyAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNzc4IDU1NiA5NDQgNzIyIDcwMyAwIDczMiA1OTcgMTAzNyA4NDEgMjc4IDQzOCAxOTEgMTkxIDUwMCA1MDAgMjc4IDI3OCAyNzggMzMzIDAgMCAwIDAgMCAwIDAgMCA2MTEgNTU2IDU1NiAzODQgNTM5IDUzNCA1NTYgNTM5IDU2MSA1MTkgNTU2IDU1OSA1NTYgMzg3IDU1NiA1NTYgNTU2IDU1NiA1NjIgNTIzIDU1NiA1NjAgNzIxIDcyOCA3NDYgMTE2MSA3NDYgMzc2IDY1NyA3NzggNTU2IDIyMiA0OTYgMjU1IDU1NiAyODkgNTU5IDU1NiA1NTYgMzc2IDI1NSAyMjIgNTU1IDU2NyA1OTUgNjEzIDU1NCA1MDQgNjQ4IDYxNyAyMzkgNDMxIDU2NyA0NjcgNzIyIDYxNSA2NDkgNTUzIDY0OSA2MDcgNTUzIDUwOCA2MDggNTUxIDc5MyA1NTQgNTUzIDUwNyA4MjEgODMzIDQ2NyA2NDkgNTU0IDYxMyA1OTUgNTU1IDU1NSA1NTUgNTU1IDU1NSA1NTUgNTk1IDU1NCA1NTQgNTU0IDU1NCAyMzkgMjM5IDIzOSAyMzkgNjE1IDY0OSA2NDkgNjQ5IDY0OSA2NDkgNjA4IDYwOCA2MDggNjA4IDU1MyA1NTUgNTU1IDU1NSA1OTUgNTk1IDU5NSA1OTUgNjEzIDYxMyA1NTQgNTU0IDU1NCA1NTQgNTU0IDY0OCA2NDggNjQ4IDY0OCA2MTcgNjE4IDIzOSAyMzkgMjM5IDIzOSAyMzkgNjU4IDQzMSA1NjcgNDY3IDQ2NyA0NjcgNDY3IDYxNSA2MTUgNjE1IDYyMCA2NDkgNjQ5IDY0OSA2MDcgNjA3IDYwNyA1NTMgNTUzIDU1MyA1NTMgNTUzIDUwOCA1MDggNTA4IDUwNyA2MDggNjA4IDYwOCA2MDggNjA4IDYwOCA3OTMgNzkzIDc5MyA3OTMgNTUzIDU1MyA1NTMgNTA3IDUwNyA1MDcgNTU1IDgyMSA2NDkgNTU1IDU2NyA0NjAgNTU1IDU1NCA1MDcgNjE3IDY0OSAyMzkgNTY3IDU0NCA3MjIgNjE1IDUyMyA2NDkgNjEyIDU1MyA1MTggNTA4IDU1MyA2NTkgNTU0IDY1OCA2NDkgNTU1IDU1NCA2MTcgMjM5IDY0OSA1NTMgNjQ5IDIzOSA1NTMgNTU0IDcxMCA0NjAgNTk3IDU1MyAyMzkgMjM5IDQzMSA4NjkgODM5IDczMSA1MTEgNTQ4IDYxMiA1NTUgNTY1IDU2NyA0NjAgNTUxIDU1NCA3OTEgNTE1IDYxMiA2MTIgNTExIDU1MSA3MjIgNjE3IDY0OSA2MTIgNTUzIDU5NSA1MDggNTQ4IDYzMSA1NTQgNjA3IDU2MSA3NzAgNzY1IDY4NiA3MzggNTQyIDU5NyA4MzUgNjA3IDM5MiAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjggNzI4IDcyOCA3MjggNzI4IDcyOCA3MjggNzI4IDcyOCA3MjggNzI4IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiA1MTEgMzc2IDM3NiAzNzYgMjU1IDI1NSAzMDEgMzMxIDI1NSAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDY1NyA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAyMjIgNDk2IDI1NSAyNTUgMzAxIDMzMSAyNTUgMjg5IDI4OSAzNzUgMjg5IDU1OSA1NTkgNTU5IDU1OSA1NzggMzMzIDMzMyAzMzMgMzMzIDYxNiA2MTYgNjE2IDc1NSA2MDQgNzM2IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDE1NzMgMTc1NiAwIDE4NTMgMCAwIDAgMCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDgyMSA4MjEgNTMxIDUzMSA0ODkgNDg5IDU2MyA1MjYgNTMwIDUzMCAyMDcgMjI5IDIwNyAyMjkgNjM4IDU4OCAyNDQgMjQ0IDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDI0NCAyNDQgNDMyIDQzMiA0MzIgNDMyIDgxMiA4MTIgODEyIDgxMiA1NjMgNTI2IDUzMCA1MzAgODIxIDgyMSA1MzEgNTMxIDgyMSA4MjEgNTMxIDUzMSA2MDEgNjAxIDM5NCAzOTQgNTg4IDYyNSA1NzMgNjExIDkyMCA3MzEgODgyIDYzNCAxNDY0IDAgMCAwIDAgMCA2MzggNTg4IDI0NCAyNDQgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA2MzggNTg4IDI0NCAyNDQgNjM4IDU4OCAyNDQgMjQ0IDYzOCA1ODggMjQ0IDI0NCAwIDU3NyA0NzUgNjExIDQ1OCA3MTkgNTg0IDY2NyA1NTYgMTMwMCA1NTYgNjY3IDk2MCA3NjAgNzg4IDcxOCA5NTggODU2IDY2NyA1MDAgMTA2OCA4ODQgMTEzMiA4NTEgNzIyIDU0MiA3MDUgNTU0IDI3OCAyNzggNTU3IDc2NyAzOTggNTkxIDU1NyA2NjggNTc2IDgzMyA2NjcgNzMyIDY5NSAzMzMgNTU2IDQ5MCAxNTkgMzIxIDY2NyA2MTEgMjc4IDc3OSAxNDE3IDEwMzYgMTM4MSAxODUzIDIwNyAyMDcgMjA3IDIyOSAyMDcgMjA3IDIwNyAyMDcgMjkwIDIwNyAyMDcgMjA3IDIwNyAyMDcgMjA3IDIwNyAyMDcgMjA3IDIwNyAyMDcgMjQ0IDI0NCAyNDQgMjQ0IDI0NCAyNzIgMjQ0IDIwMCAzNDMgMzQzIDU1NiAzNjQgMzY0IDUxOSA1MTkgNjM4IDYzOCA2MzggNjM4IDYzOCA2MzggNjM4IDYzOCA1NjMgNTYzIDQ4NyA1NjMgNTYzIDQ4NyA3MTMgNzEzIDI0NCAyNDQgNTYzIDUyNiA1MzAgNTMwIDU4MiA1ODIgNTgyIDU4MiA3ODkgNzg5IDI2OCAyNjMgNTgyIDU4MiAyNjggMjYzIDUwNiA1MDYgMjA3IDIwNyAzMzggMzM4IDM5NCAzOTQgNjM4IDU4OCAyNDQgMjQ0IDYzOCA1ODggMjQ0IDI0NCA0NjQgNDY0IDQzMiA0MzIgNDI3IDQyNyAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA1NDQgNjAxIDAgMzk5IDUwOCA2MDIgNjQzIDAgMCAzMTkgMzE5IDUzMyA1MzAgNTMzIDUzMCA1MzMgNTMwIDUzNCA1MzMgNTMwIDU4MiAzMTkgMzk0IDI3MyAxODUgMCA3OTMgNzM5IDcyNSA3MTYgNzE4IDcyNSA3MDkgNTk4IDcyNCA4MDcgNzE2IDY1OSA1MjggOTI0IDc2NyA2OTUgNjE2IDcwNiA3MTggNzAwIDc1NCA3MTYgNzA4IDcwMCA3MjUgNjk5IDc5MiA3MzggNzY0IDcyNSA2OTggNjYwIDY3OCA2NzcgNTE2IDc2MiA2ODYgNzgyIDc2MiAyNzQgMjIyIDE2OSAyMDAgMjY1IDIzMSA1MTQgODMzIDU1MSA1ODAgNTgzIDU1MyA1NTAgNDkyIDU1MSA2NjcgNTgwIDU1MSAyMjAgODM0IDU0MiA1NTMgNTUxIDUyMyA1NTMgNTU5IDU1MSAyMjAgNTUzIDQ1NiA1NTEgMzQ3IDgzMyA1MTcgNTY0IDU1MSA1NTEgODMxIDU1MSA1NTUgMzk0IDgzMSA1NTAgNTU1IDc0NCA3MTMgMjc4IDMyNCAxMDAxIDEwMDEgNzI3IDExMDQgMTEwNCAxMTAyIDExMDQgMTM4NSA1NTZdIDQxOThbMCAwIDcxMyA3MTMgMjQ0IDI0NCAxNzEgMzM3IDMzNyAxMDk4IDEwOTggODQ2IDg0NiA4MTIgOTMzIDM5NCA1MTUgMjgyIDE5NyA0ODkgNDg5IDAgNTAwIDcyMiA1NTIgMTMzMCAxMDY5IDY2NyA1NjUgNjU2IDU4MyA4MzAgNzg2IDUzNCA3NTMgNzUzIDUzNyA3NDMgNzk0XV0+PgplbmRvYmoKNjM5IDAgb2JqCls2MzggMCBSXQplbmRvYmoKNTgyIDAgb2JqCjw8L0Jhc2VGb250L0dITVBFTCtBcmlhbC9EZXNjZW5kYW50Rm9udHMgNjM5IDAgUi9FbmNvZGluZy9JZGVudGl0eS1IL1N1YnR5cGUvVHlwZTAvVG9Vbmljb2RlIDU5NiAwIFIvVHlwZS9Gb250Pj4KZW5kb2JqCjY0MCAwIG9iagpbNjM4IDAgUl0KZW5kb2JqCjU4MyAwIG9iago8PC9CYXNlRm9udC9VREhHSEErQXJpYWwvRGVzY2VuZGFudEZvbnRzIDY0MCAwIFIvRW5jb2RpbmcvSWRlbnRpdHktSC9TdWJ0eXBlL1R5cGUwL1RvVW5pY29kZSA1OTcgMCBSL1R5cGUvRm9udD4+CmVuZG9iago2NDEgMCBvYmoKWzYzOCAwIFJdCmVuZG9iago1ODQgMCBvYmoKPDwvQmFzZUZvbnQvSE9EUFZVK0FyaWFsL0Rlc2NlbmRhbnRGb250cyA2NDEgMCBSL0VuY29kaW5nL0lkZW50aXR5LUgvU3VidHlwZS9UeXBlMC9Ub1VuaWNvZGUgNTk4IDAgUi9UeXBlL0ZvbnQ+PgplbmRvYmoKNjQyIDAgb2JqCjw8L09yZGVyaW5nKElkZW50aXR5KS9SZWdpc3RyeShBZG9iZSkvU3VwcGxlbWVudCAwPj4KZW5kb2JqCjY0MyAwIG9iago8PC9Bc2NlbnQgMTA0MC9DSURTZXQgNTkwIDAgUi9DYXBIZWlnaHQgNzE2L0Rlc2NlbnQgLTMyNS9GbGFncyA0L0ZvbnRCQm94Wy02NjUgLTMyNSAyMDAwIDEwNDBdL0ZvbnRGYW1pbHkoQXJpYWwpL0ZvbnRGaWxlMiA1OTEgMCBSL0ZvbnROYW1lL0FNUEFOTytBcmlhbE1UL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDQwMC9JdGFsaWNBbmdsZSAwL1N0ZW1WIDg4L1R5cGUvRm9udERlc2NyaXB0b3IvWEhlaWdodCA1MTk+PgplbmRvYmoKNTUgMCBvYmoKPDwvQmFzZUZvbnQvQU1QQU5PK0FyaWFsTVQvQ0lEU3lzdGVtSW5mbyA2NDIgMCBSL0NJRFRvR0lETWFwL0lkZW50aXR5L0RXIDEwMDAvRm9udERlc2NyaXB0b3IgNjQzIDAgUi9TdWJ0eXBlL0NJREZvbnRUeXBlMi9UeXBlL0ZvbnQvV1swWzc1MCAwIDI3OCAyNzggMjc4IDM1NSA1NTYgNTU2IDg4OSA2NjcgMTkxIDMzMyAzMzMgMzg5IDU4NCAyNzggMzMzIDI3OCAyNzggNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDI3OCAyNzggNTg0IDU4NCA1ODQgNTU2IDEwMTUgNjY3IDY2NyA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTAwIDY2NyA1NTYgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgNjY3IDk0NCA2NjcgNjY3IDYxMSAyNzggMjc4IDI3OCA0NjkgNTU2IDMzMyA1NTYgNTU2IDUwMCA1NTYgNTU2IDI3OCA1NTYgNTU2IDIyMiAyMjIgNTAwIDIyMiA4MzMgNTU2IDU1NiA1NTYgNTU2IDMzMyA1MDAgMjc4IDU1NiA1MDAgNzIyIDUwMCA1MDAgNTAwIDMzNCAyNjAgMzM0IDU4NCA2NjcgNjY3IDcyMiA2NjcgNzIyIDc3OCA3MjIgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTAwIDU1NiA1NTYgNTU2IDU1NiAyNzggMjc4IDI3OCAyNzggNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA0MDAgNTU2IDU1NiA1NTYgMzUwIDUzNyA2MTEgNzM3IDczN10gMTQxWzMzMyAzMzMgNTQ5XSAxNDVbNzc4IDcxMyA1NDkgNTQ5IDU0OSA1NTYgNTc2IDQ5NCA3MTMgODIzIDU0OSAyNzQgMzcwIDM2NSA3NjggODg5IDYxMSA2MTEgMzMzIDU4NCA1NDkgNTU2IDU0OSA2MTIgNTU2IDU1Nl0gMTcyWzY2NyA2NjcgNzc4XSAxNzZbOTQ0IDU1Nl0gMTc5WzMzMyAzMzMgMjIyIDIyMiA1NDkgNDk0IDUwMCA2NjcgMTY3IDU1NiAzMzMgMzMzIDUwMCA1MDAgNTU2IDI3OCAyMjIgMzMzXSAxOThbNjY3IDY2NyA2NjcgNjY3IDY2NyAyNzggMjc4IDI3OCAyNzggNzc4IDc3OCA3NzggNzIyIDcyMiA3MjIgMjc4IDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyA1NTYgMjIyIDY2NyA1MDAgNjExIDUwMCAyNjAgNzIyIDU1NiA2NjcgNTAwIDY2NyA1NTYgNTg0IDU4NCAzMzMgMzMzIDMzMyA4MzQgODM0IDgzNCA1NTYgNzc4IDU1NiAyNzggNjY3IDUwMCA3MjIgNTAwIDcyMiA1MDAgNTU2IDU1MiAzMzMgNjY3IDU1NiA2NjcgNTU2IDcyMiA2MTUgNzIyIDY2NyA1NTYgNjY3IDU1NiA1NTYgMjIyIDU1NiAyOTIgNTU2IDMzNCA3MjIgNTU2IDcyMiA1NTYgNzc4IDU1NiA3MjIgMzMzIDcyMiAzMzMgNjY3IDUwMCA2MTEgMjc4IDYxMSAzNzUgNzIyIDU1NiA3MjIgNTU2IDYxMSA1MDAgNjExIDUwMCA1NTEgNzc4IDc5OCA1NzggNTU3IDQ0NiA2MTcgMzk1IDY0OCA1NTIgNTAwIDM2NSAxMDk0XSAzMTNbNTAwXSAzMTVbNTAwXSAzMTdbNTAwIDUwMCA5NzkgNzE5IDU4MyA2MDQgNTg0IDYwNCA2MDQgNzA4IDYyNSA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MDggNzA4IDcwOCA3MjkgNjA0XSAzNzZbOTkwIDk5MCA5OTAgOTkwIDYwNCA2MDQgNjA0IDEwMjEgMTA1MiA5MTcgNzUwIDc1MCA1MzEgNjU2IDU5NCA1MTAgNTAwIDc1MCA3MzUgNDQ0IDYwNCAxODggMzU0IDg4NSAzMjMgNjA0IDM1NCAzNTQgNjA0IDM1NCA2NjcgNTU2IDcyMiA1MDAgNzIyIDUwMCA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3MjIgNTU2IDcyMiA1NTYgMjc4IDI3OCAyNzggMjc4IDI3OCAyNzggMjc4IDIyMiA1MDAgMjIyIDY2NyA1MDAgNTAwIDU1NiAyMjIgNzIyIDU1NiA3MjMgNTU2IDc3OCA1NTYgNzc4IDU1NiA3MjIgMzMzIDY2NyA1MDAgNjExIDI3OCA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDk0NCA3MjIgNjY3IDUwMCAyMjIgNjY3IDU1Nl0gNDczWzg4OSA3NzggNjExIDI3OCA5NDQgNzIyIDk0NCA3MjIgOTQ0IDcyMiA2NjcgNTAwIDIyMiAzMzMgNTU2IDYwMCA4MzQgODM0IDgzNCA4MzQgMzMzIDMzMyAzMzMgMzMzIDY2NyA3ODQgODM4IDM4NCA3NzQgODU1IDc1MiAyMjIgNjY3IDY2NyA2NjggNjY3IDYxMSA3MjIgMjc4IDY2NyA2NjggODMzIDcyMiA2NTAgNzc4IDcyMiA2NjcgNjE4IDYxMSA2NjcgNjY3IDgzNSA3NDggMjc4IDY2NyA1NzggNDQ2IDU1NiAyMjIgNTQ3IDU3NSA1MDAgNDQxIDU1NiA1NTYgMjIyIDUwMCA1MDAgNTc2IDUwMCA0NDggNTU2IDU2OSA0ODIgNTQ3IDUyNSA3MTMgNzgxIDIyMiA1NDcgNTU2IDU0NyA3ODEgNjY3IDg2NSA1NDIgNzE5IDY2NyAyNzggMjc4IDUwMCAxMDU3IDEwMTAgODU0IDU4MyA2MzUgNzE5IDY2NyA2NTYgNjY3IDU0MiA2NzcgNjY3IDkyMyA2MDQgNzE5IDcxOSA1ODMgNjU2IDgzMyA3MjIgNzc4IDcxOSA2NjcgNzIyIDYxMSA2MzUgNzYwIDY2NyA3NDAgNjY3IDkxNyA5MzggNzkyIDg4NSA2NTYgNzE5IDEwMTAgNzIyIDU1NiA1NzMgNTMxIDM2NSA1ODMgNTU2IDY2OSA0NTggNTU5IDU1OSA0MzggNTgzIDY4OCA1NTIgNTU2IDU0MiA1NTYgNTAwIDQ1OCA1MDAgODIzIDUwMCA1NzMgNTIxIDgwMiA4MjMgNjI1IDcxOSA1MjEgNTEwIDc1MCA1NDIgNTU2IDU1NiAzNjUgNTEwIDUwMCAyMjIgMjc4IDIyMiA5MDYgODEzIDU1NiA0MzggNTAwIDU1MiA0ODkgNDExXSA2NTFbMTA3MyA2OTAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAzODMgMCAyNzUgMCAwIDI3OCA1NjMgNTQyIDM5OSA1MDggNjAyIDI0NyAzODIgNTk5IDU5MCAyNDcgNTA5IDQ2MSA0NjMgNTk5IDYwMSAyNDcgMzUzIDU3NCA1MjkgNTY2IDU0NiA0NjEgNDc5IDU1MCA1MDkgNjk0IDY0MyA0OTMgNDkzIDQ5MyAyMzYgNDE3IDgxNSAyNDcgNTA5IDUwOSA0NjMgNDYzIDUzNSA2OTQgNjk0IDY5NCA2OTQgNTYzIDU2MyA1NjMgNTQyIDM5OSA1MDggNjAyIDI4NyA0MTEgNTkwIDI4NyA1MDkgNDYxIDQ2MyA2MDEgMzUzIDU3NCA1NjYgNTQ2IDQ3OSA1NTAgNTA5IDY5NCA2NDMgMjQ3IDU0MiA0NjEgNTQ2IDU3NiAwIDAgMCAwIDMxOSAzMTkgMzU2IDQxMyAyMDcgMCAwIDAgMCAwIDAgMCAwIDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDUyNiA1MjYgMzE5IDUyNiA3NTAgNzUwIDI4MiA3NTAgNTI2IDUyNiA1MjYgNzUwIDc1MCA3NTAgNzUwIDc1MCAwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNjM4IDc1MCA3NTAgNzUwIDcxMyA3MTMgMjQ0IDI0NCA3NTAgNzUwIDc1MCA3NTAgNTYzIDUyNiA1MzAgNTMwIDQ4OSA0ODkgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA2MzggNTg4IDM3NSA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAwIDAgMCAwIDAgNzUwIDc1MCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDU1Nl0gODY0Wzc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAzMTkgMzE5IDc1MCA2MTYgNDEzIDIwNyAyMjkgMjA3IDIyOSA0MzIgNDMyIDIwNyAyMjkgNjM4IDU4OCAyNDQgMjQ0IDIwNyAyMjkgNzEzIDcxMyAyNDQgMjQ0IDI4MiAzNzUgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCAzMzcgMzM3IDMzNyAzMzcgNDg5IDQ4OSA0ODkgNDg5IDgyMSA4MjEgNTMxIDUzMSA4MjEgODIxIDUzMSA1MzEgMTA5OCAxMDk4IDg0NiA4NDYgMTA5OCAxMDk4IDg0NiA4NDYgNTgyIDU4MiA1ODIgNTgyIDU4MiA1ODIgNTgyIDU4MiA1NDQgNDUwIDUyNiAzOTQgNTQ0IDQ1MCA1MjYgMzk0IDc4OSA3ODkgMjY4IDI2MyA1ODIgNTgyIDI2OCAyNjMgNjAxIDYwMSAzOTQgMzk0IDUwNiA1MDYgMjA3IDIwNyAzMzggMzM4IDM5NCAzOTQgNTI2IDUyNiAyNDQgMjQ0IDI4MiAzNzUgNDUwIDM5NCA0MzIgNDMyIDYzOCA1ODggNjM4IDU4OCAyNDQgMjQ0IDU0NCA2MDEgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNzUwIDc1MCAwIDAgNzUwIDc1MCA3NTAgMCAwIDc1MCA3NTAgMCAwIDc1MCA3NTAgNzUwIDAgMCAwIDAgMCAwIDc1MCAwIDAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgMzE5IDMxOSAzMTkgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgMTI1XSAxMTI5WzIwMDAgODU3IDY1NiA4NTQgNjY5IDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNTEzIDgzNCA4MzQgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAyMjIgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDI3OCAyMjIgMjc4IDIyMiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDg1NyA2NTYgODU3IDY1NiA4NTcgNjU2IDg1NyA2NTYgODU3IDY1NiA3MjIgNTU2IDcyMiA1NTYgODU0IDY2OSA4NTQgNjY5IDg1NCA2NjkgODU0IDY2OSA4NTQgNjY5IDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDY2NyA1NTYgMjc4IDIyMiA3NzggNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiAwIDAgMCAwIDU0MiAzNjUgOTIzIDY2OSA1ODMgNDM4IDU4MyA0MzggNzIyIDU1MiA1NTYgNTAwIDU1NiA1MDAgNjY3IDUwMCA2NjcgNTIxIDY2NyA1NTYgNzUyIDU1NiA3NzggNTU2IDcxMyAyNDQgMjY4IDI2MyA1ODIgMjQ0IDI0NCAyNDQgMjQ0IDI0NCAyNDQgMjY5IDAgMCAzMzMgMzMzIDAgMCAwIDAgMjA3IDIyOSAyMDcgMjI5IDIwNyAyMjkgMjA3IDIyOSA0MzIgNDMyIDQzMiA0MzIgNjM4IDU4OCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCA1NjMgNTI2IDUzMCA1MzAgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgMzM3IDMzNyAzMzcgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDQ4OSA0ODkgNDg5IDgyMSA4MjEgNTMxIDUzMSA4MjEgODIxIDUzMSA1MzEgODIxIDgyMSA1MzEgNTMxIDEwOTggMTA5OCA4NDYgODQ2IDEwOTggMTA5OCA4NDYgODQ2IDU4MiA1ODIgNTQ0IDQ1MCA1MjYgMzk0IDc4OSA3ODkgNzg5IDI2OCAyNjMgNzg5IDc4OSAyNjggMjYzIDc4OSA3ODkgMjY4IDI2MyA3ODkgNzg5IDI2OCAyNjMgNzg5IDc4OSAyNjggMjYzIDU4MiA1ODIgNTgyIDU4MiAxMTU1IDExNTUgOTA2IDkwNiA4MTIgOTMzIDM5NCA1MTUgNjAxIDYwMSAzOTQgMzk0IDYwMSA2MDEgMzk0IDM5NCA2MDEgNjAxIDM5NCAzOTQgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDgxMiA5MzMgMzk0IDUxNSA1MDYgNTA2IDIwNyAyMDcgNTA2IDUwNiAyMDcgMjA3IDUwNiA1MDYgMjA3IDIwNyA1MDYgNTA2IDIwNyAyMDcgNTI2IDUyNiAyNDQgMjQ0IDUyNiA1MjYgNTI2IDUyNiA1MjYgNTI2IDI0NCAyNDQgNTI2IDUyNiA1NjMgNTI2IDUzMCA1MzAgMjgyIDM3NSAzODggMzg4IDM4OCA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNDMyIDQzMiA0MzIgNjM4IDU4OCA2MzggNTg4IDI0NCAyNDQgNDMyIDQzMiA2MzggNTg4IDI0NCAyNDQgNjM4IDU4OCA4MTIgODEyIDgxMiA4MTIgMjA3IDAgMCAwIDAgMCAwIDAgMTEyMyAxMDg0IDAgMCAwIDAgMCAwIDE5NCAzNzAgMCAwIDYwMCAwIDAgMCA4MjEgODIxIDUzMSA1MzEgMTA5OCAxMDk4IDg0NiA4NDYgNTQ0IDQ1MCA1MjYgMzk0IDQxMyAzMzggMjgyIDI0NCAzMjAgMjQ0IDI0NCAyNDQgMjQ0IDI0NCA4MTIgOTMzIDI0NyAwIDM0MiA0OTMgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA1NDQgNjAxIDU0NCA2MDEgNTQ0IDYwMSA1MjYgNTI2IDU0NCA2MDEgNTU2IDc1OCA2NTYgNTU2IDY1NiA1NTYgNzIyIDcyMiA1MDAgNzIyIDgxMCA2NTYgNTU2IDU1NyA2NjcgNjA0IDYxMSA3NzggNjI0IDg4MSAyMjIgMjc4IDY2NyA1MDAgMjIyIDUwMCA4OTEgNzIyIDU1NiA3NzggODY4IDY2NyA3NTQgNTU2IDY2NyA2NjcgNTAwIDYxOCAzODAgMjc4IDYxMSAyNzggNjExIDc0OCA3MjIgNzcyIDUwMCA2MTEgNTAwIDYxMSA2MTEgNTQ1IDU0NSA1NTYgNTU2IDQ1OCA0ODcgNTU2IDI2MCA0MTMgNTg0IDI3OCAxMzMzIDEyMjIgMTA0OSAxMDYyIDgzMyA0NTEgMTIyMiA5NDQgNzcxIDU1NiA2NjcgNTU2IDAgNjY3IDU1Nl0gMTc1Mls4ODkgNzc4IDU1NiA3NzggNTU2IDY2NyA1MDAgNzc4IDU1NiA3NzggNTU2IDYxMSA1NDUgMjIyIDEzMzMgMTIyMiAxMDQ5IDc3OCA1NTYgMTAzNCA2MTggNzIyIDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDI3OCAyNzggMjc4IDI3OCA3NzggNTU2IDc3OCA1NTYgNzIyIDMzMyA3MjIgMzMzIDcyMiA1NTYgNzIyIDU1NiA2NjcgNTAwIDYxMSAyNzggNTQ1IDQzNyA3MjIgNTU2IDcwNiA2MDQgNTY1IDYxMSA1MDAgNjY3IDU1NiA2NjcgNTU2IDc3OCA1NTYgMCA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA2NjcgNTAwIDU1NiA1NTYgNTU2IDU1NiA1MDAgNTAwIDU1NiA1NTYgNTU2IDczOSA0NTggNDU4IDYzMSA1MDcgMjc4IDU1NiA1NTYgNTU5IDUwMSA2MTcgNTU2IDU1NiA1NTYgMjIyIDIyMiAzNTYgMzI3IDMwNCAyMjIgNTcyIDgzMyA4MzMgODMzIDU1NiA1NTYgNTUzIDU1NiA3OTEgNzgxIDU1MCAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgNTQyIDU0MiA1MDAgMjIyIDI2MCAyMjIgMzQ5IDI3OCAyNzggNTU2IDU2OCA1NDcgNTAwIDcyMiA1MDAgNTIwIDUwMCA1NDEgNTQ1IDU0NSA1MDAgNTAwIDUwMCA1MDAgNzc4IDUzMSA1MDcgNTU5IDU1MiAzOTcgNTAwIDQwNCA1NTYgNTAwIDUwMCA5NjQgOTA2IDEwMDUgNzEyIDQyOSA3MTkgNzY0IDY2MSA2MzIgNDg1IDUyNyAzODMgMzgzIDE1OSAyNDAgMjQwIDI0MCAzNjQgNDgxIDMyMSAxOTEgMzU1IDIyMiAyMjIgMjIyIDMzMyAzMzMgMzQ5IDM0OSA1ODQgNTg0IDU4NCA1ODQgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDI3OCAyNzggMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMjIgMTU3IDM0MCAzMjggMzQ5IDM4MyAzODMgMzgzIDM4MyAzODMgMzMzIDMzMyAzMzMgMzMzIDMzMyA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgMzgzIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDM4MyA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDU0MiAzODMgNTQyIDU0MiA1NDIgNTQyIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMzMzIDMzMyAzMzMgNTc1IDU0NyA3NzIgOTU4IDc3MiA1NjAgNzgxIDYwMSA3NzggNTU2IDcyMiA1MDAgNjExIDQwNCA2MjUgNTI5IDc1NiA1NzcgODkxIDgzMyA2NzQgNTU2IDY3NCA1MDAgNjY3IDY2NyA2MDkgNTk2IDczNyA1NTQgNDY0IDQxMCA2MDEgNTczIDUwMCAyMjIgNzc4IDQ0MiA0NDIgNjY3IDcxOSA1NTYgNTU5IDEzMzggNjI0IDc3OCA2MTMgOTUwIDcxMyA2NjggNTAwIDg5NyA2OTUgODI5IDY4NSAxMDUzIDg2NyA2MDQgNDU4IDc5NiA2ODggNzc4IDU1NiA4MDMgNjMxIDgwMyA2MzEgMTA3NCA4OTYgODMzIDYxMiAxMTkxIDg1MiAwIDEzMzggNjI0IDcyMiA1MDAgNTAzIDAgMCAwIDAgMCAwIDcxOSA1NTkgNjU2IDUyMSA2NjcgNTU2IDY3MCA1NDkgNjA0IDQ1OCA1ODMgNDM4IDc0MiA1MzYgODc5IDY0OCAxMTM3IDg3MCA3NTMgNTIxIDcyMiA1MDAgNjExIDQ1OCA5MjUgNjkxIDY2NyA1MjEgODYxIDY2NiA4NjEgNjY2IDI3OCA5MjMgNjY5IDY2NyA1NTEgNjU2IDU4MyA3MjIgNTUyIDcyMiA1NTIgNjY3IDUyMSA4MzMgNjg4IDMzMyA2NjcgNTU2IDY2NyA1NTZdIDIzNDZbODg5IDY2NyA1NTYgNzUyIDU1NiA5MjMgNjY5IDYwNCA0NTggNjA0IDU0NSA3MTkgNTU5IDcxOSA1NTkgNzc4IDU1NiA3NzggNTU2IDcxOSA1MTAgNjM1IDUwMCA2MzUgNTAwIDYzNSA1MDAgNjY3IDUyMSA4ODUgNzE5IDY1NiA1NTYgOTY4IDg3NiA5NTYgODE1IDY2MyA1MDkgOTcwIDkxMCAxMDM0IDg3OCA3NzggNTU5IDc0NyA2NjYgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNzIyIDUwMCA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNjY3IDU1NiA2NjcgNTU2IDY2NyA1NTYgNjY3IDU1NiA2NjcgNTU2IDYxMSAyNzggNzc4IDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgMjc4IDIyMiAyNzggMjc4IDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDU1NiAyMjIgNTU2IDIyMiA1NTYgMjIyIDU1NiAyMjIgODMzIDgzMyA4MzMgODMzIDgzMyA4MzMgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA3NzggNTU2IDc3OCA1NTYgNzc4IDU1NiA3NzggNTU2IDY2NyA1NTYgNjY3IDU1NiA3MjIgMzMzIDcyMiAzMzMgNzIyIDMzMyA3MjIgMzMzIDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDY2NyA1MDAgNjY3IDUwMCA2MTEgMjc4IDYxMSAyNzggNjExIDI3OCA2MTEgMjc4IDcyMiA1NTYgNzIyIDU1NiA3MjIgNTU2IDcyMiA1NTYgNzIyIDU1NiA2NjcgNTAwIDY2NyA1MDAgOTQ0IDcyMiA5NDQgNzIyIDY2NyA1MDAgNjY3IDUwMCA2NjcgNTAwIDYxMSA1MDAgNjExIDUwMCA2MTEgNTAwIDU1NiAyNzggNzIyIDUwMCA1NTYgMjIyIDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNjY3IDY2NyA4MTMgODEzIDgxMyA4MTMgODEzIDgxMyA0NDYgNDQ2IDQ0NiA0NDYgNDQ2IDQ0NiA3NjUgNzY1IDkyOCA5MjggOTI4IDkyOCA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDgyMCA4MjAgMTAxNSAxMDE1IDEwMTUgMTAxNSAxMDE1IDEwMTUgMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDIyMiAzNzUgMzc1IDU3MSA1NzEgNTcxIDU3MSA1NzEgNTcxIDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDgyNyA4MjcgMTAyMiAxMDIyIDk3MyA5NzMgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA4MTMgOTYwIDEwMDkgOTYwIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzk2IDc5NiA5OTIgOTkyIDk0MyA5NDMgOTQzIDk0MyA1NzggNTc4IDQ0NiA0NDYgNTU2IDU1NiAyMjIgMjIyIDU1NiA1NTYgNTQ3IDU0NyA3ODEgNzgxIDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggNjY3IDY2NyA4MTMgODEzIDgxMyA4MTMgODEzIDgxMyA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDgyMCA4MjAgMTAxNSAxMDE1IDEwMTUgMTAxNSAxMDE1IDEwMTUgNzgxIDc4MSA3ODEgNzgxIDc4MSA3ODEgNzgxIDc4MSA3OTYgNzk2IDk5MiA5OTIgOTQzIDk0MyA5NDMgOTQzIDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA2NjcgNjY3IDY2NyA2NjcgNjY3IDMzMyAzMzMgMzMzIDMzMyAzMzMgNTU2IDU1NiA1NTYgNTU2IDU1NiA4MTMgODEzIDg2OSA4NjkgNzIyIDMzMyAzMzMgMzMzIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDI3OCAyNzggNDI0IDQyNCAzMzMgMzMzIDMzMyA1NDcgNTQ3IDU0NyA1NDcgNTY5IDU2OSA1NDcgNTQ3IDY2NyA2NjcgODYyIDg4NyA3NjUgMzMzIDMzMyAzMzMgNzgxIDc4MSA3ODEgNzgxIDc4MSA5MjQgODI3IDg5NCA3OTYgNzQ4IDMzMyAzMzMgNTU2IDcyMiA3MjIgODMzIDcyMiAxMTY0IDk0NCA2NjcgNjExXSAyODI0WzUwMCA1OTQgMCAwIDAgMCAyMjIgMjIyIDUyMSA2NjcgNjgyIDM0OSA2ODUgMzY3IDY4NyA2ODcgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMjc4IDMzMyAzMzMgMzMzIDMzMyAzOTcgMzk3IDMzMyAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNjY3IDU1NiA0OTYgNzQ4IDg4OSA1MzEgNTAwIDU1MSA1NTEgNDkwIDQ1OCAyMjIgNDIyIDUwMCA0MDEgNjg4IDU1OSA1NTYgNTAwIDYwOCA2MDggNjA4IDk0NCA0NTcgNTU2IDU1NiA1MjEgNTQyIDU0MiA0NTggNTQ3IDU5NyA3MzMgNTk3IDUwMCA3MjIgNTAwIDQ1OCA0MjcgNjA3IDM2NSA1MDAgNTQyIDUyMSA3MTMgNTgzIDQ1MyA2NjQgNDE1IDQxNSA0NDkgNDEwIDQxMCA0OTYgNDI5IDE2NyAzMTQgNDI1IDM1MiA1MTAgNDMwIDQyOSA1MTIgMzgyIDQxOCA0NTEgNDMzIDQyOSA2MjMgMzcyIDM3MiAzNzcgNjAwIDM3NyAzNzcgMzcyIDM3MiAzMTggMzE4IDM3NyAxNTcgMzM5IDU3MyAzODIgMzc3IDM1NCAzNzcgMzc3IDM3OCAyMjAgMzgyIDQwNyA1NzMgMzIxIDM5MSAzODUgMzIxIDM3OCA0NDAgMzQzIDE1NyAyNDAgMzgyIDMyMSAzODUgMzIxIDM3OSA0NDAgMzQzIDkzNiAxMzAwIDQzOSAxMjczIDY1NyAyMzkgNTQ0IDAgMCAwIDAgMCAwIDAgMCAwIDMzNyAzMzcgNDg5IDQ4OSA0NTAgMzk0IDQ1MCAzOTQgNzA5IDY1NSA3NDkgNjA3IDYwOSA3NDUgNjU2IDc4OSA1ODQgMCAwIDAgNTU2IDMzMyAzNTQgMjA3IDIwNyAyMDcgMjA3IDc5MyAxMjIxIDUwMF0gMzAyNFs1MDBdIDMwMjZbMzMzIDI1MCAxNjcgNTU2IDI3OCAyMDAgODMgMCA3MzcgNzIyIDgzMyA2ODggOTA4IDg4NyA4ODcgNjY3IDcyMiA1MDAgNTU2IDYxMSA1MDAgNTAwIDU4MSAwIDAgMCAwIDAgNTY5IDcyMiA3MjIgNzIyIDU0MiAzNjUgMCAwIDAgMzUzIDAgMjYzIDI4OSAwIDAgMCAwIDAgMCAwIDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA3MTMgNzEzIDI0NCAyNDQgNzEzIDcxMyAyNDQgMjQ0IDcxMyA3MTMgMjQ0IDI0NCA1NjMgNTI2IDUzMCA1MzAgNTYzIDUyNiA1MzAgNTMwIDMzNyAzMzcgMzM3IDMzNyA0ODkgNDg5IDgyMSA4MjEgNTMxIDUzMSA1NDQgNDUwIDUyNiAzOTQgNTQ0IDQ1MCA1MjYgMzk0IDU0NCA0NTAgNTI2IDM5NCA3ODkgNzg5IDI2OCAyNjMgNzg5IDc4OSAyNjggMjYzIDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgODEyIDkzMyAzOTQgNTE1IDMzOCAzMzggMzk0IDM5NCAzMzggMzM4IDM5NCAzOTQgNTI2IDUyNiAyNDQgMjQ0IDUyNiA1MjYgMjQ0IDI0NCA1MjYgNTI2IDI0NCAyNDQgNTA2IDUwNiAyMDcgMjA3IDQ4OSA0ODkgNDg5IDQ4OSA4MjEgODIxIDUzMSA1MzEgNTU2IDU1NiAyNzggODMzIDU1NiA1NTYgMzMzIDMzMyA1MDAgMjc4IDUwMCA1NTYgMzgwIDU1NyA3ODYgMjIyIDIyMiA1NTYgNTQ3IDU2OCA1NTYgNTU2IDI3OCA3MTMgNTAwIDIyMiA4MzMgNTU2IDU1NiAzMzMgNTAwIDM4NyA1MDAgNTAwIDUwMCA1NTYgNTU2IDU1NiA1NTYgNDU4IDQ1OCA2NTAgMjIyIDUwMCAyMjIgNTU2IDU0NSAzNzcgMzU0IDM0OCAzNzMgMzE4IDIyOSAyMjkgMzc3IDM4MyAxNTcgMTU3IDE1NyAxNTcgMjcxIDE1NyAxNTcgMjc1IDU3MiA1NzIgMzgyIDM4MiAzODIgMzc3IDM3NSAzNDAgMTU3IDIyMCAzODIgMzg4IDM3OCAzNTQgMzIxIDM1OCAzNTggMzU4IDM2OSAzNjQgMCAwIDAgMCAyNzggMzcyIDM3MiAzNzcgMzI4IDM3MiA3NzggNjY3IDU1NiA3MjIgMzMzIDU3OCA1NzggNTc4IDU3OCA1NzggNTc4IDU3OCA1NzggMjIyIDIyMiAyMjIgMjIyIDIyMiAyMjIgMjIyIDIyMiA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDU0NyA1NDcgNTQ3IDIyMiAyMjIgMjIyIDIyMiA1NDcgNTQ3IDU0NyA1NDcgNTQ0IDYwMSA0NTMgNjY3IDcyMiA2NjggNjY3IDU1NiA1MDAgMjIyIDczNyA1NTYgNzIyIDMzMyA2NjcgNTAwIDUwMCA1MDAgNTAwIDIyMiA1NDIgMzY1IDY2NyA1MDAgNjY3IDUwMCA2MDQgNDU4IDY1NiA1ODMgMCAwIDAgMCAwIDAgMCAwIDAgOTQzIDQ5MCA1MDAgNTU2IDIyMiA1NTYgNjY3IDcyMiA1NTYgMjc4IDcyMiA1NTYgNjY3IDUwMCA2MTEgNTAwIDUwMCA1NzcgNDI1IDY0OCAwIDAgMCAwIDAgMCAyMjIgNzIzIDcyMiA3MjMgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDc3OCA1NTYgOTQ0IDcyMiA3MDMgMCA3MzIgNTk3IDEwMzcgODQxIDI3OCA0MzggMTkxIDE5MSA1MDAgNTAwIDI3OCAyNzggMjc4IDMzMyAwIDAgMCAwIDAgMCAwIDAgNjExIDU1NiA1NTYgMzg0IDUzOSA1MzQgNTU2IDUzOSA1NjEgNTE5IDU1NiA1NTkgNTU2IDM4NyA1NTYgNTU2IDU1NiA1NTYgNTYyIDUyMyA1NTYgNTYwIDcyMSA3MjggNzQ2IDExNjEgNzQ2IDM3NiA2NTcgNzc4IDU1NiAyMjIgNDk2IDI1NSA1NTYgMjg5IDU1OSA1NTYgNTU2IDM3NiAyNTUgMjIyIDU1NSA1NjcgNTk1IDYxMyA1NTQgNTA0IDY0OCA2MTcgMjM5IDQzMSA1NjcgNDY3IDcyMiA2MTUgNjQ5IDU1MyA2NDkgNjA3IDU1MyA1MDggNjA4IDU1MSA3OTMgNTU0IDU1MyA1MDcgODIxIDgzMyA0NjcgNjQ5IDU1NCA2MTMgNTk1IDU1NSA1NTUgNTU1IDU1NSA1NTUgNTU1IDU5NSA1NTQgNTU0IDU1NCA1NTQgMjM5IDIzOSAyMzkgMjM5IDYxNSA2NDkgNjQ5IDY0OSA2NDkgNjQ5IDYwOCA2MDggNjA4IDYwOCA1NTMgNTU1IDU1NSA1NTUgNTk1IDU5NSA1OTUgNTk1IDYxMyA2MTMgNTU0IDU1NCA1NTQgNTU0IDU1NCA2NDggNjQ4IDY0OCA2NDggNjE3IDYxOCAyMzkgMjM5IDIzOSAyMzkgMjM5IDY1OCA0MzEgNTY3IDQ2NyA0NjcgNDY3IDQ2NyA2MTUgNjE1IDYxNSA2MjAgNjQ5IDY0OSA2NDkgNjA3IDYwNyA2MDcgNTUzIDU1MyA1NTMgNTUzIDU1MyA1MDggNTA4IDUwOCA1MDcgNjA4IDYwOCA2MDggNjA4IDYwOCA2MDggNzkzIDc5MyA3OTMgNzkzIDU1MyA1NTMgNTUzIDUwNyA1MDcgNTA3IDU1NSA4MjEgNjQ5IDU1NSA1NjcgNDYwIDU1NSA1NTQgNTA3IDYxNyA2NDkgMjM5IDU2NyA1NDQgNzIyIDYxNSA1MjMgNjQ5IDYxMiA1NTMgNTE4IDUwOCA1NTMgNjU5IDU1NCA2NTggNjQ5IDU1NSA1NTQgNjE3IDIzOSA2NDkgNTUzIDY0OSAyMzkgNTUzIDU1NCA3MTAgNDYwIDU5NyA1NTMgMjM5IDIzOSA0MzEgODY5IDgzOSA3MzEgNTExIDU0OCA2MTIgNTU1IDU2NSA1NjcgNDYwIDU1MSA1NTQgNzkxIDUxNSA2MTIgNjEyIDUxMSA1NTEgNzIyIDYxNyA2NDkgNjEyIDU1MyA1OTUgNTA4IDU0OCA2MzEgNTU0IDYwNyA1NjEgNzcwIDc2NSA2ODYgNzM4IDU0MiA1OTcgODM1IDYwNyAzOTIgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDMzMyAzMzMgMzMzIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzIxIDcyMSA3MjEgNzI4IDcyOCA3MjggNzI4IDcyOCA3MjggNzI4IDcyOCA3MjggNzI4IDcyOCA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgNzQ2IDc0NiA3NDYgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgNTExIDM3NiAzNzYgMzc2IDI1NSAyNTUgMzAxIDMzMSAyNTUgMzc2IDM3NiAzNzYgMzc2IDM3NiAzNzYgMzc2IDM3NiA2NTcgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgMjIyIDQ5NiAyNTUgMjU1IDMwMSAzMzEgMjU1IDI4OSAyODkgMzc1IDI4OSA1NTkgNTU5IDU1OSA1NTkgNTc4IDMzMyAzMzMgMzMzIDMzMyA2MTYgNjE2IDYxNiA3NTUgNjA0IDczNiAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAyNjkgMjY5IDI2OSAxNTczIDE3NTYgMCAxODUzIDAgMCAwIDAgNTYzIDUyNiA1MzAgNTMwIDU2MyA1MjYgNTMwIDUzMCA4MjEgODIxIDUzMSA1MzEgNDg5IDQ4OSA1NjMgNTI2IDUzMCA1MzAgMjA3IDIyOSAyMDcgMjI5IDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDI0NCAyNDQgNjM4IDU4OCAyNDQgMjQ0IDQzMiA0MzIgNDMyIDQzMiA4MTIgODEyIDgxMiA4MTIgNTYzIDUyNiA1MzAgNTMwIDgyMSA4MjEgNTMxIDUzMSA4MjEgODIxIDUzMSA1MzEgNjAxIDYwMSAzOTQgMzk0IDU4OCA2MjUgNTczIDYxMSA5MjAgNzMxIDg4MiA2MzQgMTQ2NCAwIDAgMCAwIDAgNjM4IDU4OCAyNDQgMjQ0IDgxMiA5MzMgMzk0IDUxNSA4MTIgOTMzIDM5NCA1MTUgNjM4IDU4OCAyNDQgMjQ0IDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDI0NCAyNDQgMCA1NzcgNDc1IDYxMSA0NTggNzE5IDU4NCA2NjcgNTU2IDEzMDAgNTU2IDY2NyA5NjAgNzYwIDc4OCA3MTggOTU4IDg1NiA2NjcgNTAwIDEwNjggODg0IDExMzIgODUxIDcyMiA1NDIgNzA1IDU1NCAyNzggMjc4IDU1NyA3NjcgMzk4IDU5MSA1NTcgNjY4IDU3NiA4MzMgNjY3IDczMiA2OTUgMzMzIDU1NiA0OTAgMTU5IDMyMSA2NjcgNjExIDI3OCA3NzkgMTQxNyAxMDM2IDEzODEgMTg1MyAyMDcgMjA3IDIwNyAyMjkgMjA3IDIwNyAyMDcgMjA3IDI5MCAyMDcgMjA3IDIwNyAyMDcgMjA3IDIwNyAyMDcgMjA3IDIwNyAyMDcgMjA3IDI0NCAyNDQgMjQ0IDI0NCAyNDQgMjcyIDI0NCAyMDAgMzQzIDM0MyA1NTYgMzY0IDM2NCA1MTkgNTE5IDYzOCA2MzggNjM4IDYzOCA2MzggNjM4IDYzOCA2MzggNTYzIDU2MyA0ODcgNTYzIDU2MyA0ODcgNzEzIDcxMyAyNDQgMjQ0IDU2MyA1MjYgNTMwIDUzMCA1ODIgNTgyIDU4MiA1ODIgNzg5IDc4OSAyNjggMjYzIDU4MiA1ODIgMjY4IDI2MyA1MDYgNTA2IDIwNyAyMDcgMzM4IDMzOCAzOTQgMzk0IDYzOCA1ODggMjQ0IDI0NCA2MzggNTg4IDI0NCAyNDQgNDY0IDQ2NCA0MzIgNDMyIDQyNyA0MjcgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNTQ0IDYwMSAwIDM5OSA1MDggNjAyIDY0MyAwIDAgMzE5IDMxOSA1MzMgNTMwIDUzMyA1MzAgNTMzIDUzMCA1MzQgNTMzIDUzMCA1ODIgMzE5IDM5NCAyNzMgMTg1IDAgNzkzIDczOSA3MjUgNzE2IDcxOCA3MjUgNzA5IDU5OCA3MjQgODA3IDcxNiA2NTkgNTI4IDkyNCA3NjcgNjk1IDYxNiA3MDYgNzE4IDcwMCA3NTQgNzE2IDcwOCA3MDAgNzI1IDY5OSA3OTIgNzM4IDc2NCA3MjUgNjk4IDY2MCA2NzggNjc3IDUxNiA3NjIgNjg2IDc4MiA3NjIgMjc0IDIyMiAxNjkgMjAwIDI2NSAyMzEgNTE0IDgzMyA1NTEgNTgwIDU4MyA1NTMgNTUwIDQ5MiA1NTEgNjY3IDU4MCA1NTEgMjIwIDgzNCA1NDIgNTUzIDU1MSA1MjMgNTUzIDU1OSA1NTEgMjIwIDU1MyA0NTYgNTUxIDM0NyA4MzMgNTE3IDU2NCA1NTEgNTUxIDgzMSA1NTEgNTU1IDM5NCA4MzEgNTUwIDU1NSA3NDQgNzEzIDI3OCAzMjQgMTAwMSAxMDAxIDcyNyAxMTA0IDExMDQgMTEwMiAxMTA0IDEzODUgNTU2XSA0MTk4WzAgMCA3MTMgNzEzIDI0NCAyNDQgMTcxIDMzNyAzMzcgMTA5OCAxMDk4IDg0NiA4NDYgODEyIDkzMyAzOTQgNTE1IDI4MiAxOTcgNDg5IDQ4OSAwIDUwMCA3MjIgNTUyIDEzMzAgMTA2OSA2NjcgNTY1IDY1NiA1ODMgODMwIDc4NiA1MzQgNzUzIDc1MyA1MzcgNzQzIDc5NF1dPj4KZW5kb2JqCjY0NCAwIG9iagpbNTUgMCBSXQplbmRvYmoKNTg1IDAgb2JqCjw8L0Jhc2VGb250L0FNUEFOTytBcmlhbE1UL0Rlc2NlbmRhbnRGb250cyA2NDQgMCBSL0VuY29kaW5nL0lkZW50aXR5LUgvU3VidHlwZS9UeXBlMC9Ub1VuaWNvZGUgNTk5IDAgUi9UeXBlL0ZvbnQ+PgplbmRvYmoKNjQ1IDAgb2JqCls2MzggMCBSXQplbmRvYmoKNTg2IDAgb2JqCjw8L0Jhc2VGb250L1NDTURLRCtBcmlhbC9EZXNjZW5kYW50Rm9udHMgNjQ1IDAgUi9FbmNvZGluZy9JZGVudGl0eS1IL1N1YnR5cGUvVHlwZTAvVG9Vbmljb2RlIDYwMCAwIFIvVHlwZS9Gb250Pj4KZW5kb2JqCjY0NiAwIG9iagpbNjM4IDAgUl0KZW5kb2JqCjU4NyAwIG9iago8PC9CYXNlRm9udC9LTlBTSVUrQXJpYWwvRGVzY2VuZGFudEZvbnRzIDY0NiAwIFIvRW5jb2RpbmcvSWRlbnRpdHktSC9TdWJ0eXBlL1R5cGUwL1RvVW5pY29kZSA2MDEgMCBSL1R5cGUvRm9udD4+CmVuZG9iago2NDcgMCBvYmoKPDwvQXNjZW50IDEwNTYvQ2FwSGVpZ2h0IDcxNi9EZXNjZW50IC0zNzYvRmxhZ3MgMzIvRm9udEJCb3hbLTYyOCAtMzc2IDIwMDAgMTA1Nl0vRm9udEZhbWlseShBcmlhbCkvRm9udE5hbWUvQXJpYWwtQm9sZE1UL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDcwMC9JdGFsaWNBbmdsZSAwL1N0ZW1WIDEzNi9UeXBlL0ZvbnREZXNjcmlwdG9yL1hIZWlnaHQgNTE5Pj4KZW5kb2JqCjQ0IDAgb2JqCjw8L0Jhc2VGb250L0FyaWFsLUJvbGRNVC9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRmlyc3RDaGFyIDAvRm9udERlc2NyaXB0b3IgNjQ3IDAgUi9MYXN0Q2hhciAyNTUvU3VidHlwZS9UcnVlVHlwZS9UeXBlL0ZvbnQvV2lkdGhzWzc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgMjc4IDMzMyA0NzQgNTU2IDU1NiA4ODkgNzIyIDIzOCAzMzMgMzMzIDM4OSA1ODQgMjc4IDMzMyAyNzggMjc4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAzMzMgMzMzIDU4NCA1ODQgNTg0IDYxMSA5NzUgNzIyIDcyMiA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTU2IDcyMiA2MTEgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgNjY3IDk0NCA2NjcgNjY3IDYxMSAzMzMgMjc4IDMzMyA1ODQgNTU2IDMzMyA1NTYgNjExIDU1NiA2MTEgNTU2IDMzMyA2MTEgNjExIDI3OCAyNzggNTU2IDI3OCA4ODkgNjExIDYxMSA2MTEgNjExIDM4OSA1NTYgMzMzIDYxMSA1NTYgNzc4IDU1NiA1NTYgNTAwIDM4OSAyODAgMzg5IDU4NCAzNTAgNTU2IDM1MCAyNzggNTU2IDUwMCAxMDAwIDU1NiA1NTYgMzMzIDEwMDAgNjY3IDMzMyAxMDAwIDM1MCA2MTEgMzUwIDM1MCAyNzggMjc4IDUwMCA1MDAgMzUwIDU1NiAxMDAwIDMzMyAxMDAwIDU1NiAzMzMgOTQ0IDM1MCA1MDAgNjY3IDI3OCAzMzMgNTU2IDU1NiA1NTYgNTU2IDI4MCA1NTYgMzMzIDczNyAzNzAgNTU2IDU4NCAzMzMgNzM3IDU1MiA0MDAgNTQ5IDMzMyAzMzMgMzMzIDU3NiA1NTYgMzMzIDMzMyAzMzMgMzY1IDU1NiA4MzQgODM0IDgzNCA2MTEgNzIyIDcyMiA3MjIgNzIyIDcyMiA3MjIgMTAwMCA3MjIgNjY3IDY2NyA2NjcgNjY3IDI3OCAyNzggMjc4IDI3OCA3MjIgNzIyIDc3OCA3NzggNzc4IDc3OCA3NzggNTg0IDc3OCA3MjIgNzIyIDcyMiA3MjIgNjY3IDY2NyA2MTEgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODg5IDU1NiA1NTYgNTU2IDU1NiA1NTYgMjc4IDI3OCAyNzggMjc4IDYxMSA2MTEgNjExIDYxMSA2MTEgNjExIDYxMSA1NDkgNjExIDYxMSA2MTEgNjExIDYxMSA1NTYgNjExIDU1Nl0+PgplbmRvYmoKNjQ4IDAgb2JqCjw8L0FzY2VudCAxMDQwL0NhcEhlaWdodCA3MTYvRGVzY2VudCAtMzI1L0ZsYWdzIDMyL0ZvbnRCQm94Wy02NjUgLTMyNSAyMDAwIDEwNDBdL0ZvbnRGYW1pbHkoQXJpYWwpL0ZvbnROYW1lL0FyaWFsTVQvRm9udFN0cmV0Y2gvTm9ybWFsL0ZvbnRXZWlnaHQgNDAwL0l0YWxpY0FuZ2xlIDAvU3RlbVYgODgvVHlwZS9Gb250RGVzY3JpcHRvci9YSGVpZ2h0IDUxOT4+CmVuZG9iago0NSAwIG9iago8PC9CYXNlRm9udC9BcmlhbE1UL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9GaXJzdENoYXIgMC9Gb250RGVzY3JpcHRvciA2NDggMCBSL0xhc3RDaGFyIDI1NS9TdWJ0eXBlL1RydWVUeXBlL1R5cGUvRm9udC9XaWR0aHNbNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCA3NTAgNzUwIDc1MCAyNzggMjc4IDM1NSA1NTYgNTU2IDg4OSA2NjcgMTkxIDMzMyAzMzMgMzg5IDU4NCAyNzggMzMzIDI3OCAyNzggNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDI3OCAyNzggNTg0IDU4NCA1ODQgNTU2IDEwMTUgNjY3IDY2NyA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTAwIDY2NyA1NTYgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgNjY3IDk0NCA2NjcgNjY3IDYxMSAyNzggMjc4IDI3OCA0NjkgNTU2IDMzMyA1NTYgNTU2IDUwMCA1NTYgNTU2IDI3OCA1NTYgNTU2IDIyMiAyMjIgNTAwIDIyMiA4MzMgNTU2IDU1NiA1NTYgNTU2IDMzMyA1MDAgMjc4IDU1NiA1MDAgNzIyIDUwMCA1MDAgNTAwIDMzNCAyNjAgMzM0IDU4NCAzNTAgNTU2IDM1MCAyMjIgNTU2IDMzMyAxMDAwIDU1NiA1NTYgMzMzIDEwMDAgNjY3IDMzMyAxMDAwIDM1MCA2MTEgMzUwIDM1MCAyMjIgMjIyIDMzMyAzMzMgMzUwIDU1NiAxMDAwIDMzMyAxMDAwIDUwMCAzMzMgOTQ0IDM1MCA1MDAgNjY3IDI3OCAzMzMgNTU2IDU1NiA1NTYgNTU2IDI2MCA1NTYgMzMzIDczNyAzNzAgNTU2IDU4NCAzMzMgNzM3IDU1MiA0MDAgNTQ5IDMzMyAzMzMgMzMzIDU3NiA1MzcgMzMzIDMzMyAzMzMgMzY1IDU1NiA4MzQgODM0IDgzNCA2MTEgNjY3IDY2NyA2NjcgNjY3IDY2NyA2NjcgMTAwMCA3MjIgNjY3IDY2NyA2NjcgNjY3IDI3OCAyNzggMjc4IDI3OCA3MjIgNzIyIDc3OCA3NzggNzc4IDc3OCA3NzggNTg0IDc3OCA3MjIgNzIyIDcyMiA3MjIgNjY3IDY2NyA2MTEgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgODg5IDUwMCA1NTYgNTU2IDU1NiA1NTYgMjc4IDI3OCAyNzggMjc4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NDkgNjExIDU1NiA1NTYgNTU2IDU1NiA1MDAgNTU2IDUwMF0+PgplbmRvYmoKNTc5IDAgb2JqCjw8L0NTIDYzNSAwIFIvUy9UcmFuc3BhcmVuY3k+PgplbmRvYmoKeHJlZgowIDY0OQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDA2Nzg4MCAwMDAwMCBuIAowMDAwMDAwMzAwIDAwMDAwIG4gCjAwMDAwNjIzNDggMDAwMDAgbiAKMDAwMDAwMDU4MCAwMDAwMCBuIAowMDAwMDAwODcwIDAwMDAwIG4gCjAwMDAwMDExNTUgMDAwMDAgbiAKMDAwMDAwMTQzOSAwMDAwMCBuIAowMDAwMDAxNzE5IDAwMDAwIG4gCjAwMDAwMDIwMjUgMDAwMDAgbiAKMDAwMDAwMjMwOCAwMDAwMCBuIAowMDAwMDAyNTkwIDAwMDAwIG4gCjAwMDAwMDI4NjQgMDAwMDAgbiAKMDAwMDAwMzE0MSAwMDAwMCBuIAowMDAwMDAzNDMyIDAwMDAwIG4gCjAwMDAwMDM3MTMgMDAwMDAgbiAKMDAwMDAwMzk5OCAwMDAwMCBuIAowMDAwMDA0Mjc4IDAwMDAwIG4gCjAwMDAwMDQ1NjIgMDAwMDAgbiAKMDAwMDAwNDg0NyAwMDAwMCBuIAowMDAwMDA1MTIzIDAwMDAwIG4gCjAwMDAwMDU0MTUgMDAwMDAgbiAKMDAwMDAwNTY5OSAwMDAwMCBuIAowMDAwMDA1OTc5IDAwMDAwIG4gCjAwMDAwMDYyNzAgMDAwMDAgbiAKMDAwMDAwNjU1NyAwMDAwMCBuIAowMDAwMDA2ODMzIDAwMDAwIG4gCjAwMDAwMDcxMzcgMDAwMDAgbiAKMDAwMDAwNzQ0MCAwMDAwMCBuIAowMDAwMDA3NzIxIDAwMDAwIG4gCjAwMDAwMDgwMTYgMDAwMDAgbiAKMDAwMDAwODMxMyAwMDAwMCBuIAowMDAwMDA4NjAzIDAwMDAwIG4gCjAwMDAwMDg4NzcgMDAwMDAgbiAKMDAwMDAwOTA2MiAwMDAwMCBuIAowMDAwMDA5MjQ2IDAwMDAwIG4gCjAwMDAwMDk2MzIgMDAwMDAgbiAKMDAwMDAxMzM4OCAwMDAwMCBuIAowMDAwMDYyMDQ3IDAwMDAwIG4gCjAwMDAwMTM2NjcgMDAwMDAgbiAKMDAwMDEwMzIxMCAwMDAwMCBuIAowMDAwMTc4MDk5IDAwMDAwIG4gCjAwMDAwNjI1NzAgMDAwMDAgbiAKMDAwMDIxMjk1NiAwMDAwMCBuIAowMDAwMjE0MzYxIDAwMDAwIG4gCjAwMDAwNjI2OTkgMDAwMDAgbiAKMDAwMDAxNTIxNyAwMDAwMCBuIAowMDAwMDE1NTQwIDAwMDAwIG4gCjAwMDAwMTU3MDggMDAwMDAgbiAKMDAwMDA2NTI0MiAwMDAwMCBuIAowMDAwMDY1NDc1IDAwMDAwIG4gCjAwMDAwNjUwNzQgMDAwMDAgbiAKMDAwMDA2MjQzNyAwMDAwMCBuIAowMDAwMDYyMDkzIDAwMDAwIG4gCjAwMDAxOTU4NjEgMDAwMDAgbiAKMDAwMDA2MjExOCAwMDAwMCBuIAowMDAwMDYzODgyIDAwMDAwIG4gCjAwMDAwNjY1MzcgMDAwMDAgbiAKMDAwMDA2NjQ0NSAwMDAwMCBuIAowMDAwMDY1Njg3IDAwMDAwIG4gCjAwMDAwNjU3NTUgMDAwMDAgbiAKMDAwMDA2NTg1OSAwMDAwMCBuIAowMDAwMDY2MzkwIDAwMDAwIG4gCjAwMDAwNjYxODkgMDAwMDAgbiAKMDAwMDA2NTk2NyAwMDAwMCBuIAowMDAwMDY2MDIyIDAwMDAwIG4gCjAwMDAwNjYxMzQgMDAwMDAgbiAKMDAwMDEwMzQzNSAwMDAwMCBuIAowMDAwMDY2MzM1IDAwMDAwIG4gCjAwMDAxNzE2OTggMDAwMDAgbiAKMDAwMDE3NDUzNSAwMDAwMCBuIAowMDAwMDY2NjczIDAwMDAwIG4gCjAwMDAwNjkyMzggMDAwMDAgbiAKMDAwMDA2ODA0NiAwMDAwMCBuIAowMDAwMDY3OTY5IDAwMDAwIG4gCjAwMDAwNjk1MDIgMDAwMDAgbiAKMDAwMDA2OTYyMSAwMDAwMCBuIAowMDAwMDY5NjQyIDAwMDAwIG4gCjAwMDAwNjk3MzEgMDAwMDAgbiAKMDAwMDA2OTc3NiAwMDAwMCBuIAowMDAwMDgzNjQwIDAwMDAwIG4gCjAwMDAxMDI5NzUgMDAwMDAgbiAKMDAwMDA5MzE0MyAwMDAwMCBuIAowMDAwMDkzNDEzIDAwMDAwIG4gCjAwMDAwOTMwNjEgMDAwMDAgbiAKMDAwMDA3ODAzMyAwMDAwMCBuIAowMDAwMDc3ODE4IDAwMDAwIG4gCjAwMDAwNzAwOTkgMDAwMDAgbiAKMDAwMDA3MTA4MCAwMDAwMCBuIAowMDAwMDgzNzIzIDAwMDAwIG4gCjAwMDAwODM3ODcgMDAwMDAgbiAKMDAwMDA4Mzg1MSAwMDAwMCBuIAowMDAwMDgzOTMwIDAwMDAwIG4gCjAwMDAwODQwMDkgMDAwMDAgbiAKMDAwMDA4NDA4OSAwMDAwMCBuIAowMDAwMDg0MTY5IDAwMDAwIG4gCjAwMDAwODQyMjkgMDAwMDAgbiAKMDAwMDA4NDMwMiAwMDAwMCBuIAowMDAwMDg0MzgyIDAwMDAwIG4gCjAwMDAwODQ0NDMgMDAwMDAgbiAKMDAwMDA4NDUyNSAwMDAwMCBuIAowMDAwMDg0NjA3IDAwMDAwIG4gCjAwMDAwODQ2ODkgMDAwMDAgbiAKMDAwMDA4NDc3MSAwMDAwMCBuIAowMDAwMDg0ODUzIDAwMDAwIG4gCjAwMDAwODQ5MzUgMDAwMDAgbiAKMDAwMDA4NTAxNyAwMDAwMCBuIAowMDAwMDg1MDk5IDAwMDAwIG4gCjAwMDAwODUxNjEgMDAwMDAgbiAKMDAwMDA4NTI0MyAwMDAwMCBuIAowMDAwMDg1MzI1IDAwMDAwIG4gCjAwMDAwODUzODcgMDAwMDAgbiAKMDAwMDA4NTQ2OSAwMDAwMCBuIAowMDAwMDg1NTUxIDAwMDAwIG4gCjAwMDAwODU2MzMgMDAwMDAgbiAKMDAwMDA4NTcxNSAwMDAwMCBuIAowMDAwMDg1Nzk3IDAwMDAwIG4gCjAwMDAwODU4NzkgMDAwMDAgbiAKMDAwMDA4NTk0MSAwMDAwMCBuIAowMDAwMDg2MDIzIDAwMDAwIG4gCjAwMDAwODYxMDUgMDAwMDAgbiAKMDAwMDA4NjE4NyAwMDAwMCBuIAowMDAwMDg2MjY5IDAwMDAwIG4gCjAwMDAwODYzNTEgMDAwMDAgbiAKMDAwMDA4NjQzMyAwMDAwMCBuIAowMDAwMDg2NTE1IDAwMDAwIG4gCjAwMDAwODY1OTcgMDAwMDAgbiAKMDAwMDA4NjY1OSAwMDAwMCBuIAowMDAwMDg2NzQxIDAwMDAwIG4gCjAwMDAwODY4MjMgMDAwMDAgbiAKMDAwMDA4NjkwNSAwMDAwMCBuIAowMDAwMDg2OTY3IDAwMDAwIG4gCjAwMDAwODcwNDkgMDAwMDAgbiAKMDAwMDA4NzEzMSAwMDAwMCBuIAowMDAwMDg3MjEzIDAwMDAwIG4gCjAwMDAwODcyNzUgMDAwMDAgbiAKMDAwMDA4NzM1NyAwMDAwMCBuIAowMDAwMDg3NDM5IDAwMDAwIG4gCjAwMDAwODc1MjEgMDAwMDAgbiAKMDAwMDA4NzYwMyAwMDAwMCBuIAowMDAwMDg3NjY1IDAwMDAwIG4gCjAwMDAwODc3NDcgMDAwMDAgbiAKMDAwMDA4NzgyOSAwMDAwMCBuIAowMDAwMDg3OTExIDAwMDAwIG4gCjAwMDAwODc5OTggMDAwMDAgbiAKMDAwMDA4ODA2MCAwMDAwMCBuIAowMDAwMDg4MTQ0IDAwMDAwIG4gCjAwMDAwODgyMjggMDAwMDAgbiAKMDAwMDA4ODI5MCAwMDAwMCBuIAowMDAwMDg4MzcyIDAwMDAwIG4gCjAwMDAwODg0NTQgMDAwMDAgbiAKMDAwMDA4ODUxNiAwMDAwMCBuIAowMDAwMDg4NTg2IDAwMDAwIG4gCjAwMDAwODg2NjggMDAwMDAgbiAKMDAwMDA4ODczMCAwMDAwMCBuIAowMDAwMDg4ODEyIDAwMDAwIG4gCjAwMDAwODg4OTQgMDAwMDAgbiAKMDAwMDA4ODk3NiAwMDAwMCBuIAowMDAwMDg5MDU4IDAwMDAwIG4gCjAwMDAwODkxNDAgMDAwMDAgbiAKMDAwMDA4OTIyMiAwMDAwMCBuIAowMDAwMDg5Mjg0IDAwMDAwIG4gCjAwMDAwODkzNzEgMDAwMDAgbiAKMDAwMDA4OTQ1MyAwMDAwMCBuIAowMDAwMDg5NTM1IDAwMDAwIG4gCjAwMDAwODk2MTcgMDAwMDAgbiAKMDAwMDA4OTY5OSAwMDAwMCBuIAowMDAwMDg5NzgxIDAwMDAwIG4gCjAwMDAwODk4NjMgMDAwMDAgbiAKMDAwMDA4OTk0NSAwMDAwMCBuIAowMDAwMDkwMDI3IDAwMDAwIG4gCjAwMDAwOTAwODkgMDAwMDAgbiAKMDAwMDA5MDE3MSAwMDAwMCBuIAowMDAwMDkwMjUzIDAwMDAwIG4gCjAwMDAwOTAzMTUgMDAwMDAgbiAKMDAwMDA5MDM4NSAwMDAwMCBuIAowMDAwMDkwNDY3IDAwMDAwIG4gCjAwMDAwOTA1MjkgMDAwMDAgbiAKMDAwMDA5MDYxMSAwMDAwMCBuIAowMDAwMDkwNjkzIDAwMDAwIG4gCjAwMDAwOTA3NzUgMDAwMDAgbiAKMDAwMDA5MDg1NyAwMDAwMCBuIAowMDAwMDkwOTM5IDAwMDAwIG4gCjAwMDAwOTEwMjEgMDAwMDAgbiAKMDAwMDA5MTEwNCAwMDAwMCBuIAowMDAwMDkxMTg3IDAwMDAwIG4gCjAwMDAwOTEyNzAgMDAwMDAgbiAKMDAwMDA5MTM1MyAwMDAwMCBuIAowMDAwMDkxNDM2IDAwMDAwIG4gCjAwMDAwOTE1MjAgMDAwMDAgbiAKMDAwMDA5MTYwNCAwMDAwMCBuIAowMDAwMDkxNjg4IDAwMDAwIG4gCjAwMDAwOTE3NzIgMDAwMDAgbiAKMDAwMDA5MTgzNiAwMDAwMCBuIAowMDAwMDkxOTIwIDAwMDAwIG4gCjAwMDAwOTIwMDQgMDAwMDAgbiAKMDAwMDA5MjA4OCAwMDAwMCBuIAowMDAwMDkyMTcyIDAwMDAwIG4gCjAwMDAwOTIyNTYgMDAwMDAgbiAKMDAwMDA5MjM0MCAwMDAwMCBuIAowMDAwMDkyNDI5IDAwMDAwIG4gCjAwMDAwOTI1MTMgMDAwMDAgbiAKMDAwMDA5MjU5NyAwMDAwMCBuIAowMDAwMDkyNjgxIDAwMDAwIG4gCjAwMDAwOTI3NDUgMDAwMDAgbiAKMDAwMDA5MjgyOSAwMDAwMCBuIAowMDAwMDkyOTEzIDAwMDAwIG4gCjAwMDAwOTI5OTcgMDAwMDAgbiAKMDAwMDA3MTcxMyAwMDAwMCBuIAowMDAwMDcxNzkzIDAwMDAwIG4gCjAwMDAwNzE4NzMgMDAwMDAgbiAKMDAwMDA3MTkzMyAwMDAwMCBuIAowMDAwMDcyMDA2IDAwMDAwIG4gCjAwMDAwNzIwODYgMDAwMDAgbiAKMDAwMDA3MjE0NiAwMDAwMCBuIAowMDAwMDcyMjI2IDAwMDAwIG4gCjAwMDAwNzIyODYgMDAwMDAgbiAKMDAwMDA3MjM2NiAwMDAwMCBuIAowMDAwMDcyNDQ2IDAwMDAwIG4gCjAwMDAwNzI1MjggMDAwMDAgbiAKMDAwMDA3MjYxMCAwMDAwMCBuIAowMDAwMDcyNjkyIDAwMDAwIG4gCjAwMDAwNzI3NTQgMDAwMDAgbiAKMDAwMDA3MjgzNiAwMDAwMCBuIAowMDAwMDcyOTE4IDAwMDAwIG4gCjAwMDAwNzMwMDAgMDAwMDAgbiAKMDAwMDA3MzA4MiAwMDAwMCBuIAowMDAwMDczMTY0IDAwMDAwIG4gCjAwMDAwNzMyNDYgMDAwMDAgbiAKMDAwMDA3MzMwOCAwMDAwMCBuIAowMDAwMDczMzkwIDAwMDAwIG4gCjAwMDAwNzM0NzIgMDAwMDAgbiAKMDAwMDA3MzU1NCAwMDAwMCBuIAowMDAwMDczNjM2IDAwMDAwIG4gCjAwMDAwNzM3MTggMDAwMDAgbiAKMDAwMDA3MzgwMCAwMDAwMCBuIAowMDAwMDczODYyIDAwMDAwIG4gCjAwMDAwNzM5NDQgMDAwMDAgbiAKMDAwMDA3NDAyNiAwMDAwMCBuIAowMDAwMDc0MTA4IDAwMDAwIG4gCjAwMDAwNzQxOTAgMDAwMDAgbiAKMDAwMDA3NDI3MiAwMDAwMCBuIAowMDAwMDc0MzU0IDAwMDAwIG4gCjAwMDAwNzQ0MTYgMDAwMDAgbiAKMDAwMDA3NDQ5OCAwMDAwMCBuIAowMDAwMDc0NTYwIDAwMDAwIG4gCjAwMDAwNzQ2NDIgMDAwMDAgbiAKMDAwMDA3NDczNCAwMDAwMCBuIAowMDAwMDc0ODI2IDAwMDAwIG4gCjAwMDAwNzQ5MTggMDAwMDAgbiAKMDAwMDA3NTAxMCAwMDAwMCBuIAowMDAwMDc1MTAyIDAwMDAwIG4gCjAwMDAwNzUxOTQgMDAwMDAgbiAKMDAwMDA3NTI4NiAwMDAwMCBuIAowMDAwMDc1Mzc4IDAwMDAwIG4gCjAwMDAwNzU0NzAgMDAwMDAgbiAKMDAwMDA3NTU2MiAwMDAwMCBuIAowMDAwMDc1NjU0IDAwMDAwIG4gCjAwMDAwNzU3NDYgMDAwMDAgbiAKMDAwMDA3NTgzOCAwMDAwMCBuIAowMDAwMDc1OTMwIDAwMDAwIG4gCjAwMDAwNzYwMjIgMDAwMDAgbiAKMDAwMDA3NjExNCAwMDAwMCBuIAowMDAwMDc2MTc2IDAwMDAwIG4gCjAwMDAwNzYyNTggMDAwMDAgbiAKMDAwMDA3NjM0MCAwMDAwMCBuIAowMDAwMDc2NDIyIDAwMDAwIG4gCjAwMDAwNzY1MDQgMDAwMDAgbiAKMDAwMDA3NjU4NiAwMDAwMCBuIAowMDAwMDc2NjY4IDAwMDAwIG4gCjAwMDAwNzY3MzAgMDAwMDAgbiAKMDAwMDA3NjgxMiAwMDAwMCBuIAowMDAwMDc2ODc0IDAwMDAwIG4gCjAwMDAwNzY5NTYgMDAwMDAgbiAKMDAwMDA3NzAzOCAwMDAwMCBuIAowMDAwMDc3MTIwIDAwMDAwIG4gCjAwMDAwNzcyMDIgMDAwMDAgbiAKMDAwMDA3NzI4NCAwMDAwMCBuIAowMDAwMDc3MzQ2IDAwMDAwIG4gCjAwMDAwNzc0MjggMDAwMDAgbiAKMDAwMDA3NzUxMCAwMDAwMCBuIAowMDAwMDc3NTkyIDAwMDAwIG4gCjAwMDAwNzc2NzQgMDAwMDAgbiAKMDAwMDA3Nzc1NiAwMDAwMCBuIAowMDAwMDgzNTkyIDAwMDAwIG4gCjAwMDAwODAwMDIgMDAwMDAgbiAKMDAwMDA4MzU0NCAwMDAwMCBuIAowMDAwMDc4MjcwIDAwMDAwIG4gCjAwMDAwODM0NzkgMDAwMDAgbiAKMDAwMDA3OTk0NiAwMDAwMCBuIAowMDAwMDgzNDMxIDAwMDAwIG4gCjAwMDAwNzgzMjUgMDAwMDAgbiAKMDAwMDA4MzM2NiAwMDAwMCBuIAowMDAwMDc5ODk5IDAwMDAwIG4gCjAwMDAwNzgzODAgMDAwMDAgbiAKMDAwMDA4MzMxOCAwMDAwMCBuIAowMDAwMDc5ODE5IDAwMDAwIG4gCjAwMDAwODMyNzAgMDAwMDAgbiAKMDAwMDA4MzIyMiAwMDAwMCBuIAowMDAwMDgzMTc0IDAwMDAwIG4gCjAwMDAwODMxMjYgMDAwMDAgbiAKMDAwMDA3ODQzNSAwMDAwMCBuIAowMDAwMDgzMDc4IDAwMDAwIG4gCjAwMDAwNzk3MzEgMDAwMDAgbiAKMDAwMDA4MzAzMCAwMDAwMCBuIAowMDAwMDgyOTgyIDAwMDAwIG4gCjAwMDAwODI5MzQgMDAwMDAgbiAKMDAwMDA4Mjg4NiAwMDAwMCBuIAowMDAwMDgyODM4IDAwMDAwIG4gCjAwMDAwNzg0OTAgMDAwMDAgbiAKMDAwMDA4Mjc5MCAwMDAwMCBuIAowMDAwMDc5NjQzIDAwMDAwIG4gCjAwMDAwODI3NDIgMDAwMDAgbiAKMDAwMDA4MjY5NCAwMDAwMCBuIAowMDAwMDgyNjQ2IDAwMDAwIG4gCjAwMDAwODI1OTggMDAwMDAgbiAKMDAwMDA4MjU1MCAwMDAwMCBuIAowMDAwMDc4NTQ1IDAwMDAwIG4gCjAwMDAwODI1MDIgMDAwMDAgbiAKMDAwMDA3OTU1NSAwMDAwMCBuIAowMDAwMDgyNDU0IDAwMDAwIG4gCjAwMDAwODI0MDYgMDAwMDAgbiAKMDAwMDA4MjM1OCAwMDAwMCBuIAowMDAwMDgyMzEwIDAwMDAwIG4gCjAwMDAwODIyNjIgMDAwMDAgbiAKMDAwMDA3ODYwMCAwMDAwMCBuIAowMDAwMDgyMTk3IDAwMDAwIG4gCjAwMDAwNzk1MDggMDAwMDAgbiAKMDAwMDA3ODY1NSAwMDAwMCBuIAowMDAwMDgyMTQ5IDAwMDAwIG4gCjAwMDAwNzkzMzIgMDAwMDAgbiAKMDAwMDA4MjA4NCAwMDAwMCBuIAowMDAwMDgyMDE5IDAwMDAwIG4gCjAwMDAwODE5NTQgMDAwMDAgbiAKMDAwMDA4MTg4OSAwMDAwMCBuIAowMDAwMDgxODI0IDAwMDAwIG4gCjAwMDAwODE3NTkgMDAwMDAgbiAKMDAwMDA4MTY5NCAwMDAwMCBuIAowMDAwMDgxNjI5IDAwMDAwIG4gCjAwMDAwODE1NjQgMDAwMDAgbiAKMDAwMDA4MTQ5OSAwMDAwMCBuIAowMDAwMDgxNDM0IDAwMDAwIG4gCjAwMDAwODEzNjkgMDAwMDAgbiAKMDAwMDA4MTMwNCAwMDAwMCBuIAowMDAwMDgxMjM5IDAwMDAwIG4gCjAwMDAwODExNzQgMDAwMDAgbiAKMDAwMDA4MTEwOSAwMDAwMCBuIAowMDAwMDc4NzEwIDAwMDAwIG4gCjAwMDAwODEwNjEgMDAwMDAgbiAKMDAwMDA3OTI0NCAwMDAwMCBuIAowMDAwMDgxMDEzIDAwMDAwIG4gCjAwMDAwODA5NjUgMDAwMDAgbiAKMDAwMDA4MDkxNyAwMDAwMCBuIAowMDAwMDgwODY5IDAwMDAwIG4gCjAwMDAwODA4MjEgMDAwMDAgbiAKMDAwMDA3ODc2NSAwMDAwMCBuIAowMDAwMDgwNzczIDAwMDAwIG4gCjAwMDAwNzkxOTcgMDAwMDAgbiAKMDAwMDA3ODgyMCAwMDAwMCBuIAowMDAwMDgwNzI1IDAwMDAwIG4gCjAwMDAwNzg5NjIgMDAwMDAgbiAKMDAwMDA4MDY3NyAwMDAwMCBuIAowMDAwMDc5MDA5IDAwMDAwIG4gCjAwMDAwODA2MjkgMDAwMDAgbiAKMDAwMDA3OTA1NiAwMDAwMCBuIAowMDAwMDgwNTgxIDAwMDAwIG4gCjAwMDAwNzkxMDMgMDAwMDAgbiAKMDAwMDA4MDUzMyAwMDAwMCBuIAowMDAwMDc5MTUwIDAwMDAwIG4gCjAwMDAwNzg4NzUgMDAwMDAgbiAKMDAwMDA4MDQ4NSAwMDAwMCBuIAowMDAwMDgwMDU4IDAwMDAwIG4gCjAwMDAwODA0MzcgMDAwMDAgbiAKMDAwMDA4MDEwNSAwMDAwMCBuIAowMDAwMDgwMzg5IDAwMDAwIG4gCjAwMDAwODAxNTIgMDAwMDAgbiAKMDAwMDA4MDM0MSAwMDAwMCBuIAowMDAwMDgwMTk5IDAwMDAwIG4gCjAwMDAwODAyOTMgMDAwMDAgbiAKMDAwMDA4MDI0NiAwMDAwMCBuIAowMDAwMDc3OTQ2IDAwMDAwIG4gCjAwMDAwNzc4OTggMDAwMDAgbiAKMDAwMDA3ODE4OCAwMDAwMCBuIAowMDAwMTAzMTYyIDAwMDAwIG4gCjAwMDAxMDMxMTYgMDAwMDAgbiAKMDAwMDEwMjg3NCAwMDAwMCBuIAowMDAwMTAyODI2IDAwMDAwIG4gCjAwMDAwOTc4ODUgMDAwMDAgbiAKMDAwMDEwMjc3OCAwMDAwMCBuIAowMDAwMDk3OTMxIDAwMDAwIG4gCjAwMDAxMDI3MzAgMDAwMDAgbiAKMDAwMDEwMjY4MiAwMDAwMCBuIAowMDAwMDkzNzA0IDAwMDAwIG4gCjAwMDAxMDI2MTcgMDAwMDAgbiAKMDAwMDA5NzgzMSAwMDAwMCBuIAowMDAwMTAyNTY5IDAwMDAwIG4gCjAwMDAwOTM3NjYgMDAwMDAgbiAKMDAwMDEwMjUyMSAwMDAwMCBuIAowMDAwMDk3NTMxIDAwMDAwIG4gCjAwMDAxMDI0NzMgMDAwMDAgbiAKMDAwMDA5NzU3OCAwMDAwMCBuIAowMDAwMTAyNDI1IDAwMDAwIG4gCjAwMDAwOTc2MjUgMDAwMDAgbiAKMDAwMDEwMjM3NyAwMDAwMCBuIAowMDAwMDk3NjcyIDAwMDAwIG4gCjAwMDAxMDIzMjkgMDAwMDAgbiAKMDAwMDEwMjI4MSAwMDAwMCBuIAowMDAwMDk3NzI4IDAwMDAwIG4gCjAwMDAxMDIyMzMgMDAwMDAgbiAKMDAwMDEwMjE4NSAwMDAwMCBuIAowMDAwMDk3Nzg0IDAwMDAwIG4gCjAwMDAwOTM4MjAgMDAwMDAgbiAKMDAwMDEwMjEzNyAwMDAwMCBuIAowMDAwMDk3NDM3IDAwMDAwIG4gCjAwMDAxMDIwODkgMDAwMDAgbiAKMDAwMDA5NzQ4NCAwMDAwMCBuIAowMDAwMDkzOTE1IDAwMDAwIG4gCjAwMDAxMDIwNDEgMDAwMDAgbiAKMDAwMDA5NzE1NSAwMDAwMCBuIAowMDAwMTAxOTkzIDAwMDAwIG4gCjAwMDAwOTcyMDIgMDAwMDAgbiAKMDAwMDEwMTk0NSAwMDAwMCBuIAowMDAwMDk3MjQ5IDAwMDAwIG4gCjAwMDAxMDE4OTcgMDAwMDAgbiAKMDAwMDA5NzI5NiAwMDAwMCBuIAowMDAwMTAxODQ5IDAwMDAwIG4gCjAwMDAwOTczNDMgMDAwMDAgbiAKMDAwMDEwMTgwMSAwMDAwMCBuIAowMDAwMDk3MzkwIDAwMDAwIG4gCjAwMDAwOTM5NzggMDAwMDAgbiAKMDAwMDEwMTc1MyAwMDAwMCBuIAowMDAwMDk2Nzc5IDAwMDAwIG4gCjAwMDAxMDE3MDUgMDAwMDAgbiAKMDAwMDA5NjgyNiAwMDAwMCBuIAowMDAwMTAxNjU3IDAwMDAwIG4gCjAwMDAwOTY4NzMgMDAwMDAgbiAKMDAwMDEwMTYwOSAwMDAwMCBuIAowMDAwMDk2OTIwIDAwMDAwIG4gCjAwMDAxMDE1NjEgMDAwMDAgbiAKMDAwMDA5Njk2NyAwMDAwMCBuIAowMDAwMTAxNTEzIDAwMDAwIG4gCjAwMDAwOTcwMTQgMDAwMDAgbiAKMDAwMDEwMTQ2NSAwMDAwMCBuIAowMDAwMDk3MDYxIDAwMDAwIG4gCjAwMDAxMDE0MTcgMDAwMDAgbiAKMDAwMDA5NzEwOCAwMDAwMCBuIAowMDAwMDk0MDczIDAwMDAwIG4gCjAwMDAxMDEzNjkgMDAwMDAgbiAKMDAwMDA5NjYzOCAwMDAwMCBuIAowMDAwMTAxMzIxIDAwMDAwIG4gCjAwMDAwOTY2ODUgMDAwMDAgbiAKMDAwMDEwMTI3MyAwMDAwMCBuIAowMDAwMDk2NzMyIDAwMDAwIG4gCjAwMDAwOTQxODQgMDAwMDAgbiAKMDAwMDEwMTIyNSAwMDAwMCBuIAowMDAwMDk2NDk3IDAwMDAwIG4gCjAwMDAxMDExNzcgMDAwMDAgbiAKMDAwMDA5NjU0NCAwMDAwMCBuIAowMDAwMTAxMTI5IDAwMDAwIG4gCjAwMDAwOTY1OTEgMDAwMDAgbiAKMDAwMDA5NDI1NSAwMDAwMCBuIAowMDAwMTAxMDgxIDAwMDAwIG4gCjAwMDAwOTYzMDkgMDAwMDAgbiAKMDAwMDEwMTAzMyAwMDAwMCBuIAowMDAwMDk2MzU2IDAwMDAwIG4gCjAwMDAxMDA5ODUgMDAwMDAgbiAKMDAwMDA5NjQwMyAwMDAwMCBuIAowMDAwMTAwOTM3IDAwMDAwIG4gCjAwMDAwOTY0NTAgMDAwMDAgbiAKMDAwMDA5NDMyNiAwMDAwMCBuIAowMDAwMTAwODg5IDAwMDAwIG4gCjAwMDAwOTYxMjEgMDAwMDAgbiAKMDAwMDEwMDg0MSAwMDAwMCBuIAowMDAwMDk2MTY4IDAwMDAwIG4gCjAwMDAxMDA3OTMgMDAwMDAgbiAKMDAwMDA5NjIxNSAwMDAwMCBuIAowMDAwMTAwNzI4IDAwMDAwIG4gCjAwMDAwOTYyNjIgMDAwMDAgbiAKMDAwMDA5NDQwNSAwMDAwMCBuIAowMDAwMTAwNjgwIDAwMDAwIG4gCjAwMDAwOTYwMjcgMDAwMDAgbiAKMDAwMDEwMDYzMiAwMDAwMCBuIAowMDAwMDk2MDc0IDAwMDAwIG4gCjAwMDAwOTQ0ODQgMDAwMDAgbiAKMDAwMDEwMDU4NCAwMDAwMCBuIAowMDAwMDk1OTcxIDAwMDAwIG4gCjAwMDAxMDA1MzYgMDAwMDAgbiAKMDAwMDA5NDU0NyAwMDAwMCBuIAowMDAwMTAwNDg4IDAwMDAwIG4gCjAwMDAwOTU5MTUgMDAwMDAgbiAKMDAwMDEwMDQ0MCAwMDAwMCBuIAowMDAwMDk0NjAyIDAwMDAwIG4gCjAwMDAxMDAzOTIgMDAwMDAgbiAKMDAwMDA5NTc4NyAwMDAwMCBuIAowMDAwMTAwMzQ0IDAwMDAwIG4gCjAwMDAxMDAyOTYgMDAwMDAgbiAKMDAwMDEwMDI0OCAwMDAwMCBuIAowMDAwMDk1ODUxIDAwMDAwIG4gCjAwMDAxMDAyMDAgMDAwMDAgbiAKMDAwMDEwMDE1MiAwMDAwMCBuIAowMDAwMDk0NjU3IDAwMDAwIG4gCjAwMDAxMDAwODcgMDAwMDAgbiAKMDAwMDA5NTU5NSAwMDAwMCBuIAowMDAwMTAwMDM5IDAwMDAwIG4gCjAwMDAwOTk5OTEgMDAwMDAgbiAKMDAwMDA5OTk0MyAwMDAwMCBuIAowMDAwMDk1NjU5IDAwMDAwIG4gCjAwMDAwOTk4OTUgMDAwMDAgbiAKMDAwMDA5OTg0NyAwMDAwMCBuIAowMDAwMDk5Nzk5IDAwMDAwIG4gCjAwMDAwOTU3MjMgMDAwMDAgbiAKMDAwMDA5OTc1MSAwMDAwMCBuIAowMDAwMDk5NzAzIDAwMDAwIG4gCjAwMDAwOTQ3MjAgMDAwMDAgbiAKMDAwMDA5OTY1NSAwMDAwMCBuIAowMDAwMDk1NTM5IDAwMDAwIG4gCjAwMDAwOTk2MDcgMDAwMDAgbiAKMDAwMDA5NDc5MSAwMDAwMCBuIAowMDAwMDk5NTU5IDAwMDAwIG4gCjAwMDAwOTU0ODMgMDAwMDAgbiAKMDAwMDA5OTUxMSAwMDAwMCBuIAowMDAwMDk0ODQ2IDAwMDAwIG4gCjAwMDAwOTk0NjMgMDAwMDAgbiAKMDAwMDA5NTE2MyAwMDAwMCBuIAowMDAwMDk5NDE1IDAwMDAwIG4gCjAwMDAwOTkzNjcgMDAwMDAgbiAKMDAwMDA5OTMxOSAwMDAwMCBuIAowMDAwMDk1MjI3IDAwMDAwIG4gCjAwMDAwOTkyNzEgMDAwMDAgbiAKMDAwMDA5OTIyMyAwMDAwMCBuIAowMDAwMDk5MTc1IDAwMDAwIG4gCjAwMDAwOTUyOTEgMDAwMDAgbiAKMDAwMDA5OTEyNyAwMDAwMCBuIAowMDAwMDk5MDc5IDAwMDAwIG4gCjAwMDAwOTkwMzEgMDAwMDAgbiAKMDAwMDA5NTM1NSAwMDAwMCBuIAowMDAwMDk4OTgzIDAwMDAwIG4gCjAwMDAwOTg5MzUgMDAwMDAgbiAKMDAwMDA5ODg4NyAwMDAwMCBuIAowMDAwMDk1NDE5IDAwMDAwIG4gCjAwMDAwOTg4MzkgMDAwMDAgbiAKMDAwMDA5ODc5MSAwMDAwMCBuIAowMDAwMDk0OTAxIDAwMDAwIG4gCjAwMDAwOTg3NDMgMDAwMDAgbiAKMDAwMDA5NTA0MyAwMDAwMCBuIAowMDAwMDk4Njk1IDAwMDAwIG4gCjAwMDAwOTg2NDcgMDAwMDAgbiAKMDAwMDA5ODU5OSAwMDAwMCBuIAowMDAwMDk4NTUxIDAwMDAwIG4gCjAwMDAwOTg1MDMgMDAwMDAgbiAKMDAwMDA5ODQzOCAwMDAwMCBuIAowMDAwMDk4MzkwIDAwMDAwIG4gCjAwMDAwOTgzMjUgMDAwMDAgbiAKMDAwMDA5ODI3NyAwMDAwMCBuIAowMDAwMDk0OTg4IDAwMDAwIG4gCjAwMDAwOTgyMjkgMDAwMDAgbiAKMDAwMDA5Nzk5MiAwMDAwMCBuIAowMDAwMDk4MTgxIDAwMDAwIG4gCjAwMDAwOTgwMzkgMDAwMDAgbiAKMDAwMDA5ODEzMyAwMDAwMCBuIAowMDAwMDk4MDg2IDAwMDAwIG4gCjAwMDAwOTMzNDIgMDAwMDAgbiAKMDAwMDA5MzI5NCAwMDAwMCBuIAowMDAwMDkzMjEzIDAwMDAwIG4gCjAwMDAwOTM2MjQgMDAwMDAgbiAKMDAwMDEwMjkyMCAwMDAwMCBuIAowMDAwMTAzMDMzIDAwMDAwIG4gCjAwMDAxMDMyNzAgMDAwMDAgbiAKMDAwMDE3MDk3NSAwMDAwMCBuIAowMDAwMTcxNDA5IDAwMDAwIG4gCjAwMDAxMDM5MTggMDAwMDAgbiAKMDAwMDEwNDgzNCAwMDAwMCBuIAowMDAwMTA1NjE4IDAwMDAwIG4gCjAwMDAxMDY0OTkgMDAwMDAgbiAKMDAwMDEwNzM0NyAwMDAwMCBuIAowMDAwMTA4MjIxIDAwMDAwIG4gCjAwMDAxMDg5OTQgMDAwMDAgbiAKMDAwMDEwOTc5NCAwMDAwMCBuIAowMDAwMjE1NTM4IDAwMDAwIG4gCjAwMDAxNzgxNzIgMDAwMDAgbiAKMDAwMDE3ODIyMCAwMDAwMCBuIAowMDAwMTk1MDg0IDAwMDAwIG4gCjAwMDAxOTUyNDEgMDAwMDAgbiAKMDAwMDE5NTM5OCAwMDAwMCBuIAowMDAwMjEyMjgwIDAwMDAwIG4gCjAwMDAyMTI0MzkgMDAwMDAgbiAKMDAwMDIxMjU5NiAwMDAwMCBuIAowMDAwMTYzMzMxIDAwMDAwIG4gCjAwMDAxMTA2ODAgMDAwMDAgbiAKMDAwMDExMDk2OSAwMDAwMCBuIAowMDAwMTExMDU5IDAwMDAwIG4gCjAwMDAxMjgxNzAgMDAwMDAgbiAKMDAwMDEzMDgxOCAwMDAwMCBuIAowMDAwMTMxNTgyIDAwMDAwIG4gCjAwMDAxMzE2NzMgMDAwMDAgbiAKMDAwMDE1NDYxOSAwMDAwMCBuIAowMDAwMTU0OTM3IDAwMDAwIG4gCjAwMDAxNTUyNjQgMDAwMDAgbiAKMDAwMDE1NTYxOSAwMDAwMCBuIAowMDAwMTU1OTQ3IDAwMDAwIG4gCjAwMDAxNTYyODQgMDAwMDAgbiAKMDAwMDE1NjYzMiAwMDAwMCBuIAowMDAwMTczODgwIDAwMDAwIG4gCjAwMDAxNzQwNTcgMDAwMDAgbiAKMDAwMDE3NDIyNSAwMDAwMCBuIAowMDAwMTc0MzkxIDAwMDAwIG4gCjAwMDAxNzIwMDggMDAwMDAgbiAKMDAwMDE3MjIwOCAwMDAwMCBuIAowMDAwMTcyNDAxIDAwMDAwIG4gCjAwMDAxNzczNzQgMDAwMDAgbiAKMDAwMDE3MjU2OCAwMDAwMCBuIAowMDAwMTcxODMxIDAwMDAwIG4gCjAwMDAxNzQ2NzAgMDAwMDAgbiAKMDAwMDE3NDg2MiAwMDAwMCBuIAowMDAwMTc1MDU2IDAwMDAwIG4gCjAwMDAxNzUyOTAgMDAwMDAgbiAKMDAwMDE3MzMzMyAwMDAwMCBuIAowMDAwMTczNjkyIDAwMDAwIG4gCjAwMDAxNzU1MjQgMDAwMDAgbiAKMDAwMDE3NTcxNyAwMDAwMCBuIAowMDAwMTc1OTMyIDAwMDAwIG4gCjAwMDAxNzYzNDAgMDAwMDAgbiAKMDAwMDE3NjEzOCAwMDAwMCBuIAowMDAwMTc2NDk5IDAwMDAwIG4gCjAwMDAxNzcxODkgMDAwMDAgbiAKMDAwMDE3NjczNSAwMDAwMCBuIAowMDAwMTc3NTQ0IDAwMDAwIG4gCjAwMDAxNzY5NjAgMDAwMDAgbiAKMDAwMDE3Mjc3MCAwMDAwMCBuIAowMDAwMTczNTA5IDAwMDAwIG4gCjAwMDAxNzc2ODQgMDAwMDAgbiAKMDAwMDE3Mjk3NiAwMDAwMCBuIAowMDAwMTc3ODgyIDAwMDAwIG4gCjAwMDAxNzMxNzEgMDAwMDAgbiAKMDAwMDE3ODEzNSAwMDAwMCBuIAowMDAwMTc4MzM0IDAwMDAwIG4gCjAwMDAxNzg0MDQgMDAwMDAgbiAKMDAwMDE3ODY2NSAwMDAwMCBuIAowMDAwMTk1MDU3IDAwMDAwIG4gCjAwMDAxOTUyMTQgMDAwMDAgbiAKMDAwMDE5NTM3MSAwMDAwMCBuIAowMDAwMTk1NTI4IDAwMDAwIG4gCjAwMDAxOTU1OTggMDAwMDAgbiAKMDAwMDIxMjI1NCAwMDAwMCBuIAowMDAwMjEyNDEyIDAwMDAwIG4gCjAwMDAyMTI1NjkgMDAwMDAgbiAKMDAwMDIxMjcyNiAwMDAwMCBuIAowMDAwMjE0MTM3IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2NDkvUm9vdCA1NjggMCBSL0luZm8gMzYgMCBSL0lEIFs8YmZjNmUxM2E1NmViYjI0MTgzZWI1MDAyZDEyYzg2Zjc+PDA2OTZkYTc0YzA1YmJlOWM5Y2E1MTRmYzdhMzAxNzdiPl0+PgolaVRleHQtNS41LjExCnN0YXJ0eHJlZgoyMTU1ODYKJSVFT0YK"
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "d361c3b4-aaf1-4a69-805b-650e04d4e766",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "d8038606-dec8-4683-81b2-cc9cd7b6708f",
                  "name": [
                    {
                      "family": "Physician",
                      "given": [
                        "Test2"
                      ],
                      "prefix": [
                        ""
                      ],
                      "suffix": [
                        ""
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "613-531-3008",
                      "use": "home",
                      "rank": 1
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
                  "reference": "d8038606-dec8-4683-81b2-cc9cd7b6708f"
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
      "id": "aa3f0e0b-aa95-44e8-a117-329214cc8eea",
      "issue": [
        {
          "severity": "information",
          "code": "OTN_SUCCESS",
          "diagnostics": "Successful Delivery to EMR",
          "location": "Communication/Recipient/d8038606-dec8-4683-81b2-cc9cd7b6708f"
        }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(200)
})

test('DRA_F70-6 - Novari Sample REFERENCE, Patient with composite Given (first) name', async({page}) => {
  setReport('Functional Tests', 'DRA_F70-6')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
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
                        "John",
                        "Corey",
                        "Morgan"
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

test('DRA_F71 - #1 HRM Medical Record - Functional Test Cases (One Report Recipient - Physician) txt, HTML, GIF', async({page}) => {
  setReport('Functional Tests', 'DRA_F71')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "bundle1",
        "type": "collection",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "FT#1",
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
                  "status": "arrived",
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
                  "data": "This is a sample report in text format"
                },
                {
                  "contentType": "text/html",
                  "data": "<html><p>This is a sample report in html format</p></html>"
                },
                {
                  "contentType": "image/gif",
                  "data": "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"
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
                      "system": "http://otn.ca/hrmhostorg",
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

test('DRA_F71-1 - #2 HRM Medical Record - Functional Test Cases (One Report Recipient - Nurse Practitioner) txt, HTML, GIF', async({page}) => {
  setReport('Functional Tests', 'DRA_F71-1')
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
              "id": "FT#2",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "Patient#PT2",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "2345678912 ZE"
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
                  "gender": "undefined",
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
                  "status": "arrived",
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
                  "data": "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"
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
                      "system": "http://otn.ca/hrmhostorg",
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

test.describe.fixme('DRA_F71-2 - #9 HRM Medical Record - Functional Test Cases (Upper ASCII characters) txt, HTML, GIF, 2 Recipients - DRA-93', () => {test('DRA_F71-2 - #9 HRM Medical Record - Functional Test Cases (Upper ASCII characters) txt, HTML, GIF, 2 Recipients - DRA-93', async({page}) => {
  setReport('Functional Tests', 'DRA_F71-2')
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
              "id": "FT#9",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "Patient#PT4",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "4567891017"
                    }
                  ],
                  "name": [
                    {
                      "family": "PTLastFour",
                      "given": [
                        "PTFour"
                      ]
                    }
                  ],
                  "gender": "male",
                  "birthDate": "1944-05-04",
                  "address": [
                    {
                      "line": [
                        "4 Fourth Avenue"
                      ],
                      "city": "Toronto",
                      "state": "ON",
                      "postalCode": "M8R 2E7",
                      "country": "CAN"
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "416-555-4567"
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
                  "status": "arrived",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": "VR"
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
                "reference": "Patient#PT4"
              },
              "context": {
                "reference": "Encounter#1"
              },
              "effectiveDateTime": "2015-01-01T12:00:00",
              "conclusion": "some conclusion",
              "presentedForm": [
                {
                  "contentType": "text/plain",
                  "data": "Create a report that contains the symbol for copyright © and cm² in the content.  Copy the symbols directly from this worksheet into the body of the report."
                },
                {
                  "contentType": "text/html",
                  "data": "<html><p>Create a report that contains the symbol for copyright © and cm² in the content.  Copy the symbols directly from this worksheet into the body of the report.</p></html>"
                },
                {
                  "contentType": "image/gif",
                  "data": "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"
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
                  "id": "Practitioner#MD2",
                  "name": [
                    {
                      "family": "MDLastTwo",
                      "given": [
                        "MDTwo"
                      ]
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": process.env.validRegistryID2
                        }
                      ]
                    }
                  ]
                },
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
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "the org"
                }
              ],
              "recipient": [
                {
                  "reference": "Practitioner#MD2"
                },
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
  expect(body).toContain("Practitioner#MD1")
  expect(res.status()).toEqual(200)
});
})

test.describe.fixme('DRA_F71-3 - #11 HRM Medical Record - Functional Test Cases (CC-ed Providers) txt, HTML, GIF - DRA-93', () => {
  test('DRA_F71-3 - #11 HRM Medical Record - Functional Test Cases (CC-ed Providers) txt, HTML, GIF - DRA-93', async({page}) => {
  setReport('Functional Tests', 'DRA_F71-3')
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
              "id": "FT#11",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "Patient#PT6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "6789123456"
                    }
                  ],
                  "name": [
                    {
                      "family": "PTLastSix",
                      "given": [
                        "PTSix"
                      ]
                    }
                  ],
                  "gender": "male",
                  "birthDate": "1966-05-06",
                  "address": [
                    {
                      "line": [
                        "6 Sixth Avenue"
                      ],
                      "city": "Winnipeg",
                      "state": "MB",
                      "postalCode": "R3B 3H6",
                      "country": "CAN"
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "204-555-6789"
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
                  "status": "arrived",
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
                "reference": "Patient#PT6"
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
                  "data": "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"
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
                  "id": "Practitioner#MD5",
                  "name": [
                    {
                      "family": "MDLastFive",
                      "given": [
                        "MDFive"
                      ]
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": process.env.validRegistryID2
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Practitioner",
                  "id": "Practitioner#RNP1",
                  "name": [
                    {
                      "family": "RPLastOne",
                      "given": [
                        "RPOne"
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
                  "reference": "Practitioner#RNP1"
                },
                {
                  "reference": "Practitioner#MD5"
                },
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
   
  expect(body).toContain('1/3 Successful Delivery to EMR","location":"Communication/Recipient/Practitioner#RNP1"},{"severity":"information","code":"OTN_SUCCESS","diagnostics":"2/3 Successful Delivery to EMR","location":"Communication/Recipient/Practitioner#RNP1'),
  expect(body).toContain('1/3 Successful Delivery to EMR","location":"Communication/Recipient/Practitioner#MD1"},{"severity":"information","code":"OTN_SUCCESS","diagnostics":"2/3 Successful Delivery to EMR","location":"Communication/Recipient/Practitioner#MD1'),
  expect(body).toContain('1/3 Successful Delivery to EMR","location":"Communication/Recipient/Practitioner#MD5"},{"severity":"information","code":"OTN_SUCCESS",diagnostics":"2/3 Successful Delivery to EMR","location":"Communication/Recipient/Practitioner#MD5'),
  expect(body).toContain('3/3 MSH|^~\\&||OTNTHC||'),
  expect(res.status()).toEqual(200)

});
})

test('DRA_F71-4 - #15 HRM Medical Record - Functional Test Cases ( Patient Out Of Country )', async({page}) => {
  setReport('Functional Tests', 'DRA_F71-4')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data:{
        "resourceType": "Bundle",
        "id": "bundle1",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "FT#15",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "Patient#PT9",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "6789123456"
                    }
                  ],
                  "name": [
                    {
                      "family": "PTLastNine",
                      "given": [
                        "PTNine"
                      ]
                    }
                  ],
                  "gender": "female",
                  "birthDate": "1999-05-09",
                  "address": [
                    {
                      "line": [
                        "9 Ninth St"
                      ],
                      "city": "Detroit",
                      "state": "MI",
                      "postalCode": "48129",
                      "country": "USA"
                    }
                  ],
                  "telecom": [
                    {
                      "system": "phone",
                      "value": "313-555-9101"
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
                  "status": "arrived",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": process.env.validActCode
                  },
                  "period": {
                    "start": "2018-01-01T13:00",
                    "end": "2018-02-02T13:00"
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
                              "value": "50646"
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
                "reference": "Patient#PT9"
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
                  "data": "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"
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
                          "value": "76441"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Practitioner",
                  "id": "Practitioner#MD8",
                  "name": [
                    {
                      "family": "MDLastEight",
                      "given": [
                        "MDEight"
                      ]
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "76441"
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
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "the org"
                }
              ],
              "recipient": [
                {
                  "reference": "Practitioner#MD1"
                },
                {
                  "reference": "Practitioner#MD8"
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
          "diagnostics": "Pointer to Validation error:#/entry/0"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0/address/0/state: MI is not a valid enum value"
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

test('DRA_F71-5 - #17 HRM Medical Record - Functional Test Cases (Cancelled Report)', async({page}) => {
  setReport('Functional Tests', 'DRA_F71-5')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data:{
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
                      "value": "2345678912 ZE"
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
                  "status": "cancelled",
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
                  "data": "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"
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
  
  expect(body).toContain('1/3 Successful Delivery to EMR","location":"Communication/Recipient/Practitioner#RNP3')
  expect(body).toContain('2/3 Successful Delivery to EMR')
  expect(body).toContain("3/3 MSH|^~\\\\&||OTNTHC||")
  expect(res.status()).toEqual(200)
})

test('DRA_F72 - DiagnosticReport communication recipient with email', async({page}) => {
  //  !!!!!!!!!!!!!!!Double check, compare with vRest !!!!!!!!!!!!!!!!!!!!
  setReport('Functional Tests', 'DRA_F72')
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
                      "family": "Encanto",
                      "given": [
                        "Bruno"
                      ],
                      "prefix": [
                        "GP."
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "email",
                      "value": "daniela.kurdalieva@ontariohealth.ca",
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

test('DRA_F73 - DiagnosticReport Reguina long patient email - DRA-100', async({page}) => {
  setReport('Functional Tests', 'DRA_F73')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "Bun_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1",
        "type": "collection",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "Diag_3ff1f477-56d9-401c-bcc4-888c391cde07",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "Pat_5555555555_1683566334437_1",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "5555555555"
                    }
                  ],
                  "name": [
                    {
                      "family": "Dobson",
                      "given": [
                        "Dob"
                      ]
                    }
                  ],
                  "gender": "male",
                  "birthDate": "1960-04-20",
                  "telecom": [
                    {
                      "system": "email",
                      "value": "reguina.ekaterinoslavskaia@orionhealth.com",
                      "use": "home",
                      "rank": 1
                    },
                    {
                      "system": "phone",
                      "value": "1231231234",
                      "use": "home",
                      "rank": 2
                    }
                  ],
                  "address": [
                    {
                      "use": "home",
                      "line": [
                        "Line 1"
                      ],
                      "city": "City",
                      "state": "ON",
                      "postalCode": "L1L1L1",
                      "country": "CA"
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "Enc_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1",
                  "text": {
                    "status": "generated",
                    "div": "Healthcare Navigation System Encounter"
                  },
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "3ff1f477-56d9-401c-bcc4-888c391cde07"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://otn.ca/DRAPI/ActCode",
                    "code": "VV"
                  },
                  "period": {
                    "start": "2023-05-08T17:12:53",
                    "end": "2023-05-08T17:12:53"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "Prac_reguina.clinmang_1683566334437_1",
                      "name": [
                        {
                          "family": "Clinical Manager",
                          "given": [
                            "reguina"
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "1-866-553-7205",
                          "use": "work",
                          "rank": 1
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-nurse",
                              "value": "reguina.clinmang"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "participants": [
                    {
                      "type": {
                        "system": "http://hl7.org/fhir/ValueSet/encounter-participant-type",
                        "code": "PPRF"
                      },
                      "individual": {
                        "reference": "Prac_reguina.clinmang_1683566334437_1"
                      }
                    }
                  ]
                }
              ],
              "subject": {
                "reference": "Pat_5555555555_1683566334437_1"
              },
              "context": {
                "reference": "Enc_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1"
              },
              "effectiveDateTime": "2023-05-08T17:12:53",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "application/pdf",
                  "data": "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OznyXPz806+bXmi+2Pdy9sueqbCph6+Er6Zfl7zRfLP/Lett37uYd6PT+e+x7ys/WHzo/hj08f4n4adPvwHJ4vTiCmVuZHN0cmVhbQplbmRvYmoKNiAwIG9iagpbL0lDQ0Jhc2VkIDUgMCBSXQplbmRvYmoKNyAwIG9iago8PAogIC9UeXBlIC9NZXRhZGF0YQogIC9TdWJ0eXBlIC9YTUwKICAvTGVuZ3RoIDE1IDAgUgo+PgpzdHJlYW0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz48eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KPHJkZjpEZXNjcmlwdGlvbiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iIHJkZjphYm91dD0iIj4KPHBkZjpQcm9kdWNlcj5BcGFjaGUgRk9QIFZlcnNpb24gMC45NTwvcGRmOlByb2R1Y2VyPgo8cGRmOlBERlZlcnNpb24+MS40PC9wZGY6UERGVmVyc2lvbj4KPC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24geG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiByZGY6YWJvdXQ9IiI+CjxkYzpkYXRlPgo8cmRmOlNlcT4KPHJkZjpsaT4yMDIzLTA1LTA4VDE3OjEyOjU0WjwvcmRmOmxpPgo8L3JkZjpTZXE+CjwvZGM6ZGF0ZT4KPC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24geG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiByZGY6YWJvdXQ9IiI+Cjx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTA1LTA4VDE3OjEyOjU0WjwveG1wOkNyZWF0ZURhdGU+CjwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPjw/eHBhY2tldCBlbmQ9InIiPz4KCmVuZHN0cmVhbQpl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VHlwZTEKICAvQmFzZUZvbnQgL1RpbWVzLUJvbGQKICAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgoKZW5kb2JqCjIyIDAgb2JqCjw8CiAgL1R5cGUgL0ZvbnQKICAvU3VidHlwZSAvVHlwZTEKICAvQmFzZUZvbnQgL1RpbWVzLVJvbWFuCiAgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KCmVuZG9iagoxIDAgb2JqCjw8IC9UeXBlIC9QYWdlcwovQ291bnQgMQovS2lkcyBbOCAwIFIgXSA+PgplbmRvYmoKMiAwIG9iago8PAogIC9UeXBlIC9DYXRhbG9nCiAgL1BhZ2VzIDEgMCBSCiAgL01ldGFkYXRhIDcgMCBSCiAgL1BhZ2VMYWJlbHMgOSAwIFIKPj4KCmVuZG9iagozIDAgb2JqCjw8Ci9Gb250IDw8CiAgL0Y3IDIxIDAgUgogIC9GNSAyMiAwIFIKPj4KL1Byb2NTZXQgWyAvUERGIC9JbWFnZUIgL0ltYWdlQyAvVGV4dCBdCi9YT2JqZWN0IDw8CiAgL0ltMiAxMyAwIFIKICAvSW0xIDEyIDAgUgo+PgovQ29sb3JTcGFjZSA8PAogIC9EZWZhdWx0UkdCIDYgMCBSCiAgL0lDQzEwIDExIDAgUgo+Pgo+PgplbmRvYmoKOSAwIG9iago8PCAvTnVtcyBbMCA8PCAvUCAoMSkgPj4KXSA+PgoKZW5kb2JqCnhyZWYKMCAyMwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwNzIxNzkgMDAwMDAgbiAKMDAwMDA3MjIzNyAwMDAwMCBuIAowMDAwMDcyMzI5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDEwNiAwMDAwMCBuIAowMDAwMDAyNzg0IDAwMDAwIG4gCjAwMDAwMDI4MTcgMDAwMDAgbiAKMDAwMDA3MTc3NSAwMDAwMCBuIAowMDAwMDcyNTI1IDAwMDAwIG4gCjAwMDAwMDM2MDYgMDAwMDAgbiAKMDAwMDAwNjg1MiAwMDAwMCBuIAowMDAwMDA2ODg3IDAwMDAwIG4gCjAwMDAwMDgwMjQgMDAwMDAgbiAKMDAwMDA3MDc3NSAwMDAwMCBuIAowMDAwMDcwNzk2IDAwMDAwIG4gCjAwMDAwNzA4MTYgMDAwMDAgbiAKMDAwMDA3MDgzNyAwMDAwMCBuIAowMDAwMDcwODU3IDAwMDAwIG4gCjAwMDAwNzA4NzkgMDAwMDAgbiAKMDAwMDA3MTk0MiAwMDAwMCBuIAowMDAwMDcxOTYyIDAwMDAwIG4gCjAwMDAwNzIwNzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAyMwovUm9vdCAyIDAgUgovSW5mbyA0IDAgUgovSUQgWzxGMDA5QUIyNDFCOUYyQzc0MkQwRkNFMEJBRDYwMEU3Mj4gPEYwMDlBQjI0MUI5RjJDNzQyRDBGQ0UwQkFENjAwRTcyPl0KPj4Kc3RhcnR4cmVmCjcyNTcxCiUlRU9GCg=="
                },
                {
                  "contentType": "application/pdf",
                  "data": "JVBERi0xLjQKMSAwIG9iago8PAovVGl0bGUgKP7/KQovQ3JlYXRvciAo/v8AdwBrAGgAdABtAGwAdABvAHAAZABmACAAMAAuADEAMgAuADMpCi9Qcm9kdWNlciAo/v8AUQB0ACAANAAuADgALgA3KQovQ3JlYXRpb25EYXRlIChEOjIwMjMwNTA4MTcxMjAzWikKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL0V4dEdTdGF0ZQovU0EgdHJ1ZQovU00gMC4wMgovY2EgMS4wCi9DQSAxLjAKL0FJUyBmYWxzZQovU01hc2sgL05vbmU+PgplbmRvYmoKNCAwIG9iagpbL1BhdHRlcm4gL0RldmljZVJHQl0KZW5kb2JqCjggMCBvYmoKPDwKL1R5cGUgL1hPYmplY3QKL1N1YnR5cGUgL0ltYWdlCi9XaWR0aCAxNDQKL0hlaWdodCA5NQovQml0c1BlckNvbXBvbmVudCA4Ci9Db2xvclNwYWNlIC9EZXZpY2VSR0IKL0xlbmd0aCA5IDAgUgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJztm3mUV/Mbx29KIy0T2bKXVrLvpSMc60wcDk6Ww2Q7OOTYDo5wHFoVLaisKUuJJkSWbGVfK8pakyUKM6gs0zL39+q+fR+3e+d+Z7SIn+f9xz33+7mf+1me97N+7kwYOhwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOByOfyKqqqqW51C1MpbHsK6X+V/HKrDgxK0TyHZ0j/wXLFgwffr0SZMmjRo1asiQof379+/duzfXIUOG0PLUU09NmzZt/vz5y5YtS7/uWNswA/n222/Hjx9/5plnBrVDSUnJuHHj5s2blxjHsfYgIf/000+33367EbHhhhu2aNGiVatWO+ywQ8uWLbnffvvtubZs0ZIW2rlv3Lix9R88eHB5eXnolK1lSLwzZsyADsTepEmTtm3bbrbZZnXq1KnRuOiz6aabtmnTplmzZmp59913w8g3rutt/X9CZL3xxhuSdvv27Rs0aKD79dZbr06ELKYAffRzgw02aNeune5ffvnl0K1sLUAi/eSTTxDyRhtt1Lx58zx2VO19AljlVlttxc0HH3wQOmVrFHJZv/322+GHH46Et9tuO65QRmxq3bq1YhY3xCkowHyMKe5poZ2n9FF/fm655ZZ169bdeuut6bPXXnstWrQo/K86xkTpukbGlPJPmDAB8e64445cN9544yzD4RHZBTdcCVhZ3QoLC4PIqXJ96KGHwr9oYrbNdGG+Znlfq1qUHnz1p9MIv/zyS+fOneUMJXCS89GjR0+ZMmVahFdffXXs2LEXX3yxuTvdXHTRRWPGjOGpuk2dOvWBBx4455xz9JSMhSvh7Oeff67lakVN/j7/Cu+qzVZUVHz88cezZ88m1nz33XfhalOmvb/11lsIFp+2+eabc/P6669nrWHu3LmUyfS5+eaby8rKskRHcij2cY/cwGNYCzlbB7b52muv3XfffX369OnZs+f1119/2223UZjPmTMn0fMfC63w6aefNp9zzz33hKu9ctF96623ysVtu+223Egsv//++xdffEF6j+GgIQpDAqW03S9evJj+0yPAIHGQxq+++opxCGQqDfr37x/WpFrayK+//gpNm2yySZanveSSSz777LMaR8u/XxZ54403XnHFFeedd15paekqj5YH2s7zzz/Pmg8++GCuDz74YLgmNG3JkiXdunVjQOKRzOHxxx+nfeHChfopHHjggcOGDYMIe/Gbb74ZMWLEEUccEZcnpsGjZ599lnteVyg86qijxGOWWLQLPEZRUbHG2XPPPVu1/nP2hg0bkrqIfYAc4qOlT56zzqL1CltT+gpuuukmWpYuW5qQZGKErKPReDfbC9DpXNy+7r333jDFV3qKPJqjR99//70GXH/99ZXUEac07P3338/PffbZp1GjRjYvfkmvk6urpXHjxnvvvTc3d955px5dc801/MRaqcuaNm3KPeRm8aVGLOvorkfTc7fddlNKA84///xrr7328ssv79ixo1rIYTBbbt5555309uPsVzuLHnE98sgjRdkdd9xRyxHSj2rMKNhUeXn5jz/+yBVHlOiZRU3WI02Ne5FsudarV0+UESXD6GAKreZnmzZtiG5G2RNPPMHTysrKQw89NIgyiiA6tvrhhx9oxyvKWgsKCoIoLHL98MMPs+Sgxrvvvptuu+66q3QDy0WRbNlkRFTfop7Cgesuu+xiLhqxEDHx22+//bacOSLCBnFB5L0fffRRfKKvv/6aPGq//fbTXvCKrI3X8fxLly6Ni/rzzz8njOIrnnnmmVdeeYWRjW6jhoDOpEzNCEQQ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IGRlZgoxIGJlZ2luY29kZXNwYWNlcmFuZ2UKPDAwMDA+IDxGRkZGPgplbmRjb2Rlc3BhY2VyYW5nZQoyIGJlZ2luYmZyYW5nZQo8MDAwMD4gPDAwMDA+IDwwMDAwPgo8MDAwMT4gPDAwM0E+IFs8MDAyRD4gPDAwNTQ+IDwwMDY4PiA8MDA2OT4gPDAwNzM+IDwwMDIwPiA8MDA2RT4gPDAwNjY+IDwwMDZGPiA8MDA3Mj4gPDAwNkQ+IDwwMDYxPiA8MDA3ND4gPDAwNzk+IDwwMDc2PiA8MDA2NT4gPDAwNjI+IDwwMDY0PiA8MDA2Mz4gPDAwNkM+IDwwMDc1PiA8MDA3Nz4gPDAwNzA+IDwwMDQ2PiA8MDA2Qj4gPDAwNjc+IDwwMDJDPiA8MDA1Mj4gPDAwMkU+IDwwMDQ5PiA8MDAzOD4gPDAwMzE+IDwwMDQ4PiA8MDA0RD4gPDAwMzA+IDwwMDMyPiA8MDAzMz4gPDAwM0E+IDwwMDQ1PiA8MDA0ND4gPDAwNTM+IDwwMDM2PiA8MDAzNT4gPDAwMzk+IDwwMDM0PiA8MDA1OT4gPDAwNDM+IDwwMDQxPiA8MDA3OD4gPDAwNEM+IDwwMDRFPiA8MDA0Nz4gPDAwNEY+IDwwMDU1PiA8MDAyQT4gPDAwMjg+IDwwMDUxPiA8MDAyOT4gXQplbmRiZnJhbmdlCmVuZGNtYXAKQ01hcE5hbWUgY3VycmVudGRpY3QgL0NNYXAgZGVmaW5lcmVzb3VyY2UgcG9wCmVuZAplbmQKCmVuZHN0cmVhbQplbmRvYmoKNyAwIG9iago8PCAvVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTAKL0Jhc2VGb250IC9OaW1idXNTYW5zLVJlZ3VsYXIKL0VuY29kaW5nIC9JZGVudGl0eS1ICi9EZXNjZW5kYW50Rm9udHMgWzE3IDAgUl0KL1RvVW5pY29kZSAxOCAwIFI+PgplbmRvYmoKMjAgMCBvYmoKPDwgL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvUVVBQUFBK05pbWJ1c1NhbnMtQm9sZAovRmxhZ3MgNCAKL0ZvbnRCQm94IFstMTg4IC0zMDcgMTA2OSAxMDcwIF0KL0l0YWxpY0FuZ2xlIDAgCi9Bc2NlbnQgNzI5IAovRGVzY2Vu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JVplJNH4XOz//dT/ANc1aIgKZW5kc3RyZWFtCmVuZG9iagoyNCAwIG9iagozNDgxCmVuZG9iagoyMiAwIG9iago8PCAvVHlwZSAvRm9udAovU3VidHlwZSAvQ0lERm9udFR5cGUyCi9CYXNlRm9udCAvTmltYnVzU2Fucy1Cb2xkCi9DSURTeXN0ZW1JbmZvIDw8IC9SZWdpc3RyeSAoQWRvYmUpIC9PcmRlcmluZyAoSWRlbnRpdHkpIC9TdXBwbGVtZW50IDAgPj4KL0ZvbnREZXNjcmlwdG9yIDIwIDAgUgovQ0lEVG9HSURNYXAgL0lkZW50aXR5Ci9XIFswIFsyNzYgNzE2IDU1MiA1NTIgMjc2IDMzMCA2MDYgNTUyIDU1MiA2MDYgNjA2IDYwNiA2MDYgMjc2IDY2MiA1NTIgNjA2IDM4NiA3MTYgNzE2IDc3MiA3MTYgNjA2IDI3NiA3MTYgNzE2IDYwNiAyNzYgNzcyIDMzMCA4ODIgNjA2IDY2MiA1NTIgNzE2IDYwNiA1NTIgNjYyIF0KXQo+PgplbmRvYmoKMjMgMCBvYmoKPDwgL0xlbmd0aCA2MjMgPj4Kc3RyZWFtCi9DSURJbml0IC9Qcm9jU2V0IGZpbmRyZXNvdXJjZSBiZWdpbgoxMiBkaWN0IGJlZ2luCmJlZ2luY21hcAovQ0lEU3lzdGVtSW5mbyA8PCAvUmVnaXN0cnkgKEFkb2JlKSAvT3JkZXJpbmcgKFVDUykgL1N1cHBsZW1lbnQgMCA+PiBkZWYKL0NNYXBOYW1lIC9BZG9iZS1JZGVudGl0eS1VQ1MgZGVmCi9DTWFwVHlwZSAyIGRlZgoxIGJlZ2luY29kZXNwYWNlcmFuZ2UKPDAwMDA+IDxGRkZGPgplbmRjb2Rlc3BhY2VyYW5nZQoyIGJlZ2luYmZyYW5nZQo8MDAwMD4gPDAwMDA+IDwwMDAwPgo8MDAwMT4gPDAwMjU+IFs8MDA0OD4gPDAwNjU+IDwwMDYxPiA8MDA2Qz4gPDAwNzQ+IDwwMDY4PiA8MDAzOD4gPDAwMzE+IDwwMDU0PiA8MDA3MD4gPDAwNkY+IDwwMDZFPiA8MDAyMD4gPDAwNDU+IDwwMDYzPiA8MDA3NT4gPDAwNzI+IDwwMDUyPiA8MDA0Mz4gPDAwNEY+IDwwMDRFPiA8MDA0Nj4gPDAwNDk+IDwwMDQ0PiA8MDA0MT4gPDAwNEM+IDwwMDY5PiA8MDA0Nz4gPDAwM0E+IDwwMDZEPiA8MDA2ND4gPDAwNTA+IDwwMDczPiA8MDA0Mj4gPDAwNjc+IDwwMDc2PiA8MDA1Mz4gXQplbmRiZnJhbmdlCmVuZGNtYXAKQ01hcE5hbWUgY3VycmVudGRpY3QgL0NNYXAgZGVmaW5lcmVzb3VyY2UgcG9wCmVuZAplbmQKCmVuZHN0cmVhbQplbmRvYmoKNiAwIG9iago8PCAvVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTAKL0Jhc2VGb250IC9OaW1idXNTYW5zLUJvbGQKL0VuY29kaW5nIC9JZGVudGl0eS1ICi9EZXNjZW5kYW50Rm9udHMgWzIyIDAgUl0KL1RvVW5pY29kZSAyMyAwIFI+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgClsKNSAwIFIKXQovQ291bnQgMQovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUNdCj4+CmVuZG9iagp4cmVmCjAgMjUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMTkyMzkgMDAwMDAgbiAKMDAwMDAwMDE1NyAwMDAwMCBuIAowMDAwMDAwMjUyIDAwMDAwIG4gCjAwMDAwMDQyNTYgMDAwMDAgbiAKMDAwMDAxOTA5OCAwMDAwMCBuIAowMDAwMDE0MTA5IDAwMDAwIG4gCjAwMDAwMDAyODkgMDAwMDAgbiAKMDAwMDAwNDE4NiAwMDAwMCBuIAowMDAwMDA0MjA2IDAwMDAwIG4gCjAwMDAwMDQ1ODQgMDAwMDAgbiAKMDAwMDAwNzQ0NiAwMDAwMCBuIAowMDAwMDA0Mzc3IDAwMDAwIG4gCjAwMDAwMDQ1NjQgMDAwMDAgbiAKMDAwMDAwNzQ2NyAwMDAwMCBuIAowMDAwMDA3NjgwIDAwMDAwIG4gCjAwMDAwMTI4MzMgMDAwMDAgbiAKMDAwMDAxMzI4NyAwMDAwMCBuIAowMDAwMDEyODEyIDAwMDAwIG4gCjAwMDAwMTQyNTMgMDAwMDAgbiAKMDAwMDAxNDQ2MyAwMDAwMCBuIAowMDAwMDE4MDU2IDAwMDAwIG4gCjAwMDAwMTg0MjMgMDAwMDAgbiAKMDAwMDAxODAzNSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDI1Ci9JbmZvIDEgMCBSCi9Sb290IDEwIDAgUgo+PgpzdGFydHhyZWYKMTkzMzcKJSVFT0YK"
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "CommunicationID_72612_1683566334437_1",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "CommunicationReceivingPractionerId_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1",
                  "name": [
                    {
                      "family": "WEBER",
                      "given": [
                        "Linda"
                      ]
                    }
                  ],
                  "telecom": [
                    {
                      "system": "fax",
                      "value": "4163548289",
                      "use": "work",
                      "rank": 1
                    }
                  ],
                  "qualification": [
                    {
                      "identifier": [
                        {
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "72612"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "Org_Healthcare Navigator Service",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": "1000"
                    }
                  ],
                  "name": "Healthcare Navigator Service"
                }
              ],
              "recipient": [
                {
                  "reference": "CommunicationReceivingPractionerId_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1"
                }
              ],
              "sender": {
                "reference": "Org_Healthcare Navigator Service"
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
      "id": "Diag_3ff1f477-56d9-401c-bcc4-888c391cde07",
      "issue": [
        {
          "severity": "information",
          "code": "OTN_SUCCESS",
          "diagnostics": "Queued for delivery to FAX#4163548289",
          "location": "Communication/Recipient/CommunicationReceivingPractionerId_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1"
        }
      ]
    }
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(200)
})

test('DRA_F73-2 - DiagnosticReport Reguina Variations long patient email - DRA-100', async({page}) => {
  setReport('Daniela Tests', 'DRA_F73-2')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "Bun_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1",
        "type": "collection",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "Diag_3ff1f477-56d9-401c-bcc4-888c391cde07",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "Pat_5555555555_1683566334437_1",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "5555555555"
                    }
                  ],
                  "name": [
                    {
                      "family": "Dobson",
                      "given": [
                        "Dob"
                      ]
                    }
                  ],
                  "gender": "male",
                  "birthDate": "1960-04-20",
                  "telecom": [
                    {
                      "system": "email",
                      "value": "reguina.ek@orionhealth.com",
                      "use": "home",
                      "rank": 1
                    },
                    {
                      "system": "phone",
                      "value": "1231231234",
                      "use": "home",
                      "rank": 2
                    }
                  ],
                  "address": [
                    {
                      "use": "home",
                      "line": [
                        "Line 1"
                      ],
                      "city": "City",
                      "state": "ON",
                      "postalCode": "L1L1L1",
                      "country": "CA"
                    }
                  ]
                },
                {
                  "resourceType": "Encounter",
                  "id": "Enc_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1",
                  "text": {
                    "status": "generated",
                    "div": "Healthcare Navigation System Encounter"
                  },
                  "identifier": [
                    {
                      "system": "http://otn.ca/encounterId",
                      "value": "3ff1f477-56d9-401c-bcc4-888c391cde07"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://otn.ca/DRAPI/ActCode",
                    "code": "VV"
                  },
                  "period": {
                    "start": "2023-05-08T17:12:53",
                    "end": "2023-05-08T17:12:53"
                  },
                  "contained": [
                    {
                      "resourceType": "Practitioner",
                      "id": "Prac_reguina.clinmang_1683566334437_1",
                      "name": [
                        {
                          "family": "Clinical Manager",
                          "given": [
                            "reguina"
                          ]
                        }
                      ],
                      "telecom": [
                        {
                          "system": "phone",
                          "value": "1-866-553-7205",
                          "use": "work",
                          "rank": 1
                        }
                      ],
                      "qualification": [
                        {
                          "identifier": [
                            {
                              "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-nurse",
                              "value": "reguina.clinmang"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "participants": [
                    {
                      "type": {
                        "system": "http://hl7.org/fhir/ValueSet/encounter-participant-type",
                        "code": "PPRF"
                      },
                      "individual": {
                        "reference": "Prac_reguina.clinmang_1683566334437_1"
                      }
                    }
                  ]
                }
              ],
              "subject": {
                "reference": "Pat_5555555555_1683566334437_1"
              },
              "context": {
                "reference": "Enc_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1"
              },
              "effectiveDateTime": "2023-05-08T17:12:53",
              "conclusion": "",
              "presentedForm": [
                {
                  "contentType": "application/pdf",
                  "data": "abc"
                },
                {
                  "contentType": "application/pdf",
                  "data": "def"
                }
              ]
            }
          },
          {
            "resource": {
              "resourceType": "Communication",
              "id": "CommunicationID_72612_1683566334437_1",
              "contained": [
                {
                  "resourceType": "Practitioner",
                  "id": "CommunicationReceivingPractionerId_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1",
                  "name": [
                    {
                      "family": "WEBER",
                      "given": [
                        "Linda"
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
                          "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-license-physician",
                          "value": "72612"
                        }
                      ]
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "id": "Org_Healthcare Navigator Service",
                  "identifier": [
                    {
                      "system": "http://otn.ca/hrmhostorg",
                      "value": process.env.validOrgID
                    }
                  ],
                  "name": "Healthcare Navigator Service"
                }
              ],
              "recipient": [
                {
                  "reference": "CommunicationReceivingPractionerId_3ff1f477-56d9-401c-bcc4-888c391cde07_1683566334437_1"
                }
              ],
              "sender": {
                "reference": "Org_Healthcare Navigator Service"
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

  expect(body).toContain('Field too long: 26 > 25|PATIENT_RESULT[0]')
  expect(res.status()).toEqual(200)
})

test('DRA_F73-3 - Report Vivify finished VV', async({page}) => {
  setReport('Functional Tests', 'DRA_F73-3')
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
              "id": "#report1-DISCHARGE REPORT",
              "status": "final",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "#p1",
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
                  "id": "#enc1",
                  "text": {
                    "status": "generated",
                    "div": "Virtual Visit Encounter"
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
                      "value": "daskjdhask"
                    }
                  ],
                  "status": "finished",
                  "class": {
                    "system": "http://hl7.org/fhir/v3/ActCode",
                    "code": "VV"
                  },
                  "participant": [
                    {
                      "individual": {
                        "reference": "339c54c3-656f-4d47-90e8-3e12004d4a26"
                      }
                    }
                  ],
                  "period": {
                    "start": "2017-01-01T13:00",
                    "end": "2017-02-02T13:00"
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
                      "system": "http://otn.ca/hrmhostorg",
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
      "id": "#report1-DISCHARGE REPORT",
      "issue": [
        {
          "severity": "information",
          "code": "OTN_SUCCESS",
          "diagnostics": "1/2 Successful Delivery to EMR",
          "location": "Communication/Recipient/#pr1"
        },
        {
          "severity": "information",
          "code": "OTN_SUCCESS",
          "diagnostics": "2/2 Successful Delivery to EMR",
          "location": "Communication/Recipient/#pr1"
    }
      ]
        }
  
  expect(body).toEqual(expected)
  expect(res.status()).toEqual(200)
})

test('DRA_74-1 - DiagnosticReport patient without name array', async({page}) => {
    setReport('Functional Tests', 'DRA_74-1')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
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
                    "status": "request-for-care",
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
      "issue": [
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "Pointer to Validation error:#/entry/0"
        },
        {
          "severity": "fatal",
          "code": "OTN_RESOURCE_VALIDATION_ERROR",
          "diagnostics": "#/entry/0/resource/contained/0: required key [name] not found"
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

test('DRA_F74-2 - DiagnosticReport with blank patient names', async({page}) => {
  setReport('Functional Tests', 'DRA_F74-2')
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
  const body = await res.text()
  console.log(body)

  expect(body).toContain("PatientName[0]")
  expect(res.status()).toEqual(400)
})

test('DRA_F74-3 - DiagnosticReport with blank patient given name', async({page}) => {
   setReport('Functional Tests', 'DRA_F74-3')
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
                      "family": "Gorkin",
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
                        "Jason"
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

test('DRA_F75 - REPORT- status "arrived" pdf, pdf, INVALID patient_id', async({page}) => {
  setReport('Functional Tests', 'DRA_F75')
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
                    "system": "http://otn.ca/patient-id",
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
                    "system": "http://otn.ca/hrmhostorg",
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

test('DRA_F76 - DiagnosticReport with Patient object with OHIP numbers only', async({page}) => {
  setReport('Functional Tests', 'DRA_69')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
  const res = await apiContext.post(`/diagnosticreports/`, {
      data: {
        "resourceType": "Bundle",
        "id": "2020-0501-0001",
        "type": "collection",
        "entry": [
          {
            "resource": {
              "resourceType": "DiagnosticReport",
              "id": "Initial Report",
              "contained": [
                {
                  "resourceType": "Patient",
                  "id": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6",
                  "identifier": [
                    {
                      "system": "http://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn",
                      "value": "1234567890"
                    },
                    {
                      "system": "http://otn.ca/patient-id",
                      "value": "aed6c8e6-4e09-47f4-a4ae-78bb049abcd6"
                    }
                  ],
                  "name": [
                    {
                      "family": "Crisp",
                      "given": [
                        "Chris"
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
                          "family": "Dolittle",
                          "given": [
                            "John"
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
                      "family": "Jekyll",
                      "given": [
                        "Henry"
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
    "id": "Initial Report",
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


test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});