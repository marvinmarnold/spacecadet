Template.stationAvailabilityInput.events({
  'blur .availabilityStarts': function(event, template) {
    event.preventDefault();

    var $starts = $(event.target).val();
    Session.set('availabilityStarts', $starts);
    console.log($starts);
  },
  'blur .availabilityEnds': function(event, template) {
    event.preventDefault();

    var $ends = $(event.target).val();
    Session.set('availabilityEnds', $ends);
    console.log($ends);
  }
});