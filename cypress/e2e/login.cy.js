describe('Login Test', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should load dashboard after login', () => {
    cy.url().should('include', '/modules/home')
  })
})