Pads = new Mongo.Collection('pads');

Meteor.methods({
  padCreate: function(padAttributes) {
    check(Meteor.userId(), String);
    check(padAttributes, {
      stationId: String,
      name: String,
      size: String,
      description: String,
      price: Number,
      numAvailable: Number
    });
    var user = Meteor.user();
    var station = Stations.findOne(padAttributes.stationId);
    if (!station)
      throw new Meteor.Error('invalid-launch-pad', 'You must add a launch pad to a station');
    var pad = _.extend(padAttributes, {
      created: new Date()
    });
    return Pads.insert(pad);
  }
});