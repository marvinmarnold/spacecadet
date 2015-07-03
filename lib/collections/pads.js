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
      occupancy: Number,
      availabilityStarts: Date,
      availabilityEnds: Date
    });
    var user = Meteor.user();
    var pad = _.extend(padAttributes, {
      createdAt: new Date()
    });
    var padId = Pads.insert(pad);

    return {
      _id: padId
    };
  }
});
