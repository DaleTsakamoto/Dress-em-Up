'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Images'}
    },
    description: {
      type: DataTypes.TEXT
    },
    apparelChoice: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
    designerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
  }, {});
  Request.associate = function(models) {
    Request.hasMany(models.Image, {foreignKey: 'requestId'})
  };
  return Request;
};