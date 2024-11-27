describe('Login Page UI', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should display login form', () => {
      cy.getByTestId('email-input').should('be.visible');
      cy.getByTestId('password-input').should('be.visible');
      cy.getByTestId('login-button').should('be.visible');
    });
  
    it('should login successfully', () => {
      cy.getByTestId('email-input').type('test@example.com');
      cy.getByTestId('password-input').type('password123');
      cy.getByTestId('login-button').click();
      // Add assertions for successful login
    });
  
    it('should show error for invalid credentials', () => {
      cy.getByTestId('email-input').type('wrong@email.com');
      cy.getByTestId('password-input').type('wrongpass');
      cy.getByTestId('login-button').click();
      cy.getByTestId('error-message').should('be.visible');
    });
  });