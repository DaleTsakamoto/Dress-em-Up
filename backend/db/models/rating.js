'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    designerRating: {
      type: Sequelize.INTEGER,
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
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};