angular.module('app.services', [])
  // The Session Factory is responsible for everything that has to 
  // do with saving the user information to cookies to persist after refresh
  .factory('Session',['$cookies', '$injector', function ($cookies, $injector) {
    
    // private method for retrieving user from cookie.
    var user = function(){
      return($cookies.getObject("user") || {username: "", userId: ""});
    };

    var session = {};
    // return authenticated username and id.
    session.getUser = function(){
      return {username: user().username, userId: user().userId};
    };
    // save the currently signed in user to a cookie, and redirect to index page
    session.create = function (userId, userName) {
      $cookies.putObject('user', {userId: userId, username: userName});
      var $state = $injector.get('$state');
      $state.go('index');
    };
    // log user out by deleting the cookie and redirect to login page
    session.destroy = function () {
      $cookies.remove("user");
      // also redirect to sign in page
      var $state = $injector.get('$state');
      $state.go('login');
    };
    // if username is not empty then the user is logged in
    session.isAuthenticated = function(){
      return (!!user().username);
    };

    return session;
  }])

  .factory('sessionInjector', ['Session','$q', function(Session, $q) {
    // this is called with every response and request ( we inject it in angular.config )
    var sessionInjector = {
      // reponseError is called if there is an error in the response
      responseError: function(rejection) {
        // if status is 401, then we will destroy the session
        // this would happen if the session is destroyed on the server side, and that hasn't
        // propagated to the client, so using that same cookie to request from server will return a 401
        if (rejection.status == 401) {
            // remove the cookie if it exists.
            Session.destroy(); 
        }

        return $q.reject(rejection);
      }
    };
    return sessionInjector;
  }])
  // The Sessions factory handles api requests to /sessions on the server
  .factory('Sessions', function($http){
    var getSessions = function(callback){
      $http({
        method: 'GET',
        url: '/api/sessions'
      })
      .then(function(response) {
        callback(response.data);
      });
    };

    return{
      getSessions: getSessions
    };
  })
  // The Users factory handles api requests to /users on the server
  .factory('Users', function ($http, Session, $q) {
    var logout = function() {
      $http({
        method: 'GET',
        url: '/api/users/logout'
      })
      .then(function(response) {
        Session.destroy();
      });
    };

    var login = function(user) {
      return $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
      .success(function(data, status) {
        Session.create(
          data.id,
          data.username
        );
      })
      .error(function(data, status) {
      });
    };

    var signUp = function(user) {
      return $http({
        method: 'POST',
        url: 'api/users/signup',
        data: user
      })
      .success(function(data, status) {
        Session.create(
          data.id,
          data.username
        );
      }).error(function(data, status) {
        // console.log('data', data, 'staus', status);
      });
    };
    
    var allUsers = function() {
      return $http({
        method: 'GET',
        url: '/api/users/fetchusers'
      })
      .success(function(data, status) {
      });
    };

    return {
      login: login,
      signUp: signUp,
      logout: logout,
      allUsers: allUsers
    };
  });
