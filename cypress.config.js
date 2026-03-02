/*const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});*/


const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dev-portal.aws.mygreenpole.com/',
  },
  env: {
    email: 'regtmpuser4@africaprudential.com',
    password: '$Greenpole202602#'
  }
})
