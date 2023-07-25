"use strict";
const { Model } = require("sequelize");

const validateDate = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const ageDifference = today - birthDate;
  const ageInYears = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365.25));
  return ageInYears >= 18;
};

const validatePassword = (value) => {
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;

  const uppercasePassword = uppercaseRegExp.test(value);
  const lowercasePassword = lowercaseRegExp.test(value);
  const digitsPassword = digitsRegExp.test(value);
  const specialCharPassword = specialCharRegExp.test(value);

  if (!uppercasePassword) {
    return "At least one uppercase";
  } else if (!lowercasePassword) {
    return "At least one lowercase";
  } else if (!digitsPassword) {
    return "At least one digit";
  } else if (!specialCharPassword) {
    return "At least one special character";
  } else if (value.length < 8) {
    return "Min 8 characters";
  } else {
    return true;
  }
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: "userId", as: "orders" });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.ENUM("CUSTOMER", "EMPLOYEE", "ADMIN"),
        defaultValue: "CUSTOMER",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email address",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 40],
          is: /^[A-Za-z]+$/,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 40], 
          is: /^[A-ZÆØÅa-zæøå]+$/, 
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [7], 
          is: /^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\s.]|\d)+$/, 
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          validateDate: (dateOfBirth) => {
            if (!validateDate(dateOfBirth)) {
              throw new Error("You must be 18+");
            }
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 35],
          is: /^[A-ZÆØÅa-zæøå0-9\s]+$/, 
        },
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4], 
          is: /^\d{4}$/,
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 25],
          is: /^[A-Za-z]+$/,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validatePassword: (password) => {
            if (validatePassword(password) !== true) {
              throw new Error(validatePassword(password));
            }
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        rawAttributes: { exclude: ["password"] },
      },
    }
  );
  return User;
};
