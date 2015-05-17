Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('stations'); }
});

Router.route('/', {name: 'stationsList'});

Router.route('/stations/:_id', {
  name: 'stationPage',
  data: function() { return Stations.findOne(this.params._id); }
});