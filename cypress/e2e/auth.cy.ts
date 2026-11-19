describe('Authentication', () => {
  beforeEach(() => {
    // Stub every backend call so the tests run without the Spine backend.
    cy.intercept('GET', '/api/**', { body: [] });
  });

  it('redirects to the login page when visiting the root URL', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/login');
  });

  it('shows an error message when the credentials are rejected', () => {
    cy.intercept('POST', '/api/auth/signin', { statusCode: 401, body: {} }).as('failedLogin');

    cy.visit('/login');
    cy.fixture('login-credentials').then(({ email, password }) => {
      cy.get('input[formControlName="email"]').type(email);
      cy.get('input[formControlName="password"]').type(password);
    });
    cy.get('button[type="submit"]').click();

    cy.wait('@failedLogin');
    cy.contains('Bad credentials').should('be.visible');
    cy.location('pathname').should('eq', '/login');
  });

  it('stores the token and opens the dashboard after a successful login', () => {
    cy.intercept('POST', '/api/auth/signin', { fixture: 'login-success.json' }).as('successfulLogin');

    cy.visit('/login');
    cy.fixture('login-credentials').then(({ email, password }) => {
      cy.get('input[formControlName="email"]').type(email);
      cy.get('input[formControlName="password"]').type(password);
    });
    cy.get('button[type="submit"]').click();

    cy.wait('@successfulLogin');
    cy.location('pathname').should('eq', '/main-view/dashboard');
    cy.window().its('localStorage.l_token').should('exist');
  });
});
