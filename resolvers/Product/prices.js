const R = require('ramda')

module.exports = async ({ id: productId }, { input: { first = 10, after } = {} } = {}, { stripe }) => {
  if (first > 100) throw Error('first must be less than 100')

  // we can't pass `starting_after: null` as it causes an error - so we conditionally add it
  const params = after
    ? { limit: first, starting_after: after, active: true, product: productId }
    : { limit: first, active: true, product: productId }

  const { hasNextPage, edges } = await stripe.prices.list(params)
    .then(response => ({
      hasNextPage: R.pathOr(false, ['has_more'], response),
      edges: R.map((node) => ({
        cursor: R.path(['id'], node),
        node: {
          ...node,
          interval: R.path(['recurring', 'interval'], node),
          amount: R.path(['unit_amount'], node), // rename unit_amount -> amount
          formattedAmount: `$${(R.path(['unit_amount'], node) / 100).toFixed(2)}`
        }
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
