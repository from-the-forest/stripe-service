const stripe = require('stripe');

const {
    NODE_ENV = 'dev',
    STRIPE_SECRET_KEY,
} = process.env;

module.exports = () => {
    return {
        env: NODE_ENV,
        stripe: stripe(STRIPE_SECRET_KEY),
    };
};
