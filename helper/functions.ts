/*
//get the date that has "offset" days from the current date (offset=-2 for the 2 days before , offset=7 for a after 7 days date

public static Date offsetDate(int offset){ 
    Date date = new Date(); // convert date to calendar 
    Calendar c = Calendar.getInstance(); 
    c.setTime(date); // manipulate date 
    c.add(Calendar.DATE, offset);
    date=c.getTime(); 
    return date ; 
}
// return as a string  the date in the required format:
public static String format1Date(Date date){ 
    DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
    System.out.println(sdf.format(date)); 
    return sdf.format(date); 
}
public static String year(Date date){ 
    DateFormat sdf = new SimpleDateFormat("yyyy"); 
    return sdf.format(date); 
}
public static String month(Date date){ 
    DateFormat sdf = new SimpleDateFormat("MM"); 
    return sdf.format(date); 
}
public static String day(Date date){ 
    DateFormat sdf = new SimpleDateFormat("dd"); 
    return sdf.format(date); 
}
public static String monthName(String month) {
    String[] monthNameTable = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
    return monthNameTable[Integer.parseInt(month)-1];
}
*/
import fs from 'fs'
//import fs2 from 'fs-extra'

class Day{
    date: Date
    offset: number
    formattedDate: string
    year: number
    month: string
    day: string
    monthName: string
    monthNameTable = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    caformatDate: string
    time: string
    fullTime: string

    constructor(offset: number = 0){
        this.offset = offset
        this.date = this.setDay(offset)
        this.formattedDate = this.date.toLocaleDateString()
        this.year = this.date.getFullYear()
        this.month = (("0" + (this.date.getMonth() + 1)).slice(-2))
        this.day = ("0" + this.date.getDate()).slice(-2)
        this.monthName = this.monthNameTable[parseInt(this.month) -1]
        this.caformatDate = (this.year.toString() + '-'+ this.month + '-' +this.day)
        this.time = ("0" + this.date.getHours()).slice(-2)+";"+("0" + this.date.getMinutes()).slice(-2)+";"+("0" + this.date.getSeconds()).slice(-2)
        this.fullTime = this.formattedDate +"-"+ this.time
    }
    

    setDay(num: number){
        const date = new Date();
        const day = date.getDate()
        date.setDate(day + num)
        return date
    }

    testPrint(){
        console.log(`-=Tests for offset of ${this.offset}=-`)
        console.log(this.date, `- Offset: ${this.offset}`)
        console.log(this.formattedDate, "- Formatted date")
        console.log(this.year, "- Year")
        console.log(this.month, this.monthName, "- Month")
        console.log(this.day, "- Day")
        console.log()
    }
}

class Time{
    date: Date
    offset: number
    minutes: string;
    hours: string;
    hours12: string;

    constructor(offset: number = 0){
        this.offset = offset
        this.date = this.setTime(offset)
        this.minutes = ("0" + this.date.getMinutes()).slice(-2)
        this.hours = ("0" + this.date.getHours()).slice(-2)
        this.hours12 = this.formatAMPM(Number(this.hours))
    }
    setTime(num: number){
        const date = new Date();
        const time = date.getMinutes()
        date.setMinutes(time + num)
        return date
    }

    formatAMPM(hours: number) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var strTime = hours + ' ' + ampm;
        return strTime;
      }

    testPrint(){
        console.log(`-=Test print for time with offset: ${this.offset} minutes`)
        console.log(`Minutes: ${this.minutes}`)
        console.log(`Hours: ${this.hours}`)
        console.log(`Hours 12h format: ${this.hours12}`)
        console.log(`Full Time: ${this.hours}:${this.minutes}`)
    }
}

function setReport(Folder: String, testTitle: String){
    const date = new Day()
    const obj = {
        "folder": Folder,
        "title": testTitle,
        "year": date.year,
        "month": date.month,
        "day": date.day,
        "time": date.time
        // "date": date.fullTime
    }
    const json = JSON.stringify(obj)
    // console.log('test:', json)
    fs.writeFile('helper/testDetails.json', json, (err: any) => {
        if (err)
          console.log(err);
    })
}

function saveVariable(name: string, variable: any){
    const jsonString = fs.readFileSync('helper/savedVariables.json', 'utf-8')
    var json = JSON.parse(jsonString)
    json[name] = variable
    json = JSON.stringify(json)
    fs.writeFileSync('helper/savedVariables.json', json,)
}

function loadVariable(name: string){
    const jsonString = fs.readFileSync('helper/savedVariables.json', 'utf-8')
    var json = JSON.parse(jsonString)
    return json[name]
}

function setLogin(Username: string, Password: string){//}, Url: string = 'https://directory.stagingotn.ca/'){
    process.env.CREDENTIAL = Username;
    process.env.PASSWORD = Password
    // process.env.BASEURL = Url
}

function loadEnv(ENV: String = 'default'){
    const args = process.argv
    const headed = '--headed'
    if(args.includes(headed)){ 
        args.splice(args.indexOf(headed), 1);  //deleting
    }
    if (args.length === 5 || args.length === 7){
        process.env.ENVIRONMENT = args[(args.length-1)]
    }
    // console.log("Arguments", args)
    // console.log("Enviroment Variable", process.env.ENVIRONMENT)
    // const enviorment = (ENV === 'default') ? process.env.ENVIRONMENT : ENV
    const enviorment = (process.env.ENVIRONMENT) ? process.env.ENVIRONMENT : ENV
    console.log("Current enviorment: ", enviorment)
    require('dotenv').config({path: `./env/.env.${enviorment}`})
}

export {saveVariable, loadVariable, loadEnv, setReport, setLogin, Day, Time}


