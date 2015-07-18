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
  editPad: function(existingPadId, padAttributes) {
    check(Meteor.userId(), String);
    check(existingPadId, String);
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
    if(isPadOwner(existingPadId)) {
      Pads.update(existingPadId, {$set: padAttributes});

      return {
        _id: existingPadId
      };
    }
  },
  deletePad: function(existingPadId) {
    check(Meteor.userId(), String);
    check(existingPadId, String);
    if(isPadOwner(existingPadId)) {
      Pads.remove(existingPadId);

      return {
        _id: existingPadId
      };
    }
  }
});

isPadOwner = function(padId) {
  var existingPad = Pads.findOne(padId);
  var existingStationId = existingPad.stationId;
  return isStationOwner(existingStationId);
}