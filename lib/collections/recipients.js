Recipients = new Mongo.Collection('recipients');

// Recipients.allow({
//   update: function(userId, recipient) {
//     return managesAccount(userId, recipient, ['isDefault']);
//   }
// })

Meteor.methods({
  'updateDefaultAccount': function(recipientId) {
    check(recipientId, String);
    recipient = Recipients.findOne(recipientId);
    if(managesAccount(recipient)) {
      Recipients.update({isDefault: true}, {$set: {isDefault: false}}, {multi: true});
      Recipients.update(recipientId, {$set: {isDefault: true}});
    }
  }
});

hasDefaultRecipient = function() {
  return Meteor.user() &&
    Recipients.findOne({userId: Meteor.userId(), isDefault: true});
}

if (Meteor.isClient) {
  Template.registerHelper("hasDefaultRecipient", function () {
    return hasDefaultRecipient();
  });
}