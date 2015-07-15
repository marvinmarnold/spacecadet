Template.newDockingBillingInformation.events({
  'submit form': function(event, template){
    event.preventDefault();
    var submitButtion = $(event.target).find('[id=submit-docking-button]');
    submitButtion.prop("disabled", true);

    var number = $(event.target).find('[id=number]').val();
    var exp_month = $(event.target).find('[id=exp_month]').val();
    var exp_year = $(event.target).find('[id=exp_year]').val();
    var cvc = $(event.target).find('[id=cvc]').val();
    var cardholder = $(event.target).find('[id=cardholder]').val();

    Stripe.card.createToken({
      number: number,
      cvc: cvc,
      exp_month: exp_month,
      exp_year: exp_year,
    }, function(status, response) {
      if(response.error) { // Stripe didnt like the Credit Card
        var error = response.error;
        var errors = {};
        errors[error.param] = error.message;

        Session.set('newDockingErrors', errors);
        submitButtion.prop("disabled", false);
        return;
      } else { // Successfully tokenized to Stripe Credit Card
        var storeableCard = {
          token: response.id,
          cardholder: cardholder,
          country: response.card.country,
          expMo: response.card.exp_month,
          expYr: response.card.exp_year,
          last4: response.card.last4,
          brand: response.card.brand
        };

        // Validate against how card will be stored in actual DB
        var errors = validateCreditCard(storeableCard);
        if (errors.present) {
          submitButtion.prop("disabled", false);
          return Session.set('newDockingErrors', errors);
        }

        // All seems good, try to create card
        Meteor.call('createCreditCard',
          storeableCard,
          function(error, cardId) {
            if(error) {
              submitButtion.prop("disabled", false);
              return throwError("Sorry something went wrong. Please try again later.");
            } else {
              Meteor.call('createDocking',
                template.data.pad._id,
                Session.get('startDockingOn'),
                Session.get('endDockingOn'),
                cardholder,
                cardId,
                function(error, dockingId) {
                  if(error) {
                    submitButtion.prop("disabled", false);
                    return throwError("Sorry something went wrong. Please try again later.");
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

Template.newDockingBillingInformation.onCreated(function() {
  Session.set('newDockingErrors', {});
});

Template.newDockingBillingInformation.helpers({
  errorMessage: function(field) {
    return Session.get('newDockingErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('newDockingErrors')[field] ? 'has-error' : '';
  }
});