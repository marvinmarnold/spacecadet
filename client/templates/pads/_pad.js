Template._pad.events({
  'submit form': function(e) {
    e.preventDefault();
    var stationId = this.stationId;
    var pad = {
      name: $(e.target).find('[name=name]').val(),
      description: $(e.target).find('[name=description]').val(),
      price: parseFloat($(e.target).find('[name=price]').val()),
      numAvailable: parseInt($(e.target).find('[name=numAvailable]').val()),
      occupancy: parseInt($(e.target).find('[name=occupancy]').val()),
      availabilityStarts: new Date($(e.target).find('[name=availabilityStarts]').val()),
      availabilityEnds: new Date($(e.target).find('[name=availabilityEnds]').val()),
      size: $(e.target).find('[name=size]').val(),
      stationId: stationId
    };

    var imagePath =  Session.get(this.padImageName);

    if(!imagePath) {
      imagePath = this.pad.imagePath;
    }
    pad.imagePath =  imagePath;

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
  }
});

Template._pad.onRendered(function () {
  $('#availabilityStarts').datepicker();
  $('#availabilityEnds').datepicker();
  Session.set('landlordCut', landlordCut(this.data.pad.price) );
});

Template._pad.helpers({
  landlordCut: function() {
    return accounting.formatMoney(Session.get('landlordCut'));
  }
});

var landlordCut = function(price) {
  return price * (1 - Meteor.settings.public.spacecadetConnectionFee);
}