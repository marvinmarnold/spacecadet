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

Router.route('/profile', {
  name: 'profile',
  waitOn: function() {
    return [
      Meteor.subscribe("currentUser"),
    ];
  },
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
    if(isAdmin()) {
      return [
        Meteor.subscribe('allStations'),
      ];
    }
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

Router.route('/list-space', {
  name: 'newLandlord',
});

Router.route('/inbox', {
  name: 'inbox',
  waitOn: function() {
    return [
      Meteor.subscribe('landlordConversations'),
      Meteor.subscribe('tenantConversations'),
    ];
  },
  data: function() {
    return {
      conversations: Conversations.find({}, {sort: {lastMessageAt: -1}}),
    };
  }
});

Router.route('/inbox/:_id', {
  name: 'conversationHistory',
  waitOn: function() {
    return [
      Meteor.subscribe('landlordConversations'),
      Meteor.subscribe('tenantConversations'),
    ];
  },
  data: function() {
    return {
      conversations: Conversations.find({}, {sort: {lastMessageAt: -1}}),
      currentConversation: Conversations.findOne(this.params._id),
    };
  }
});

Router.route('/payments', {
  name: 'recipients',
  waitOn: function() {
    return [
      Meteor.subscribe('recipientsForUser'),
    ];
  },
  data: function() {
    return {
      user: Meteor.user(),
      recipients: Recipients.find({})
    };
  }
});

Router.route('/bank', {
  name: 'newBank',
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
      Meteor.subscribe('dockingsForLandlord'),
      Meteor.subscribe('recipientsForUser')
    ];
  },
  data: function() {
    return {
      dockingsAwaitingLandlordApproval: Dockings.find({state: Dockings.state_awaiting_landlord_approval}),
      dockingsUpcoming: Dockings.find(
        {$and:
          [
            {$or:
              [
                {state: Dockings.state_awaiting_payment},
                {state: Dockings.state_payments_settled}
              ]
            },
            {endDockingOnDate: {$gte: moment(moment().subtract(1, 'days')).toDate()}}
          ]
        },
        {sort: {startDockingOnDate: 1}}
      ),
      dockingsPaidOut: Dockings.find({state: Dockings.state_payments_settled}),
      revenueThisMonth: function() {
        var total = 0;
        this.dockingsPaidOut.forEach(function(docking){
          var firstOfMonth = (moment().startOf('month')).toDate();
          if(docking.createdAt >= firstOfMonth)
            total = total + docking.landlordCut;
        });

        return accounting.formatMoney(total);
      },
      revenueThisYear: function() {
        var total = 0;
        this.dockingsPaidOut.forEach(function(docking){
          var firstOfyear = (moment().startOf('year')).toDate();

          if(docking.createdAt >= firstOfyear)
            total = total + docking.landlordCut;
        });

        return accounting.formatMoney(total);
      },
      revenueLastMonth: function() {
        var total = 0;
        this.dockingsPaidOut.forEach(function(docking){
          var firstOfLastMonth = (moment().subtract(1, 'months').startOf('month')).toDate();
          var endOfLastMonth = (moment().subtract(1, 'months').endOf('month')).toDate();

          if(docking.createdAt >= firstOfLastMonth &&
            docking.createdAt <= endOfLastMonth)
            total = total + docking.landlordCut;
        });

        return accounting.formatMoney(total);
      },
      revenueAllTime: function() {
        var total = 0;
        this.dockingsPaidOut.forEach(function(docking){
          total = total + docking.landlordCut;
        });

        return accounting.formatMoney(total);
      },
    };
  }
});

Router.route('/about', {
  name: 'about'
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