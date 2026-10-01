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

test('DRA_S1 - Send a valid request with a valid signature and API key', async({page}) => {
    setReport('Security Tests', 'DRA_S1')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey1, process.env.sharedsecret1, d.toISOString())
    const res = await apiContext.post(`${process.env.baseUrl}/diagnosticreports/`, {
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

test('DRA_S1_Sbx - Send a valid request with a valid signature and API key', async({page}) => {
  setReport('Security Tests', 'DRA_S1')
  const d = new Date()
  let signature = generateSignature("POST", `https://api-sandbox.awsstagingotn.ca/hub/v1/diagnosticreports`, process.env.apikey4, process.env.sharedsecret4, d.toISOString())
  const res = await apiContext.post(`https://api-sandbox.awsstagingotn.ca/hub/v1/diagnosticreports`, {
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


test('DRA_S2 - Send a request with an invalid API Key', async({page}) => {
    setReport('Security Tests', 'DRA_S2')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, "apikeyinvalid", process.env.sharedsecret2, d.toISOString())
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
        "resourceType":"OperationOutcome",
        "issue": [
            {
                "severity":"fatal",
                "code":"OTN_INVALID_API_KEY",
                "diagnostics":"found 0 user(s) with apikey:apikeyinvalid"
            }
        ]
    }
    expect(body).toEqual(expected)
    expect(res.status()).toEqual(401)
})

//------------------------------------------------------------------------------------------
test('DRA_S3 - Send a request with an invalid shared secret', async({page}) => {
    setReport('Security Tests', 'DRA_S3')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey2, "badsecret", d.toISOString())
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
            "code": "OTN_INVALID_SIGNATURE",
            "diagnostics": regexMatchAll,
          }
        ]
      } 
    ResponseValidation(expected,body)
    expect(res.status()).toEqual(401)
})

test('DRA_S4-1 - Send a request with an invalid signature url', async({page}) => {
    setReport('Security Tests', 'DRA_S4-1')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnostic123reports`, process.env.apikey8, process.env.sharedsecret8, d.toISOString())
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
            "code": "OTN_INVALID_SIGNATURE",
            "diagnostics": "Signature does not match"
          }
        ]
      }
    expect(body).toEqual(expected)
    expect(res.status()).toEqual(401)
})


//Needs / anyway?
test('DRA_S5 - Send a request with a trailing slash in the URL', async({page}) => {
    setReport('Security Tests', 'DRA_S5')
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
                  "id": "#report1-VIRTUAL VISIT",
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
                          "family": "Patient",
                          "given": [
                            "ForTest"
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
                      "data": "LP7Kdi+cfVZl/mp+Q/MO4aftMXPwS5xA1Nu2YEDSQgZeRjesTk4bhbpMvPHb6OiJYG3uD7cG1zoAncRwPAFPaG27fUwLXbBtb7jwrTXPh+I/sc7MyBkX+qG7BAAbM8IKNlta24htTqRA9jjJH3oCLEdzakiklqkhyusMoOTSbsau1u0xbc172D+TtrY7X4qi9mC1pLMHEvcOKmUWhzvJpNZE/FanUcq6q6unHdZ6jmlxrrbTx4l17mD7lV6jZk10PZdkXvx31n1ra24/sBGv57XyP5IKTJHp/F2QfaNI0Gnhpwkk2NrY1G0QfKEkmNHjR+ln/AEn8AiuGjf6zfyoWPzb/AMZ/AI1gO1pHdzfyqvPaHmW3H55+UfyZuPtJ8lm/Vx0dGxx52f8Anx60DIaSTJg+Kzfq7/yPRB72f+fHqIfKfMftZersVDda0bxXJ0eTAHmSrhxDz+0K/wDtz/aquGC/JrbDXS6NruD8dFouZkAkDp1RgxIA1TojT/f/AGKKKjGrZaHXZ1dlY5YLIJ0+KzbC3c6OJMfCVqluTBH7Nqj4BZJa7cZEa8eGvCU9hp+f7VBYkOG0iQRBmDIXO5n1MxLnmzFuOMTrsID2A+WrSPvW/e57KLHsbvexjnMbqZIEgQNVzX/OT6x/+Vh/7auShxamJpRrqt/zZ69UP0HUoA4HqWs/Bspv2F9ax/3og/8AoRd/5BP/AM5PrH/5WH/tq5L/AJyfWLj9mnXt6Vyf+s/qo08VfsL62f8AliP+37v/ACCY9D+tfH7RH/sRd/5BS/5yfWOf+TD8PSuQGfW/q9tnp14lb7BMsa2wuEc6B0o+vtFWnik/Yf1r/wDLEf8Ab93/AJBOOhfWs8dRH/b93/kE/wDzk+sX/laf+2rkv+cn1iiP2Yf+2rkPX2irTxUPq/8AWZw/SdTgeV1x/wC+hSH1NyLnh2bnusjsAXH5Oe7T7kw+sv1jHHTD/wBtXJf85frH/wCVh/7auS/WeA+xXp8Xd6f0rD6ZQasZpG4y97tXOP8AKKtAiPFZnROp9SzzcM7FOLsjZLHsmf660/FRSuze64bN/p1Buqc4Zf2aHRsmJ05+k1W/sTv/ACzP+d/6kVLBON6bmX4z8hxdIcyZAjjSFcbiYNphuJk1/ER/1TlJEAgaA/UrTuv9id/5Z/8AS/8AUip59Jp9P9Z+1bt3edsR/Kdyr/7ExnNndbX/AFi0/kWfn4dWK5np2i3dMj92I8ClMED5a+qgdd2oNHeGq3+ofSZ8FgxJE/gt7qH0mfBO5b+cDHzH82Wos7p39Nz9P8IP+patBM7HppsD6mbXXN32HX3OktnXyCvyHqj4E/k1scwMeaP78YgfSQK6oO/5cbp/gOfmFfSfj07WZW39Pv8AT9ST9GCYjhCYvh/vBWGYj7l/pY5R+1SoV/8ALdun+Bar6T8elvp5LWRdYSx75OrQNB4IzF8PhL9isMxEZQf0sZiP8YH9ilQyP+WcbT/Bv/KFoJn49JY3JLZuY8Ma/XRrpkeHZKYsD+9H81YJiJkT1xzj/jRpSP0v+au+H8EBH6X/ADV3w/gmcx/NS84rcH87Hyk5mT9HXxWN1Q/rvTJ/0zvyNWzkcfNY3VJ+3dN7/pnfkCoT+f6fsdAbN+e89+6wMp+7Id6XQyXTH2gjYT5zUwuK3x4cKNt1NIBttZWDwXuDfypkTXS0l50V9RBmsZeK3wrZbd93r37f+it/FLzjVmxz3P2iTYGseT/Ka3QFFa5r27q3BzTwQZB+5SAkSjKVqApBlVZNzA3GyDjPBlzgxr5H7sOVU4fV4JPUyQAT/MVnhaQSJI54QB8vsU43Tc7qVuaysvtyMZzXG2y/GOMWED2wTG6fCFrwDr/cndqFA7+e3zSJs7UoOXlv+sQveKGUHGB/RmuDaR/K9R7GyqWTb1gCsuPUGzY31Q1lG30/ztv2fc6fBdD3nx55Uu2nCIlXQKrxamAWHFYWOtc0zByN3qc/nbwCo9WflswCcMP9VzmgmtrXPDZ9xaHaSrh8E86cx/chetqcCXnWetHzmtExLM5ufjioZ7qHFwyBmhhaG7faWubqDuW5BPCQOqPH4IplPZZeY/6yDJeMVlBxJ/Rke60iO4sexnK1NSpaoA10B80vNZVvW9gJPUGv3s3tbXj7PTn37fQ3vmOFs9LfWcQGo3lu539K3+rM6z6oDo8OyuCfklPiiZWKqvJFLFZnSz/lTqx/4av/AM81rUnVZnTP+VOr/wDHV/8AnmtAbS8v2qPR09EbH9I7vUyDj8RAJn/NQfIq1iWUMx8gXjc1232AkE890o7/AMVFkRjd893+a7+9NGLH/KDv81/96iLumkf0Z0dveUvV6d/3Gd/245Psf1f+cr7fwa2U1nqey43iPpkEH4aq/iV2Nwq3Yzaza8k2OfE+UKnf6ReDTWamxwST85KsU49DcZlzqH5L7Cfa3cAAPHahH5io7NuuvJsJZltpdUQdREgxpCojpWUNJZ/nBGqxqLyavslmOSDFkuIkD+UFS+y5U/zL/wDNd/cnS6WL8b/sQGFjSx5a780wVAbYhSIIMEQR2MymiVEuel/7T/2P4LmSdT8TMrU/bJ2bDT2id3/mKzjwY+9SZZCVUVsQRaSnKvpP6OwtHhyPu4VyrrNo0tYHjxaYKz/yJFvhyE0TkNikgF3K+qYj+XGs+Dh/ESrDLqrNa3tdPgQVzUHv/FNyU8Zj1Fo4A9Q4nafguaIlOy21ohr3AeRIUSfNNnPirSqSBSmtaXQSR4cfxV7FrxW49xusDgXSQRqPaNG/7FRnw7qO10+Sh4PVxWdqpeJenhobsrqz6YOM63dpIgkecTp9yyn1dSLrfXcd+0+luAGsHbwtdtz6xt0c3zUhf/wbY/18ln/ds0ZzIgJCUiQQR186bkObjERFbD6/k4HS8fqbWO/bLmuskbPSge2BzotFtWJ4GfMlXL7G2kH02MAEQ0ET8UEsrHICtnDLiMgMZ4jdSjst+9RMREnLGhXom1ns6cMvGLmj7SHO+zHWZg7uNOPFWyY5/Khuxcd9td7mfpKZNZkiJEFTcdY4U0AREA0D/V2+jWySBkSDIjvP5n"
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
                          "family": "Lastone",
                          "given": [
                            "MD"
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
                          "value": "416-555-5555",
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
        "id": "#report1-VIRTUAL VISIT",
        "issue": [
          {
            "severity": "information",
            "code": "OTN_SUCCESS",
            "diagnostics": "Successful Delivery to EMR",
            "location": "Communication/Recipient/#pr1"
          }
        ]
      }
    expect(body).toEqual(expected)
    expect(res.status()).toEqual(200)
})

test('DRA_S5-1 - Send a request with an invalid url', async({page}) => {
    setReport('Security Tests', 'DRA_S5-1')
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey2, process.env.sharedsecret2, d.toISOString())
    const res = await apiContext.post(`/diagnosticreports123/`, {
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
    const expected = "No service at this location"
    expect(body).toEqual(expected)
    expect(res.status()).toEqual(404)
})

test('DRA_S5-2 - Send a request with request URL with a Capital letter and no trailing slash', async({page}) => {
  setReport('Security Tests', 'DRA_S5-2')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
  const res = await apiContext.post(`${process.env.baseUrl}/diagnosticReports`, {
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
  //expect(body).toContain("OTN_SUCCESS") 
  expect(res.status()).toEqual(200)
})

test('DRA_S-3 - Send a request with request URL with a Capital letter and trailing slash', async({page}) => {
  setReport('Security Tests', 'DRA_S5-3')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports/`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
  const res = await apiContext.post(`${process.env.baseUrl}/diagnosticReports/`, {
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

test('DRA_S5-4 - Send a request with request URL without a trailing slash', async({page}) => {
  setReport('Security Tests', 'DRA_S5-4')
  const d = new Date()
  let signature = generateSignature("POST", `${process.env.baseUrl}/diagnosticreports`, process.env.apikey3, process.env.sharedsecret3, d.toISOString())
  const res = await apiContext.post(`${process.env.baseUrl}/diagnosticreports`, {
      data: {
        "resourceType": "Bundle",
        "id": "20cdaee7-3931-4161-b83e-94557bb76e7b",
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


test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});