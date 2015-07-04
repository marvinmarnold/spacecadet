Template.newDocking.helpers({
  total: function() {
    return 100;
  },
  dockingStarts: function() {
    Session.get('startDockingOn');
  },
  dockingEnds: function() {
    Session.get('endDockingOn');
  },
  dockingPeriod: function() {
    "3 days"
  }
});