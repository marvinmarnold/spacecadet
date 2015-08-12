module.exports = function () {

  this.Given(/a Landlord has created a landing pad with the name "([^"]*)"$/, function (landingPadName) {
    return this.server.call('station/create', {name: landingPadName});
  });

  this.When(/^I navigate to the station page that landing pad belongs to$/, function () {
    return this.client.url(process.env.ROOT_URL);
  });

  this.Then(/^they see the heading "([^"]*)"$/, function (heading) {
    return this.client.
      waitForExist('h1').
      getText('h1').should.become(heading);
  });

};