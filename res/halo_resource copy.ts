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
  fetchHeaders?: Record<string, string>;
  headers:any;
  body?: any;
  response: any;
};

export async function logApiCall({ method, url,fetchHeaders, body, response }: ApiLogOptions) {
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

export async function AppCatalogApiCall({ method, url,headers, body, response }: ApiLogOptions) {
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
    "id": "",
    "name": "PostmanTest1",
    "description": "app desc<br>testing<br><br>ljfdslakj",
    "descriptionShort": "app short desc",
    "tags": [],
    "helpUrl": "",
    "iconUrl": "https://local-catalogue-service-local-s3.s3.ca-central-1.amazonaws.com/files/4c3d29a2-34a4-48cd-8ac4-a37ce2d1dc04/icon_icon-panorama-inventory-training.png",
    "screenshots": [
        "https://local-catalogue-service-local-s3.s3.ca-central-1.amazonaws.com/files/4c3d29a2-34a4-48cd-8ac4-a37ce2d1dc04/screenshot_icon-panorama-inventory-training.png"
    ],
    "privacyPolicyUrl": "https://ehealthontario.on.ca/en/privacy",
    "termsOfServiceUrl": "",
    "launchUrl": "https://awstestotn.ca/login",
    "eligibilityCriteria": "",
    "contacts": [
        {
            "email": "",
            "phone": "",
            "title": "Surya",
            "url": ""
        }
    ],
    "publisher": {
        "id": "a3471bdb-60f6-47c9-930c-b065bd02725b",
        "name": "Test Publisher",
        "url": ""
    },
    "isEnrolling": false,
    "scopes": [
        "user/Patient.read",
        "Authentication_Only"
    ]
};                       return requestBody;
 
}
