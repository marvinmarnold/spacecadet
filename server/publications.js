Meteor.publish("managedStations", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Stations.find({userId: this.userId})
    ];
  }
  this.ready();
});

Meteor.publish("currentUser", function() {
  return Meteor.users.find(this.userId);
});

Meteor.publish("allStations", function() {
  return Stations.find({});
});

Meteor.publish('singleStation', function(id) {
  check(id, String);
  return Stations.find(id);
});

Meteor.publish('singlePad', function(id) {
  check(id, String);
  return Pads.find(id);
});

Meteor.publish('padsForStation', function(stationId) {
  check(stationId, String);
  return Pads.find({stationId: stationId});
});

// Publish the conversations for which the current_user is the tenant
// All conversations are exclusively between tenants and landlords
Meteor.publish('tenantConversations', function(limit) {
  var sub = this, messageHandles = [], conversationHandle = null;

  function conversationMessages(conversationId) {
    var messagesCursor = Messages.find({conversationId: conversationId});
    messageHandles[conversationId] =
      Mongo.Collection._publishCursor(messagesCursor, sub, 'messages');
  }

  conversationHandle = Conversations.find({ tenantId: this.userId }).observeChanges({
    added: function(id, conversation) {
      conversationMessages(id);
      sub.added('conversations', id, conversation);
    },
    changed: function(id, fields) {
      sub.changed('conversations', id, fields);
    },
    removed: function(id) {
      // stop observing changes on the post's comments
      messageHandles[id] && messageHandles[id].stop();
      // delete the post
      sub.removed('conversations', id);
    }
  });

  sub.ready();

  // make sure we clean everything up (note `_publishCursor`
  //   does this for us with the comment observers)
  sub.onStop(function() { conversationHandle.stop(); });
});

// Publish the conversations for which the current_user is the landlord
// All conversations are exclusively between tenants and landlords
Meteor.publish('landlordConversations', function(limit) {
  var sub = this, messageHandles = [], conversationHandle = null;

  function conversationMessages(conversationId) {
    var messagesCursor = Messages.find({conversationId: conversationId});
    messageHandles[conversationId] =
      Mongo.Collection._publishCursor(messagesCursor, sub, 'messages');
  }

  conversationHandle = Conversations.find({ landlordId: this.userId }).observeChanges({
    added: function(id, conversation) {
      conversationMessages(id);
      sub.added('conversations', id, conversation);
    },
    changed: function(id, fields) {
      sub.changed('conversations', id, fields);
    },
    removed: function(id) {
      // stop observing changes on the post's comments
      messageHandles[id] && messageHandles[id].stop();
      // delete the post
      sub.removed('conversations', id);
    }
  });

  sub.ready();

  // make sure we clean everything up (note `_publishCursor`
  //   does this for us with the comment observers)
  sub.onStop(function() { conversationHandle.stop(); });
});

Meteor.publish("dockingsForUser", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Dockings.find({ userId: this.userId })
    ];
  }
  this.ready();
});

Meteor.publish("singleRecipient", function (recipientId) {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Recipients.find({ userId: this.userId, _id: recipientId })
    ];
  }
  this.ready();
});

Meteor.publish("dockingsForLandlord", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Dockings.find({ landlordId: this.userId })
    ];
  }
  this.ready();
});

Meteor.publish("dockingForUser", function (dockingId) {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [ Dockings.find({$or: [
        {isGuest: false, _id: dockingId, userId: this.userId},
        {_id: dockingId, isGuest: true}
      ]})
    ];
  } else {
    return [ Dockings.find({$and: [
        {_id: dockingId },
        { isGuest: true }
      ]})
    ];
  }
  this.ready();
});

Meteor.publish("banksForUser", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Banks.find({userId:this.userId})
    ];
  }
  this.ready();
});

Meteor.publish("recipientsForUser", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Recipients.find({userId:this.userId})
    ];
  }
  this.ready();
});