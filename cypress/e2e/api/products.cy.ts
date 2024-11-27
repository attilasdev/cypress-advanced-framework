describe('Products API Tests', () => {
    it('should get all products', () => {
      cy.request('GET', 'http://localhost:3000/products')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.greaterThan(0);
        });
    });
  
    it('should get a single product by ID', () => {
      cy.request('GET', 'http://localhost:3000/products/1')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 1);
          expect(response.body).to.have.property('name');
          expect(response.body).to.have.property('price');
          expect(response.body).to.have.property('description');
        });
    });
  
    it('should return 404 for non-existent product', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/products/999',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('error', 'Product not found');
      });
    });
  });