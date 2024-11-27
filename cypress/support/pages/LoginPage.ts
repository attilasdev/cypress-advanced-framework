export class LoginPage {
    visit() {
      cy.visit('/');
    }
  
    login(email: string, password: string) {
      cy.getByTestId('email-input').type(email);
      cy.getByTestId('password-input').type(password);
      cy.getByTestId('login-button').click();
    }
  
    getErrorMessage() {
      return cy.getByTestId('error-message');
    }
  }