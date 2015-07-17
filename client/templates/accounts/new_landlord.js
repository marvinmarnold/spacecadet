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
    var companyName = $(event.target).find('[id=companyName]').val();
    var email = $(event.target).find('[id=email]').val();
    var password = $(event.target).find('[id=password]').val();

    Meteor.call('createLandlord', {
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      email: email,
      password: password
    }, function(e, userId) {
      if(e) {
        finishWErrors(submitButton, e.reason);
      }

      Meteor.loginWithPassword(email, password, function(e, r){
        if (e)
          alert("fail");
        Router.go("stations");
      });
    });
  }
});