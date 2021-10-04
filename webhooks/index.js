const R = require('ramda');
const getContext = require('../context');

const { STRIPE_SIGNING_SECRET } = process.env;

module.exports = async (event) => {
  if (!STRIPE_SIGNING_SECRET) throw Error('missing environment variables');

  const { stripe } = getContext();

  const sig = R.path(['headers', 'Stripe-Signature'], event);
  const requestBody = R.path(['body'], event);

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(requestBody, sig, STRIPE_SIGNING_SECRET);
  } catch (err) {
    throw Error(`Webhook Error: ${err.message}`);
  }

  switch (stripeEvent.type) {
    case 'payment_intent.succeeded':
      // const paymentIntent = stripeEvent.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      // const paymentMethod = stripeEvent.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  // this is the required lambda proxy reponse shape
  // Stripe expects a resonse to ack receipt of the event.
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
