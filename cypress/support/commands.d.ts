declare namespace Cypress {
  interface Chainable {
    getCell(x: number, y: number, ...args: any[]): Chainable<JQuery<HTMLElement>>;
    nextStep(): Chainable<void>;
    clearCells(): Chainable<void>;
  }
}
