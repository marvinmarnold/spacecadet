module.exports = function () {
  var stationId;

  this.Given(/a Landlord has created a landing pad with the name "([^"]*)"$/, function (landingPadName) {
    var stationId = this.server.call('station/create', {name: landingPadName});
    // console.log("station " + stationId);
    return stationId;
  });

  this.When(/^I navigate to the station page that landing pad belongs to$/, function () {
    var stationURL = process.env.ROOT_URL; // + "stations/" + stationId;
    // console.log(stationURL);
    return this.client.url(stationURL);
  });

  this.Then(/^they see the heading "([^"]*)"$/, function (heading) {
    return this.client.
      waitForExist('h1').
      getText('h1').should.become(heading);
  });

};