Template.stationItem.helpers({
  imageUrl: function() {
    var path = this.imagePath;
    path = path ? path : "/lot.jpg";

    console.log("imageUrl: " + path);
    return path;
  }
});