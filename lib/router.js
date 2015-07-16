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
      stationPreviewName: "stationPreviewName",
      station: {}
    };
  }
});

Router.route('/station/:_id/edit', {
  name: 'editStation',
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
      padImageName: "padImagePath",
      pad: {},
      stationBannerUploader: new Slingshot.Upload("allUploads"),
      stationBannerName: "stationBannerPath",
      stationPreviewUploader: new Slingshot.Upload("allUploads"),
      stationPreviewName: "stationPreviewName"
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

Router.route('/account', {
  name: 'account',
  waitOn: function() {
    return [
      Meteor.subscribe('recipientsForUser'),
    ];
  },
  data: function() {
    return {
      user: Meteor.user(),
      banks: Recipients.find({})
    };
  }
});

Router.route('/bank', {
  name: 'newBank',
  // waitOn: function() {
  //   return [
  //     Meteor.subscribe('managedStations'),
  //   ];
  // },
  // data: function() {
  //   return {
  //     user: Meteor.user(),
  //   };
  // }
});

Router.route('/pad/:_id/edit', {
  name: 'editPad',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePad', this.params._id),
    ];
  },
  data: function() {
    return {
      pad: Pads.findOne(this.params._id),
      padImageUploader: new Slingshot.Upload("allUploads"),
      padImageName: "padImagePath"
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

Router.route('/docking/:_id', {
  name: 'docking',
  waitOn: function() {
    return [
      Meteor.subscribe('dockingForUser', this.params._id),
    ];
  },
  data: function() {
    return {
      docking: Dockings.findOne(this.params._id),
    };
  }
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

Router.route('/manage-dockings', {
  name: 'manageDockings',
  waitOn: function() {
    return [
      Meteor.subscribe('dockingsForUser'),
    ];
  },
  data: function() {
    return {
      dockingsAwaitingLandlordApproval: Dockings.find({state: Dockings.state_awaiting_landlord_approval}),
      dockingsUpcoming: Dockings.find({state: Dockings.state_awaiting_payment}),
      dockingsPaidOut: Dockings.find()
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