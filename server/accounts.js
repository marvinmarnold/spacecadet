Accounts.onCreateUser(function(options, user) {
  user.profile = {};

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);

  user.role = Accounts.role_tenant;
  if (options.profile)
    user.profile = options.profile;

  return user;
});