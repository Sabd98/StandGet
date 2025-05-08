import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

// models/product.js
export const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
});

// // Add associate method
// Product.associate = (models) => {
//   Product.belongsToMany(models.Order, {
//     through: "OrderItem",
//     foreignKey: "productId"
//   });
// };
