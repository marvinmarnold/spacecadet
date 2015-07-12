Meteor.methods({
  'chargeCard': function(stripeToken,
    padId,
    startDockingOn,
    endDockingOn,
    dockerName) {

    check(padId, String);
    check(startDockingOn, Date);
    check(endDockingOn, Date);
    check(stripeToken, String);
    check(dockerName, String)

    var userId = this.userId;
    var pad = Pads.findOne(padId);
    var station = Stations.findOne(pad.stationId)
    var Stripe = StripeAPI(Meteor.settings.stripe_sk);

    // avoid any weird race condition where price changes
    // store all variables before use
    var padPrice = pad.price;
    var displayPadPrice = pad.displayPrice;
    var days = moment(endDockingOn).diff(moment(startDockingOn), 'days') + 1;
    var spacecadetServiceFee = Meteor.settings.public.spacecadetServiceFee;
    var spacecadetConnectionFee = Meteor.settings.spacecadetConnectionFee;

    var landlordCutPennies = Math.floor(padPrice * days * 100);
    var connectionFeePennies = Math.floor(landlordCutPennies * spacecadetConnectionFee);
    var serviceFeePennies = Math.floor((landlordCutPennies + connectionFeePennies) * spacecadetServiceFee);
    var pennies = landlordCutPennies + connectionFeePennies + serviceFeePennies;

    var total = pennies / 100
    var landlordCut = landlordCutPennies / 100;
    var connectionFee = connectionFeePennies / 100;
    var serviceFee = serviceFeePennies / 100;

    var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    try {
      charge({
        amount: pennies,
        currency: 'usd',
        source: stripeToken
      });

      dockingId = Dockings.insert({
        userId: userId,
        dockerName: dockerName,
        landlordId: userId,
        total: total,
        serviceFee: serviceFee,
        connectionFee: connectionFee,
        landlordCut: landlordCut,
        createdAt: new Date(),
        padId: pad._id,
        dailyPadPrice: displayPadPrice,
        stationId: station._id,
        previewPath: station.previewPath,
        bannerPath: station.bannerPath,
        padName: pad.name,
        stationName: station.name,
        address: station.address,
        city: station.city,
        zip: station.zip,
        startDockingOn: startDockingOn,
        endDockingOn: endDockingOn,
        state: Dockings.state_awaiting_landlord_approval
      });

      Meteor.call('sendLandlordApprovalEmail', Meteor.user().emails[0].address);

      return dockingId;

    } catch (error) {
      throw new Meteor.Error("stripe-charge-error", error.message);
    }
  }
});