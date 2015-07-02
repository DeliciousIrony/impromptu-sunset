app.controller('CommentModalCtrl', ['$scope', '$modalInstance', 'session', 'Comments', function ($scope, $modalInstance, session, Comments) {
    $scope.session = session;
    $scope.commentText = '';

    $scope.ok = function () {
      Comments.createComment(session.id, $scope.commentText, function() {})
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);