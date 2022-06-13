import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "ui/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    supportFile: false,
    screenshotOnRunFailure: false,
    baseUrl: "http://localhost:8081",
    setupNodeEvents() {}
  },
});
