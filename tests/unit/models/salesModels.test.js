const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

const { rightSaleBody, saleFindByIdResponse } = require('../mocks/_dataMock');

describe('Sales models unit tests', () => {
  it('should test the INSERT of a new sale', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await salesModel.addSale(rightSaleBody);
    expect(result).to.equal(42);
  });

  it('should retrieve all sales from the db', async () => {
    sinon.stub(connection, 'execute').resolves([rightSaleBody]);
    const result = await salesModel.findAll();
    expect(result).to.be.deep.equal(rightSaleBody);
  });

  it('should retrieve one sale from the db based on the passed id', async () => {
    sinon.stub(connection, 'execute').resolves([saleFindByIdResponse]);
    const result = await salesModel.findById(1);
    expect(result).to.be.deep.equal(saleFindByIdResponse);
  })

  afterEach(sinon.restore);
})