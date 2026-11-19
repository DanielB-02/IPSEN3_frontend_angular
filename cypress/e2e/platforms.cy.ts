describe('Platform list', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/**', { body: [] });
    cy.intercept('GET', '/api/platform/sorted', { fixture: 'platforms.json' }).as('loadPlatforms');

    // Pretend to be logged in with the dummy (unsigned) token from the fixture.
    cy.fixture('login-success').then(({ token }) => {
      cy.visit('/main-view/platforms', {
        onBeforeLoad(win) {
          win.localStorage.setItem('l_token', token);
        },
      });
    });
  });

  it('shows only platforms that are not archived', () => {
    cy.wait('@loadPlatforms');
    cy.get('tbody tr').should('have.length', 2);
    cy.contains('Example Platform A').should('be.visible');
    cy.contains('Archived Platform').should('not.exist');
  });
});
