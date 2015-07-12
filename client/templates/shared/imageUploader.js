Template.imageUploader.events({
  "click button.upload": function(e){
    var _imageName = this.imageName;
    this.uploader.send(document.getElementById(_imageName).files[0], function (error, downloadUrl) {
    if (error) {
      // Log service detailed response.
      console.error('Error uploading', uploader.xhr.response);
      alert (error);
    }
    else {
      Session.set(_imageName, downloadUrl);
    }
  });
}
});