Meteor.methods({
  'chargeCard': function(stripeToken, deviceId) {
    var Stripe = StripeAPI(Meteor.settings.stripe_sk);
    var items, result;
    if(this.userId)
      items = Cart.Items.find({userId:this.userId});
    else
      items = Cart.Items.find({deviceId:deviceId});

    var total = 0;
    items.forEach(function(item){
      total += item.price;
    });

    var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

    try {
      var result = charge({
        amount: total * 100,
        currency: 'usd',
        source: stripeToken
      });

      items.forEach(function(item){
        Cart.Items.remove({_id:item._id});
      });

      return result;
    } catch (error) {
      throw new Meteor.Error("stripe-charge-error", err.message);
    }
  }
});