Accounts.role_tenant = "tenant";
Accounts.role_landlord = "landlord";
Accounts.role_admin = "admin";

isTenant = function() {
  return isRole(Accounts.role_tenant);
}

isLandlord = function() {
  return isRole(Accounts.role_landlord);
}

isAdmin = function() {
  return isRole(Accounts.role_admin);
}

var isRole = function(role) {
  return Meteor.userId() && Meteor.user().role === role;
}

isGuest = function() {
  return !Meteor.userId();
}

////////////////////////////////////////////////////////////////////////////////
// Client helpers
////////////////////////////////////////////////////////////////////////////////
if (Meteor.isClient) {
  Template.registerHelper("isTenant", function () {
    return isTenant();
  });

  Template.registerHelper("isLandlord", function () {
    return isLandlord();
  });

  Template.registerHelper("isAdmin", function () {
    return isAdmin();
  });

  Template.registerHelper("isGuest", function () {
    return isGuest();
  });
}
