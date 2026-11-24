---
name: writing-playwright-tests
description: Use when writing or extending Playwright tests for saucedemo in this repo. Follows the Page Object Model, data-test locators, .env credentials and the TC title format.
---

# Writing Playwright tests (saucedemo)

Read `CLAUDE.md` and `CORRECTIONS.md` first. The corrections are mistakes already made once.

## Steps
1. Check `pages/` for an existing page object. Add new locators and `verify...` methods to the page object, never to the spec. Create a new page object (extending `BasePage`) only for a new page, and register it in `fixtures/fixture.js`.
2. Import `test` and `expect` from `../fixtures/fixture`, not from `@playwright/test`.
3. Locators: `getByTestId(...)` first (the config sets `testIdAttribute: 'data-test'`), then `getByRole`. Never `page.locator('[data-test=...]')`, never XPath.
4. Credentials come from `test-data/credentials.js` (which reads `.env`). Never type `standard_user` or a password in a test.
5. Several inputs for one behavior: put the list in `test-data/` and loop over it with `for (const scenario of scenarios)`. Each test title must be unique, so include the scenario in the title.
6. Title format: `TC-<AREA>-<n> - Verify <expected behavior>`. Data-driven tests still need the TC number.
7. Assert a user-visible outcome with web-first assertions (`await expect(locator)...`). No `waitForTimeout`. Tests must not depend on each other.

## SauceDemo facts
- Cart badge: the element does not exist when the cart is empty. Empty means `toHaveCount(0)`. Otherwise `toHaveText(String(count))`.
- Add and Remove buttons have different `data-test` names, so find them by product name inside `inventoryItems`, as `InventoryPage` does.
- The product list has 6 products. Use `test-data/productTestData.js`, and keep it in sync with the site.

## Before you say it is done
- Run the file: `npx playwright test tests/<file>.spec.js`
- Check flakiness: add `--repeat-each=3`
- For important tests, break the behavior on purpose (change an expected value) and confirm the test fails, then change it back.
- If a mistake in your own output was found and fixed, add one line to `CORRECTIONS.md`.
