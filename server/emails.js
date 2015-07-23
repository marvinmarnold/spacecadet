Meteor.methods({
  sendLandlordApprovalEmail: function (landlordId) {
    check(landlordId, String),

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    landlord = Meteor.users.findOne(landlordId);
    email = landlord.emails[0].address;
    name = landlord.profile.firstName;
    console.log("LANDLORD: " + email);
    console.log("LANDLORD: " + name);

    Email.send({
      to: email,
      from: "SpaceCadet <hello@spacecadet.io>",
      subject: "Approval Needed on New Docking Request",
      text: "Greetings " + name + "," +
      "\nThank you for granting the SpaceCadet Fleet access to your Station, " +
      "and you have received a request to dock at one of your Landing Pads. " +
      "Please visit http://spacecadet.meteor.com/manage-dockings to review and approve the request!" +
      "\n\nHappy Renting!" +
      "\nThe Space Cadets"
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
      text: "Greetings Captain "+ docking.dockerName + ",\n\n" +
      "Thank you for choosing to dock at a SpaceCadet Landing Pad, " +
      "and your request to dock at " + docking.address + " has been approved by the Station Commander. " +
      "The details of your docking are below.\n\n" +
      "Reservation Number: " + docking._id.toUpperCase() +
      "\n" + docking.padName + " at " + docking.stationName + "\n" +
      "\n" + docking.address +
      "\n" + moment(new Date(docking.startDockingOnDate)).format('L') + " - " + moment(new Date(docking.endDockingOnDate)).format('L') +
      "\n\n" + accounting.formatMoney(docking.dailyPadPrice) + " at " + docking.days + " days = " + accounting.formatMoney(docking.subtotal) +
      "\nService Fee = " + accounting.formatMoney(docking.serviceFee) +
      "\nTotal  = " + accounting.formatMoney(docking.total) +
      "\n\nHappy Renting!\n" +
      "The Space Cadets"
    });
  },
  sendTenantRejectedEmail: function (docking) {
    check(to, String);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: docking.dockerEmail,
      from: "SpaceCadet <hello@spacecadet.io>",
      subject: "Docking Request Rejected",
      text: "Greetings Captain " + docking.dockerName + "," +
            "\nYour request to dock at " + docking.address + " has been rejected. We hope there is a better match next time, and please let us know how we can help in the future!" +
            "\n\nHappy Renting!" +
            "\nThe Space Cadets"
    });
  },
  messageReceived: function(recipientId) {
    check(recipientId, String);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    user = Meteor.users.findOne(recipientId);

    Email.send({
      to: user.emails[0].address,
      from: "SpaceCadet <hello@spacecadet.io>",
      subject: "New Message",
      text: "Greetings " + user.profile.firstName + "," +
            "\nThank you for being a part of the SpaceCadet Fleet, a message has been transmitted to your inbox." +
            " Please visit http://spacecadet.meteor.com/inbox to read and respond to this message." +

            "\n\nHappy Renting," +
            "\nThe Space Cadets"
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