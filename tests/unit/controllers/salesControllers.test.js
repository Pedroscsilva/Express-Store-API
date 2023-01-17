const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const salesController = require('../../../src/controllers/sales.controller');
const { saleFindByIdResponse, otherProductIdSaleBody, saleCreateResponse } = require('../mocks/_dataMock');

describe('Sales controller unit tests', () => {
  describe('Tests listSales function', () => {
    it('should return a 200 status code with all sales', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findAll')
        .resolves({ type: null, message: saleFindByIdResponse });
      
      await salesController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleFindByIdResponse);
    })
  })

  describe('Tests getSales function', () => {
    it('tests an unhappy path', async () => {
      const res = {};
      const req = { params: { id: 'c' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById')
        .resolves({ type: 'NOT_FOUND', message: 'Sale not found' });
      
      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    })

    it('tests a happy path', async () => {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById')
        .resolves({ type: null, message: otherProductIdSaleBody });
      
      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(otherProductIdSaleBody);
    })
  })

  describe('Tests addSales function', () => {
    it('tests an unhappy path', async () => {
      const res = {};
      const req = { body: { name: 'toFail' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'addSale')
        .resolves({ type: 'array.base', message: '"value" must be an array' });
      
      await salesController.addSales(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: '"value" must be an array' });
    })

    it('tests a happy path', async () => {
      const res = {};
      const req = { body: otherProductIdSaleBody };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'addSale')
        .resolves({ type: null, message: saleCreateResponse });
      
      await salesController.addSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreateResponse);
    })
  })

  afterEach(sinon.restore);
})