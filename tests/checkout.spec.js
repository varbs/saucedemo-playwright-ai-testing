// @ts-check
const { test, expect } = require('../fixtures/fixture');
const { credentials } = require('../test-data/credentials');
const { products } = require('../test-data/productTestData');

test.describe('Checkout Page', () => {
    test.beforeEach(async ({ loginPage }) => {
        const { username, password } = credentials.standardUser;
        if (!username || !password) throw new Error('STANDARD_USER and PASSWORD must be set in .env');

        await loginPage.open();
        await loginPage.login(username, password);
    });

    test('TC-CHECKOUT-1 - Verify checkout step one page is displayed', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.verifyCartPageVisible();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();
    });

    test('TC-CHECKOUT-2 - Verify error when first name is empty', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();

        await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
        await checkoutPage.clickContinue();

        await expect(checkoutPage.page.getByTestId('error')).toBeVisible();
        await expect(checkoutPage.page.getByTestId('error')).toHaveText('Error: First Name is required');
    });

    test('TC-CHECKOUT-3 - Verify error when last name is empty', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();

        await checkoutPage.fillCheckoutInfo('John', '', '12345');
        await checkoutPage.clickContinue();

        await expect(checkoutPage.page.getByTestId('error')).toBeVisible();
        await expect(checkoutPage.page.getByTestId('error')).toHaveText('Error: Last Name is required');
    });

    test('TC-CHECKOUT-4 - Verify error when postal code is empty', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();

        await checkoutPage.fillCheckoutInfo('John', 'Doe', '');
        await checkoutPage.clickContinue();

        await expect(checkoutPage.page.getByTestId('error')).toBeVisible();
        await expect(checkoutPage.page.getByTestId('error')).toHaveText('Error: Postal Code is required');
    });

    test('TC-CHECKOUT-5 - Verify checkout step two displays order summary', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();

        await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
        await checkoutPage.clickContinue();
        await checkoutPage.verifyStepTwoVisible();

        await checkoutPage.verifyCheckoutItemsCount(1);
        await checkoutPage.verifyCheckoutItem(product);
        await checkoutPage.verifyPaymentInfo();
        await checkoutPage.verifyShippingInfo();
        await checkoutPage.verifySubtotal(product.price);
        await checkoutPage.verifyTax(2.40); // 8% tax
        await checkoutPage.verifyTotal(product.price + 2.40);
    });

    test('TC-CHECKOUT-6 - Verify checkout step two with multiple products', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product1 = products.backpack;
        const product2 = products.bikeLight;

        await inventoryPage.addProductToCart(product1.name);
        await inventoryPage.addProductToCart(product2.name);
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();

        await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
        await checkoutPage.clickContinue();
        await checkoutPage.verifyStepTwoVisible();

        await checkoutPage.verifyCheckoutItemsCount(2);
        await checkoutPage.verifyCheckoutItem(product1);
        await checkoutPage.verifyCheckoutItem(product2);
        await checkoutPage.verifySubtotal(product1.price + product2.price);
        const expectedTax = (product1.price + product2.price) * 0.08;
        await checkoutPage.verifyTax(expectedTax);
        await checkoutPage.verifyTotal(product1.price + product2.price + expectedTax);
    });

    test('TC-CHECKOUT-7 - Verify complete checkout flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();

        await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
        await checkoutPage.clickContinue();
        await checkoutPage.verifyStepTwoVisible();

        await checkoutPage.clickFinish();
        await checkoutPage.verifyCompleteVisible();
    });

    test('TC-CHECKOUT-8 - Verify cancel button returns to cart page', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();

        await checkoutPage.clickCancel();
        await cartPage.verifyCartPageVisible();
        await cartPage.verifyCartItemCount(1);
    });

    test('TC-CHECKOUT-9 - Verify back to products button on complete page returns to inventory', async ({ inventoryPage, cartPage, checkoutPage }) => {
        const product = products.backpack;

        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.verifyStepOneVisible();

        await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
        await checkoutPage.clickContinue();
        await checkoutPage.verifyStepTwoVisible();

        await checkoutPage.clickFinish();
        await checkoutPage.verifyCompleteVisible();

        await checkoutPage.clickBackToProducts();
        await inventoryPage.verifyInventoryPageVisible();
        await inventoryPage.verifyCartBadgeCount(0);
    });
});