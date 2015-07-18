Meteor.methods({
  'createRecipient': function(bankToken, recipientAttributes) {
    check(Meteor.userId(), String);
    check(bankToken, String);
    check(recipientAttributes, {
      bankName: String,
      last4: String,
      country: String,
      routingNumber: String,
      accountName: String,
      currency: String
    });
    Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var createRecipient = Meteor.wrapAsync(Stripe.recipients.create, Stripe.recipients);
    try {
      var result = createRecipient({
        name: recipientAttributes.accountName,
        type: "individual",
        bank_account: bankToken,
        email: "marvinmarnold@gmail.com"
      });
      recipientAttributes.stripeId = result.id;
    } catch (error) {
      throw new Meteor.Error("stripe-charge-error", error.message);
    }

    var firstRecipient = false;
    if ( Recipients.find({userId: Meteor.userId()}).count() === 0 ) firstRecipient = true;

    var recipient = _.extend(recipientAttributes, {
      userId: Meteor.userId(),
      isDefault: firstRecipient,
      createdAt: new Date()
    });

    var recipientId = Recipients.insert(recipient);

    return {
      _id: recipientId
    };
  }
});