Messages = new Mongo.Collection('messages');

Meteor.methods({
  sendMessage: function(messageAttributes) {
    check(Meteor.userId(), String);
    check(messageAttributes, {
      recipientId: String,
      content: String,
    });

    var userId = Meteor.userId();

    var convo = Conversations.findOne({tenantId: messageAttributes.recipientId, landlordId: userId});
    if(!convo) // Sender is not the landlord
      convo = Conversations.findOne({tenantId: userId, landlordId: messageAttributes.recipientId});

    if(!convo) {
      // Conversation must not exist. Assume tenants start all conversations.
      var convoId = Conversations.insert({
        tenantId: userId,
        landlordId: messageAttributes.recipientId,
      });
      convo = Conversations.findOne(convoId);
    }

    var convoId = convo._id;

    var message = _.extend(messageAttributes, {
      createdAt: new Date(),
      senderId: userId,
      conversationId: convoId
    });

    var messageId = Messages.insert(message);

    return {
      _id: messageId
    };
  },
});