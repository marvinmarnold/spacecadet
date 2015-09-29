Template.recipients.helpers({
  _isDefault: function() {
    return (this.isDefault) ? "(active)" : "" ;
  },
  isVerified: function() {
    Meteor.call('checkRecipient', this._id, function(error, result) {

    });
    var accountText = (this.stripeType) ? this.stripeType + " Account: " : "Account: ";
    var verifiedText = (this.stripeVerified) ? "Verified" : "Not verified";
    return accountText + verifiedText;
  },
  isVerifiedLabel: function() {
    return (this.stripeVerified) ? "label-success" : "label-danger"
  }
});

Template.recipients.events({
  'click .activate-account': function(e) {
    Meteor.call('updateDefaultAccount', this._id);
    console.log(this._id);
  }
});