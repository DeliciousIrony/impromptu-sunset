var userController = require('../controllers/userController.js');
var passport = require('../config/passport.js');
var helpers = require('../config/helpers.js');

// This file handles the user routing
// pass control over to the userController

module.exports = function (app) {
  // setup passport authentication
  // accepts the express app as a parameter
  passport.setup(app);
  
  // if path is POST /api/users/login will call the passport.authenticate
  // method
  app.post('/login', function(req,res,next){
    passport.authenticate(req,res,next);
  });

  // if path is POST /api/users/signup will call the signup method
  // in the userController
  app.post('/signup', userController.signup);

  app.route('/fetchusers')
    .get(helpers.ensureAuthenticated,userController.fetchUsers);
  // if path is GET /api/users/logout, will check first
  // if user is logged in
    //will call the signout method in the userController.
  // otherwise
    // return 401 (check the helper method)

  app.get('/logout', helpers.ensureAuthenticated, userController.signout);
};
