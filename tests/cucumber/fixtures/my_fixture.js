(function () {

  'use strict';

  Meteor.methods({
    'reset' : function() {
      Stations.remove({});
      Pads.remove({});
    },
    'station/create': function (station) {
      console.log("text output" + JSON.stringify(station));
      check(station, {
        name: String
      });
      Stations.insert(station);
    }
  });

})();