Template.inbox.helpers({
  messages: function() {
    return Messages({conversationId: this._id});
  },
});