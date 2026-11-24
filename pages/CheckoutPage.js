const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        // Step One: Your Information
        this.checkoutInfoContainer = page.getByTestId('checkout-info-container');
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.cancelButton = page.getByTestId('cancel');
        this.continueButton = page.getByTestId('continue');

        // Step Two: Overview
        this.checkoutSummaryContainer = page.getByTestId('checkout-summary-container');
        this.cartList = page.getByTestId('cart-list');
        this.cartItems = page.getByTestId('inventory-item');
        this.cartItemNames = page.getByTestId('inventory-item-name');
        this.cartItemPrices = page.getByTestId('inventory-item-price');
        this.cartItemQuantities = page.getByTestId('item-quantity');
        this.cartItemDescriptions = page.getByTestId('inventory-item-desc');

        this.paymentInfoLabel = page.getByTestId('payment-info-label');
        this.paymentInfoValue = page.getByTestId('payment-info-value');
        this.shippingInfoLabel = page.getByTestId('shipping-info-label');
        this.shippingInfoValue = page.getByTestId('shipping-info-value');

        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');

        this.finishButton = page.getByTestId('finish');

        // Complete
        this.checkoutCompleteContainer = page.getByTestId('checkout-complete-container');
        this.completeHeader = page.getByTestId('complete-header');
        this.completeText = page.getByTestId('complete-text');
        this.backToProductsButton = page.getByTestId('back-to-products');
        this.generatePdfButton = page.getByTestId('generate-pdf-order');
    }

    // Step One methods
    async verifyStepOneVisible() {
        await expect(this.page).toHaveURL(/.*checkout-step-one\.html$/);
        await expect(this.page.getByTestId('title')).toHaveText('Checkout: Your Information');
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.postalCodeInput).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
        await expect(this.continueButton).toBeVisible();
    }

    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    // Step Two methods
    async verifyStepTwoVisible() {
        await expect(this.page).toHaveURL(/.*checkout-step-two\.html$/);
        await expect(this.page.getByTestId('title')).toHaveText('Checkout: Overview');
        await expect(this.checkoutSummaryContainer).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
        await expect(this.finishButton).toBeVisible();
    }

    async verifyCheckoutItemsCount(count) {
        await expect(this.cartItems).toHaveCount(count);
    }

    async verifyCheckoutItem(product) {
        const item = this.cartItems.filter({ hasText: product.name });
        await expect(item).toBeVisible();
        await expect(item.getByTestId('inventory-item-name')).toHaveText(product.name);
        await expect(item.getByTestId('inventory-item-price')).toHaveText(`$${product.price.toFixed(2)}`);
        await expect(item.getByTestId('item-quantity')).toHaveText('1');
    }

    async verifyPaymentInfo(paymentMethod = 'SauceCard #31337') {
        await expect(this.paymentInfoLabel).toHaveText('Payment Information:');
        await expect(this.paymentInfoValue).toHaveText(paymentMethod);
    }

    async verifyShippingInfo(shippingMethod = 'Free Pony Express Delivery!') {
        await expect(this.shippingInfoLabel).toHaveText('Shipping Information:');
        await expect(this.shippingInfoValue).toHaveText(shippingMethod);
    }

    async verifySubtotal(expectedSubtotal) {
        await expect(this.subtotalLabel).toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`);
    }

    async verifyTax(expectedTax) {
        await expect(this.taxLabel).toHaveText(`Tax: $${expectedTax.toFixed(2)}`);
    }

    async verifyTotal(expectedTotal) {
        await expect(this.totalLabel).toHaveText(`Total: $${expectedTotal.toFixed(2)}`);
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    // Complete methods
    async verifyCompleteVisible() {
        await expect(this.page).toHaveURL(/.*checkout-complete\.html$/);
        await expect(this.page.getByTestId('title')).toHaveText('Checkout: Complete!');
        await expect(this.checkoutCompleteContainer).toBeVisible();
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
        await expect(this.completeText).toBeVisible();
        await expect(this.backToProductsButton).toBeVisible();
        await expect(this.generatePdfButton).toBeVisible();
    }

    async clickBackToProducts() {
        await this.backToProductsButton.click();
    }
}

module.exports = { CheckoutPage };