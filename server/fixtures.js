if (States.find().count() === 0) {
  var states = {};
  states = JSON.parse(Assets.getText("states.json"));
  for (var i = 0; i < states.length; i++) {
    var state = states[i];
    States.insert({
      name: state["name"],
      code: state["abbreviation"]
    });
  }
}

var testId;
var test;

if ( Meteor.users.find().count() === 0 ) {
  testId = Accounts.createUser({
    username: "admin",
    email: 'test@spacecadet.io',
    password: 'spacecadet',
    profile: {
      name: 'Test account'
    }
  });
  test = Meteor.users.findOne(testId);
}
if (Stations.find().count() === 0) {
  for (var i = 0; i < 6; i++) {
    var stationId = Stations.insert({
      name: 'Test station #' + i,
      description: "Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby.",
      address: "1307 Oretha Castle Haley Blvd, Suite 303M",
      city: "New Orleans",
      zip: "70113",
      state: "LA",
      userId: testId,
      imagePath: "/station.jpg"
    });

    // for (var j = 1; j < 3; j++) {
    //   var padId = Pads.insert({
    //     name: 'Landing pad #' + (i + 2 *j),
    //     size: "2x2",
    //     price: (i*10 + j*100),
    //     numAvailable: (i + j),
    //     description: "Some type of description",
    //     stationId: stationId
    //   });
    // }
  }
}