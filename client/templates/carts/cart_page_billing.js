Template.cartPageBilling.events({
  'submit form': function(event, template){
    event.preventDefault();

    var ccNum = $(event.target).find('[name=cardNumber]').val();
    var expMo = $(event.target).find('[name=mm]').val();
    var expYr = $(event.target).find('[name=yy]').val();
    var cvc = $(event.target).find('[name=cvc]').val();

    console.log(event);
    console.log(template);
    Stripe.card.createToken({
        number: ccNum,
        cvc: cvc,
        exp_month: expMo,
        exp_year: expYr,
    }, function(status, response) {
        stripeToken = response.id;
        Meteor.call('chargeCard', stripeToken, Session.get('Cart-deviceId'), function(error, orderId) {
            if(error) {
                alert(JSON.stringify(error));
            } else {
                Router.go('orderPage', {_id: orderId});
            }
        });
    });
  },
});
