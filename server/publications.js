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

Meteor.publish("dockingsForUser", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Dockings.find({$or: [
        { userId: this.userId },
        { isGuest: true }
      ]})
    ];
  }
  this.ready();
});

Meteor.publish("dockingForUser", function (dockingId) {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [ Dockings.find({$and: [
        {_id: dockingId },
        { isGuest: false },
        { userId: this.userId },
      ]})
    ];
  } else {
    return [ Dockings.find({$and: [
        {_id: dockingId },
        { isGuest: true }
      ]})
    ];
  }
  this.ready();
});

Meteor.publish("banksForUser", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Banks.find({userId:this.userId})
    ];
  }
  this.ready();
});