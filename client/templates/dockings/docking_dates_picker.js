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
    if(getStartDockingOn()) {
      return moment(getStartDockingOn()).format('L');
    } else {
      return moment(new Date()).format('L');
    }
  },
  datepickerEndDockingOn: function() {
    if(getStartDockingOn()) {
      return moment(getEndDockingOn()).format('L');
    } else {
      return moment(new Date()).format('L');
    }
  }
})

Template.dockingDatesPicker.onRendered(function () {
  $('#startDockingOn').datepicker({
    startDate: new Date()
  });
  $('#endDockingOn').datepicker({
    startDate: new Date()
  });
});