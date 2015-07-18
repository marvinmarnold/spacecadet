Accounts.role = {};
Accounts.role.tenant = "tenant";
Accounts.role.landlord = "landlord";
Accounts.role.admin = "admin";

isTenant = function() {
  return isRole(Accounts.role.tenant);
}

isLandlord = function() {
  return isRole(Accounts.role.landlord);
}

isAdmin = function() {
  return isRole(Accounts.role.admin);
}

var isRole = function(role) {
  return Meteor.user() && (
    Meteor.user().profile.role === role ||
    Meteor.user().profile.role === Accounts.role.admin);
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
      companyName: Match.Optional(String)
    });

    return Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: user.companyName,
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

  Template.registerHelper("isAdmin", function () {
    return isAdmin();
  });

  Template.registerHelper("loggedIn", function () {
    return loggedIn();
  });

  Accounts.ui.config({
  extraSignupFields: [{
      fieldName: 'firstName',
      fieldLabel: 'First name',
      inputType: 'text',
      visible: true,
      validate: function(value, errorFunction) {
        if (!value) {
          errorFunction("Please write your first name");
          return false;
        } else {
          return true;
        }
      }
  }, {
      fieldName: 'lastName',
      fieldLabel: 'Last name',
      inputType: 'text',
      visible: true,
  },{
      fieldName: 'company',
      fieldLabel: 'Company',
      inputType: 'text',
      visible: true,
  }, {
      fieldName: 'terms',
      fieldLabel: 'I accept the terms and conditions',
      inputType: 'checkbox',
      visible: true,
      saveToProfile: false,
      validate: function(value, errorFunction) {
          if (value) {
              return true;
          } else {
              errorFunction('You must accept the terms and conditions.');
              return false;
          }
      }
  }]
});
}

