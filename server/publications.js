Meteor.publish('stations', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Stations.find({}, options);
});

Meteor.publish('states', function() {
  return States.find({});
});


Meteor.publish('singleStation', function(id) {
  check(id, String);
  return Stations.find(id);
});

Meteor.publish('singleOrder', function(id) {
  check(id, String);
  return Orders.find(id);
});

Meteor.publish('pads', function(stationId) {
  check(stationId, String);
  return Pads.find({stationId: stationId});
});

Meteor.publish("Cart-userOrders", function () {
  check(arguments, [Match.Any]);
  if(this.userId){
    return [
      Cart.Items.find({userId:this.userId})
    ];
  }
  this.ready();
});

Meteor.publish("Cart-deviceOrders", function(deviceId){
  check(arguments, [Match.Any]);
  if(deviceId){
    return [
      Cart.Items.find({deviceId:deviceId})
    ];
  }
  this.ready();
});

Meteor.publish("lineItems", function(orderId){
  check(orderId, String);
  return LineItems.find({orderId: orderId});
});