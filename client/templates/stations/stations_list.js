Template.stationsList.helpers({
  stations: function() {
    return Stations.find({}, {sort: {submitted: -1}});
  }
});