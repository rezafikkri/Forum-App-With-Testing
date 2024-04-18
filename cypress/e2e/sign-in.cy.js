/**
 * - Sign In spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage (with dispalyed create thread button and sign out button)
 *   when username and password are correct
 */

describe('Sign In spec', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('should display login page correctly', () => {
    // Assert
    cy.get('h1').contains('Sign In').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Sign In').should('be.visible');
  });

  it('should display alert when username is empty', () => {
    // Action
    cy.get('button').contains('Sign In').click();
    // Assert
    cy.get('div[role="alert"]').should('be.visible');
    cy.get('div[role="alert"] > div').first().should('have.text', 'Email is not allowed to be empty');
  });

  it('should display alert when password is empty', () => {
    // Arrange
    cy.get('input[placeholder="Email"]').type('testUsernamehahahainitest@yahoo.com');
    // Action
    cy.get('button').contains('Sign In').click();
    // Assert
    cy.get('div[role="alert"]').should('be.visible');
    cy.get('div[role="alert"] > div').first().should('have.text', 'Password is not allowed to be empty');
  });

  it('should display alert when username and password are wrong', () => {
    // Arrange
    cy.get('input[placeholder="Email"]').type('testUsernamehahahainitest@yahoo.com');
    cy.get('input[placeholder="Password"]').type('password');
    // Action
    cy.get('button').contains('Sign In').click();
    // Assert
    cy.get('div[role="alert"]').should('be.visible');
    cy.get('div[role="alert"] > div').first().should('have.text', 'Email or password is wrong');
  });

  it('should display homepage (with dispalyed create thread button and sign out button', () => {
    // Arrange
    cy.get('input[placeholder="Email"]').type('userfortest@yahoo.com');
    cy.get('input[placeholder="Password"]').type('userfortest');
    // Action
    cy.get('button').contains('Sign In').click();
    // Assert
    cy.get('h1').contains('Threads').should('be.visible');
    cy.get('a', { timeout: 10000 }).contains('Create Thread').should('be.visible');
    cy.get('nav button', { timeout: 10000 }).contains('Sign Out').should('exist');
  });
});
