Meteor.publish('stations', function() {
  return Stations.find();
});

Meteor.publish('pads', function(stationId) {
  check(stationId, String);
  return Pads.find({stationId: stationId});
});