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
    console.log("trying");
    console.log(recipient.userId + " " + Meteor.userId());
    if(managesAccount(recipient)) {
      console.log("manages");
      Recipients.update({isDefault: true}, {$set: {isDefault: false}}, {multi: true});
      Recipients.update(recipientId, {$set: {isDefault: true}});
    }
  }
});