if (Meteor.isClient) {
  Template.registerHelper("longDate", function (dateString) {
    return moment(new Date(dateString)).format('ddd MMM D, YYYY');
  });

  Template.registerHelper("shortDate", function (dateString) {
    return moment(new Date(dateString)).format('l');
  });

  Template.registerHelper("accounting", function (amount) {
    return accounting.formatMoney(amount);
  });
}