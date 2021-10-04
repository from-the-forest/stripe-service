const R = require('ramda')

module.exports = async (_, {
  input: {
    lineItems,
    mode = 'subscription', // (payment|subscription|setup)
    successUrl = 'https://test.com/success',
    cancelUrl = 'https://test.com/success'
  } = {}
} = {}, { stripe }) => {
  // TODO: conditionally add success/cancel urls to params as they fail if undefined.
  const sessionId = await stripe.checkout.sessions.create({
    line_items: R.map(priceId => ({ price: priceId, quantity: 1 }), lineItems),
    mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ['card']
  }).then(R.path(['id']))

  return sessionId
}
