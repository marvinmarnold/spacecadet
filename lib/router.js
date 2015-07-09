Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/station', {
  name: 'newStation',
  data: function() {
    return {
      stationBannerUploader: new Slingshot.Upload("allUploads"),
      stationBannerName: "stationBannerPath",
      stationPreviewUploader: new Slingshot.Upload("allUploads"),
      stationPreviewName: "stationPreviewName"
    };
  }
});

Router.route('/terms', {
  name: 'terms'
});

Router.route('/dock', {
  name: 'newDocking',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePad', this.params.query.pad_id),
      Meteor.subscribe('singleStation', this.params.query.station_id),
    ];
  },
  data: function() {
    return {
      pad: Pads.findOne(this.params.query.pad_id),
      station: Stations.findOne(this.params.query.station_id),
    };
  }
});

Router.route('/docking', {
  name: 'docking'
});

Router.route('/dockings', {
  name: 'dockings',
  waitOn: function() {
    return [
      Meteor.subscribe('dockingsForUser'),
    ];
  },
  data: function() {
    return {
      dockings: Dockings.find({}),
    };
  }
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
      padImageUploader: new Slingshot.Upload("allUploads"),
      padImageName: "padImagePath"
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