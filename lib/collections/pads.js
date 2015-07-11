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
  },
  deletePad: function(existingStationId, stationAttributes) {
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

    Stations.update(existingStationId, {$set: stationAttributes});

    return {
      _id: existingStationId
    };
  },
  deletePad: function(existingPadId, stationAttributes) {
    check(Meteor.userId(), String);
    check(existingPadId, String);

    Pads.remove(existingPadId);

    return {
      _id: existingPadId
    };
  }
});