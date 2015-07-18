Template.compose.events({
  'click #delete-draft': function(event) {
    event.preventDefault();
    Session.set('isComposing', false);
  },
  'submit form': function(e, t) {
    e.preventDefault();
    console.log(t);
    console.log(t.data);
    var message = {
      content: $(e.target).find('[name=content]').val(),
      recipientId: t.data.recipientId
    };

    Meteor.call('sendMessage', message, function(e, r){
      if(e) alert(e);
      Session.set('isComposing', false);
      throwError("Message sent");
    })
  }
});