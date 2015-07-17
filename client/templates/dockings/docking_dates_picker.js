Template.dockingDatesPicker.events({
  'change #startDockingOn': function(e) {
    var startDockingOn = $(e.target).first().val();
    Session.setPersistent('startDockingOn', new Date(startDockingOn));
    ensureSensibleDates();
  },
  'change #endDockingOn': function(e) {
    var endDockingOn = $(e.target).first().val();
    Session.setPersistent('endDockingOn', new Date(endDockingOn));
    ensureSensibleDates();
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
  ensureSensibleDates();
  $('#startDockingOn').datepicker({
    startDate: new Date()
  });
  $('#endDockingOn').datepicker({
    startDate: new Date()
  });
});

var ensureSensibleDates = function() {
  if(getEndDockingOn() < getStartDockingOn()){
    Session.setPersistent('endDockingOn', getStartDockingOn());
    $('#endDockingOn').first().val(moment(getEndDockingOn()).format('L'));
  }
}