// @ts-check
const { test, expect } = require('../fixtures/fixture');
const { credentials } = require('../test-data/credentials');


test('TC-LOGIN-1 - Verify standard user can log in and sees the products page', async ({ loginPage, inventoryPage }) => {
  const { username, password } = credentials.standardUser;
  if (!username || !password) throw new Error('STANDARD_USER and PASSWORD must be set in .env');

  await loginPage.open();
  await loginPage.login(username, password);

  await inventoryPage.verifyInventoryPageVisible();
});

test('TC-LOGIN-2 - Verify locked out user cannot log in and sees the error message', async ({ loginPage }) => { 
  const { username, password } = credentials.lockedOutUser;
  if (!username || !password) throw new Error('LOCKED_OUT_USER and PASSWORD must be set in .env');

  await loginPage.open();
  await loginPage.login(username, password);

  await loginPage.verifyErrorMessageVisible('Sorry, this user has been locked out.');
});

test('TC-LOGIN-3 - Verify error message is displayed for wrong password', async ({ loginPage }) => {
  const { username, password } = credentials.wrongPasswordUser;
  if (!username || !password) throw new Error('STANDARD_USER and WRONG_PASSWORD must be set in .env');

  await loginPage.open();
  await loginPage.login(username, password);

  await loginPage.verifyErrorMessageVisible('Username and password do not match any user in this service');
});

test('TC-LOGIN-4 - Verify error message is displayed for empty username and password', async ({ loginPage }) => {
  const { username, password } = credentials.emptyUsernamePassword;

  await loginPage.open();
  await loginPage.login(username, password);

  await loginPage.verifyErrorMessageVisible('Username is required');
});
