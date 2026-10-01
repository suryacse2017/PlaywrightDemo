import { APIResponse } from "@playwright/test";

export const resources =
{
  GetLocation: "/hsd/directory/v1/Location",
  PostLocation: "/hsd/directory/v1/Location/_search",
  GetOrganization: "/hsd/directory/v1/Organization",
  PostOrganization: "/hsd/directory/v1/Organization/_search",
  GetHealthcareService: "/hsd/directory/v1/HealthcareService",
  PostHealthcareService: "/hsd/directory/v1/HealthcareService/_search",
  GetPractitioner: "/hsd/directory/v1/Practitioner",
  PostPractitioner: "/hsd/directory/v1/Practitioner/_search",
  BulkExport: "/hsd/directory/v1/$export",
  BulkImport: "/hsd/directory/v1/$import",
  jwtToken: "eyJhdWRpdFRyYWNraW5nSWQiOiJVVUlEMTIzNDU2Nzg5MCIsInVzZXJuYW1lIjoicmZlbGxvd0BlbXJ0ZXN0LmNhIiwiZ2l2ZW5fbmFtZSI6IlRlc3RGaXJzdE5hbWUiLCJmYW1pbHlfbmFtZSI6IlRlc3RMYXN0TmFtZSIsInNjb3BlIjoic3lzdGVtL09yZ2FuaXphdGlvbi5yZWFkIHN5c3RlbS9QcmFjdGl0aW9uZXIucmVhZCBzeXN0ZW0vSGVhbHRoY2FyZVNlcnZpY2UucmVhZCBzeXN0ZW0vTG9jYXRpb24ucmVhZCBzeXN0ZW0vUEhTRC5FeHBvcnQgUHJhY3RpdGlvbmVyLmFsbG93ZWQgSGVhbHRoY2FyZVNlcnZpY2UuYWxsb3dlZCUzRnByb2dyYW0lM0RUSDgxMSUyQ0Nvbm5leCIsInVhbyI6InVybjplaGVhbHRoOnJpZDogMS4yLjMuNDU6MTIzNCIsInVhb1R5cGUiOiJvcmciLCJ1YW9OYW1lIjoiT250YXJpbyBUZWxlbWVkaWNpbmUgTmV0d29yayIsImV4cGlyZXNfaW4iOjB9",
  scopeToken: "eyJhdWRpdFRyYWNraW5nSWQiOiJVVUlEMTIzNDU2Nzg5MCIsInVzZXJuYW1lIjoicmZlbGxvd0BlbXJ0ZXN0LmNhIiwiZ2l2ZW5fbmFtZSI6IlRlc3RGaXJzdE5hbWUiLCJmYW1pbHlfbmFtZSI6IlRlc3RMYXN0TmFtZSIsInNjb3BlIjoic3lzdGVtL09yZ2FuaXphdGlvbi5yZWFkIHN5c3RlbS9QcmFjdGl0aW9uZXIucmVhZCBzeXN0ZW0vSGVhbHRoY2FyZVNlcnZpY2UucmVhZCBzeXN0ZW0vTG9jYXRpb24ucmVhZCBzeXN0ZW0vUEhTRC5FeHBvcnQgUHJhY3RpdGlvbmVyLmFsbG93ZWQgSGVhbHRoY2FyZVNlcnZpY2UuYWxsb3dlZCUzRnByb2dyYW0lM0RUSDgxMSUyQ0Nvbm5leCIsInVhbyI6InVybjplaGVhbHRoOnJpZDogMS4yLjMuNDU6MTIzNCIsInVhb1R5cGUiOiJvcmciLCJ1YW9OYW1lIjoiT250YXJpbyBUZWxlbWVkaWNpbmUgTmV0d29yayIsImV4cGlyZXNfaW4iOjB9.e30.Y1NskxCPgULz-NXevJcbkDHJgHYKl2JM128tsN5j5QY",
 noScopeToken:"eyJhdWRpdFRyYWNraW5nSWQiOiJVVUlEMTIzNDU2Nzg5MCIsInVzZXJuYW1lIjoicmZlbGxvd0BlbXJ0ZXN0LmNhIiwiZ2l2ZW5fbmFtZSI6IlRlc3RGaXJzdE5hbWUiLCJmYW1pbHlfbmFtZSI6IlRlc3RMYXN0TmFtZSIsInVhbyI6InVybjplaGVhbHRoOnJpZDogMS4yLjMuNDU6MTIzNCIsInVhb1R5cGUiOiJvcmciLCJ1YW9OYW1lIjoiT250YXJpbyBUZWxlbWVkaWNpbmUgTmV0d29yayIsImV4cGlyZXNfaW4iOjAsImFsZyI6IkhTMjU2In0.e30.iXgI5gKmmu1PTaR8THqmXldhgRMksXfy0UB7yiDiFFA",

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
  method: string;
  fullUrl: string;
  headers?: Record<string, string>;
  body?: any;
  response: APIResponse;
};

export async function logApiCall({ method, fullUrl, headers, body, response }: ApiLogOptions) {
  console.log('==================== API CALL ====================');
  console.log(`→ Method: ${method}`);
  console.log(`→ URL: ${fullUrl}`);
  if (headers) console.log(`→ Headers: ${JSON.stringify(headers, null, 2)}`);
  if (body) console.log(`→ Body: ${JSON.stringify(body, null, 2)}`);

  console.log(`← Status: ${response.status()}`);
  const respBody = await response.text(); // Or response.json() if you're sure
  console.log(`← Response Body: ${respBody}`);
  console.log('===================================================');
}

export async function requestBody(uploadURL:any,resorceType:any)
 {
            const requestBody =
                        {
                          resourceType: "Parameters",
                          parameter: [
                            {
                              name: "inputFormat",
                              valueCode: "application/fhir+ndjson",
                            },
                            {
                              name: "storageDetail",
                              part: [
                                {
                                  name: "type",
                                  valueCode: "https",
                                },
                                {
                                  name: "credentialHttpBasic",
                                  valueString: "admin:password",
                                },
                              ],
                            },
                            {
                              name: "input",
                              part: [
                                {
                                  name: "type",
                                  valueCode: resorceType,
                                },
                                {
                                  name: "url",
                                  valueUri: uploadURL // Replace with actual URL or variable
                                },
                              ],
                            },
                          ],
                        };
                        return requestBody;
 
}

export async function requestBodyInvalidInputFormat(uploadURL:any,resorceType:any)
 {
            const requestBody =
                        {
                          resourceType: "Parameters",
                          parameter: [
                            {
                              name: "inputFormat",
                              valueCode: "application/xml",  //invalid format
                            },
                            {
                              name: "storageDetail",
                              part: [
                                {
                                  name: "type",
                                  valueCode: "https",
                                },
                                {
                                  name: "credentialHttpBasic",
                                  valueString: "admin:password",
                                },
                              ],
                            },
                            {
                              name: "input",
                              part: [
                                {
                                  name: "type",
                                  valueCode: resorceType,
                                },
                                {
                                  name: "url",
                                  valueUri: uploadURL // Replace with actual URL or variable
                                },
                              ],
                            },
                          ],
                        };
                        return requestBody;
 
}

export async function requestBodyMissingInputFormat(uploadURL:any,resorceType:any)
 {
            const requestBody =
                        {
                          resourceType: "Parameters",
                          parameter: [
                              {
                              name: "storageDetail",
                              part: [
                                {
                                  name: "type",
                                  valueCode: "https",
                                },
                                {
                                  name: "credentialHttpBasic",
                                  valueString: "admin:password",
                                },
                              ],
                            },
                            {
                              name: "input",
                              part: [
                                {
                                  name: "type",
                                  valueCode: resorceType,
                                },
                                {
                                  name: "url",
                                  valueUri: uploadURL // Replace with actual URL or variable
                                },
                              ],
                            },
                          ],
                        };
                        return requestBody;
 
}

export async function requestBodyInvalidInput(uploadURL:any,resorceType:any)
 {
            const requestBody =
                        {
                          resourceType: "Parameters",
                          parameter: [
                            {
                              name: "inputFormat",
                              valueCode: "application/fhir+ndjson",
                            },
                            {
                              name: "storageDetail",
                              part: [
                                {
                                  name: "type",
                                  valueCode: "https",
                                },
                                {
                                  name: "credentialHttpBasic",
                                  valueString: "admin:password",
                                },
                              ],
                            },
                            {
                              name: "input",
                              part: [
                                {
                                  name: "type",
                                  valueCode: resorceType+"123vfgrgr",
                                },
                                {
                                  name: "url",
                                  valueUri: uploadURL // Replace with actual URL or variable
                                },
                              ],
                            },
                          ],
                        };
                        return requestBody;
 
}

export async function requestBodyMissingInput(uploadURL:any)
 {
            const requestBody =
                        {
                          resourceType: "Parameters",
                          parameter: [
                            {
                              name: "inputFormat",
                              valueCode: "application/fhir+ndjson",
                            },
                            {
                              name: "storageDetail",
                              part: [
                                {
                                  name: "type",
                                  valueCode: "https",
                                },
                                {
                                  name: "credentialHttpBasic",
                                  valueString: "admin:password",
                                },
                              ],
                            },
                            {
                              name: "input",
                              part: [
                                {
                                  name: "url",
                                  valueUri: uploadURL // Replace with actual URL or variable
                                },
                              ],
                            },
                          ],
                        };
                        return requestBody;
 
}

export async function requestBodyInvalidUrl(uploadURL:any,resorceType:any)
 {
            const requestBody =
                        {
                          resourceType: "Parameters",
                          parameter: [
                            {
                              name: "inputFormat",
                              valueCode: "application/fhir+ndjson",
                            },
                            {
                              name: "storageDetail",
                              part: [
                                {
                                  name: "type",
                                  valueCode: "https",
                                },
                                {
                                  name: "credentialHttpBasic",
                                  valueString: "admin:password",
                                },
                              ],
                            },
                            {
                              name: "input",
                              part: [
                                {
                                  name: "type",
                                  valueCode: resorceType,
                                },
                                {
                                  name: "url",
                                  valueUri: uploadURL+123 // Replace with actual URL or variable
                                },
                              ],
                            },
                          ],
                        };
                        return requestBody;
 
}

export async function requestBodyMissingUrl(resorceType:any)
 {
            const requestBody =
                        {
                          resourceType: "Parameters",
                          parameter: [
                            {
                              name: "inputFormat",
                              valueCode: "application/fhir+ndjson",
                            },
                            {
                              name: "storageDetail",
                              part: [
                                {
                                  name: "type",
                                  valueCode: "https",
                                },
                                {
                                  name: "credentialHttpBasic",
                                  valueString: "admin:password",
                                },
                              ],
                            },
                            {
                              name: "input",
                              part: [
                                {
                                  name: "type",
                                  valueCode: resorceType,
                                },
                              ],
                            },
                          ],
                        };
                        return requestBody;
 
}