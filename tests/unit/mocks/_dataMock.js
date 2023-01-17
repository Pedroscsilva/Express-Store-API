/*-------------------------- General --------------------------*/
const updatedReturn = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
]

/*-------------------------- Products --------------------------*/
const wrongProductBody = {};
const wrongSizeProductBody = {name:'Prod'};
const rightProductBody = {name:'Produto1'};
const allProductsResponse = [
  {id:1,name:'Martelo de Thor'},
  {id:2,name:'Traje de encolhimento'},
  {id:3,name:'Escudo do Capitão América'},
];
const productCreateResponse = {id:4,name:'Produto1'};
const productUpdateBody = {name:'Machado do Thor Stormbreaker'};
const productUpdateExistsNameBody = {name:'Martelo de Thor'};
const productSearchNameResponse = [{id:1,name:'Martelo de Thor'}];

/*-------------------------- Sales --------------------------*/
const wrongSaleNotProductIdBody = [{quantity:1}];
const wrongSaleNotQuantityBody = [{productId:1}];
const nonexistentProductIdBody = [{productId:9999,quantity:1}];
const nonexistentProductIdBody2 = [
  {productId:1,quantity:1},
  {productId:99999,quantity:5},
];
const wrongZeroQuantityBody = [{productId:1,quantity: 0}];
const wrongZeroNegativeBody = [{productId:1,quantity:-1}];
const otherProductIdSaleBody = [
  {productId:1,quantity:1},
  {productId:3,quantity:5},
];
const rightSaleBody = [
  {productId:1,quantity:1},
  {productId:2,quantity:5},
];
const wrongSaleBody = [
  {productId:1,quantity:1},
  {productId:999,quantity:5},
];
const saleCreateResponse = {
  id: 3,
  itemsSold: [
    {productId:1,quantity:1},
    {productId:3,quantity:5},
  ]
}
const saleFindByIdResponse = [
  {
    "date": "2023-01-16T20:20:53.000Z",
    "productId": 2,
    "quantity": 10
  }
]

module.exports = {
  updatedReturn,
  wrongProductBody,
  wrongSizeProductBody,
  rightProductBody,
  allProductsResponse,
  productCreateResponse,
  productUpdateBody,
  productUpdateExistsNameBody,
  productSearchNameResponse,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  otherProductIdSaleBody,
  rightSaleBody,
  wrongSaleBody,
  saleCreateResponse,
  saleFindByIdResponse
};
