
app.controller('UsersController', ['$scope', 'Users', 'Sessions', 'Profiles', function($scope, Users, Sessions, Profiles) {

  $scope.users = {};
  $scope.users.userList = [];
  Users.allUsers().then(function(res) { 
    $scope.users.userList = res.data.userData;
    console.log($scope.users.userList);
  });

  $scope.renderProfile = function(userId) {
    console.log('RENDER THIS PROFILE ID', userId);
    Profiles.setProfileId(userId);
  }

  

}]);
