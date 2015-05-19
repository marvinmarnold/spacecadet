Template.stationPage.helpers({
  pads: function() {
    return Pads.find({stationId: this._id});
  }
});