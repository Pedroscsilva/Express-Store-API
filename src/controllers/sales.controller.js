const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { type, message } = await salesService.findAll();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const addSales = async (req, res) => {
  const { type, message } = await salesService.addSale(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  listSales,
  getSales,
  addSales,
};