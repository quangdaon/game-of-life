import { APP_URL } from '../../config/index';

describe('Layout', () => {
  it('contains a grid', () => {
    cy.visit(APP_URL);
    cy.get('.grid').should('exist');
  });

  it('contains a grid with 400 cells', () => {
    cy.visit(APP_URL);
    cy.get('.grid > .cell').should('have.length', 400);
  });
});
