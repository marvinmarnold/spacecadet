Template.header.helpers({
  'hasItems': function() {
    return !Session.equals('Cart-itemCount', 0);
  }
});