describe('GreenPole', () => {

  it('Submit form on "https://dev-portal.aws.mygreenpole.com/"', () => {
    cy.visit('https://dev-portal.aws.mygreenpole.com/');

    cy.get('input[name="email"]').type(Cypress.env('email'));

    cy.get('input[placeholder="Enter Password"]').type(Cypress.env('password'), { log: false });

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/modules/home');

    cy.visit('https://dev-portal.aws.mygreenpole.com/modules/Equity/view-client-companies');
  });

});
