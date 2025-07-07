// Playwright config for running UI tests
// Run with: npx playwright test

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './e2e',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1200, height: 900 },
    ignoreHTTPSErrors: true,
  },
};

module.exports = config;
