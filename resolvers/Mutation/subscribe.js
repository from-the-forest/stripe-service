const R = require('ramda')

module.exports = async (_, { input: { priceIds = [] } = {} } = {}, { stripe, user }) => {
  if (priceIds.length === 0) throw Error('you must provide at least one price id')

  const customerId = R.path(['customerId'], user)
  //  TODO: verify if customer has an active, default payment method

  if (!customerId) throw Error('customerId is missing on user')

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: R.map(priceId => ({
      price: priceId
    }), priceIds)
  })

  return subscription
}
