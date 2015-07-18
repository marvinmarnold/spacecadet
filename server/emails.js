Meteor.methods({
  sendLandlordApprovalEmail: function (to) {
    check(to, String);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: "team@spacecadet.io",
      subject: "Approval Needed on New Docking Request",
      text: "Todo"
    });
  },
  sendTenantApprovalEmail: function (to) {
    check(to, String);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: "team@spacecadet.io",
      subject: "Docking Request Approved",
      text: "Todo"
    });
  },
  sendTenantRejectedEmail: function (to) {
    check(to, String);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: "team@spacecadet.io",
      subject: "Docking Request Rejected",
      text: "Greetings Cadet,\n\nUnfortunately,  at your Station." +
            " We hope there is a better match next time, and please let us know how we can help in the future!\n\n" +
            "Happy Renting!\nThe Space Cadets"
    });
  }
});

Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.gmail_username,   // eg: server@gentlenode.com
    password: Meteor.settings.gmail_password,   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});