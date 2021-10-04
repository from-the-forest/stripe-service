const R = require('ramda');
const getContext = require('../context');

module.exports = async (event) => {
  const { stripe } = getContext();

  // TODO: event handlers

  // TODO: onUserCreated (create stripe customer)
};
