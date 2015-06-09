Template.stationItem.helpers({
  imageUrl: function() {
    console.log(this.image_path);
    return "/uploads" + this.image_path;
  }
});