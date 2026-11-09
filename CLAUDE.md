# Project: Playwright tests for https://www.saucedemo.com (public practice site)

## Stack and commands
- JavaScript (CommonJS), @playwright/test, Page Object Model
- Run all: `npx playwright test` | one file: `npx playwright test tests/login.spec.js`
- Report: `npx playwright show-report`

## Structure
- pages/ page objects (extend BasePage)
- fixtures/fixture.js registers page objects. Specs import `test` from here.
- tests/ specs | test-data/ users and products | utils/ helpers

## Rules
- Locators: saucedemo uses `data-test` attributes. Set `testIdAttribute: 'data-test'` in the config and use getByTestId, then getByRole.
- No XPath, no fixed waits (`waitForTimeout`). Use web-first assertions.
- Every test asserts a user-visible outcome. Tests are independent.
- Credentials and base URL come from .env (see .env.example). Never hardcode.
- Test titles: `TC-<AREA>-<n> - Verify <expected behavior>`.
- Only automate saucedemo, with light traffic. No load testing.