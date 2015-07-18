Stations = new Mongo.Collection('stations');

Meteor.methods({
  stationCreate: function(stationAttributes) {
    check(Meteor.userId(), String);
    check(stationAttributes, {
      name: String,
      description: String,
      state: String,
      address: String,
      city: String,
      zip: String,
      previewPath: String,
      bannerPath: String
    });
    if(isExactlyLandlord()) {
      var user = Meteor.user();
      var station = _.extend(stationAttributes, {
        userId: user._id,
        owner: user.username,
        createdAt: new Date()
      });
      var stationId = Stations.insert(station);

      return {
        _id: stationId
      };
    }
  },
  editStation: function(existingStationId, stationAttributes) {
    check(Meteor.userId(), String);
    check(existingStationId, String);
    check(stationAttributes, {
      name: String,
      description: String,
      state: String,
      address: String,
      city: String,
      zip: String,
      previewPath: String,
      bannerPath: String
    });

    if(isStationOwner(existingStationId)) {
      Stations.update(existingStationId, {$set: stationAttributes});

      return {
        _id: existingStationId
      };
    }
  },
  deleteStation: function(existingStationId, stationAttributes) {
    check(Meteor.userId(), String);
    check(existingStationId, String);

    if(isStationOwner(existingStationId)) {
      Stations.remove(existingStationId);

      return {
        _id: existingStationId
      };
    }
  }
});

isStationOwner = function(stationId) {
  var existingStation = Stations.findOne(existingStationId);
  return  (
            isLandlord() &&
            (existingStation.userId === Meteor.userId())
          ) ||
          isAdmin();
}