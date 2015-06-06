Cart = {};

Cart.Items = new Mongo.Collection('cart-items');

Cart.Items.allow({
  insert: function(userId, doc) {
    return (userId && doc && userId === doc.userId) || (!userId && doc && doc.deviceId && !doc.userId);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return (userId && doc && userId === doc.userId) || (doc && doc.deviceId && !doc.userId);
  },
  remove: function(userId, doc) {
    return (userId && doc && userId === doc.userId) || (doc && doc.deviceId && !doc.userId);
  },
  fetch: ['userId','deviceId']
});

if(Meteor.isServer){
  if(Meteor.settings && Meteor.settings.stripe_sk){
  }else{
    console.log('ERROR - stripe secret key not found in settings');
  }
}else{
  if(!Meteor.settings || !Meteor.settings.public || !Meteor.settings.public.stripe_pk)
    console.log('ERROR - stripe public key not found in settings');
}