// my-awesome-reporter.ts
import fs from 'fs-extra';
import { Reporter } from '@playwright/test/reporter';

class MyReporter implements Reporter {
    onEnd() {
        const jsonString = fs.readFileSync('helper/testDetails.json', 'utf-8')
        // console.log(jsonString)
        const json = JSON.parse(jsonString)
        const {folder, title, year, month, day, time} = json

        const src = "playwright-reports/folder";
        // const dest = "playwright-reports/"+json.folder+'/'+json.title+"/"+json.date;
        const dest = `playwright-reports/${folder}/${title}/${year}/${month}/${day} - ${time}`
        //You can change how the folder system works by changing this line
        fs.moveSync(src, dest, {overwrite:true})
    }
}
export default MyReporter;