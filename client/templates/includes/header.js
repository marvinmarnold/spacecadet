Template.header.helpers({
  'cartItems': function() {
    return Session.get('Cart-itemCount');
  }
});