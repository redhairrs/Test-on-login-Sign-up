const { test, expect } = require('@playwright/test');

test('My First Test', async ({ page }) => {
    await page.goto('https://login-signup-blond.vercel.app/');
    await page.pause();

    // Using parent selectors to be more specific
    await page.locator('form:has-text("Sign In") [placeholder="userName"]').fill('REDHAIR');
    await page.locator('form:has-text("Sign In") [placeholder="Password"]').fill('12345678');
    
    // Click the specific Sign In button within the Sign In form
    await page.locator('form:has-text("Sign In") button:has-text("Sign In")').click();
    await page.waitForSelector('form:has-text("Sign In")', { timeout: 3000 })
    await page.waitForSelector('h1', { text: 'Login is Successfull' });
    await expect(page.locator('form:has-text("Sign In")')).toHaveCount(1)
    const url = page.url();
    expect(url).toBe('https://login-signup-blond.vercel.app/');
});

