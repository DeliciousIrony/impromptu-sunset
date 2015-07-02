
app.controller('GameController', ['$scope', '$rootScope', '$timeout','$state', 'Session', 'ColorIndexService', '$interval', function($scope, $rootScope, $timeout, $state, Session, ColorIndexService, $interval) {

  $scope.socket = $rootScope.socket;
  if(!$scope.socket) {
    $state.go("index"); 
  }
  console.log('your socket id: ', $scope.socket.id);
  $scope.opponents = {};
  $scope.opponents[$scope.socket.id] = {};
  $scope.opponents[$scope.socket.id].text = '';
  $scope.start = false;
  $scope.socket.emit('joinGame', null);

  $scope.newData = function(event){
    //console.log(event)
    $scope.socket.emit('post', {'id':$scope.socket.id, 'key': event.which});
  };
  
  $scope.socket.on('getUser', function(){
    $scope.socket.emit('sendUser', $scope.user )
  })

  $scope.socket.on('update', function(data){
    $scope.$apply(function() {
      $scope.opponents[data.id].text += String.fromCharCode(data.key);
    });
  });

  $scope.socket.on('start', function(users){
    console.log('starting in 3 secs', JSON.stringify(users));
    console.log($scope.socket.id)
    $timeout(function(){
      $scope.start = true;
    }, 3000);

    $scope.opponents = {};
    users.forEach(function(user){
      $scope.$apply(function(){
        $scope.opponents[user[0]] = {};
        $scope.opponents[user[0]].text = '';
        $scope.opponents[user[0]].queue = user[1];
      }); 
    })
    
    console.log('opponents', JSON.stringify($scope.opponents))
    // $interval(function(){
    //   var first = false, last, temp;

    //   for(var user in $scope.opponents){
    //     if(!first){
    //       temp = $scope.opponents[user].text;
    //       first = true;
    //       last = user;
    //     } else {
    //       $scope.opponents[user].text = $scope.opponents[last].text;
    //       last = user;
    //     }
    //   }

    //   $scope.opponents[last].text = $scope.inputText;
    //   //$scope.$apply(function(){
    //   $scope.inputText = temp;
    //   //});
    // }, 10000);
  });

}]);