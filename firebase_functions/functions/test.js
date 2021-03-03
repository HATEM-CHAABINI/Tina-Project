const functions = require('firebase-functions');
const stripeTest = require('stripe')('sk_test_51GyKxRDYa2At0VkdrTVVRlyoL3spwyQTov3zExvDPJUspvxKhfUwSVOKrDwNPv0uPgxm6tsmu6g9qS3yzGwnquBn00u5WTQZgQ');

exports.payWithStripe = functions.https.onRequest((request, response) => {
  console.log('===== stripeTest: ', stripeTest);
  stripeTest.charges.create({
    amount: request.body.amount,
    currency: request.body.currency,
    source: request.body.token.tokenId,
    description: request.body.description,
    statement_descriptor: request.body.statement_descriptor,
  }).then((charge) => {
    // asynchronously called
    console.log('===== charge: ', charge);
    response.send(charge);
  }).catch(err => {
    console.log('===== err: ', err);
    response.send(err);
  });
});