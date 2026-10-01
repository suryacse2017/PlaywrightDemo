import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/testFixture';
import { users } from '../testData/users';

const { Given, When, Then } = createBdd(test);

Given('I navigate to the login page', async  ({loginPage}) =>{

  

    await loginPage.navigateToLoginPage(users.loginPageURL);

});


Given('I enter a valid username', async ({loginPage})=>{


    await loginPage.enterUsername( users.validUser.username );

});


When('I enter a valid password', async({loginPage})=>{


    await loginPage.enterPassword(
        users.validUser.password
    );

});


Given('I enter an invalid username', async ({loginPage}) =>{


    await loginPage.enterUsername(
        users.invalidUser.username
    );

});


When('I enter an invalid password', async({loginPage}) =>{


    await loginPage.enterPassword(
        users.invalidUser.password
    );

});


When('I click the Login button', async ({loginPage}) =>{


    await loginPage.clickLogin();

});


Then('I should see the Dashboard', async ({loginPage}) =>{


    await loginPage.dashboard.waitFor({state: 'visible'});

});


Then(
    'I should see an invalid credentials message',
    async ({loginPage})=>{


        await loginPage.errorMessage.waitFor({
            state: 'visible'
        });

    }
);