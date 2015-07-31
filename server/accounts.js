Accounts.onCreateUser(function(options, user) {
  var profile = {};

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);


  if (options.profile && options.profile.role) {
    profile = options.profile;
  } else {
    profile.role = Accounts.role.tenant;
  }

  user.profile = profile;

  return user;
});

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