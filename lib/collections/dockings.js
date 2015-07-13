Dockings = new Mongo.Collection('dockings');
Dockings.state_awaiting_landlord_approval = "state_awaiting_landlord_approval";
Dockings.state_landlord_approval_rejected = "state_landlord_approval_rejected";
Dockings.state_awaiting_payment = "state_awaiting_payment";

Meteor.methods({
  dockingLandlordApprove: function(dockingId) {
    check(Meteor.userId(), String);
    check(dockingId, String);

    Dockings.update(dockingId,
      {$set: {state: Dockings.state_awaiting_payment}}, function(error, response) {
      if (error) {
        return error;
      } else {
        Meteor.call('chargeCard', dockingId);
        // Reimburse Landlord

        Meteor.call('sendTenantApprovalEmail', Meteor.user().emails[0].address);

        return true;
      }
    });
  },
  dockingLandlordReject: function(dockingId) {
    check(Meteor.userId(), String);
    check(dockingId, String);

    Dockings.update(dockingId,
      {$set: {state: Dockings.state_landlord_approval_rejected}}, function(error) {
      if (error) {
        return error;
      } else {
        Meteor.call('sendTenantRejectedEmail', Meteor.user().emails[0].address);
        return true;
      }
    });
  },
  'createDocking': function(padId, startDockingOn, endDockingOn, dockerName, chargeToCardId) {
    check(padId, String);
    check(startDockingOn, Date);
    check(endDockingOn, Date);
    check(dockerName, String);
    check(chargeToCardId, String);

    var userId = this.userId;
    var pad = Pads.findOne(padId);
    var station = Stations.findOne(pad.stationId)

    // avoid any weird race condition where price changes
    // store all variables before use
    var padPrice = pad.price;
    var displayPadPrice = pad.displayPrice;
    var days = moment(endDockingOn).diff(moment(startDockingOn), 'days') + 1;
    var spacecadetServiceFee = Meteor.settings.public.spacecadetServiceFee;
    var spacecadetConnectionFee = Meteor.settings.public.spacecadetConnectionFee;

    var landlordCutPennies = Math.floor(padPrice * days * 100);
    var connectionFeePennies = Math.floor(landlordCutPennies * spacecadetConnectionFee);
    var serviceFeePennies = Math.floor((landlordCutPennies + connectionFeePennies) * spacecadetServiceFee);
    var pennies = landlordCutPennies + connectionFeePennies + serviceFeePennies;

    var total = pennies / 100
    var landlordCut = landlordCutPennies / 100;
    var connectionFee = connectionFeePennies / 100;
    var serviceFee = serviceFeePennies / 100;

    // var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    dockingId = Dockings.insert({
      userId: userId,
      chargeToCardId: chargeToCardId,
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
  }
});