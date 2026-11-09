// @ts-check
const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

/**
 * Page objects available to every test.
 * @typedef {{ loginPage: LoginPage }} PageFixtures
 */

/**
 * @typedef {import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions} BuiltInTestArgs
 */

const test = base.test.extend(
  /** @type {import('@playwright/test').Fixtures<PageFixtures, {}, BuiltInTestArgs>} */ ({
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    },
  })
);

module.exports = { test, expect: base.expect };
