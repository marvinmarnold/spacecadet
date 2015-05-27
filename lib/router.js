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
      Meteor.subscribe('pads', this.params._id),
      Meteor.subscribe('dockings')
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

Router.route('/new_station', {name: 'stationNew'});

Router.onBeforeAction('dataNotFound', {only: 'stationPage'});
Router.onBeforeAction(requireLogin, {only: 'stationNew'});

Router.route('/', {
  name: 'index',
  waitOn: function() {
    var limit = 3;
    return Meteor.subscribe('stations', {sort: {submitted: -1}, limit: limit});
  },
  data: function() {
    var limit = 3;
    return {
      stations: Stations.find({}, {sort: {submitted: -1}, limit: limit})
    };
  }
});

Router.route('/cart', {
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
