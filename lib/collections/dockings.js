Dockings = new Mongo.Collection('dockings');
Dockings.state_awaiting_landlord_approval = "state_awaiting_landlord_approval";
Dockings.state_landlord_approval_rejected = "state_landlord_approval_rejected";
Dockings.state_awaiting_payment = "state_awaiting_payment";
Dockings.state_payments_settled = "state_payments_settled";

////////////////////////////////////////////////////////////////////////////////
// Client helpers
////////////////////////////////////////////////////////////////////////////////
if (Meteor.isClient) {
  Template.registerHelper("prettyDockingSubtotal", function (dailyPrice) {
    return accounting.formatMoney(dockingSubtotal(dailyPrice, dockingDurationDaysLazy()));
  });

  Template.registerHelper("prettyDockingSpaceCadetServiceFee", function (dailyPrice) {
    return accounting.formatMoney(dockingSpaceCadetServiceFee(dailyPrice, dockingDurationDaysLazy()));
  });

  Template.registerHelper("prettySpaceCadetConnectionFee", function (dailyPrice) {
    return accounting.formatMoney(dockingSpaceCadetServiceFee(dailyPrice, dockingDurationDaysLazy()));
  });

  Template.registerHelper("prettyDockingCheckoutTotal", function (dailyPrice) {
    return accounting.formatMoney(dockingCheckoutTotal(dailyPrice, dockingDurationDaysLazy()));
  });

  Template.registerHelper("dockingDurationDays", function () {
    return dockingDurationDaysLazy() + " day(s)";
  });

  Template.registerHelper("startDockingOn", function () {
    return moment(getStartDockingOn()).format('ddd, MMM D, YYYY');
  });

  Template.registerHelper("_startDockingOnDate", function (date) {
    return moment(date).format('ddd, MMM D, YYYY');
  });

    Template.registerHelper("_endDockingOnDate", function (date) {
    return moment(date).format('ddd, MMM D, YYYY');
  });

  Template.registerHelper("endDockingOn", function () {
    return moment(getEndDockingOn()).format('ddd, MMM D, YYYY');
  });

  Template.registerHelper("getStartDockingOn", function () {
    return getStartDockingOn();
  });

  Template.registerHelper("getEndDockingOn", function () {
    return getEndDockingOn();
  });

  Template.registerHelper("isDockingPeriodSet", function () {
    return getEndDockingOn() && getStartDockingOn();
  });
}

////////////////////////////////////////////////////////////////////////////////
// Checkout calculations in pennies
////////////////////////////////////////////////////////////////////////////////
var dockingCheckoutTotalPennies = function(dailyPrice, dockingDurationDays) {
  return  dockingSubtotalPennies(dailyPrice, dockingDurationDays) +
          dockingSpaceCadetServiceFeePennies(dailyPrice, dockingDurationDays);
}

var dockingSubtotalPennies = function(dailyPrice, dockingDurationDays) {
  return Math.floor(dailyPrice * dockingDurationDays * 100);
}

var dockingSpaceCadetServiceFeePennies = function(dailyPrice, dockingDurationDays) {
  return Math.floor(
          dockingSubtotalPennies(dailyPrice, dockingDurationDays) *
          Meteor.settings.public.spacecadetServiceFee);
}

var dockingLandlordCutPennies = function(dailyPrice, dockingDurationDays) {
  return Math.floor(
          dockingSubtotalPennies(dailyPrice, dockingDurationDays) *
          (1 - Meteor.settings.public.spacecadetConnectionFee));
}

var dockingSpaceCadetConnectionFeePennies = function(dailyPrice, dockingDurationDays) {
  return  dockingSubtotalPennies(dailyPrice, dockingDurationDays) -
          dockingLandlordCutPennies(dailyPrice, dockingDurationDays);
}

////////////////////////////////////////////////////////////////////////////////
// Pennies to Dollars
////////////////////////////////////////////////////////////////////////////////
var dockingSubtotal = function(dailyPrice, dockingDurationDays) {
  return penniesToDollars(dockingSubtotalPennies(dailyPrice, dockingDurationDays));
}

var dockingSpaceCadetServiceFee = function(dailyPrice, dockingDurationDays) {
  return penniesToDollars(
          dockingSpaceCadetServiceFeePennies(dailyPrice, dockingDurationDays));
}

var dockingCheckoutTotal = function(dailyPrice, dockingDurationDays) {
  return penniesToDollars(
            dockingCheckoutTotalPennies(dailyPrice, dockingDurationDays));
}

var dockingLandlordCut = function(dailyPrice, dockingDurationDays) {
  return penniesToDollars(
            dockingLandlordCutPennies(dailyPrice, dockingDurationDays));
}

var dockingSpaceCadetConnectionFee = function(dailyPrice, dockingDurationDays) {
  return penniesToDollars(
            dockingSpaceCadetConnectionFeePennies(dailyPrice, dockingDurationDays));
}

var penniesToDollars = function(pennies) {
  return pennies / 100;
}

////////////////////////////////////////////////////////////////////////////////
// Docking Times
////////////////////////////////////////////////////////////////////////////////
if (Meteor.isClient) {
  getStartDockingOn = function() {
    return Session.get('startDockingOn');
  }

  getEndDockingOn = function() {
    return Session.get('endDockingOn');
  }

  dockingDurationDaysLazy = function() {
    return dockingDurationDays(getStartDockingOn(), getEndDockingOn());
  }
}

dockingDurationDays = function(startDockingOn, endDockingOn) {
  return moment(endDockingOn).diff(moment(startDockingOn), 'days') + 1;
}


////////////////////////////////////////////////////////////////////////////////
// Meteor Methods
////////////////////////////////////////////////////////////////////////////////
Meteor.methods({
  dockingLandlordApprove: function(dockingId) {
    check(Meteor.userId(), String);
    check(dockingId, String);

    var landlordId = Meteor.userId();
    var docking = Dockings.findOne(dockingId);
    var update = Meteor.wrapAsync(Dockings.update, Dockings);

    if(managesDocking(docking) && isAwaitingLandlordApproval(docking)) {
      try {
        update(dockingId, {$set: {state: Dockings.state_awaiting_payment}});
      } catch (error) {
        throw new Error("Could not update state.");
      }

      Meteor.call('chargeCard', dockingId);
      Meteor.call('creditLandlord', dockingId);
      Meteor.call('sendTenantApprovalEmail', docking);
    }
  },
  dockingLandlordReject: function(dockingId) {
    check(Meteor.userId(), String);
    check(dockingId, String);
    var docking = Dockings.findOne(dockingId);

    Dockings.update(dockingId,
      {$set: {state: Dockings.state_landlord_approval_rejected}}, function(error) {
      if (error) {
        return error;
      } else {
        Meteor.call('sendTenantRejectedEmail', docking);
        return true;
      }
    });
  },
  'createDocking': function(padId, startDockingOn, endDockingOn, docker, chargeToCardId) {
    check(padId, String);
    check(startDockingOn, Date);
    check(endDockingOn, Date);
    check(chargeToCardId, String);
    check(docker, {
      dockerName: String,
      dockerPhone: String,
      dockerEmail: String,
      entityName: String
    });

    var pad = Pads.findOne(padId);
    var station = Stations.findOne(pad.stationId)

    var padPrice = pad.price;
    var days = dockingDurationDays(startDockingOn, endDockingOn);

    var total = dockingCheckoutTotal(padPrice, days);
    var serviceFee = dockingSpaceCadetServiceFee(padPrice, days);
    var subtotal = dockingSubtotal(padPrice, days);
    var landlordCut = dockingLandlordCut(padPrice, days);
    var connectionFee = dockingSpaceCadetConnectionFee(padPrice, days);

    var dockingAttributes = {
      chargeToCardId: chargeToCardId,
      dockerName: docker.dockerName,
      dockerEmail: docker.dockerEmail,
      dockerPhone: docker.dockerPhone,
      entityName: docker.entityName,
      landlordId: station.userId,
      days: days,
      dailyPadPrice: padPrice,
      total: total,
      serviceFee: serviceFee,
      connectionFee: connectionFee,
      landlordCut: landlordCut,
      padId: pad._id,
      subtotal: subtotal,
      stationId: station._id,
      previewPath: station.previewPath,
      bannerPath: station.bannerPath,
      padName: pad.name,
      stationName: station.name,
      address: station.address,
      city: station.city,
      zip: station.zip,
      startDockingOnDate: startDockingOn,
      endDockingOnDate: endDockingOn,
      state: Dockings.state_awaiting_landlord_approval,
      createdAt: new Date()
    }

    if(Meteor.userId()) {
      dockingAttributes = _.extend(dockingAttributes, {
        userId: Meteor.userId(),
        isGuest: false
      });
    } else {
      dockingAttributes = _.extend(dockingAttributes, {
        isGuest: true
      });
    }

    dockingId = Dockings.insert(dockingAttributes);

    Meteor.call('sendLandlordApprovalEmail', station.userId);

    return dockingId;
  }
});


validateDocker = function (docker) {
  var errors = {present: false};
  if (!docker.dockerName) {
    errors.dockerName =  "Please provide the docker's name";
    errors.present = true;
  } if (!validateEmail(docker.dockerEmail)) {
    errors.dockerEmail =  "The docker's email is not valid";
    errors.present = true;
  } if (!validatePhoneNumber(docker.dockerPhone)) {
    errors.dockerPhone =  "The docker's phone number is not valid";
    errors.present = true;
  }

  return errors;
}

function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function validatePhoneNumber(phone) {
  var re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
  return re.test(phone);
}

isAwaitingLandlordApproval = function(docking) {
  return docking && docking.state === Dockings.state_awaiting_landlord_approval;
}

isAwaitingPayment = function(docking) {
  return docking && docking.state === Dockings.state_awaiting_payment;
}