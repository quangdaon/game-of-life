import { APP_URL } from '../../config/index';

describe('Layout', () => {
  it('exists', () => {
    cy.visit(APP_URL);
  });

  describe('Grid', () => {
    it('exists', () => {
      cy.get('.grid').should('exist');
    });

    it('contains 400 cells', () => {
      cy.get('.grid > .cell').should('have.length', 400);
    });
  });

  describe('Actions panel', () => {
    it('exists', () => cy.get('.actions').should('exist'));
    it('contains a step button', () => cy.get('.actions').contains('Step'));
    it('contains a clear button', () => cy.get('.actions').contains('Clear'));
  });
});
