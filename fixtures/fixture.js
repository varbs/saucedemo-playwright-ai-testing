// @ts-check
const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { ProductDetailPage } = require('../pages/ProductDetailPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

/**
 * Page objects available to every test.
 * @typedef {{
 *  loginPage: LoginPage
 *  inventoryPage: InventoryPage
 *  productDetailPage: ProductDetailPage
 *  cartPage: CartPage
 *  checkoutPage: CheckoutPage
 * }} PageFixtures
 */

/**
 * @typedef { import('@playwright/test').PlaywrightTestArgs & 
 * import('@playwright/test').PlaywrightTestOptions
 * } BuiltInTestArgs
 */

const test = base.test.extend(
/** @type {import('@playwright/test').Fixtures<PageFixtures, {}, BuiltInTestArgs>} */({
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
      await use(new InventoryPage(page));
    },

    productDetailPage: async ({ page }, use) => {
      await use(new ProductDetailPage(page));
    },

    cartPage: async ({ page }, use) => {
      await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
      await use(new CheckoutPage(page));
    },
  })
);

module.exports = { test, expect: base.expect };
