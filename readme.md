# Getting Started with Playwright

## What is Playwright?

Playwright is an open-source Node.js library for automating browsers (Chromium, Firefox, WebKit) used for end-to-end testing, browser automation, and scraping. It allows developers to simulate user interactions with web applications across different browsers.

### Types of Tests You Can Perform with Playwright

With Playwright, you can automate various types of tests including:

- **End-to-End Tests:** Test entire user flows across web pages.
- **Integration Tests:** Test interactions between different components of a web application.
- **UI Tests:** Validate UI components, forms, buttons, etc.
- **Cross-Browser Tests:** Ensure consistent behavior across different browser engines (Chromium, Firefox, WebKit).

## Getting Started

### Prerequisites

Before learning and using Playwright, ensure you have the following installed:

- **Node.js:** Playwright is built on Node.js, so make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Playwright Package:** Install Playwright using npm (Node Package Manager):

  ```bash
  npm init playwright@latest
  javascript / typescript
  
# Playwright Features Overview

Playwright is a powerful automation tool for testing web applications, providing a comprehensive set of features that make it ideal for modern web development workflows.

## Key Features

### 1. Multi-Browser Support

Playwright supports automation across multiple browsers:
- **Chromium**
- **Firefox**
- **WebKit (Safari)**

This allows developers to ensure cross-browser compatibility and consistent behavior across different browser engines.

### 2. Fast and Reliable Tests

Playwright offers fast and reliable test execution:
- **Parallel Execution**: Run tests concurrently to reduce overall execution time.
- **Isolated Test Execution**: Tests run in isolated browser contexts, ensuring reliability and reproducibility.

### 3. Fluent API for Automation

Playwright provides a fluent and easy-to-use API for automating browser interactions:
- **Navigating**: Navigate to URLs, handle navigation events.
- **Interacting**: Fill forms, click buttons, type text, etc.
- **Assertions**: Validate elements, text content, attributes, etc., with built-in matchers.

### 4. Device Emulation

With Playwright, simulate different devices and viewports:
- **Device Emulation**: Emulate mobile devices like iPhones, iPads, and Android devices for responsive design testing.
- **Viewport and Screen Sizes**: Test how your application renders on different screen resolutions.

### 5. Integrated Test Runner

Playwright comes with an integrated test runner (`@playwright/test`) that simplifies test management:
- **Test Organization**: Group tests, organize test suites, and run tests in sequence or parallel.
- **Built-in Assertions**: Use built-in matchers (`expect(...).toHaveText(...)`, `expect(...).toHaveCount(...)`, etc.) for assertions.

### 6. Automatic Browser Management

Playwright manages browser binaries and versions automatically:
- **Automatic Updates**: Stay up-to-date with the latest browser versions without manual intervention.
- **Browser Installation**: Install and manage browser binaries on different operating systems seamlessly.

### 7. Advanced Automation Scenarios

Handle complex automation scenarios with Playwright's advanced features:
- **File Uploads and Downloads**: Automate interactions with file inputs and downloads.
- **Browser Contexts**: Manage multiple browser contexts for scenarios like authenticated sessions, incognito mode, etc.

# Running Playwright Tests
    ```bash
    npx playwright test
    npx playwright test --workers 3
    npx playwright test one.spec.js
    npx playwright test one.spec.js two.spec.js
    npx playwright test one two
    npx playwright test -g "check title"
    npx playwright test --project=chromium
    npx playwright test --headed
    npx playwright test --debug
    npx playwright test example.spec.js:21 --debug


# Examples

To learn how to run these Playwright Test examples, check out our [getting started docs](https://playwright.dev/docs/intro).

```JavaScript
// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

```

#### Mobile and geolocation

This snippet emulates Mobile Safari on a device at given geolocation, navigates to maps.google.com, performs the action and takes a screenshot.

```JavaScript
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

```

#### Evaluate in browser context

This code snippet navigates to example.com, and executes a script in the page context.

```JavaScript
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
```

#### Intercept network requests

This code snippet sets up request routing for a page to log all network requests.

```JavaScript
const { chromium } = require('playwright');

(async () => {
  // Launch the browser (you can change `chromium` to `firefox` or `webkit` based on your preference)
  const browser = await chromium.launch();

  // Create a new browser context and page
  const context = await browser.newContext();
  const page = await context.newPage();

  // Intercept and log all network requests
  await page.route('**', route => {
    console.log('Intercepted URL:', route.request().url());
    route.continue();
  });

  // Navigate to a website
  await page.goto('http://todomvc.com');

  // Close the browser
  await browser.close();
})();

```

## Resources

* [Documentation](https://playwright.dev/docs/intro)
* [API reference](https://playwright.dev/docs/api/class-playwright/)
* [Contribution guide](CONTRIBUTING.md)
* [Changelog](https://github.com/microsoft/playwright/releases)


