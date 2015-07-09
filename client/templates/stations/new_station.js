Template.newStation.events({
  'submit form': function(e) {
    e.preventDefault();
    var station = {
      name: $(e.target).find('[name=name]').val(),
      address: $(e.target).find('[name=address]').val(),
      zip: $(e.target).find('[name=zip]').val(),
      city: $(e.target).find('[name=city]').val(),
      description: $(e.target).find('[name=description]').val(),
      state: $(e.target).find('[name=state]').val()
    };

    station.previewPath =  Session.get('stationPreviewPath');
    console.log(station.previewPath);
    station.bannerPath =  Session.get('stationBannerPath');
    console.log(station.bannerPath);
    Session.set('stationPreviewPath', null);
    Session.set('stationBannerPath', null);

    Meteor.call('stationCreate', station, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('station', {_id: result._id});
    });
  },
});