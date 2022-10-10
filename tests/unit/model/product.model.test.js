const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/model/db/connection');
const { productModel } = require('../../../src/model');

describe('Model de produtos', function () {
    describe('listar todos os produtos', function () {
        const expectReturn = [
            { id: 1, name: 'Coca-Cola', price: '220.00', in_stock: 2 },
            { id: 2, name: 'Pastel de Carne', price: '2.50', in_stock: 100 },
            { id: 3, name: 'Alano', price: '2800.00', in_stock: 1 },
            { id: 7, name: 'vasco', price: '200.00', in_stock: 22 },
            { id: 8, name: 'vascqweo', price: '200.00', in_stock: 22 },
        ];
    beforeEach(function () {
       sinon.stub(connection, 'execute').resolves([expectReturn]); 
    });
    it('Deve retornar um array com todos os elementos', async function () {
        const result = await productModel.getAllItems();
        expect(result).to.be.a('array');
  });
  it('Deve retornar um array com todos os elementos iguais', async function () {
    const result = await productModel.getAllItems();

    expect(result).to.be.deep.equal(expectReturn);
        });
    afterEach(function () {
        sinon.restore();
    });
     });
});
