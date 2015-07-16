finishWFieldErrors = function(errorNameSpace, submitButton, errors) {
  submitButton.prop("disabled", false);
  Session.set(errorNameSpace, errors);
  return;
}

finishWErrors = function(submitButton, msg) {
  submitButton.prop("disabled", false);
  return throwError(msg);
}