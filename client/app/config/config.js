
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('sessionInjector');
  $urlRouterProvider.otherwise('/index');

  $stateProvider

    .state('index', {
      url: '/index',
      templateUrl: '/app/home/home.html',
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html'
    })

    .state('game', {
      url: '/game',
      templateUrl: 'app/game/game.html'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'app/profile/profile.html',
      authenticate: true
    })

    .state('results', {
      url: '/results',
      templateUrl: 'app/results/results.html'
    })

    .state('userlist', {
      url: '/userlist',
      templateUrl: 'app/users/userlist.html'
    })
})

.run(['$http', '$rootScope','$cookies','$state','Session', function($http, $rootScope, $cookies,$state,Session) {
    $rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {
        var result= Session.isAuthenticated();        
        if (to && to.authenticate && result == false ) // user not logged in trying to access a page that needs authentication.
        {
            ev.preventDefault();
            $state.go("login");
        } else if ((to.name==="login" || to.name==="signup")  && result == true) { //logged in but going to not logged in page
            ev.preventDefault();
            $state.go("index"); 
        } 
    });
}]);


        
// use ngEnter="action" to trigger starting
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});