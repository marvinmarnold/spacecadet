if(Meteor.isServer){
  if(!Meteor.settings || !Meteor.settings.stripe_sk){
    console.log('ERROR - stripe secret key not found in settings');
  }
}else{
  if(!Meteor.settings || !Meteor.settings.public || !Meteor.settings.public.stripe_pk)
    console.log('ERROR - stripe public key not found in settings');
}
