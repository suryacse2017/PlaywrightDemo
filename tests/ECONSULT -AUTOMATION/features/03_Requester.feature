Feature: eConsult work flow

  Background:
    Given I navigate to the eConsult test portal


  Scenario:Requester Login and Create Complete Case
    # Part 1: Login
  
    await page.getByText('OTN Credentials').click();

    await page.getByRole('textbox', { name: 'OTN Credentials' }).click();
    await page.getByRole('textbox', { name: 'OTN Credentials' }).fill('surya@test.ca');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('test123!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Waiting for Response' }).click();
    await page.locator('.MuiStack-root.css-j7qwjs').first().click();
    await page.getByText('Surya TestEnv added note').click();
    await page.getByText('Apr 24, 2026 5:52 PM').click();
    await page.locator('div').filter({ hasText: /^Patient1\.txt - 0\.00 MB$/ }).click();
 
 




























#   Background:
#     Given I navigate to the eConsult test portal
#     And I click the OTN Credentials button
#     And I login with username "surya@test.ca" and password "test123!"

#   Scenario: TC1_Verify Login Success
#     Then I should see that the Requester has logged in successfully

#  Scenario: TC2_Create Case - Complete Case

#     When I click on Request Consult
#     And I select a specific provider
#     And I enter recipient "Performance"
#     And I enter patient details:
#       | firstName | lastName | dob        | gender | ohip       |
#       | Carlo     | Adam     | 1982-04-12 | Male   | 1234567897 |
#     And I enter request details "Creating cases for Performance testing - Complete Case"
#     And I click on Send
#     And I navigate to Waiting for Response
#     Then I verify the case is created for "Carlo" "Adam" with request "Creating cases for Performance testing - Complete Case"