import {test, expect} from "@playwright/test"
import {setReport, loadEnv } from "../../helper/functions";
import {generateSignature, ResponseValidation, getOffsetDate, getOffsetTime, getDateTime} from "../../helper/APIfunctions"
loadEnv('AWS_Staging_PEXIP')
let apiContext;
let regexMatchAll: RegExp = /(.*?)/;
let expireDATE: String = `${getOffsetDate(2)}T${getOffsetTime(0)}`
let expireDATEpastTime: String = `${getDateTime(-3600)}`
let expireDATEafterTime: String = `${getDateTime(3600)}`
let expireDATEpastDate: String = `${getDateTime(-86400)}`
// let signature;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: process.env.baseUrl,
    });
})
test.describe('CVVR12 - create/delete VVR to test tac', ()=> {
    var vvrId;
    setReport('Video API', 'CVVR')
    test('15. CVVR12-1 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR11",
                "tac": "Cardiology",
                "type": "Clinical",
                "expiryDate": expireDATEafterTime
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR11",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATEafterTime,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('16. CVVRD12-1 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
    
    test('17. CVVR12-2 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-2",
                "tac": "Cardiology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-2",
            "tac": "Cardiology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('18. CVVRD12-2 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })
        expect(res.status()).toEqual(200)
    })
   

test('19. CVVR12-3 - Create VVR with tac', async()=>{
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {
            "title": "CVVR12-3",
            "tac": "CardiovascularSurgery",
            "type": "Clinical",
            "expiryDate": expireDATE
        },
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    console.log("-=Body=-")
    console.log(body)
    const expected = {
        "id": regexMatchAll,
        "title": "CVVR12-3",
        "tac": "CardiovascularSurgery",
        "type": "Clinical",
        "state": "Active",
        "expiryDate": expireDATE,
        "participants": [],
        "isOffNet": false,
        "isLectureMode": false
      }
    
    console.log("-=Response Validation=-", ResponseValidation(expected,body))
    // expect(body).toEqual(expected)
    expect(res.status()).toEqual(200)

    vvrId = body['id']

})
test('20. CVVRD12-3 - Delete the VVR identified by a valid id', async()=>{
    const d = new Date()
    let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })

    expect(res.status()).toEqual(200)
})
test('21. CVVR12-4 - Create VVR with tac', async()=>{
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {
            "title": "CVVR12-4",
            "tac": "Dentistry",
            "type": "Clinical",
            "expiryDate": expireDATE,
            "participants": []
          },
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    console.log("-=Body=-")
    console.log(body)
    const expected = {
        "id": regexMatchAll,
        "title": "CVVR12-4",
        "tac": "Dentistry",
        "type": "Clinical",
        "state": "Active",
        "expiryDate": expireDATE,
        "participants": [],
        "isOffNet": false,
        "isLectureMode": false
      }
    
    console.log("-=Response Validation=-", ResponseValidation(expected,body))
    // expect(body).toEqual(expected)
    expect(res.status()).toEqual(200)

    vvrId = body['id']

})
test('22. CVVRD12-4 - Delete the VVR identified by a valid id', async()=>{
    const d = new Date()
    let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })

    expect(res.status()).toEqual(200)
})
test('23. CVVR12-5 - Create VVR with tac', async()=>{
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {
            "title": "CVVR12-5",
            "tac": "Dermatology",
            "state": "Active",
            "type": "Clinical",
            "expiryDate": expireDATE,
            "participants": []
          },
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    console.log("-=Body=-")
    console.log(body)
    const expected = {
        "id": regexMatchAll,
        "title": "CVVR12-5",
        "tac": "Dermatology",
        "type": "Clinical",
        "state": "Active",
        "expiryDate": expireDATE,
        "participants": [],
        "isOffNet": false,
        "isLectureMode": false
      }
    
    console.log("-=Response Validation=-", ResponseValidation(expected,body))
    // expect(body).toEqual(expected)
    expect(res.status()).toEqual(200)

    vvrId = body['id']

})
test('24. CVVRD12-5 - Delete the VVR identified by a valid id', async()=>{
    const d = new Date()
    let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })

    expect(res.status()).toEqual(200)
})


test('25. CVVR12-6 - Create VVR with tac', async()=>{
    const d = new Date()
    let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.post(`/${process.env.relURL}/`, {
        data: {
            "title": "Test Title",
            "tac": "EmergencyTelemedicine",
            "type": "Clinical",
            "expiryDate": expireDATE,
            "participants": []
        },
        headers: {
            "Authorization":signature
        }
    })
    const body = await res.json()
    console.log("-=Body=-")
    console.log(body)
    const expected = {
        "id": regexMatchAll,
        "title": "Test Title",
        "tac": "EmergencyTelemedicine",
        "type": "Clinical",
        "state": "Active",
        "expiryDate": expireDATE,
        "participants": [],
        "isOffNet": false,
        "isLectureMode": false
    }
    
    console.log("-=Response Validation=-", ResponseValidation(expected,body))
    // expect(body).toEqual(expected)
    expect(res.status()).toEqual(200)

    vvrId = body['id']

})
test('26. CVVRD12-6 - Delete the VVR identified by a valid id', async()=>{
    const d = new Date()
    let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
    const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
        data: {},
        headers: {
            "Authorization":signature
        }
    })
    expect(res.status()).toEqual(200)
    })
    test('27. CVVR12-7 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "Test Title",
                "tac": "Endocrinology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "Test Title",
            "tac": "Endocrinology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('28. CVVRD12-7 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('29. CVVR12-8 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-8",
                "tac": "Ent",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-8",
            "tac": "Ent",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('30. CVVRD12-8 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
   

     test('31. CVVR12-9 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-9",
                "tac": "GastroEnterology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-9",
            "tac": "GastroEnterology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('32. CVVRD12-9 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('33. CVVR12-10 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "Test Title",
                "tac": "GeneralSurgery",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "Test Title",
            "tac": "GeneralSurgery",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('34. CVVRD12-10 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    


    test('35. CVVR12-11 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-11",
                "tac": "Genetics",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-11",
            "tac": "Genetics",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('36. CVVRD12-11 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    
    test('37. CVVR12-12 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-12",
                "tac": "Gynaecology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-12",
            "tac": "Gynaecology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('38. CVVRD12-12 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    


    test('39. CVVR12-13 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-13",
                "tac": "Hematology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-13",
            "tac": "Hematology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('40. CVVRD12-13 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    

    test('41. CVVR12-14 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-14",
                "tac": "Immunology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-14",
            "tac": "Immunology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('42. CVVRD12-14 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    

    test('43. CVVR12-15 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-15",
                "tac": "InfectiousDiseases",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-15",
            "tac": "InfectiousDiseases",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('44. CVVRD12-15 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    


    test('45. CVVR12-16 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-16",
                "tac": "MentalHealth",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-16",
            "tac": "MentalHealth",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('46. CVVRD12-16 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
   

    test('47. CVVR12-17 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-17",
                "tac": "Nephrology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-17",
            "tac": "Nephrology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('48. CVVRD12-17 - Delete the VVR identified by a valid id', async()=>{
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('49. CVVR12-18 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-18",
                "tac": "Neurology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
            },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-18",
            "tac": "Neurology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']

    })
    test('50. CVVRD12-18 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
   
    test('51. CVVR12-19 - Create VVR with tac', async()=>{

        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-19",
                "tac": "Neurosurgery",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-19",
            "tac": "Neurosurgery",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })

    test('52. CVVRD12-19 - Delete the VVR identified by a valid id', async()=>{
        
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('53. CVVR12-20 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "Test Title",
                "tac": "Obstetrics",
                "state": "Active",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "Test Title",
            "tac": "Obstetrics",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('54. CVVRD12-20 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('55. CVVR12-21 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-21",
                "tac": "Newborn",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-21",
            "tac": "Newborn",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('56. CVVRD12-21 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('57. CVVR12-22 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-22",
                "tac": "Obstetrics",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-22",
            "tac": "Obstetrics",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('58. CVVRD12-22 - Delete the VVR identified by a valid id', async()=>{
    
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('59. CVVR12-23 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-23",
                "tac": "Oncology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-23",
            "tac": "Oncology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('60. CVVRD12-23 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('61. CVVR12-24 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-24",
                "tac": "Ophthalmology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-24",
            "tac": "Ophthalmology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('62. CVVRD12-24 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('63. CVVR12-25 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-25",
                "tac": "OralSurgery",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-25",
            "tac": "OralSurgery",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('64. CVVRD12-25 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('65. CVVR12-26 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-26",
                "tac": "OrthopaedicSurgery",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-26",
            "tac": "OrthopaedicSurgery",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('66. CVVRD12-26 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('67. CVVR12-27 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-27",
                "tac": "PalliativeCare",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-27",
            "tac": "PalliativeCare",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('68. CVVRD12-27 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('69. CVVR12-28 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-28",
                "tac": "PhysicalMedicineAndRehabilitation",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-28",
            "tac": "PhysicalMedicineAndRehabilitation",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('70. CVVRD12-28 - Delete the VVR identified by a valid id', async()=>{
     
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('71. CVVR12-29 - Create VVR with tac', async()=>{
       
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-29",
                "tac": "PlasticSurgery",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-29",
            "tac": "PlasticSurgery",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('72. CVVRD12-29 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('73. CVVR12-30 - Create VVR with tac', async()=>{
   
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-30",
                "tac": "Podiatry",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-30",
            "tac": "Podiatry",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
        test('74. CVVRD12-30 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
        })

        test('75. CVVR12-31 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-31",
                "tac": "PrimaryCare",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-31",
            "tac": "PrimaryCare",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('76. CVVRD12-31 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('77. CVVR12-32 - Create VVR with tac', async()=>{
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-32",
                "tac": "Respirology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-32",
            "tac": "Respirology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
        }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('78. CVVRD12-32 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('79. CVVR12-33 - Create VVR with tac', async()=>{
      
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-33",
                "tac": "Rheumatology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-33",
            "tac": "Rheumatology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('80. CVVRD12-33 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('81. CVVR12-34 - Create VVR with tac', async()=>{
       
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-34",
                "tac": "ThoracicSurgery",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-34",
            "tac": "ThoracicSurgery",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('82. CVVRD12-34 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('83. CVVR12-35 - Create VVR with tac', async()=>{
        
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-35",
                "tac": "TransplantSurgery",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-35",
            "tac": "TransplantSurgery",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('84. CVVRD12-35 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('85. CVVR12-36 - Create VVR with tac', async()=>{
       
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-36",
                "tac": "Urology",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-36",
            "tac": "Urology",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('86. CVVRD12-36 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test('87. CVVR12-37 - Create VVR with tac', async()=>{
      
        const d = new Date()
        let signature = generateSignature("POST", `${process.env.baseUrl}/${process.env.relURL}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.post(`/${process.env.relURL}/`, {
            data: {
                "title": "CVVR12-37",
                "tac": "Other",
                "type": "Clinical",
                "expiryDate": expireDATE,
                "participants": []
              },
            headers: {
                "Authorization":signature
            }
        })
        const body = await res.json()
        console.log("-=Body=-")
        console.log(body)
        const expected = {
            "id": regexMatchAll,
            "title": "CVVR12-37",
            "tac": "Other",
            "type": "Clinical",
            "state": "Active",
            "expiryDate": expireDATE,
            "participants": [],
            "isOffNet": false,
            "isLectureMode": false
          }
        
        console.log("-=Response Validation=-", ResponseValidation(expected,body))
        // expect(body).toEqual(expected)
        expect(res.status()).toEqual(200)

        vvrId = body['id']
    })
    test('88. CVVRD12-37 - Delete the VVR identified by a valid id', async()=>{
        // vvrId = '11c8df08-2217-402c-8666-279820976ec8'
        const d = new Date()
        let signature = generateSignature("DELETE", `${process.env.baseUrl}/${process.env.relURL}/${vvrId}`, process.env.apikey, process.env.sharedsecret, d.toISOString())
        const res = await apiContext.delete(`/${process.env.relURL}/${vvrId}/`, {
            data: {},
            headers: {
                "Authorization":signature
            }
        })

        expect(res.status()).toEqual(200)
    })
    test.afterAll(async ({ }) => {
        // Dispose all responses.
        await apiContext.dispose();

    })
})