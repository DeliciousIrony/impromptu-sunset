var passport = require('passport');
var db = require('../models/index.js');

module.exports = {

  signup: function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    // Create a new user
    var newuser = db.User.build({username:username, password:password});
    newuser.save().then(function(){
      // once the user is created, will sign him in aswell
      passport.authenticate('local') (req, res, function() {
        res.send(newuser);
      });
    }).catch(db.Sequelize.ValidationError, function (err) {
        // respond with validation errors - in case the user already exists
        return res.status(422).send(err.errors);
    });
    
  },

  signout: function(req, res, next){
    // destroy session and log user out
    req.logout();
    res.status(200).send("Successfully Logged Out");
  },

  fetchUsers: function(req, res, next){
    var attributes = ['id', 'username'];
    db.User.findAll({ attributes: attributes}).then(function(users){
      console.log('Successful fetch of all Users');
      var allUsers = [];
      for (var i = 0; i < users.length; i++) {
        allUsers.push(users[i].dataValues);
      }
      console.log(allUsers);
      res.json({ userData: allUsers });
    });
  }

};