if (Stations.find().count() === 0) {
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);

  for (var i = 0; i < 3; i++) {
    var stationId = Stations.insert({
      name: 'Test station #' + i,
      address: "Test address",
      submitted: new Date(),
      userId: tomId
    });

    for (var j = 1; j < 3; j++) {
      var padId = Pads.insert({
        name: 'Landing pad #' + (i + 2 *j),
        size: "2x2",
        numAvailable: (i + j),
        description: "Some type of description",
        stationId: stationId
      });

      for (var k = 1; k < 3; k++) {
        Dockings.insert({
          timePeriod: "Day",
          price: 21 + ( i + 2 * j + 4 * k),
          padId: padId
        });
      }
    }
  }
}