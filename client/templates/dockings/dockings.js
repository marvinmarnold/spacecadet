Template.dockings.helpers({
  hasDockings: function() {
    return this.dockings.count() > 0;
  }
});