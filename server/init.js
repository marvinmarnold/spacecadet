Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/tmp',
    uploadDir: process.env.PWD + '/public/uploads',
    checkCreateDirectories: true //create the directories for you
  });
});