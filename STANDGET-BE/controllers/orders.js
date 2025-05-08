import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Order, OrderItem } from "../models/Order.js";
import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../utils/auth.js";
import PDFDocument from "pdfkit";

export const orderRouter = Router();

orderRouter.get("/orders", authMiddleware, adminMiddleware,async (req, res) => {
  const orders = await Order.findAll({
    include: [Product, User],
  });
  res.json(orders);
});

orderRouter.post("/orders", authMiddleware, async (req, res) => {
  const { items, total } = req.body;  
  console.log(req.body,'output req');
  console.log(req.user, "output user");

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Cart cannot be empty" });
  }

  if (!total || total <= 0) {
    return res.status(400).json({ error: "Invalid total amount" });
  }
  const order = await Order.create({
    total: total,
    userId: req.user.id, 
    status: "pending",
  });

  const orderItems = items.map((item) => ({
    OrderId: order.id,
    ProductId: item.id,
    quantity: item.quantity,
    price: item.price * item.quantity, // Store price at time of purchase
  }));

  await OrderItem.bulkCreate(orderItems);

  const completeOrder = await Order.findByPk(order.id, {
    include: [
      {
        model: Product,
        through: {
          attributes: ["quantity", "price"],
        },
      },
      {
        model: User,
        attributes: ["id", "name", "email","role", "street", "postalCode", "city"],
      },
    ],
  });

  res.status(201).json(completeOrder);
});

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

orderRouter.get("/invoice/:id", authMiddleware,async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [Product, User],
  });
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  const userName = req.user.name;
  const pdfDoc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order.id}.pdf`
  );

  pdfDoc.pipe(res);

  pdfDoc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("StandGet Invoice", { align: "center" });
  pdfDoc.moveDown();

  pdfDoc.fontSize(12).font("Helvetica").text(`Order ID: ${order.id}`);
  pdfDoc.fontSize(12).text(`Date: ${order.createdAt.toLocaleDateString()}`);
  pdfDoc.fontSize(12).text(`Customer: ${userName}`);
  pdfDoc.moveDown(2);

  let yPosition = pdfDoc.y;
  // Items Table
  // pdfDoc
  //   .font("Helvetica-Bold")
  //   .fontSize(12)
  //   .text("Items:", { underline: true }, 50, yPosition, xPosition);

  pdfDoc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Product", 50, yPosition)
    .text("Price", 250, yPosition)
    .text("Qty", 380, yPosition)
    .text("Total", 450, yPosition);

  yPosition += 20;
  pdfDoc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

  // Table Rows
  order.Products.forEach((product, index) => {
    yPosition += 20;
    const total = product.price * product.OrderItem.quantity;

    pdfDoc
      .font("Helvetica")
      .text(product.name, 50, yPosition)
      .text(currencyFormatter.format(product.price), 250, yPosition)
      .text(product.OrderItem.quantity.toString(), 380, yPosition)
      .text(currencyFormatter.format(total), 450, yPosition);
    yPosition += 20;
    pdfDoc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
  });

  // Total
  yPosition += 30;
  pdfDoc
    .font("Helvetica-Bold")
    .text(
      `Total Amount: ${currencyFormatter.format(order.total)}`,
      370,
      yPosition
    );
  pdfDoc.end();
});
