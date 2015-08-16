Accounts.onCreateUser(function(options, user) {
  var profile = {};

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 4 * 1000);

  // Entry point for landlords
  if(options.profile) {
    profile = options.profile;
  } else { // Entry for Tenants, copy over values
    profile.firstName = options.firstName;
    profile.lastName = options.lastName;
    profile.entityName = options.entityName;
    profile.termsAccepted = options.termsAccepted;
  }

  // Make sure role is set and only `tenant` or `landlord`
  if(!canSetRole(profile))
    profile.role = Accounts.role.tenant;

  user.profile = profile;

  console.log("creating " + profile);
  return user;
});

// Is the role defined and set to tenant or landlord
// Other roles need special privileges to set
var canSetRole = function(profile) {
  profile &&
  profile.role &&
  (profile.role === Accounts.role.tenant || profile.role === Accounts.role.landlord)
}

Meteor.startup(function() {
  Accounts.emailTemplates.siteName = "SpaceCadet";
  Accounts.emailTemplates.from = "SpaceCadet <hello@spacecadet.io>";
});

Meteor.methods({
  'updateProfile': function(profile) {
    check(profile, {
      firstName: String,
      lastName: String,
      entityName: String,
      phoneNumber: String
    });

    profile.role = Meteor.user().profile.role;
    return Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}});
  }
});