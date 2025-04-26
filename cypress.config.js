const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CI ? 'http://web:3001' : 'http://localhost:3001',
    supportFile: false
  }
});
