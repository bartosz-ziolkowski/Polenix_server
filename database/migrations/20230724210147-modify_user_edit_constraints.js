"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM("CUSTOMER", "EMPLOYEE", "ADMIN"),
        defaultValue: "CUSTOMER",
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 40],
          is: /^[A-Za-z]+$/,
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 40],
          is: /^[A-ZÆØÅa-zæøå]+$/,
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [7],
          is: /^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\s.]|\d)+$/,
        },
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          customValidator: function (value) {
            const today = new Date();
            const birthDate = new Date(value);
            const ageDifference = today - birthDate;
            const ageInYears = Math.floor(
              ageDifference / (1000 * 60 * 60 * 24 * 365.25)
            );
            if (ageInYears < 18) {
              throw new Error("You must be 18+");
            }
          },
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5, 35],
          is: /^[A-ZÆØÅa-zæøå0-9\s]+$/,
        },
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [4],
          is: /^\d{4}$/,
        },
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 25],
          is: /^[A-Za-z]+$/,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          validatePassword: function (value) {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const uppercasePassword = uppercaseRegExp.test(value);
            const lowercasePassword = lowercaseRegExp.test(value);
            const digitsPassword = digitsRegExp.test(value);
            const specialCharPassword = specialCharRegExp.test(value);

            if (!uppercasePassword) {
              throw new Error("At least one uppercase");
            } else if (!lowercasePassword) {
              throw new Error("At least one lowercase");
            } else if (!digitsPassword) {
              throw new Error("At least one digit");
            } else if (!specialCharPassword) {
              throw new Error("At least one special character");
            } else if (value.length < 8) {
              throw new Error("Min 8 characters");
            }
          },
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
