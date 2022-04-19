describe(`Conway's Rules of Life`, () => {
  beforeEach(() => cy.clearCells());

  describe('A live cell', () => {
    beforeEach(() => {
      cy.getCell(4, 5).click();
    });

    it('dies when there are no live neighbors', () => {
      cy.nextStep();

      cy.getCell(4, 5).should('not.have.class', 'active');
    });

    it('dies when there is one live neighbor', () => {
      cy.getCell(4, 6).click();

      cy.nextStep();

      cy.getCell(4, 5).should('not.have.class', 'active');
    });

    it('lives when there are two live neighbors', () => {
      cy.getCell(4, 6).click();
      cy.getCell(4, 4).click();

      cy.nextStep();

      cy.getCell(4, 5).should('have.class', 'active');
    });

    it('dies when there are four live neighbors', () => {
      cy.getCell(4, 6).click();
      cy.getCell(4, 4).click();
      cy.getCell(3, 5).click();
      cy.getCell(5, 5).click();

      cy.nextStep();

      cy.getCell(4, 5).should('not.have.class', 'active');
    });
  });

  describe('A dead cell', () => {
    it('stays dead when there are two live neighbors', () => {
      cy.getCell(4, 6).click();
      cy.getCell(4, 4).click();

      cy.nextStep();

      cy.getCell(4, 5).should('not.have.class', 'active');
    });

    it('stays dead when there are four live neighbors', () => {
      cy.getCell(4, 6).click();
      cy.getCell(4, 4).click();
      cy.getCell(3, 5).click();
      cy.getCell(5, 5).click();

      cy.nextStep();

      cy.getCell(4, 5).should('not.have.class', 'active');
    });

    it('spawns when there are three live neighbors', () => {
      cy.getCell(4, 6).click();
      cy.getCell(4, 4).click();
      cy.getCell(5, 5).click();

      cy.nextStep();

      cy.getCell(4, 5).should('have.class', 'active');
    });
  })
});
