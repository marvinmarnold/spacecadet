Template.errors.helpers({
  errors: function() {
    return FormErrors.find();
  }
});

Template.error.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    FormErrors.remove(error._id);
  }, 3000);
});