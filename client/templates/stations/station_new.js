Template.stationNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var station = {
      name: $(e.target).find('[name=name]').val(),
      address: $(e.target).find('[name=address]').val()
    };

    station.image_path =  Session.get('stationImagePath');
    Session.set('stationImagePath', null);

    Meteor.call('stationCreate', station, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('stationPage', {_id: result._id});
    });
  }
});

Template.stationNew.helpers({
  stationImageUploadCallback: function() {
    return {
      finished: function(index, fileInfo, templateContext) {
        Session.set('stationImagePath', fileInfo.path);
      }
    };
  }
});