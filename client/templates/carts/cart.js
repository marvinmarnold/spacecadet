Cart.subscriptionHandles = {
	userOrders:Meteor.subscribe("Cart-userOrders")
};

Tracker.autorun(function(){
	if(!Session.equals('Cart-deviceId', undefined))
		Cart.subscriptionHandles.deviceOrders = Meteor.subscribe("Cart-deviceOrders", Session.get('Cart-deviceId'));
});

Tracker.autorun(function(){
	if(!Meteor.userId() && Session.equals('Cart-deviceId', undefined)){
		var deviceId = amplify.store("Cart-deviceId");
		if(!deviceId){
			deviceId = Random.id();
			amplify.store("Cart-deviceId", deviceId);
		}
		Session.set('Cart-deviceId', deviceId);
	}else if(Meteor.userId()){
		Cart.Items.find({
			userId:{$exists:false},
			deviceId: Session.get('Cart-deviceId')
		},{fields:{userId:1,deviceId:1}}).forEach(function(order){
			Cart.Items.update({
				_id:order._id
			},{
				$set:{userId:Meteor.userId()},
				$unset:{deviceId:1}
			},function(error){
				if(error)
					console.log(error);
			});
		});
		Session.set('Cart-deviceId', undefined);
	}
});

Session.setDefault('Cart-itemCount', 0);
Session.setDefault('Cart-itemTotal', 0);
Tracker.autorun(function(){
	var query = {};
	if(Meteor.userId())
		query.userId = Meteor.userId();
	else
		query.deviceId = Session.get('Cart-deviceId');

	var total = 0;
	var items = Cart.Items.find(query, {fields: {price: 1}});
	items.forEach(function(item){
		total += item.price;
	});

	Session.set('Cart-itemTotal', Math.floor(total*100)/100);
	Session.set('Cart-itemCount', items.count());
});



Template.CartSummary.helpers({
	'itemCount':function(){
		return Session.get('Cart-itemCount');
	},
	'itemTotal':function(){
		return Session.get('Cart-itemTotal');
	},
	'itemsInCart':function(){
		return !Session.equals('Cart-itemCount', 0);
	}
});


Template.CartPayNow.events({
	'click #pay-now':function(event, template){
		event.preventDefault();
	}
});

Template.CartPayNow.rendered = function(){

};


Router.route('/cart', function () {
  this.render('CartItems', {
    data: function () {
    	var query = {};
		if(Meteor.userId())
			query.userId = Meteor.userId();
		else
			query.deviceId = Session.get('Cart-deviceId');

		return {
    		items:Cart.Items.find(query),
    		hasItems:!Session.equals('Cart-itemCount', 0),
    		itemCount:Session.get('Cart-itemCount'),
			itemTotal:Session.get('Cart-itemTotal')
    	};
    }
  });
});

Template.CartItem.events({
	'click .remove':function(event, template){
		event.preventDefault();
		if(confirm("Are You Sure?"))
			Cart.Items.remove({_id:this._id});
	}
});
