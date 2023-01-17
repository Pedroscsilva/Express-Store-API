const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { allProductsResponse } = require('../mocks/_dataMock');

describe('Products services unit tests', () => {
  describe('Tests findById function', () => {
    it('should return an error when the productId is inexistent', async () => {
      const result = await productsService.findById('c');
      
      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('should return the object correctly when the productId is existent', async () => {
      sinon.stub(productsModel, 'findById').resolves(allProductsResponse[0]);

      const result = await productsService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse[0]);
    })
  });

  describe('Tests findAll function', () => {
    it('should return all the products', async () => {
      sinon.stub(productsModel, 'findAll').resolves(allProductsResponse);

      const result = await productsService.findAll();

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse);
    });
  });

  describe('Tests addProducts function', () => {
    it('should return an error in case the data format is not a string', async () => {
      const result = await productsService.addProduct(123456);

      expect(result.type).to.equal('string.base');
      expect(result.message).to.equal('"name" must be a string');
    });

    it('should return an error in case the name length is bellow 5', async () => {
      const result = await productsService.addProduct('bob');

      expect(result.type).to.equal('string.min');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('should return an error in case the name is not provided', async () => {
      const result = await productsService.addProduct();
      
      expect(result.type).to.equal('any.required');
      expect(result.message).to.equal('"name" is required');
    });

    it('should return correctly the new registered product', async () => {
      sinon.stub(productsModel, 'addProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productsModel, 'findById').resolves(allProductsResponse[0]);

      const result = await productsService.addProduct('Martelo de Thor');

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse[0]);
    })
  })

  describe('Tests updateProduct function', () => {
    it('should return an error in case the passed id is invalid', async () => {
      const result = await productsService.updateProduct('c', 'Books');
      
      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('should return an error in case the passed name in invalid', async () => {
      sinon.stub(productsModel, 'findById').resolves(allProductsResponse[0]);

      const result = await productsService.updateProduct(2);
      
      expect(result.type).to.equal('any.required');
      expect(result.message).to.equal('"name" is required');
    });

    it('should return correctly the new updated product', async () => {
      sinon.stub(productsModel, 'findById').resolves(allProductsResponse[1]);

      const result = await productsService.updateProduct(2, 'Traje de Encolhimento');

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse[1]);
    })
  });

  describe('Tests deleteProduct function', () => {
    it('should return an error in case the passed id is invalid', async () => {
      const result = await productsService.deleteProduct('c');
      
      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    })

    it('should return nothing in case the deletion was successful', async () => {
      sinon.stub(productsModel, 'deleteProduct').resolves();
      const result = await productsService.deleteProduct(2);
      
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(null);
    })
  })

  afterEach(sinon.restore);
})