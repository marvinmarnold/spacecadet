Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/stations/:_id', {
  name: 'stationPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleStation', this.params._id),
      Meteor.subscribe('pads', this.params._id)
    ];
  },
  data: function() {
    return {
      station: Stations.findOne(this.params._id),
      pads: Pads.find({stationId: this.params._id})
    };
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.route('/new_station', {
  name: 'stationNew',
  data: function() {
    return {
      uploader: new Slingshot.Upload("allUploads")
    };
  }
});

Router.onBeforeAction('dataNotFound', {only: 'stationPage'});
Router.onBeforeAction(requireLogin, {only: 'stationNew'});

Router.route('/checkout', {
  name: 'cartPage',
  data: function () {
      var query = {};
    if(Meteor.userId())
      query.userId = Meteor.userId();
    else
      query.deviceId = Session.get('Cart-deviceId');

    return {
        cartItems: Cart.Items.find(query),
        hasItems: !Session.equals('Cart-itemCount', 0),
        itemCount: Session.get('Cart-itemCount'),
        itemTotal: Session.get('Cart-itemTotal')
    };
  }
});

Router.route('/orders/:_id', {
  name: 'orderPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleOrder', this.params._id),
      Meteor.subscribe('lineItems', this.params._id)
    ];
  },
  data: function() {
    return {
      order: Orders.findOne(this.params._id),
      lineItems: LineItems.find({orderId: this.params._id})
    };
  }
});


IndexController = RouteController.extend({
  template: 'index',
  increment: 3,
  searchLimit: function() {
    return parseInt(this.params.searchLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.searchLimit()};
  },
  stations: function () {
    return Stations.find({}, this.findOptions());
  },
  subscriptions: function () {
    this.stationsSub = Meteor.subscribe('stations', this.findOptions());
  },
  data: function() {
    var hasMore = this.stations().count() === this.searchLimit();
    var nextPath = this.route.path(
      {searchLimit: this.searchLimit() + this.increment}
    );
    return {
      stations: this.stations(),
      ready: this.stationsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});

Router.route('/:searchLimit?', {
  name: 'index'
});