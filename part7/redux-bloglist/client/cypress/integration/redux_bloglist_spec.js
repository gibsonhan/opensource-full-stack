describe('Redux Bloglist', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  /*
  afterEach(function() {
    cy.contains('Logout').click()
  })
  */
  it('front page can be open', function() {
    cy.contains('Login in Application');
    cy.contains('username');
    cy.contains('password');
  });

  it('login form can be open', function() {
    cy.contains('Login').click();
  });

  it('User can Login and Logout', function() {
    cy.get('[data-cy=username]').type('admin123');
    cy.get('[data-cy=password]').type('admin123');
    cy.get('[data-cy=login]').click();
    cy.contains('Admin123 logged in');
    cy.contains('Logout').click();
  });

  it('User can Login and Create a blog and Remove', function() {
    cy.get('[data-cy=username]').type('admin123');
    cy.get('[data-cy=password]').type('admin123');
    cy.get('[data-cy=login]').click();
    cy.contains('blog').click();
    cy.contains('Create Blog').click();
    cy.get('[data-cy=title]').type('test123');
    cy.get('[data-cy=author]').type('test123');
    cy.get('[data-cy=url]').type('test123');
    cy.get('[data-cy=createBlog]').click();
    cy.contains('cancel').click();
    cy.contains('test123 test123').click();
    cy.contains('Like this Blog').click();
    cy.contains('1');
    cy.contains('Remove').click();
  });

  it('User can comment and like blog', function() {
    cy.get('[data-cy=username]').type('admin123');
    cy.get('[data-cy=password]').type('admin123');
    cy.get('[data-cy=login]').click();
    cy.contains('blog').click();
    cy.contains('Create Blog').click();
    cy.get('[data-cy=title]').type('test123');
    cy.get('[data-cy=author]').type('test123');
    cy.get('[data-cy=url]').type('test123');
    cy.get('[data-cy=createBlog]').click();
    cy.contains('cancel').click();
    cy.contains('user').click();
    cy.contains('admin123').click();
    cy.get('li')
      .contains('test123')
      .click();
    cy.contains('Like').click();
    cy.contains('1');

    cy.get('[data-cy=comment-box').type('test123comment');
    cy.get('[data-cy=submit-comment').click();
    cy.contains('test123comment');

    cy.contains('blog').click();
    cy.contains('test123 test123').click();
    cy.contains('Remove').click();
    cy.contains('Logout').click();
  });
});
