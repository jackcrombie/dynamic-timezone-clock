// Playwright + Jest test for index.html
const { test, expect } = require('@playwright/test');

function urlWithUnits(temp, wind) {
  return (
    'file://' +
    process.cwd() +
    `/index.html?timezone=Pacific/Auckland&lat=-36.85&lon=174.76&temp_unit=${temp}&wind_unit=${wind}`
  );
}

test.describe('Index.html Widget', () => {
  test('should parse and display temperature and wind in selected units', async ({ page }) => {
    await page.goto(urlWithUnits('F', 'MPH'));
    // Wait for weather to load
    await page.waitForSelector('.weather-temp');
    const tempText = await page.locator('.weather-temp').textContent();
    const windText = await page.locator('.weather-wind').textContent();
    expect(tempText).toMatch(/°F/);
    expect(windText).toMatch(/MPH/);
  });

  test('should default to °C and KPH if units missing', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/index.html?timezone=Pacific/Auckland&lat=-36.85&lon=174.76');
    await page.waitForSelector('.weather-temp');
    const tempText = await page.locator('.weather-temp').textContent();
    const windText = await page.locator('.weather-wind').textContent();
    expect(tempText).toMatch(/°C/);
    expect(windText).toMatch(/KPH/);
  });

  test('should update weather display when units in URL change', async ({ page }) => {
    await page.goto(urlWithUnits('C', 'm/s'));
    await page.waitForSelector('.weather-temp');
    let tempText = await page.locator('.weather-temp').textContent();
    let windText = await page.locator('.weather-wind').textContent();
    expect(tempText).toMatch(/°C/);
    expect(windText).toMatch(/m\/s/);
    // Change units
    await page.goto(urlWithUnits('F', 'MPH'));
    await page.waitForSelector('.weather-temp');
    tempText = await page.locator('.weather-temp').textContent();
    windText = await page.locator('.weather-wind').textContent();
    expect(tempText).toMatch(/°F/);
    expect(windText).toMatch(/MPH/);
  });
});
