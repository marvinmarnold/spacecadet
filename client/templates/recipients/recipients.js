Template.recipients.helpers({
  _isDefault: function() {
    return (this.isDefault) ? "(active)" : "" ;
  }
});

Template.recipients.events({
  'click .activate-account': function(e) {
    Meteor.call('updateDefaultAccount', this._id);
    console.log(this._id);
  }
});