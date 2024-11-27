describe('Orders API Tests', () => {
    let authToken: string;
  
    before(() => {
      // Login to get token
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/auth/login',
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      }).then((response) => {
        authToken = response.body.token;
      });
    });
  
    it('should create a new order', () => {
      const newOrder = {
        products: [
          {
            productId: 1,
            quantity: 2
          }
        ]
      };
  
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/orders',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: newOrder
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('status', 'pending');
        expect(response.body.products).to.deep.equal(newOrder.products);
      });
    });
  
    it('should get a specific order', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/orders/1',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('userId');
        expect(response.body).to.have.property('products');
        expect(response.body).to.have.property('status');
      });
    });
  });