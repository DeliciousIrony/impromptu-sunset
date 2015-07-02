// The Comment model
// This is auto generated using the sequelize-cli command 
// 'sequelize model:create'
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
         Comment.belongsTo(models.User);
         Comment.belongsTo(models.Session);
      }
    }
  });
  return Comment;
};