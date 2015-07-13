Template.newBank.events({
  //https://stripe.com/docs/api#create_bank_account
  'submit form': function(event, template) {
    event.preventDefault();

    console.log(event);

    var accountName = $(event.target).find('[id=accountName]').val();
    var accountNumber = $(event.target).find('[id=accountNumber]').val();
    var routingNumber = $(event.target).find('[id=routingNumber]').val();

    var externalAccount = {
      "country": "US",
      "currency": "USD",
      "account_number": accountNumber,
      "routing_number": routingNumber,
    }

    Stripe.bankAccount.createToken(externalAccount, function(status, response) {
      if (response.error) {
        alert(response.error);
      } else {
        console.log(response);
        var storeableAccount = {
          token: response.id,
          last4: response.bank_account.last4,
          accountName: accountName,
          bankName: response.bank_account.bank_name,
          routingNumber: response.bank_account.routing_number,
          country: response.bank_account.country,
          currency: response.bank_account.currency,
        }

        Meteor.call('createBankAccount',
          storeableAccount,
          function(error, dockingId) {
            if(error) {
                alert(JSON.stringify(error));
            } else {
                Router.go('account');
            }
          }
        );
      }
    });
  }
});