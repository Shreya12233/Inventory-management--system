const ProductService = require('../services/product.service');
const { sendSuccess } = require('../utils/response');
const { createProductSchema, updateProductSchema, adjustStockSchema } = require('../validators/product.validator');

class ProductController {
  static getDashboardStats(req, res, next) {
    try {
      const stats = ProductService.getDashboardStats();
      sendSuccess(res, 200, 'Dashboard stats retrieved', stats);
    } catch (error) {
      next(error);
    }
  }

  static getAllProducts(req, res, next) {
    try {
      const { search, category, lowStock, sortBy, order, page = 1, limit = 50 } = req.query;
      const products = ProductService.getAllProducts({ search, category, lowStock }, sortBy, order, page, limit);
      sendSuccess(res, 200, 'Products retrieved successfully', products);
    } catch (error) {
      next(error);
    }
  }

  static getProductById(req, res, next) {
    try {
      const product = ProductService.getProductById(req.params.id);
      sendSuccess(res, 200, 'Product retrieved successfully', product);
    } catch (error) {
      next(error);
    }
  }

  static createProduct(req, res, next) {
    try {
      const validatedData = createProductSchema.parse(req.body);
      const product = ProductService.createProduct(validatedData);
      sendSuccess(res, 201, 'Product created successfully', product);
    } catch (error) {
      next(error);
    }
  }

  static updateProduct(req, res, next) {
    try {
      const validatedData = updateProductSchema.parse(req.body);
      const product = ProductService.updateProduct(req.params.id, validatedData);
      sendSuccess(res, 200, 'Product updated successfully', product);
    } catch (error) {
      next(error);
    }
  }

  static deleteProduct(req, res, next) {
    try {
      ProductService.deleteProduct(req.params.id);
      sendSuccess(res, 200, 'Product deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static adjustStock(req, res, next) {
    try {
      const validatedData = adjustStockSchema.parse(req.body);
      const product = ProductService.adjustStock(
        req.params.id, 
        validatedData.change_amount, 
        validatedData.reason
      );
      sendSuccess(res, 200, 'Stock adjusted successfully', product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
