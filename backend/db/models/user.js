'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName, userType, address, city, state, zipCode, avatar} = this; // context will be the User instance
      return { id, username, email, firstName, lastName, userType, address, city, state, zipCode, avatar };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password, userType, firstName, lastName, active, description, resume }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName,
        userType,
        active,
        description,
        resume
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      User.belongsToMany(models.User, {through: "Ratings", as: "designerRatings", foreignKey: "userId", otherKey: "designerId"});
      User.belongsToMany(models.User, {through: "Ratings", as: "userRatings", foreignKey: "designerId", otherKey: "userId" });
      User.belongsToMany(models.User, {through: "Recommendations", as: "designerRecommendations", foreignKey: "userId", otherKey: "designerId"});
      User.belongsToMany(models.User, {through: "Recommendations", as: "userRecommendations", foreignKey: "designerId", otherKey: "userId" });
      User.belongsToMany(models.User, {through: "Requests", as: "designerRequests", foreignKey: "userId", otherKey: "designerId"});
      User.belongsToMany(models.User, { through: "Requests", as: "userRequests", foreignKey: "designerId", otherKey: "userId" });
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      userType: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      zipCode: {
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      description: {
        type: DataTypes.TEXT,
      },
      resume: {
        type: DataTypes.STRING,
      },
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};