const { productsModel } = require('../models');
const { doesProductIdExist, checkProductName } = require('./validations/inputValidations');

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

const addProduct = async (productName) => {
  const error = checkProductName(productName);
  if (error.type) return error;

  const newProductId = await productsModel.addProduct({ name: productName });
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, newName) => {
  const idError = await doesProductIdExist(productId);
  if (idError.type) return idError;

  const nameError = await checkProductName(newName);
  if (nameError.type) return nameError;

  await productsModel.updateProduct(productId, newName);
  const returnedProduct = await productsModel.findById(productId);

  return { type: null, message: returnedProduct };
};

const deleteProduct = async (productId) => {
  const idError = await doesProductIdExist(productId);
  if (idError.type) return idError;

  await productsModel.deleteProduct(productId);
  return { type: null, message: null };
};

const findByQuery = async (searchQuery) => {
  const products = await productsModel.findByQuery(searchQuery);
  return { type: null, message: products };
};

module.exports = {
  findById,
  findAll,
  addProduct,
  updateProduct,
  deleteProduct,
  findByQuery,
};