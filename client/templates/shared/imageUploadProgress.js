Template.imageUploadProgress.helpers({
  progress: function () {
    return Math.round(this.uploader.progress() * 100);
  }
});