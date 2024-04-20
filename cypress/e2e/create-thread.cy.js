/**
 * - Create Thread spec
 *   - should display create thread page correctly
 *   - should display alert when title is empty
 *   - should display alert when body is empty
 *   - should display homepage (with dispalyed new thread has been created)
 *   when title and body is not empty
 */

describe('Create Thread spec', () => {
  it('should display create thread page correctly', () => {
    cy.setCookie('signIn', 'true');
    cy.visit('/create');
    // Assert
    cy.get('h1').contains('Create Thread').should('be.visible');
    cy.get('input[placeholder="Enter thread title"]').should('be.visible');
    cy.get('input[placeholder="Enter thread category"]').should('be.visible');
    cy.get('textarea[placeholder="Enter thread body"]').should('be.visible');
    cy.get('button').contains('Save').should('be.visible');
    cy.get('a').contains('Cancel').should('be.visible');
  });

  it('should display alert when title is empty', () => {
    // Arrange
    cy.signIn();
    cy.visit('/create');
    // Action
    cy.get('button').contains('Save').click();
    // Assert
    cy.get('div[role="alert"]').should('be.visible');
    cy.get('div[role="alert"] > div').first().should('have.text', 'Title is not allowed to be empty');
  });

  it('should display alert when body is empty', () => {
    // Arrange
    cy.signIn();
    cy.visit('/create');
    cy.get('input[placeholder="Enter thread title"]').type('End to end testing');
    // Action
    cy.get('button').contains('Save').click();
    // Assert
    cy.get('div[role="alert"]').should('be.visible');
    cy.get('div[role="alert"] > div').first().should('have.text', 'Body is not allowed to be empty');
  });

  it('should display homepage (with dispalyed new thread has been created) when title and body is not empty', () => {
    // Arrange
    cy.signIn();
    cy.visit('/create');
    cy.get('input[placeholder="Enter thread title"]').type('End to end testing');
    cy.get('input[placeholder="Enter thread category"]').type('e2e testing');
    cy.get('textarea[placeholder="Enter thread body"]').type('This is *e2e* testing');
    // Action
    cy.get('button').contains('Save').click();
    // Assert
    cy.get('h1').contains('Threads').should('be.visible');
    cy.get('h2').contains('End to end testing').should('be.visible');
  });
});
