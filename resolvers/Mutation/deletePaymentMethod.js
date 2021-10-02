const R = require('ramda')

module.exports = async (_, { input: { paymentMethodId } = {} } = {}, { stripe, user }) => {
  const customerId = R.path(['customerId'], user)

  if (!customerId) throw Error('customerId is missing on user')

  const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId)

  return paymentMethod
}
