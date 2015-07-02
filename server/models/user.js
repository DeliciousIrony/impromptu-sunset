var bcrypt   = require('bcrypt-nodejs');

// The User model
// The skeleton is auto generated using the sequelize-cli command 
// 'sequelize model:create

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        // validate uniqueness of username
        isUnique: function(value, next) {
          User.find({
              where: {username: value},
              attributes: ['id']
          })
          .done(function(error, user) {
            if (error)
                // Some unexpected error occured with the find method.
                return next(error);
            if (user)
                // We found a user with this email address.
                // Pass the error to the next method.
                return next('Email address already in use!');
            // If we got this far, the email address hasn't been used yet.
            // Call next with no arguments when validation is successful.
            next();
          });
        }
      }
    },
    password: DataTypes.TEXT,
    session_duration: DataTypes.INTEGER
  }, {
    hooks: {
      // before create hook is run before the instance is saved 
      // to the table. This allows us to hash the password before
      // saving it.
      beforeCreate: function(user, options, fn) {
        user.setPassword(user.password, function(){
          fn();
        });
      }
    },
    classMethods: {
      associate: function(models) {
        // establishing relationship between User and Session/Comment
        User.hasMany(models.Session);
        User.hasMany(models.Comment);
      },
    },
    instanceMethods: {
      // handles hashing of the password using the bcrypt package.
      setPassword: function(password, done) {
        var user = this;
        return bcrypt.genSalt(10, function(err, salt) {
          if (err) {
            return done(err);
          }
          return bcrypt.hash(password, salt, null, function(error, encrypted) {
            if (err) {
              return done(err);
            }
            user.password = encrypted;
            return done();
          });
        });
      },
      // compares the password entered to the one that is saved.
      verifyPassword: function(password, done) {
        return bcrypt.compare(password, this.password, function(err, res) {
          if(err){
            return done(err);
          }
          return done(err, res);
        });
      }
    }
  });
  return User;
};