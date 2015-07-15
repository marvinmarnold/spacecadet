Notifications = new Mongo.Collection(null);

addNotification = function(message) {
  Notifications.insert({message: message});
};

Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};