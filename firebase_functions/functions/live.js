const functions = require('firebase-functions');
const stripe = require('stripe')('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');

exports.payWithStripe = functions.https.onRequest((request, response) => {
  stripe.charges.create({
    amount: request.body.amount,
    currency: request.body.currency,
    source: request.body.token.tokenId,
    description: request.body.description,
    statement_descriptor: request.body.statement_descriptor,
  }).then((charge) => {
    // asynchronously called
    console.log('===== charge: ', charge);
    response.send(charge);
  })
    .catch(err => {
      console.log('===== err: ', err);
      response.send(error);
    });
});