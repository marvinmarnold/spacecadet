Banks = new Mongo.Collection('banks');

Meteor.methods({
  'createBankAccount': function(externalAccountAttributes) {
    check(Meteor.userId(), String);
    check(externalAccountAttributes, {
      token: String,
      bankName: String,
      last4: String,
      country: String,
      routingNumber: String,
      accountName: String,
      currency: String
    });

    var user = Meteor.user();
    var bank = _.extend(externalAccountAttributes, {
      userId: user._id,
      isDefault: false,
      createdAt: new Date()
    });

    var bankId = Banks.insert(bank);

    return {
      _id: bankId
    };
  }
});