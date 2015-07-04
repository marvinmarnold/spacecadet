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

Meteor.publish('singlePad', function(id) {
  check(id, String);
  return Pads.find(id);
});

Meteor.publish('padsForStation', function(stationId) {
  check(stationId, String);
  return Pads.find({stationId: stationId});
});

Meteor.publish("Cart-userDocking", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Cart.Dockings.find({userId:this.userId})
    ];
  }
  this.ready();
});

Meteor.publish("Cart-deviceDockings", function(deviceId){
  check(arguments, [Match.Any]);
  if(deviceId){
    return [
      Cart.Dockings.find({deviceId:deviceId})
    ];
  }
  this.ready();
});