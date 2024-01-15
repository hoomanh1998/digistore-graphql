"use strict";

const { Model } = require("sequelize");

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Location);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "First Name Required",
          },
          is: {
            args: /(^[a-zA-Z]+).{2,}$/,
            msg: "First Name Must Contain At Least 3 Characters Not Digits And Symbols",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Last Name Required",
          },
          is: {
            args: /^([a-zA-Z]+).{2,}$/,
            msg: "Last Name Must Contain At Least 3 Characters Not Digits And Symbols",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email Address Required",
          },
          isEmail: {
            msg: "Invalid Email Address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password Required",
          },
          is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
            msg: "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
          },
        },
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.firstName = user.firstName.toLowerCase();
          user.lastName = user.lastName.toLowerCase();
          user.email = user.email.toLowerCase();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
  return User;
};
