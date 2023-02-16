module.exports = (sequelize, DataTypes) => {

    const Meal = sequelize.define("Meal", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Meal
}