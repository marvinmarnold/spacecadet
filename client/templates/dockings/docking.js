Template.docking.helpers({
  isStateAwaitingLandlordApproval: function() {
    return this.state === Dockings.state_awaiting_landlord_approval;
  },
  isStateLandlordApprovalRejected: function() {
    return this.state === Dockings.state_landlord_approval_rejected;
  },
  isStateAwaitingPayment: function() {
    return this.state === Dockings.state_awaiting_payment;
  },
  reservationNumber: function() {
    return this._id.toUpperCase();
  },
  daysBetween: function() {
    return daysBetween(this.startDockingOn, this.endDockingOn);
  },
  subtotal: function() {
    return this.landlordCut + this.connectionFee;
  }
});

var daysBetween = function (start, end) {
  return moment(end).diff(moment(start), 'days') + 1;
}