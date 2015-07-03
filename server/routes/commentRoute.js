var commentController = require('../controllers/commentController.js');
var helpers = require('../config/helpers.js');

// This file handles the comment routing
// pass control over to commentController
module.exports = function (app) {

  // user must be logged in to access these methods.
  // if not will get a 401 response (check the helper method)

  app.route('/')
    .post(commentController.newComment);

  app.route('/grab')
    .post(commentController.getComments);
};
