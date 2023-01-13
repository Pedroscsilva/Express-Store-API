const { productsModel } = require('../models');
const { doesProductIdExist } = require('./validations/inputValidations');

const findById = async (productId) => {
  const error = await doesProductIdExist(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  return { type: null, message: product };
};

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

module.exports = {
  findById,
  findAll,
};