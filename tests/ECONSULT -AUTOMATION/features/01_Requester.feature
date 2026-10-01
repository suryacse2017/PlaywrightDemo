Feature: eConsult work flow

  Background:
    Given I navigate to the eConsult test portal

  #@current @smoke
  Scenario Outline: TC-450 Referrer adds draft note to submitted direct case
      # Part 1: Login as Referrer ------------------------------------------------------------------------------------
        When I click the OTN Credentials button
        And I login with username "surya@test.ca" and password "test123!"
        Then I should see that the "Referrer" has logged in successfully
      # Part 2: Create Case for add draft note -----------------------------------------------------------------------
        When I click on "Request Consult" button
        And I select a specific provider
        And I enter recipient "lily"
        And I enter patient details:
        | firstName   | lastName   | dob   | gender   | ohip   |
        | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
        And I enter request details "<caseName>"
        And I click on "Send" button
        And I open the case from "Waiting for Response" folder
        Then I verify case for "Specialist" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
        Then I verify "Cancel" "Add note" "Re-direct" options are present
      # Part 3: Add Draft Note and Navigate away ---------------------------------------------------------------------
        When I hover mouse over "Add Note" button and verify the tooltip text "I want to send a note to the specialist"
        And I click on "Add Note" tab 
        And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
        And I added the note "<draftNote>" for "<caseName>"
        And Click on "Save as Draft" button
        And I open the case from "Waiting for Response" folder
        And I open the same case by CaseID for "draft note"
        Then I verify the "<draftNote>" is still visible
        And I logout from the portal
      # Part 4: Login as Delegate and View Draft -----------------------------------------------------------------------
        When I click the OTN Credentials button
        And I login with username "suryarefdel@test.ca" and password "test123!"
        Then I should see that the "Delegate" has logged in successfully
        And I open the case from "Waiting for Response" folder
        And I open the same case by CaseID for "draft note"
        Then I verify the "<draftNote>" is still visible
        And I logout from the portal
      # Part 5: Login as Specialist and Review Draft -------------------------------------------------------------------
        When I click the OTN Credentials button
        And I login with username "lily23@test.ca" and password "test123!"
         Then I should see that the "Specialist" has logged in successfully
        And I open the case from "Needs Attention" folder
        And I click on same case by CaseID
        Then I verify the "<draftNote>" is not visible
        And I logout from the portal

        Examples:
        | firstName | lastName | dob        | gender | ohip       | caseName                | draftNote               |
        | Carlo     | Adam     | 1982-04-12 | Male   | 1234567897 | TC 450 - Add Draft Note | Add note for draft case |

  #@current @smoke
  Scenario Outline: TC-451 Referrer adds note to submitted direct case
      # Part 1: Login as Referrer------------------------------------------------------------------------------
        When I click the OTN Credentials button
        And I login with username "surya@test.ca" and password "test123!"
        Then I should see that the "Referrer" has logged in successfully
      # Part 2: Create Case for add note --------------------------------------------------------------------------
        When I click on "Request Consult" button
        And I select a specific provider
        And I enter recipient "lily"
        And I enter patient details:
          | firstName   | lastName   | dob   | gender   | ohip   |
          | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
        And I enter request details "<caseName>"
        And I click on "Send" button
        And I open the case from "Waiting for Response" folder
        And I verify case for "Specialist" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
        Then I verify "Cancel" "Add note" "Re-direct" options are present
      # Part 3: Add note and attachment -------------------------------------------------------------------------------------------
        And I click on "Add Note" tab 
        And I added the note "<Note>" for "<caseName>"
        And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
        And I click on "Send" button
                      #And Verify "note added" message apperas
                      # And Verify note added email sent to specialist with specified format
      # Part 4: View case in Waiting for Response folder ----------------------------------------------------------
        And I open the case from "Waiting for Response" folder
        And Verify the case is on top of case list
        And Verify "<ReferrerName>" is present
        And Verify "<SpecialistName> " is present
        And Verify "Submitted Today" is present
                  #And Verify 40 characters are displyed in request fields
        And Verify "Note added" is present
      # Part 5: Click on case and verify details -------------------------------------------------------------------
        And I open the same case by CaseID for "add note"
        And Verify "<ReferrerName2>" is present for specific case
        And Verify "added note" is present for specific case
        And Verify "date and time" is present for specific case
        And Verify "<fileName>" is present for specific case
        Then I verify "Cancel" "Add note" "Re-direct" options are present
        And I logout from the portal

        Examples:
          | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2 |fileName    |SpecialistName                            |
          | Henry     | Adam     | 2025-04-01 | Male   | 1234567897 | TC 451 - Add Note | Add note to submitted case | Surya TestEnv | Surya TestEnv |Patient1.txt|Dr. Lily TwentyThree Lily Spec TwentyThree|

  #@current 
  Scenario Outline: TC-452 Delegate of a referrer adds note to submitted direct case
      # Part 1: Login as Delegate of a Referrer
        When I click the OTN Credentials button
        And I login with username "suryarefdel@test.ca" and password "test123!"
        Then I should see that the "Delegate" has logged in successfully
      # Part 2: Create Case for add note --------------------------------------------------------------------------
        When I click on "Request Consult" button
        And I select a specific provider
        And I enter recipient "lily"
        And I enter patient details:
          | firstName   | lastName   | dob   | gender   | ohip   |
          | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
        And I enter request details "<caseName>"
        And I click on "Send" button
        When I open the case from "Waiting for Response" folder
        And I verify case for "Specialist" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
        Then I verify "Cancel" "Add note" "Re-direct" options are present
      # Part 3: Add note-------------------------------------------------------------------------------------------
       And I click on "Add Note" tab 
        And I added the note "<Note>" for "<caseName>"
        And I click on "Send" button
      # Part 4: Click on case and verify details -------------------------------------------------------------------
        And I open the case from "Waiting for Response" folder
        And I open the same case by CaseID for "add note only"
        And Verify "Ms Surya Referrer Delegate (on behalf of Surya TestEnv)" is present for specific case
        And Verify "added note" is present for specific case
        And Verify "date and time" is present for specific case
        Then I verify "Cancel" "Add note" "Re-direct" options are present
        And I logout from the portal

        Examples:
          | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       |
          | Henry     | Adam     | 2025-04-01 | Male   | 1234567897 | TC 452 - Add Note | Add note to submitted case |

   
  #@current @smoke 
  Scenario Outline: TC-453 Referrer adds note to submitted unassigned program case
     # Part 1: Login as Referrer------------------------------------------------------------------------------
      When I click the OTN Credentials button
      And I login with username "surya@test.ca" and password "test123!"
      Then I should see that the "Referrer" has logged in successfully
     # Part 2: Create Case for add note --------------------------------------------------------------------------
      When I click on "Request Consult" button
      And I select a specific provider
      And I enter recipient "automation"
      And I enter patient details:
        | firstName   | lastName   | dob   | gender   | ohip   |
        | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
      And I enter request details "<caseName>"
      And I click on "Send" button
      And I open the case from "Waiting for Response" folder
      And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
      Then I verify "Cancel" "Add note" "Re-direct" options are present
     # Part 3: Add note and attachment -------------------------------------------------------------------------------------------
      And I click on "Add Note" tab 
      And I added the note "<Note>" for "<caseName>"
      And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
      And I click on "Send" button
     # Part 4: View case in Waiting for Response folder ----------------------------------------------------------
      And I open the case from "Waiting for Response" folder
      And Verify the case is on top of case list
      And Verify "<ReferrerName>" is present
      And Verify "<ProgramName> " is present
      And Verify "Submitted Today" is present
                #And Verify 40 characters are displyed in request fields
      And Verify "Note added" is present
     # Part 5: Click on case and verify details -------------------------------------------------------------------
      And I open the same case by CaseID for "add note"
      And Verify "<ReferrerName2>" is present for specific case
      And Verify "added note" is present for specific case
      And Verify "date and time" is present for specific case
      And Verify "<fileName>" is present for specific case
      Then I verify "Cancel" "Add note" "Re-direct" options are present
      And I logout from the portal
     # Part 6: Login as assigner and view the case in the needs attention folder --------------------------------
      When I click the OTN Credentials button
      And I login with username "rtriage@test.ca" and password "test123!"
      Then I should see that the "Assigner" has logged in successfully
      And I open the case from "Needs Attention" folder
      And Verify the case is on top of case list
      And Verify "<ReferrerName>" is present
      And Verify "<ProgramName> " is present
      And Verify "Submitted Today" is present
      And Verify "Note added" is present
      And I logout from the portal

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2 | ProgramName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 453 - Add Note | Add note to submitted case | Surya TestEnv | Surya TestEnv | Program for automation testing|Patient1.txt|  

  #@current 
  Scenario Outline: TC-454 Delegate of Referrer adds note to submitted unassigned program case
   # Part 1: Login as Delegate------------------------------------------------------------------------------
    When I click the OTN Credentials button
    And I login with username "suryarefdel@test.ca" and password "test123!"
    Then I should see that the "Delegate" has logged in successfully
   # Part 2: Create Case for add note --------------------------------------------------------------------------
    When I click on "Request Consult" button
    And I select a specific provider
    And I enter recipient "automation"
    And I enter patient details:
      | firstName   | lastName   | dob   | gender   | ohip   |
      | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
    And I enter request details "<caseName>"
    And I click on "Send" button
    And I open the case from "Waiting for Response" folder
    And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
    Then I verify "Cancel" "Add note" "Re-direct" options are present
   # Part 3: Add note and attachment -------------------------------------------------------------------------------------------
    And I click on "Add Note" tab 
    And I added the note "<Note>" for "<caseName>"
    And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
    And I click on "Send" button
   # Part 4: Click on case and verify details -------------------------------------------------------------------
    And I open the case from "Waiting for Response" folder
    And I open the same case by CaseID for "add note"
    And Verify "<ReferrerName2>" is present for specific case
    And Verify "added note" is present for specific case
    And Verify "date and time" is present for specific case
    And Verify "<fileName>" is present for specific case
    Then I verify "Cancel" "Add note" "Re-direct" options are present
    And I logout from the portal

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2 | ProgramName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 454 - Add Note | Add note to submitted case | Surya TestEnv | Ms Surya Referrer Delegate (on behalf of Surya TestEnv) | Program for automation testing|Patient1.txt|  

  #@current 
  Scenario Outline: TC-455 Referrer adds note to submitted unassigned group case
     #Part 1: Login as Referrer------------------------------------------------------------------------------
      When I click the OTN Credentials button
      And I login with username "surya@test.ca" and password "test123!"
      Then I should see that the "Referrer" has logged in successfully
     #Part 2: Create Case for add note --------------------------------------------------------------------------
      When I click on "Request Consult" button
      And I select a specific provider
      And I enter recipient "Group for automation"
      And I enter patient details:
        | firstName   | lastName   | dob   | gender   | ohip   |
        | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
      And I enter request details "<caseName>"
      And I click on "Send" button
      And I open the case from "Waiting for Response" folder
      And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
      Then I verify "Cancel" "Add note" "Re-direct" options are present
     #Part 3: Add note and attachment -------------------------------------------------------------------------------------------
      And I click on "Add Note" tab 
      And I added the note "<Note>" for "<caseName>"
      And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
      And I click on "Send" button
            #And Verify "note added" message apperas
     #Part 4: View case in Waiting for Response folder ----------------------------------------------------------
      And I open the case from "Waiting for Response" folder
      And Verify the case is on top of case list
      And Verify "<ReferrerName>" is present
      And Verify "<GroupName> " is present
      And Verify "Submitted Today" is present
                #And Verify 40 characters are displyed in request fields
      And Verify "Note added" is present
    #Part 5: Click on case and verify details -------------------------------------------------------------------
      And I open the same case by CaseID for "add note"
      And Verify "<ReferrerName2>" is present for specific case
      And Verify "added note" is present for specific case
      And Verify "date and time" is present for specific case
      And Verify "<fileName>" is present for specific case
      Then I verify "Cancel" "Add note" "Re-direct" options are present
      And I logout from the portal
    #Part 6: Login as assigner and view the case in the needs attention folder --------------------------------
      When I click the OTN Credentials button
      And I login with username "rtriage@test.ca" and password "test123!"
      Then I should see that the "Assigner" has logged in successfully
      And I open the case from "Needs Attention" folder
      And Verify the case is on top of case list
      And Verify "<ReferrerName>" is present
      And Verify "<GroupName> " is present
      And Verify "Submitted Today" is present
      And Verify "Note added" is present
      And I logout from the portal

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2 | GroupName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 455 - Add Note | Add note to submitted case | Surya TestEnv | Surya TestEnv | Group for automation testing|Patient1.txt|  

  #@current @smoke
  Scenario Outline: TC-456 Delegate of Referrer adds note to submitted unassigned program case
   # Part 1: Login as Delegate------------------------------------------------------------------------------
    When I click the OTN Credentials button
    And I login with username "suryarefdel@test.ca" and password "test123!"
    Then I should see that the "Delegate" has logged in successfully
   # Part 2: Create Case for add note --------------------------------------------------------------------------
    When I click on "Request Consult" button
    And I select a specific provider
    And I enter recipient "Group for automation"
    And I enter patient details:
      | firstName   | lastName   | dob   | gender   | ohip   |
      | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
    And I enter request details "<caseName>"
    And I click on "Send" button
    And I open the case from "Waiting for Response" folder
    And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
    Then I verify "Cancel" "Add note" "Re-direct" options are present
   # Part 3: Add note and attachment -------------------------------------------------------------------------------------------
    And I click on "Add Note" tab 
    And I added the note "<Note>" for "<caseName>"
    And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
    And I click on "Send" button
   # Part 4: Click on case and verify details -------------------------------------------------------------------
    And I open the case from "Waiting for Response" folder
    And I open the same case by CaseID for "add note"
    And Verify "<ReferrerName2>" is present for specific case
    And Verify "added note" is present for specific case
    And Verify "date and time" is present for specific case
    And Verify "<fileName>" is present for specific case
    Then I verify "Cancel" "Add note" "Re-direct" options are present
    And I logout from the portal

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2                                           | ProgramName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 456 - Add Note | Add note to submitted case | Surya TestEnv | Ms Surya Referrer Delegate (on behalf of Surya TestEnv) | Group for automation testing|Patient1.txt|  

  #@current 
  Scenario Outline: TC-459 Referrer adds note to submitted assigned program case
     # Part 1: Login as Referrer------------------------------------------------------------------------------
      When I click the OTN Credentials button
      And I login with username "surya@test.ca" and password "test123!"
      Then I should see that the "Referrer" has logged in successfully
     # Part 2: Create Case for add note --------------------------------------------------------------------------
      When I click on "Request Consult" button
      And I select a specific provider
      And I enter recipient "automation"
      And I enter patient details:
        | firstName   | lastName   | dob   | gender   | ohip   |
        | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
      And I enter request details "<caseName>"
      And I click on "Send" button
      And I open the case from "Waiting for Response" folder
      And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
      Then I verify "Cancel" "Add note" "Re-direct" options are present
      And I logout from the portal
     # Part 3: Login as assigner and assign the case ---------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "rtriage@test.ca" and password "test123!"
       Then I should see that the "Assigner" has logged in successfully
       And I open the case from "Needs Attention" folder
       And Verify the case is on top of case list
       And I assign the case to "Dr. Lily"
       And I click on "Assign" button
       And I logout from the portal
     # Part 4: Login as Referrer -------------------------------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "surya@test.ca" and password "test123!"
       Then I should see that the "Referrer" has logged in successfully
       And I open the case from "Waiting for Response" folder
       And Verify the case is on top of case list
       Then I verify "Cancel" "Add note" options are present
     # Part 5: Add note and attachment -------------------------------------------------------------------------------------------
        And I click on "Add Note" tab 
        And I added the note "<Note>" for "<caseName>"
        And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
        And I click on "Send" button
     # Part 6: View case in Waiting for Response folder ---------------------------------------------------------------------------
        And I open the case from "Waiting for Response" folder
        And Verify the case is on top of case list
        And Verify "<ReferrerName>" is present
        And Verify "<ProgramName> " is present
        And Verify "Submitted Today" is present
                  #And Verify 40 characters are displyed in request fields
        And Verify "Note added" is present
     # Part 7: Click on case and verify details -------------------------------------------------------------------
        And I open the same case by CaseID for "add note"
        And Verify "<ReferrerName2>" is present for specific case
        And Verify "added note" is present for specific case
        And Verify "date and time" is present for specific case
        And Verify "<fileName>" is present for specific case
        Then I verify "Cancel" "Add note" options are present
        And I logout from the portal

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2 |ProgramName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 459 - Add Note | Add note to submitted case | Surya TestEnv | Surya TestEnv |Program for automation testing|Patient1.txt|  

  #@current 
  Scenario Outline: TC-460 Delegate of Referrer adds note to submitted assigned program case
     # Part 1: Login as Delegate------------------------------------------------------------------------------
      When I click the OTN Credentials button
      And I login with username "suryarefdel@test.ca" and password "test123!"
      Then I should see that the "Delegate" has logged in successfully
     # Part 2: Create Case for add note --------------------------------------------------------------------------
      When I click on "Request Consult" button
      And I select a specific provider
      And I enter recipient "automation"
      And I enter patient details:
        | firstName   | lastName   | dob   | gender   | ohip   |
        | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
      And I enter request details "<caseName>"
      And I click on "Send" button
      And I open the case from "Waiting for Response" folder
      And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
      Then I verify "Cancel" "Add note" "Re-direct" options are present
      And I logout from the portal
     # Part 3: Login as assigner and assign the case ---------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "rtriage@test.ca" and password "test123!"
       Then I should see that the "Assigner" has logged in successfully
       And I open the case from "Needs Attention" folder
       And Verify the case is on top of case list
       And I assign the case to "Dr. Lily"
       And I click on "Assign" button
       And I logout from the portal
     # Part 4: Login as Delegate -------------------------------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "suryarefdel@test.ca" and password "test123!"
       Then I should see that the "Delegate" has logged in successfully
       And I open the case from "Waiting for Response" folder
       And Verify the case is on top of case list
       Then I verify "Cancel" "Add note" options are present
     # Part 5: Add note and attachment -------------------------------------------------------------------------------------------
        And I click on "Add Note" tab 
        And I added the note "<Note>" for "<caseName>"
        And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
        And I click on "Send" button
     # Part 6: View case in Waiting for Response folder ---------------------------------------------------------------------------
        And I open the case from "Waiting for Response" folder
        And Verify the case is on top of case list
        And Verify "<ReferrerName>" is present
        And Verify "<ProgramName> " is present
        And Verify "Submitted Today" is present
                  #And Verify 40 characters are displyed in request fields
        And Verify "Note added" is present
     # Part 7: Click on case and verify details -------------------------------------------------------------------
        And I open the same case by CaseID for "add note"
        And Verify "<ReferrerName2>" is present for specific case
        And Verify "added note" is present for specific case
        And Verify "date and time" is present for specific case
        And Verify "<fileName>" is present for specific case
        Then I verify "Cancel" "Add note" options are present
        And I logout from the portal

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2                                           |ProgramName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 460 - Add Note | Add note to submitted case | Surya TestEnv | Ms Surya Referrer Delegate (on behalf of Surya TestEnv) |Program for automation testing|Patient1.txt|  

  #@current 
  Scenario Outline: TC-461 Referrer adds note to submitted assigned group case
     # Part 1: Login as Referrer------------------------------------------------------------------------------
      When I click the OTN Credentials button
      And I login with username "surya@test.ca" and password "test123!"
      Then I should see that the "Referrer" has logged in successfully
     # Part 2: Create Case for add note --------------------------------------------------------------------------
      When I click on "Request Consult" button
      And I select a specific provider
      And I enter recipient "Group for automation"
      And I enter patient details:
        | firstName   | lastName   | dob   | gender   | ohip   |
        | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
      And I enter request details "<caseName>"
      And I click on "Send" button
      And I open the case from "Waiting for Response" folder
      And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
      Then I verify "Cancel" "Add note" "Re-direct" options are present
      And I logout from the portal
     # Part 3: Login as assigner and assign the case ---------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "rtriage@test.ca" and password "test123!"
       Then I should see that the "Assigner" has logged in successfully
       And I open the case from "Needs Attention" folder
       And Verify the case is on top of case list
       And I assign the case to "Dr. Lily"
       And I click on "Assign" button
       And I logout from the portal
     # Part 4: Login as Referrer -------------------------------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "surya@test.ca" and password "test123!"
       Then I should see that the "Referrer" has logged in successfully
       And I open the case from "Waiting for Response" folder
       And Verify the case is on top of case list
       Then I verify "Cancel" "Add note" options are present
     # Part 5: Add note and attachment -------------------------------------------------------------------------------------------
        And I click on "Add Note" tab 
        And I added the note "<Note>" for "<caseName>"
        And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
        And I click on "Send" button
     # Part 6: View case in Waiting for Response folder ---------------------------------------------------------------------------
        And I open the case from "Waiting for Response" folder
        And Verify the case is on top of case list
        And Verify "<ReferrerName>" is present
        And Verify "<GroupName> " is present
        And Verify "Submitted Today" is present
                  #And Verify 40 characters are displyed in request fields
        And Verify "Note added" is present
     # Part 7: Click on case and verify details -------------------------------------------------------------------
        And I open the same case by CaseID for "add note"
        And Verify "<ReferrerName2>" is present for specific case
        And Verify "added note" is present for specific case
        And Verify "date and time" is present for specific case
        And Verify "<fileName>" is present for specific case
        Then I verify "Cancel" "Add note" options are present
        And I logout from the portal

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2 |GroupName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 461 - Add Note | Add note to submitted case | Surya TestEnv | Surya TestEnv |Group for automation testing|Patient1.txt|  


  #@current 
  Scenario Outline: TC-462 Delegate of Referrer adds note to submitted assigned group case
     # Part 1: Login as Delegate------------------------------------------------------------------------------
      When I click the OTN Credentials button
      And I login with username "suryarefdel@test.ca" and password "test123!"
      Then I should see that the "Delegate" has logged in successfully
     # Part 2: Create Case for add note --------------------------------------------------------------------------
      When I click on "Request Consult" button
      And I select a specific provider
      And I enter recipient "Group for automation"
      And I enter patient details:
        | firstName   | lastName   | dob   | gender   | ohip   |
        | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
      And I enter request details "<caseName>"
      And I click on "Send" button
      And I open the case from "Waiting for Response" folder
      And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
      Then I verify "Cancel" "Add note" "Re-direct" options are present
      And I logout from the portal
     # Part 3: Login as assigner and assign the case ---------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "rtriage@test.ca" and password "test123!"
       Then I should see that the "Assigner" has logged in successfully
       And I open the case from "Needs Attention" folder
       And Verify the case is on top of case list
       And I assign the case to "Dr. Lily"
       And I click on "Assign" button
       And I logout from the portal
     # Part 4: Login as Referrer -------------------------------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "surya@test.ca" and password "test123!"
       Then I should see that the "Referrer" has logged in successfully
       And I open the case from "Waiting for Response" folder
       And Verify the case is on top of case list
       Then I verify "Cancel" "Add note" options are present
     # Part 5: Add note and attachment -------------------------------------------------------------------------------------------
        And I click on "Add Note" tab 
        And I added the note "<Note>" for "<caseName>"
        And I add an attachment file "C:\Users\surya.krishnan\OneDrive - Ontario Health\Desktop\Patient1.txt"
        And I click on "Send" button
     # Part 6: View case in Waiting for Response folder ---------------------------------------------------------------------------
        And I open the case from "Waiting for Response" folder
        And Verify the case is on top of case list
        And Verify "<ReferrerName>" is present
        And Verify "<GroupName> " is present
        And Verify "Submitted Today" is present
                  #And Verify 40 characters are displyed in request fields
        And Verify "Note added" is present
     # Part 7: Click on case and verify details -------------------------------------------------------------------
        And I open the same case by CaseID for "add note"
        And Verify "<ReferrerName2>" is present for specific case
        And Verify "added note" is present for specific case
        And Verify "date and time" is present for specific case
        And Verify "<fileName>" is present for specific case
        Then I verify "Cancel" "Add note" options are present
        And I logout from the portal

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2                                          |GroupName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 462 - Add Note | Add note to submitted case | Surya TestEnv | Ms Surya Referrer Delegate (on behalf of Surya TestEnv) |Group for automation testing|Patient1.txt|  

  @current 
  Scenario Outline: TC-465 Referrer adds note to submitted unassigned program case
     # Part 1: Login as Referrer------------------------------------------------------------------------------
      When I click the OTN Credentials button
      And I login with username "surya@test.ca" and password "test123!"
      Then I should see that the "Referrer" has logged in successfully
     # Part 2: Create Case for add note --------------------------------------------------------------------------
      When I click on "Request Consult" button
      And I select a specific provider
      And I enter recipient "automation"
      And I enter patient details:
        | firstName   | lastName   | dob   | gender   | ohip   |
        | <firstName> | <lastName> | <dob> | <gender> | <ohip> |
      And I enter request details "<caseName>"
      And I click on "Send" button
      And I open the case from "Waiting for Response" folder
      And I verify case for "Group" created by "<firstName>" "<lastName>" "<dob>" "<gender>" "<ohip>" "<caseName>"
      Then I verify "Cancel" "Add note" "Re-direct" options are present
      And I logout from the portal
     # Part 3: Login as assigner and remove assigned case --------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "rtriage@test.ca" and password "test123!"
       Then I should see that the "Assigner" has logged in successfully
       And I open the case from "Needs Attention" folder
       And Verify the case is on top of case list
       And I assign the case to "Dr. Lily"
       And I click on "Assign" button
       And I click on "Search" text
       And I enter "caseID"
       And I click on "Search" button
       And I click on "Unassign" button
       And I logout from the portal
     # Part 4: Login as Referrer -------------------------------------------------------------------------------------------
       When I click the OTN Credentials button
       And I login with username "surya@test.ca" and password "test123!"
       Then I should see that the "Referrer" has logged in successfully
       And I open the case from "Waiting for Response" folder
       And Verify the case is on top of case list
       And Verify "Needs assignment" is present
       Then I verify "Cancel" "Re-direct" options are present

    Examples:
      | firstName | lastName | dob        | gender | ohip       | caseName          | Note                       | ReferrerName  | ReferrerName2 |ProgramName                   |fileName    |
      | Harry     | Colt     | 2025-04-01 | Male   | 1234567897 | TC 459 - Add Note | Add note to submitted case | Surya TestEnv | Surya TestEnv |Program for automation testing|Patient1.txt|  
   