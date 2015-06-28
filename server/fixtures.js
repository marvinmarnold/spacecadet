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