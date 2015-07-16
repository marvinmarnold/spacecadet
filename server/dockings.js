Meteor.methods({
  'chargeCard': function(dockingId) {
    check(dockingId, String);
    var Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    var docking = Dockings.findOne(dockingId);
    if(managesDocking(docking) && isAwaitingPayment(docking)) {
      var card = Cards.findOne(docking.chargeToCardId);

      // Charge tenant
      try {
        charge({
          amount: (docking.total * 100).toFixed(0),
          currency: 'usd',
          source: card.token
        });
      } catch (error) {
        throw new Meteor.Error("stripe-charge-error", error.message);
      }
    }
  },
  'creditLandlord': function(dockingId) {
    check(dockingId, String);
    var docking = Dockings.findOne(dockingId);

    if(managesDocking(docking) && isAwaitingPayment(docking)) {
      Stripe = StripeAPI(Meteor.settings.stripe_sk);

      var landlord = Meteor.users.findOne(docking.landlordId);
      var recipient = Recipients.findOne({userId: docking.landlordId, isDefault: true});

      var transfer = Stripe.transfers.create({
        amount: (docking.landlordCut * 100).toFixed(0),
        currency: "usd",
        recipient: recipient.stripeId,
        statement_descriptor: "JULY SALES"
      }, function(err, transfer) {
        if (err) throw new Meteor.Error("stripe-charge-error-transfer", err);
      });

      Dockings.update(dockingId, {$set: {state: Dockings.state_payments_settled}});
    }
  }
});