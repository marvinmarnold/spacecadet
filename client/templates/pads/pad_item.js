Template.padItem.events({
  'click .add-item':function(event, template){
    event.preventDefault();

    //TODO - need to take an attribute hash and send in all values
    var item = this;
    if(item._id){
      item.productId = item._id;
      delete item._id;
    }
    if(!Meteor.userId()){
      item.deviceId = Session.get('Cart-deviceId');
    }else{
      item.userId = Meteor.userId();
    }

    Cart.Items.insert(item);
  }
});

Template.padItem.helpers({
  dockings: function() {
    return Dockings.find({padId: this._id});
  }
});