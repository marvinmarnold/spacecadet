Template.searchBar.helpers({
  locations: function() {
    console.log("called");
    return States.find().fetch().map(function(state) { return state.name });
  }
});