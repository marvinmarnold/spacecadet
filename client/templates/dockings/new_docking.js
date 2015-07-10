Template.newDocking.helpers({
  total: function() {
    return this.price * daysBetween();
  },
  startDockingOn: function() {
    return moment(Session.get('startDockingOn')).format('ddd, MMM D, YYYY');
  },
  endDockingOn: function() {
    return moment(Session.get('endDockingOn')).format('ddd, MMM D, YYYY');
  },
  daysBetween: function() {
    return daysBetween();
  }
});

var daysBetween = function () {
  return moment(Session.get('endDockingOn')).diff(moment(Session.get('startDockingOn')), 'days') + 1;
}

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
        stripeToken = response.id;
        Meteor.call('chargeCard',
          stripeToken,
          template.data.pad._id,
          Session.get('startDockingOn'),
          Session.get('endDockingOn'),
          cardholder,
          function(error, dockingId) {
            if(error) {
                alert(JSON.stringify(error));
            } else {
                Router.go('docking', {_id: dockingId});
            }
        });
    });
  },
});
