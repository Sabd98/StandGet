// models/user.js

import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    street: DataTypes.STRING,
    postalCode: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 10],
      },
    },
    city: DataTypes.STRING,
  },
  {
    tableName: "users", 
    timestamps: false, 
  }
);
