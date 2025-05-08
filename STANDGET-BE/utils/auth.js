import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Authentication required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: [
        "id",
        "name",
        "email",
        "street",
        "postalCode",
        "city",
        "role",
      ],
    });

    if (!user) {
       return res.status(401).json({ error: "User not found" });
    }

   req.user = {
     id: user.id,
     name: user.name,
     email: user.email,
     role: user.role,
     street: user.street,
     postalCode: user.postalCode,
     city: user.city,
   };
   
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};