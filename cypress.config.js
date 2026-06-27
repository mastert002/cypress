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
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        launchOptions.args.push('--disable-gpu')
        launchOptions.args.push('--no-sandbox')
        launchOptions.args.push('--disable-dev-shm-usage')
        return launchOptions
      })
    },
  },
  env: {
    email: 'regtmpuser4@africaprudential.com',
    password: '$Greenpole202605##'
  }
})
