Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message, alertClass: "alert-danger"});
};

addNotification = function(message) {
  Errors.insert({message: message, alertClass: "alert-success"});
};