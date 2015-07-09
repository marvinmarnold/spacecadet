Meteor.methods({
  'chargeCard': function(stripeToken, padId, startDockingOn, endDockingOn) {
    check(padId, String);
    check(startDockingOn, Date);
    check(endDockingOn, Date);
    check(stripeToken, String);

    var userId = this.userId;
    var pad = Pads.findOne(padId);
    var station = Stations.findOne(pad.stationId)
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
        landlordId: userId,
        total: total,
        createdAt: new Date(),
        padId: pad._id,
        stationId: station._id,
        previewPath: station.previewPath,
        bannerPath: station.bannerPath,
        padName: pad.name,
        stationName: station.name,
        startDockingOn: startDockingOn,
        endDockingOn: endDockingOn,
        state: Dockings.state_awaiting_landlord_approval
      });

      return dockingId;

    } catch (error) {
      throw new Meteor.Error("stripe-charge-error", error.message);
    }
  }
});