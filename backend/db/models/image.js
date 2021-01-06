'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    imageId: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    thumbnailId: {
      type: Sequelize.BIGINT
    },
    requestId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: 'Requests'}
    },
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Request, {foreignKey: 'requestId'})
  };
  return Image;
};