Meteor.publish('stations', function() {
  return Stations.find();
});

Meteor.publish('pads', function() {
  return Pads.find();
});