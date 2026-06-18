const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();

router.get('/dashboard', ProductController.getDashboardStats);
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.patch('/:id/stock', ProductController.adjustStock);

module.exports = router;
