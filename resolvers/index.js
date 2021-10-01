module.exports = {
    User: {
        subscription: require('./User/subscription'),
    },
    Query: {
        plans: require('./Query/plans'),
        promoCodes: require('./Query/promoCodes'),
    },
};
