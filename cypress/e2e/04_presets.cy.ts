import { APP_URL } from '../config';

describe('Presets', () => {
  beforeEach(() => {
    cy.visit(APP_URL);
  });

  describe('Presets Panel', () => {
    it('can be opened', () => {
      const loadPresetButton = cy.get('.actions > [data-cy="preset:load"]');
      loadPresetButton.should('exist').contains('Load Preset');
      loadPresetButton.click();

      cy.get('[data-cy="preset:picker"]').should('exist');
    });

    it('can be closed', () => {
      cy.get('.actions > [data-cy="preset:load"]').click();
      cy.get('.actions > [data-cy="preset:cancel"]').click();

      cy.get('[data-cy="preset:picker"]').should('not.exist');
    });
  });

  describe('Built-In Presets', () => {
    it('exist', () => {
      cy.clearCells();
      cy.get('.actions > [data-cy="preset:load"]').click();

      cy.get('[data-cy="preset:select(Glider)"]').should('exist');
      cy.get('[data-cy="preset:select(Pulsar)"]').should('exist');
      cy.get('[data-cy="preset:select(Penta-Decathlon)"]').should('exist');
      cy.get('[data-cy="preset:select(Space Invader)"]').should('exist');
    });

    it('can be loaded', () => {
      cy.clearCells();
      cy.get('.actions > [data-cy="preset:load"]').click();
      const gliderPresetButton = cy.get('[data-cy="preset:select(Glider)"]');
      gliderPresetButton.should('exist');
      gliderPresetButton.click();

      cy.getCell(2, 1).should('have.class', 'active');
      cy.getCell(3, 2).should('have.class', 'active');
      cy.getCell(1, 3).should('have.class', 'active');
      cy.getCell(2, 3).should('have.class', 'active');
      cy.getCell(3, 3).should('have.class', 'active');
    });
  });

  describe('Custom Presets', () => {
    const createPreset = () => {
      cy.clearCells();

      cy.getCell(6, 4).click();
      cy.getCell(6, 5).click();
      cy.getCell(6, 6).click();

      cy.window().then(($win) => {
        cy.stub($win, 'prompt').returns('Test Preset');
        cy.get('[data-cy="preset:save"]').click();
      });

      cy.clearCells();
    };

    it('can be saved', () => {
      createPreset();

      cy.clearCells();

      cy.get('.actions > [data-cy="preset:load"]').click();
      cy.get('[data-cy="preset:select(Test Preset)"]').should('exist');
    });

    it('can be loaded', () => {
      createPreset();

      cy.clearCells();

      cy.get('.actions > [data-cy="preset:load"]').click();
      cy.get('[data-cy="preset:select(Test Preset)"]').click();

      cy.getCell(6, 4).should('have.class', 'active');
      cy.getCell(6, 5).should('have.class', 'active');
      cy.getCell(6, 6).should('have.class', 'active');
    });

    it('persists across reloads', () => {
      createPreset();

      cy.reload();

      cy.clearCells();

      cy.get('.actions > [data-cy="preset:load"]').click();
      cy.get('[data-cy="preset:select(Test Preset)"]').should('exist');
    });

    it('can be deleted', () => {
      createPreset();

      cy.get('.actions > [data-cy="preset:load"]').click();
      cy.get('[data-cy="preset:delete(Test Preset)"]').click();

      cy.get('[data-cy="preset:select(Test Preset)"]').should('not.exist');

      cy.reload();

      cy.get('.actions > [data-cy="preset:load"]').click();
      cy.get('[data-cy="preset:select(Test Preset)"]').should('not.exist');
    });
  });
});
