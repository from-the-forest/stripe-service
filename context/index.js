const stripe = require('stripe')

const {
  NODE_ENV = 'dev',
  SECURITY = 'public',
  STRIPE_API_KEY
} = process.env

if (!STRIPE_API_KEY) throw Error('missing environment variable STRIPE_API_KEY')

module.exports = () => {
  return {
    env: NODE_ENV,
    security: SECURITY,
    stripe: stripe(STRIPE_API_KEY),
    // TODO: get the user from upstream (authorizer)
    // null if this is a public request
    // user: null
    user: {
      email: 'jcuffney@fromtheforest.io',
      customerId: 'cus_KKq7eOIdYTCQzY'
    }
  }
}
