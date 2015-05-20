Meteor.publish('stations', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Stations.find({}, options);
});

Meteor.publish('pads', function(stationId) {
  check(stationId, String);
  return Pads.find({stationId: stationId});
});