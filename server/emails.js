Meteor.methods({
  sendLandlordApprovalEmail: function (docker) {
    check(docker, {
      dockerName: String,
      dockerPhone: String,
      dockerEmail: String,
      entityName: String
    });

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: docker.dockerEmail,
      from: "SpaceCadet <hello@spacecadet.io>",
      subject: "Approval Needed on New Docking Request",
      text: "Greetings " +docker.dockerName+",\n\n" +
      "Thank you for granting the SpaceCadet Fleet access to your Station, and you have received a request to dock at one of your Landing Pads. Please visit http://spacecadet.meteor.com/manage-dockings to review and approve the request!\n\n" +
      "Happy Renting!\n" +
      "The Space Cadets"
    });
  },
  sendTenantApprovalEmail: function (docking) {
    check(docking, Object);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: docking.dockerEmail,
      from: "SpaceCadet <hello@spacecadet.io>",
      subject: "Docking Request Approved",
      text: "Greetings Captain {{docking.dockerName}},\n\n" +
      "Thank you for choosing to dock at a SpaceCadet Landing Pad, and your request to dock at {StationAddress} has been approved by the Station Commander.  The details of your docking are below.\n\n" +
      "Reservation Number: {reservationNumber}\n" +
      "{landingPadName} at {stationName}\n" +
      "{stationAddress}\n" +
      "{stationContactName}\n" +
      "{startDate} - {endDate}\n" +
      "{price} at {numberDays} = {subtotal}\n" +
      "Service Fee = {price*.05}\n" +
      "Total  = {price + service fee}\n\n" +
      "Happy Renting!\n" +
      "The Space Cadets"
    });
  },
  sendTenantRejectedEmail: function (to) {
    check(to, String);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: "SpaceCadet <hello@spacecadet.io>",
      subject: "Docking Request Rejected",
      text: "Greetings Captain{firstNameRenter}," +
            "Your request to dock at {stationAddress} has been rejected. We hope there is a better match next time, and please let us know how we can help in the future!\n\n" +
            "Happy Renting!\n" +
            "The Space Cadets"
    });
  },
  messageReceived: function(to) {
    check(to, String);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: "SpaceCadet <hello@spacecadet.io>",
      subject: "Docking Request Rejected",
      text: "Greetings Captain{firstNameRenter}," +
            "Your request to dock at {stationAddress} has been rejected. We hope there is a better match next time, and please let us know how we can help in the future!\n\n" +
            "Happy Renting!\n" +
            "The Space Cadets"
    });
  }
});

Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.smtp_username,   // eg: server@gentlenode.com
    password: Meteor.settings.smtp_password,   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.mailgun.org',  // eg: mail.gandi.net
    port: 587
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});