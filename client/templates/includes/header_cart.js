Template.headerCart.helpers({
  'cartItemCount': function() {
    return Session.get('Cart-itemCount');
  },
  'cartItems': function() {
    var query = {};
    if(Meteor.userId())
      query.userId = Meteor.userId();
    else
      query.deviceId = Session.get('Cart-deviceId');
    return Cart.Items.find(query);
  },
  'cartTotal': function() {
    return Session.get('Cart-itemTotal');
  }

});