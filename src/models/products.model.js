const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const addProduct = async (productObj) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [productObj.name],
  );

  return insertId;
};

const updateProduct = async (productId, newName) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [newName, productId],
  );
};

const deleteProduct = async (productId) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );
};

module.exports = {
  findAll,
  findById,
  addProduct,
  updateProduct,
  deleteProduct,
};