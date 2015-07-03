
app.controller('GameController', ['$scope', '$rootScope', '$timeout','$state', 'Session', 'ColorIndexService', '$interval', 'Time', function($scope, $rootScope, $timeout, $state, Session, ColorIndexService, $interval, Time) {

  $scope.socket = $rootScope.socket;
  if(!$scope.socket) {
    $state.go("index"); 
  }
  var game;
  $scope.you = Session.getUser().username;
  console.log('your socket id: ', $scope.socket.id);
  $scope.opponentsOrdered = [];
  $scope.opponents = {};
  $scope.opponents[$scope.socket.id] = {text: '', prompt: '', username: $scope.you};
  $scope.start = false;
  $scope.socket.emit('joinGame', $scope.you);

  $scope.newData = function(event){
    //console.log(event)
    $scope.socket.emit('post', {'id':$scope.socket.id, 'key': $scope.opponents[$scope.socket.id].text});
  };

  $scope.socket.on('update', function(data){
    $scope.$apply(function() {
      $scope.opponents[data.id].text = data.key;
    });
  });

  $scope.socket.on('updatePrompt', function(data){
    $scope.$apply(function() {
      $scope.opponents[data.id].prompt = data.text;
    });
  });

  $scope.rotateText = function(){
    var tempText = $scope.opponentsOrdered[0].text;
    var tempPrompt = $scope.opponentsOrdered[0].prompt;
    var len = $scope.opponentsOrdered.length;
    //console.log($scope.opponentsOrdered[1] === $scope.opponents[$scope.opponentsOrdered[1].id])

    for(var i = 0; i < len - 1; i++){
      $scope.opponentsOrdered[i].text = $scope.opponentsOrdered[i+1].text;
      $scope.opponentsOrdered[i].prompt = $scope.opponentsOrdered[i+1].prompt;
    }
    //console.log($scope.opponentsOrdered[len-1])
    $scope.opponentsOrdered[len - 1].text = tempText;
    $scope.opponentsOrdered[len - 1].prompt = tempPrompt;

    console.log($scope.opponentsOrdered)
  };

  $scope.startTimer = function() {
    if (angular.isDefined(game)) return;

    var duration = 1;
    var count = 1;
    Time.setMinuteCount(duration);

    Time.setStartTime();
    $scope.timer = Time.getTimer();

    game = $interval(function() {
      if (Time.checkForEnd()) {
        $scope.stopTimer();
        $scope.done = true;
      } else {
        $scope.timer = Time.getTimer();
        if ($scope.timer === '0:00' && count !== 3) {
          $scope.rotateText();
          Time.setStartTime();
          $scope.timer = Time.getTimer();
          count++;
        }
      }
    }, 1000, 0);
  };

  $scope.stopTimer = function() {
    if (angular.isDefined(game)) {
      $interval.cancel(game);
      game = undefined;
    }
  };

  $scope.socket.on('start', function(users){
    console.log('starting in 3 secs', JSON.stringify(users));
    console.log($scope.socket.id)
    $timeout(function(){
      $scope.start = true;
      $timeout(function() {
        $scope.begin = true;
        $scope.socket.emit('postPrompt', {'id':$scope.socket.id, 'text': $scope.opponents[$scope.socket.id].prompt});
        $scope.startTimer();
      }, 10000)
    }, 3000);

    $scope.opponents = {};
    users.forEach(function(user){
      $scope.$apply(function(){
        $scope.opponents[user[0]] = {
          id: user[0],
          text: '',
          prompt: '',
          username: user[2]
        };

        $scope.opponentsOrdered[user[1]] = $scope.opponents[user[0]];
      }); 
    });
  });

}]);