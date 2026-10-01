Feature: Login functionality

  Background:
    Given I navigate to the login page

  #@current @smoke

  Scenario:TC-1 Successful login with valid credentials

    Given I enter a valid username

    When I enter a valid password

    And I click the Login button

    Then I should see the Dashboard


  Scenario:TC-2 Login with invalid credentials

    Given I enter an invalid username

    When I enter an invalid password

    And I click the Login button

    Then I should see an invalid credentials message