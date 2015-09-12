Meteor.methods({
  'createRecipient': function(bankToken, recipientAttributes, taxId) {
    check(Meteor.userId(), String);
    check(bankToken, String);
    check(recipientAttributes, {
      bankName: String,
      last4: String,
      country: String,
      routingNumber: String,
      accountName: String,
      currency: String,
      recipientType: String
    });
    check(taxId, String);

    Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var createRecipient = Meteor.wrapAsync(Stripe.recipients.create, Stripe.recipients);
    try {
      var result = createRecipient({
        name: recipientAttributes.accountName,
        type: recipientAttributes.recipientType,
        bank_account: bankToken,
        tax_id: taxId
      });
      recipientAttributes.stripeId = result.id;
    } catch (error) {
      throw new Meteor.Error("stripe-charge-error", error.message);
    }

    var firstRecipient = false;
    if ( Recipients.find( { userId: Meteor.userId() } ).count() === 0 ) firstRecipient = true;

    var recipient = _.extend(recipientAttributes, {
      userId: Meteor.userId(),
      isDefault: firstRecipient,
      createdAt: new Date()
    });

    var recipientId = Recipients.insert(recipient);

    return {
      _id: recipientId
    };
  },
  // 'updateRecipient': function(recipientId, accountName, taxid) {
  //   check(recipientId, String);
  //   check(accountName, String);
  //   check(taxId, String);

  //   var user = Meteor.user();
  //   var userId = user._id;

  //   var recipient = Recipients.findOne({userId: userId, _id: recipientId});

  //   if(recipient) {
  //     Recipients.update({_id: recipientId}, {$set: {accountName: accountName, taxId, taxId}})
  //   }

  // }
});