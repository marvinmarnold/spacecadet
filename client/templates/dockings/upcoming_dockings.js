Template.upcomingDockings.helpers({
  hasDockingsUpcoming: function() {
    return this.dockingsUpcoming.count() > 0
  },
});
