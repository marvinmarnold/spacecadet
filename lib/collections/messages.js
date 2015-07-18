Messages = new Mongo.Collection('messages');

Meteor.methods({
  sendMessage: function(messageAttributes) {
    check(Meteor.userId(), String);
    check(messageAttributes, {
      recipientId: String,
      content: String,
    });

    var user = Meteor.user();
    var message = _.extend(messageAttributes, {
      createdAt: new Date(),
      senderId: user._id
    });

    var messageId = Messages.insert(message);

    return {
      _id: messageId
    };
  },
});