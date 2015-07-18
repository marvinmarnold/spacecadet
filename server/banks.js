Meteor.methods({
  'createBankAccount': function(token, externalAccountAttributes) {
    check(Meteor.userId(), String);
    check(externalAccountAttributes, {
      bankName: String,
      last4: String,
      country: String,
      routingNumber: String,
      accountName: String,
      currency: String
    });

    Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var createExternalAccount = Meteor.wrapAsync(Stripe.accounts.createExternalAccount, Stripe.accounts);
    try {
      var result = createExternalAccount(
        Meteor.settings.stripe_account_id,
        {external_account: token
      });
      externalAccountAttributes.stripe_id = response.id;
    } catch (error) {
      // return finishWErrors(submitButton, "Could not create account");
    }

    var user = Meteor.user();
    var firstBank = false;
    if ( Banks.find({userId: Meteor.userId()}).count() === 0 ) firstBank = true;

    var bank = _.extend(externalAccountAttributes, {
      userId: user._id,
      isDefault: firstBank,
      createdAt: new Date()
    });

    var bankId = Banks.insert(bank);

    return {
      _id: bankId
    };
  }
});