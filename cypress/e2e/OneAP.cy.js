describe('GreenPole', () => {

  beforeEach(() => {
    cy.session('authenticated', () => {
      cy.visit('https://dev-portal.aws.mygreenpole.com/');
      cy.get('input[name="email"]').type('regtmpuser4@africaprudential.com');
      cy.get('input[placeholder="Enter Password"]').type('$Greenpole202605##');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/modules/home');
    });
  });

  it('Verify GreenPole Page loads and login successfully', () => {
    cy.visit('https://dev-portal.aws.mygreenpole.com/modules/home');
    cy.get('body').should('be.visible');
    cy.url().should('include', '/modules/home');
  });

  it('"Company Name" data table displays correctly on "GreenPole | Equity"', () => {
    cy.visit('https://dev-portal.aws.mygreenpole.com/modules/Equity');
    cy.get('table').should('be.visible');
    cy.contains('Company Name').should('be.visible');
  });

  it('Navigation links are functional on "GreenPole | Equity"', () => {
    cy.visit('https://dev-portal.aws.mygreenpole.com/modules/Equity');
    cy.contains('Home').click();
    cy.url().should('not.include', 'login');
    cy.go('back');
    cy.contains('Equity').click();
    cy.url().should('include', 'Equity');
  });

  it('Verify View Client Company page loads successfully', () => {
    cy.visit('https://dev-portal.aws.mygreenpole.com/modules/Equity/view-client-companies');
    cy.get('body').should('be.visible');
    cy.url().should('include', 'view-client-companies');
  });

});