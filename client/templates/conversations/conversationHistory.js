Template.conversationHistory.helpers({
  messages: function() {
    return Messages.find({conversationId: this._id}, {sort: {createdAt: -1}});
  },
  otherUserId: function() {
    if(isLandlord()) {
      return this.tenantId;
    } else {
      return this.landlordId;
    }
  },
  otherUserName: function() {
    if(isLandlord()) {
      return this.tenantName;
    } else {
      return this.landlordName;
    }
  }
});