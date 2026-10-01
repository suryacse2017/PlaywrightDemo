// Generated from: tests\Demo1\features\login.feature
import { test } from "../../../../tests/Demo1/fixtures/testFixture.ts";

test.describe('Login functionality', () => {

  test.beforeEach('Background', async ({ Given, loginPage }, testInfo) => { if (testInfo.error) return;
    await Given('I navigate to the login page', null, { loginPage }); 
  });
  
  test('TC-1 Successful login with valid credentials', async ({ Given, When, Then, And, loginPage }) => { 
    await Given('I enter a valid username', null, { loginPage }); 
    await When('I enter a valid password', null, { loginPage }); 
    await And('I click the Login button', null, { loginPage }); 
    await Then('I should see the Dashboard', null, { loginPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\Demo1\\features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given I enter a valid username","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I enter a valid password","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"And I click the Login button","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then I should see the Dashboard","stepMatchArguments":[]}]},
]; // bdd-data-end