Template.imageUploader.events({
  "click button.upload": function(e){
    var _imageName = this.imageName;
    var file = document.getElementById(_imageName).files[0];
    var uploader = this.uploader;
    var previewPath = quickPreviewPath(this.imageName);

    uploader.send(file, function (error, downloadUrl) {
      if (error) {
        // Log service detailed response.
        console.error('Error uploading', uploader.xhr.response);
        alert (error);
      }
      else {
        Session.set(previewPath, downloadUrl);
        Session.set(_imageName, downloadUrl);
      }
    });
  }
});

Template.imageUploader.helpers({
  url: function () {
    var p = quickPreview(this.imageName);
    if(p) return p;
    Session.set(quickPreviewPath(this.imageName), this.originalImagePath);
    return quickPreview(this.imageName);
  }
});

var quickPreviewPath = function(imageName) {
  return "quickPreview" + imageName;
}

var quickPreview = function(imageName) {
  return Session.get(quickPreviewPath(imageName));
}