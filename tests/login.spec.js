// @ts-check
const { test, expect } = require('../fixtures/fixture');

test('TC-LOGIN-1 - Verify standard user can log in and sees the products page', async ({ loginPage }) => {
  const username = process.env.STANDARD_USER;
  const password = process.env.PASSWORD;
  if (!username || !password) throw new Error('STANDARD_USER and PASSWORD must be set in .env');

  await loginPage.open();
  await loginPage.login(username, password);

  await loginPage.verifyValidLogin();
});

test('TC-LOGIN-2 - Verify locked out user cannot log in and sees the error message', async ({ loginPage }) => { 
  const username = process.env.LOCKED_OUT_USER;
  const password = process.env.PASSWORD;
  if (!username || !password) throw new Error('LOCKED_OUT_USER and PASSWORD must be set in .env');

  await loginPage.open();
  await loginPage.login(username, password);

  await loginPage.verifyErrorMessageVisible();
});
