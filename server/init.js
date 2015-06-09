Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/tmp',
    uploadDir: process.env.PWD + '/public/uploads/stations',
    checkCreateDirectories: true //create the directories for you
  });
});