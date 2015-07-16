managesDocking = function(docking) {
  return docking && Meteor.userId() === docking.landlordId;
}

managesAccount = function(account) {
  return account && Meteor.userId() === account.userId;
}