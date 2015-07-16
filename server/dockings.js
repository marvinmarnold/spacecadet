Meteor.methods({
  'chargeCard': function(dockingId) {
    console.log("chargeCard");
    check(dockingId, String);
    var Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    var docking = Dockings.findOne(dockingId);
    if(managesDocking(docking) && isAwaitingPayment(docking)) {
      console.log("chargeCard is manager");
      var card = Cards.findOne(docking.chargeToCardId);

      // Charge tenant
      try {
        charge({
          amount: (docking.total * 100).toFixed(0),
          currency: 'usd',
          source: card.token
        });
        console.log("chargeCard finished");
      } catch (error) {
        throw new Meteor.Error("stripe-charge-error", error.message);
      }
    }
  },
  'creditLandlord': function(dockingId) {
    console.log("creditLandlord");
    check(dockingId, String);
    var docking = Dockings.findOne(dockingId);

    if(managesDocking(docking) && isAwaitingPayment(docking)) {
      // if(managesDocking(docking)) {
      console.log("creditLandlord is manager");

      Stripe = StripeAPI(Meteor.settings.stripe_sk);

      var landlord = Meteor.users.findOne(docking.landlordId);
      var bank = Banks.findOne({userId: docking.landlordId, isDefault: true});

      var externalAccount = {
        "country": "US",
        "currency": "USD",
        "account_number": bank.accountNumber,
        "routing_number": bank.routingNumber,
      }

      console.log("creditLandlord is setup");
      Stripe.bankAccount.createToken(externalAccount, function(err, b) {
        if (err) throw new Meteor.Error("stripe-charge-error-bank", err);
        console.log("creditLandlord set stuff");
        var recipient = Stripe.recipients.create({
          name: "TODO REALLY",
          type: "individual",
          email: landlord.id[0].address,
          bank_account: b.token
        }, function(err, recipient) {
          if (err) throw new Meteor.Error("stripe-charge-error-recipient", err);
          console.log("creditLandlord recipient");
          var transfer = Stripe.transfers.create({
            amount: (docking.landlordCut * 100).toFixed(0),
            currency: "usd",
            recipient: recipient.id,
            bank_account: bank.token,
            statement_descriptor: "JULY SALES"
          }, function(err, transfer) {
            if (err) throw new Meteor.Error("stripe-charge-error-transfer", err);
            console.log("creditLandlord is manager");
          });
        });
      });
    }
  }
});