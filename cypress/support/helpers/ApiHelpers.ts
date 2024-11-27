export class ApiHelper {
    static login(email: string, password: string) {
      return cy.request({
        method: 'POST',
        url: 'http://localhost:3000/auth/login',
        body: {
          email,
          password
        }
      });
    }
  
    static getProducts() {
      return cy.request('GET', 'http://localhost:3000/products');
    }
  
    static getOrders(token: string) {
      return cy.request({
        method: 'GET',
        url: 'http://localhost:3000/orders',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }