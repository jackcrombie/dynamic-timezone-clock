const { test, expect } = require('@playwright/test');

test.describe('Config.html UI', () => {
  let server;

  test.beforeAll(async () => {
    // Start a local server to handle ES modules
    const { exec } = require('child_process');
    server = exec('python3 -m http.server 8000');
    // Give server time to start
    await new Promise(resolve => setTimeout(resolve, 1000)); 
  });

  test.afterAll(() => {
    server.kill();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000/config.html');
  });

  test('should show default units and update URL on change', async ({ page }) => {
    // Check default units
    await expect(page.locator('#tempUnit')).toHaveValue('C');
    await expect(page.locator('#windUnit')).toHaveValue('kph');

    // Change units
    await page.selectOption('#tempUnit', 'F');
    await page.selectOption('#windUnit', 'mph');
    
    // Generate URL
    await page.click('button.btn-generate');
    const url = await page.locator('#generatedURL').textContent();
    expect(url).toContain('temp_unit=F');
    expect(url).toContain('wind_unit=mph');
  });

  test('should update coordinates and preview on timezone change', async ({ page }) => {
    await page.fill('#timezone', 'Pacific/Auckland');
    await page.click('.timezone-suggestion'); // Select the first suggestion

    await expect(page.locator('#weatherLat')).not.toHaveValue('');
    await expect(page.locator('#weatherLon')).not.toHaveValue('');

    // Preview should update
    await page.click('button.btn-preview');
    const preview = page.frameLocator('#preview');
    await expect(preview.locator('body')).toBeVisible();
  });

  test('should show crosshatch background when transparency is selected', async ({ page }) => {
    await page.click('.transparent-btn');
    await page.click('button.btn-preview');
    await expect(page.locator('#crosshatchBg')).toBeVisible();
  });
});
