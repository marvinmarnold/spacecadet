Accounts.role = {};
Accounts.role.tenant = "tenant";
Accounts.role.landlord = "landlord";
Accounts.role.admin = "admin";

isTenant = function() {
  return isRole(Accounts.role.tenant);
}

isExactlyTenant = function() {
  return isExactlyRole(Accounts.role.tenant);
}

isLandlord = function() {
  return isRole(Accounts.role.landlord);
}

isExactlyLandlord = function() {
  return isExactlyRole(Accounts.role.landlord);
}

isAdmin = function() {
  return isRole(Accounts.role.admin);
}

var isRole = function(role) {
  return Meteor.user() && (
    Meteor.user().profile.role === role ||
    Meteor.user().profile.role === Accounts.role.admin);
}

var isExactlyRole = function(role) {
  return Meteor.user() && (Meteor.user().profile.role === role);
}


loggedIn = function() {
  return Meteor.user();
}

Meteor.methods({
  createLandlord: function(user){
    check(user, {
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      phoneNumber: String,
      entityName: Match.Optional(String)
    });

    return Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        entityName: user.entityName,
        phoneNumber: user.phoneNumber,
        role: Accounts.role.landlord
      }
    });
  }
});

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

  Template.registerHelper("isExactlyTenant", function () {
    return isExactlyTenant();
  });

  Template.registerHelper("isExactlyLandlord", function () {
    return isExactlyLandlord();
  });

  Template.registerHelper("isAdmin", function () {
    return isAdmin();
  });

  Template.registerHelper("loggedIn", function () {
    return loggedIn();
  });
}

