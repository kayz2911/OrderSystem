const express = require("express");
const { orderSchema } = require('./validationSchemas'); 
const Order = require("./models/Order.model");
const Customer = require("./models/Customer.model");
const Product = require("./models/Product.model");

const app = express();
app.use(express.json());


app.post("/orders/create", async (req, res, next) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { customerId, shippingFee, orderStatus, orderItems } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const orderItemDetails = await Promise.all(orderItems.map(async item => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      return {
        productId: product._id,
        quantity: item.quantity
      };
    }));

    // Create the order
    const newOrder = new Order({
      customerId,
      shippingFee,
      orderStatus,
      orderItems: orderItemDetails
    });
    const savedOrder = await newOrder.save();

    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = app;
