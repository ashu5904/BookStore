const express = require('express');
const router = express.Router();

const {
    productFetchController
} = require('../controllers/product.controllers');

router.post('/fetch', productFetchController);

module.exports = router;