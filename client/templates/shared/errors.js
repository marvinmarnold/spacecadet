Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 6000);
});

finishWFieldErrors = function(errorNameSpace, submitButton, errors) {
  submitButton.prop("disabled", false);
  Session.set(errorNameSpace, errors);
  return;
}

finishWErrors = function(submitButton, msg) {
  submitButton.prop("disabled", false);
  return throwError(msg);
}