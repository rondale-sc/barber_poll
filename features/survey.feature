@javascript
Feature: Survey
  Scenario: User can create a survey
    Given I am on the home page
    When I fill in the survey form
    And I follow "create survey"
    Then I see that my survey has been created

