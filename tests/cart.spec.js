// @ts-check
const { test } = require('../fixtures/fixture');
const { credentials } = require('../test-data/credentials');
const { products } = require('../test-data/productTestData');

test.describe('Cart Page', () => {
    test.beforeEach(async ({ loginPage }) => {
        const { username, password } = credentials.standardUser;
        if (!username || !password) throw new Error('STANDARD_USER and PASSWORD must be set in .env');

        await loginPage.open();
        await loginPage.login(username, password);
    });

    test('TC-CART-1 - Verify cart page is displayed when empty', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.goToCart();
        await cartPage.verifyCartPageVisible();
        await cartPage.verifyCartEmpty();
    });

    test('TC-CART-2 - Verify cart page displays added product', async ({ inventoryPage, cartPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.verifyCartPageVisible();
        await cartPage.verifyCartItemCount(1);
        await cartPage.verifyCartItem(product);
    });

    test('TC-CART-3 - Verify cart page displays multiple products', async ({ inventoryPage, cartPage }) => {
        const product1 = products.backpack;
        const product2 = products.bikeLight;

        await inventoryPage.addProductToCart(product1.name);
        await inventoryPage.addProductToCart(product2.name);
        await inventoryPage.goToCart();
        await cartPage.verifyCartPageVisible();
        await cartPage.verifyCartItemCount(2);
        await cartPage.verifyCartItem(product1);
        await cartPage.verifyCartItem(product2);
    });

    test('TC-CART-4 - Verify continue shopping returns to inventory page', async ({ inventoryPage, cartPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.verifyCartPageVisible();

        await cartPage.clickContinueShopping();
        await inventoryPage.verifyInventoryPageVisible();
    });

    test('TC-CART-5 - Verify user can remove product from cart page', async ({ inventoryPage, cartPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.verifyCartPageVisible();
        await cartPage.verifyCartItemCount(1);

        await cartPage.removeItem(product.name);
        await cartPage.verifyCartEmpty();
    });

    test('TC-CART-6 - Verify removing one of multiple products updates cart', async ({ inventoryPage, cartPage }) => {
        const product1 = products.backpack;
        const product2 = products.bikeLight;

        await inventoryPage.addProductToCart(product1.name);
        await inventoryPage.addProductToCart(product2.name);
        await inventoryPage.goToCart();
        await cartPage.verifyCartPageVisible();
        await cartPage.verifyCartItemCount(2);

        await cartPage.removeItem(product1.name);
        await cartPage.verifyCartItemCount(1);
        await cartPage.verifyCartItem(product2);
    });

    test('TC-CART-7 - Verify cart persists after navigating back to inventory', async ({ inventoryPage, cartPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.verifyCartBadgeCount(1);

        await inventoryPage.goToCart();
        await cartPage.verifyCartPageVisible();
        await cartPage.verifyCartItemCount(1);
        await cartPage.verifyCartItem(product);
    });
});