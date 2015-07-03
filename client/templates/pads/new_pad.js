Template.newPad.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log(e.target.price.value);
    var pad = {
      name: $(e.target).find('[name=name]').val(),
      description: $(e.target).find('[name=description]').val(),
      price: parseFloat($(e.target).find('[name=price]').val()),
      numAvailable: parseInt($(e.target).find('[name=numAvailable]').val()),
      occupancy: parseInt($(e.target).find('[name=occupancy]').val()),
      availabilityStarts: new Date($(e.target).find('[name=availabilityStarts]').val()),
      availabilityEnds: new Date($(e.target).find('[name=availabilityEnds]').val()),
      size: $(e.target).find('[name=size]').val(),
      stationId: this.station._id
    };

    pad.imagePath =  Session.get('imagePath');
    Session.set('imagePath', null);

    Meteor.call('createPad', pad, function(error, result) {
      if (error)
        return alert(error.reason);
      Session.set('addingLandingPad', false);
    });
  },
});