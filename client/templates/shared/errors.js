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
  enableButton(submitButton);
  return throwError(msg);
}

finishWSuccess = function(submitButton, msg) {
  enableButton(submitButton);
  return addNotification(msg);
}

var enableButton = function(submitButton) {
  submitButton.prop("disabled", false);
}