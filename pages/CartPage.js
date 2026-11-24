const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.cartList = page.getByTestId('cart-list');
        this.cartItems = page.getByTestId('inventory-item');
        this.cartItemNames = page.getByTestId('inventory-item-name');
        this.cartItemPrices = page.getByTestId('inventory-item-price');
        this.cartItemQuantities = page.getByTestId('item-quantity');
        this.cartItemDescriptions = page.getByTestId('inventory-item-desc');

        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByTestId('checkout');

        this.removeButtons = page.getByRole('button', { name: 'Remove' });
    }

    async verifyCartPageVisible() {
        await expect(this.page).toHaveURL(/.*cart\.html$/);
        await expect(this.cartList).toBeVisible();
        await expect(this.continueShoppingButton).toBeVisible();
        await expect(this.checkoutButton).toBeVisible();
    }

    async verifyCartEmpty() {
        await expect(this.cartItems).toHaveCount(0);
    }

    async verifyCartItemCount(count) {
        await expect(this.cartItems).toHaveCount(count);
    }

    async verifyCartItem(product) {
        const item = this.cartItems.filter({ hasText: product.name });
        await expect(item).toBeVisible();
        await expect(item.getByTestId('inventory-item-name')).toHaveText(product.name);
        await expect(item.getByTestId('inventory-item-price')).toHaveText(`$${product.price.toFixed(2)}`);
        await expect(item.getByTestId('item-quantity')).toHaveText('1');
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async removeItem(productName) {
        const item = this.cartItems.filter({ hasText: productName });
        await item.getByRole('button', { name: 'Remove' }).click();
    }
}

module.exports = { CartPage };