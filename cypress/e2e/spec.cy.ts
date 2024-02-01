describe('Platform Loading', () => {
  it('should load and display platforms on the main view', () => {
    cy.intercept('GET', 'http://localhost:8081/api/platform/sorted', {
      fixture: 'platforms.json',
    }).as('loadPlatforms');
    cy.visit('http://165.22.195.95/main-view/platforms');
    cy.wait('@loadPlatforms');
    cy.get('.platform-item').should('have.length.greaterThan', 0);
  });
});
