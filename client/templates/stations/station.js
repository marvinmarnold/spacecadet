Template.station.helpers({
  isDockingPeriodSet: function() {
    return Session.get('startDockingOn') && Session.get('endDockingOn');
  },
  startDockingOn: function() {
    return Session.get('startDockingOn');
  },
  endDockingOn: function() {
    return Session.get('endDockingOn');
  },
  daysBetween: function() {
    return moment(Session.get('endDockingOn')).diff(moment(Session.get('startDockingOn')), 'days') + 1;
  },

});

var daysBetween = function () {
  return moment(Session.get('endDockingOn')).diff(moment(Session.get('startDockingOn')), 'days') + 1;
};


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

Template.station.onRendered(function () {
  $('#startDockingOn').datepicker();
  $('#endDockingOn').datepicker();
});