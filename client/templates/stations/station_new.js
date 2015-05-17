Template.stationNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var station = {
      name: $(e.target).find('[name=name]').val(),
      address: $(e.target).find('[name=address]').val()
    };

    station.image_url =  Session.get('stationPhotoUrl');
    Session.set('stationPhotoUrl', null);

    Meteor.call('stationCreate', station, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('stationPage', {_id: result._id});
    });
  }
});

Template.stationNew.helpers({
  stationPhotoUploadCallback: function() {
    return {
      finished: function(index, fileInfo, templateContext) {
        Session.set('stationPhotoUrl', "/uploads/stations" + fileInfo.path);
      }
    };
  }
});