
app.controller('UsersController', ['$scope', 'Users', 'Sessions', 'Profiles', '$location', function($scope, Users, Sessions, Profiles, $location) {

  $scope.users = {};
  $scope.users.userList = [];
  Users.allUsers().then(function(res) { 
    $scope.users.userList = res.data.userData;
    console.log($scope.users.userList);
  });

  $scope.renderProfile = function(user) {
    Profiles.setProfile(user);
    $location.path('/profile')
  }

  

}]);
