const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class ProductDetailPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
        this.productName = page.getByTestId('inventory-item-name');
        this.productDescription = page.getByTestId('inventory-item-desc');
        this.productPrice = page.getByTestId('inventory-item-price');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.removeButton = page.getByRole('button', { name: 'Remove' });
    }

    async verifyProductDetailPageVisible(productId) {
        await expect(this.page).toHaveURL(new RegExp(`.*inventory-item\\.html\\?id=${productId}$`));
        await expect(this.backToProductsButton).toBeVisible();
        await expect(this.productName).toBeVisible();
        await expect(this.productDescription).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        // Either Add to cart or Remove button should be visible
        await expect(this.addToCartButton.or(this.removeButton)).toBeVisible();
    }

    async verifyProductDetails(product) {
        await expect(this.productName).toHaveText(product.name);
        await expect(this.productPrice).toHaveText(`$${product.price.toFixed(2)}`);
    }

    async clickBackToProducts() {
        await this.backToProductsButton.click();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async removeFromCart() {
        await this.removeButton.click();
    }

    async verifyAddToCartButtonVisible() {
        await expect(this.addToCartButton).toBeVisible();
    }

    async verifyRemoveButtonVisible() {
        await expect(this.removeButton).toBeVisible();
    }
}

module.exports = { ProductDetailPage };