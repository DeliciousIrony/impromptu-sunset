app.controller('ProfileController', ['$scope', 'Sessions', 'Profiles', '$modal', function ($scope, Sessions, Profiles, $modal) {

  $scope.margin = {top: 10, right: 50, bottom: 0, left: 70};
  $scope.width = 960 - $scope.margin.left - $scope.margin.right;
  $scope.height = 500 - $scope.margin.top - $scope.margin.bottom;
  $scope.user = Profiles.getProfile();
  $scope.sessions = [];
  $scope.checkSessions = false;
  $scope.animationsEnabled = true;

  //Used to open the Comment Modal
  $scope.open = function (sessionNum, size) {
    console.log("This is the sessionNum passed in", sessionNum);
    console.log($scope.sessions[sessionNum]);
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'CommentModalCtrl',
      size: size,
      resolve: {
        session: function() {
          return $scope.sessions[sessionNum];
        }
      }
    });
  };

  $scope.$on('refreshView', function(event, data) {
    $scope.getSessions(function() {})
  });

  // Calls the Session factory to get the sessions of that user.
  $scope.getSessions = function (callback) {
    Sessions.userSessions($scope.user.id, function(data){
      $scope.sessions = data;
      console.dir($scope.sessions);
      callback(data);
    });
  };
  
  // $scope.getSessions(function() {});
  // parse data before plotting it on d3
  var parseData = function(array) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        var d = {};
        d.increment = i;
        d.point = array[i];
        result.push(d);
      }
      return result;
  };

  // Word count chart.
  // When the d3 directive for that chart loads, the loaded method will be called
  // if the sessions are not yet populated, we will get them, otherwise plot.
  $scope.wordcount = { loaded : function(){
    if($scope.checkSessions){
      var word_count = _.pluck($scope.sessions, "word_count");
      $scope.plot('wordcount',word_count, "Word Count Per Session");
    }
    else{
      $scope.getSessions(function(data){
        $scope.wordcount.loaded();
        $scope.checkSessions = true;
      }); 
    }
  }};

  // Character count chart.
  // When the d3 directive for that chart loads, the loaded method will be called
  // if the sessions are not yet populated, we will get them, otherwise plot.
  $scope.charcount = { loaded : function(){
    if($scope.checkSessions){
      var char_count = _.pluck($scope.sessions, "char_count");
      $scope.plot('charcount', char_count, "Char Count Per Session");  
    }
    else{
      $scope.getSessions(function(data){
        $scope.charcount.loaded();
        $scope.checkSessions = true;
      }); 
    }
  }};

  // Consistency chart.
  // When the d3 directive for that chart loads, the loaded method will be called
  // if the sessions are not yet populated, we will get them, otherwise plot.
  $scope.consistency = { loaded : function(){
    if($scope.checkSessions){
      var potential = (1) * 10000 * 60; //potential score per minute
      var consistency = _.pluck($scope.sessions, "scores");
      consistency = _.filter(consistency, function(item){
        return item !== null && item.length > 0;
      })
      consistency = _.map(consistency, function(scores){
        var total_percent = _.reduce(scores, function(memo, element, index){
          return memo + (element/potential * 100);
        },0);
        var sum = Math.round(total_percent / scores.length);
        return sum;
      });
      $scope.plot('consistency', consistency, "Avg consistency per session");  
    }
    else{
      $scope.getSessions(function(data){
        $scope.consistency.loaded();
        $scope.checkSessions = true;
      }); 
    }
  }};

  // parses data then plots the graph by calling the d3 createGraph method for that chart.
  // control is what connects us to the directive. we pass in in the view. so each chart has its
  // own control object. This enables us to call a method in the directive.
  $scope.plot = function(control, data, type){
    data = parseData(data);
    $scope[control].createGraph(data, type);
  };

}]);
