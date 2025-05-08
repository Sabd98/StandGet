import { Product } from "../models/Product.js";
import sequelize from "../utils/db.js";

const productsData = [
  {
    name: "Samsung Galaxy S25",
    price: 16999000,
    description:
      "50.0 MP + 10.0 MP + 12.0 MP. UHD 8K (7680 x 4320) @30fps. 4900mAh. 4.47GHz, 3.5GHz Octa core. Ram 12GB. Storage 512 GB. 158.4 x 75.8 x 7.3.",
    image: "images/GalaxyS25.jpg",
  },
  {
    name: "Samsung Galaxy Z Flip 6",
    price: 16999000,
    description:
      "Your self-expression tool, Galaxy Z Flip6, is more compact and eye-catching, with Galaxy AI and a pro-level 50MP camera that's photoshoot-ready.",
    image: "images/GalaxyFlip.jpg",
  },
  {
    name: "Samsung Galaxy A56",
    price: 6199000,
    description:
      "Introducing the Galaxy A56 5G. With 7.4 mm thickness and 198 g weight, the Galaxy A56 5G has a good grip. The enhanced cameras are grouped to match the New Inhouse Camera design. Galaxy A56 5G has four color options to choose from — Awesome Pink, Awesome Olive, Awesome Graphite and Awesome Lightgray.",
    image: "images/GalaxyA56.avif",
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    price: 24999000,
    description:
      "Galaxy S25 Ultra's rounded design expresses a unified identity for the Galaxy S series. With its sleek and strong titanium frame and a built-in S Pen, it's an ultra-modern, vision of bold design. ",
    image: "images/GalaxyS25Ultra.jpg",
  },
  {
    name: "Neo QLED QN80F",
    price: 12999000,
    description: "50 Neo QLED QN80F 4K Samsung Vision AI Smart TV (2025)",
    image: "images/NeoQLED.avif",
  },
  {
    name: "OLED S85F 4K ",
    price: 19999000,
    description: "55 OLED S85F 4K Samsung Vision AI Smart TV (2025).",
    image: "images/OLED.avif",
  },
];

const seedProducts = async () => {
  try {
    await sequelize.sync(); // Sync model with database
    await Product.bulkCreate(productsData);
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await sequelize.close();
  }
};

seedProducts();
