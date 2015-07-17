Template.docking.helpers({
  isStateAwaitingLandlordApproval: function() {
    return this.state === Dockings.state_awaiting_landlord_approval;
  },
  isStateLandlordApprovalRejected: function() {
    return this.state === Dockings.state_landlord_approval_rejected;
  },
  isStateApproved: function() {
    return this.state === Dockings.state_awaiting_payment ||
    this.state === Dockings.state_payments_settled;
  },
  reservationNumber: function() {
    return this._id.toUpperCase();
  },
  subtotal: function() {
    return this.landlordCut + this.connectionFee;
  }
});

var daysBetween = function (start, end) {
  return moment(end).diff(moment(start), 'days') + 1;
}