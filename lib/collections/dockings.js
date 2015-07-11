Dockings = new Mongo.Collection('dockings');
Dockings.state_awaiting_landlord_approval = "state_awaiting_landlord_approval";
Dockings.state_landlord_approval_rejected = "state_landlord_approval_rejected";
Dockings.state_awaiting_payment = "state_awaiting_payment";

Meteor.methods({
  dockingLandlordApprove: function(dockingId) {
    check(Meteor.userId(), String);
    check(dockingId, String);

    Dockings.update(dockingId,
      {$set: {state: Dockings.state_awaiting_payment}}, function(error) {
      if (error) {
        return error;
      } else {
        Meteor.call('sendTenantApprovalEmail', Meteor.user().emails[0].address);
        return true;
      }
    });
  },
  dockingLandlordReject: function(dockingId) {
    check(Meteor.userId(), String);
    check(dockingId, String);

    Dockings.update(dockingId,
      {$set: {state: Dockings.state_landlord_approval_rejected}}, function(error) {
      if (error) {
        return error;
      } else {
        Meteor.call('sendTenantRejectedEmail', Meteor.user().emails[0].address);
        return true;
      }
    });
  },
});