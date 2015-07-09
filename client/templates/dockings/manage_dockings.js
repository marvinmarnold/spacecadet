Template.manageDockings.events({
  'click .landlord-approve-docking': function(e) {
    Meteor.call('dockingLandlordApprove', this._id, function(error, result) {
      if (error)
        return alert(error.reason);
    });
  },
  'click .landlord-reject-docking': function(e) {
    Meteor.call('dockingLandlordReject', this._id, function(error, result) {
      if (error)
        return alert(error.reason);
    });
  },
});

Template.manageDockings.helpers({
  hasDockingsAwaitingLandlordApproval: function() {
    return this.dockingsAwaitingLandlordApproval.count() > 0
  },
  hasDockingsUpcoming: function() {
    return this.dockingsUpcoming.count() > 0
  },
});