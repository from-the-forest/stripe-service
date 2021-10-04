const R = require('ramda');
const getContext = require('../context');

module.exports = async (event) => {
  const { stripe } = getContext();

  // TODO: onUserCreated (create stripe customer)
  // TODO: onUserDeleted (soft delete)
};
