Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/station', {
  name: 'newStation',
  data: function() {
    return {
      uploader: new Slingshot.Upload("allUploads")
    };
  }
});

Router.route('/terms', {
  name: 'terms'
});

Router.route('/stations/:_id', {
  name: 'station',
  waitOn: function() {
    return [
      Meteor.subscribe('singleStation', this.params._id),
      Meteor.subscribe('padsForStation', this.params._id),
    ];
  },
  data: function() {
    return {
      station: Stations.findOne(this.params._id),
      pads: Pads.find({stationId: this.params._id}),
      uploader: new Slingshot.Upload("allUploads")
    };
  }
});

Router.route('/stations', {
  name: 'stations',
  waitOn: function() {
    return [
      Meteor.subscribe('managedStations'),
    ];
  },
  data: function() {
    return {
      stations: Stations.find({}),
    };
  }
});

Router.route('/', {
  name: 'homepage',
  layoutTemplate: 'homepageLayout',
  waitOn: function() {
    return [
      Meteor.subscribe('allStations'),
    ];
  },
  data: function() {
    return {
      stations: Stations.find({}),
    };
  }
});