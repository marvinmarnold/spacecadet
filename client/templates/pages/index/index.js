Template.index.events({
  'keyup #searchWhat': function(event, template) {
    //TODO must be a better way. Not sure how to get current val.
    var val = $(event.target).val();

    Session.set('search-term', val);
    template.isSearching.set(val.length > 0);
  }
});

Template.index.helpers({
  isSearching: function() {
    return Template.instance().isSearching.get();
  }
});

Template.index.created = function() {
  this.isSearching = new ReactiveVar(false);
  Session.setDefault('search-term', "");
};