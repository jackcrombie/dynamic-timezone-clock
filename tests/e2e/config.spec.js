// Playwright + Jest test for config.html
const { test, expect } = require('@playwright/test');

test.describe('Config.html UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/config.html');
  });

  test('should show default units and update URL on change', async ({ page }) => {
    // Check default units
    const tempUnit = await page.locator('#tempUnit').inputValue();
    const windUnit = await page.locator('#windUnit').inputValue();
    expect(tempUnit).toBe('C');
    expect(windUnit).toBe('KPH');

    // Change units
    await page.selectOption('#tempUnit', 'F');
    await page.selectOption('#windUnit', 'MPH');
    // Generate URL
    await page.click('#generateBtn');
    const url = await page.locator('#generatedUrl').inputValue();
    expect(url).toContain('temp_unit=F');
    expect(url).toContain('wind_unit=MPH');
  });

  test('should update coordinates and preview on timezone change', async ({ page }) => {
    await page.selectOption('#timezone', 'Pacific/Auckland');
    const lat = await page.locator('#latitude').inputValue();
    const lon = await page.locator('#longitude').inputValue();
    expect(lat).not.toBe('');
    expect(lon).not.toBe('');
    // Preview should update
    const preview = await page.frameLocator('#previewFrame');
    await expect(preview.locator('body')).toBeVisible();
  });

  test('should show crosshatch background when transparency is selected', async ({ page }) => {
    await page.check('#transparentBg');
    const wrapperClass = await page.locator('#previewFrameWrapper').getAttribute('class');
    expect(wrapperClass).toContain('crosshatch-bg');
  });

  test('should show warning if units require conversion', async ({ page }) => {
    await page.selectOption('#tempUnit', 'F');
    const warning = await page.locator('#unitWarning').textContent();
    expect(warning).toMatch(/conversion/i);
  });
});
