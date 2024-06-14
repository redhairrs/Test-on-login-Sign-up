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

# Alternatives to Playwright

Here are ten popular alternatives to Playwright, along with their key features and commonalities:

## 1. Selenium
**Features:**
- Supports multiple browsers and programming languages (Java, C#, Python, Ruby, JavaScript).
- Large community and extensive documentation.
- Ability to interact with web elements and handle complex user interactions.
- Supports parallel test execution with Selenium Grid.
- Rich set of APIs for handling browser automation.

## 2. Cypress
**Features:**
- Focused on end-to-end testing.
- Real-time reloading and automatic waiting.
- Rich debugging capabilities.
- Runs in the same run-loop as the application.
- Built-in assertion library.

## 3. Puppeteer
**Features:**
- Provides a high-level API over the Chrome DevTools Protocol.
- Supports headless mode.
- Great for automated testing and scraping.
- Built and maintained by Google.
- Native support for modern JavaScript features.

## 4. TestCafe
**Features:**
- No need for browser plugins or WebDriver.
- Cross-browser testing with a single API.
- Automatic waiting and smart test actions.
- Comprehensive support for ES6+ and TypeScript.
- Easy setup and configuration.

## 5. WebDriverIO
**Features:**
- Integrates with popular test frameworks (Mocha, Jasmine, Cucumber).
- Supports both WebDriver and DevTools protocols.
- Extensive plugin system.
- Cross-browser and cross-device testing.
- Supports automated visual regression testing.

## 6. Robot Framework
**Features:**
- Keyword-driven testing framework.
- Large ecosystem with various libraries and tools.
- Supports many platforms and applications.
- Highly extensible with custom libraries.
- Suitable for acceptance testing and robotic process automation (RPA).

## 7. Protractor
**Features:**
- Designed for Angular applications.
- Built on top of WebDriverJS.
- Supports end-to-end testing.
- Automatic waiting for Angular.
- Works with Jasmine, Mocha, and Cucumber.

## 8. Nightwatch.js
**Features:**
- Integrated test runner and assertion framework.
- Uses W3C WebDriver API.
- Built-in support for parallel test execution.
- Selenium and WebDriverIO compatible.
- Simple syntax and easy configuration.

## 9. CasperJS
**Features:**
- Navigation scripting and testing utility for PhantomJS and SlimerJS.
- Easy to write and maintain scripts.
- Supports both headless and visual browser testing.
- Built-in unit testing and functional testing capabilities.
- Simple API for common web automation tasks.

## 10. Katalon Studio
**Features:**
- All-in-one test automation solution.
- Supports web, API, mobile, and desktop applications.
- Built-in support for continuous integration.
- Codeless and scripting modes.
- Rich set of built-in keywords and custom keywords support.

## Common Features
- **Cross-Browser Support**: Most of these tools support testing on multiple browsers, including Chrome, Firefox, Safari, and Edge.
- **Parallel Execution**: They provide capabilities for running tests in parallel to reduce execution time.
- **Rich API and Automation**: Extensive APIs for interacting with web elements, handling user interactions, and automating browser tasks.
- **Integration**: Integration with various CI/CD tools like Jenkins, CircleCI, and GitLab CI.
- **Reporting**: Built-in or third-party integration for generating test reports.
- **Community and Documentation**: Strong community support and comprehensive documentation.
- **Headless Mode**: Support for running tests in headless mode for faster execution and resource efficiency.
- **Assertion Libraries**: Built-in or integrated assertion libraries to validate test outcomes.
- **Debugging Tools**: Tools and capabilities to debug tests effectively.
- **Support for Modern Web Technologies**: Capabilities to handle modern web applications built with frameworks like React, Angular, and Vue.js.

## Differences
- **Language Support**: Selenium supports multiple languages, while Cypress is primarily JavaScript-based.
- **Angular Support**: Protractor is specifically designed for Angular applications.
- **Execution Environment**: TestCafe and Cypress run directly in the browser context, whereas Selenium and WebDriverIO rely on WebDriver.
- **Real-Time Reloading**: Cypress offers real-time reloading, whereas most other tools do not.
- **Ease of Setup**: Tools like TestCafe and Cypress are known for their easy setup compared to Selenium.
- **Headless Browsers**: Puppeteer is specifically designed for headless Chrome, while others support multiple headless browsers.
- **Keyword-Driven Testing**: Robot Framework offers keyword-driven testing, making it suitable for non-developers.


## Resources

* [Documentation](https://playwright.dev/docs/intro)
* [API reference](https://playwright.dev/docs/api/class-playwright/)
* [Contribution guide](CONTRIBUTING.md)
* [Changelog](https://github.com/microsoft/playwright/releases)


