/// <reference types="cypress" />
Cypress.Commands.add('login', () => {
    cy.visit('/');
    cy.get('[data-cy="navigation"]');
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}