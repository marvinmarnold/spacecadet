Template.imageUploader.events({
  "click button.upload": function(e){
    this.uploader.send(document.getElementById('fileUpload').files[0], function (error, downloadUrl) {
    if (error) {
      // Log service detailed response.
      console.error('Error uploading', uploader.xhr.response);
      alert (error);
    }
    else {
      Session.set('imagePath', downloadUrl);
    }
  });
}
});