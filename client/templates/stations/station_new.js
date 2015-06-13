Template.stationNew.events({
  'submit form': function(e) {
    e.preventDefault();
    var station = {
      name: $(e.target).find('[name=name]').val(),
      address: $(e.target).find('[name=address]').val()
    };

    station.imagePath =  Session.get('stationImagePath');
    Session.set('stationImagePath', null);

    Meteor.call('stationCreate', station, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('stationPage', {_id: result._id});
    });
  },
  "click button.upload": function(){
    var uploader = new Slingshot.Upload("allUploads");
    uploader.send(document.getElementById('fileUpload').files[0], function (error, downloadUrl) {
      if (error) {
        // Log service detailed response.
        console.error('Error uploading', uploader.xhr.response);
        alert (error);
      }
      else {
        Session.set('stationImagePath', downloadUrl);
      }
    });
  }
});
