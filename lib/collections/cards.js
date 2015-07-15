Cards = new Mongo.Collection('cards');

Meteor.methods({
  'createCreditCard': function(cardAttributes) {
    check(Meteor.userId(), String);
    check(cardAttributes, {
      token: String,
      cardholder: String,
      last4: String,
      country: String,
      expMo: Number,
      expYr: Number,
      brand: String
    });

    var user = Meteor.user();
    var firstCard = false;
    if ( Cards.find({userId: Meteor.userId()}).count() === 0 ) firstCard = true;

    var card = _.extend(cardAttributes, {
      userId: user._id,
      isDefault: firstCard,
      createdAt: new Date(),
      isSingleUse: true,
    });

    var cardId = Cards.insert(card);

    return cardId;
  }
});

validateCreditCard = function (card) {
  var errors = {present: false};

  if (!card.cardholder) {
    errors.cardholder =  "Please provide the cardholder's name";
    present = true;
  }

  return errors;
}