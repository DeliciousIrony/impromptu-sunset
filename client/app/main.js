app.controller('mainController', ['$scope', '$location', 'Users', 'Session', 'Profiles', function ($scope, $location, Users, Session, Profiles) {

  // controller action that logs out the user by calling the Users service
  $scope.logout = function () {
    Users.logout();
  };

  // controller method that calls the Session service to check is the user is authenticated
  $scope.isAuthenticated = function(){
    return Session.isAuthenticated();
  };

  $scope.user = function(){
    return Session.getUser();
  };

  $scope.userProfile = function(user) {
    Profiles.setProfile({ username: user.username, id: user.userId });
    $location.path('/profile')
  }

}]);