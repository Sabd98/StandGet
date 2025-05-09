
import bodyParser from 'body-parser';
import express from 'express';
import sequelize from './utils/db.js';
import { productRouter } from "./controllers/products.js";
import { orderRouter} from "./controllers/orders.js";
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from "cors";
import { Order, OrderItem } from './models/Order.js';
import { User } from './models/User.js';
import { Product } from './models/Product.js';
import { authRouter } from './controllers/auth.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static('public'));

// Associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

app.use(productRouter);
app.use(orderRouter);
app.use(authRouter);


app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Not found' });
});

sequelize
.sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
