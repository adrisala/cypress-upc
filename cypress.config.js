const { defineConfig } = require("cypress");
/// <reference types="Cypress">
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true
  },
  video: true,
  videoCompression: true
});
