Stations = new Mongo.Collection('stations');

Meteor.methods({
  stationCreate: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      name: String,
      stateId: String,
      address: String,
      imagePath: String
    });
    var user = Meteor.user();
    var station = _.extend(postAttributes, {
      userId: user._id,
      owner: user.username,
      submitted: new Date()
    });
    var stationId = Stations.insert(station);
    return {
      _id: stationId
    };
  }
});