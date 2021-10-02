module.exports = {
    Product: {
        prices: require('./Product/prices'),
    },
    User: {
        // TODO: fix this
        __resolveReference: () => ({ id: '1' }),
        charges: require('./User/charges'),
        subscriptions: require('./User/subscriptions'),
        paymentMethods: require('./User/paymentMethods')
    },
    Query: {
        searchProducts: require('./Query/searchProducts'),
        searchPromotionCodes: require('./Query/searchPromotionCodes'),
    },
    Mutation: {
        deletePaymentMethod: require('./Mutation/deletePaymentMethod'),
        subscribe: require('./Mutation/subscribe'),
        unsubscribe: require('./Mutation/unsubscribe')
    }
};
