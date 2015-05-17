Template.stationsList.helpers({
  stations: function() {
    return Stations.find();
  }
});