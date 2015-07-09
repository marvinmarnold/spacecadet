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

    station.bannerPath =  Session.get(this.stationBannerName);
    Session.set(this.stationBannerName, null);
    station.previewPath =  Session.get(this.stationPreviewName);
    Session.set(this.stationPreviewName, null);

    Meteor.call('stationCreate', station, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('station', {_id: result._id});
    });
  },
});