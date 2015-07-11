Template.editStation.helpers({
  notAddingLandingPad: function() {
    return isOwner(Meteor.userId(), this.station.userId) && !Session.get('addingLandingPad');
  },
  addingLandingPad: function() {
    return isOwner(Meteor.userId(), this.station.userId) && Session.get('addingLandingPad');
  },
  stationId: function() {
    return this.station._id;
  }
});

var isOwner = function(actualUserId, stationUserId) {
  return actualUserId && actualUserId == stationUserId;
}

Template.station.onRendered(function () {
  Session.set('addingLandingPad', false);
});

Template.editStation.events({
  'click #addPadButton': function(e) {
    Session.set('addingLandingPad', true);
  },
  'click #cancelPadButton': function(e) {
    Session.set('addingLandingPad', false);
  },
  'click .delete-pad-button': function(event) {
    event.preventDefault();
    Meteor.call('deletePad', this._id, function(error, result) {
      if (error)
        return alert(error.reason);
    });
  },
});
