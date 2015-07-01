
app.controller('UsersController', ['$scope', 'Users',  function($scope, Users) {

  $scope.users = {};
  $scope.users.userList = [];
  Users.allUsers().then(function(res) { 
    $scope.users.userList = res.data.userData;
  });

}]);
