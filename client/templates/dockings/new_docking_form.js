Template.newDockingForm.events({
  'submit form': function(event, template){
    event.preventDefault();

    var submitButton = $(event.target).find('[id=submit-docking-button]');
    submitButton.prop("disabled", true);

    Stripe.card.createToken(getStripeCard(event), function(status, response) {
      if(response.error) {
        // Stripe didnt like the Credit Card
        return finishWFieldErrors(submitButton, response.error);
      } else {
        // Successfully tokenized to Stripe Credit Card
        // Validate against how card will be stored in actual DB
        var cardholder = $(event.target).find('[id=cardholder]').val();
        var storeableCard = getStoreableCard(response, cardholder);
        var errors = validateCreditCard(storeableCard);

        if (errors.present) return finishWDokcingFieldErrors(submitButton, errors);

        var docker = getDocker(event);
        var errors = validateDocker(docker);
        if (errors.present) return finishWFieldErrors("field", submitButton, errors);

        // All seems good, try to create card
        Meteor.call('createCreditCard',
          storeableCard,
          function(error, cardId) {
            if(error) {
              return finishWErrors(submitButton, "Sorry something went wrong. Please try again later.");
            } else {
              Meteor.call('createDocking',
                template.data.pad._id,
                new Date(getStartDockingOn()),
                new Date(getEndDockingOn()),
                docker,
                cardId,
                function(error, dockingId) {
                  if(error) {
                    return finishWErrors(submitButton, "Sorry something went wrong. Please try again later.");
                  } else {
                    Router.go('docking', {_id: dockingId});
                  }
              });
            }
        });
      }
    });
  },
});

Template.newDockingForm.onCreated(function() {
  Session.set('newDockingErrors', {});
});

Template.newDockingForm.helpers({
  errorMessage: function(field) {
    return Session.get('newDockingErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('newDockingErrors')[field] ? 'has-error' : '';
  },
  dockerName: function() {
    if(Meteor.user()) {
      var profile = Meteor.user().profile;
      return [profile.firstName, profile.lastName].join([separator = ' ']);
    }
    return "";
  },
  dockerEmail: function() {
    return Meteor.user() ? Meteor.user().emails[0].address : "";
  },
  dockerPhone: function() {
    return Meteor.user() ? Meteor.user().profile.phoneNumber : "";
  },
  dockerEntity: function() {
    return Meteor.user() ? Meteor.user().profile.entityName : "";
  }
});

var getStoreableCard = function(response, cardholder) {
  return {
    token: response.id,
    cardholder: cardholder,
    country: response.card.country,
    expMo: response.card.exp_month,
    expYr: response.card.exp_year,
    last4: response.card.last4,
    brand: response.card.brand
  };
}

var getStripeCard = function(event) {
  var number = $(event.target).find('[id=number]').val();
  var exp_month = $(event.target).find('[id=exp_month]').val();
  var exp_year = $(event.target).find('[id=exp_year]').val();
  var cvc = $(event.target).find('[id=cvc]').val();

  return {
    number: number,
    cvc: cvc,
    exp_month: exp_month,
    exp_year: exp_year,
  };
}

var getDocker = function(event) {
  var dockerName = $(event.target).find('[id=dockerName]').val();
  var dockerEmail = $(event.target).find('[id=dockerEmail]').val();
  var dockerPhone = $(event.target).find('[id=dockerPhone]').val();
  var entityName = $(event.target).find('[id=entityName]').val();

  dockerPhone = dockerPhone.replace(/[\s\-\(]/, "");
  dockerPhone = dockerPhone.replace(")", "");

  return {
    dockerName: dockerName,
    dockerEmail: dockerEmail,
    dockerPhone: dockerPhone,
    entityName: entityName
  };
}

var finishWDockingFieldErrors = function(submitButton, errors) {
  return finishWFieldErrors('newDockingErrors', submitButton, errors);
}

var finishWStripeError = function(submitButton,error) {
  var errors = {};
  errors[error.param] = error.message;

  return finishWErrors(submitButton, errors);
}
