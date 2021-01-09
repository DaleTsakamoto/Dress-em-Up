'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define('Recommendation', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    apparelChoice: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    hyperlinks: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    designerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
  }, {});
  Recommendation.associate = function(models) {
    // associations can be defined here
  };
  return Recommendation;
};