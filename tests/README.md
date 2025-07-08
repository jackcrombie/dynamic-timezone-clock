# Automated UI Tests for Dynamic Timezone Clock

This directory contains automated end-to-end UI tests for `config.html` and `index.html` using [Playwright](https://playwright.dev/).

## Structure
- `e2e/config.spec.js`: UI tests for the configuration page (`config.html`).
- `e2e/index.spec.js`: UI tests for the clock widget (`index.html`).
- `playwright.config.js`: Playwright configuration.
- `jest.config.js`: Jest configuration (not currently used, but available).

## Running the Tests

The tests require a local web server to be running to correctly handle the ES module imports in the JavaScript.

1.  **Install dependencies:**
    ```sh
    npm install --save-dev playwright
    npx playwright install
    ```

2.  **Start the local web server:**
    ```sh
    python3 -m http.server 8000
    ```
    *Note: The tests are configured to run against `http://localhost:8000`.*

3.  **Run all tests in a separate terminal:**
    ```sh
    npx playwright test
    ```

## What is Tested?
- Default unit selection and URL generation in `config.html`.
- Coordinate lookup and preview logic in `config.html`.
- Weather display and unit parsing in `index.html`.
- Live preview and transparency checkerboard.

See the individual test files for details.
