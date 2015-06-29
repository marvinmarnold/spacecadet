Pads = new Mongo.Collection('pads');

Meteor.methods({
  createPad: function(padAttributes) {
    check(Meteor.userId(), String);
    check(padAttributes, {
      stationId: String,
      name: String,
      description: String,
      imagePath: String,
      price: Number,
      size: String,
      numAvailable: Number,
      imagePath: String
    });
    var user = Meteor.user();
    var station = _.extend(postAttributes, {
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
