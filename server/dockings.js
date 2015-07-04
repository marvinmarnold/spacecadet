Meteor.methods({
  'chargeCard': function(stripeToken, padId, dockingStartsOn, dockingEndsOn) {
    check(padId, String);
    check(dockingStartsOn, Date);
    check(dockingEndsOn, Date);

    var Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var days = moment(dockingStartsOn).diff(moment(dockingEndsOn), 'days');
  }
});