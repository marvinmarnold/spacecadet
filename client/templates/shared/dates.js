Template.registerHelper("longDate", function (dateString) {
  return moment(new Date(dateString)).format('ddd MMM D, YYYY');
});