Template.newDockingBillingInformation.events({
  'submit form': function(event, template){
    event.preventDefault();

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
      if(response.error) {
        var error = response.error;
        var errors = {};
        errors[error.param] = error.message;

        Session.set('newDockingErrors', errors);
        return;
      } else {
        var storeableCard = {
          token: response.id,
          cardholder: cardholder,
          country: response.card.country,
          expMo: response.card.exp_month,
          expYr: response.card.exp_year,
          last4: 1,
          brand: response.card.brand
        };

        var errors = validateCreditCard(storeableCard);
        if (errors.present)
          return Session.set('newDockingErrors', errors);

        Meteor.call('createCreditCard',
          storeableCard,
          function(error, cardId) {
            if(error) {
              console.log(error);
            } else {
              Meteor.call('createDocking',
                template.data.pad._id,
                Session.get('startDockingOn'),
                Session.get('endDockingOn'),
                cardholder,
                cardId,
                function(error, dockingId) {
                  if(error) {
                    // console.log("docking not created");
                    alert(JSON.stringify(error));
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