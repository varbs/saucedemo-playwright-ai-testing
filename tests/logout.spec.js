const { test } = require('../fixtures/fixture');
const { credentials } = require('../test-data/credentials');

test('TC-LOGOUT-1 - Verify user is redirected to login page after logout', async ({ loginPage, inventoryPage }) => {
    const { username, password } = credentials.standardUser;
    if (!username || !password) throw new Error('STANDARD_USER and PASSWORD must be set in .env');

    await loginPage.open();
    await loginPage.login(username, password);

    await inventoryPage.verifyInventoryPageVisible();

    await inventoryPage.logout();
    await loginPage.verifyLoginPageVisible();
});

test('TC-LOGOUT-2 - Verify inventory page is inaccessible after logout', async ({ loginPage, inventoryPage }) => {
    const { username, password } = credentials.standardUser;
    if (!username || !password) throw new Error('STANDARD_USER and PASSWORD must be set in .env');

    await loginPage.open();
    await loginPage.login(username, password);

    await inventoryPage.logout();

    await inventoryPage.goto();

    await loginPage.verifyLoginPageVisible();
});