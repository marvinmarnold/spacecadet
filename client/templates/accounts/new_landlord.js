Template.newLandlord.onCreated(function() {
  Session.set('newLandlordErrors', {});
});

Template.newLandlord.helpers({
  errorMessage: function(field) {
    return Session.get('newLandlordErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('newLandlordErrors')[field] ? 'has-error' : '';
  }
});

Template.newLandlord.events({
  'submit form': function(event, template){
    event.preventDefault();

    var submitButton = $(event.target).find('[id=submit-new-landlord]');
    submitButton.prop("disabled", true);

    var firstName = $(event.target).find('[id=firstName]').val();
    var lastName = $(event.target).find('[id=lastName]').val();
    var entityName = $(event.target).find('[id=entityName]').val();
    var email = $(event.target).find('[id=email]').val();
    var phoneNumber = $(event.target).find('[id=phoneNumber]').val();
    var password = $(event.target).find('[id=password]').val();

    Meteor.call('createLandlord', {
      firstName: firstName,
      lastName: lastName,
      entityName: entityName,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    }, function(e, userId) {
      if(e) {
        finishWErrors(submitButton, e.reason);
      }

      Meteor.loginWithPassword(email, password, function(e, r){
        if (e) {
          finishWErrors(submitButton, "Account created, but could not log you in");
        }
        Router.go("stations");
      });
    });
  }
});