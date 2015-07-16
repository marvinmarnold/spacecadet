Template.dockingFinancialSummary.helpers({
  hasDockingsPaidOut: function() {
    return this.dockingsPaidOut.count() > 0
  },
});
