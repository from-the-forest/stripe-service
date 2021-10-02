const R = require('ramda')

module.exports = async (_, { input: { subscriptionId } = {} } = {}, { stripe, user }) => {
  const customerId = R.path(['customerId'], user)

  if (!customerId) throw Error('customerId is missing on user')

  const deletedSubscription = await stripe.subscriptions.del(subscriptionId)

  return deletedSubscription
}
