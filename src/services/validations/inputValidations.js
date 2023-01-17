const { productsModel, salesModel } = require('../../models');
const { productNameSchema, salesArraySchema } = require('./schemas');

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

const checkSalesArray = async (salesArray) => {
  const { error } = salesArraySchema.validate(salesArray);
  if (error) { 
    const filteredMessage = error.message.replace(/\[0]\./g, '');
    return { type: error.details[0].type, message: filteredMessage };
  }

  const availableProducts = await productsModel.findAll();
  const availableIds = availableProducts.map((obj) => obj.id);

  for (let i = 0; i < salesArray.length; i += 1) {
    if (!availableIds.includes(salesArray[i].productId)) {
      return { type: 'NOT_FOUND', message: 'Product not found' };
    }
  }

  return { type: null, message: '' };
};

const doesSaleIdExist = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (!sale || sale.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: '' };
};

module.exports = {
  doesProductIdExist,
  checkProductName,
  checkSalesArray,
  doesSaleIdExist,
};