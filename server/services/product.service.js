const ProductModel = require('../models/Product.model');
const StockMovementModel = require('../models/StockMovement.model');
const db = require('../database/db');

class ProductService {
  static getAllProducts(filters, sortBy, order, page, limit) {
    return ProductModel.findAll(filters, sortBy, order, page, limit);
  }

  static getProductById(id) {
    const product = ProductModel.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  static createProduct(productData) {
    return ProductModel.create(productData);
  }

  static updateProduct(id, productData) {
    this.getProductById(id); // Ensure exists
    return ProductModel.update(id, productData);
  }

  static deleteProduct(id) {
    this.getProductById(id); // Ensure exists
    ProductModel.delete(id);
    return { success: true };
  }

  static adjustStock(id, changeAmount, reason) {
    // Run in a transaction to ensure atomic updates
    const transaction = db.transaction(() => {
      const product = ProductModel.findById(id);
      if (!product) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
      }

      const newQuantity = product.quantity + changeAmount;
      if (newQuantity < 0) {
        const error = new Error('Cannot reduce stock below zero');
        error.statusCode = 400;
        throw error;
      }

      ProductModel.update(id, { quantity: newQuantity });
      
      StockMovementModel.create({
        product_id: id,
        change_amount: changeAmount,
        previous_quantity: product.quantity,
        new_quantity: newQuantity,
        reason: reason
      });

      return ProductModel.findById(id);
    });

    return transaction();
  }

  static getDashboardStats() {
    return ProductModel.getDashboardStats();
  }
}

module.exports = ProductService;
