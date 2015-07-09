Template.registerHelper("longDate", function (dateString) {
  return moment(new Date(dateString)).format('ddd MMM D, YYYY');
});

Template.registerHelper("shortDate", function (dateString) {
  return moment(new Date(dateString)).format('l');
});
