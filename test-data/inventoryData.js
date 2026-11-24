/** @type {{name: string, value: 'az' | 'za' | 'lohi' | 'hilo'}[]} */

const sortScenarios = [
    {
        name: 'Name (A to Z)',
        value: 'az'
    },
    {
        name: 'Name (Z to A)',
        value: 'za'
    },
    {
        name: 'Price (low to high)',
        value: 'lohi'
    },
    {
        name: 'Price (high to low)',
        value: 'hilo'
    },
];

module.exports = { sortScenarios };