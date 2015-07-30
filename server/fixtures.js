var landlordId;

var inDev = function() {
  return Meteor.settings.public.development;
}

if ( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    username: Meteor.settings.adminUsername,
    email: Meteor.settings.adminEmail,
    password: Meteor.settings.adminPassword,
    profile: {
      entityName: "SpaceCadet",
      firstName: 'Steven',
      lastName: "Quintanilla",
      phoneNumber: "6178697585",
      role: Accounts.role.admin
    }
  });

  if (inDev()) {
    landlordId = Accounts.createUser({
      email: Meteor.settings.landlordEmail,
      password: Meteor.settings.landlordPassword,
      profile: {
        entityName: "SpaceCadet",
        firstName: 'Steven',
        lastName: "Quintanilla",
        phoneNumber: "6178697585",
        role: Accounts.role.landlord
      }
    });
  }
}

if (inDev()) {
  if (Stations.find().count() === 0) {
    for (var i = 0; i < 6; i++) {
      var stationId = Stations.insert({
        name: 'Test station #' + i,
        description: "Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby.",
        address: "1307 Oretha Castle Haley Blvd, Suite 303M",
        city: "New Orleans",
        zip: "70113",
        state: "LA",
        userId: landlordId,
        previewPath: "/station.jpg",
        bannerPath: "/station-banner.jpg"
      });

      for (var j = 1; j < 6; j++) {
        var padId = Pads.insert({
          name: 'Landing pad #' + (i + 2 *j),
          size: "2x2",
          price: (i*10 + j*100),
          numAvailable: (i + j),
          description: "Some type of description",
          stationId: stationId,
          imagePath: "/pad.jpg",
          occupancy: (i + j*10),
          availabilityStarts: new Date(),
          availabilityEnds: new Date()
        });
      }
    }
  }
}

