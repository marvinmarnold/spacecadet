Meteor.methods({
  'chargeCard': function(dockingId) {
    check(dockingId, String);
    var Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    var docking = Dockings.findOne(dockingId);
    var card = Cards.findOne(docking.chargeToCardId);

    console.log("charge");
    console.log(docking);
    console.log(card);

    // Charge tenant
    try {
      charge({
        amount: (docking.total * 100).toFixed(0),
        currency: 'usd',
        source: card.token
      });
        console.log("charged");
    } catch (error) {
      throw new Meteor.Error("stripe-charge-error", error.message);
    }
  }
});