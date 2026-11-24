const { test } = require('../fixtures/fixture');
const { credentials } = require('../test-data/credentials');
const { sortScenarios } = require('../test-data/inventoryData');
const { cartBadgeScenarios, cartBadgeRemoveScenarios } = require('../test-data/productTestData');

test.describe('Inventory Page', () => {
    test.beforeEach(async ({ loginPage }) => {
        const { username, password } = credentials.standardUser;
        if (!username || !password) throw new Error('STANDARD_USER and PASSWORD must be set in .env');

        await loginPage.open();
        await loginPage.login(username, password);
    });

    test('TC-INVENTORY-1 - Verify inventory page is displayed', async ({ inventoryPage }) => {
        await inventoryPage.verifyInventoryPageVisible();
        await inventoryPage.verifyProductsDisplayed();
    })

    test('TC-INVENTORY-2 - Verify sorting dropdown is visible', async ({ inventoryPage }) => {
        await inventoryPage.verifySortingDropdownVisible();
    });

    for (const scenario of sortScenarios) {
        test(`Verify products are sorted by ${scenario.name}`, async ({ inventoryPage }) => {
            await inventoryPage.sortProducts(scenario.value);
            await inventoryPage.verifySelectedSortOption(scenario.value);
            await inventoryPage.verifyProductsSorted(scenario.value);
        });
    } 

    for (const scenario of cartBadgeScenarios) {
        test(`Verify cart badge shows ${scenario.expectedCount} after adding ${scenario.description}`, async ({ inventoryPage }) => {
            for(const name of scenario.productNames) {
                await inventoryPage.addProductToCart(name);
            }
            await inventoryPage.verifyCartBadgeCount(scenario.expectedCount);
        })
    };

    for (const scenario of cartBadgeRemoveScenarios) {
        test(`Verify cart badge after we ${scenario.description}`, async ({ inventoryPage }) => {
            for(const name of scenario.add) {
                await inventoryPage.addProductToCart(name);
            }
            await inventoryPage.verifyCartBadgeCount(scenario.add.length);

            for(const name of scenario.remove) {
                await inventoryPage.removeProductFromCart(name);
            }
            await inventoryPage.verifyCartBadgeCount(scenario.expectedCount);
        });
    }
});

//comment test