const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel, salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { allProductsResponse, wrongSaleBody, otherProductIdSaleBody, saleCreateResponse, saleFindByIdResponse } = require('../mocks/_dataMock');

describe('Sales services unit tests', () => {
  describe('Tests addSale function', () => {
    it('should return an error in case the sales array is not an array', async () => {
      const result = await salesService.addSale('string');

      expect(result.type).to.equal('array.base');
      expect(result.message).to.equal('"value" must be an array');
    })
    it('should return an error if the product id of an item is inexistent', async () => {
      sinon.stub(productsModel, 'findAll').resolves(allProductsResponse);

      const result = await salesService.addSale(wrongSaleBody);

      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    })
    it('should return correctly in a happy path', async () => {
      sinon.stub(productsModel, 'findAll').resolves(allProductsResponse);
      sinon.stub(salesModel, 'addSale').resolves(3);

      const result = await salesService.addSale(otherProductIdSaleBody);

      expect(result.message).to.deep.equal(saleCreateResponse);
      expect(result.type).to.equal(null);
    });


  });

  describe('Tests findAll function', () => {
    it('should return all sales', async () => {
      sinon.stub(salesModel, 'findAll').resolves(otherProductIdSaleBody);

      const result = await salesService.findAll();
        
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(otherProductIdSaleBody);
    })
  })

  describe('Tests findById function', () => {
    it('should return an error in case the id doesnt exists', async () => {
      sinon.stub(salesModel, 'findById').resolves([]);

      const result = await salesService.findById('c');

      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    })

    it('should test the happy path', async () => {
      sinon.stub(salesModel, 'findById').resolves(saleFindByIdResponse);

      const result = await salesService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleFindByIdResponse);
    })
  })
  
  afterEach(sinon.restore);
})