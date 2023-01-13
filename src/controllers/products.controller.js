const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const addProducts = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.addProduct(name);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  listProducts,
  getProducts,
  addProducts,
};