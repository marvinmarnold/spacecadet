managesDocking = function(docking) {
  return docking && Meteor.userId() === docking.landlordId;
}