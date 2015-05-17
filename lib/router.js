Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('stations'); }
});

Router.route('/', {name: 'stationsList'});