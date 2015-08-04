Template.registerHelper("errorClassForForm", function (field, _formName) {
  var formName = "defaultFormName";
  if(_formName)
    formName = _formName;

  var form = !!Session.get(formName);
  return form && !!form[field] ? 'has-error' : '';
});

Template.registerHelper("errorMessageForForm", function (field, _formName) {
  var formName = "defaultFormName";
  if(_formName)
    formName = _formName;

  var form = !!Session.get(formName);
  return form && form[field];
});

