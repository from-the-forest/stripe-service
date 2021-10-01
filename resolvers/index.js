module.exports = {
    User: {
        subscription: require('./User/subscription'),
    },
    Query: {
        plans: require('./Query/plans'),
        searchPromotionCodes: require('./Query/searchPromotionCodes'),
    },
};
