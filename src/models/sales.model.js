const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const addSale = async (salesArray) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  salesArray.forEach(async (e) => {
    const obj = e;
    obj.saleId = insertId;

    const columns = Object.keys(snakeize(obj))
      .map((key) => `${key}`)
      .join(', ');
    
    const placeholders = Object.keys(obj)
      .map((_key) => '?')
      .join(', ');
    
    await connection.execute(
      `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`,
      [...Object.values(obj)],
    );
  });

  return insertId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sales_products.sale_id, sales.date, sales_products.product_id, sales_products.quantity
    FROM (sales_products) INNER JOIN sales ON sales.id = sales_products.sale_id;`,
  );
  return camelize(result);
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sales.date, product_id, quantity FROM (sales_products) 
    INNER JOIN sales ON sales.id = sales_products.sale_id WHERE sales.id = (?);`,
    [saleId],
  );
  return camelize(result);
};

const deleteSale = async (saleId) => connection.execute(
  'DELETE FROM sales WHERE id = ?',
  [saleId],
);

module.exports = {
  addSale,
  findAll,
  findById,
  deleteSale,
};