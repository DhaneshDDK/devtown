const express = require('express');
const router = express.Router();

const {createProduct, getAllProducts, fetchFilteredProducts, fetchPricedProducts} = require('../Controllers/Product');

router.post('/createProducts', createProduct);
router.get('/getAllProducts', getAllProducts);
router.post('/fetchFilteredProducts', fetchFilteredProducts);
router.post('/fetchPricedProducts', fetchPricedProducts);

module.exports = router;