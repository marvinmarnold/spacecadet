Template.inbox.helpers({
  messages: function() {
    return Messages.find({conversationId: this._id});
  },
  otherUser: function() {
    var otherUser = {};
    if(isLandlord()) {
      console.log(this.tenantId);
      otherUser = Meteor.users.findOne(this.tenantId);
      console.log(otherUser._id);
    } else {
      otherUser = Meteor.users.findOne(this.landlordId);
    }

    return otherUser.emails[0].address;
  }
});