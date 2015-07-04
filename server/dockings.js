Meteor.methods({
  'chargeCard': function(stripeToken, padId, startDockingOn, endDockingOn) {
    check(padId, String);
    check(startDockingOn, Date);
    check(endDockingOn, Date);

    var userId = this.userId;
    var pad = Pads.findOne(padId);
    var station = Stations.find(pad.stationId)
    var Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var days = moment(endDockingOn).diff(moment(startDockingOn), 'days');
    var total = pad.price * days;

    var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    try {
      charge({
        amount: total * 100,
        currency: 'usd',
        source: stripeToken
      });

      dockingId = Dockings.insert({
        userId: userId,
        total: total,
        createdAt: new Date(),
        padId: pad._id,
        stationId: station._id,
        padName: pad.name,
        stationName: station.name,
        startDockingOn: startDockingOn,
        endDockingOn: endDockingOn
      });

      return dockingId;

    } catch (error) {
      throw new Meteor.Error("stripe-charge-error", error.message);
    }
  }
});