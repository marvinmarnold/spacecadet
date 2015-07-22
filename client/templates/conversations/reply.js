Template.reply.events({
  'submit form': function(event, t) {
    event.preventDefault();

    var message = {
      content: $(event.target).find('[name=content]').val(),
      recipientId: t.data.recipientId
    };

    Meteor.call('sendMessage', message, function(e, r){
      if(e) alert(e);
      $(event.target).find('[name=content]').val('');
    })
  }
});