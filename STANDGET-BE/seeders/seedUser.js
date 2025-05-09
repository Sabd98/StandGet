import { User } from "../models/User.js";
import sequelize from "../utils/db.js";
import bcrypt from "bcryptjs";

const usersData = [
  {
    name: "SabdaSan",
    email: "sabda@gmail.com",
    password: "KepoYa4582", 
    role: "admin",
  },
  {
    name: "AdbasSam",
    email: "adbas@gmail.com",
    password: "Maucoba1167", 
    role: "user",
  },
];

const seedUsers = async () => {
  try {
    await sequelize.sync();

    const hashedUsers = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    await User.bulkCreate(hashedUsers);
    console.log("Users seeded successfully with hashed passwords!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await sequelize.close();
  }
};

seedUsers();
