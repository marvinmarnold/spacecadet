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


if ( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    username: Meteor.settings.adminUsername,
    email: Meteor.settings.adminEmail,
    password: Meteor.settings.adminPassword,
    profile: {
      entityName: "SpaceCadet",
      firstName: 'Steven',
      lastName: "Quintanilla",
      phoneNumber: "6178697585",
      role: Accounts.role.admin
    }
  });
}
