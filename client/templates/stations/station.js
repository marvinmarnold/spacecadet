Template.station.events({
  'click #contact-landlord': function(event) {
    event.preventDefault();
    Session.set('isComposing', true);
  },
  'click #sign-up-reminder': function(event) {
    event.preventDefault();
    $(event.target).html("You must sign in to send messages");
    console.log(event.target);
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
  },
  cantCompose: function() {
    return !Meteor.userId();
  }
});
