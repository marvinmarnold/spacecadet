Template.profile.helpers({
  profile: function() {
    return Meteor.user().profile;
  },
  firstName: function() {
    return Meteor.user() ? Meteor.user().profile.firstName : "";
  },
  lastName: function() {
    return Meteor.user() ? Meteor.user().profile.lastName : "";
  },
  email: function() {
    return Meteor.user() ? Meteor.user().emails[0].address : "";
  },
  phoneNumber: function() {
    return Meteor.user() ? Meteor.user().profile.phoneNumber : "";
  },
  entity: function() {
    return Meteor.user() ? Meteor.user().profile.entityName : "";
  }
});

Template.profile.events({
  'submit form': function(event, template){
    event.preventDefault();

    var submitButton = $(event.target).find('[id=submit-profile]');
    submitButton.prop("disabled", true);

    var firstName = $(event.target).find('[id=firstName]').val();
    var lastName = $(event.target).find('[id=lastName]').val();
    var phoneNumber = $(event.target).find('[id=phoneNumber]').val();
    var entityName = $(event.target).find('[id=entityName]').val();

    var profile = {
      firstName: firstName,
      lastName: lastName,
      entityName: entityName,
      phoneNumber: phoneNumber
    }

    Meteor.call('updateProfile', profile, function(e, r) {
      if(e)
        return finishWErrors(submitButton, "Sorry something went wrong. Please try again later.");
      return finishWSuccess(submitButton, "Profile updated.");
    });
  }
});