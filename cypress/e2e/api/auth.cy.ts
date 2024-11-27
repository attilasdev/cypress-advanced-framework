describe('API Tests', () => {
    let authToken: string;
  
    it('should login successfully', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/auth/login',
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        authToken = response.body.token;
      });
    });
  
    it('should get products without authentication', () => {
      cy.request('GET', 'http://localhost:3000/products')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.greaterThan(0);
        });
    });
  
    it('should get orders with authentication', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/orders',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('should fail to get orders without token', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/orders',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });