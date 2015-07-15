Template.dockingDatesPicker.events({
  'change #startDockingOn': function(e) {
    var startDockingOn = $(e.target).first().val();
    Session.setPersistent('startDockingOn', new Date(startDockingOn));
    console.log(new Date(startDockingOn));
  },
  'change #endDockingOn': function(e) {
    var endDockingOn = $(e.target).first().val();
    Session.setPersistent('endDockingOn', new Date(endDockingOn));
  }
});

Template.dockingDatesPicker.helpers({
  datepickerStartDockingOn: function() {
    return moment(getStartDockingOn()).format('L');
  },
  datepickerEndDockingOn: function() {
    return moment(getEndDockingOn()).format('L');
  }
})

Template.dockingDatesPicker.onRendered(function () {
  $('#startDockingOn').datepicker();
  $('#endDockingOn').datepicker();
});