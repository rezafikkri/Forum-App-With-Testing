import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
    video: false,
    baseUrl: 'http://localhost:3000',
  },
  env: {
    apiBaseUrl: 'https://forum-api.dicoding.dev/v1',
    signInEmail: 'userfortest@yahoo.com',
    signInPassword: 'userfortest',
  },
});
