Template.newBank.events({
  //https://stripe.com/docs/api#create_bank_account
  'submit form': function(event, template) {
    event.preventDefault();

    var submitButton = $(event.target).find('[id=submit-bank-button]');
    submitButton.prop("disabled", true);

    var accountName = $(event.target).find('[id=accountName]').val();
    var accountNumber = $(event.target).find('[id=accountNumber]').val();
    var routingNumber = $(event.target).find('[id=routingNumber]').val();

    var externalAccount = {
      "country": "US",
      "currency": "USD",
      "account_number": accountNumber,
      "routing_number": routingNumber,
    }

    var errors = validateBankAccount({accountName: accountName, accountNumber: accountNumber, routingNumber: routingNumber});

    if (errors.present) return finishWBankFieldErrors(submitButton, errors);

    Stripe.bankAccount.createToken(externalAccount, function(status, response) {
      if (response.error) {
        alert(response.error);
      } else {
        var storeableAccount = {
          last4: response.bank_account.last4,
          accountName: accountName,
          bankName: response.bank_account.bank_name,
          routingNumber: response.bank_account.routing_number,
          country: response.bank_account.country,
          currency: response.bank_account.currency,
        }
        console.log("token created " + response.id);
        // TODO - on response use the token to create an account
        // https://stripe.com/docs/api/node#create_bank_account - server side
        // client side https://stripe.com/docs/stripe.js?
        Meteor.call('createRecipient',
          response.id,
          storeableAccount,
          function(error, dockingId) {
            if(error) {
                alert(JSON.stringify(error));
                finishWErrors(submitButton, "Could not create account");
            } else {
                Router.go('account');
            }
          }
        );
      }
    });
  }
});

var finishWBankFieldErrors = function(submitButton, errors) {
  return finishWFieldErrors('newBankErrors', submitButton, errors);
}

Template.newBank.onCreated(function() {
  Session.set('newBankErrors', {});
});

Template.newBank.helpers({
  errorMessage: function(field) {
    return Session.get('newBankErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('newBankErrors')[field] ? 'has-error' : '';
  }
});