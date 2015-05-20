if (Stations.find().count() === 0) {
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);

  for (var i = 0; i < 10; i++) {
    Stations.insert({
      name: 'Test station #' + i,
      address: "Test address",
      submitted: new Date(),
      userId: tomId
    });
  }
}