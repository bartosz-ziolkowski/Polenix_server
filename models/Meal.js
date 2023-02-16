const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Meal = sequelize.define("Meal", {
        idM: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    });
    return Meal;
};
