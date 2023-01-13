const { productsModel } = require('../../models');
const { productNameSchema } = require('./schemas');

const doesProductIdExist = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const checkProductName = (productName) => {
  const { error } = productNameSchema.validate({ name: productName });
  if (error) return { type: error.details[0].type, message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  doesProductIdExist,
  checkProductName,
};