const Joi = require("joi");
const orderStatusEnum = require('./orderStatusEnum'); 

const orderSchema = Joi.object({
  customerId: Joi.string().required(),
  shippingFee: Joi.number(),
  orderStatus: Joi.string().valid(...Object.values(orderStatusEnum)).required(),
  orderItems: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number(),
      })
    )
    .min(1)
    .required(),
});

module.exports = {
  orderSchema,
};
