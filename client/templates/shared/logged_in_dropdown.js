Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-manage-dockings': function(event) {
      Router.go('manageDockings');
  },
  'click #login-buttons-docking-history': function(event) {
      Router.go('dockings');
  },
  'click #login-buttons-stations': function(event) {
      Router.go('stations');
  },
  'click #login-buttons-account': function(event) {
      Router.go('recipients');
  },
});