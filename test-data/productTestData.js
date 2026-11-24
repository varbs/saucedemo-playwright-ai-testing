const products = {
    backpack: {
        name: 'Sauce Labs Backpack',
        price: 29.99
    },
    bikeLight: {
        name: 'Sauce Labs Bike Light',
        price: 9.99
    },
    boltShirt: {
        name: 'Sauce Labs Bolt T-Shirt',
        price: 15.99
    },
    fleece: {
        name: 'Sauce Labs Fleece Jacket',
        price: 49.99
    }
};

const productCount = Object.keys(products).length;

const productTestData = {
    productCount,
    cartBadgeProducts:
        [
            products.backpack.name,
            products.bikeLight.name,
            products.boltShirt.name
        ],
    singleProduct: products.backpack.name,
    allProductNames: Object.values(products).map(p => p.name),
};

const cartBadgeScenarios = [
    {
        description: 'one product',
        productNames: [products.backpack.name],
        expectedCount: 1
    },
    {
        description: 'two products',
        productNames: [products.backpack.name, products.bikeLight.name],
        expectedCount: 2
    },
    {
        description: 'all products',
        productNames: Object.values(products).map(p => p.name),
        expectedCount: productCount
    }
];

const cartBadgeRemoveScenarios = [
    {
        description: 'remove one product of two products',
        add: [products.backpack.name, products.bikeLight.name],
        remove: [products.backpack.name],
        expectedCount: 1
    },
    {
        description: 'remove two products of three products',
        add: [products.backpack.name, products.bikeLight.name, products.boltShirt.name],
        remove: [products.backpack.name, products.bikeLight.name],
        expectedCount: 1
    },
    {
        description: 'remove every product (badge disappears)',
        add: [products.backpack.name, products.bikeLight.name],
        remove: [products.backpack.name, products.bikeLight.name],
        expectedCount: 0
    }
];

module.exports = { products, productTestData, cartBadgeScenarios, cartBadgeRemoveScenarios }