import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total: { type: DataTypes.INTEGER, allowNull: false },
});
export const OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
