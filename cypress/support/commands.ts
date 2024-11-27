/// <reference types="cypress" />
import { PageFactory } from './pages/PageFactory';

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getPage(pageName: string): typeof PageFactory;
    }
  }
}

// Custom command for data-test attributes
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-test="${testId}"]`);
});

// Custom command for page objects
Cypress.Commands.add('getPage', (pageName: string) => {
  return PageFactory[`get${pageName}Page`]();
});

export {};