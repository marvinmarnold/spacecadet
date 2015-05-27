Template.dockingNew.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $timePeriod = $(e.target).find('[name=timePeriod]');
    var $price = $(e.target).find('[name=price]');

    var docking = {
      timePeriod: $timePeriod.val(),
      price: parseFloat($price.val()),
      // padId: template.data._id
    };

    Meteor.call('dockingCreate', docking, function(error, dockingId) {
      if (error){
        return alert(error.reason);
      } else {
        $timePeriod.val('');
        $price.val('');
      }
    });
  }
});