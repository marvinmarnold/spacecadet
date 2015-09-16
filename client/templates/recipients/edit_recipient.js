Template.editRecipient.helpers({
  errorMessage: function(field) {
    return Session.get('editRecipientErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('editRecipientErrors')[field] ? 'has-error' : '';
  }
});

Template.editRecipient.events({
  //https://stripe.com/docs/api#create_bank_account
  'submit form': function(event, template) {
    event.preventDefault();

    var submitButton = $(event.target).find('[id=update-recipient-button]');
    submitButton.prop("disabled", true);

    var accountName = $(event.target).find('[id=accountName]').val();
    var taxId = $(event.target).find('[id=taxId]').val();

    var errors = validateRecipient({
      accountName: accountName,
      taxId: taxId
    });

    if (errors.present) return finishWBankFieldErrors(submitButton, errors);

    Meteor.call('updateRecipient',
          response.id,
          accountName,
          taxId,
          function(error, dockingId) {
            if(error) {
                finishWErrors(submitButton, "Could not update account");
            } else {
                Router.go('recipients');
            }
          }
        );
  }
});

var validateRecipient = function (bank) {
  var errors = {present: false};
  if (!bank.accountName) {
    errors.accountName =  "Please provide an account name";
    errors.present = true;
  } if (!bank.taxId) {
    errors.taxId =  "The tax ID is not valid";
    errors.present = true;
  }

  return errors;
}

Template.editRecipient.onCreated(function() {
  Session.set('editRecipientErrors', {});
});

var finishWBankFieldErrors = function(submitButton, errors) {
  return finishWFieldErrors('editRecipientErrors', submitButton, errors);
}