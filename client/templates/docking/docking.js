Template.docking.helpers({
});

Template.docking.events({
  'click .color-one': function(event, template){
    event.preventDefault();

    var docking = this;
    console.log(template.data._id);
    Session.set('selectedDockingTime', this._id);
    console.log(this._id);
  }
});