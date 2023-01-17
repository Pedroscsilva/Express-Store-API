const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

const { allProductsResponse, rightProductBody, updatedReturn } = require('../mocks/_dataMock');

describe('Products models unit tests', () => {
  it('should retrieve all products from the db', async () => {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it('should retrieve one product from the db based on the passed id', async () => {
    sinon.stub(connection, 'execute').resolves([[allProductsResponse[0]]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(allProductsResponse[0]);
  });

  it('should return the INSERT id of a new product', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productsModel.addProduct(rightProductBody);
    expect(result).to.equal(42);
  });

  it('should UPDATE a row', async () => {
    sinon.stub(connection, 'execute').resolves(updatedReturn);
    const result = await productsModel.updateProduct(1, rightProductBody);
    expect(result[0].affectedRows).to.deep.equal(1);
    expect(result[0].changedRows).to.deep.equal(1);
  });

  it('should DELETE a row', async () => {
    sinon.stub(connection, 'execute').resolves(updatedReturn);
    const result = await productsModel.deleteProduct(1);
    expect(result[0].affectedRows).to.deep.equal(1);
    expect(result[0].changedRows).to.deep.equal(1);
  });

  afterEach(sinon.restore);
})