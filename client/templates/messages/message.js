Template.message.helpers({
  timeAgo: function() {
    return moment(this.createdAt).fromNow();
  },
  messageAlignmentClass: function() {
    if(this.senderId === Meteor.userId()) {
      return "col-md-7 col-md-offset-5 well well-sm message-sent";
    } else {
      return "col-md-7 well well-sm message-received";
    }
  },
  contentAlignmentClass: function() {
    if(this.senderId === Meteor.userId()) {
      return "text-right";
    } else {
      return "";
    }
  },
  timeAlignmentClass: function() {
    if(this.senderId === Meteor.userId()) {
      return "muted text-right";
    } else {
      return "muted";
    }
  }
})