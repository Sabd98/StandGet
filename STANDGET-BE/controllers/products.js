import { Product } from "../models/Product.js";
import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../utils/auth.js";
import multer from "multer";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

export const productRouter = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

productRouter.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.post(
  "/products",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    console.log(req.file);
    try {
      const image_url = req.file ? `/images/${req.file.filename}` : null;
      const product = await Product.create({
        ...req.body,
        image: image_url,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

productRouter.put(
  "/products/:id",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    console.log("payload: ", req.body, req.file);
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    let image_url = product.image;
    if (req.file) {
      if (product.image) {
        const oldImagePath = path.join(__dirname, "..", product.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      image_url = `/images/${req.file.filename}`;
    }
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.update({ ...req.body, image: image_url });
    res.json(product);
  }
);

productRouter.delete(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

     if (product.image) {
       // Proper path construction
       const filename = product.image.split("/images/").pop();
       const imagePath = join(__dirname, "..", "public", filename);

       if (fs.existsSync(imagePath)) {
         fs.unlinkSync(imagePath); // Use synchronous version for better error handling
       } else {
         console.warn("Image file not found:", imagePath);
       }
     }
     
    await product.destroy();
    res.sendStatus(204);
  }
);
