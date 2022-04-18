import { APP_URL } from '../../config/index';

describe('Setup', () => {
  it('can activate specific cells', () => {
    cy.visit(APP_URL);
    cy.get('.cell[data-x="3"][data-y="7"]').click();
    cy.get('.cell[data-x="3"][data-y="7"]').should('have.class', 'active');
  });

  it('can deactivate specific cells', () => {
    cy.get('.cell[data-x="3"][data-y="7"]').click();
    cy.get('.cell[data-x="3"][data-y="7"]').should('not.have.class', 'active');
  });
});
