const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listPassengers = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const getPassenger = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  listPassengers,
  getPassenger,
};