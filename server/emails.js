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
      text: "Todo"
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