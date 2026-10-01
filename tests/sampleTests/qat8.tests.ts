import { test, expect, Page } from '@playwright/test';
import { setReport, setLogin, loadEnv } from '../../helper/functions';

loadEnv()
// setLogin('valli@st.ca','test123!')

test('QAT-8', async ({ page }) => {
    setReport("Test","QAT-8")
    await page.goto('/');
    await page.getByRole('link', { name: 'Videoconference' }).click();
    await page.getByTestId('open($event)').click();
    const thing = await page.locator('.inline-tooltip').getAttribute("title");
    const toolTip = "Your event can contain a combination of OTNhub room-based or personal (PCVC) systems, guests, and non-OTN systems.\n" +
        "Guest via Email: Send an OTNinvite email to a patient or guest to attend from their own device.\n" +
        "OTN System: Connect with an OTNhub personal (PCVC) or room-based system.\n" +
        "Non-OTN System: Connect with a standards-based system by sending them a dialing alias via email.";
    console.log(thing !== toolTip)
    test.fail(thing !== toolTip, 'tooltop message unexpected')
});  
