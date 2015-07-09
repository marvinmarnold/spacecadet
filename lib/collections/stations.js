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
});