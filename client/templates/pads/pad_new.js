Template.padNew.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $name = $(e.target).find('[name=name]');
    var $size = $(e.target).find('[name=size]');
    var $description = $(e.target).find('[name=description]');
    var $numAvailable = $(e.target).find('[name=numAvailable]');

    var pad = {
      name: $name.val(),
      size: $size.val(),
      numAvailable: $numAvailable.val(),
      description: $description.val(),
      stationId: template.data._id
    };

    Meteor.call('padCreate', pad, function(error, padId) {
      if (error){
        return alert(error.reason);
      } else {
        $name.val('');
        $numAvailable.val('');
        $size.val('');
        $description.val('');
      }
    });
  }
});