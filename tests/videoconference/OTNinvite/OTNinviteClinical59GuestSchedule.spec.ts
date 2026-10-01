import {test, expect, Page } from '@playwright/test';
import { setReport, loadEnv } from '../../../helper/functions';
import {Day} from '../../../helper/functions';
loadEnv('video_staging');
setReport("eVisitReports","OTNinviteClinical59GuestSchedule");


test.describe('Create OTNinvite with max no of guests', () => { 
  test.setTimeout(130000); 
  const eventTitle="Scheduled clinical OTNinvite with 59 guests"
  const locatorCloseMsg=".close.ng-scope";
  const locatorGuestName="//input[@name='guestName']" ;
  const locatorGuestEmail="//input[@name='guestEmail']";
  const locGuestNo=".participants-count";
  const validEmail =
  [
    {name: "Victor", email:"vtest@test.ca"},
    { name: "Ana", email: "a@test.ca"},
    { name: "Bonny", email: "b@test.ca"},
    { name: "Conny", email: "c@test.ca"},
    { name: "Donny", email: "d@test.ca"},
    { name: "Eonny", email: "e@test.ca"},
    { name: "Fonny", email: "f@test.ca"},
    { name: "Genny", email: "g@test.ca"},
    { name: "Honny", email: "h@test.ca"},
    { name: "Ionny", email: "i@test.ca"},
    { name: "Jonny", email: "j@test.ca"},
    { name: "Konny", email: "k@test.ca"},
    { name: "Lenny", email: "l@test.ca"},
    { name: "Manny", email: "m@test.ca"},
    { name: "Nonny", email: "n@test.ca"},
    { name: "Oonny", email: "o@test.ca"},
    { name: "Ponny", email: "p@test.ca"},
    { name: "Qunny", email: "q@test.ca"},
    { name: "Any", email: "a1@test.ca"},
    { name: "Bonni", email: "b1@test.ca"},
    { name: "Conni", email: "c1@test.ca"},
    { name: "Donni", email: "d1@test.ca"},
    { name: "Eonni", email: "e1@test.ca"},
    { name: "Fonni", email: "f1@test.ca"},
    { name: "Genni", email: "g1@test.ca"},
    { name: "Honni", email: "h1@test.ca"},
    { name: "Ionni", email: "i1@test.ca"},
    { name: "Jonni", email: "j1@test.ca"},
    { name: "Konni", email: "k1@test.ca"},
    { name: "Lenni", email: "l1@test.ca"},
    { name: "Manni", email: "m1@test.ca"},
    { name: "Nonni", email: "n1@test.ca"},
    { name: "Oonni", email: "o1@test.ca"},
    { name: "Ponni", email: "p1@test.ca"},
    { name: "Qunni", email: "q1@test.ca"},
    { name: "An", email: "a11@test.ca"},
    { name: "Bonnannza", email: "b11@test.ca"},
    { name: "Connanza", email: "c11@test.ca"},
    { name: "Donn", email: "d11@test.ca"},
    { name: "Eonn", email: "e11@test.ca"},
    { name: "Fonn", email: "f11@test.ca"},
    { name: "Genn", email: "g11@test.ca"},
    { name: "Honn", email: "h11@test.ca"},
    { name: "Ionn", email: "i11@test.ca"},
    { name: "Jonn", email: "j11@test.ca"},
    { name: "Konn", email: "k11@test.ca"},
    { name: "Lenn", email: "l11@test.ca"},
    { name: "Mann", email: "m11@test.ca"},
    { name: "Nonn", email: "n11@test.ca"},
    { name: "Oonn", email: "o11@test.ca"},
    { name: "Ponn", email: "p11@test.ca"},
    { name: "Qunn", email: "q11@test.ca"},
    { name: "Anna", email: "a111@test.ca"},
    { name: "Bon", email: "b111@test.ca"},
    { name: "Con", email: "c111@test.ca"},
    { name: "Don", email: "d111@test.ca"},
    { name: "Eon", email: "e111@test.ca"},
    { name: "Fon", email: "f111@test.ca"},
    {name: "MOnica", email: "mbadila@otn.ca"}
    
  ]
  let cur_page: Page; 
  let guestCount=0;
  let textGuestNo = "you have added "+guestCount.toString()+" / 60 systems";
  test.beforeAll(async ({ page }) => { cur_page = page });

test('login', async () => {
 
  await cur_page.goto('/',{waitUntil:'domcontentloaded'});
  await cur_page.getByText('OTN Credentials').click();
  await cur_page.getByPlaceholder('OTN Credentials').fill(process.env.CREDENTIAL!);
  await cur_page.getByPlaceholder('Password').click();
  await cur_page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await cur_page.getByRole('button', { name: 'Sign In' }).click();
  //Navigate to videoconference
  await cur_page.getByRole('link', { name: 'Videoconference' }).click();
  
  })
  test('Start OTNinvite creation and add pcvc', async () => {
    //Open Create Event modal
    await cur_page.getByText('Create event').click();
    await cur_page.getByText('Clinical Event', { exact: true }).click();
    await cur_page.getByRole('textbox', { name: 'enter event title' }).fill(eventTitle);
    await expect(cur_page.locator(locGuestNo)).toHaveText(textGuestNo);// the no of participants is '0'
    await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:otn_system');
    await cur_page.getByPlaceholder('Search for people or room systems').click();
    await cur_page.getByPlaceholder('Search for people or room systems').fill(process.env.partialPcvcName1!);
    await cur_page.getByRole('option', { name: process.env.myFullPcvcName1! }).locator('a').click();
    await cur_page.getByRole('dialog').getByRole('button').first().click();
    guestCount++;
    textGuestNo = "you have added "+guestCount.toString()+" / 60 systems";
    console.log(textGuestNo);
    await expect(cur_page.locator(locGuestNo)).toHaveText(textGuestNo);// the no of participants is '1'
  })
 validEmail.forEach(data => {
  test(`Add guest ${data.name}`, async () => { 
 
  await cur_page.locator('form[name="participantForm"]').getByRole('combobox').selectOption('string:guest');
  await cur_page.getByPlaceholder('Guest name').fill(data.name);
  await cur_page.getByPlaceholder('Guest email').fill(data.email);
  await cur_page.getByRole('button', { name: 'Add' }).click();
  await expect(cur_page.getByText('Enter a valid email', { exact: true })).not.toBeVisible();
  // participants no. shows correctly 
 guestCount++;
  textGuestNo = "you have added "+guestCount+" / 60 systems";
  console.log(textGuestNo);
  await expect(cur_page.locator(locGuestNo)).toHaveText(textGuestNo);// the no of participants is wright
 });
 })
 
 //schedule the event
 test('Schedule', async () => {
  let date = new Day(5)
  //await cur_page.getByText('Opt out of PCVC time conflicts').click(); //optout of conflict
  await cur_page.getByRole('button', { name: 'Schedule' }).click();
  await cur_page.getByPlaceholder('YYYY-MM-DD').fill(date.caformatDate);
  await cur_page.getByRole('textbox').nth(2).fill('2');
  await cur_page.getByRole('textbox').nth(3).fill('0');
  await cur_page.getByRole('textbox').nth(4).fill('2');
  await cur_page.getByRole('textbox').nth(5).fill('15');
  await cur_page.locator('#call-container-schedule').getByText('Schedule').click();
  await cur_page.getByRole('button', { name: 'Schedule' }).click(); 
  test.setTimeout(130000);  // wait enough for the even to be scheduled
  await cur_page.getByText("Scheduled with multiple participants").first().click();   //check the event was scheduled
 })
// cancel event
test('Cancel event', async () => {
  const statusMessage = cur_page.locator('#messageContainer');
 const cancelledMsg= "      ×      Success - The event has been cancelled                   "; 
 
 await cur_page.locator('a').filter({ hasText: 'Cancel Event' }).click();
 await cur_page.getByRole('button', { name: 'Yes' }).click();
 //await cur_page.waitForTimeout(30000);
 //await expect(statusMessage).toBeVisible()
 //await expect(statusMessage).toHaveText(cancelledMsg);
// await expect(statusMessage).toBeHidden()
})
test('logout', async () => {
  await cur_page.getByRole('listitem', { name: 'User Panel' }).getByRole('link').click();
  await cur_page.getByRole('listitem').filter({ hasText: 'Sign Out' }).click();
  })

test('Wait on page for logout', async () => {
   
    //delay(20s);
    await cur_page.waitForTimeout(3000);
  })
   test.afterAll(async () => {

    await cur_page.close();

  });

})


