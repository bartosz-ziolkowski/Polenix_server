"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "dateOfBirth", {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        validateDate: (dateOfBirth) => {
          const today = new Date();
          const birthDate = new Date(dateOfBirth);
          const ageDifference = today - birthDate;
          const ageInYears = Math.floor(
            ageDifference / (1000 * 60 * 60 * 24 * 365.25)
          );
          if (ageInYears < 18) {
            throw new Error("You must be 18+");
          }
        },
      },
    });

    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validatePassword: (password) => {
          const uppercaseRegExp = /(?=.*?[A-Z])/;
          const lowercaseRegExp = /(?=.*?[a-z])/;
          const digitsRegExp = /(?=.*?[0-9])/;
          const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;

          const uppercasePassword = uppercaseRegExp.test(password);
          const lowercasePassword = lowercaseRegExp.test(password);
          const digitsPassword = digitsRegExp.test(password);
          const specialCharPassword = specialCharRegExp.test(password);

          if (!uppercasePassword) {
            throw new Error("At least one uppercase");
          } else if (!lowercasePassword) {
            throw new Error("At least one lowercase");
          } else if (!digitsPassword) {
            throw new Error("At least one digit");
          } else if (!specialCharPassword) {
            throw new Error("At least one special character");
          } else if (password.length < 8) {
            throw new Error("Min 8 characters");
          }
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "dateOfBirth", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
