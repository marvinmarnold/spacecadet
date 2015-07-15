Notifications = new Mongo.Collection(null);

addNotification = function(message) {
  Notifications.insert({message: message});
};

FormErrors = new Mongo.Collection(null);

throwFormError = function(id, message) {
  FormErrors.insert({id: id, message: message});
};