var passport = require('passport');
var db = require('../models/index.js');

module.exports = {
  // newComment creates a new comment for the 
  // currently signed in user
  newComment: function(req, res, next){
    var text = req.body.text;
    var sessionId = req.body.sessionId;
    // retrieve the user id from the session
    var userId = req.session.passport.user.id;
    // use sequelize to retrieve the user from
    // the user id    
    db.User.findById(userId).then(function(user){
      // once retrieved, create a comment
      db.Session.findById(sessionId).then(function(session){
        db.Comment.build({
          text: text, 
          userId: userId,
          sessionId: sessionId,
        }).save().then(function(c){
          // add that comment to the list of user comments
          // since a user has many comments (1 to many relationship)
          user.addComments(c).then(function(x){
          // add that comment to the list of session comments
          // since a user has many comments (1 to many relationship)
            session.addComments(c).then(function(y){
              res.status(201).send("Comment Created");
            }).catch(function(err){
              console.log("Error adding comment to the Session")
              console.log(err);
              res.status(422).send(err);
            });
          }).catch(function(err){
            console.log("Error adding comment to the User");
            console.log(err);
            res.status(422).send(err);
          });  
        });        

        
      });
    });

  }
};