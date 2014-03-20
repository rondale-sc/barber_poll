Feature: Survey
  @javascript
  Scenario: User can create a survey
    Given I am on the home page
    When I fill in the survey form
    And I follow "Create Survey"
    Then I see that my survey has been created

  @javascript
  Scenario: User can vote on a survey
    Given 1 favorite color survey
    And I visit the vote page for that survey
    When I vote for red
    Then I should be directed to the results
    And I should see the answer I voted for counted
