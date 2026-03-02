Cypress.Commands.add('login', () => {
  cy.visit('/login') // your login page

  // Use Cypress.env() to get credentials
  cy.get('input[name="email"]').type(Cypress.env('email'))
  cy.get('input[placeholder="Enter Password"]').type(Cypress.env('password'), { log: false })

  cy.get('button[type="submit"]').click()
})