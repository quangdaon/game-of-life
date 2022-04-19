import { APP_URL } from '../../config/index';

before(() => {
  cy.visit(APP_URL);
});
