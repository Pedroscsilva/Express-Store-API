const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const productsController = require('../../../src/controllers/products.controller');
const { allProductsResponse, productUpdateExistsNameBody } = require('../mocks/_dataMock');

describe('Products controller unit tests', () => { 
  describe('Tests listProducts function', () => {
    it('should return a 200 status code with all products', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: allProductsResponse });
      
      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    })
  })

  describe('Tests getProducts function', () => {
    it('tests an unhappy path', async () => {
      const res = {};
      const req = { params: { id: 'a' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'NOT_FOUND', message: 'Product not found' });
      
      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    })

    it('tests a happy path', async () => {
      const res = {};
      const req = { params: { id: 'a' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: allProductsResponse[0] });
      
      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
    })
  })

  describe('Tests addProduct function', () => {
    it('tests an unhappy path', async () => {
      const res = {};
      const req = { body: { name: 'a' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'addProduct')
        .resolves({
          type: 'string.min',
          message: '"name" length must be at least 5 characters long'
        });
      
      await productsController.addProducts(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    })

    it('tests a happy path', async () => {
      const res = {};
      const req = { body: { name: 'Martelo de Thor' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'addProduct')
        .resolves({ type: null, message: allProductsResponse[0] });
      
      await productsController.addProducts(req, res);
      
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
    })
  })

  describe('Tests updateProduct function', () => {
    it('tests an unhappy path', async () => {
      const res = {};
      const req = { params: { id: 1 }, body: {} };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: 'any.required', message: '"name" is required' });
      
      await productsController.updateProduct(req, res);
      
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('tests a happy path', async () => {
      const res = {};
      const req = { params: { id: 1 }, body: productUpdateExistsNameBody };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: null, message: allProductsResponse[0] });
      
      await productsController.updateProduct(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);

    })
  })

  describe('Tests deleteProduct function', () => {
    it('tests an unhappy path', async () => {
      const res = {};
      const req = { params: { id: 'c' } };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'deleteProduct')
        .resolves({ type: 'NOT_FOUND', message: 'Product not found' });
      
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    })

    it('tests a happy path', async () => {
      const res = {};
      const req = { params: { id: 1 } };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'deleteProduct')
        .resolves({ type: null, message: null });
      
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith(null);
    })
  })

  afterEach(sinon.restore);
})