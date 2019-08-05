'use strict';
module.exports = (sequelize, DataTypes) => {
  const Downgrade = sequelize.define('Downgrade', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Downgrade.associate = function(models) {
    // associations can be defined here
  };
  return Downgrade;
};
