Dockings = new Mongo.Collection('docking');

Meteor.methods({
  dockingCreate: function(dockingAttributes) {
    check(Meteor.userId(), String);
    check(dockingAttributes, {
      padId: String,
      timePeriod: String,
      price: Number
    });
    var user = Meteor.user();
    var pad = Pads.findOne(dockingAttributes.padId);
    if (!pad)
      throw new Meteor.Error('invalid-docking-time', 'You must add a docking time to a landing pad');
    var docking = _.extend(dockingAttributes, {
      created: new Date()
    });
    return Dockings.insert(docking);
  }
});