# saucedemo-playwright-ai-testing

End-to-end test automation for [saucedemo.com](https://www.saucedemo.com), a public
practice shop, built with Playwright and JavaScript.

I built this project from an empty folder to show how I use AI in QA work: Claude Code
writes the first draft of tests, and I review, run and correct every one of them.

## What it covers
- Login, logout and the locked-out user
- Product list, sorting and product details
- Cart and checkout, including totals
- Defects found with the problem, error, performance and visual users

## How it is built
- Playwright with the Page Object Model and custom fixtures
- Test data kept separate from tests
- GitHub Actions on every push and pull request, with HTML report and traces on failure
- Smoke and regression tags

## How I use AI in this project
- `CLAUDE.md` holds the project rules.
- Two project skills live in `.claude/skills/`: one for writing tests, one for reviewing them.
- `CORRECTIONS.md` is a log of what Claude got wrong and how I fixed it. The skills
  were built from that log.
- Every test is run repeatedly to check for flakiness, and the important ones are
  checked by breaking the behavior on purpose to confirm the test fails.

## Run it
npm install
cp .env.example .env
npx playwright test