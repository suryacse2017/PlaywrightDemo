Feature: Practice Test Login
  Verify that valid credentials allow login and invalid credentials are rejected.

  Scenario: TC_LOGIN_001: Verify successful login with valid credentials.
    Given I am on the practice test login page
    When I log in with username "student" and password "Password123"
    Then the URL should contain "/logged-in-successfully/"
    And I should see the "Logged In Successfully" heading or message
    And the "Log out" button should be visible

  Scenario: TC_LOGIN_002: Verify error message with invalid username and invalid password.
    Given I am on the practice test login page
    When I log in with username "wronguser" and password "WrongPassword123"
    Then I should see the error message "Your username is invalid1!"
    And I should not be logged in

  Scenario: TC_LOGIN_003: Verify error message with invalid username and valid password.
    Given I am on the practice test login page
    When I log in with username "wronguser" and password "Password123"
    Then I should see the error message "Your username is invalid!"
    And I should not be logged in

  Scenario: TC_LOGIN_004: Verify error message with valid username and invalid password.
    Given I am on the practice test login page
    When I log in with username "student" and password "WrongPassword123"
    Then I should see the error message "Your password is invalid!"
    And I should not be logged in
    