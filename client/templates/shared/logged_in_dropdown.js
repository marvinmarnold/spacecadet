Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-docking-history': function(event) {
      Router.go('dockings');
  },
  'click #login-buttons-stations': function(event) {
      Router.go('stations');
  },
});