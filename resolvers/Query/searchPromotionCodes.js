const R = require('ramda')

module.exports = async (_, { input: { first = 10, after } = {} } = {}, { stripe, user }) => {
  if (!R.pathEq(['email'], 'jcuffney@fromtheforest.io', user)) throw Error('Not athorized to view promotion codes')

  if (first > 100) throw Error('first must be less than 100')

  // we can't pass `starting_after: null` as it causes an error - so we conditionally add it
  const params = after ? { limit: first, starting_after: after } : { limit: first }

  const { hasNextPage, edges } = await stripe.promotionCodes.list(params)
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
