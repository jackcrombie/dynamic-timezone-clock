const { test, expect } = require('@playwright/test');

function urlWithUnits(temp, wind) {
  return `http://localhost:8000/index.html?tz=Pacific/Auckland&weather=true&temp_unit=${temp}&wind_unit=${wind}`;
}

test.describe('Index.html Widget', () => {
  let server;

  test.beforeAll(async () => {
    const { exec } = require('child_process');
    server = exec('python3 -m http.server 8000');
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  test.afterAll(() => {
    server.kill();
  });

  test('should parse and display temperature and wind in selected units', async ({ page }) => {
    await page.goto(urlWithUnits('F', 'mph'));
    await page.waitForSelector('#weatherTemp');
    await expect(page.locator('#weatherTemp')).toContainText('°F');
    await expect(page.locator('#weatherWind')).toContainText('mph');
  });

  test('should default to °C and kph if units missing', async ({ page }) => {
    await page.goto('http://localhost:8000/index.html?tz=Pacific/Auckland&weather=true');
    await page.waitForSelector('#weatherTemp');
    await expect(page.locator('#weatherTemp')).toContainText('°C');
    await expect(page.locator('#weatherWind')).toContainText('kph');
  });

  test('should update weather display when units in URL change', async ({ page }) => {
    await page.goto(urlWithUnits('C', 'ms'));
    await page.waitForSelector('#weatherTemp');
    await expect(page.locator('#weatherTemp')).toContainText('°C');
    await expect(page.locator('#weatherWind')).toContainText('ms');

    await page.goto(urlWithUnits('F', 'mph'));
    await page.waitForSelector('#weatherTemp');
    await expect(page.locator('#weatherTemp')).toContainText('°F');
    await expect(page.locator('#weatherWind')).toContainText('mph');
  });
});
