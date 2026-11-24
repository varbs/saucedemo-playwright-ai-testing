const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.productTitle = page.getByTestId('title');
        this.inventoryList = page.getByTestId('inventory-list');
        this.inventoryItems = page.getByTestId('inventory-item');

        this.productNames = page.getByTestId('inventory-item-name');
        this.productPrices = page.getByTestId('inventory-item-price');

        this.menuButton = page.getByRole('button', { name: /Open Menu/i })
        this.logoutButton = page.getByTestId('logout-sidebar-link');

        this.sortDropdown = page.getByTestId('product-sort-container');

        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    async openMenu() {
        await this.menuButton.click();
    }

    /**
     *
     * @param {'az' | 'za' | 'lohi' | 'hilo'} sortOption
     */

    async sortProducts(sortOption) {
        await this.sortDropdown.selectOption(sortOption);
    }

    addToCartButton(productName) {
        return this.inventoryItems
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' });
    }

    removeButton(productName) {
        return this.inventoryItems
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Remove' })
    }

    async addProductToCart(productName) {
        await this.addToCartButton(productName).click();
    }

    async removeProductFromCart(productName) {
        await this.removeButton(productName).click();
    }

    async verifyInventoryPageVisible() {
        await expect(this.page).toHaveURL(/.*inventory\.html$/);
        await expect(this.productTitle).toHaveText('Products');
        await expect(this.inventoryList).toBeVisible();
    }

    async verifyProductsDisplayed() {
        await expect(this.inventoryItems).toHaveCount(6);
        await expect(this.productNames.first()).toBeVisible();
        await expect(this.productPrices.first()).toBeVisible();
    }

    async verifySortingDropdownVisible() {
        await expect(this.sortDropdown).toBeVisible();
    }

    /**
     *
     * @param {'az' | 'za' | 'lohi' | 'hilo'} sortOption
     */
    async verifySelectedSortOption(sortOption) {
        await expect(this.sortDropdown).toHaveValue(sortOption);
    }


    /**
     *
     * @param {'az' | 'za' | 'lohi' | 'hilo'} sortOption
     */
    async verifyProductsSorted(sortOption) {
        await expect(this.productNames).toHaveCount(6);

        if (sortOption === 'az' || sortOption === 'za') {

            // original array ex. ['Carrot', 'Apple', 'Banana']
            const actualNames = await this.productNames.allTextContents();

            //copied and sorted array ex.['Apple', 'Banana', 'Carrot']
            const expectedNames = [...actualNames].sort();

            // if sortOption is za, reverse the alphabetical order from the expectedNames
            // ex. ['Carrot', 'Banana', 'Apple']
            if (sortOption === 'za') {
                expectedNames.reverse();
            }

            expect(actualNames).toEqual(expectedNames);
        }

        if (sortOption === 'lohi' || sortOption === 'hilo') {
            const actualPriceText = await this.productPrices.allTextContents();


            const actualPrices = actualPriceText.map(price => Number(price.replace('$', '')));
            const expectedPrices = [...actualPrices].sort((a, b) => a - b);

            if (sortOption === 'hilo') {
                expectedPrices.reverse();
            }

            expect(actualPrices).toEqual(expectedPrices);
        }
    }

    // Assert
    async verifyCartBadgeCount(count) {
        if (count === 0) {
            await expect(this.cartBadge).toHaveCount(0);
        } else {
            await expect(this.cartBadge).toHaveText(String(count));
        }
    }

    async clickProductName(productName) {
        await this.inventoryItems
            .filter({ hasText: productName })
            .getByTestId('inventory-item-name')
            .click();
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async goToCart() {
        await this.cartLink.click();
    }
}

module.exports = { InventoryPage };