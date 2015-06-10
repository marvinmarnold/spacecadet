Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/tmp',
    uploadDir: process.env.PWD + '/public/uploads/stations',
    checkCreateDirectories: true //create the directories for you
  });
});

S3.config = {
    key: Meteor.settings.aws_key,
    secret: Meteor.settings.aws_secret,
    bucket: Meteor.settings.aws_bucket
};