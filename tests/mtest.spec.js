const { test, expect } = require('@playwright/test');
const { devices, chromium } = require('playwright');

const iPhone = devices['iPhone 6'];

test('My First Test', async ({ page, browser }) => {
  // Create a new context with iPhone emulation
  const context = await browser.newContext({
    ...iPhone
  });

  // Create a new page within the context
  const newPage = await context.newPage();

  // Navigate to the initial page
  await newPage.goto('https://login-signup-blond.vercel.app/');
  await page.pause();


  // Perform actions specific to the test
  await newPage.waitForSelector('form:has-text("Sign In") [placeholder="userName"]');
  await newPage.locator('form:has-text("Sign In") [placeholder="userName"]').fill('REDHAIR');
  await newPage.locator('form:has-text("Sign In") [placeholder="Password"]').fill('12345678');
  await newPage.locator('form:has-text("Sign In") button:has-text("Sign In")').click();

  // Wait for the expected element on the next page
  await newPage.waitForSelector('h1', { text: 'Login is Successfull' });

  // Assert that the form exists on the page
  await expect(newPage.locator('form:has-text("Sign In")')).toHaveCount(1);

  // Assert the final URL after navigation
  const url = newPage.url();
  expect(url).toBe('https://login-signup-blond.vercel.app/');

  // Close the context after the test is complete
  await context.close();
});
