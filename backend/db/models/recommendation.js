'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define('Recommendation', {
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    hyperlinks: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    designerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
  }, {});
  Recommendation.associate = function(models) {
    // associations can be defined here
  };
  return Recommendation;
};