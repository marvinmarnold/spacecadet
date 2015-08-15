Feature: Create a new docking

  As a user
  I want to create a docking
  So that I can reserve a landing pad

  @dev
  Scenario: Select docking dates
    Given a Landlord has created a landing pad with the name "My Landing Pad"
    When I navigate to the station page that landing pad belongs to
    Then they see the heading "Find Space"