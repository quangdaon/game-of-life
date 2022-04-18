import { APP_URL } from '../../config/index';

describe('Layout', () => {
  it('exists', () => {
    cy.visit(APP_URL);
  });
  
  it('contains a grid', () => {
    cy.get('.grid').should('exist');
  });

  it('contains a grid with 400 cells', () => {
    cy.get('.grid > .cell').should('have.length', 400);
  });
});
