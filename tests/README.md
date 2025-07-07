# Automated UI Tests for Dynamic Timezone Clock

This directory contains automated end-to-end UI tests for `config.html` and `index.html` using [Playwright](https://playwright.dev/) and [Jest](https://jestjs.io/).

## Structure
- `e2e/config.spec.js`: UI tests for the configuration page (`config.html`).
- `e2e/index.spec.js`: UI tests for the clock widget (`index.html`).
- `playwright.config.js`: Playwright configuration.
- `jest.config.js`: Jest configuration for running Playwright tests.

## Running the Tests

1. **Install dependencies:**
   ```sh
   npm install --save-dev playwright jest
   npx playwright install
   ```
2. **Run all tests:**
   ```sh
   npx playwright test
   ```
   or
   ```sh
   npx jest
   ```

## What is Tested?
- Unit selection and URL generation in `config.html`.
- Coordinate lookup and preview logic in `config.html`.
- Weather display and unit conversion in `index.html`.
- Live preview and transparency checkerboard.
- Warnings for unit conversions.

See the individual test files for details.
