describe('Backend Integration test', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Cypres123',
      username: 'Cypress123',
      password: 'Cypress123',
    };

    cy.request('POST', 'http://localhost:3003/api/users', user);
  });
});
