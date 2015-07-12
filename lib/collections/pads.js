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
      createdAt: new Date(),
      displayPrice: padAttributes.price * (1 + Meteor.settings.spacecadetConnectionFee)
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

    padAttributes.displayPrice = padAttributes.price * (1 + Meteor.settings.spacecadetConnectionFee);

    Pads.update(existingPadId, {$set: padAttributes});

    return {
      _id: existingPadId
    };
  },
  deletePad: function(existingPadId) {
    check(Meteor.userId(), String);
    check(existingPadId, String);

    Pads.remove(existingPadId);

    return {
      _id: existingPadId
    };
  }
});