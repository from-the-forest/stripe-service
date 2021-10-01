const stripe = require('stripe');

const {
    NODE_ENV = 'dev',
    STRIPE_API_KEY,
} = process.env;

module.exports = () => {
    return {
        env: NODE_ENV,
        stripe: stripe(STRIPE_API_KEY),
        // get the user from upstream (authorizer)
        // null if this is a public request 
        user: null,
    };
};
