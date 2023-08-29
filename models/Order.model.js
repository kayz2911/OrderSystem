const mongoose = require("mongoose");
const orderStatusEnum = require('../orderStatusEnum'); 

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shippingFee: {
      type: Number,
    },
    orderStatus: {
      type: String,
      enum: Object.values(orderStatusEnum),
      required: true,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
