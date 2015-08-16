Template.dockingDatesPicker.events({
  'change #startDockingOn': function(e) {
    var startDockingOn = $(e.target).first().val();
    startDockingOn = new Date(startDockingOn).toISOString();
    Session.setPersistent('startDockingOn', startDockingOn);
    ensureSensibleDates();
  },
  'change #endDockingOn': function(e) {
    var endDockingOn = $(e.target).first().val();
    endDockingOn = new Date(endDockingOn).toISOString();
    Session.setPersistent('endDockingOn', endDockingOn);
    ensureSensibleDates();
  }
});

Template.dockingDatesPicker.helpers({
  datepickerStartDockingOn: function() {
    if(getStartDockingOn()) {
      return moment(getStartDockingOn()).format('L');
    } else {
      return moment().format('L');
    }
  },
  datepickerEndDockingOn: function() {
    if(getEndDockingOn()) {
      return moment(getEndDockingOn()).format('L');
    } else {
      return moment().format('L');
    }
  }
})

Template.dockingDatesPicker.onRendered(function () {
  ensureSensibleDates();
  $('#startDockingOn').datepicker({
    startDate: moment().format()
  });
  $('#endDockingOn').datepicker({
    startDate: moment().format()
  });
});

var ensureSensibleDates = function() {
  // Set default values
  if(!getStartDockingOn()) Session.setPersistent('startDockingOn', moment().format());
  if(!getEndDockingOn()) Session.setPersistent('endDockingOn', moment().format());

  // Make sure it ends after it starts
  if(getEndDockingOn() < getStartDockingOn()){
    Session.setPersistent('endDockingOn', getStartDockingOn());
    $('#endDockingOn').first().val(moment(getEndDockingOn()).format('L'));
  }
}