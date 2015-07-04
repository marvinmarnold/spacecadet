Template.newDocking.helpers({
  total: function() {
    return 100;
  },
  startDockingOn: function() {
    return moment(Session.get('startDockingOn')).format('ddd, MMM D, YYYY');
  },
  endDockingOn: function() {
    return moment(Session.get('endDockingOn')).format('ddd, MMM D, YYYY');
  },
  dockingPeriod: function() {
    return moment(Session.get('endDockingOn')).diff(moment(Session.get('startDockingOn')), 'days') + " days";
  }
});