Template.index.events({
  'keyup #searchWhat': _.throttle(function(event, template) {
    //TODO must be a better way. Not sure how to get current val.
    var val = $(event.target).val();

    Session.set('search-term', val);
    var regex = ".*" + val + ".*"
    template.searchResults.set(Stations.find({name: {$regex: regex}}).fetch());

    console.log(Stations.find({name: {$regex: regex}}).fetch());
    template.isSearching.set(val.length > 0);
  }, 200)
});

Template.index.helpers({
  isSearching: function() {
    return Template.instance().isSearching.get();
  },
  searchResults: function() {
    return Template.instance().searchResults.get();
  }
});

Template.index.created = function() {
  this.searchResults = new ReactiveVar([]);
  this.isSearching = new ReactiveVar(false);
  Session.setDefault('search-term', "");
};