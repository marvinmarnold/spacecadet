Template.station.helpers({
  notAddingLandingPad: function() {
    return isOwner(Meteor.userId(), this.station.userId) && !Session.get('addingLandingPad');
  },
  addingLandingPad: function() {
    return isOwner(Meteor.userId(), this.station.userId) && Session.get('addingLandingPad');
  },
});

Template.station.events({
  'click #addPadButton': function(e) {
    Session.set('addingLandingPad', true);
  },
  'click #cancelPadButton': function(e) {
    Session.set('addingLandingPad', false);
  },
});

var isOwner = function(actualUserId, stationUserId) {
  return actualUserId && actualUserId == stationUserId;
}

Template.station.onRendered(function () {
  Session.set('addingLandingPad', false);
});