'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    imageId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    thumbnailId: {
      type: DataTypes.BIGINT
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Requests'}
    },
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Request, {foreignKey: 'requestId'})
  };
  return Image;
};