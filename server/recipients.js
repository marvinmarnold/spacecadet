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
      recipientAttributes.stripeType = result.type;
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
  'updateRecipient': function(recipientId, accountName, taxId) {
    check(recipientId, String);
    check(accountName, String);
    check(taxId, String);

    var user = Meteor.user();
    var userId = user._id;

    // Users can only update Recipients they created
    var recipient = Recipients.findOne({userId: userId, _id: recipientId});

    if(recipient) {
      // Tell Stripe about new Tax ID and Account Name
      Stripe = StripeAPI(Meteor.settings.stripe_sk);
      var updateRecipient = Meteor.wrapAsync(Stripe.recipients.update, Stripe.recipients);
      try {
        var result = updateRecipient(recipient.stripeId, {
          name: accountName,
          tax_id: taxId
        });

      // Update the Account Name of the Recipient stored in DB
      // don't save tax ID to DB
      Recipients.update({_id: recipientId}, {$set: {accountName: accountName}});

        return result.id;
      } catch (error) {
        throw new Meteor.Error("stripe-charge-error", error.message);
      }
    }
    return false;
  },
  'checkRecipient': function(recipientId) {
    // Ask Stripe if recipient is verified
    check(recipientId, String);
    recipient = Recipients.findOne(recipientId);
    if(managesAccount(recipient)) {
      Stripe = StripeAPI(Meteor.settings.stripe_sk);

      var retrieveRecipient = Meteor.wrapAsync(Stripe.recipients.retrieve, Stripe.recipients);
      try {
        var result = retrieveRecipient(recipient.stripeId);
        var verified = result.verified;
        Recipients.update(recipientId, {$set: {stripeVerified: result.verified}});
        return result.verified;
      } catch (error) {
        throw new Meteor.Error("stripe-charge-error", error.message);
      }
    }
    return true;
  }
});