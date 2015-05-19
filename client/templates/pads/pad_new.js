Template.padNew.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $name = $(e.target).find('[name=name]');
    var $size = $(e.target).find('[name=size]');
    var $description = $(e.target).find('[name=description]');

    var pad = {
      name: $name.val(),
      size: $size.val(),
      description: $description.val(),
      stationId: template.data._id
    };

    Meteor.call('padCreate', pad, function(error, padId) {
      if (error){
        return alert(error.reason);
      } else {
        $name.val('');
        $size.val('');
        $description.val('');
      }
    });
  }
});