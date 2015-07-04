Template.station.helpers({
  notAddingLandingPad: function() {
    return isOwner(Meteor.userId(), this.station.userId) && !Session.get('addingLandingPad');
  },
  addingLandingPad: function() {
    return isOwner(Meteor.userId(), this.station.userId) && Session.get('addingLandingPad');
  },
  isDockingPeriodSet: function() {
    return Session.get('startDockingOn') && Session.get('endDockingOn');
  },
  startDockingOn: function() {
    return Session.get('startDockingOn');
  },
  endDockingOn: function() {
    return Session.get('endDockingOn');
  },
  dockingPeriod: function() {
    return moment(Session.get('endDockingOn')).diff(moment(Session.get('startDockingOn')), 'days') + " days";
  }
});

Template.station.events({
  'click #addPadButton': function(e) {
    Session.set('addingLandingPad', true);
  },
  'click #cancelPadButton': function(e) {
    Session.set('addingLandingPad', false);
  },
  'change #startDockingOn': function(e) {
    var startDockingOn = $(e.target).first().val();
    Session.setPersistent('startDockingOn', new Date(startDockingOn));
  },
  'change #endDockingOn': function(e) {
    var endDockingOn = $(e.target).first().val();
    Session.setPersistent('endDockingOn', new Date(endDockingOn));
  }
});

var isOwner = function(actualUserId, stationUserId) {
  return actualUserId && actualUserId == stationUserId;
}

Template.station.onRendered(function () {
  Session.set('addingLandingPad', false);
  $('#startDockingOn').datepicker();
  $('#endDockingOn').datepicker();
});