export class BasePage {
    protected route: string;
  
    constructor(route: string = '') {
      this.route = route;
    }
  
    // Navigation methods
    visit(): void {
      cy.visit(this.route);
    }
  
    // Common element getters
    protected getElement(selector: string) {
      return cy.get(selector);
    }
  
    protected getByData(dataTestId: string) {
      return cy.get(`[data-test="${dataTestId}"]`);
    }
  
    // Common actions
    protected click(selector: string) {
      return this.getElement(selector).click();
    }
  
    protected type(selector: string, text: string) {
      return this.getElement(selector).type(text);
    }
  
    // Common assertions
    protected shouldBeVisible(selector: string) {
      return this.getElement(selector).should('be.visible');
    }
  
    protected shouldHaveText(selector: string, text: string) {
      return this.getElement(selector).should('have.text', text);
    }
  
    // Wait methods
    protected waitForElement(selector: string, timeout: number = 10000) {
      return this.getElement(selector).should('exist', { timeout });
    }
  }