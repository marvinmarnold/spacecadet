Template.station.events({
  'click #contact-landlord': function(event) {
    event.preventDefault();
    Session.set('isComposing', true);
  }
});

Template.station.onRendered(function () {
  Session.set('isComposing', false);
});

Template.station.helpers({
  notComposing: function() {
    return Meteor.userId() && !Session.get('isComposing');
  },
  isComposing: function() {
    return Session.get('isComposing');
  }
});
