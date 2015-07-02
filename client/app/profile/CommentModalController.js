app.controller('CommentModalCtrl', ['$scope', '$modalInstance', 'session', 'Comments', '$rootScope', function ($scope, $modalInstance, session, Comments, $rootScope) {
    $scope.session = session;
    $scope.commentText = '';

    $scope.ok = function () {
      Comments.createComment(session.id, $scope.commentText, function() {
        //send event that is listened by ProfileController;
        $rootScope.$broadcast('refreshView', 'now');
      });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);