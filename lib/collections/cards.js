Cards = new Mongo.Collection('cards');

Meteor.methods({
  'createCreditCard': function(cardAttributes) {
    check(cardAttributes, {
      token: String,
      cardholder: String,
      last4: String,
      country: String,
      expMo: Number,
      expYr: Number,
      brand: String
    });


    if(Meteor.userId()) {
      var user = Meteor.user();
      cardAttributes = _.extend(cardAttributes, {
        isGuest: false,
        userId: user._id
      });

      var firstCard = false;
      if ( Cards.find({userId: Meteor.userId()}).count() === 0 ) firstCard = true;
      cardAttributes.isDefault = firstCard;
    } else {
      cardAttributes = _.extend(cardAttributes, {
        isGuest: true
      });
      cardAttributes.isGuest = true;
    }


    var card = _.extend(cardAttributes, {
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
    errors.present = true;
  }

  return errors;
}