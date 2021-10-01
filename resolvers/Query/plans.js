const R = require('ramda');

module.exports = async (_, __, { stripe }) => {
    const plans = await stripe.plans.list({limit: 3})
        .then(R.pathOr([], ['data']))
        .then(R.map(promotionCode => ({
            code: R.prop('code', promotionCode),
            // there are a number of fields that we might want to return in this case.
        })));
    
    return [
        {
           id: 12, 
        },
    ];
};
