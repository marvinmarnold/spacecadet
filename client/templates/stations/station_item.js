Template.stationItem.helpers({
  imageUrl: function() {
    var path = this.image_path;
    console.log(path);
    return path ? "/uploads" + path : "lot.jpg";
  }
});