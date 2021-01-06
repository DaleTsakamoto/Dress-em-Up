'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    imageId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: 'Images'}
    },
    description: {
      type: Sequelize.TEXT
    },
    apparelChoice: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
    designerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
  }, {});
  Request.associate = function(models) {
    Request.hasMany(models.Image, {foreignKey: 'requestId'})
  };
  return Request;
};