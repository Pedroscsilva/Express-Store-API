const Joi = require('joi');

const productNameSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const salesArraySchema = Joi.array().items(
  Joi.object().keys({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  }),
);

module.exports = {
  productNameSchema,
  salesArraySchema,
};
