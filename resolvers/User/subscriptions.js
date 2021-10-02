const R = require('ramda')

module.exports = async (_, { input: { first = 10, after } = {} } = {}, { stripe, user }) => {
  const customerId = R.path(['customerId'], user)

  if (!customerId) throw Error('customerId is missing on user')
  // if (first > 100) throw Error('first must be less than 100')

  // we can't pass `starting_after: null` as it causes an error - so we conditionally add it
  const params = after
    ? { customer: customerId, limit: first, starting_after: after }
    : { customer: customerId, limit: first }

  const { hasNextPage, edges } = await stripe.subscriptions.list(params)
    .then(response => ({
      hasNextPage: R.pathOr(false, ['has_more'], response),
      edges: R.map((node) => ({
        cursor: R.path(['id'], node),
        node
      }), R.pathOr([], ['data'], response))
    }))

  return {
    pageInfo: {
      hasNextPage,
      hasPreviousPage: !!after,
      startCursor: R.prop('cursor', R.head(edges)),
      endCursor: R.prop('cursor', R.last(edges))
    },
    edges
  }
}
