Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('stations');
  }
});

Router.route('/', {name: 'stationsList'});

Router.route('/stations/:_id', {
  name: 'stationPage',
  waitOn: function() {
    return Meteor.subscribe('pads', this.params._id);
  },
  data: function() { return Stations.findOne(this.params._id); }
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