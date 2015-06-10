Template.stationNew.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log("hen");
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
    var files = $("input.file_bag")[0].files;

    S3.upload({
        files:files,
        path:"/uploads/stations"
      },function(e,r){
        console.log("uploaded?");
        if(e) {
          console.log(e);
        } else {
          Session.set('stationImagePath', secure_url);
        }
      }
    );
  }
});

Template.stationNew.helpers({
  stationImageUploadCallback: function() {
    return {
      finished: function(index, fileInfo, templateContext) {
        Session.set('stationImagePath', fileInfo.path);
      }
    };
  },
  "files": function(){
    return S3.collection.find();
  }
});