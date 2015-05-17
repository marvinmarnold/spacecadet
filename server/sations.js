Meteor.publish('stations', function() {
  return Stations.find();
});