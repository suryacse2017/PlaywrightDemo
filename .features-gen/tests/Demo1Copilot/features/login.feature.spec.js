// Generated from: tests\Demo1Copilot\features\login.feature
import { test } from "../../../../tests/Demo1Copilot/fixtures/testFixture.ts";

test.describe('Practice Test Login', () => {

  test('TC_LOGIN_001: Verify successful login with valid credentials.', async ({ Given, When, Then, And, loginPage }) => { 
    await Given('I am on the practice test login page', null, { loginPage }); 
    await When('I log in with username "student" and password "Password123"', null, { loginPage }); 
    await Then('the URL should contain "/logged-in-successfully/"', null, { loginPage }); 
    await And('I should see the "Logged In Successfully" heading or message', null, { loginPage }); 
    await And('the "Log out" button should be visible', null, { loginPage }); 
  });

  test('TC_LOGIN_002: Verify error message with invalid username and invalid password.', async ({ Given, When, Then, And, loginPage }) => { 
    await Given('I am on the practice test login page', null, { loginPage }); 
    await When('I log in with username "wronguser" and password "WrongPassword123"', null, { loginPage }); 
    await Then('I should see the error message "Your username is invalid!"', null, { loginPage }); 
    await And('I should not be logged in', null, { loginPage }); 
  });

  test('TC_LOGIN_003: Verify error message with invalid username and valid password.', async ({ Given, When, Then, And, loginPage }) => { 
    await Given('I am on the practice test login page', null, { loginPage }); 
    await When('I log in with username "wronguser" and password "Password123"', null, { loginPage }); 
    await Then('I should see the error message "Your username is invalid!"', null, { loginPage }); 
    await And('I should not be logged in', null, { loginPage }); 
  });

  test('TC_LOGIN_004: Verify error message with valid username and invalid password.', async ({ Given, When, Then, And, loginPage }) => { 
    await Given('I am on the practice test login page', null, { loginPage }); 
    await When('I log in with username "student" and password "WrongPassword123"', null, { loginPage }); 
    await Then('I should see the error message "Your password is invalid!"', null, { loginPage }); 
    await And('I should not be logged in', null, { loginPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\Demo1Copilot\\features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I am on the practice test login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When I log in with username \"student\" and password \"Password123\"","stepMatchArguments":[{"group":{"start":23,"value":"\"student\"","children":[{"start":24,"value":"student","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"Password123\"","children":[{"start":47,"value":"Password123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the URL should contain \"/logged-in-successfully/\"","stepMatchArguments":[{"group":{"start":23,"value":"\"/logged-in-successfully/\"","children":[{"start":24,"value":"/logged-in-successfully/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And I should see the \"Logged In Successfully\" heading or message","stepMatchArguments":[{"group":{"start":17,"value":"\"Logged In Successfully\"","children":[{"start":18,"value":"Logged In Successfully","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And the \"Log out\" button should be visible","stepMatchArguments":[{"group":{"start":4,"value":"\"Log out\"","children":[{"start":5,"value":"Log out","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given I am on the practice test login page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I log in with username \"wronguser\" and password \"WrongPassword123\"","stepMatchArguments":[{"group":{"start":23,"value":"\"wronguser\"","children":[{"start":24,"value":"wronguser","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":48,"value":"\"WrongPassword123\"","children":[{"start":49,"value":"WrongPassword123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Your username is invalid!\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Your username is invalid!\"","children":[{"start":32,"value":"Your username is invalid!","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And I should not be logged in","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given I am on the practice test login page","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When I log in with username \"wronguser\" and password \"Password123\"","stepMatchArguments":[{"group":{"start":23,"value":"\"wronguser\"","children":[{"start":24,"value":"wronguser","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":48,"value":"\"Password123\"","children":[{"start":49,"value":"Password123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Your username is invalid!\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Your username is invalid!\"","children":[{"start":32,"value":"Your username is invalid!","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And I should not be logged in","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":29,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"Given I am on the practice test login page","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When I log in with username \"student\" and password \"WrongPassword123\"","stepMatchArguments":[{"group":{"start":23,"value":"\"student\"","children":[{"start":24,"value":"student","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"WrongPassword123\"","children":[{"start":47,"value":"WrongPassword123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Your password is invalid!\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Your password is invalid!\"","children":[{"start":32,"value":"Your password is invalid!","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And I should not be logged in","stepMatchArguments":[]}]},
]; // bdd-data-end