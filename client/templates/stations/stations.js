Template.stations.events({
  'click #new-station-button': function(event) {
      Router.go('newStation');
  },
  'click .delete-station-button': function(event) {
    event.preventDefault();
    Meteor.call('deleteStation', this._id, function(error, result) {
      if (error)
        return alert(error.reason);
    });
  },
});