const { test } = require('../fixtures/fixture');
const { credentials } = require('../test-data/credentials');
const { products } = require('../test-data/productTestData');

test.describe('Product Detail Page', () => {
    test.beforeEach(async ({ loginPage }) => {
        const { username, password } = credentials.standardUser;
        if (!username || !password) throw new Error('STANDARD_USER and PASSWORD must be set in .env');

        await loginPage.open();
        await loginPage.login(username, password);
    });

    test('TC-PRODUCT-1 - Verify user can navigate to product detail page by clicking product name', async ({ inventoryPage, productDetailPage }) => {
        const product = products.backpack;
        
        await inventoryPage.clickProductName(product.name);
        await productDetailPage.verifyProductDetailPageVisible(product.id);
        await productDetailPage.verifyProductDetails(product);
    });

    test('TC-PRODUCT-2 - Verify product detail page displays correct product information', async ({ inventoryPage, productDetailPage }) => {
        const product = products.bikeLight;
        
        await inventoryPage.clickProductName(product.name);
        await productDetailPage.verifyProductDetailPageVisible(product.id);
        await productDetailPage.verifyProductDetails(product);
    });

    test('TC-PRODUCT-3 - Verify user can navigate back to inventory page from product detail', async ({ inventoryPage, productDetailPage }) => {
        const product = products.boltShirt;
        
        await inventoryPage.clickProductName(product.name);
        await productDetailPage.verifyProductDetailPageVisible(product.id);
        
        await productDetailPage.clickBackToProducts();
        await inventoryPage.verifyInventoryPageVisible();
    });

    test('TC-PRODUCT-4 - Verify user can add product to cart from product detail page', async ({ inventoryPage, productDetailPage }) => {
        const product = products.fleece;
        
        await inventoryPage.clickProductName(product.name);
        await productDetailPage.verifyProductDetailPageVisible(product.id);
        
        await productDetailPage.addToCart();
        await inventoryPage.verifyCartBadgeCount(1);
    });

    test('TC-PRODUCT-5 - Verify product detail page shows Remove button when product already in cart', async ({ inventoryPage, productDetailPage }) => {
        const product = products.onesie;
        
        // First add to cart from inventory page
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.verifyCartBadgeCount(1);
        
        // Navigate to product detail
        await inventoryPage.clickProductName(product.name);
        await productDetailPage.verifyProductDetailPageVisible(product.id);
        
        // Verify Remove button is shown instead of Add to cart
        await productDetailPage.verifyRemoveButtonVisible();
    });

    test('TC-PRODUCT-6 - Verify user can remove product from cart on product detail page', async ({ inventoryPage, productDetailPage }) => {
        const product = products.redTshirt;

        // First add to cart from inventory page
        await inventoryPage.addProductToCart(product.name);
        await inventoryPage.verifyCartBadgeCount(1);

        // Navigate to product detail
        await inventoryPage.clickProductName(product.name);
        await productDetailPage.verifyProductDetailPageVisible(product.id);

        // Remove from cart on detail page
        await productDetailPage.removeFromCart();
        await inventoryPage.verifyCartBadgeCount(0);
    });
});