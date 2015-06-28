Meteor.publish("managedStations", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Stations.find({userId: this.userId})
    ];
  }
  this.ready();
});

Meteor.publish("allStations", function() {
  return Stations.find({});
});

Meteor.publish('singleStation', function(id) {
  check(id, String);
  return Stations.find(id);
});