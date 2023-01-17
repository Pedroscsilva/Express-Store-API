const { salesModel } = require('../models');
const { checkSalesArray, doesSaleIdExist } = require('./validations/inputValidations');

const addSale = async (salesArray) => {
  const error = await checkSalesArray(salesArray);
  if (error.type) return error;

  const newSaleId = await salesModel.addSale(salesArray);
  const filteredSalesArray = salesArray.map((obj) => ({
    productId: obj.productId,
    quantity: obj.quantity,
   }));

  const returnedObj = {
    id: newSaleId,
    itemsSold: filteredSalesArray,
  };

  return { type: null, message: returnedObj };
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = await doesSaleIdExist(saleId);
  if (error.type) return error;

  const sale = await salesModel.findById(saleId);
  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const error = await doesSaleIdExist(saleId);
  if (error.type) return error; 

  await salesModel.deleteSale(saleId);

  return { type: null, message: null };
};

module.exports = {
  addSale,
  findAll,
  findById,
  deleteSale,
};