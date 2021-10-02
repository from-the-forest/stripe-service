module.exports = {
    Product: {
        prices: require('./Product/prices'),
    },
    User: {
        __resolveReference: () => ({ id: '1' }),
        charges: require('./User/charges')
    },
    Query: {
        searchProducts: require('./Query/searchProducts'),
        searchPromotionCodes: require('./Query/searchPromotionCodes'),
    },
};
