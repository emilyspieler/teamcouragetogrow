'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

  Wiki.hasMany(models.Collaborator, {
    foreignKey: "wikiId",
    as: "collaborators"
  });
};

Wiki.prototype._isCollaborator= function() {
    return this.collaborators === 1;

    };

  return Wiki;
};
