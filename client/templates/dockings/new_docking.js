Template.newDocking.events({
  'submit form': function(event, template){
    event.preventDefault();

    var ccNum = $(event.target).find('[id=cardnumber]').val();
    var expMo = $(event.target).find('[id=expirationmonth]').val();
    var expYr = $(event.target).find('[id=expirationyear]').val();
    var cvc = $(event.target).find('[id=cvc]').val();
    var cardholder = $(event.target).find('[id=cardholder]').val();

    Stripe.card.createToken({
      number: ccNum,
      cvc: cvc,
      exp_month: expMo,
      exp_year: expYr,
    }, function(status, response) {
      if(response.error) {
        // console.log("card token not created");
        alert(response.error);
      } else {
        // console.log("success");
        var storeableCard = {
          token: response.id,
          cardholder: cardholder,
          country: response.card.country,
          expMo: response.card.exp_month,
          expYr: response.card.exp_year,
          last4: response.card.last4,
          brand: response.card.brand
        };
        Meteor.call('createCreditCard',
          storeableCard,
          function(error, cardId) {
            if(error) {
              // console.log("card not created")
              alert(JSON.stringify(error));
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

// var createCreditCard = function()
