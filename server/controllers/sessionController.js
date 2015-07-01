var passport = require('passport');
var db = require('../models/index.js');

module.exports = {
  // allSessions returns all the sessions of the
  // authenticated user.
  allSessions: function(req, res, next){
    // the authenticated user id is retrieved from the
    // request session
    var userid = req.session.passport.user.id;
    // using sequelize retrieve that user from
    // the userid
    db.User.findById(userid).then(function(user){
      user.getSessions().then(function(x){
        // return all user sessions
        res.status(201).send(x);
      }).catch(function(err){
        res.status(422).send(err);
      });
    });
  },

  sessionsSpecUser: function(req, res, next){
    var userid = req.body.userId;
    console.log(userid);
    // using sequelize retrieve that user from
    // the userid
    db.User.findById(userid).then(function(user){
      user.getSessions().then(function(x){
        // return all user sessions
        res.status(201).send(x);
      }).catch(function(err){
        res.status(422).send(err);
      });
    });
  },

  // newSession creates a new session for the 
  // currently signed in user
  newSession: function(req, res, next){
    var scores = req.body.scores;
    var word_count = req.body.word_count;
    var session_time = req.body.session_time;
    var char_count = req.body.char_count;
    var text = req.body.text;
    // retrieve the user id from the session
    var userid = req.session.passport.user.id;
    // use sequelize to retrieve the user from
    // the user id    
    db.User.findById(userid).then(function(user){
      // once retrieved, create a session
      var s = db.Session.build({
        session_time: session_time, 
        word_count: word_count,
        scores: scores,
        text: text,
        char_count: char_count
      });
      // add that session to the list of user sessions
      // since a user has many sessions (1 to many relationship)
      user.addSessions(s).then(function(x){
        res.status(201).send("Session Created");
      }).catch(function(err){
        res.status(422).send(err);
      });
    });

  }

};