Accounts.onCreateUser(function(options, user) {
  var profile = {};

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);


  if (options.role) {
    profile.firstName = options.firstName;
    profile.lastName = options.lastName;
    profile.companyName = options.companyName;
  } else {
    profile.role = Accounts.role.tenant;
  }

  user.profile = profile;

  return user;
});