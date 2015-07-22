Template._station.events({
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

    var bannerPath = Session.get(this.stationBannerName);
    var previewPath = Session.get(this.stationPreviewName);

    if(!bannerPath) {
      bannerPath = this.station.bannerPath;
    }
    station.bannerPath =  bannerPath;

    if(!previewPath) {
      previewPath = this.station.previewPath;
    }
    station.previewPath =  previewPath;

    if($.isEmptyObject(this.station)) {
      Meteor.call('stationCreate', station, function(error, result) {
        if (error)
          return alert(error.reason);
        Router.go('stations');
      });
    } else {
      Meteor.call('editStation', this.station._id, station, function(error, result) {
        if (error)
          return alert(error.reason);
        Router.go('stations');
      });
    }
  },
});