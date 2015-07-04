Template.pad.events({
  'click .add-docking-to-cart': function(event, template){
    event.preventDefault();

    //TODO - need to take an attribute hash and send in all values
    var pad = this;
    var station = Stations.findOne(pad.stationId);

    if(pad._id){
      pad.productId = pad._id;
      pad.stationName = station.name;
      pad.dockingStartsAt = new Date(Session.get('availabilityStarts'));
      pad.dockingEndsAt = new Date(Session.get('availabilityEnds'));
      delete pad._id;
    }
    if(!Meteor.userId()){
      pad.deviceId = Session.get('Cart-deviceId');
    }else{
      pad.userId = Meteor.userId();
    }

    Cart.Dockings.insert(pad);
  },
});
