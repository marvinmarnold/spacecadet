Template.editStation.helpers({
  notAddingLandingPad: function() {
    return isOwner(Meteor.userId(), this.station.userId) && !Session.get('addingLandingPad');
  },
  addingLandingPad: function() {
    return isOwner(Meteor.userId(), this.station.userId) && Session.get('addingLandingPad');
  },
});

var isOwner = function(actualUserId, stationUserId) {
  return actualUserId && actualUserId == stationUserId;
}

Template.station.onRendered(function () {
  Session.set('addingLandingPad', false);
});