Messages = new Mongo.Collection('messages');

Meteor.methods({
  sendMessage: function(messageAttributes) {
    check(Meteor.userId(), String);
    check(messageAttributes, {
      recipientId: String,
      content: String,
    });

    var user = Meteor.user();
    var userId = user._id;

    var convo = Conversations.findOne({tenantId: messageAttributes.recipientId, landlordId: userId});
    if(!convo) // Sender is not the landlord
      convo = Conversations.findOne({tenantId: userId, landlordId: messageAttributes.recipientId});

    if(!convo) {
      // Conversation must not exist. Assume tenants start all conversations.
      var landlordId = messageAttributes.recipientId;
      var landlord = Meteor.users.findOne(landlordId);

      var convoId = Conversations.insert({
        tenantId: userId,
        landlordId: landlordId,
        tenantName: user.profile.firstName + " " + user.profile.lastName,
        landlordName: landlord.profile.firstName + " " + landlord.profile.lastName
      });
      convo = Conversations.findOne(convoId);
    }

    Conversations.update(convo._id, {$set: {lastMessageAt: new Date()}});

    var convoId = convo._id;

    var message = _.extend(messageAttributes, {
      createdAt: new Date(),
      senderId: userId,
      conversationId: convoId,
    });

    var messageId = Messages.insert(message);

    return {
      _id: messageId
    };
  },
});