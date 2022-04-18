import { APP_URL } from '../../config/index';

describe('Setup', () => {
  before(() => {
    cy.visit(APP_URL);
  });

  it('can activate specific cells', () => {
    cy.getCell(3, 7).click();
    cy.getCell(3, 7).should('have.class', 'active');
  });

  it('can deactivate specific cells', () => {
    cy.getCell(3, 7).click();
    cy.getCell(3, 7).should('not.have.class', 'active');
  });

  it('can clear all active cells', () => {
    cy.getCell(4, 5).click();
    cy.getCell(13, 8).click();

    cy.get('[data-cy="clear"]').click();

    cy.getCell(4, 5).should('not.have.class', 'active');
    cy.getCell(13, 8).should('not.have.class', 'active');
  });
});
