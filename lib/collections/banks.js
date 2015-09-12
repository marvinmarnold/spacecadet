Banks = new Mongo.Collection('banks');

validateBankAccount = function (bank) {
  var errors = {present: false};
  if (!bank.accountName) {
    errors.accountName =  "Please provide an account name";
    errors.present = true;
  } if (!bank.routingNumber) {
    errors.routingNumber =  "The routing number is not valid";
    errors.present = true;
  } if (!bank.accountNumber) {
    errors.accountNumber =  "The account number is not valid";
    errors.present = true;
  } if (!bank.taxId) {
    errors.taxId =  "The tax ID is not valid";
    errors.present = true;
  } if (!bank.recipientType) {
    errors.recipientType =  "The account type is not valid";
    errors.present = true;
  }

  return errors;
}
