Template._station.events({
  'submit form': function(e) {
    e.preventDefault();

    var submitButton = $(event.target).find('[id=update-station-button]');
    submitButton.prop("disabled", true);

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

    var errors = validateStation(station);
    if (errors.present) return finishWFieldErrors("stationErrors", submitButton, errors);

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

Template._station.helpers({
  stationBannerPath: function() {
    return this.station.bannerPath;
  },
  stationPreviewPath: function() {
    return this.station.previewPath;
  },
  errorMessage: function(field) {
    return Session.get('stationErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('stationErrors')[field] ? 'has-error' : '';
  },
});

Template._station.onCreated(function() {
  Session.set('stationErrors', {});
  // Hack, data not available in this context
  Session.set("stationBannerPath", undefined);
  Session.set("stationPreviewName", undefined);
});

var validateStation = function (station) {
  var errors = {present: false};
  if (!station.name) {
    errors.name =  "Please provide the station's name";
    errors.present = true;
  } if (!station.description) {
    errors.description =  "The station's description is not valid";
    errors.present = true;
  } if (!station.state) {
    errors.state =  "The station's state is not valid";
    errors.present = true;
  } if (!station.city) {
    errors.city =  "The station's city is not valid";
    errors.present = true;
  } if (!station.address) {
    errors.address =  "The station's address is not valid";
    errors.present = true;
  } if (!station.zip) {
    errors.zip =  "The station's zip is not valid";
    errors.present = true;
  } if (!station.bannerPath) {
    errors.stationBannerPath =  "Please upload a Station Banner image to continue. This will be used in the background of your Property Profile";
    errors.present = true;
  } if (!station.previewPath) {
    errors.stationPreviewPath =  "Please upload a Station Preview image to continue. This will be the first thing seen for your Property Profile.";
    errors.present = true;
  }

  return errors;
}