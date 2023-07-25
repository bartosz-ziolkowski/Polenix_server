"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: "orderId", as: "order" });
      this.belongsTo(models.Food, { foreignKey: "foodId", as: "food" });
    }
  }
  OrderItem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Orders",
          },
          key: "id",
        },
        allowNull: false,
      },
      foodId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Food",
          },
          key: "id",
        },
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
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
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
