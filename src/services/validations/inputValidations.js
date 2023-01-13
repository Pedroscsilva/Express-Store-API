const { productsModel } = require('../../models');

const doesProductIdExist = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  doesProductIdExist,
};