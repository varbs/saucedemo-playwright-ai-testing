# CORRECTIONS

One line each time a mistake in Claude's output is fixed.
Format: `date | where | what Claude got wrong | the fix`

- earlier session | test report exercise (`suites[0].test` crash) | Claude blamed a typo in the user's code | the data really used `test:` for Login and Checkout and `tests:` for Cart; the keys were mismatched, so use one spelling everywhere
- 2026-11-24 | cart badge and product detail test snippets in chat | Claude hard-coded `standard_user` / `secret_sauce`, used `page.locator('[data-test=...]')` instead of `getByTestId`, and skipped the page objects, all against the project's CLAUDE.md rules | found in review, fix pending: rewrite with `credentials` from .env, `getByTestId`, and `InventoryPage` / a new `ProductDetailPage`
- 2026-11-24 | review of full project | Invalid JSDoc union type syntax (comma instead of pipe) in InventoryPage.js lines 41, 88, 97; non-web-first assertion using `count()` then `expect()`; data-driven test titles missing TC- prefix; dead code `closeMenu()`; unused export `productTestData`; raw `page.goto()` in test instead of page object; duplicate product detail tests | Fixed all: corrected JSDoc types, changed to `toHaveCount(6)`, added TC- prefixes to all data-driven tests, removed `closeMenu()` and `productTestData`, added `InventoryPage.goto()`, removed duplicate loop in productDetail.spec.js
- 2026-11-24 | cart tests | CartPage used wrong locator `cart-item` instead of `inventory-item` (saucedemo uses same data-test on cart page); TC-CART-7 incorrectly called cartPage.verifyCartItemCount() while on inventory page | Fixed CartPage.js to use `inventory-item`; fixed TC-CART-7 to use inventoryPage.verifyCartBadgeCount() and proper navigation flow
