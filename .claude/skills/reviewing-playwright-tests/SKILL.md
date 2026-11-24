---
name: reviewing-playwright-tests
description: Use when reviewing Playwright tests or page objects in this repo, before committing, or when a test passes but you do not trust it.
---

# Reviewing Playwright tests (saucedemo)

Read the changed files and `CLAUDE.md`. Report findings as a list, most serious first. Say which file and line each one is in. Do not rewrite the code unless asked.

## Check each item
1. **Rules from CLAUDE.md:** `getByTestId` or `getByRole` only. No XPath. No `waitForTimeout`. Credentials and base URL from `.env`, none hard-coded. Title format `TC-<AREA>-<n> - Verify <behavior>`.
2. **Structure:** locators and `verify...` methods live in page objects. Specs import from `fixtures/fixture`. Test data lives in `test-data/`.
3. **Does it prove anything?** Every test must assert a user-visible outcome. Look for tests that could never fail: an assertion on something that is always true, a count checked with `> 1` when the exact number is known, or a name like "all products" that does not cover all of them.
4. **Assertions:** web-first (`await expect(locator)`). Reading a value with `await locator.count()` and then asserting on the number is not web-first, so it will not retry.
5. **Data:** do expected values match the site (6 products, names, prices)? Do two files disagree with each other?
6. **Independence:** no test relies on another one running first or on leftover state.
7. **Empty and edge cases:** empty cart (badge count 0), empty or missing fields, locked-out user.
8. **Page object methods:** every method is used or tested. A method nobody calls (like `closeMenu`) can be broken without anyone knowing.
9. **Tidiness:** unused imports, stray comments, missing `// @ts-check`, wrong JSDoc types, typos in titles.

## Output
- A short list of findings with severity: **bug**, **weak test**, or **cleanup**.
- What was good, in one or two lines.
- Say plainly if you did not run the tests. Reading the code is not the same as running it.
- If a finding is a mistake in Claude's own earlier output, add one line to `CORRECTIONS.md`.
