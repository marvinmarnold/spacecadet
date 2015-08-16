Template._pad.events({
  'submit form': function(e) {
    e.preventDefault();

    var submitButton = $(event.target).find('[id=update-pad-button]');
    submitButton.prop("disabled", true);

    var stationId = this.stationId;
    var pad = {
      name: $(e.target).find('[name=name]').val(),
      description: $(e.target).find('[name=description]').val(),
      price: parseFloat($(e.target).find('[name=price]').val()),
      numAvailable: parseInt($(e.target).find('[name=numAvailable]').val()),
      occupancy: parseInt($(e.target).find('[name=occupancy]').val()),
      availabilityStarts: $(e.target).find('[name=availabilityStarts]').val(),
      availabilityEnds: $(e.target).find('[name=availabilityEnds]').val(),
      size: $(e.target).find('[name=size]').val(),
      stationId: stationId
    };

    var imagePath =  Session.get(this.padImageName);

    if(!imagePath) {
      imagePath = this.pad.imagePath;
    }
    pad.imagePath =  imagePath;

    var errors = validatePad(pad);
    if (errors.present) return finishWFieldErrors("padErrors", submitButton, errors);

    pad.availabilityStarts = new Date(pad.availabilityStarts);
    pad.availabilityEnds = new Date(pad.availabilityEnds);

    if($.isEmptyObject(this.pad)) {
      Meteor.call('createPad', pad, function(error, result) {
      if (error)
        return alert(error.reason);
      Session.set('addingLandingPad', false);
      Router.go('editStation', {_id: stationId});
    });
    } else {
      Meteor.call('editPad', this.pad._id, pad, function(error, result) {
        if (error)
          return alert(error.reason);
        Router.go('editStation', {_id: stationId});
      });
    }
  },
  'change #price': function(e) {
    var newPrice = $('#price').first().val();
    Session.set('landlordCut', landlordCut(newPrice) );
    Session.set('connectionFee', connectionFee(newPrice) );
  }
});

Template._pad.onRendered(function () {
  $('#availabilityStarts').datepicker();
  $('#availabilityEnds').datepicker();
  Session.set('landlordCut', landlordCut(this.data.pad.price) );
  Session.set('connectionFee', connectionFee(this.data.pad.price) );
});

Template._pad.helpers({
  landlordCut: function() {
    return accounting.formatMoney(Session.get('landlordCut'));
  },
  connectionFee: function() {
    return accounting.formatMoney(Session.get('connectionFee'));
  },
  padImagePath: function() {
    return this.pad.imagePath;
  },
  errorMessage: function(field) {
    return Session.get('padErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('padErrors')[field] ? 'has-error' : '';
  },
});

var landlordCut = function(price) {
  return price * (1 - Meteor.settings.public.spacecadetConnectionFee);
}

var connectionFee = function(price) {
  return price * Meteor.settings.public.spacecadetConnectionFee;
}

Template._pad.onCreated(function() {
  Session.set('padErrors', {});
});

var validatePad = function (pad) {
  var errors = {present: false};
  if (!pad.name) {
    errors.name =  "Please provide the pad's name";
    errors.present = true;
  } if (!pad.description) {
    errors.description =  "The pad's description is not valid";
    errors.present = true;
  } if (!pad.size) {
    errors.size =  "The pad's size is not valid";
    errors.present = true;
  } if (!pad.price) {
    errors.price =  "The pad's price is not valid";
    errors.present = true;
  } if (!pad.numAvailable) {
    errors.numAvailable =  "The number of available pads is not valid";
    errors.present = true;
  } if (!pad.occupancy) {
    errors.occupancy =  "The pad's occupancy is not valid";
    errors.present = true;
  } if (!pad.availabilityStarts) {
    errors.availabilityStarts =  "The pad's availability starting date is not valid";
    errors.present = true;
  } if (!pad.availabilityEnds) {
    errors.availabilityEnds =  "The pad's availability ending date is not valid";
    errors.present = true;
  } if (!pad.imagePath) {
    errors.imagePath =  "The pad's image is not valid";
    errors.present = true;
  }

  return errors;
}