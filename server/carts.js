Meteor.methods({
  'chargeCard': function(stripeToken, deviceId) {
    check(deviceId, String);

    var Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var items, result, userOrder;
    if(this.userId) {
      items = Cart.Items.find({userId:this.userId});
      userId = this.userId;
    }
    else {
      items = Cart.Items.find({deviceId:deviceId});
      userId = null;
    }

    var total = 0;
    items.forEach(function(item){
      total += item.price;
    });

    var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    try {
      charge({
        amount: total * 100,
        currency: 'usd',
        source: stripeToken
      });

      orderId = Orders.insert({
        userId: userId,
        total: total,
        created: new Date()
      });
      order = Orders.find(orderId);

      items.forEach(function(item){
        station = Stations.findOne(item.stationId);

        LineItems.insert({
          orderId: orderId,
          itemId: item._id,
          stationId: item.stationId,
          stationName: station.name,
          price: item.price,
          name: item.name,
          dockingStartsAt: item.dockingStartsAt,
          dockingEndsAt: item.dockingEndsAt,
          created: new Date()
        });
        Cart.Items.remove({_id:item._id});
      });

      return orderId;
    } catch (error) {
      throw new Meteor.Error("stripe-charge-error", err.message);
    }
  }
});