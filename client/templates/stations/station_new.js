Template.stationNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var station = {
      name: $(e.target).find('[name=name]').val(),
      address: $(e.target).find('[name=address]').val()
    };

    Meteor.call('stationCreate', station, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('stationPage', {_id: result._id});
    });
  }
});