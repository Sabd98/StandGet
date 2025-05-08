// models/order.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// models/order.js
export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total: { type: DataTypes.INTEGER, allowNull: false },
  // status: {
  //   type: DataTypes.ENUM("pending", "completed"),
  //   defaultValue: "pending",
  // },
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

