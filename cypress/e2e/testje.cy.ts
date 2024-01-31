describe('Authentication', () => {
  it('should redirect to the login page if no token is provided by session', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('should display a toaster message on login failure', () => {
    // Intercept the login API call and respond with a failed login fixture
    cy.intercept('POST', 'http://localhost:8081/api/auth/signin', {
      fixture: 'login-failed.json',
      statusCode: 401,
    }).as('failedLogin');
    cy.visit('/login');
    cy.get('input[name="username"]').type('READONLY');
    cy.get('input[name="password"]').type('READONLY');
    cy.get('button[type="submit"]').click();
    cy.wait('@failedLogin');
    cy.get('.toast-message').should('be.visible');
    cy.location('pathname').should('eq', '/login');
  });

  it('should display a toaster message and redirect on login success', () => {
    cy.intercept('POST', 'http://localhost:8081/api/v1/auth/login', {
      fixture: 'login-success.json',
    }).as('successfulLogin');
    cy.visit('/login');
    cy.get('input[name="username"]').type('ADMIN');
    cy.get('input[name="password"]').type('ADMIN');
    cy.get('button[type="submit"]').click();
    cy.wait('@successfulLogin');
    cy.get('.toast-message').should('be.visible');
    cy.location('pathname').should('eq', '/dashboard');
  });
});
