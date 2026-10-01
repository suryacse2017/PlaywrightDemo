
Feature: eConsult work flow

  Background:
    Given I navigate to the eConsult test portal

    Scenario Outline:Specialist Login and verify Draft note visibility
    # Part 1: Login
    When I click the OTN Credentials button
    And I login with username "lily23@test.ca" and password "test123!"
    Then I should see that the "Specialist" has logged in successfully


    # Part 2: Verify Specialits can see dfaft note
    And I click on Needs Attention
    And I open the same case by CaseID
    Then I verify the "<draftNote>" is not visible
 

    # Part 3: Provide consultation
    # When I click on Needs Attention
    # And I provide consultaion with comment "Providing Consult for this case" and "16 - 20 minutes" time spend for this case
 
Examples:
      | firstName | lastName | dob        | gender | ohip       |caseName                                               |draftNote              |
      | Carlo     | Adam     | 1982-04-12 | Male   | 1234567897 |Creating cases for Performance testing - Add Draft Note|Add note for draft case|


















#  Scenario:Requester Login and Create Complete Case
#     # Part 1: Login
#     When I click the OTN Credentials button
#     And I login with username "surya@test.ca" and password "test123!"
#     Then I should see that the "Requester" has logged in successfully

#     # Part 2: Create Case (Continues in the same window)
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