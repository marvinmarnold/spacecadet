Template.docking.helpers({
  isStateAwaitingLandlordApproval: function() {
    console.log(this.state);
    return this.state === Dockings.state_awaiting_landlord_approval;
  },
  isStateLandlordApprovalRejected: function() {
    return this.state === Dockings.state_landlord_approval_rejected;
  },
  isStateAwaitingPayment: function() {
    return this.state === Dockings.state_awaiting_payment;
  },
});